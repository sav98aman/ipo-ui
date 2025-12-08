import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, '../src/data/registrars-listed.json');
const API_ENDPOINT = 'https://webnodejs.chittorgarh.com/cloud/report/data-read/32/1/12/2025/2025-26/0/0/0';

async function updateRegistrars() {
    try {
        console.log('Fetching data from endpoint...');
        const response = await fetch(API_ENDPOINT);

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.reportTableData || !Array.isArray(data.reportTableData)) {
            throw new Error('Invalid data format received from API');
        }

        console.log(`Received ${data.reportTableData.length} records from API.`);

        let existingRegistrars = [];
        if (fs.existsSync(DATA_FILE)) {
            const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
            existingRegistrars = JSON.parse(fileContent);
        }

        const registrarMap = new Map();
        existingRegistrars.forEach(reg => {
            registrarMap.set(reg.id, reg);
        });

        let updatesCount = 0;
        let newCount = 0;

        data.reportTableData.forEach(item => {
            const id = item['~id'];
            const name = item['IPO Registrar'];
            const folderName = item['~URLRewrite_Folder_Name'];
            const ipoCount = String(item['IPO']);

            if (registrarMap.has(id)) {
                const existing = registrarMap.get(id);
                // Only update ipoCount and Name if ID matches. 
                if (existing.ipoCount !== ipoCount || existing.name !== name) {
                    existing.ipoCount = ipoCount;
                    existing.name = name;
                    updatesCount++;
                }

                // Migration: If unverified, ensure it has the correct schema keys
                if (existing.verified === false) {
                    if (!existing.hasOwnProperty('websiteLink')) existing.websiteLink = '#';
                    if (!existing.hasOwnProperty('checkStatusLink')) existing.checkStatusLink = '#';
                    // Remove obsolete keys if they exist
                    if (existing.hasOwnProperty('folderName')) delete existing.folderName;
                    if (existing.hasOwnProperty('link')) delete existing.link;
                }

            } else {
                // New record
                const newEntry = {
                    id: id,
                    name: name,
                    ipoCount: ipoCount,
                    websiteLink: "#",
                    checkStatusLink: "#",
                    verified: false
                };
                registrarMap.set(id, newEntry);
                newCount++;
            }
        });

        // Convert map back to array
        const updatedRegistrars = Array.from(registrarMap.values());

        // Sorting by IPO count descending
        updatedRegistrars.sort((a, b) => {
            const countA = parseInt(a.ipoCount, 10) || 0;
            const countB = parseInt(b.ipoCount, 10) || 0;
            return countB - countA;
        });

        fs.writeFileSync(DATA_FILE, JSON.stringify(updatedRegistrars, null, 4));
        console.log(`Update complete. ${updatesCount} updated, ${newCount} new. Total records: ${updatedRegistrars.length}`);

    } catch (error) {
        console.error('Error updating registrars:', error);
        process.exit(1);
    }
}

updateRegistrars();

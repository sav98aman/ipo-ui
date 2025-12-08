import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REGISTRARS_FILE = path.join(__dirname, '../src/data/registrars-listed.json');
const IPOS_FILE = path.join(__dirname, '../src/data/mockIpos.json');
const MAPPING_FILE = path.join(__dirname, '../src/data/ipo-registrars-map.json');

const REGISTRAR_IPO_ENDPOINT_TEMPLATE = 'https://webnodejs.chittorgarh.com/cloud/report/data-read/114/1/12/2025/2025-26/0/{REGISTRAR_ID}/0';

// Sleep function to avoid hitting the API too hard
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function mapIPOs() {
    try {
        console.log('Loading Data...');
        const registrars = JSON.parse(fs.readFileSync(REGISTRARS_FILE, 'utf-8'));
        const mockIpos = JSON.parse(fs.readFileSync(IPOS_FILE, 'utf-8'));

        const knownIpoIds = new Set(mockIpos.map(ipo => ipo.id));
        const mapping = {};

        // Loop through each registrar
        for (const registrar of registrars) {
            const registrarId = registrar.id;
            const endpoint = REGISTRAR_IPO_ENDPOINT_TEMPLATE.replace('{REGISTRAR_ID}', registrarId);

            console.log(`Fetching IPOs for ${registrar.name} (ID: ${registrarId})...`);

            try {
                const response = await fetch(endpoint);
                if (!response.ok) {
                    console.error(`Failed to fetch for ${registrar.name}: ${response.status} ${response.statusText}`);
                    continue;
                }

                const data = await response.json();
                if (!data.reportTableData || !Array.isArray(data.reportTableData)) {
                    console.error(`Invalid data format for ${registrar.name}`);
                    continue;
                }

                for (const ipoItem of data.reportTableData) {
                    const folderName = ipoItem['~URLRewrite_Folder_Name'];
                    // We use folderName as the key to match our "id" in mockIpos (e.g., 'prodocs-solutions-ipo')

                    // Check if this IPO exists in our system (mockIpos)
                    // The prompt asks to "make a common object to contains list of stock name, symbol, exchange"
                    // And "when i pass id then at the time take the resistar name, link take symbols from second endpoint"

                    // Assuming we map ALL IPOs found or just the ones in our mockIpos?
                    // "if those symbols is matching from mockipos.json" -> implies intersection

                    if (knownIpoIds.has(folderName)) {
                        console.log(`  Found match: ${folderName}`);

                        mapping[folderName] = {
                            stockName: ipoItem['Issuer Company'], // Assuming this is stock name? Or close enough
                            exchange: ipoItem['Exchange'],
                            registrar: {
                                id: registrar.id,
                                name: registrar.name,
                                link: registrar.verified ? registrar.checkStatusLink : registrar.link // Provide useful link
                            }
                        };
                    }
                }

            } catch (err) {
                console.error(`Error processing ${registrar.name}:`, err);
            }

            // Sleep for 200ms to be polite
            await sleep(200);
        }

        console.log(`Mapping complete. Writing to ${MAPPING_FILE}...`);
        fs.writeFileSync(MAPPING_FILE, JSON.stringify(mapping, null, 4));
        console.log(`File written. Total mapped IPOs: ${Object.keys(mapping).length}`);

    } catch (error) {
        console.error('Fatal Error:', error);
        process.exit(1);
    }
}

mapIPOs();

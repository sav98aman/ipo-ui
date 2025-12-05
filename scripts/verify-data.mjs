
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, '../src/data/mockIpos.json');

function verifyData() {
    console.log("Starting Data Integrity Check...");
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Midnight today

    let errors = [];
    let warnings = [];

    data.forEach(ipo => {
        // 1. Check Status vs Dates
        if (ipo.openDate !== 'TBD' && ipo.closeDate !== 'TBD') {
            const open = new Date(ipo.openDate);
            const close = new Date(ipo.closeDate);

            // Normalize to midnight for comparison
            open.setHours(0, 0, 0, 0);
            close.setHours(23, 59, 59, 999);

            let calculatedStatus = 'Unknown';
            if (now < open) calculatedStatus = 'Upcoming';
            else if (now > close) calculatedStatus = 'Closed';
            else calculatedStatus = 'Current';

            if (ipo.status !== calculatedStatus) {
                // Allow "Closed" status for "Current" dates if it's manually set, but warn
                // But generally they should match
                errors.push(`[${ipo.companyName}] Status Mismatch: API says '${ipo.status}', Dates imply '${calculatedStatus}' (Open: ${ipo.openDate}, Close: ${ipo.closeDate})`);
            }
        }

        // 2. Check Critical Fields
        if (!ipo.id) errors.push(`[${ipo.companyName}] Missing ID`);
        if (!ipo.companyName) errors.push(`[ID: ${ipo.id}] Missing Company Name`);

        // 3. Check GMP
        if (typeof ipo.gmp !== 'number') errors.push(`[${ipo.companyName}] Invalid GMP value: ${ipo.gmp}`);
    });

    console.log("\n--- Test Results ---");
    if (errors.length === 0) {
        console.log("✅ All Data Integrity Tests Passed!");
    } else {
        console.log(`❌ Found ${errors.length} Errors:`);
        errors.forEach(e => console.log(e));
    }

    if (warnings.length > 0) {
        console.log(`\n⚠️ Found ${warnings.length} Warnings:`);
        warnings.forEach(w => console.log(w));
    }
}

verifyData();

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPDATE_SCRIPT = path.join(__dirname, 'update-ipos.mjs');
const UPDATE_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

function getTimestamp() {
    return new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

function runUpdate() {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`⏳ [${getTimestamp()}] Starting IPO Data Update Job...`);
    console.log(`${'='.repeat(60)}\n`);

    const child = spawn('node', [UPDATE_SCRIPT], { stdio: 'inherit' });

    child.on('close', (code) => {
        console.log(`\n${'-'.repeat(60)}`);
        if (code === 0) {
            console.log(`✅ [${getTimestamp()}] Update Complete!`);
            console.log(`⏰ Next update in 5 minutes...`);
        } else {
            console.error(`❌ [${getTimestamp()}] Update Failed with code ${code}`);
        }
        console.log(`${'-'.repeat(60)}\n`);
    });
}

// Run immediately on start
console.log(`\n${'█'.repeat(60)}`);
console.log(`🚀 IPO Data Monitor Started!`);
console.log(`📊 Update Frequency: Every 5 minutes`);
console.log(`⏰ Started at: ${getTimestamp()}`);
console.log(`${' █'.repeat(60)}\n`);

runUpdate();

// Schedule every 5 minutes (300000 ms)
setInterval(runUpdate, UPDATE_INTERVAL);

console.log(`\n💡 Press Ctrl+C to stop the monitor.\n`);

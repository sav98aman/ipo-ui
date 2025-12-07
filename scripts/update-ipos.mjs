import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, '../src/data/mockIpos.json');

const ENDPOINTS = {
    UPCOMING: 'https://groww.in/v1/api/primaries/v1/ipo/upcoming',
    OPEN: 'https://groww.in/v1/api/primaries/v1/ipo/open?v=2',
    CLOSED: 'https://groww.in/v1/api/primaries/v1/ipo/closed'
};

function formatDate(timestampOrString) {
    if (!timestampOrString || timestampOrString === 'TBD') return 'TBD';

    // If it's already a date string like "2025-12-02", return it
    if (typeof timestampOrString === 'string' && timestampOrString.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return timestampOrString;
    }

    try {
        const date = new Date(timestampOrString);
        if (isNaN(date.getTime())) return 'TBD';

        // Return strictly YYYY-MM-DD based on UTC or auto conversion to avoid timezone messy shifts
        // For IPO dates, usually the date part is what matters. 
        // We'll use ISO string split, which is UTC based.
        return date.toISOString().split('T')[0];
    } catch (e) {
        return 'TBD';
    }
}

function formatCurrency(amount) {
    if (!amount) return 'TBD';
    return `₹${amount}`;
}

// Fixed: Return an ISO-like string but offset to IST, or a readable IST string if preferred.
// The user explicitly asked for "Indian time frame". simple ISO is UTC.
// We will return a readable ISO-like string with +05:30 offset to be technically accurate and parseable, 
// OR a custom string if that's what the JSON expects.
// Let's stick to ISO-8601 with offset for machine safety, but let's try to match user expectations of "IST".
function getISTISOString() {
    const now = new Date();
    // Shift time to IST
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(now.getTime() + istOffset);
    // Remove the 'Z' and add '+05:30'
    return istDate.toISOString().replace('Z', '+05:30');
}

function deriveStatus(openDate, closeDate, originalStatus) {
    if (!openDate || openDate === 'TBD' || !closeDate || closeDate === 'TBD') {
        return originalStatus;
    }
    const now = new Date();
    // Set to start of day for comparison to be safe, or use exact times if available
    // But here we are comparing dates (YYYY-MM-DD)
    const start = new Date(openDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(closeDate);
    end.setHours(23, 59, 59, 999); // End of the close day

    if (now < start) return 'Upcoming';
    if (now > end) return 'Closed';
    return 'Current';
}

async function fetchAndProcess(url, status, currentData) {
    try {
        console.log(`Fetching ${status} IPOs from ${url}...`);
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Failed to fetch ${status} IPOs: ${response.statusText}`);
            return { updates: 0, new: 0 };
        }
        const apiData = await response.json();
        const ipoList = apiData.ipoList || [];

        console.log(`Found ${ipoList.length} ${status} IPOs.`);

        let updatesCount = 0;
        let newCount = 0;

        for (const apiIpo of ipoList) {
            const existingIndex = currentData.findIndex(
                (item) => item.id === apiIpo.searchId || item.companyName === apiIpo.companyName
            );

            let openDate = 'TBD';
            let closeDate = 'TBD';
            let listingDate = 'TBD';
            let prospectusUrl = '#';
            let lotSize = 0;
            let priceRange = 'TBD';
            let subscribed = '0.00x';

            // Extract dates and fields based on status/endpoint
            if (status === 'Upcoming') {
                openDate = formatDate(apiIpo.bidStartTimestamp);
                prospectusUrl = apiIpo.documentUrl;
            }
            else if (status === 'Open') {
                openDate = formatDate(apiIpo.bidStartTimestamp);
                closeDate = formatDate(apiIpo.bidEndTimestamp);
                subscribed = apiIpo.overallSubscription ? `${apiIpo.overallSubscription}x` : '0.00x';

                if (apiIpo.categories && apiIpo.categories.length > 0) {
                    const retailCat = apiIpo.categories.find(c => c.category === 'IND') || apiIpo.categories[0];
                    lotSize = retailCat.lotSize;
                    const minPrice = Math.min(...apiIpo.categories.map(c => c.minPrice));
                    const maxPrice = Math.max(...apiIpo.categories.map(c => c.maxPrice));
                    priceRange = minPrice === maxPrice ? `₹${minPrice}` : `₹${minPrice} - ₹${maxPrice}`;
                }
            }
            else if (status === 'Closed') {
                openDate = formatDate(apiIpo.openingDate);
                closeDate = formatDate(apiIpo.closingDate);
                listingDate = formatDate(apiIpo.listingTimestamp);
                subscribed = apiIpo.overallSubscription ? `${apiIpo.overallSubscription}x` : '0.00x';
                priceRange = apiIpo.issuePrice ? `₹${apiIpo.issuePrice}` : 'TBD';
            }

            // Common fields
            let mappedData = {
                id: apiIpo.searchId,
                companyName: apiIpo.companyName,
                logo: apiIpo.logoUrl,
                sector: apiIpo.isSme ? 'SME' : 'Mainline',
                openDate,
                closeDate,
                listingDate,
                prospectusUrl,
                lotSize: lotSize || 0, // Default if not found
                priceRange,
                subscribed
            };

            // Derive status strictly from dates if possible, otherwise fallback to API status
            // We map 'Open' -> 'Current' for the app
            const appStatus = status === 'Open' ? 'Current' : status;
            mappedData.status = deriveStatus(openDate, closeDate, appStatus);

            if (existingIndex > -1) {
                // Update existing
                currentData[existingIndex] = {
                    ...currentData[existingIndex],
                    ...mappedData,
                };
                updatesCount++;
            } else {
                // Create new
                const newEntry = {
                    ...mappedData,
                    issueSize: 'TBD',
                    gmp: 0,
                    gmpPercent: 0,
                    gmpLastUpdated: getISTISOString(),
                    retail: '0.00x',
                    qib: '0.00x',
                    nii: '0.00x',
                    aiSummary: 'Coming Soon',
                    leadManager: 'TBD',
                    nseUrl: '#',
                    bseUrl: '#',
                    gmpHistory: []
                };
                currentData.push(newEntry);
                newCount++;
            }
        }
        return { updates: updatesCount, new: newCount };
    } catch (error) {
        console.error(`Error processing ${status} IPOs:`, error);
        return { updates: 0, new: 0 };
    }
}

async function fetchAndProcessGMP(currentData) {
    const GMP_LIST_ENDPOINT = 'https://webapi.niftytrader.in/webapi/Ipo/gmp-list';
    const IPO_DETAIL_ENDPOINT = 'https://webapi.niftytrader.in/webapi/Ipo/ipo-company-detail';

    const headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9',
        'origin': 'https://www.niftytrader.in',
        'platform_type': '1',
        'priority': 'u=1, i',
        'referer': 'https://www.niftytrader.in/',
        'sec-ch-ua': '"Google Chrome";v="141", "Not?A_Brand";v="8", "Chromium";v="141"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36'
    };

    try {
        console.log(`Fetching GMP list from ${GMP_LIST_ENDPOINT}...`);
        const response = await fetch(GMP_LIST_ENDPOINT, { headers });
        if (!response.ok) {
            console.error(`Failed to fetch GMP list: ${response.statusText}`);
            return 0;
        }
        const apiResponse = await response.json();

        if (apiResponse.result !== 1 || !apiResponse.resultData) {
            console.error('Invalid GMP API response format');
            return 0;
        }

        const gmpList = apiResponse.resultData;
        console.log(`Found ${gmpList.length} GMP entries. Processing details...`);

        let updatesCount = 0;

        for (const gmpEntry of gmpList) {
            // Normalize names for comparison
            const normalizeName = (name) => name.toLowerCase().replace(/\s+ipo\s*$/i, '').replace(/[^a-z0-9]/g, '');
            const gmpCompanyName = normalizeName(gmpEntry.company_name);

            const existingIndex = currentData.findIndex((item) => {
                const itemCompanyName = normalizeName(item.companyName);
                return itemCompanyName.includes(gmpCompanyName) || gmpCompanyName.includes(itemCompanyName);
            });

            if (existingIndex > -1) {
                const existingItem = currentData[existingIndex];

                // Fetch detailed info
                let detailedInfo = {};
                try {
                    const detailUrl = `${IPO_DETAIL_ENDPOINT}?id=${gmpEntry.slug_url}`;
                    // console.log(`Fetching details for ${gmpEntry.company_name}...`); 
                    const detailResponse = await fetch(detailUrl, { headers });
                    if (detailResponse.ok) {
                        const detailJson = await detailResponse.json();
                        if (detailJson.result === 1 && detailJson.resultData && detailJson.resultData.ipo_detail) {
                            const d = detailJson.resultData.ipo_detail;

                            // Helper to check if we should overwrite date
                            // We prefer the existing date if it has time precision (not T00:00:00.000Z) and the new one is midnight
                            const shouldOverwriteDate = (current, newDateStr) => {
                                if (!current || current === 'TBD') return true;
                                if (!newDateStr) return false;

                                const currentIsMidnight = current.includes('T00:00:00') || current.endsWith('T00:00:00.000Z');
                                const newIsMidnight = newDateStr.includes('T00:00:00');

                                if (!currentIsMidnight && newIsMidnight) return false; // Keep precise current date
                                return true;
                            };

                            detailedInfo = {
                                listingDate: formatDate(d.listing_date),
                                priceRange: d.minimum_price && d.maximum_price ? `₹${d.minimum_price} - ₹${d.maximum_price}` : (d.maximum_price ? `₹${d.maximum_price}` : 'TBD'),
                                lotSize: d.lot_size || existingItem.lotSize,
                                issueSize: d.total_issue_price || existingItem.issueSize,
                                prospectusUrl: d.rhp_link || d.drhp_link || existingItem.prospectusUrl,
                                leadManager: existingItem.leadManager === 'TBD' ? 'Check RHP' : existingItem.leadManager,
                            };

                            if (shouldOverwriteDate(existingItem.openDate, d.start_date)) {
                                detailedInfo.openDate = formatDate(d.start_date);
                            }
                            if (shouldOverwriteDate(existingItem.closeDate, d.end_date)) {
                                detailedInfo.closeDate = formatDate(d.end_date);
                            }

                            // Update subscription from detail if available
                            if (detailJson.resultData.ipo_subscription) {
                                const totalSub = detailJson.resultData.ipo_subscription.find(s => s.name.trim() === 'Total');
                                if (totalSub) {
                                    detailedInfo.subscribed = `${totalSub.subscription_times}x`;
                                }
                                const retailSub = detailJson.resultData.ipo_subscription.find(s => s.name.trim() === 'Retail');
                                if (retailSub) {
                                    detailedInfo.retail = `${retailSub.subscription_times}x`;
                                }
                                const qibSub = detailJson.resultData.ipo_subscription.find(s => s.name.includes('QIB'));
                                if (qibSub) {
                                    detailedInfo.qib = `${qibSub.subscription_times}x`;
                                }
                                const niiSub = detailJson.resultData.ipo_subscription.find(s => s.name.includes('Non-Institutional'));
                                if (niiSub) {
                                    detailedInfo.nii = `${niiSub.subscription_times}x`;
                                }
                            }

                            // Update GMP History
                            if (detailJson.resultData.gmp && Array.isArray(detailJson.resultData.gmp)) {
                                detailedInfo.gmpHistory = detailJson.resultData.gmp.map(entry => ({
                                    date: formatDate(entry.gmp_date),
                                    gmp: entry.gmp_price,
                                    gmpPercent: entry.estimated_listing_percentage
                                        ? parseFloat(entry.estimated_listing_percentage.replace('%', ''))
                                        : 0
                                })).sort((a, b) => new Date(a.date) - new Date(b.date));
                            }
                        }
                    }
                } catch (err) {
                    console.error(`Error fetching details for ${gmpEntry.company_name}:`, err);
                }

                // Update GMP fields
                const newGmp = gmpEntry.gmp_price || 0;
                const newGmpPercent = gmpEntry.estimated_listing_percentage
                    ? parseFloat(gmpEntry.estimated_listing_percentage.replace('%', ''))
                    : 0;

                // Ensure current GMP is in history
                let finalHistory = detailedInfo.gmpHistory || existingItem.gmpHistory || [];

                // Get today's date in ISO format (start of day) to consistent comparison
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const todayIso = today.toISOString();

                // Check if we already have an entry for today (or very recent)
                // We'll compare YYYY-MM-DD to be safe
                const todayString = today.toISOString().split('T')[0];
                const hasToday = finalHistory.some(h => h.date && h.date.split('T')[0] === todayString);

                // Allow 0 GMP if we have history (to show drop to 0), otherwise only if non-zero
                if (!hasToday && ((newGmp !== 0 || newGmpPercent !== 0) || finalHistory.length > 0)) {
                    finalHistory.push({
                        date: todayIso,
                        gmp: newGmp,
                        gmpPercent: newGmpPercent
                    });
                }

                // Sort history
                finalHistory.sort((a, b) => new Date(a.date) - new Date(b.date));

                // Merge all data
                currentData[existingIndex] = {
                    ...existingItem,
                    ...detailedInfo,
                    gmpHistory: finalHistory, // Use our augmented history
                    gmp: newGmp,
                    gmpPercent: newGmpPercent,
                    gmpLastUpdated: getISTISOString(),
                };

                // Log the individual update for user feedback
                console.log(`[UPDATE] ${existingItem.companyName}: GMP ₹${newGmp} (${newGmpPercent}%)`);
                updatesCount++;
            }
        }
        return updatesCount;

    } catch (error) {
        console.error('Error processing GMP data:', error);
        return 0;
    }
}

function sanitizeStatuses(data) {
    let fixedCount = 0;
    data.forEach(ipo => {
        const oldStatus = ipo.status;
        const newStatus = deriveStatus(ipo.openDate, ipo.closeDate, oldStatus);
        if (oldStatus !== newStatus) {
            ipo.status = newStatus;
            fixedCount++;
        }
    });
    console.log(`Sanitized statuses for ${fixedCount} IPOs.`);
}

async function updateAllIpoData() {
    try {
        // Read existing data
        let currentData = [];
        if (fs.existsSync(DATA_FILE)) {
            const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
            currentData = JSON.parse(fileContent);
        }

        // Process all endpoints
        const upcomingStats = await fetchAndProcess(ENDPOINTS.UPCOMING, 'Upcoming', currentData);
        const openStats = await fetchAndProcess(ENDPOINTS.OPEN, 'Open', currentData);
        const closedStats = await fetchAndProcess(ENDPOINTS.CLOSED, 'Closed', currentData);

        // Process GMP
        const gmpUpdates = await fetchAndProcessGMP(currentData);

        // Final Sanity Check
        sanitizeStatuses(currentData);

        // Write back to file
        fs.writeFileSync(DATA_FILE, JSON.stringify(currentData, null, 2));

        // Save last update timestamp
        const metadataFile = path.join(__dirname, '../src/data/lastUpdate.json');
        const metadata = {
            lastUpdated: getISTISOString(),
            totalIPOs: currentData.length,
            updateStats: {
                upcoming: upcomingStats,
                open: openStats,
                closed: closedStats,
                gmpUpdates
            }
        };
        fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2));

        console.log('\n----------------------------------------');
        console.log('Update Summary:');
        console.log(`Upcoming: ${upcomingStats.updates} updated, ${upcomingStats.new} added`);
        console.log(`Open:     ${openStats.updates} updated, ${openStats.new} added`);
        console.log(`Closed:   ${closedStats.updates} updated, ${closedStats.new} added`);
        console.log(`GMP:      ${gmpUpdates} IPOs updated with latest GMP`);
        console.log(`\nTotal IPOs in database: ${currentData.length}`);
        console.log(`Data saved to ${DATA_FILE}`);
        console.log(`Last update: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`);
        console.log('----------------------------------------');

    } catch (error) {
        console.error('Fatal error updating IPO data:', error);
        process.exit(1);
    }
}

updateAllIpoData();

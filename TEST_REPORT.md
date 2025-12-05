# IPO Dashboard Test Report

**Date:** 2025-12-05
**Tester:** Antigravity AI

## Test Summary
This report documents the testing of the IPO Watch Dashboard features, specifically focusing on filtering logic, data integrity, and the countdown timer functionality.

### 1. Filtering Logic
| Scenario | Expected Behavior | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Current Filter** | Show only IPOs that are currently open for subscription (Open Date <= Today <= Close Date). | **PASS** | Logic updated to strictly derive status from dates. |
| **Upcoming Filter** | Show only IPOs that open in the future (Today < Open Date). | **PASS** | Logic updated to strictly derive status from dates. |
| **All Filter** | Show all IPOs sorted by date. | **PASS** | Existing functionality verified. |
| **Sector Filter** | Filter by Main Board vs SME. | **PASS** | Verified in previous steps. |

### 2. Data Integrity & Status Derivation
| Scenario | Expected Behavior | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Past IPOs** | IPOs with `Close Date < Today` should be marked as `Closed`. | **PASS** | `Vidya Wires` and 5 others automatically corrected to `Closed` by new `sanitizeStatuses` logic. |
| **Future IPOs** | IPOs with `Open Date > Today` should be marked as `Upcoming`. | **PASS** | `Wakefit` updated to `Upcoming`. |
| **Active IPOs** | IPOs with `Open <= Today <= Close` should be marked as `Current`. | **PASS** | Verified with date comparison logic. |
| **Automated Verification** | `verify-data.mjs` script should return 0 errors. | **PASS** | Script confirmed 0 errors after final update. |

### 3. Countdown Timer
| Scenario | Expected Behavior | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Upcoming IPOs** | Display "Starts in [Time]". | **PASS** | Verified with `Wakefit` (Starts in ~2d). |
| **Current IPOs** | Display "Ends in [Time]". | **PASS** | Verified with `Luxury Time` (Ends in ~2d). |
| **Closed IPOs** | Display "-" or "Closed". | **PASS** | Verified with `Vidya Wires` (Closed). |
| **Hidden Columns** | Timer works even if date columns are hidden. | **PASS** | Fixed bug where timer crashed if columns were hidden. |

## Bug Fixes Implemented
1.  **Status Mismatch**: The API was returning "Open" status for IPOs that were technically closed or upcoming in the future. We implemented a `deriveStatus` function in the update script to strictly calculate status based on `OpenDate` and `CloseDate` relative to `Today`.
2.  **Countdown Crash**: Fixed a bug where the Countdown Timer component failed to render when the "Open Date" or "Close Date" columns were hidden in the table (e.g., on mobile or specific views). It now accesses the underlying data directly.
3.  **Data Sanitization**: Added a final `sanitizeStatuses` step to the update script to catch and fix any status/date mismatches that might slip through the initial fetching logic (e.g. if an IPO is in the "Open" API response but its dates indicate it is closed).

## Conclusion
The dashboard is now functioning correctly. The "Current" tab will only show truly active IPOs, eliminating confusion where users saw "Closed" or "Upcoming" IPOs in the "Current" list with non-functional countdowns. Automated tests confirm data integrity.

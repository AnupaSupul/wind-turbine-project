# Historical Data

## Historical Data Table

At the bottom of the dashboard, a table shows every measurement stored in the database.

### Columns

| Column | Description |
|---|---|
| Timestamp | When the measurement was recorded |
| Experiment | Which experiment it belongs to (EXP-001, EXP-002, EXP-003) |
| Wind (m/s) | Wind speed |
| Pitch (°) | Blade pitch angle |
| Voltage (V) | Generator voltage |
| Current (A) | Generator current |
| Power (W) | Calculated power (highlighted in blue) |
| Source | Where the data came from (SIMULATOR or ESP32) |

### Pagination

The table shows **20 records per page**. Navigation buttons at the bottom allow you to move between pages:
- **← Previous** — Go to the previous page
- **Next →** — Go to the next page
- **Page X of Y** — Shows which page you're on

### Sorting

Records are displayed in reverse chronological order — the most recent measurement appears first.

### Filtering

When you select an experiment in the Experiment Comparison section above, the history table automatically filters to show only records from that experiment. The record count updates to reflect the filtered total.

### What to Look For

- **Consistent values** — Values should change gradually, not jump wildly
- **Source column** — All simulator data shows "SIMULATOR" in a yellow badge
- **Power values** — Check that power = voltage × current (approximately)

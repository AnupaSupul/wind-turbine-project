# Experiment Comparison

## Experiments Section

This section shows all available experiments as **clickable cards**, along with a dropdown filter.

### Experiment Cards

Each card displays:
- **Experiment ID** (e.g., EXP-001)
- **Pitch angle** (e.g., 0°)
- **Average wind speed** (e.g., 3.5 m/s)
- **Average power** (e.g., 11.2 W)
- **Number of records** (e.g., 100)
- **Source badge** (SIMULATOR or ESP32)

Currently there are three experiments:

| Experiment | Pitch | Wind Range | Purpose |
|---|---|---|---|
| EXP-001 | 0° | 2–4 m/s | Baseline, zero pitch |
| EXP-002 | 4° | 3–6 m/s | Small pitch adjustment |
| EXP-003 | 20° | 5–8 m/s | Large pitch adjustment |

### Filtering by Experiment

You can filter the entire dashboard by experiment in two ways:

1. **Click an experiment card** — highlights it and filters all sections below
2. **Use the dropdown** — select an experiment or "All Experiments"

When a filter is active:
- Summary Statistics show only data from that experiment
- Power Analysis charts show only that experiment's data
- Historical Data table shows only that experiment's records

### Clear Filter

Click the **"Clear Filter"** button (appears when a filter is active) or select "All Experiments" from the dropdown to see all data again.

### What to Compare

Look at the **Average Power** values across experiments. However, remember that different experiments operate under different wind conditions, so direct power comparison must account for wind speed differences.

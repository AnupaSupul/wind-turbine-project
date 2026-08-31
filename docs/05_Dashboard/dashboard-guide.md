# Dashboard Guide

This guide explains every section of the Wind Turbine IoT Monitoring dashboard. It is written for anyone viewing the dashboard — engineering students, supervisors, or team members.

## Opening the Dashboard

Open your web browser and navigate to:
```
http://localhost:5173
```

The dashboard loads automatically and begins displaying data.

## Dashboard Layout Overview

The dashboard is a single scrollable page with these sections from top to bottom:

| # | Section | What It Shows |
|---|---|---|
| 1 | Header | System title, connection status, data source |
| 2 | Live Telemetry Cards | Current values for 6 measurements |
| 3 | Live Trend Chart | A rolling chart of recent values |
| 4 | Experiments | Experiment cards with filter dropdown |
| 5 | Summary Statistics | Average, minimum, maximum for each measurement |
| 6 | Power Analysis | Bar charts: Power vs Wind Speed, Power vs Pitch Angle |
| 7 | Historical Data | A paginated table of all past measurements |
| 8 | Footer | Project identifier |

Each section is explained in detail in the following documentation files:
- [Live Monitoring](./live-monitoring.md)
- [Experiment Comparison](./experiment-comparison.md)
- [Analytics](./analytics.md)
- [Historical Data](./historical-data.md)

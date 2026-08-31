# Frontend Dashboard

## What Is the Dashboard?

The dashboard is a web page that opens in your browser (like Chrome or Firefox). It displays all the wind turbine measurements in a visual, easy-to-understand format.

## How It Gets Data

The dashboard gets its data from the backend server — it does **not** connect directly to the database. This keeps the system secure and organized.

Two types of data requests:

### Live Data (every 200ms)
The dashboard asks the backend for the newest measurement **5 times every second**. This makes the displayed values appear to update in real time.

### Historical/Analytics Data (on demand)
When you open the dashboard or change a filter, the dashboard requests historical data and statistics from the backend. This only happens when needed — not continuously.

## Dashboard Sections

The dashboard has these sections, from top to bottom:

1. **Header** — System title, connection status, data source indicator
2. **Live Metric Cards** — Six cards showing current values
3. **Live Trend Chart** — A rolling chart showing recent changes
4. **Experiment Comparison** — Cards for each experiment with a filter dropdown
5. **Summary Statistics** — Average, minimum, and maximum values
6. **Power Analysis Charts** — Power vs Wind Speed, Power vs Pitch Angle
7. **Historical Data Table** — A paginated table of all past measurements

## Technology

The dashboard is built with:

| Technology | Purpose |
|---|---|
| React | Building the user interface |
| Vite | Development server and build tool |
| Recharts | Drawing the charts |
| CSS | Styling and layout |

It runs on `http://localhost:5173` during development.

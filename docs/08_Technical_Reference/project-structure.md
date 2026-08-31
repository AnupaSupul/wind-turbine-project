# Project Structure

## Top-Level Folders

```
wind turbine project/
├── backend/           ← Node.js server, API, database logic
├── frontend/          ← React dashboard
└── docs/              ← This documentation
```

## Backend Structure

```
backend/
├── .env                           ← Environment variables (not in git)
├── package.json                   ← Dependencies and npm scripts
│
├── scripts/
│   ├── seedData.js                ← Generates 300 seed records in MongoDB
│   └── liveSimulator.js           ← Live simulator (200ms telemetry generation)
│
└── src/
    ├── server.js                  ← Application entry point (starts Express + connects DB)
    │
    ├── config/
    │   └── database.js            ← MongoDB Atlas connection logic
    │
    ├── models/
    │   └── Telemetry.js           ← Mongoose schema (defines data structure)
    │
    ├── middleware/
    │   └── validation.js          ← Input validation (checks types, ranges)
    │
    ├── routes/
    │   ├── telemetryRoutes.js     ← Maps URLs to telemetry controller functions
    │   └── analyticsRoutes.js     ← Maps URLs to analytics controller functions
    │
    ├── controllers/
    │   ├── telemetryController.js ← Handles telemetry HTTP requests
    │   └── analyticsController.js ← Handles analytics HTTP requests
    │
    └── services/
        ├── telemetryService.js    ← Business logic: save, cache, query telemetry
        └── analyticsService.js    ← Business logic: summary stats, power analysis
```

### Layer Responsibilities

| Layer | What It Does | Analogy |
|---|---|---|
| **Routes** | "Which function handles this URL?" | A reception desk that directs visitors |
| **Middleware** | "Is this data valid?" | A security guard checking ID |
| **Controllers** | "Parse the request, call the right service, send a response" | A manager coordinating work |
| **Services** | "Perform the actual logic (calculate, save, query)" | The workers doing the real job |
| **Models** | "What does a telemetry record look like?" | A template or form |
| **Config** | "How do we connect to the database?" | An address book |

## Frontend Structure

```
frontend/
├── .env                                   ← API base URL configuration
├── package.json                           ← Dependencies and npm scripts
├── vite.config.js                         ← Vite build configuration
├── index.html                             ← HTML entry point
│
└── src/
    ├── main.jsx                           ← React entry point
    ├── App.jsx                            ← Main dashboard layout
    ├── App.css                            ← Dashboard layout styles
    ├── index.css                          ← Global styles (dark theme, fonts)
    │
    ├── api/
    │   ├── config.js                      ← API base URL + fetch helpers
    │   ├── telemetryApi.js                ← Functions: fetchLatest, fetchHistory
    │   └── analyticsApi.js                ← Functions: fetchSummary, fetchPowerAnalytics
    │
    ├── hooks/
    │   └── usePolling.js                  ← 200ms polling hook with rolling buffer
    │
    └── components/
        ├── Header.jsx / Header.css        ← Title, connection status, source badge
        ├── MetricCards.jsx / MetricCards.css          ← 6 live metric cards
        ├── LiveChart.jsx / LiveChart.css              ← Rolling line chart
        ├── ExperimentComparison.jsx / ...css          ← Experiment cards + filter
        ├── SummaryPanel.jsx / SummaryPanel.css        ← Avg/min/max stats
        ├── PowerCharts.jsx / PowerCharts.css          ← Power analysis bar charts
        └── HistoryTable.jsx / HistoryTable.css        ← Paginated data table
```

### Component Responsibilities

| Component | What It Shows |
|---|---|
| `Header` | System title, connection indicator, source badge |
| `MetricCards` | Six cards with current measurement values |
| `LiveChart` | Rolling time-series chart with metric selector |
| `SummaryPanel` | Avg/min/max statistics |
| `PowerCharts` | Power vs Wind Speed + Power vs Pitch Angle bar charts |
| `ExperimentComparison` | Experiment cards with dropdown filter |
| `HistoryTable` | Paginated table of all measurements |

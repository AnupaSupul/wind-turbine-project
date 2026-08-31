# Backend to Frontend Communication

## Overview

The React dashboard gets all its data from the backend server using standard HTTP requests — the same technology that web browsers use to load web pages.

The dashboard **never connects directly to the database**. All data flows through the backend.

## How It Works (Simple Explanation)

The dashboard asks the backend for information. The backend answers.

```
Dashboard: "What's the latest measurement?"
Backend:   "Wind=3.45 m/s, Power=7.16 W, ..."

Dashboard: "Show me the last 20 records"
Backend:   [array of 20 records]

Dashboard: "Give me summary statistics"
Backend:   "Average power=10.71 W, min=3.11, max=19.89"
```

This happens using HTTP GET requests — the same mechanism your browser uses when you visit a website.

## Live Updates via HTTP Polling

The dashboard needs to show values that change in real time. It achieves this by:

1. Asking for the latest value
2. Waiting 200 milliseconds (0.2 seconds)
3. Asking again
4. Repeating forever

This is called **HTTP polling**. At 200ms intervals, it runs **5 times per second**.

### Why HTTP Polling Instead of WebSockets?

| | HTTP Polling | WebSockets |
|---|---|---|
| How it works | Dashboard asks repeatedly | Backend pushes automatically |
| Complexity | Simple | More complex |
| Debugging | Easy (standard HTTP) | Harder |
| Server overhead | Minimal (cached response) | Persistent connections |
| Best for | Small demos, localhost | Large-scale production apps |

HTTP polling was chosen because:
- This is a **localhost university demo** with one user
- The backend serves cached data instantly (no database query)
- It is **simpler to understand and debug**
- The overhead is negligible for this use case

## Request Types

### Live Polling (every 200ms)

```
GET http://localhost:5000/api/telemetry/latest
```

Returns the most recent measurement from the in-memory cache. Very fast.

### Historical Data (on demand)

```
GET http://localhost:5000/api/telemetry/history?limit=20&page=1
```

Returns paginated historical records from the database.

### Analytics (on demand)

```
GET http://localhost:5000/api/analytics/summary
GET http://localhost:5000/api/analytics/power
```

Returns calculated statistics and power analysis data from the database.

## CORS

The backend and frontend run on **different ports** (5000 and 5173). Browsers normally block requests between different ports for security. The backend has **CORS** (Cross-Origin Resource Sharing) enabled, which tells the browser: "It's OK for the dashboard to request data from me."

# System Flow

This document shows how data moves through the system step by step.

## Live Measurement Flow

When the system is running, this is what happens every 200 milliseconds:

```
Step 1: Simulator generates a measurement
           ↓
Step 2: Simulator sends it to the backend (HTTP POST)
           ↓
Step 3: Backend validates the data
           ↓
Step 4: Backend calculates power = voltage × current
           ↓
Step 5: Backend saves it to MongoDB Atlas
           ↓
Step 6: Backend updates its in-memory "latest" cache
           ↓
Step 7: Dashboard asks backend for the latest value (HTTP GET)
           ↓
Step 8: Backend returns the cached value instantly (no database query)
           ↓
Step 9: Dashboard displays the new values on screen
```

## Historical / Analytics Flow

When the user wants to see past data or statistics, a different flow happens:

```
Step 1: User opens the dashboard (or changes a filter)
           ↓
Step 2: Dashboard sends a request to the backend
           ↓
Step 3: Backend queries MongoDB Atlas
           ↓
Step 4: MongoDB Atlas returns the matching records
           ↓
Step 5: Backend sends the results back to the dashboard
           ↓
Step 6: Dashboard displays the table, charts, or statistics
```

This flow only happens when the user changes a page or filter — **NOT** every 200 milliseconds.

## Timing Summary

| What | How Often |
|---|---|
| Simulator sends a measurement | Every 200 ms (5 per second) |
| Dashboard requests latest value | Every 200 ms (5 per second) |
| Dashboard requests historical data | Only when the user requests it |
| Dashboard requests analytics | Once on page load + when filters change |

# Live Data Updates

## How Do Values Stay "Live"?

The dashboard shows measurement values that update in real time. Here's how that works:

### The Polling Loop

Every **200 milliseconds** (0.2 seconds), the dashboard:

1. Sends a request to the backend: "What's the latest measurement?"
2. Receives the answer
3. Updates the numbers and charts on screen

This happens **5 times every second**, which makes the display appear live.

### Why It Feels Smooth

200 milliseconds is fast enough that changes appear smooth to the human eye. If the wind speed is gradually increasing, you'll see the number on screen gradually increase too.

### What Happens Behind the Scenes

<p align="center">
  <img src="../assets/diagrams/live-dashboard-flow.svg" alt="Dashboard Live Update Flow" width="100%">
</p>

> [!IMPORTANT]
> The backend reads from **Node.js memory** (which is instantaneous), not from the database. The database is only queried for historical data and analytics. This prevents overloading MongoDB Atlas when the dashboard polls 5 times per second.

## Rolling Chart Buffer

The live trend chart shows the last **60 data points** (approximately 12 seconds at 200ms intervals). Older points are automatically removed. This prevents the browser from accumulating unlimited data and slowing down.

## Connection Handling

If the backend goes offline:
- The dashboard keeps the **last known values** on screen
- The status changes to **Backend Offline** (red indicator)
- When the backend comes back, the dashboard automatically reconnects
- No error popups or crashes — the dashboard remains stable

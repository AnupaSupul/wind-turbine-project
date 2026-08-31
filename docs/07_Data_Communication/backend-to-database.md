# Backend to Database Communication

## Overview

The backend connects to **MongoDB Atlas** — a cloud-hosted database. Every measurement received from the ESP32 or simulator is permanently stored there.

## How It Works (Simple Explanation)

1. The backend starts and connects to MongoDB Atlas over the internet
2. When a measurement arrives, the backend saves it as a "document" in the database
3. When historical data or analytics are needed, the backend queries the database
4. The database returns the requested records

## Connection Details

| Setting | Value |
|---|---|
| Database service | MongoDB Atlas (cloud) |
| Connection protocol | MongoDB SRV (encrypted internet connection) |
| Database name | `windturbine` |
| Collection (table) | `telemetries` |
| Driver | Mongoose (Node.js library) |

## When the Backend Queries the Database

| Action | Queries Database? |
|---|---|
| Saving a new measurement | ✅ Yes — writes one document |
| Getting the latest measurement | ❌ No — reads from memory cache |
| Getting historical records | ✅ Yes — queries with filters and pagination |
| Getting summary analytics | ✅ Yes — runs aggregation queries |
| Getting power analytics | ✅ Yes — runs aggregation queries |

The **latest measurement** is served from an **in-memory cache** — this is why the dashboard can poll 5 times per second without overloading the database.

## In-Memory Cache

To prevent the database from receiving 5 queries per second just for the latest value, the backend keeps the most recent measurement **in Node.js memory**:

- When a new measurement is saved to the database, the cache is also updated
- When the dashboard asks for the latest value, the cache is returned instantly
- When the backend first starts, it loads the latest record from the database into the cache

This means: **zero database queries** for the 200ms polling loop.

# Database Storage

## Where Is Data Stored?

All measurements are stored in **MongoDB Atlas** — a cloud database service hosted by MongoDB. This means:

- Data is stored securely on the internet, not just on your laptop
- Data survives if your computer restarts
- Data can be accessed from any computer with the correct credentials

## Database Structure

| Item | Value |
|---|---|
| Database name | `windturbine` |
| Collection name | `telemetries` |
| Connection type | MongoDB Atlas (cloud) |

Each measurement is stored as a document with these fields:

| Field | Type | Example |
|---|---|---|
| `_id` | Automatic ID | `6a92e38fd86ef9e0c266663` |
| `experimentId` | Text | `EXP-001` |
| `source` | Text | `simulator` |
| `timestamp` | Date/Time | `2026-08-29T13:50:07.992Z` |
| `windSpeed` | Number | `4.52` |
| `pitchAngle` | Number | `4` |
| `stepperPosition` | Number | `200` |
| `voltage` | Number | `8.20` |
| `current` | Number | `1.10` |
| `power` | Number | `9.02` |
| `createdAt` | Date/Time | (automatic) |
| `updatedAt` | Date/Time | (automatic) |

## Database Indexes

The database uses indexes (like a book index) to quickly find records:

1. **By timestamp** — allows fast retrieval of the most recent records
2. **By experiment + timestamp** — allows fast filtering by experiment

## Connection Security

The database connection string (username, password, server address) is stored in a `.env` file that is:
- **Not committed** to the code repository
- **Not visible** in the source code
- Listed in `.gitignore` to prevent accidental sharing

# Architecture Diagrams

## A. Overall Architecture

```mermaid
graph LR
    subgraph "Data Source"
        SIM["Simulator<br>(liveSimulator.js)"]
        ESP["ESP32<br>(future hardware)"]
    end
    
    subgraph "Backend (localhost:5000)"
        API["Express API"]
        CACHE["In-Memory Cache"]
        SVC["Services Layer"]
    end
    
    subgraph "Database"
        DB["MongoDB Atlas<br>(windturbine)"]
    end
    
    subgraph "Frontend (localhost:5173)"
        DASH["React Dashboard"]
    end
    
    SIM -->|"HTTP POST"| API
    ESP -.->|"HTTP POST (future)"| API
    API --> SVC
    SVC --> DB
    SVC --> CACHE
    DASH -->|"HTTP GET /latest<br>every 200ms"| CACHE
    DASH -->|"HTTP GET /history<br>HTTP GET /analytics"| SVC
    SVC --> DB
```

## B. Telemetry Processing Flow

```mermaid
flowchart TD
    A["Incoming telemetry<br>(POST /api/telemetry)"] --> B["Validation Middleware"]
    B -->|"Missing fields or<br>invalid values"| C["400 Error Response"]
    B -->|"Valid"| D["Telemetry Service"]
    D --> E["Calculate power = voltage × current"]
    E --> F["Save to MongoDB Atlas"]
    F --> G["Update in-memory cache"]
    G --> H["201 Success Response"]
```

## C. Dashboard Live-Update Flow

```mermaid
sequenceDiagram
    participant D as Dashboard
    participant B as Backend
    participant C as Memory Cache
    
    loop Every 200ms
        D->>B: GET /api/telemetry/latest
        B->>C: Read cached value
        C-->>B: Latest telemetry
        B-->>D: JSON response
        D->>D: Update metric cards & chart
    end
```

## D. Simulator Flow

```mermaid
flowchart TD
    A["Simulator starts"] --> B["Initialize EXP-001"]
    B --> C["Generate smooth measurement values"]
    C --> D["POST to backend"]
    D --> E["Wait 200ms"]
    E --> F{"300 ticks<br>(~60 seconds)?"}
    F -->|"No"| C
    F -->|"Yes"| G["Switch to next experiment<br>(EXP-001 → EXP-002 → EXP-003)"]
    G --> C
```

## E. Current vs Future Architecture

```mermaid
graph TD
    subgraph "Current (Simulator)"
        S1["liveSimulator.js"] -->|"HTTP POST"| B1["Backend"]
        B1 --> D1["MongoDB Atlas"]
        R1["Dashboard"] -->|"HTTP GET"| B1
    end
    
    subgraph "Future (Real Hardware)"
        S2["ESP32 + Sensors"] -->|"HTTP POST<br>over Wi-Fi"| B2["Backend"]
        B2 --> D2["MongoDB Atlas"]
        R2["Dashboard"] -->|"HTTP GET"| B2
    end
```

The architecture is **identical** — the only difference is what sends the measurements.

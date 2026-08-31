# System Purpose

## Why Does This System Exist?

In this mechanical engineering project, a small wind turbine generates electricity. The amount of electricity generated depends on:

- **How fast the wind is blowing** (wind speed)
- **The angle of the turbine blades** (pitch angle)
- **The electrical load** connected to the generator

The engineering team needs to **measure these values**, **record them**, and **analyze the results** to answer questions like:

> "At what pitch angle does our turbine generate the most power for a given wind speed?"

Doing this manually — writing down readings from a multimeter — is slow, error-prone, and difficult to analyze.

## What Problem Does It Solve?

This system **automates** the entire measurement process:

1. **Automatic data collection** — Measurements are taken every fraction of a second
2. **Permanent storage** — Every reading is saved to a cloud database
3. **Live visualization** — A dashboard shows measurements as they happen
4. **Engineering analysis** — Charts and statistics help answer engineering questions
5. **Experiment comparison** — Different experiments can be compared side by side

## How It Fits Into the Engineering Project

```
Physical System                    Software System
─────────────────                  ──────────────────
Wind → Turbine → Generator    →   ESP32 → Backend → Database
                                                  → Dashboard
```

The **physical system** produces electricity.  
The **software system** measures, records, and analyzes it.

The engineering team focuses on the mechanical/electrical experiment.  
The software handles the data collection and visualization automatically.

## Simulated vs Real Data

Because the real ESP32 hardware may not always be available, the system includes a **software simulator** that generates realistic measurement values. This allows:

- The dashboard to be developed and tested
- The system to be demonstrated to supervisors
- The software to be verified before connecting real hardware

Simulated data is clearly marked as `SIMULATOR` throughout the system. Real hardware data will be marked as `REAL HARDWARE` when connected.

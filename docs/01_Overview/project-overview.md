# Project Overview

## What Is This Project?

This is a **Wind Turbine IoT Monitoring System** — a software application that collects, stores, and displays measurements from a small wind turbine experiment.

It was created for a **university mechanical engineering project** where students experiment with wind turbines, different blade pitch angles, and measure the electrical power generated under various wind conditions.

## What Does It Do?

The system does three main things:

### 1. Collects Measurements
The system receives measurements from the wind turbine — things like wind speed, voltage, current, and blade pitch angle. Currently, a software **simulator** generates these measurements. In the future, a real **ESP32 microcontroller** attached to the turbine hardware will send real measurements.

### 2. Stores Data
Every measurement is stored in a cloud database (**MongoDB Atlas**), creating a permanent record of each experiment. This allows the engineering team to look back at past experiments and compare results.

### 3. Displays a Live Dashboard
A web-based dashboard shows the measurements in real time. Engineers can see:
- The current wind speed, voltage, current, and power
- How measurements change over time (live charts)
- How power relates to wind speed and pitch angle
- Comparisons between different experiments
- A full history of all recorded measurements

## Who Is This For?

- **Mechanical engineering students** running wind turbine experiments
- **University lecturers/supervisors** viewing experiment results
- **Developers** who need to maintain or extend the system

## Current Status

| ⚙️ Component | 🚥 Status |
|---|---|
| **Backend Server** | ✅ Complete |
| **Database (MongoDB Atlas)** | ✅ Connected |
| **Dashboard (React)** | ✅ Complete |
| **Live Simulator** | ✅ Complete |
| **Real ESP32 Hardware** | ⏳ Not yet connected |

> [!IMPORTANT]
> The system is fully functional using simulated data. When the real ESP32 hardware is ready, it will send measurements into the same backend system over HTTP — no major software changes will be needed.

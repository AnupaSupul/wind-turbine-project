# Glossary

A quick reference for terms used throughout this project.

## Engineering Terms

| Term | Meaning |
|---|---|
| **Wind Speed** | How fast the air is moving, measured in metres per second (m/s) |
| **Pitch Angle** | The angle of the turbine blades relative to the wind, measured in degrees (°). Changing this affects how much energy the turbine captures |
| **Voltage** | The electrical "pressure" produced by the generator, measured in Volts (V) |
| **Current** | The flow of electricity produced by the generator, measured in Amperes (A) |
| **Power** | The amount of electrical energy produced per second, measured in Watts (W). Calculated as Power = Voltage × Current |
| **Stepper Position** | The position of the stepper motor that controls blade pitch, measured in motor steps |
| **Generator** | A device that converts the turbine's rotational energy into electricity |
| **Turbine** | The bladed wheel that spins when wind blows on it |

## Technology Terms

| Term | Simple Explanation |
|---|---|
| **ESP32** | A small microcontroller (like a tiny computer) that reads sensors and sends data over Wi-Fi |
| **Backend** | The server program that receives, stores, and serves measurement data. Runs on your computer |
| **Frontend / Dashboard** | The web page you see in your browser that displays charts and current values |
| **MongoDB Atlas** | A cloud database service where all measurements are permanently stored |
| **API** | Application Programming Interface — the "language" that the dashboard uses to ask the backend for data |
| **HTTP** | The standard protocol used by web browsers. Our system uses HTTP for all communication |
| **Polling** | The dashboard repeatedly asking the backend "do you have new data?" at regular intervals (every 200 milliseconds, or 5 times per second) |
| **Port** | A number that identifies a specific program on your computer. The backend uses port 5000, the dashboard uses port 5173 |

## Project Terms

| Term | Meaning |
|---|---|
| **Experiment** | A set of measurements taken under specific conditions (e.g., a particular pitch angle and wind range) |
| **Experiment ID** | A label like `EXP-001` that identifies which experiment a measurement belongs to |
| **Source** | Identifies where data came from: `simulator` (software-generated) or `esp32` (real hardware) |
| **Telemetry** | A collection of measurement values sent at a single point in time |
| **Simulator** | A software tool that generates realistic fake measurements for testing and demonstration |
| **Seed Data** | A batch of 300 pre-generated simulated records loaded into the database for testing |

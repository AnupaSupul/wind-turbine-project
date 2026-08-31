# Measurements

## What Is Measured?

The wind turbine system records several measurements each time a telemetry reading is taken. This page explains each measurement in engineering terms.

## Measurement Details

### Wind Speed
- **Unit:** metres per second (m/s)
- **What it means:** How fast the air is moving past the turbine
- **Typical range in this project:** 2–8 m/s
- **Why it matters:** Higher wind speeds generally produce more electricity from the turbine
- **How it's measured:** A wind speed sensor (anemometer) connected to the ESP32

### Pitch Angle
- **Unit:** degrees (°)
- **What it means:** The angle at which the turbine blades are tilted relative to the wind
- **Values in this project:** 0°, 4°, 20° (one per experiment)
- **Why it matters:** The pitch angle controls how much wind energy is captured by the blades. A blade turned too far into or away from the wind will capture less energy
- **How it's controlled:** A NEMA17 stepper motor driven by a DRV8825 motor driver, controlled by the ESP32

### Voltage
- **Unit:** Volts (V)
- **What it means:** The electrical "pressure" produced by the generator
- **Typical range in this project:** 4–10 V
- **Why it matters:** Voltage increases with wind speed as the generator spins faster
- **How it's measured:** An INA219 voltage/current sensor connected to the ESP32

### Current
- **Unit:** Amperes (A)
- **What it means:** The flow of electrical charge produced by the generator
- **Typical range in this project:** 0.5–2.1 A
- **Why it matters:** Current represents the amount of electricity flowing through the circuit
- **How it's measured:** The same INA219 sensor measures both voltage and current

### Power
- **Unit:** Watts (W)
- **What it means:** The rate of electrical energy production
- **How it's calculated:** **Power = Voltage × Current**
- **Typical range in this project:** 3–20 W
- **Why it matters:** Power is the primary output of the wind turbine and the main metric of interest for engineering analysis
- **Important:** Power is **not measured directly** — it is calculated by the backend server from the measured voltage and current

### Stepper Position
- **Unit:** motor steps
- **What it means:** The current position of the stepper motor that controls blade pitch
- **How it relates to pitch:** Approximately 50 steps per degree of pitch change
- **Why it matters:** Tracks the physical position of the pitch mechanism

### Timestamp
- **Format:** ISO 8601 date/time (e.g., `2026-08-29T13:50:07.992Z`)
- **What it means:** The exact time the measurement was taken
- **Why it matters:** Allows measurements to be placed on a timeline for trend analysis

### Experiment ID
- **Format:** Text string (e.g., `EXP-001`)
- **What it means:** Identifies which experiment the measurement belongs to
- **Why it matters:** Allows filtering and comparing results from different experimental setups

### Source
- **Values:** `simulator`, `esp32`, or `manual`
- **What it means:** Where the measurement came from
- **Why it matters:** Distinguishes real hardware data from simulated test data

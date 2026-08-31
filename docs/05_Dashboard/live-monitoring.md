# Live Monitoring

## Header Bar

At the top of the dashboard you see:

### Title
**"Wind Turbine IoT Monitoring"** with subtitle "Real-Time Wind Turbine Performance Monitoring"

### Data Source Badge
A coloured label showing where the data is coming from:
- **SIMULATOR** (yellow) — Data is from the software simulator
- **REAL HARDWARE** (green) — Data is from the real ESP32 (future)

### Connection Status
A small indicator showing whether the dashboard can reach the backend:
- **🟢 Backend Connected** — Everything is working
- **🔴 Backend Offline** — The backend server is not running or unreachable

### Last Update
Shows the time of the most recent measurement received.

## Live Metric Cards

Below the header, six cards display the current values:

| Card | What It Shows | Unit |
|---|---|---|
| 🌬️ Wind Speed | How fast the wind is blowing | m/s |
| 📐 Pitch Angle | The angle of the turbine blades | ° (degrees) |
| ⚡ Voltage | Electrical voltage from the generator | V (Volts) |
| 🔌 Current | Electrical current from the generator | A (Amperes) |
| 💡 Power | Electrical power output (highlighted) | W (Watts) |
| ⚙️ Stepper Position | Motor position for blade pitch | steps |

These values **update 5 times per second**. You should see the numbers change continuously when the simulator or ESP32 is running.

The **Power** card is highlighted (blue border) because it is the primary metric of interest.

If no data is available, the cards display "—" instead of numbers.

## Live Trend Chart

Below the metric cards, a **rolling line chart** shows how a selected measurement changes over time.

### Metric Selector
Five buttons above the chart let you choose which measurement to display:
- **Wind Speed** — blue line
- **Power** — amber/yellow line
- **Voltage** — green line
- **Current** — purple line
- **Pitch Angle** — red line

### Reading the Chart
- The **horizontal axis** shows the time of each measurement
- The **vertical axis** shows the measurement value
- The chart shows approximately the **last 60 data points** (about 12 seconds)
- Older data scrolls off the left edge

### What to Look For
- **Upward trends** — the measurement is increasing
- **Downward trends** — the measurement is decreasing
- **Flat lines** — the measurement is stable
- **Sudden changes** — when the simulator switches experiments, you may see a jump in values

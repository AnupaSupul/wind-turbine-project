# Analytics

## Summary Statistics

This card shows aggregated statistics across all measurements (or a filtered experiment). It displays:

### For Each Measurement (Wind Speed, Power, Voltage, Current):
- **AVG** — The average (mean) value across all records
- **MIN** — The smallest value recorded
- **MAX** — The largest value recorded

### Record Count
Shows the total number of measurements included in the statistics.

### How to Read It

Example interpretation:
> "Across 300 measurements, the average power was 10.71 W, with a minimum of 3.11 W and a maximum of 19.89 W."

When filtered by experiment:
> "For EXP-002 (100 measurements at 4° pitch), the average power was 14.3 W."

## Power Analysis Charts

Two bar charts provide engineering insight into turbine performance:

### Power vs Wind Speed
- **Horizontal axis:** Wind speed buckets (grouped by rounded m/s values)
- **Vertical axis:** Average power output (W)
- **What it shows:** How power changes with wind speed
- **What to look for:** Power generally increases with wind speed. The shape of this curve reveals the turbine's power characteristics.

### Power vs Pitch Angle
- **Horizontal axis:** Each pitch angle tested (0°, 4°, 20°)
- **Vertical axis:** Average power output (W)
- **Bars:** Each pitch angle gets a different colour
- **What it shows:** How average power differs across pitch angles

> [!WARNING]
> Different pitch angles were tested under different wind conditions. Direct power comparison may not reflect pitch effectiveness alone.
>
> This is important — the experiments have different wind speed ranges, so observed power differences may be due to wind speed differences, not just pitch angle differences. For a fair comparison, a controlled experiment would need to test each pitch angle at the **same wind speeds**.

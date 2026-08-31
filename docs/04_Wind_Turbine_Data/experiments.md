# Experiments

## What Is an Experiment?

An experiment is a set of measurements taken under specific, controlled conditions. Each experiment uses a fixed **pitch angle** while the wind speed and resulting electrical output are recorded over time.

## Experiment Configurations

The system currently has three experiments defined:

### EXP-001 — Low Wind, Zero Pitch

| Parameter | Value |
|---|---|
| Experiment ID | `EXP-001` |
| Pitch Angle | **0°** (blades facing directly into the wind) |
| Wind Speed Range | 2–4 m/s |
| Starting Voltage | ~4.0 V |
| Starting Current | ~0.5 A |
| Stepper Base Position | 0 steps |
| Seed Records | 100 |

**Purpose:** Baseline measurement with blades at zero pitch in low-wind conditions.

### EXP-002 — Medium Wind, Small Pitch

| Parameter | Value |
|---|---|
| Experiment ID | `EXP-002` |
| Pitch Angle | **4°** |
| Wind Speed Range | 3–6 m/s |
| Starting Voltage | ~6.0 V |
| Starting Current | ~0.8 A |
| Stepper Base Position | 200 steps |
| Seed Records | 100 |

**Purpose:** Tests whether a small 4° pitch adjustment improves power output at medium wind speeds.

### EXP-003 — Higher Wind, Large Pitch

| Parameter | Value |
|---|---|
| Experiment ID | `EXP-003` |
| Pitch Angle | **20°** |
| Wind Speed Range | 5–8 m/s |
| Starting Voltage | ~5.0 V |
| Starting Current | ~0.6 A |
| Stepper Base Position | 1000 steps |
| Seed Records | 100 |

**Purpose:** Tests a large 20° pitch angle at higher wind speeds.

## How Experiments Are Used

### Filtering
The dashboard allows you to filter all views by experiment. For example, clicking `EXP-002` shows only measurements from that experiment.

### Comparison
The experiment comparison panel shows all three experiments side by side with their average wind speed, average power, and record count. This lets you quickly see which conditions produced the most power.

### Analytics
The summary statistics and power analysis charts can be filtered per experiment, helping answer questions like: "What was the average power output for EXP-001?"

## Important Note About Comparing Experiments

Different experiments were tested under **different wind conditions** (different wind speed ranges). When comparing power outputs between experiments, remember that differences in power may come from different wind conditions, not just the pitch angle change.

For example, if EXP-002 (4° pitch) produced more average power than EXP-001 (0° pitch), it could be because EXP-002 also experienced higher wind speeds — not necessarily because 4° is a better pitch angle.

# ESP32 Data Flow

## What Is the ESP32?

The ESP32-S3 is a small microcontroller — a tiny computer about the size of a postage stamp. In this project, it is connected to:

- A **wind speed sensor** — measures how fast the wind is blowing
- An **INA219 sensor** — measures the voltage and current from the generator
- A **DRV8825 + NEMA17 stepper motor** — controls the blade pitch angle

## How Will It Send Data?

When the real hardware is connected, the ESP32 will:

1. Read the sensor values (wind speed, voltage, current)
2. Know its current pitch angle and stepper position
3. Package these values into a small data message (JSON format)
4. Send the message to the backend over Wi-Fi

The message looks like this:

```json
{
  "experimentId": "EXP-001",
  "source": "esp32",
  "windSpeed": 4.52,
  "pitchAngle": 4,
  "stepperPosition": 200,
  "voltage": 8.20,
  "current": 1.10
}
```

Notice that `power` is **not** included — the backend calculates it.

## Current Status

The ESP32 hardware is **not yet connected**. A software simulator currently sends the same type of messages in the ESP32's place. The backend and dashboard work identically with both sources.

## Future Integration

When the ESP32 is ready:

1. Program the ESP32 to send HTTP POST requests to `http://<computer-ip>:5000/api/telemetry`
2. Set `source` to `"esp32"` instead of `"simulator"`
3. The dashboard will automatically show `REAL HARDWARE` instead of `SIMULATOR`
4. No other software changes are needed

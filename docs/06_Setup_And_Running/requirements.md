# Requirements

## What You Need Before Starting

### Software Requirements

| Software | Version | Purpose | Download |
|---|---|---|---|
| **Node.js** | v18 or newer | Runs the backend server and simulator | [nodejs.org](https://nodejs.org/) |
| **npm** | Included with Node.js | Installs code libraries | Installed with Node.js |
| **Web browser** | Chrome, Firefox, or Edge | Viewing the dashboard | Already installed |
| **Text editor** | VS Code recommended | Editing configuration files | [code.visualstudio.com](https://code.visualstudio.com/) |

### Online Accounts

| Service | Purpose | Required? |
|---|---|---|
| **MongoDB Atlas** | Cloud database for storing measurements | ✅ Yes — you need a free account |

### Network Requirements

- Internet connection (for MongoDB Atlas)
- Ports **5000** and **5173** must be available on your computer

### Hardware (Optional — Future)

| Hardware | Purpose |
|---|---|
| ESP32-S3 | Reads sensors and sends data over Wi-Fi |
| INA219 | Measures voltage and current |
| Wind speed sensor | Measures wind |
| DRV8825 + NEMA17 | Controls blade pitch |

The hardware is **not required** to run the software. The simulator generates data without any hardware.

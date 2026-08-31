# Installation

## Step 1: Verify Node.js Is Installed

Open a terminal (Command Prompt or PowerShell) and type:

```bash
node --version
```

You should see something like `v22.23.1`. If you get an error, install Node.js from [nodejs.org](https://nodejs.org/).

## Step 2: Install Backend Dependencies

Navigate to the backend folder and install:

```bash
cd backend
npm install
```

This downloads all the libraries the backend needs. It may take a minute or two.

**Expected output:** You should see packages being downloaded, ending with something like:
```
added 95 packages in 15s
```

## Step 3: Install Frontend Dependencies

Navigate to the frontend folder and install:

```bash
cd frontend
npm install
```

This downloads all the libraries the dashboard needs.

**Expected output:** Similar to the backend, ending with:
```
added 250 packages in 30s
```

## Step 4: Verify Installation

Check that both folders have a `node_modules` directory:

```
backend/node_modules/    ← Should exist after Step 2
frontend/node_modules/   ← Should exist after Step 3
```

If either is missing, run `npm install` in that folder again.

## Troubleshooting Installation

| Problem | Solution |
|---|---|
| Permission errors | Run the terminal as Administrator (Windows) |
| Network errors | Check your internet connection |
| `npm: command not found` | Node.js is not installed — download from nodejs.org |
| Very slow installation | Normal on first run; subsequent installs are faster |

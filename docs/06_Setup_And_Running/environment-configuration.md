# Environment Configuration

## What Is a .env File?

The `.env` file contains sensitive settings (like database passwords) that should not be shared publicly. Each developer creates their own `.env` file locally.

## Backend .env File

Create a file called `.env` inside the `backend/` folder:

```
backend/.env
```

With this content:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/windturbine?retryWrites=true&w=majority
```

### Replacing the Placeholders

| Placeholder | Replace With |
|---|---|
| `<username>` | Your MongoDB Atlas username |
| `<password>` | Your MongoDB Atlas password |
| `<cluster>` | Your Atlas cluster hostname |

### Finding Your MongoDB Atlas Connection String

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Add `/windturbine` before the `?` to specify the database name

### Example (with fake credentials)

```env
PORT=5000
MONGO_URI=mongodb+srv://myuser:mypassword123@cluster0.abc123.mongodb.net/windturbine?retryWrites=true&w=majority
```

## Frontend .env File

The frontend has its own `.env` file in the `frontend/` folder:

```
frontend/.env
```

With this content:

```env
VITE_API_BASE_URL=http://localhost:5000
```

This tells the dashboard where the backend server is running. You only need to change this if the backend runs on a different port or machine.

## Security

- The `.env` files are listed in `.gitignore` and will **not** be committed to the code repository
- Never share your MongoDB password in code, screenshots, or documentation
- Each team member should create their own `.env` files

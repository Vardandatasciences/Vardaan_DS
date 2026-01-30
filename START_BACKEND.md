# 🚀 How to Run Backend Server - Quick Steps

## Prerequisites
- Node.js (v16 or higher) installed
- npm installed

## Steps to Run Backend

### 1. Open Terminal/PowerShell
Open your terminal (PowerShell, CMD, or Git Bash)

### 2. Navigate to Backend Directory
```bash
cd "C:\Users\Admin\Downloads\vardaands 7\vardaands\src\backend"
```

Or if you're already in the project root:
```bash
cd vardaands/src/backend
```

### 3. Install Dependencies (First Time Only)
```bash
npm install
```

This installs all required packages. You only need to do this once, or when package.json changes.

### 4. Create .env File (First Time Only)
Create a file named `.env` in the `vardaands/src/backend` directory.

**Quick way - Copy and paste this content:**

```env
NODE_ENV=development
PORT=10000
FRONTEND_URL=http://localhost:3000
PRODUCTION_URL=http://localhost:3000
```

The database and email settings are already hardcoded in the server.js, so you don't need to add them unless you want to override them.

### 5. Start the Backend Server
```bash
npm start
```

**OR for development with auto-reload:**
```bash
npm run dev
```

### 6. Verify Backend is Running
You should see output like:
```
🚀 Server running on port 10000
✅ Backend API server ready
🌐 API endpoints available at /api/*
📊 Health check: /api/health
✅ MySQL connection pool initialized successfully
```

### 7. Test the API
Open your browser and visit:
- Health check: http://localhost:10000/api/health
- Products list: http://localhost:10000/api/product-resources
- Specific product: http://localhost:10000/api/product-resources/GRC

## 🎯 Start Frontend (Separate Terminal)

### Open a NEW terminal window

1. Navigate to project root:
```bash
cd "C:\Users\Admin\Downloads\vardaands 7\vardaands"
```

2. Start React app:
```bash
npm start
```

The frontend will automatically use `http://localhost:10000` for API calls in development mode.

3. Test the frontend:
- Resources page: http://localhost:3000/resources
- Product page: http://localhost:3000/resources/GRC

## 🛑 Stop the Server

Press `Ctrl + C` in the terminal where the server is running.

## ⚠️ Troubleshooting

### Port 10000 Already in Use
**Windows PowerShell:**
```powershell
# Find the process using port 10000
netstat -ano | findstr :10000

# Kill the process (replace <PID> with the actual Process ID)
taskkill /PID <PID> /F
```

**Or change the port in .env:**
```env
PORT=10001
```

### Module Not Found Error
Run `npm install` again to install missing dependencies.

### Database Connection Error
- The database credentials are already in the code
- Make sure your IP is whitelisted in AWS RDS security group
- Check your internet connection

### CORS Error in Browser
- Make sure `FRONTEND_URL=http://localhost:3000` is in `.env`
- Restart the backend server after updating `.env`

## 📝 Notes

- Keep the backend server running while developing
- The server will auto-reload with `npm run dev` (requires nodemon)
- All API endpoints are available at `http://localhost:10000/api/*`
- Database tables are created automatically if they don't exist

## ✅ Success Checklist

- [ ] Backend server shows "Server running on port 10000"
- [ ] http://localhost:10000/api/health returns JSON
- [ ] http://localhost:10000/api/product-resources returns products
- [ ] Frontend connects to backend (no CORS errors)
- [ ] http://localhost:3000/resources shows products
- [ ] http://localhost:3000/resources/GRC shows product page


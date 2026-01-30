# Quick Start Guide - Local Testing

## 🚀 Quick Setup (3 Steps)

### Step 1: Setup Backend Environment

Navigate to backend directory and create `.env` file:

```bash
cd vardaands/src/backend
```

Create a `.env` file with this content:

```env
NODE_ENV=development
PORT=10000
FRONTEND_URL=http://localhost:3000
PRODUCTION_URL=http://localhost:3000
```

(Other database and email settings are already in the code, but you can add them to `.env` if needed)

### Step 2: Start Backend Server

In the `vardaands/src/backend` directory:

```bash
npm install
npm start
```

Wait for: `🚀 Server running on port 10000`

### Step 3: Start Frontend

Open a **NEW terminal window** and in the `vardaands` directory:

```bash
npm start
```

The frontend will automatically use `http://localhost:10000` for the API in development mode.

## ✅ Test It

1. **Backend Health**: http://localhost:10000/api/health
2. **Products List**: http://localhost:10000/api/product-resources
3. **Specific Product**: http://localhost:10000/api/product-resources/GRC
4. **Frontend Resources**: http://localhost:3000/resources
5. **Product Page**: http://localhost:3000/resources/GRC

## 🐛 Troubleshooting

**Port already in use?**
- Windows: `netstat -ano | findstr :10000` then `taskkill /PID <PID> /F`
- Mac/Linux: `lsof -ti:10000 | xargs kill -9`

**API not found?**
- Make sure backend is running on port 10000
- Check browser console for the actual API URL being called
- Verify no CORS errors

## 📝 Full Guide

See `LOCAL_SETUP_GUIDE.md` for detailed instructions.


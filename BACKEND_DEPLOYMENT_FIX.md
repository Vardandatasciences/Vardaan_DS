# Backend Deployment Fix - Blog Endpoints Issue

## Problem
The production server is running `server.js` which doesn't have blog endpoints. Blog endpoints are in `combined-server.js`.

## Quick Fix Steps

### Step 1: SSH into your Hostinger VPS
```bash
ssh your-username@your-server-ip
```

### Step 2: Navigate to your backend directory
```bash
cd /var/www/html  # or wherever your backend is located
# OR if it's in the project directory:
cd /path/to/vardaands/src/backend
```

### Step 3: Check what's currently running
```bash
# If using PM2:
pm2 list

# If using systemd:
systemctl status your-service-name

# If using screen/tmux:
screen -ls
# or
tmux ls

# If using direct node process:
ps aux | grep node
```

### Step 4: Stop the current server

**If using PM2:**
```bash
pm2 stop all
# OR if you have a specific name:
pm2 stop server
pm2 delete server  # Remove the old process
```

**If using systemd:**
```bash
sudo systemctl stop your-service-name
```

**If using screen:**
```bash
screen -r session-name
# Then press Ctrl+C to stop
```

**If using direct node:**
```bash
# Find the process ID
ps aux | grep "node.*server.js"
# Kill it (replace PID with actual process ID)
kill -9 PID
```

### Step 5: Start combined-server.js

**If using PM2 (Recommended):**
```bash
# Navigate to backend directory
cd /path/to/vardaands/src/backend

# Start combined-server.js
pm2 start combined-server.js --name backend

# Save PM2 configuration
pm2 save

# Enable PM2 to start on reboot
pm2 startup
```

**If using systemd:**
Create or update your service file:
```bash
sudo nano /etc/systemd/system/vardaands-backend.service
```

Add this content:
```ini
[Unit]
Description=Vardaan Backend API Server
After=network.target

[Service]
Type=simple
User=your-username
WorkingDirectory=/path/to/vardaands/src/backend
ExecStart=/usr/bin/node combined-server.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=5000

[Install]
WantedBy=multi-user.target
```

Then:
```bash
sudo systemctl daemon-reload
sudo systemctl start vardaands-backend
sudo systemctl enable vardaands-backend  # Enable on boot
```

**If using screen:**
```bash
screen -S backend
cd /path/to/vardaands/src/backend
node combined-server.js
# Press Ctrl+A then D to detach
```

**If using direct node:**
```bash
cd /path/to/vardaands/src/backend
nohup node combined-server.js > server.log 2>&1 &
```

### Step 6: Verify it's working

```bash
# Check if server is running
pm2 status
# OR
curl http://localhost:5000/api/health
# OR
curl https://vardaands.com/api/health

# Test blog endpoint
curl https://vardaands.com/api/blogs
```

If you see JSON data with blog posts, it's working!

### Step 7: Update your reverse proxy (if using Nginx/Apache)

Make sure your reverse proxy is pointing to the correct port. Check your Nginx/Apache config:

```bash
sudo nano /etc/nginx/sites-available/vardaands
# OR
sudo nano /etc/apache2/sites-available/vardaands.conf
```

Ensure it's proxying to the correct port where combined-server.js is running.

## Alternative: Add Blog Routes to server.js

If you prefer to keep using `server.js`, you'll need to:
1. Copy blog routes from `combined-server.js` (lines ~1879-2109)
2. Copy blog database connection code
3. Copy blog-related middleware and dependencies
4. Add them to `server.js` before the catch-all route

**This is NOT recommended** - using `combined-server.js` is simpler and safer.

## Verify Fix

Visit in browser:
- `https://vardaands.com/api/health` - Should return health status
- `https://vardaands.com/api/blogs` - Should return JSON blog data

If you see `{"message":"Vardaan DS API Server"}`, the wrong server is still running.


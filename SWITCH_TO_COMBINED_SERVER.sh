#!/bin/bash
# Script to switch from server.js to combined-server.js

echo "🔍 Checking current running processes..."

# Check if PM2 is installed and has processes
if command -v pm2 &> /dev/null; then
    echo "📊 PM2 processes:"
    pm2 list
    
    echo ""
    echo "🛑 Stopping all PM2 processes..."
    pm2 stop all
    pm2 delete all
    
    echo "🚀 Starting combined-server.js with PM2..."
    cd /var/www/vardaands/backend
    pm2 start combined-server.js --name backend
    
    echo "💾 Saving PM2 configuration..."
    pm2 save
    
    echo "✅ Server switched to combined-server.js"
    echo "📊 Current PM2 status:"
    pm2 list
    
    echo ""
    echo "🧪 Testing blog endpoint in 3 seconds..."
    sleep 3
    curl -s https://vardaands.com/api/blogs | head -c 500
    echo ""
else
    echo "PM2 not found. Checking for other node processes..."
    
    # Check for running node processes
    ps aux | grep "node.*server.js\|node.*combined-server.js" | grep -v grep
    
    echo ""
    echo "Please manually:"
    echo "1. Stop the current server (Ctrl+C or kill the process)"
    echo "2. Run: cd /var/www/vardaands/backend && node combined-server.js"
    echo "3. Or install PM2: npm install -g pm2"
fi


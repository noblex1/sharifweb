#!/bin/bash

echo "🔍 Checking MongoDB status..."
if sudo systemctl is-active --quiet mongod; then
    echo "✅ MongoDB is running"
else
    echo "⚠️  MongoDB is not running. Starting it..."
    sudo systemctl start mongod
    sleep 2
    if sudo systemctl is-active --quiet mongod; then
        echo "✅ MongoDB started successfully"
    else
        echo "❌ Failed to start MongoDB"
        exit 1
    fi
fi

echo ""
echo "🚀 Starting backend server..."
cd backend
npm run dev

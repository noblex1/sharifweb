# ✅ MongoDB Setup Complete!

MongoDB has been successfully installed and configured on your system.

## 🎉 What Was Done

1. ✅ Installed MongoDB Community Edition 7.0
2. ✅ Started MongoDB service
3. ✅ Enabled MongoDB to start on boot
4. ✅ Verified MongoDB is running on port 27017

## 📊 MongoDB Status

```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB (if stopped)
sudo systemctl start mongod

# Stop MongoDB
sudo systemctl stop mongod

# Restart MongoDB
sudo systemctl restart mongod
```

## 🚀 Start Your Backend

### Option 1: Using the start script (Recommended)
```bash
./start-backend.sh
```

### Option 2: Manual start
```bash
cd backend
npm run dev
```

The backend will now connect to MongoDB successfully!

## 🔧 MongoDB Connection Details

- **Host:** localhost
- **Port:** 27017
- **Connection String:** `mongodb://localhost:27017/portfolio`
- **Database:** portfolio (created automatically)

## 📝 Next Steps

### 1. Start the backend
```bash
cd backend
npm run dev
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on port 5000
```

### 2. Create your admin account
```bash
cd backend
npm run create-admin
```

### 3. Start the frontend
```bash
# In a new terminal
npm run dev
```

### 4. Login to admin dashboard
Go to: http://localhost:5173/admin/login

## 🛠️ Useful MongoDB Commands

### Access MongoDB Shell
```bash
mongosh
```

### View databases
```bash
mongosh --eval "show dbs"
```

### View collections in portfolio database
```bash
mongosh portfolio --eval "show collections"
```

### View all users
```bash
mongosh portfolio --eval "db.users.find().pretty()"
```

### View all projects
```bash
mongosh portfolio --eval "db.projects.find().pretty()"
```

## 🔒 Security Notes

- MongoDB is running locally without authentication (fine for development)
- For production, enable authentication
- The database is only accessible from localhost

## 📊 MongoDB Service Management

### Check status
```bash
sudo systemctl status mongod
```

### View logs
```bash
sudo journalctl -u mongod -f
```

### Configuration file
```bash
sudo nano /etc/mongod.conf
```

## 🐛 Troubleshooting

### Backend still can't connect?
```bash
# Check if MongoDB is listening on port 27017
sudo netstat -tulpn | grep 27017

# Check MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log
```

### Port already in use?
```bash
# Find what's using port 27017
sudo lsof -i :27017
```

### Restart everything
```bash
# Restart MongoDB
sudo systemctl restart mongod

# Restart backend
cd backend
npm run dev
```

## ✅ Verification Checklist

- [x] MongoDB installed
- [x] MongoDB service running
- [x] MongoDB enabled on boot
- [x] Port 27017 accessible
- [ ] Backend connects successfully
- [ ] Admin account created
- [ ] Can login to admin dashboard

## 🎯 Quick Start Commands

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Create admin (one time)
cd backend
npm run create-admin

# Terminal 3 - Frontend
npm run dev
```

---

**MongoDB is ready!** Your backend should now connect successfully. 🎉

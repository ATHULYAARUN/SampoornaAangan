# 🗄️ Complete MongoDB Setup Guide

## 📥 Step 1: Download and Install MongoDB

### For Windows:

1. **Download MongoDB Community Server**:
   - Go to: https://www.mongodb.com/try/download/community
   - Select: Windows x64
   - Click "Download"

2. **Install MongoDB**:
   - Run the downloaded `.msi` file
   - Choose "Complete" installation
   - Check "Install MongoDB as a Service"
   - Check "Run service as Network Service user"
   - Install MongoDB Compass (GUI tool) - recommended for beginners

3. **Verify Installation**:
   - Open Command Prompt as Administrator
   - Type: `mongod --version`
   - You should see MongoDB version information

### For macOS:

1. **Using Homebrew** (recommended):
   ```bash
   # Install Homebrew if you don't have it
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # Install MongoDB
   brew tap mongodb/brew
   brew install mongodb-community
   ```

2. **Start MongoDB**:
   ```bash
   brew services start mongodb-community
   ```

### For Linux (Ubuntu/Debian):

1. **Import MongoDB GPG Key**:
   ```bash
   wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
   ```

2. **Add MongoDB Repository**:
   ```bash
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
   ```

3. **Install MongoDB**:
   ```bash
   sudo apt-get update
   sudo apt-get install -y mongodb-org
   ```

4. **Start MongoDB**:
   ```bash
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

## 🚀 Step 2: Start MongoDB Service

### Windows:
- MongoDB should start automatically as a service
- If not, open Services (services.msc) and start "MongoDB Server"
- Or run in Command Prompt: `net start MongoDB`

### macOS:
```bash
brew services start mongodb-community
```

### Linux:
```bash
sudo systemctl start mongod
sudo systemctl status mongod  # Check status
```

## 🔍 Step 3: Verify MongoDB is Running

### Method 1: Command Line
```bash
# Connect to MongoDB shell
mongosh
# or if you have older version
mongo

# You should see MongoDB shell prompt
# Type 'exit' to quit
```

### Method 2: Check Process
```bash
# Windows
tasklist | findstr mongod

# macOS/Linux
ps aux | grep mongod
```

### Method 3: Check Port
```bash
# Windows
netstat -an | findstr :27017

# macOS/Linux
netstat -an | grep :27017
```

## 🎯 Step 4: MongoDB Compass (GUI Tool)

1. **Open MongoDB Compass** (installed with MongoDB)
2. **Connect to**: `mongodb://localhost:27017`
3. **Click "Connect"**
4. You should see the MongoDB interface

## 📊 Step 5: Create Your Database

### Using MongoDB Shell:
```javascript
// Connect to MongoDB
mongosh

// Create and switch to your database
use sampoornaangan

// Create a test collection
db.users.insertOne({name: "Test User", email: "test@example.com"})

// View your databases
show dbs

// View collections in current database
show collections

// Find documents in users collection
db.users.find()
```

### Using MongoDB Compass:
1. Click "Create Database"
2. Database Name: `sampoornaangan`
3. Collection Name: `users`
4. Click "Create Database"

## 🔧 Step 6: MongoDB Configuration (Optional)

### Default Configuration:
- **Host**: localhost
- **Port**: 27017
- **Database Path**: 
  - Windows: `C:\Program Files\MongoDB\Server\6.0\data\`
  - macOS: `/usr/local/var/mongodb`
  - Linux: `/var/lib/mongodb`

### Custom Configuration File:
Create `mongod.conf`:
```yaml
# mongod.conf
storage:
  dbPath: /var/lib/mongodb
  journal:
    enabled: true

systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

net:
  port: 27017
  bindIp: 127.0.0.1

processManagement:
  fork: true
  pidFilePath: /var/run/mongodb/mongod.pid
```

## 🛠️ Troubleshooting

### Common Issues:

1. **"MongoDB service won't start"**:
   - Check if port 27017 is already in use
   - Run as Administrator/sudo
   - Check MongoDB logs

2. **"Connection refused"**:
   - Verify MongoDB service is running
   - Check firewall settings
   - Ensure correct port (27017)

3. **"Database path not found"**:
   - Create data directory manually
   - Set proper permissions

### Windows Specific:
```cmd
# Create data directory
mkdir C:\data\db

# Start MongoDB manually
mongod --dbpath C:\data\db
```

### macOS/Linux Specific:
```bash
# Check MongoDB logs
tail -f /usr/local/var/log/mongodb/mongo.log

# Create data directory
sudo mkdir -p /data/db
sudo chown -R $USER /data/db
```

## 📱 MongoDB Tools

### 1. MongoDB Compass (GUI)
- Visual interface for MongoDB
- Query builder
- Performance monitoring
- Schema analysis

### 2. MongoDB Shell (mongosh)
- Command-line interface
- JavaScript-based
- Direct database operations

### 3. Studio 3T (Third-party)
- Advanced MongoDB GUI
- SQL to MongoDB query conversion
- Data import/export tools

## 🔐 Security (Production)

### Enable Authentication:
```javascript
// In MongoDB shell
use admin
db.createUser({
  user: "admin",
  pwd: "your-secure-password",
  roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"]
})
```

### Start with Authentication:
```bash
mongod --auth
```

## 📚 Useful MongoDB Commands

### Database Operations:
```javascript
// Show all databases
show dbs

// Use/create database
use myDatabase

// Drop database
db.dropDatabase()
```

### Collection Operations:
```javascript
// Show collections
show collections

// Create collection
db.createCollection("myCollection")

// Drop collection
db.myCollection.drop()
```

### Document Operations:
```javascript
// Insert document
db.users.insertOne({name: "John", age: 30})

// Insert multiple documents
db.users.insertMany([
  {name: "Alice", age: 25},
  {name: "Bob", age: 35}
])

// Find documents
db.users.find()
db.users.find({age: {$gt: 30}})

// Update document
db.users.updateOne({name: "John"}, {$set: {age: 31}})

// Delete document
db.users.deleteOne({name: "John"})
```

## 🎯 Next Steps

After MongoDB is installed and running:
1. ✅ Verify connection with MongoDB Compass
2. ✅ Create your project database
3. ✅ Test basic operations
4. ✅ Configure your Node.js application to connect
5. ✅ Set up proper error handling
6. ✅ Plan your data schema

## 📞 Getting Help

- **MongoDB Documentation**: https://docs.mongodb.com/
- **Community Forums**: https://community.mongodb.com/
- **Stack Overflow**: Tag your questions with `mongodb`
- **MongoDB University**: Free online courses

---

**Remember**: MongoDB runs on port 27017 by default. Your connection string will be:
`mongodb://localhost:27017/your-database-name`
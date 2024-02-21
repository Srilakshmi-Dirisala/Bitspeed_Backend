const sqlite3 = require('sqlite3').verbose();

// Create a new database instance
const db = new sqlite3.Database('C:\\Users\\Lenovo\\AppData\\Roaming\\DBeaverData\\workspace6\\.metadata\\sample-database-sqlite-1\\Chinook.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('Database Connection Failed! Bad Config:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

module.exports = {
  db
};

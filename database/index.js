const sqlite3 = require('sqlite3').verbose();

// Create a new database instance
const url=process.env.URL
const db = new sqlite3.Database(url, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('Database Connection Failed! Bad Config:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

module.exports = {
  db
};

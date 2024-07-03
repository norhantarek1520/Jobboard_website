const mysql = require('mysql');

// Assuming you have a process.env.DATABASE_PASSWORD set
const connectDb = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: process.env.DATABASENAME
});

connectDb.connect(function (err) {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected successfully to " + process.env.DATABASENAME + " database");
  }
});

module.exports = { connectDb };

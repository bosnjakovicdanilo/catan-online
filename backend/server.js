const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || "catan-db",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "catan"
});

db.connect(err => {
  if (err) {
    console.error("❌ MySQL connection error:", err);
    return;
  }
  console.log("✅ Connected to MySQL database.");
});

// registracija
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "INSERT INTO users (username, password_hash) VALUES (?, ?)",
    [username, password],
    (err, results) => {
      if (err) {
        console.error("❌ DB error during registration:", err);
        return res.status(500).json({
          error: "Error registering user",
          details: err.sqlMessage  // ovo je ključ
        });
      }

      console.log("✅ User registered:", username);
      res.json({ message: "User registered successfully" });
    }
  );
});


// login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.query("SELECT * FROM users WHERE username = ? AND password_hash = ?", [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: "Error logging in" });
    if (results.length > 0) {
      res.json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

app.listen(process.env.PORT || 5000, () => console.log("🚀 Backend running on port", process.env.PORT || 5000));
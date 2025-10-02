const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// konekcija na lokalni MySQL (za sada localhost, kasnije u Dockeru biće 'catan-mysql')
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "catan_db"
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
  db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], (err) => {
    if (err) return res.status(500).json({ error: "Error registering user" });
    res.json({ message: "User registered successfully" });
  });
});

// login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: "Error logging in" });
    if (results.length > 0) {
      res.json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

app.listen(5000, () => console.log("🚀 Backend running on port 5000"));

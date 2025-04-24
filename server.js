const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database('./messages.db');

// Create table if not exists
db.run("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, text TEXT)");

app.get('/messages', (req, res) => {
  db.all("SELECT * FROM messages", [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

app.post('/messages', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).send("Text required.");
  db.run("INSERT INTO messages (text) VALUES (?)", [text], function(err) {
    if (err) return res.status(500).send(err.message);
    res.status(201).json({ id: this.lastID, text });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database('./messages.db');

// Create table if not exists
db.run("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, text TEXT)");

app.get('/messages', (req, res) => {
  db.all("SELECT * FROM messages", [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

app.post('/messages', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).send("Text required.");
  db.run("INSERT INTO messages (text) VALUES (?)", [text], function(err) {
    if (err) return res.status(500).send(err.message);
    res.status(201).json({ id: this.lastID, text });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

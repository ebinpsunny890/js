const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',  // Replace with your DB password
  database: 'neww'       // Replace with your DB name
});

// Serve the HTML form (both registration and login forms in one page)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

// User registration - save username and email to users1 table
app.post('/users', (req, res) => {
  db.query(
    'INSERT INTO users1 (username, email) VALUES (?, ?)',
    [req.body.username, req.body.email],
    function (err) {
      if (err) return res.status(500).send('Database error saving user');
      res.send('User saved!');
    }
  );
});

// User login - check username and email in users1 table
app.post('/login', function (req, res) {
    const username = req.body.username;
    const email = req.body.email;

    db.query(
      'SELECT * FROM users1 WHERE username = ? AND email = ?',
      [username, email],
      (err, results) => {
        if (err) return res.status(500).send('Database error during login');

        if (results.length > 0) {
          res.send(`Welcome ${username}! You are logged in.`);
        } else {
          res.send('Invalid username or email');
        }
      }
    );
  });

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

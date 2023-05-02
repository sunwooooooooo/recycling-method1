const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sunwoo2001!',
  database: 'mean',
});

app.use(cors({
  origin: "*",                
  credentials: true,          
  optionsSuccessStatus: 200,  
}))

app.get(`/`, (req, res) => {
  const ob_name = req.query.result;
  const sqlQuery = `SELECT description FROM objects WHERE name = ?`;

  db.query(sqlQuery, [ob_name], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred while getting object description" });
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

app.listen(5000, function() {
  console.log('Server is listening on port 5000');
});
const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sunwoo2001!',
  database: 'mean'
});

const corsOptions = {
  origin: 'http://localhost:3000/data', // 요청을 허용할 도메인
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // 요청을 허용할 HTTP 메서드
  allowedHeaders: ['Authorization', 'Content-Type'], // 요청을 허용할 헤더
  credentials: true // 자격 증명 정보 포함 여부
};


app.use(cors(corsOptions)); // CORS 미들웨어 등록
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ', err);
    return;
  }
    console.log('Server listening on port 3000');
});



app.get('/data', (req, res) => {
  connection.query('SELECT * FROM objects', (err, rows) => {
    if (err) {
      console.error('Error executing MySQL query: ', err);
      return;
    }
    res.send(rows);
  });
});
import express from 'express';
import mysql from 'mysql';

const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test2',
});

app.use(express.json());

// Page index
app.get('/', (req, res) => {
  res.json('herllo this is backend');
});

// Page Get All Dara
app.get('/books', (req, res) => {
  const q = 'SELECT * FROM books';
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

// create data
app.post('/books', (req, res) => {
  const q = 'INSERT INTO books(`title`,`desc`,`cover`) VALUES (?)';
  const values = [req.body.title, req.body.desc, req.body.cover];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json('book has been created succesfully');
  });
});

app.listen(8000, () => {
  console.log(`The Backend is Running inport http://localhost:8000/`);
});

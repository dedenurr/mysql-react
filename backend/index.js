import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test2',
});

app.use(express.json());
app.use(cors());

// Page index
app.get('/', (req, res) => {
  res.json('herllo this is backend');
});

// Page Get All Data
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
  const q = 'INSERT INTO books(`title`,`desc`,`cover`,`price`) VALUES (?)';
  const values = [req.body.title, req.body.desc, req.body.cover, req.body.price];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json('book has been created succesfully');
  });
});

// delete
app.delete("/books/:id",(req,res)=>{
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q,[bookId],(err,data)=>{
    if(err) return res.send(err);
    return res.json("book has been deleted Successfully");
  })
}) 

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ? ";

  const values = [
    req.body.title, 
    req.body.desc,
    req.body.cover,
    req.body.price
  ]
  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json("book has been updated Successfully");
  });
});
 
app.listen(8800, () => {
  console.log(`The Backend is Running inport http://localhost:8000/`);
});

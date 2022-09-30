import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//#2 set usestae
const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get('http://localhost:8800/books');
        console.log(res);
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);


  // #3 handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`)
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }


  //#1 view
  return (
    <div>
      <h1>Shop Product</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt="" />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>${book.price}</span>
            <button className='delete' onClick={() => handleDelete(book.id)}>Delete</button>
            <button className='update'><Link to={`/update/${book.id}`}>Update</Link></button>
            
          </div>
        ))}
      </div>
      <button>
        <Link to="/add">Add new Book</Link>
      </button>
    </div>
  );
};

export default Books;

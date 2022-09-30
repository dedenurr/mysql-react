import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Update = () => {
  //#2 set usetate
  const [book, setBook] = useState({
    title: '',
    desc: '',
    price: null,
    cover: '',
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  //#4 create handle change for text or number in view
  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //debuging
  //console.log(book);

  //#45create handleClick for button in view
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:8800/books/${bookId}', book);
      navigate('/');
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  //#1 view
  //#3 handle change
  return (
    <div className='form'>
      <h1>Update The Book</h1>
      <input type="text" placeholder="title" onChange={handleChange} name="title" />
      <input type="text" placeholder="desc" onChange={handleChange} name="desc" />
      <input type="number" placeholder="price" onChange={handleChange} name="price" />
      <input type="text" placeholder="cover" onChange={handleChange} name="cover" />
      <button className='formButton' onClick={handleClick}>Update</button>
      {error && 'Something went wrong!'}
   
    </div>
  );
};

export default Update;
//https://youtu.be/fPuLnzSjPLE?t=2661
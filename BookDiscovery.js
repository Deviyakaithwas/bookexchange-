import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';

const BookDiscovery = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch all book listings
    fetch('/api/books')
      .then(response => response.json())
      .then(data => setBooks(data));
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/books/search?q=${searchQuery}`);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Book Discovery</h1>
      <Grid container spacing={2}>
        {books.map(book => (
          <Grid item key={book._id}>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
          </Grid>
        ))}
      </Grid>
      <form onSubmit={handleSearch}>
        <TextField
          label="Search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>
    </div>
  );
};

export default BookDiscovery;
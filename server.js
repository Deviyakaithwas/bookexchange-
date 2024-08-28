const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/book-exchange', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const User = mongoose.model('User', userSchema);
const Book = mongoose.model('Book', bookSchema);

app.post('/api/register', async (req, res) => {
  const { username, password, email } = req.body;
  const user = new User({ username, password, email });
  try {
    await user.save();
    res.json({ token: jwt.sign({ userId: user._id }, 'secretkey') });
  } catch (error) {
    res.status(400).json({ error: 'Username or email already exists' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    res.status(401).json({ error: 'Invalid username or password' });
  } else {
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      res.status(401).json({ error: 'Invalid username or password' });
    } else {
      res.json({ token: jwt.sign({ userId: user._id }, 'secretkey') });
    }
  }
});

app.get('/api/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.post('/api/books', async (req, res) => {
  const { title, author, genre } = req.body;
  const book = new Book({ title, author, genre, owner: req.user._id });
  try {
    await book.save();
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: 'Error creating book' });
  }
});

app.get('/api/matches', async (req, res) => {
  const user = req.user;
  const books = await Book.find({ owner: { $ne: user._id } });
  const matches = [];
  for (const book of books) {
    if (book.genre === user.preferredGenre) {
      matches.push(book);
    }
  }
  res.json(matches);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
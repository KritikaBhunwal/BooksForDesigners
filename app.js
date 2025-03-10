// Import essential packages
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const booksRouter = require('./routes/books');

const app = express();
const PORT = 5500; // Changed clearly from 5000 to 5001 to avoid conflicts

// Middleware to handle JSON requests
app.use(bodyParser.json());

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// serve static files (including your index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Books routes middleware
app.use('/books', booksRouter);

// Root endpoint for testing purposes
app.get('/', (req, res) => {
  res.send('📚 Welcome to Books for Designers API!');
});

// Handle undefined routes clearly
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

// Start server clearly on new port 5001
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const express = require('express');
const router = express.Router();

// Initial books array (10 books clearly defined)
let books = [
  { 
    id: 1,
    title: "The Design of Everyday Things",
    author: "Don Norman",
    imageUrl: "/images/DesignEverydayThings.png",
    year: 1988 
  },
  { 
    id: 2, 
    title: "Steal Like an Artist", 
    author: "Austin Kleon", 
    imageUrl: "/images/StealLikeAnArtist.png", 
    year: 2012 },
  { 
    id: 3, 
    title: "Creativity, Inc.", 
    author: "Ed Catmull", 
    imageUrl: "/images/CreativityInc.png", 
    year: 2014 },
  { 
    id: 4, 
    title: "Thinking with Type", 
    author: "Ellen Lupton", 
    imageUrl: "/images/ThinkingWithType.png", 
    year: 2010 },
  { 
    id: 5, 
    title: "Logo Design Love",
    author: "David Airey", 
    imageUrl: "/images/LogoDesignLove.png", 
    year: 2015 },
  { 
    id: 6, 
    title: "Hooked", 
    author: "Nir Eyal", 
    imageUrl: "/images/Hooked.png", 
    year: 2014 },
  { 
    id: 7, 
    title: "Don't Make Me Think", 
    author: "Steve Krug", 
    imageUrl: "/images/DontMakeMeThink.png", 
    year: 2000 },
  { 
    id: 8,
    title: "Graphic Design Thinking", 
    author: "Ellen Lupton", 
    imageUrl: "/images/GraphicDesignThinking.png", 
    year: 2011 },
  { 
    id: 9,
    title: "Sprint", 
    author: "Jake Knapp", 
    imageUrl: "/images/Sprint.png", 
    year: 2016 },
  { 
    id: 10, 
    title: "Interaction of Color", 
    author: "Josef Albers", 
    imageUrl: "/images/InteractionOfColor.png",
    year: 2006 }
];

// Helper function to find a book by ID (DRY)
const findBookById = id => books.find(book => book.id === parseInt(id));

// GET all books
router.get('/', (req, res) => {
  res.json(books);
});

// GET single book by ID
router.get('/:id', (req, res) => {
  const book = findBookById(req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found." });
  res.json(book);
});

// POST add new book
router.post('/', (req, res) => {
  const { title, author, imageUrl, year } = req.body;
  if (!title || !author || !imageUrl || !year) {
    return res.status(400).json({ error: "All fields required: title, author, imageUrl, year" });
  }
  
  const newBook = {
    id: books.length ? Math.max(...books.map(b => b.id)) + 1 : 1,
    title, author, imageUrl, year
  };
  
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update book by ID
router.put('/:id', (req, res) => {
  const book = findBookById(req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found." });

  const { title, author, imageUrl, year } = req.body;
  Object.assign(book, { title, author, imageUrl, year });

  res.json(book);
});

// DELETE remove book by ID
router.delete('/:id', (req, res) => {
  const bookIndex = books.findIndex(book => book.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).json({ error: "Book not found." });

  books.splice(bookIndex, 1);
  res.json({ message: "Book deleted successfully" });
});

module.exports = router;

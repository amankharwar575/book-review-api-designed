const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const booksController = require('../controllers/books.controller');

// Get all books (with pagination & optional filters)
router.get('/', booksController.getBooks);

// Get single book by ID
router.get('/:id', booksController.getBookById);

// Create a new book (only for logged-in users)
router.post('/', auth, booksController.createBook);

// Update a book (only the owner of the book can update)
router.put('/:id', auth, booksController.updateBook);

// Delete a book (only the owner can delete)
router.delete('/:id', auth, booksController.deleteBook);

module.exports = router;

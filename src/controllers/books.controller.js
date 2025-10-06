const Book = require('../models/book.model');

// GET /api/v1/books
exports.getBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, author } = req.query;
    const query = {};
    if (author) query.author = new RegExp(author, 'i');

    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('owner', 'name email');

    const count = await Book.countDocuments(query);
    res.json({
      total: count,
      page: parseInt(page),
      limit: parseInt(limit),
      data: books
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /api/v1/books/:id
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('owner', 'name email');
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /api/v1/books
exports.createBook = async (req, res) => {
  try {
    const { title, author, description } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const book = new Book({
      title,
      author,
      description,
      owner: req.user._id
    });

    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// PUT /api/v1/books/:id
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    if (book.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to update this book' });
    }

    const { title, author, description } = req.body;
    if (title) book.title = title;
    if (author) book.author = author;
    if (description) book.description = description;

    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE /api/v1/books/:id
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    if (book.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this book' });
    }

    await book.remove();
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

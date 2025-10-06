const Review = require('../models/review.model');
const Book = require('../models/book.model');

exports.addReview = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { rating, comment } = req.body;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const review = new Review({
      book: bookId,
      user: req.user._id,
      rating,
      comment
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getReviewsForBook = async (req, res) => {
  const reviews = await Review.find({ book: req.params.id }).populate('user', 'name');
  res.json(reviews);
};

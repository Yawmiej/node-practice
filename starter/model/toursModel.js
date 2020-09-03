const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'Price must be set'],
  },
  difficulty: {
    type: String,
    default: 'easy',
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

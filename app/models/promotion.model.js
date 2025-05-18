const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  promotedEmployee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  oldPosition: {
    type: String,
    required: true,
    trim: true,
  },
  newPosition: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('Promotion', promotionSchema);

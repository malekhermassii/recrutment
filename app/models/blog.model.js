const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    tags: {
      type: String, 
      // default: [],
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }],
    likes: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: null,
    } 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Blog', BlogSchema);

const mongoose = require('mongoose');

const Mymodel = mongoose.Schema(
  {
    Picture: String,
  }
);

module.exports = mongoose.model('Mymodel', Mymodel);

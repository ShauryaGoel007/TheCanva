const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productsSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quan: {
    type: Number,
    required: true,
  },
});

var products = mongoose.model("products", productsSchema);

module.exports = products;

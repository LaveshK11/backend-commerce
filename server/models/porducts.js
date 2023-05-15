const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  sellerDetails: {
    type: Array,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  productDesc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  reviews: {
    type: Array,
    required: true,
  },
  avrgRating: {
    type: Number,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
});
const productModel = mongoose.model("products", productSchema);
module.exports = productModel;

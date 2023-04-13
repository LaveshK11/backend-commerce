const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  sellerDetails: {
    type: Array,
    required: true,
  },
  stockAvailable: {
    type: Number,
    required: true,
  },
  productDesc: {
    type: String,
    required: true,
  },
  offeringPrice: {
    type: Number,
    required: true,
  },
  productName: {
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
});
const productModel = mongoose.model("products", productSchema);
module.exports = productModel;

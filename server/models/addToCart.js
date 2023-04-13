const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  userEmail: {
    type: String,
    required: [true, " email is required."],
  },
  productId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  versionKey: false
});
const cartModel = mongoose.model("addToCart", cartSchema);
module.exports = cartModel;

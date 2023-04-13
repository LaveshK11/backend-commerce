const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  productDetails: {
    type: Array,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  sellersInfo: {
    type: Array,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: Number,
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  addressToDeliver: {
    type: String,
    required: true,
  },
  versionKey: false
});
const userOrderModel = mongoose.model("otp", orderSchema);
module.exports = userOrderModel;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const sellersSchema = new Schema({
  sellerEmail: {
    type: String,
    required: true,
  },
  sellerAddress: {
    type: String,
    required: true,
  },
});
const sellersModel = mongoose.model("otp", sellersSchema);
module.exports = sellersModel;

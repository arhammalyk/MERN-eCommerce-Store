const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  receiptEmail: {
    type: String,
    required: true,
  },
  shippingAddress: {
    type: String,
    default: "null",
  },
  status: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: String,
    required: true,
  },
  productList: [
    {
      productId: String,
      product: String,
      quantity: Number,
      price: Number,
    },
  ],
  paymentMethodType: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Orders = model("Orders", orderSchema);
module.exports = Orders;

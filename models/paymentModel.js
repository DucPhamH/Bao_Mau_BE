const mongoose = require("mongoose");
const { PAYMENT_STATUS } = require("../constants/status");

const PaymentSchema = new mongoose.Schema(
  {
    status: { type: Number, require: true, default: PAYMENT_STATUS.NO_PAY },
    count: { type: Number, require: true },
    totalPrice: { type: Number, require: true },
    requestID: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "requests",
      require: true,
    },
  },
  {
    timestamps: true,
    collection: "payment",
  }
);

const PaymentModel = mongoose.model("payment", PaymentSchema);

module.exports = PaymentModel;

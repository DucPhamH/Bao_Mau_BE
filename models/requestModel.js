const mongoose = require("mongoose");
const { REQUEST_STATUS } = require("../constants/status");

const RequestSchema = new mongoose.Schema(
  {
    status: { type: Number, require: true },
    date: { type: Date, default: new Date().toISOString() },
    postID: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "post",
      require: true,
    },
    employeeID: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "employee",
      require: true,
    },
  },
  {
    timestamps: true,
    collection: "requests",
  }
);

const RequestModel = mongoose.model("requests", RequestSchema);

module.exports = RequestModel;

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, minlength: 5, maxlength: 160 },
    name: { type: String, maxlength: 160 },
    password: { type: String, required: true, minlength: 6, maxlength: 160 },
    address: { type: String, maxlength: 160 },
    phone: { type: String, maxlength: 20, require: true },
    roles: { type: Number, require: true },
    image: { type: String, maxlength: 1000 },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;

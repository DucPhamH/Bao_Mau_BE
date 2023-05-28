const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, maxlength: 160, default: "" },
    name: { type: String, maxlength: 160, default: "" },
    password: { type: String, required: true, minlength: 6, maxlength: 160 },
    address: { type: String, maxlength: 160, default: "" },
    phone: { type: String, maxlength: 20, require: true },
    roles: { type: Number, require: true },
    image: {
      type: String,
      maxlength: 1000,
      default:
        "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg",
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;

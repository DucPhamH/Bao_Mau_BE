const mongoose = require("mongoose");
const { POST_STATUS } = require("../constants/status");

const PostSchema = new mongoose.Schema(
  {
    dateStart: { type: Date, default: new Date().toISOString() },
    age: { type: String, default: "" },
    address: { type: String, default: "" },
    title: { type: String, default: "" },
    language: { type: String, default: "" },
    experience: { type: String, maxlength: 1000, default: "" },
    description: { type: String, maxlength: 1000, default: "" },
    degree: { type: String, default: "" },
    salary: { type: Number, require: true, default: 0 },
    status: { type: Number, require: true, default: POST_STATUS.NO_JOB },
    housemaid: { type: Boolean, require: true, default: false },
    babysister: { type: Boolean, require: true, default: false },
    mo_morning: { type: Boolean, default: false },
    mo_afternoon: { type: Boolean, default: false },
    tu_morning: { type: Boolean, default: false },
    tu_afternoon: { type: Boolean, default: false },
    we_morning: { type: Boolean, default: false },
    we_afternoon: { type: Boolean, default: false },
    th_morning: { type: Boolean, default: false },
    th_afternoon: { type: Boolean, default: false },
    fr_morning: { type: Boolean, default: false },
    fr_afternoon: { type: Boolean, default: false },
    sa_morning: { type: Boolean, default: false },
    sa_afternoon: { type: Boolean, default: false },
    su_morning: { type: Boolean, default: false },
    su_afternoon: { type: Boolean, default: false },

    userID: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
      require: true,
    },
  },
  {
    timestamps: true,
    collection: "post",
  }
);

const PostModel = mongoose.model("post", PostSchema);

module.exports = PostModel;

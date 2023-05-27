const mongoose = require("mongoose");
const GENDER = require("../constants/gender");
const EMPLOYEE_STATUS = require("../constants/status");

const EmployeeSchema = new mongoose.Schema(
  {
    dateOB: { type: Date },
    gender: { type: String, default: GENDER.OTHER },
    degree: { type: String },
    experience: { type: String },
    language: { type: String },
    description: { type: String, maxlength: 1000 },
    skill: { type: String, maxlength: 1000 },
    salary: { type: Number, require: true },
    status: { type: Number, require: true, default: EMPLOYEE_STATUS.NO_JOB },
    housemaid: { type: Boolean, require: true },
    babysister: { type: Boolean, require: true },
    userID: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
      require: true,
    },
  },
  {
    timestamps: true,
    collection: "employee",
  }
);

const EmployeeModel = mongoose.model("employee", EmployeeSchema);

module.exports = EmployeeModel;

const mongoose = require("mongoose");
const GENDER = require("../constants/gender");
const { EMPLOYEE_STATUS } = require("../constants/status");

const EmployeeSchema = new mongoose.Schema(
  {
    dateOB: { type: Date, default: new Date().toISOString() },
    gender: { type: String, default: GENDER.OTHER },
    degree: { type: String, default: "" },
    experience: { type: String, default: "" },
    language: { type: String, default: "" },
    description: { type: String, maxlength: 1000, default: "" },
    skill: { type: String, maxlength: 1000, default: "" },
    salary: { type: Number, require: true, default: 0 },
    status: { type: Number, require: true, default: EMPLOYEE_STATUS.NO_JOB },
    housemaid: { type: Boolean, require: true, default: false },
    babysister: { type: Boolean, require: true, default: false },
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

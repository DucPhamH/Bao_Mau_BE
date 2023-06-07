const asyncHandler = require("express-async-handler");
const EmployeeModel = require("../models/employeeModel");
const ROLE = require("../constants/role");
const APIFeatures = require("../middleware/apiFeatures");

const profileEmployee = asyncHandler(async (req, res, nex) => {
  const { _id } = req.user;

  const employee = await EmployeeModel.findOne({ userID: _id }).populate(
    "userID"
  );
  if (employee) {
    res
      .status(200)
      .json({ message: "lấy thông tin thành công", data: employee });
  } else {
    res.status(400).json({ message: "Lấy thông tin thất bại" });
    throw new Error("Lấy thông tin thất bại");
  }
});

const updateEmployee = asyncHandler(async (req, res, next) => {
  const { _id, roles } = req.user;

  const updateEmployee = await EmployeeModel.findOneAndUpdate(
    { userID: _id },
    req.body
  );
  if (updateEmployee) {
    res
      .status(200)
      .json({ message: "Update thành công", data: updateEmployee });
  } else {
    res.status(400).json({ message: "update thất bại" });
    throw new Error("update thất bại");
  }
});

const getAllEmployee = asyncHandler(async (req, res, next) => {
  // const { sort } = req.query;
  // const allEmployee = await EmployeeModel.find().populate({
  //   path: "userID",
  //   select: "name",
  //   options: { sort: [{ name: "asc" }] },
  // });

  // .collation({ locale: "en", caseLevel: true });

  const features = new APIFeatures(
    EmployeeModel.find({ status: 0 }).populate("userID"),
    req.query
  )
    .checkRole()
    .filter()
    .salary()
    .date()
    .sort();

  const allEmployee = await features.query;
  if (allEmployee) {
    res.status(200).json({ message: "Lấy thành công", data: allEmployee });
  } else {
    res.status(400).json({ message: "Lấy thất bại" });
    throw new Error("Lấy thất bại");
  }
});

const getEmployee = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const employee = await EmployeeModel.findById({ _id: id }).populate("userID");
  if (employee) {
    res
      .status(200)
      .json({ message: "Lấy employee thành công", data: employee });
  } else {
    res.status(400).json({ message: "Lấy thất bại" });
    throw new Error("Lấy thất bại");
  }
});

module.exports = {
  updateEmployee,
  profileEmployee,
  getAllEmployee,
  getEmployee,
};

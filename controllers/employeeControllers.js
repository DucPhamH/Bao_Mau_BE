const asyncHandler = require("express-async-handler");
const EmployeeModel = require("../models/employeeModel");
const ROLE = require("../constants/role");

const profileEmployee = asyncHandler(async (req, res, nex) => {
  const { _id, roles } = req.user;
  if (roles === ROLE.EMPLOYEE) {
    const employee = await EmployeeModel.findOne({ userID: _id }).populate(
      "userID"
    );
    if (employee) {
      res
        .status(200)
        .json({ message: "lấy thông tin thành công", data: employee });
    } else {
      res
        .status(200)
        .json({ message: "lấy thông tin thành công", data: employee });
    }
  } else {
    res.status(400).json({ message: "Bạn không có quyền truy cập" });
    throw new Error("Bạn không có quyền truy cập");
  }
});

const updateEmployee = asyncHandler(async (req, res, next) => {
  const { _id, roles } = req.user;
  const {
    dateOB,
    gender,
    degree,
    experience,
    language,
    description,
    skill,
    salary,
    housemaid,
    babysister,
  } = req.body;
  if (roles === ROLE.EMPLOYEE) {
    const employee = await EmployeeModel.findOne({ userID: _id });
    if (employee) {
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
    } else {
      const createEmployee = await EmployeeModel.create({
        userID: _id,
        dateOB: dateOB,
        gender: gender,
        degree: degree,
        experience: experience,
        language: language,
        description: description,
        skill: skill,
        salary: salary,
        housemaid: housemaid,
        babysister: babysister,
      });

      if (createEmployee) {
        res
          .status(200)
          .json({ message: "Update thành công", data: createEmployee });
      } else {
        res.status(400).json({ message: "update thất bại" });
        throw new Error("update thất bại");
      }
    }
  } else {
    res.status(400).json({ message: "Bạn không có quyền truy cập" });
    throw new Error("Bạn không có quyền truy cập");
  }
});

module.exports = { updateEmployee, profileEmployee };

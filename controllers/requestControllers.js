const asyncHandler = require("express-async-handler");
const RequestModel = require("../models/requestModel");
const APIFeatures = require("../middleware/apiFeatures");
const EmployeeModel = require("../models/employeeModel");
const { REQUEST_STATUS } = require("../constants/status");

const createRequest = asyncHandler(async (req, res, next) => {
  // const { _id } = req.user;

  const { postID, employeeID } = req.body;

  const request = await RequestModel.findOne({
    postID: postID,
    employeeID: employeeID,
  });

  if (request) {
    res
      .status(400)
      .json({ message: "gửi request thất bại, bạn đã gửi request này rồi" });
    throw new Error("Lấy thất bại");
  } else {
    const newRequest = await RequestModel.create({
      postID: postID,
      employeeID: employeeID,
    });
    if (newRequest) {
      res
        .status(200)
        .json({ message: "gửi request thành công", data: newRequest });
    } else {
      res.status(400).json({ message: "gửi request thất bại" });
      throw new Error("Lấy thất bại");
    }
  }
});

const createRequest2 = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { postID } = req.body;

  const getEmployee = await EmployeeModel.findOne({ userID: _id });

  if (getEmployee) {
    console.log(getEmployee._id);
    const request = await RequestModel.findOne({
      postID: postID,
      employeeID: getEmployee._id,
    });

    if (request) {
      res
        .status(400)
        .json({ message: "gửi request thất bại, bạn đã gửi request này rồi" });
      throw new Error("Lấy thất bại");
    } else {
      const newRequest = await RequestModel.create({
        postID: postID,
        employeeID: getEmployee._id,
      });
      if (newRequest) {
        res
          .status(200)
          .json({ message: "gửi request thành công", data: newRequest });
      } else {
        res.status(400).json({ message: "gửi request thất bại" });
        throw new Error("Lấy thất bại");
      }
    }
  } else {
    res.status(400).json({ message: "gửi request thất bại" });
    throw new Error("Lấy thất bại");
  }
});

const getAllRequest = asyncHandler(async (req, res, next) => {
  const request = await RequestModel.find({})
    .populate("employeeID")
    .populate("postID");
  if (request) {
    res.status(200).json({ message: "gửi request thành công", data: request });
  } else {
    res.status(400).json({ message: "gửi request thất bại" });
    throw new Error("Lấy thất bại");
  }
});

const getRequestEmployee = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const requestEmployee = await RequestModel.find({
    postID: id,
    status: REQUEST_STATUS.PENDING,
  })
    .populate("employeeID")
    .populate("postID");
  if (requestEmployee) {
    res.status(200).json({
      message: "gửi requestEmployee thành công",
      data: requestEmployee,
    });
  } else {
    res.status(400).json({ message: "gửi requestEmployee thất bại" });
    throw new Error("Lấy thất bại");
  }
});

module.exports = {
  createRequest,
  getAllRequest,
  createRequest2,
  getRequestEmployee,
};

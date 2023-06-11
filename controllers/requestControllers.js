const asyncHandler = require("express-async-handler");
const RequestModel = require("../models/requestModel");
const APIFeatures = require("../middleware/apiFeatures");
const EmployeeModel = require("../models/employeeModel");

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

  // const features = new APIFeatures(
  //   RequestModel.find({}).populate("employeeID").populate("postID"),
  //   req.query
  // ).sort2();

  // const request = await features.query;

  if (request) {
    res.status(200).json({ message: "gửi request thành công", data: request });
  } else {
    res.status(400).json({ message: "gửi request thất bại" });
    throw new Error("Lấy thất bại");
  }
});

module.exports = { createRequest, getAllRequest, createRequest2 };

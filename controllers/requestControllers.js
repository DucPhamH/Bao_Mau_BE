const asyncHandler = require("express-async-handler");
const RequestModel = require("../models/requestModel");
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
      status: REQUEST_STATUS.IS_USER,
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
        status: REQUEST_STATUS.IS_EMPLOYEE,
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
    status: REQUEST_STATUS.IS_EMPLOYEE,
  })
    .populate({ path: "employeeID", populate: { path: "userID" } })
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

const getRequestUser = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;

  const getEmployee = await EmployeeModel.findOne({ userID: _id });

  if (getEmployee) {
    const requestEmployee = await RequestModel.find({
      employeeID: getEmployee._id,
      status: REQUEST_STATUS.IS_USER,
    })
      .populate({ path: "employeeID", populate: { path: "userID" } })
      .populate({ path: "postID", populate: { path: "userID" } });
    if (requestEmployee) {
      res.status(200).json({
        message: "gửi requestEmployee thành công",
        data: requestEmployee,
      });
    } else {
      res.status(400).json({ message: "gửi requestEmployee thất bại" });
      throw new Error("Lấy thất bại");
    }
  } else {
    res.status(400).json({ message: "gửi request thất bại" });
    throw new Error("Lấy thất bại");
  }
});

const deleteRequestUser = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { postID } = req.body;

  const getEmployee = await EmployeeModel.findOne({ userID: _id });

  if (getEmployee) {
    const deleteRequest = await RequestModel.findOneAndDelete({
      employeeID: getEmployee._id,
      postID: postID,
    });
    if (deleteRequest) {
      res.status(200).json({
        message: "xoá thành công",
        data: deleteRequest,
      });
    } else {
      res.status(400).json({ message: "xoá thất bại" });
      throw new Error("xoá thất bại");
    }
  } else {
    res.status(400).json({ message: "Xoá thất bại" });
    throw new Error("Xoá thất bại");
  }
});
const deleteRequestEmployee = asyncHandler(async (req, res, next) => {
  const { postID, employeeID } = req.body;
  const deleteRequest = await RequestModel.findOneAndDelete({
    employeeID: employeeID,
    postID: postID,
  });
  if (deleteRequest) {
    res.status(200).json({
      message: "xoá thành công",
      data: deleteRequest,
    });
  } else {
    res.status(400).json({ message: "xoá thất bại" });
    throw new Error("xoá thất bại");
  }
});

module.exports = {
  createRequest,
  getAllRequest,
  createRequest2,
  getRequestEmployee,
  getRequestUser,
  deleteRequestEmployee,
  deleteRequestUser,
};

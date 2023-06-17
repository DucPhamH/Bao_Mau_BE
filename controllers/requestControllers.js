const asyncHandler = require("express-async-handler");
const RequestModel = require("../models/requestModel");
const EmployeeModel = require("../models/employeeModel");
const {
  REQUEST_STATUS,
  EMPLOYEE_STATUS,
  POST_STATUS,
  PAYMENT_STATUS,
} = require("../constants/status");
const PostModel = require("../models/postModel");
const PaymentModel = require("../models/paymentModel");
const { request } = require("express");

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
    if (getEmployee.status === EMPLOYEE_STATUS.HAS_JOB) {
      res.status(400).json({ message: "Bạn đã nhận việc ,gửi thất bại" });
      throw new Error("Lấy thất bại");
    } else {
      const request = await RequestModel.findOne({
        postID: postID,
        employeeID: getEmployee._id,
      });

      if (request) {
        res.status(400).json({
          message: "gửi request thất bại, bạn đã gửi request này rồi",
        });
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

const acceptRequest = asyncHandler(async (req, res, next) => {
  const { postID, employeeID } = req.body;
  const accept = await RequestModel.findOneAndUpdate(
    {
      employeeID: employeeID,
      postID: postID,
    },
    { status: REQUEST_STATUS.ACCEPT },
    { new: true }
  )
    .populate({ path: "employeeID", populate: { path: "userID" } })
    .populate({ path: "postID", populate: { path: "userID" } });
  if (accept) {
    await RequestModel.deleteMany({
      $or: [
        { postID: postID, status: 0 },
        { postID: postID, status: 1 },
      ],
    });

    await RequestModel.deleteMany({
      $or: [
        { employeeID: employeeID, status: 0 },
        { employeeID: employeeID, status: 1 },
      ],
    });

    await EmployeeModel.findOneAndUpdate(
      { _id: employeeID },
      { status: EMPLOYEE_STATUS.HAS_JOB }
    );

    await PostModel.findOneAndUpdate(
      { _id: postID },
      { status: POST_STATUS.HAS_JOB }
    );

    res.status(200).json({
      message: "Cập nhật thành công",
      data: accept,
    });
  } else {
    res.status(400).json({ message: "Cập nhật thất bại" });
    throw new Error("xoá thất bại");
  }
});

const getAcceptRequets = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;

  const getEmployee = await EmployeeModel.findOne({ userID: _id });

  if (getEmployee) {
    const getRequest = await RequestModel.find({
      $or: [
        { employeeID: getEmployee._id, status: REQUEST_STATUS.ACCEPT },
        { employeeID: getEmployee._id, status: REQUEST_STATUS.PENDING },
      ],
    })
      .populate({ path: "employeeID", populate: { path: "userID" } })
      .populate({ path: "postID", populate: { path: "userID" } });
    if (getRequest) {
      res.status(200).json({
        message: "Lấy thành công",
        data: getRequest,
      });
    } else {
      res.status(400).json({ message: "Lấy thất bại" });
      throw new Error("Lấy thất bại");
    }
  } else {
    res.status(400).json({ message: "lấy thất bại" });
    throw new Error("lấy thất bại");
  }
});

const cancelRequest = asyncHandler(async (req, res, next) => {
  const { postID } = req.body;

  const getRequest = await RequestModel.findOneAndUpdate(
    { postID: postID },
    { status: REQUEST_STATUS.PENDING }
  );

  if (getRequest) {
    await PostModel.findOneAndUpdate(
      { _id: postID },
      { status: POST_STATUS.PENDING }
    );
    res.status(200).json({
      message: "Gửi cho bảo mẫu thành công",
      data: getRequest,
    });
  } else {
    res.status(400).json({ message: "Gửi thất bại" });
    throw new Error("Gửi thất bại");
  }
});

const acceptCancelRequest = asyncHandler(async (req, res, next) => {
  const { postID, employeeID } = req.body;

  const getEmployee = await EmployeeModel.findOneAndUpdate(
    { _id: employeeID },
    { status: EMPLOYEE_STATUS.NO_JOB }
  );

  if (getEmployee) {
    await PostModel.findOneAndDelete({ _id: postID });
    const requestFind = await RequestModel.findOne({
      postID: postID,
      employeeID: employeeID,
    });
    if (requestFind) {
      await PaymentModel.findOneAndDelete({
        requestID: requestFind._id,
      });
      await RequestModel.findOneAndDelete({
        postID: postID,
        employeeID: employeeID,
      });
      res.status(200).json({
        message: "Huỷ hợp đồng thành công",
        data: getEmployee,
      });
    } else {
      res.status(400).json({ message: "Gửi thất bại" });
      throw new Error("Gửi thất bại");
    }
  } else {
    res.status(400).json({ message: "Gửi thất bại" });
    throw new Error("Gửi thất bại");
  }
});

const createPayment = asyncHandler(async (req, res, next) => {
  // const { _id } = req.user;

  const { count, requestID, totalPrice } = req.body;

  const newPayment = await PaymentModel.create({
    count: count,
    requestID: requestID,
    totalPrice: totalPrice,
  });
  if (newPayment) {
    res.status(200).json({ message: "tạo thành công", data: newPayment });
  } else {
    res.status(400).json({ message: "tạo thất bại" });
    throw new Error("Lấy thất bại");
  }
});

const getPayment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const request = await RequestModel.findOne({
    postID: id,
    status: REQUEST_STATUS.ACCEPT,
  });
  if (request) {
    const payment = await PaymentModel.findOne({
      requestID: request._id,
    }).populate([
      {
        path: "requestID",
        populate: { path: "employeeID", populate: { path: "userID" } },
      },
      {
        path: "requestID",
        populate: { path: "postID", populate: { path: "userID" } },
      },
    ]);
    if (payment) {
      res.status(200).json({ message: "Lấy thành công", data: payment });
    } else {
      res.status(400).json({ message: "Lấy thất bại" });
      throw new Error("Lấy thất bại");
    }
  } else {
    res.status(400).json({ message: "Lấy thất bại" });
    throw new Error("Lấy thất bại");
  }
});

const updatePayment = asyncHandler(async (req, res, next) => {
  const { _id } = req.body;

  const payment = await PaymentModel.findOneAndUpdate(
    {
      _id: _id,
    },
    {
      status: PAYMENT_STATUS.YES_PAY,
    }
  );
  if (payment) {
    res.status(200).json({ message: "Lấy thành công", data: payment });
  } else {
    res.status(400).json({ message: "Lấy thất bại" });
    throw new Error("Lấy thất bại");
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
  acceptRequest,
  getAcceptRequets,
  cancelRequest,
  acceptCancelRequest,
  createPayment,
  getPayment,
  updatePayment,
};

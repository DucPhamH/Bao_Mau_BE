const asyncHandler = require("express-async-handler");
const PostModel = require("../models/postModel");
const APIFeatures = require("../middleware/apiFeatures");
const EmployeeModel = require("../models/employeeModel");
const { POST_STATUS } = require("../constants/status");

const createPost = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const newPost = await PostModel.create({ userID: _id, ...req.body });
  if (newPost) {
    res.status(200).json({ message: "tạo post thành công", data: newPost });
  } else {
    res.status(400).json({ message: "tạo thất bại" });
    throw new Error("Lấy thất bại");
  }
});

const getAllPost = asyncHandler(async (req, res, next) => {
  const features = new APIFeatures(
    PostModel.find({ status: 0 }).populate("userID"),
    req.query
  )
    .checkRole()
    .filter()
    .salary()
    .filterDate()
    .sort();

  const allPosts = await features.query;
  if (allPosts) {
    res.status(200).json({ message: "Lấy thành công", data: allPosts });
  } else {
    res.status(400).json({ message: "Lấy thất bại" });
    throw new Error("Lấy thất bại");
  }
});

const getAllPostSend = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;

  const { id } = req.params;

  const employee = await EmployeeModel.findById({ _id: id });
  console.log(employee);
  if (employee) {
    if (employee.babysister === true) {
      const post = await PostModel.find({
        userID: _id,
        status: 0,
        babysister: true,
      }).populate("userID");
      if (post) {
        res.status(200).json({ message: "Lấy thành công", data: post });
      } else {
        res.status(400).json({ message: "Lấy thất bại" });
        throw new Error("Lấy thất bại");
      }
    } else if (employee.housemaid === true) {
      const post = await PostModel.find({
        userID: _id,
        status: 0,
        housemaid: true,
      }).populate("userID");
      if (post) {
        res.status(200).json({ message: "Lấy thành công", data: post });
      } else {
        res.status(400).json({ message: "Lấy thất bại" });
        throw new Error("Lấy thất bại");
      }
    } else {
      res.status(400).json({ message: "lấy thất bại" });
      throw new Error("Lấy thất bại");
    }
  } else {
    res.status(400).json({ message: "Gửi thất bại" });
    throw new Error("Gửi thất bại");
  }
});

const getPost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const post = await PostModel.findById({ _id: id }).populate("userID");
  if (post) {
    res.status(200).json({ message: "Lấy post thành công", data: post });
  } else {
    res.status(400).json({ message: "Lấy thất bại" });
    throw new Error("Lấy thất bại");
  }
});

const getAllPostUser = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const post = await PostModel.find({ userID: _id }).populate("userID");
  if (post) {
    res.status(200).json({ message: "Lấy post thành công", data: post });
  } else {
    res.status(400).json({ message: "Lấy thất bại" });
    throw new Error("Lấy thất bại");
  }
});

const getAllPostUserAccept = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const post = await PostModel.find({
    $or: [
      { userID: _id, status: POST_STATUS.HAS_JOB },
      { userID: _id, status: POST_STATUS.PENDING },
    ],
  }).populate("userID");
  if (post) {
    res.status(200).json({ message: "Lấy post thành công", data: post });
  } else {
    res.status(400).json({ message: "Lấy thất bại" });
    throw new Error("Lấy thất bại");
  }
});

const getAllPostUserPayment = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const post = await PostModel.find({
    userID: _id,
    status: POST_STATUS.HAS_JOB,
  }).populate("userID");
  if (post) {
    res.status(200).json({ message: "Lấy post thành công", data: post });
  } else {
    res.status(400).json({ message: "Lấy thất bại" });
    throw new Error("Lấy thất bại");
  }
});

const deletePosts = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const deletePost = await PostModel.findOneAndDelete({
    _id: id,
  });
  if (deletePost) {
    res.status(200).json({ message: "xoá post thành công", data: deletePost });
  } else {
    res.status(400).json({ message: "xoá thất bại" });
    throw new Error("xoá thất bại");
  }
});

module.exports = {
  createPost,
  getAllPost,
  getAllPostSend,
  getPost,
  getAllPostUser,
  getAllPostUserAccept,
  getAllPostUserPayment,
  deletePosts,
};

const asyncHandler = require("express-async-handler");
const PostModel = require("../models/postModel");
const APIFeatures = require("../middleware/apiFeatures");

const createPost = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const newPost = await PostModel.create({ userID: _id, ...req.body });
  if (newPost) {
    res.status(200).json({ message: "Lấy post thành công", data: newPost });
  } else {
    res.status(400).json({ message: "Lấy thất bại" });
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
  const features = new APIFeatures(
    PostModel.find({ userID: _id }).populate("userID"),
    req.query
  ).checkStatus();

  const allPostsSend = await features.query;
  if (allPostsSend) {
    res.status(200).json({ message: "Lấy thành công", data: allPostsSend });
  } else {
    res.status(400).json({ message: "Lấy thất bại" });
    throw new Error("Lấy thất bại");
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

module.exports = { createPost, getAllPost, getAllPostSend, getPost };

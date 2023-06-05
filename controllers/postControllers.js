const asyncHandler = require("express-async-handler");
const PostModel = require("../models/postModel");

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

const getAllPost = asyncHandler(async (req, res, next) => {});

const getPost = asyncHandler(async (req, res, next) => {});

module.exports = { createPost };

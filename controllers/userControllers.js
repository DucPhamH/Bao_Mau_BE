const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const validator = require("validator");
const ROLE = require("../constants/role");
const EmployeeModel = require("../models/employeeModel");
dotenv.config();

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, phone, password, roles } = req.body;
  //check không nhập
  if (!name || !password || !phone || !roles) {
    res.status(400).json({ message: "Bạn phải nhập đầy đủ" });
    throw new Error("Các trường không được để trống");
  }

  // check phone
  const check = validator.isMobilePhone(phone.toString(), "vi-VN");
  if (check === false) {
    res.status(400).json({ message: "Sai số điện thoai" });
    throw new Error("Sai số điện thoai");
  }

  if (password.length <= 5 || password.length >= 160) {
    res.status(400).json({ message: "Bạn nhập sai độ dài password" });
    throw new Error("sai do dai");
  }

  if (
    roles === ROLE.CUSTOMER.toString() ||
    roles === ROLE.EMPLOYEE.toString()
  ) {
    //check có trong db hay không
    const userAvailable = await UserModel.findOne({ phone: phone });
    if (userAvailable) {
      res.status(400).json({ message: "Bạn đã đăng kí tài khoản này rồi " });
      throw new Error("Bạn đã đăng kí tài khoản này rồi");
    }

    //hash pass
    const hashedPassword = await bcrypt.hash(password, 10);

    //tạo mới user
    const newUser = await UserModel.create({
      name: name,
      phone: phone,
      password: hashedPassword,
      roles: roles,
    });
    console.log(newUser);
    if (newUser) {
      const accessToken = jwt.sign(
        {
          _id: newUser._id,
          phone: newUser.phone,
          name: newUser.name,
          roles: newUser.roles,
        },
        process.env.ACCESS_TOKEN_SECERT,
        { expiresIn: "5m" }
      );
      console.log(accessToken);
      if (newUser.roles === ROLE.EMPLOYEE) {
        const createEmployee = await EmployeeModel.create({
          userID: newUser._id,
        });
        if (createEmployee) {
          res.status(201).json({
            message: "Đăng kí thành công!",
            data: { accessToken: "Bearer" + " " + accessToken, user: newUser },
          });
        } else {
          res.status(400);
          throw new Error("Đăng kí thất bại");
        }
      } else {
        res.status(201).json({
          message: "Đăng kí thành công!",
          data: { accessToken: "Bearer" + " " + accessToken, user: newUser },
        });
      }
    } else {
      res.status(400);
      throw new Error("Đăng kí thất bại");
    }
  } else {
    res.status(400).json({ message: "Bạn nhập nhầm roles" });
    throw new Error("Nhập nhầm roles");
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { phone, password } = req.body;
  //check không nhập
  if (!phone || !password) {
    res.status(400).json({ message: "Bạn phải nhập đầy đủ" });
    throw new Error("Các trường không được để trống");
  }

  // check phone
  const check = validator.isMobilePhone(phone.toString(), "vi-VN");
  if (check === false) {
    res.status(400).json({ message: "Sai số điện thoai" });
    throw new Error("Sai số điện thoai");
  }

  if (password.length <= 5 || password.length >= 160) {
    res.status(400).json({ message: "Bạn nhập sai độ dài password" });
    throw new Error("sai do dai");
  }

  //check trong db
  const user = await UserModel.findOne({ phone: phone });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        _id: user._id,
        phone: user.phone,
        name: user.name,
        roles: user.roles,
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "5m" }
    );
    console.log(accessToken);
    res.status(200).json({
      message: "Đăng nhập thành công",
      data: { accessToken: "Bearer" + " " + accessToken, user: user },
    });
  } else {
    res.status(400).json({ message: "Bạn sai tài khoản hoặc mật khẩu" });
    throw new Error("Bạn sai tài khoản hoặc mật khẩu");
  }
});

const getAllUser = asyncHandler(async (req, res, next) => {
  const users = await UserModel.find({});
  if (users) {
    res.status(200).json({ message: "Lấy users thành công", data: users });
  } else {
    res.status(400).json({ message: "Lấy thất bại" });
    throw new Error("Lấy thất bại");
  }
});
const logoutUser = asyncHandler(async (req, res, next) => {
  res.status(200).json({ message: "Đăng xuất thành công" });
});

const profileUser = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  const user = await UserModel.findById({ _id: req.user._id });
  res.json({ message: "Lấy thông tin thành công", data: user });
});

const uploadImageUser = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  const { _id } = req.user;
  //console.log("localhost:4000/" + req.file.path.replace(/\\/g, "/"));
  const image =
    "https://bao-mau-be-0v27.onrender.com/" + req.file.path.replace(/\\/g, "/");
  const updateImage = await UserModel.findByIdAndUpdate(_id, { image: image });
  if (updateImage) {
    res
      .status(200)
      .json({ message: "Update ảnh thành công", data: updateImage });
  } else {
    res.status(400).json({ message: "Update ảnh thất bại" });
    throw new Error("Update ảnh thất bại");
  }
});

const updateUser = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { email, name, address } = req.body;
  const check = validator.isEmail(email);
  if (check === false) {
    res.status(400).json({ message: "Bạn nhập sai email" });
    throw new Error("Sai email");
  }
  const updateUser = await UserModel.findOneAndUpdate(
    { _id: _id },
    { email: email, name: name, address: address }
  );
  if (updateUser) {
    res
      .status(200)
      .json({ message: "Update thông tin thành công", data: updateUser });
  } else {
    res.status(400).json({ message: "Update thông tin thất bại" });
    throw new Error("Update thông tin thất bại");
  }
});

const updatePass = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { password, newPassword } = req.body;
  if (!password || !newPassword) {
    res.status(400).json({ message: "Bạn phải nhập đầy đủ" });
    throw new Error("Các trường không được để trống");
  }
  if (password === newPassword) {
    res.status(400).json({ message: "Password cũ trùng với password mới" });
    throw new Error("Password cũ trùng với password mới");
  }
  const user = await UserModel.findById({ _id: _id });
  if (user && (await bcrypt.compare(password, user.password))) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatePassword = await UserModel.findByIdAndUpdate(_id, {
      password: hashedPassword,
    });

    if (updatePassword) {
      res
        .status(200)
        .json({ message: "Update password thành công", data: updatePassword });
    } else {
      res.status(400).json({ message: "Update password thất bại" });
      throw new Error("Update password thất bại");
    }
  } else {
    res.status(400).json({ message: "Nhập sai mật khẩu" });
    throw new Error("Nhập sai mật khẩu");
  }
});

module.exports = {
  registerUser,
  loginUser,
  getAllUser,
  profileUser,
  logoutUser,
  uploadImageUser,
  updateUser,
  updatePass,
};

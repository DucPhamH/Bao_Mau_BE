const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const validator = require("validator");
const ROLE = require("../constants/role");
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
      res.status(201).json({
        message: "Đăng kí thành công!",
        data: { accessToken: "Bearer" + " " + accessToken, user: newUser },
      });
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

module.exports = {
  registerUser,
  loginUser,
  getAllUser,
};

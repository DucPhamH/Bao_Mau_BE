const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const dotennv = require("dotenv");
dotennv.config();

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader =
    req.headers.Authorization || req.headers.authorization || null;
  console.log(authHeader);
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Bạn không có quyền truy cập" });
        throw new Error("Bạn không có quyền truy cập");
      }
      req.user = decoded;
      next();
    });

    if (!token || authHeader === null) {
      res.status(401).json({ message: "Bạn không có đủ quyền truy cập" });
      throw new Error("Bạn không có quyền truy cập");
    }
  } else {
    res.status(401).json({ message: "Bạn không có đủ quyền truy cập" });
    throw new Error("Bạn không có quyền truy cập");
  }
});

module.exports = validateToken;

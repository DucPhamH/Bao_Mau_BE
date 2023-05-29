const asyncHandler = require("express-async-handler");
const ROLE = require("../constants/role");

const checkRoleUser = asyncHandler(async (req, res, next) => {
  const { _id, roles } = req.user;
  if (roles === ROLE.CUSTOMER) {
    next();
  } else {
    res
      .status(400)
      .json({ message: "Bạn không có quyền truy cập, role không đúng" });
    throw new Error("Bạn không có quyền truy cập");
  }
});

module.exports = checkRoleUser;

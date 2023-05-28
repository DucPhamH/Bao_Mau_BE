const asyncHandler = require("express-async-handler");
const ROLE = require("../constants/role");

const checkRoleEmployee = asyncHandler(async (req, res, next) => {
  const { _id, roles } = req.user;
  if (roles === ROLE.EMPLOYEE) {
    next();
  } else {
    res
      .status(400)
      .json({ message: "Bạn không có quyền truy cập, role không đúng" });
    throw new Error("Bạn không có quyền truy cập");
  }
});

module.exports = checkRoleEmployee;

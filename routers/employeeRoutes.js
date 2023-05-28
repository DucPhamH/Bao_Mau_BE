const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandle");
const {
  updateEmployee,
  profileEmployee,
} = require("../controllers/employeeControllers");
const checkRoleEmployee = require("../middleware/checkRoleEmployee");

router.put("/updateEmployee", validateToken, checkRoleEmployee, updateEmployee);
router.get(
  "/profileEmployee",
  validateToken,
  checkRoleEmployee,
  profileEmployee
);

module.exports = router;

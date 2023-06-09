const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandle");
const {
  updateEmployee,
  profileEmployee,
  getAllEmployee,
  getEmployee,
} = require("../controllers/employeeControllers");
const checkRoleEmployee = require("../middleware/checkRoleEmployee");
const checkRoleUser = require("../middleware/checkRoleUser");

router.put("/updateEmployee", validateToken, checkRoleEmployee, updateEmployee);
router.get(
  "/profileEmployee",
  validateToken,
  checkRoleEmployee,
  profileEmployee
);
router.get("/", validateToken, checkRoleUser, getAllEmployee);
router.get("/:id", validateToken, checkRoleUser, getEmployee);

module.exports = router;

const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandle");
const {
  updateEmployee,
  profileEmployee,
} = require("../controllers/employeeControllers");

router.put("/updateEmployee", validateToken, updateEmployee);
router.get("/profileEmployee", validateToken, profileEmployee);

module.exports = router;

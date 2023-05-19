const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUser,
} = require("../controllers/userControllers");
const validateToken = require("../middleware/validateTokenHandle");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUser);

module.exports = router;

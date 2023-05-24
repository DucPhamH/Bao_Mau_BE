const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUser,
  profileUser,
  logoutUser,
} = require("../controllers/userControllers");
const validateToken = require("../middleware/validateTokenHandle");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUser);
router.post("/logout", logoutUser);
router.get("/profile", validateToken, profileUser);
module.exports = router;

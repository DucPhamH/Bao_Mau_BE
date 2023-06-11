const express = require("express");
const validateToken = require("../middleware/validateTokenHandle");
const checkRoleUser = require("../middleware/checkRoleUser");
const {
  createRequest,
  getAllRequest,
} = require("../controllers/requestControllers");

const router = express.Router();
router.post("/createRequest", validateToken, createRequest);
router.get("/", getAllRequest);
module.exports = router;

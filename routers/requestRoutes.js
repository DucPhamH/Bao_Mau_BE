const express = require("express");
const validateToken = require("../middleware/validateTokenHandle");
const checkRoleUser = require("../middleware/checkRoleUser");
const {
  createRequest,
  getAllRequest,
  createRequest2,
  getRequestEmployee,
} = require("../controllers/requestControllers");

const router = express.Router();
router.post("/createRequest", validateToken, createRequest);
router.get("/", getAllRequest);
router.post("/createRequest2", validateToken, createRequest2);
router.get("/getRequestEmployee/:id", validateToken, getRequestEmployee);
module.exports = router;

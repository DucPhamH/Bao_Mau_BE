const express = require("express");
const validateToken = require("../middleware/validateTokenHandle");
const checkRoleUser = require("../middleware/checkRoleUser");
const {
  createRequest,
  getAllRequest,
  createRequest2,
  getRequestEmployee,
  getRequestUser,
} = require("../controllers/requestControllers");

const router = express.Router();
router.post("/createRequest", validateToken, createRequest);
router.get("/", getAllRequest);
router.post("/createRequest2", validateToken, createRequest2);
router.get("/getRequestEmployee/:id", validateToken, getRequestEmployee);
router.get("/getRequestUser", validateToken, getRequestUser);
module.exports = router;

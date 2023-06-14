const express = require("express");
const validateToken = require("../middleware/validateTokenHandle");
const checkRoleUser = require("../middleware/checkRoleUser");
const {
  createRequest,
  getAllRequest,
  createRequest2,
  getRequestEmployee,
  getRequestUser,
  deleteRequestUser,
  deleteRequestEmployee,
  acceptRequest,
  getAcceptRequets,
  cancelRequest,
} = require("../controllers/requestControllers");

const router = express.Router();
router.post("/createRequest", validateToken, createRequest);
router.get("/", getAllRequest);
router.post("/createRequest2", validateToken, createRequest2);
router.post("/deleteRequestUser", validateToken, deleteRequestUser);
router.post("/deleteRequestEmployee", validateToken, deleteRequestEmployee);
router.get("/getRequestEmployee/:id", validateToken, getRequestEmployee);
router.get("/getRequestUser", validateToken, getRequestUser);
router.post("/acceptRequest", validateToken, acceptRequest);
router.get("/getAcceptRequets", validateToken, getAcceptRequets);
router.post("/cancelRequest", validateToken, cancelRequest);
module.exports = router;

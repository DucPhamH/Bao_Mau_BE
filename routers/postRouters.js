const express = require("express");
const validateToken = require("../middleware/validateTokenHandle");
const checkRoleUser = require("../middleware/checkRoleUser");
const {
  createPost,
  getAllPost,
  getAllPostSend,
  getPost,
} = require("../controllers/postControllers");
const router = express.Router();

router.post("/createPost", validateToken, checkRoleUser, createPost);
router.get("/", validateToken, getAllPost);
router.get("/getAllPostSend/:id", validateToken, checkRoleUser, getAllPostSend);
router.get("/:id", validateToken, getPost);
module.exports = router;

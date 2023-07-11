const express = require("express");
const validateToken = require("../middleware/validateTokenHandle");
const checkRoleUser = require("../middleware/checkRoleUser");
const {
  createPost,
  getAllPost,
  getAllPostSend,
  getPost,
  getAllPostUser,
  getAllPostUserAccept,
  getAllPostUserPayment,
  deletePosts,
} = require("../controllers/postControllers");
const router = express.Router();

router.post("/createPost", validateToken, checkRoleUser, createPost);
router.get("/", validateToken, getAllPost);
router.get("/getAllPostUser", validateToken, checkRoleUser, getAllPostUser);
router.get(
  "/getAllPostUserAccept",
  validateToken,
  checkRoleUser,
  getAllPostUserAccept
);
router.get(
  "/getAllPostUserPayment",
  validateToken,
  checkRoleUser,
  getAllPostUserPayment
);
router.get("/getAllPostSend/:id", validateToken, checkRoleUser, getAllPostSend);
router.get("/:id", validateToken, getPost);
router.delete("/:id", deletePosts);
module.exports = router;

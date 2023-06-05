const express = require("express");
const validateToken = require("../middleware/validateTokenHandle");
const checkRoleUser = require("../middleware/checkRoleUser");
const { createPost } = require("../controllers/postControllers");
const router = express.Router();

router.post("/createPost", validateToken, checkRoleUser, createPost);
module.exports = router;

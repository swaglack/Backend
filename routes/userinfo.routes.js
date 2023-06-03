const express = require("express");
const router = express.Router();

// Controller
const UserController = require("../controllers/user.controller");
const userController = new UserController();

// auth Middleware
const authMiddleware = require("../middlewares/auth.middleware");

// userinfo 라우터 정의
router.get("/", authMiddleware, userController.userinfo);

module.exports = {
  router,
};

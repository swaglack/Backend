const express = require("express");
const router = express.Router();

// Controller
const UserController = require("../controllers/user.controller");
const userController = new UserController();

// userinfo 라우터 정의
router.get("/", userController.userinfo);

module.exports = {
  router,
};

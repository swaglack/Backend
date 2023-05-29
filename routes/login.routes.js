const express = require("express");
const router = express.Router();

// Controller
const UserController = require("../controllers/user.controller");
const userController = new UserController();

// LogIn 라우터 정의
router.post("/", userController.logIn);

module.exports = {
  router,
};

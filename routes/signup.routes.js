const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller")
const userController = new UserController();

// SignUp 라우터 정의
router.post("/", userController.signUp);

module.exports = {
  router
};
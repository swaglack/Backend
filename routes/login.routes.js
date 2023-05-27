const express = require("express");
const router = express.Router();

// LogIn 라우터 정의
router.post("/", logInController.logIn);

module.exports = {
  router
};
const express = require("express");
const router = express.Router();

// 라우터 구성
const signupRouter = require("./signup.routes");
const loginRouter = require("./login.routes");

router.use("/signup", signupRouter.router);
router.use("/login", loginRouter.router);

module.exports = router;

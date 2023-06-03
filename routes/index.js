const express = require("express");
const router = express.Router();

// 라우터 구성
const signupRouter = require("./signup.routes");
const loginRouter = require("./login.routes");
const userinfoRouter = require("./userinfo.routes"); // 유저인포 API 문서 반영 필요
const workspaceRouter = require("./workspace.routes");
const channelRouter = require("./channel.routes");

router.use("/signup", signupRouter.router);
router.use("/login", loginRouter.router);
// router.use("/userinfo", userinfoRouter.router); // 유저인포 API 문서 반영 필요
router.use("/workspace", workspaceRouter.router);
router.use("/workspace/:workspaceId/channel", channelRouter.router);

module.exports = router;

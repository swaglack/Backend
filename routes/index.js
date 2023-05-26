const express = require("express");
const router = express.Router();

// 라우터 구성
const signupRouter = require("./signup.routes");
const loginRouter = require("./login.routes");
const workspaceRouter = require("./workspace.routes");
const channelRouter = require("./channel.routes");

router.use("/signup", signupRouter.router);
router.use("/login", loginRouter.router);
router.use("/workspace", workspaceRouter.router);
router.use("/workspace/:workspaceid/channel", channelRouter.router);

module.exports = router;

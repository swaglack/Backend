const express = require("express");
const router = express.Router({ mergeParams: true });

// auth Middleware
const authMiddleware = require("../middlewares/auth.middleware");

// Controller
const ChannelController = require("../controllers/channel.controller");
const channelController = new ChannelController();

// Channel 라우터 정의
router.post("/", authMiddleware, channelController.postChannel); // 채널 추가
router.get("/", authMiddleware, channelController.getAllChannel); // 전체 채널 조회
router.get("/:channelId", authMiddleware, channelController.getOneChannel); // 특정 채널 조회
router.put("/:channelId", authMiddleware, channelController.putUserToChannel); // 채널에 인원 추가
// router.put("/:channelId/chat", channelController.putChat); // 채널 채팅
router.delete("/:channelId", authMiddleware, channelController.deleteChannel); // 채널 삭제

module.exports = {
  router,
};

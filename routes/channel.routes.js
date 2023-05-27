const express = require("express");
const router = express.Router();

const ChannelController = require("../controllers/channel.controller")
const channelController = new ChannelController();

// Channel 라우터 정의
router.post("/", channelController.postChannel); // 채널 추가
router.get("/", channelController.getAllChannel); // 전체 채널 조회
router.get("/:channelid", channelController.getOneChannel); // 특정 채널 조회
router.put("/:channelid", channelController.putChannel); // 채널에 인원 추가
router.put("/:channelid/chat", channelController.putChat); // 채널 채팅
router.delete("/:channelid", channelController.deleteChannel); // 채널 삭제

module.exports = {
  router
};
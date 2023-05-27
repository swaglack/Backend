const CustomError = require("../utils/error.utils");
const ChannelService = require("../services/channel.service");

class ChannelController {
  channelService = new ChannelService();

  // 채널 추가
  postChannel = async (req, res, next) => {
    try {
      return res.status(201).json({});
    } catch (err) {
      return err;
    }
  };

  // 전체 채널 조회
  getAllChannel = async (req, res, next) => {
    try {
      return res.status(201).json({});
    } catch (err) {
      return err;
    }
  };

  // 특정 채널 조회
  getOneChannel = async (req, res, next) => {
    try {
      return res.status(201).json({});
    } catch (err) {
      return err;
    }
  };

  // 채널에 인원 추가
  putChannel = async (req, res, next) => {
    try {
      return res.status(201).json({});
    } catch (err) {
      return err;
    }
  };

  // 채널 채팅
  putChat = async (req, res, next) => {
    try {
      return res.status(201).json({});
    } catch (err) {
      return err;
    }
  };

  // 채널 삭제
  deleteChannel = async (req, res, next) => {
    try {
      return res.status(201).json({});
    } catch (err) {
      return err;
    }
  };
}

module.exports = ChannelController;

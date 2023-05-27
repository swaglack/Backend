const CustomError = require("../utils/error.utils");
const ChannelService = require("../services/channel.service");

class ChannelController {
  channelService = new ChannelService();

  // 채널 추가
  postChannel = async (req, res, next) => {
    try {
      const {channelName, userName } = req.body;
      const workspaceId = req.params.workspaceId;
      console.log(workspaceId)

      const channel = await this.channelService.postChannel(channelName, userName, workspaceId, res);
      return res.status(201).json({});
    } catch (err) {
      if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
          message: err.message,
        });
      }
      console.log(err);
      return res.status(403).json({
        message: "채널추가에 실패했습니다.",
      });
    }
  };
}

module.exports = ChannelController;

  // // 전체 채널 조회
  // getAllChannel = async (req, res, next) => {
  //   try {
  //     return res.status(201).json({});
  //   } catch (err) {
  //     if (err instanceof CustomError) {
  //       return res.status(err.statusCode).json({
  //         message: err.message,
  //       });
  //     }
  //     console.log(err);
  //     return res.status(403).json({
  //       message: "회원가입에 실패했습니다.",
  //     });
  //   }
  // };

  // // 특정 채널 조회
  // getOneChannel = async (req, res, next) => {
  //   try {
  //     return res.status(201).json({});
  //   } catch (err) {
  //     return err;
  //   }
  // };

  // // 채널에 인원 추가
  // putChannel = async (req, res, next) => {
  //   try {
  //     return res.status(201).json({});
  //   } catch (err) {
  //     return err;
  //   }
  // };

  // // 채널 채팅
  // putChat = async (req, res, next) => {
  //   try {
  //     return res.status(201).json({});
  //   } catch (err) {
  //     return err;
  //   }
  // };

  // // 채널 삭제
  // deleteChannel = async (req, res, next) => {
  //   try {
  //     return res.status(201).json({});
  //   } catch (err) {
  //     return err;
  //   }
  // };
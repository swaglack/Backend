const { StatusCodes } = require("http-status-codes");
const CustomError = require("../utils/error.utils");
const ChannelService = require("../services/channel.service");

class ChannelController {
  channelService = new ChannelService();

  /**************************************************
   *                   채널 생성                    *
   **************************************************/
  postChannel = async (req, res) => {
    try {
      const userName = res.locals.user.userName;
      const userId = res.locals.user.userId;
      const channelName = req.body.channelName;
      const workspaceId = req.params.workspaceId;

      // 입력 데이터에 대한 유효성 검사
      if (!channelName || !userName || !workspaceId || !userId) {
        throw new CustomError("channelName, userName, workspaceId는 필수 입력값입니다.", StatusCodes.BAD_REQUEST);
      }

      await this.channelService.postChannel(
        channelName,
        userName,
        workspaceId,
        userId
      );
      return res.status(StatusCodes.CREATED).end();
    } catch (err) {
      console.error(err);
      if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
          message: err.message,
        });
      }
      return res.status(StatusCodes.NOT_ACCEPTABLE).json({
        message: "기타 오류",
      });
    }
  };

  /**************************************************
   *               전체 채널 조회                   *
   **************************************************/
  getAllChannel = async (req, res) => {
    try {
      const workspaceId = req.params.workspaceId;

      // 입력 데이터에 대한 유효성 검사
      if (!workspaceId) {
        throw new CustomError("workspaceId는 필수 입력값입니다.", StatusCodes.BAD_REQUEST);
      }

      const channel = await this.channelService.getAllChannel(workspaceId, res);
      return res.status(StatusCodes.OK).json(channel);
    } catch (err) {
      console.error(err);
      if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
          message: err.message,
        });
      }
      return res.status(StatusCodes.NOT_ACCEPTABLE).json({
        message: "기타 오류",
      });
    }
  };

  /**************************************************
   *               단일 채널 조회                   *
   **************************************************/
  getOneChannel = async (req, res) => {
    try {
      const workspaceId = req.params.workspaceId;
      const channelId = req.params.channelId;

      // 입력 데이터에 대한 유효성 검사
      if (!workspaceId || !channelId) {
        throw new CustomError("workspaceId와 channelId는 필수 입력값입니다.", StatusCodes.BAD_REQUEST);
      }

      const channel = await this.channelService.getOneChannel(
        workspaceId,
        channelId,
      );
      return res.status(StatusCodes.OK).json(channel);
    } catch (err) {
      console.error(err);
      if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
          message: err.message,
        });
      }
      return res.status(StatusCodes.NOT_ACCEPTABLE).json({
        message: "기타 오류",
      });
    }
  };

  /**************************************************
   *                  채널 수정                     *
   **************************************************/
  putUserToChannel = async (req, res) => {
    try {
      const workspaceId = req.params.workspaceId;
      const channelId = req.params.channelId;
      const nickName = req.body.nickName;

      // 입력 데이터에 대한 유효성 검사
      if (!workspaceId || !channelId || !nickName) {
        throw new CustomError("workspaceId, channelId, nickName은 필수 입력값입니다.", StatusCodes.BAD_REQUEST);
      }

      await this.channelService.putUserToChannel(
        workspaceId,
        channelId,
        nickName,
      );
      return res.status(StatusCodes.CREATED).end();
    } catch (err) {
      console.error(err);
      if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
          message: err.message,
        });
      }
      return res.status(StatusCodes.NOT_ACCEPTABLE).json({
        message: "기타 오류",
      });
    }
  };

  /**************************************************
   *                  채널 삭제                     *
   **************************************************/
  deleteChannel = async (req, res) => {
    try {
      const workspaceId = req.params.workspaceId;
      const channelId = req.params.channelId;

      // 입력 데이터에 대한 유효성 검사
      if (!workspaceId || !channelId) {
        throw new CustomError("workspaceId와 channelId는 필수 입력값입니다.", StatusCodes.BAD_REQUEST);
      }

      await this.channelService.deleteChannel(
        workspaceId,
        channelId,
      );
      return res.status(StatusCodes.NO_CONTENT).end();
    } catch (err) {
      console.error(err);
      if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
          message: err.message,
        });
      }
      return res.status(StatusCodes.NOT_ACCEPTABLE).json({
        message: "기타 오류",
      });
    }
  };
}

module.exports = ChannelController;

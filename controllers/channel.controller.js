const { StatusCodes } = require("http-status-codes");
const ErrorUtils = require("../utils/error.utils");
const ChannelService = require("../services/channel.service");

class ChannelController {
  channelService = new ChannelService();

  // 채널 추가
  postChannel = async (req, res, next) => {
    try {
      const userName = res.locals.user.userName;
      const channelName = req.body.channelName;
      const workspaceId = req.params.workspaceId;

      // 입력 데이터에 대한 유효성 검사
      if (!channelName || !userName) {
        throw new ErrorUtils(
          StatusCodes.BAD_REQUEST,
          "channelName과 userName은 필수 입력값입니다."
        );
      }

      await this.channelService.postChannel(
        channelName,
        userName,
        workspaceId,
        res
      );
      return res.status(StatusCodes.CREATED).end();
    } catch (err) {
      console.error(err);
      if (err instanceof ErrorUtils) {
        return res.status(err.statusCode).json({
          message: err.message,
        });
      }
      return ErrorUtils.handleInternalServerError(res);
    }
  };

  // 전체 채널 조회
  getAllChannel = async (req, res, next) => {
    try {
      const workspaceId = req.params.workspaceId;

      // 입력 데이터에 대한 유효성 검사
      if (!workspaceId) {
        throw new ErrorUtils(
          StatusCodes.BAD_REQUEST,
          "workspaceId는 필수 입력값입니다."
        );
      }

      const channel = await this.channelService.getAllChannel(workspaceId, res);
      return res.status(StatusCodes.OK).json(channel);
    } catch (err) {
      console.error(err);
      if (err instanceof ErrorUtils) {
        return res.status(err.statusCode).json({
          message: err.message,
        });
      }
      return ErrorUtils.handleInternalServerError(res);
    }
  };

  // 특정 채널 조회
  getOneChannel = async (req, res, next) => {
    try {
      const workspaceId = req.params.workspaceId;
      const channelId = req.params.channelId;

      // 입력 데이터에 대한 유효성 검사
      if (!workspaceId || !channelId) {
        throw new ErrorUtils(
          StatusCodes.BAD_REQUEST,
          "workspaceId와 channelId는 필수 입력값입니다."
        );
      }

      const channel = await this.channelService.getOneChannel(
        workspaceId,
        channelId,
        res
      );
      return res.status(StatusCodes.OK).json(channel);
    } catch (err) {
      console.error(err);
      if (err instanceof ErrorUtils) {
        return res.status(err.statusCode).json({
          message: err.message,
        });
      }
      return ErrorUtils.handleInternalServerError(res);
    }
  };

  // 채널에 멤버 추가
  putUserToChannel = async (req, res, next) => {
    try {
      const workspaceId = req.params.workspaceId;
      const channelId = req.params.channelId;
      const newMember = req.body.nickName;

      // 입력 데이터에 대한 유효성 검사
      if (!workspaceId || !channelId || !newMember) {
        throw new ErrorUtils(
          StatusCodes.BAD_REQUEST,
          "workspaceId, channelId, nickName은 필수 입력값입니다."
        );
      }

      const channel = await this.channelService.putUserToChannel(
        workspaceId,
        channelId,
        newMember,
        res
      );
      return res.status(StatusCodes.CREATED).end();
    } catch (err) {
      console.error(err);
      if (err instanceof ErrorUtils) {
        return res.status(err.statusCode).json({
          message: err.message,
        });
      }
      return ErrorUtils.handleInternalServerError(res);
    }
  };

  // 채널 삭제
  deleteChannel = async (req, res, next) => {
    try {
      const workspaceId = req.params.workspaceId;
      const channelId = req.params.channelId;

      // 입력 데이터에 대한 유효성 검사
      if (!workspaceId || !channelId) {
        throw new ErrorUtils(
          StatusCodes.BAD_REQUEST,
          "workspaceId와 channelId는 필수 입력값입니다."
        );
      }

      const channel = await this.channelService.deleteChannel(
        workspaceId,
        channelId,
        res
      );
      return res.status(StatusCodes.NO_CONTENT).end();
    } catch (err) {
      console.error(err);
      if (err instanceof ErrorUtils) {
        return res.status(err.statusCode).json({
          message: err.message,
        });
      }
      return ErrorUtils.handleInternalServerError(res);
    }
  };
}

module.exports = ChannelController;

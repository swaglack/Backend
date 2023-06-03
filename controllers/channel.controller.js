const { StatusCodes } = require("http-status-codes");
const CustomError = require("../utils/error.utils");
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
      if (!channelName || !userName || !workspaceId) {
        throw new CustomError("channelName, userName, workspaceId는 필수 입력값입니다.", StatusCodes.BAD_REQUEST);
        // throw new ErrorUtils(
        //   StatusCodes.BAD_REQUEST,
        //   "channelName, userName, workspaceId는 필수 입력값입니다."
        // );
      }

      // params의 값이 objectId의 형식에 맞는지 검사
      // 24개의 문자로 구성된 16진수 문자열 인지 확인
      const isValidHex = /^[0-9a-fA-F]{24}$/.test(workspaceId);
      if (!isValidHex) {
        throw new CustomError("workspaceId가 유효하지 않습니다.", StatusCodes.BAD_REQUEST);
        // throw new ErrorUtils(
        //   StatusCodes.BAD_REQUEST,
        //   "workspaceId가 유효하지 않습니다."
        // );
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
      if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
          message: err.message,
        });
      }
      return res.status(StatusCodes.NOT_ACCEPTABLE).json({
        message: "기타 오류",
      });
      // if (err instanceof ErrorUtils) {
      //   return res.status(err.statusCode).json({
      //     message: err.message,
      //   });
      // }
      // return ErrorUtils.handleInternalServerError(res);
    }
  };

  // 전체 채널 조회
  getAllChannel = async (req, res, next) => {
    try {
      const workspaceId = req.params.workspaceId;

      // 입력 데이터에 대한 유효성 검사
      if (!workspaceId) {
        throw new CustomError("workspaceId는 필수 입력값입니다.", StatusCodes.BAD_REQUEST);
        // throw new ErrorUtils(
        //   StatusCodes.BAD_REQUEST,
        //   "workspaceId는 필수 입력값입니다."
        // );
      }

      // params의 값이 objectId의 형식에 맞는지 검사
      // 24개의 문자로 구성된 16진수 문자열 인지 확인
      const isValidHex = /^[0-9a-fA-F]{24}$/.test(workspaceId);
      if (!isValidHex) {
        throw new CustomError("workspaceId가 유효하지 않습니다.", StatusCodes.BAD_REQUEST);
        // throw new ErrorUtils(
        //   StatusCodes.BAD_REQUEST,
        //   "workspaceId가 유효하지 않습니다."
        // );
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
      // console.error(err);
      // if (err instanceof ErrorUtils) {
      //   return res.status(err.statusCode).json({
      //     message: err.message,
      //   });
      // }
      // return ErrorUtils.handleInternalServerError(res);
    }
  };

  // 특정 채널 조회
  getOneChannel = async (req, res, next) => {
    try {
      const workspaceId = req.params.workspaceId;
      const channelId = req.params.channelId;

      // 입력 데이터에 대한 유효성 검사
      if (!workspaceId || !channelId) {
        throw new CustomError("workspaceId와 channelId는 필수 입력값입니다.", StatusCodes.BAD_REQUEST);
        // throw new ErrorUtils(
        //   StatusCodes.BAD_REQUEST,
        //   "workspaceId와 channelId는 필수 입력값입니다."
        // );
      }

      // params의 값이 objectId의 형식에 맞는지 검사
      // 24개의 문자로 구성된 16진수 문자열 인지 확인
      let isValidHex = /^[0-9a-fA-F]{24}$/.test(workspaceId);
      if (!isValidHex) {
        throw new CustomError("workspaceId가 유효하지 않습니다.", StatusCodes.BAD_REQUEST);
        // throw new ErrorUtils(
        //   StatusCodes.BAD_REQUEST,
        //   "workspaceId가 유효하지 않습니다."
        // );
      }
      isValidHex = /^[0-9a-fA-F]{24}$/.test(channelId);
      if (!isValidHex) {
        throw new CustomError("channelId가 유효하지 않습니다.", StatusCodes.BAD_REQUEST);
        // throw new ErrorUtils(
        //   StatusCodes.BAD_REQUEST,
        //   "channelId가 유효하지 않습니다."
        // );
      }

      const channel = await this.channelService.getOneChannel(
        workspaceId,
        channelId,
        res
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
      // console.error(err);
      // if (err instanceof ErrorUtils) {
      //   return res.status(err.statusCode).json({
      //     message: err.message,
      //   });
      // }
      // return ErrorUtils.handleInternalServerError(res);
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
        throw new CustomError("workspaceId, channelId, nickName은 필수 입력값입니다.", StatusCodes.BAD_REQUEST);
        // throw new ErrorUtils(
        //   StatusCodes.BAD_REQUEST,
        //   "workspaceId, channelId, nickName은 필수 입력값입니다."
        // );
      }

      // params의 값이 objectId의 형식에 맞는지 검사
      // 24개의 문자로 구성된 16진수 문자열 인지 확인
      let isValidHex = /^[0-9a-fA-F]{24}$/.test(workspaceId);
      if (!isValidHex) {
        throw new CustomError("workspaceId가 유효하지 않습니다.", StatusCodes.BAD_REQUEST);
        // throw new ErrorUtils(
        //   StatusCodes.BAD_REQUEST,
        //   "workspaceId가 유효하지 않습니다."
        // );
      }
      isValidHex = /^[0-9a-fA-F]{24}$/.test(channelId);
      if (!isValidHex) {
        throw new CustomError("channelId가 유효하지 않습니다.", StatusCodes.BAD_REQUEST);
        // throw new ErrorUtils(
        //   StatusCodes.BAD_REQUEST,
        //   "channelId가 유효하지 않습니다."
        // );
      }

      await this.channelService.putUserToChannel(
        workspaceId,
        channelId,
        newMember,
        res
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
      // console.error(err);
      // if (err instanceof ErrorUtils) {
      //   return res.status(err.statusCode).json({
      //     message: err.message,
      //   });
      // }
      // return ErrorUtils.handleInternalServerError(res);
    }
  };

  // 채널 삭제
  deleteChannel = async (req, res, next) => {
    try {
      const workspaceId = req.params.workspaceId;
      const channelId = req.params.channelId;

      // 입력 데이터에 대한 유효성 검사
      if (!workspaceId || !channelId) {
        throw new CustomError("workspaceId와 channelId는 필수 입력값입니다.", StatusCodes.BAD_REQUEST);
        // throw new ErrorUtils(
        //   StatusCodes.BAD_REQUEST,
        //   "workspaceId와 channelId는 필수 입력값입니다."
        // );
      }

      // params의 값이 objectId의 형식에 맞는지 검사
      // 24개의 문자로 구성된 16진수 문자열 인지 확인
      let isValidHex = /^[0-9a-fA-F]{24}$/.test(workspaceId);
      if (!isValidHex) {
        throw new CustomError("workspaceId가 유효하지 않습니다.", StatusCodes.BAD_REQUEST);
        // throw new ErrorUtils(
        //   StatusCodes.BAD_REQUEST,
        //   "workspaceId가 유효하지 않습니다."
        // );
      }
      isValidHex = /^[0-9a-fA-F]{24}$/.test(channelId);
      if (!isValidHex) {
        throw new CustomError("channelId가 유효하지 않습니다.", StatusCodes.BAD_REQUEST);
        // throw new ErrorUtils(
        //   StatusCodes.BAD_REQUEST,
        //   "channelId가 유효하지 않습니다."
        // );
      }

      await this.channelService.deleteChannel(
        workspaceId,
        channelId,
        res
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
      // console.error(err);
      // if (err instanceof ErrorUtils) {
      //   return res.status(err.statusCode).json({
      //     message: err.message,
      //   });
      // }
      // return ErrorUtils.handleInternalServerError(res);
    }
  };
}

module.exports = ChannelController;

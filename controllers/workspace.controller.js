const { StatusCodes } = require("http-status-codes"); // StatusCodes를 사용하기 위해 http-status-codes 패키지 추가
const ErrorUtils = require("../utils/error.utils");
const WorkspaceService = require("../services/workspace.service");

class WorkspaceController {
  workspaceService = new WorkspaceService();

  // 워크스페이스 추가
  postWorkspace = async (req, res, next) => {
    try {
      const userName = res.locals.user.userName;
      const workspaceName = req.body.workspaceName;

      // 입력 데이터에 대한 유효성 검사
      if (!workspaceName || !userName) {
        throw new ErrorUtils(
          StatusCodes.BAD_REQUEST,
          "workspaceName과 userName은 필수 입력값입니다."
        );
      }

      await this.workspaceService.postWorkspace(workspaceName, userName, res);
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

  // 전체 워크스페이스 조회
  getAllWorkspace = async (req, res, next) => {
    try {
      const workspace = await this.workspaceService.getAllWorkspace();
      return res.status(StatusCodes.OK).json(workspace);
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

  // 특정 워크스페이스 조회
  getOneWorkspace = async (req, res, next) => {
    try {
      const workspaceId = req.params.workspaceId;
      
      // 입력 데이터에 대한 유효성 검사
      if (!workspaceId) {
        throw new ErrorUtils(
          StatusCodes.BAD_REQUEST,
          "workspaceId는 필수 입력값입니다."
        );
      }

      // params의 값이 objectId의 형식에 맞는지 검사
      // 24개의 문자로 구성된 16진수 문자열 인지 확인
      const isValidHex = /^[0-9a-fA-F]{24}$/.test(workspaceId);
      if (!isValidHex) {
        throw new ErrorUtils(
          StatusCodes.BAD_REQUEST,
          "workspaceId가 유효하지 않습니다."
        );
      }

      const workspace = await this.workspaceService.getOneWorkspace(
        workspaceId
      );
      return res.status(StatusCodes.OK).json(workspace);
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

  // 인원 추가
  putUserToWorkspace = async (req, res, next) => {
    try {
      const workspaceId = req.params.workspaceId;
      const newMember = req.body.nickName;

      // 입력 데이터에 대한 유효성 검사
      if (!workspaceId || !newMember) {
        throw new ErrorUtils(
          StatusCodes.BAD_REQUEST,
          "workspaceId와 nickName은 필수 입력값입니다."
        );
      }

      // params의 값이 objectId의 형식에 맞는지 검사
      // 24개의 문자로 구성된 16진수 문자열 인지 확인
      const isValidHex = /^[0-9a-fA-F]{24}$/.test(workspaceId);
      if (!isValidHex) {
        throw new ErrorUtils(
          StatusCodes.BAD_REQUEST,
          "workspaceId가 유효하지 않습니다."
        );
      }

      await this.workspaceService.putUserToWorkspace(workspaceId, newMember);
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

  // 워크스페이스 삭제
  deleteWorkspace = async (req, res, next) => {
    try {
      const workspaceId = req.params.workspaceId;

      // 입력 데이터에 대한 유효성 검사
      if (!workspaceId) {
        throw new ErrorUtils(
          StatusCodes.BAD_REQUEST,
          "workspaceId는 필수 입력값입니다."
        );
      }

      // params의 값이 objectId의 형식에 맞는지 검사
      // 24개의 문자로 구성된 16진수 문자열 인지 확인
      const isValidHex = /^[0-9a-fA-F]{24}$/.test(workspaceId);
      if (!isValidHex) {
        throw new ErrorUtils(
          StatusCodes.BAD_REQUEST,
          "workspaceId가 유효하지 않습니다."
        );
      }

      await this.workspaceService.deleteWorkspace(workspaceId);
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

module.exports = WorkspaceController;

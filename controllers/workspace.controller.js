const { StatusCodes } = require("http-status-codes"); // StatusCodes를 사용하기 위해 http-status-codes 패키지 추가
const CustomError = require("../utils/error.utils");
const WorkspaceService = require("../services/workspace.service");

class WorkspaceController {
  workspaceService = new WorkspaceService();

  /**************************************************
   *               워크스페이스 생성                *
   **************************************************/
  postWorkspace = async (req, res) => {
    try {
      const userId = res.locals.user.userId;
      const workspaceName = req.body.workspaceName;

      // 입력 데이터에 대한 유효성 검사
      if (!workspaceName || !userId) {
        throw new CustomError("workspaceName과 userId은 필수 입력값입니다.", StatusCodes.BAD_REQUEST);
      }

      await this.workspaceService.postWorkspace(workspaceName, userId);
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
   *            전체 워크스페이스 조회              *
   **************************************************/
  getAllWorkspace = async (req, res, next) => {
    try {
			const userId = res.locals.user.userId;

			// 입력 데이터에 대한 유효성 검사
			if (!userId) {
				throw new CustomError("userId는 필수 입력값입니다.", StatusCodes.BAD_REQUEST);
			}

      const workspace = await this.workspaceService.getAllWorkspace(userId);
      return res.status(StatusCodes.OK).json(workspace);
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
   *             단일 워크스페이스 조회             *
   **************************************************/
  getOneWorkspace = async (req, res) => {
    try {
      const workspaceId = req.params.workspaceId;
      
      // 입력 데이터에 대한 유효성 검사
      if (!workspaceId) {
        throw new CustomError("workspaceId는 필수 입력값입니다.", StatusCodes.BAD_REQUEST);
      }

      const workspace = await this.workspaceService.getOneWorkspace(
        workspaceId
      );
      return res.status(StatusCodes.OK).json(workspace);
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
	 *               워크스페이스 수정                *
	 **************************************************/
  putUserToWorkspace = async (req, res) => {
    try {
      const workspaceId = req.params.workspaceId;
      const nickName = req.body.nickName;

      // 입력 데이터에 대한 유효성 검사
      if (!workspaceId || !nickName) {
        throw new CustomError("workspaceId와 nickName은 필수 입력값입니다.", StatusCodes.BAD_REQUEST);
      }

      await this.workspaceService.putUserToWorkspace(workspaceId, nickName);
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
	 *                워크스페이스 삭제               *
	 **************************************************/
  deleteWorkspace = async (req, res, next) => {
    try {
      const workspaceId = req.params.workspaceId;

      // 입력 데이터에 대한 유효성 검사
      if (!workspaceId) {
        throw new CustomError("workspaceId는 필수 입력값입니다.", StatusCodes.BAD_REQUEST);
      }

      await this.workspaceService.deleteWorkspace(workspaceId);
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

module.exports = WorkspaceController;

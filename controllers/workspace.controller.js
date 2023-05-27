const CustomError = require("../utils/error.utils");
const WorkspaceService = require("../services/workspace.service");

class WorkspaceController {
  workspaceService = new WorkspaceService();

  // 워크스페이스 추가
  postWorkspace = async (req, res, next) => {
    try {
      const {workspaceName, userName} = req.body;

      const workspace = await this.workspaceService.postWorkspace(workspaceName, userName, res);
      
      return res.status(201).json({});
    } catch (err) {
      if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
          message: err.message,
        });
      }
      console.log(err);
      return res.status(403).json({
        message: "워크스페이스 추가에 실패했습니다.",
      });
    }
  };

  // 전체 워크스페이스 조회
  getAllWorkspace = async (req, res, next) => {
    try {
      return res.status(201).json({});
    } catch (err) {
      return err;
    }
  };

  // 특정 워크스페이스 조회
  getOneWorkspace = async (req, res, next) => {
    try {
      return res.status(201).json({});
    } catch (err) {
      return err;
    }
  };

  // 인원 추가
  putWorkspace = async (req, res, next) => {
    try {
      return res.status(201).json({});
    } catch (err) {
      return err;
    }
  };

  // 워크스페이스 삭제
  deleteWorkspace = async (req, res, next) => {
    try {
      return res.status(201).json({});
    } catch (err) {
      return err;
    }
  };
}

module.exports = WorkspaceController;

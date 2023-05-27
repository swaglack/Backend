const CustomError = require("../utils/error.utils");
const WorkspaceService = require("../services/workspace.service");

class WorkspaceController {
  workspaceService = new WorkspaceService();

  // 워크스페이스 추가
  postWorkspace = async (req, res, next) => {
    try {
      return res.status(201).json({});
    } catch (err) {
      return err;
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

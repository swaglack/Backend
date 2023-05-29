const express = require("express");
const router = express.Router();

// auth Middleware
const authMiddleware = require("../middlewares/auth.middleware");

// Controller
const WorkspaceController = require("../controllers/workspace.controller");
const workspaceController = new WorkspaceController();

// Workspace 라우터 정의
router.post("/", authMiddleware, workspaceController.postWorkspace); // 워크스페이스 추가
router.get("/", authMiddleware, workspaceController.getAllWorkspace); // 전체 워크스페이스 조회
router.get(
  "/:workspaceId",
  authMiddleware,
  workspaceController.getOneWorkspace
); // 특정 워크스페이스 조회
router.put(
  "/:workspaceId",
  authMiddleware,
  workspaceController.putUserToWorkspace
); // 인원 추가
router.delete(
  "/:workspaceId",
  authMiddleware,
  workspaceController.deleteWorkspace
); // 워크스페이스 삭제

module.exports = {
  router,
};

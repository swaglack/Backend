const express = require("express");
const router = express.Router();

const WorkspaceController = require("../controllers/workspace.controller");
const workspaceController = new WorkspaceController();

// Workspace 라우터 정의
router.post("/", workspaceController.postWorkspace); // 워크스페이스 추가
router.get("/", workspaceController.getAllWorkspace); // 전체 워크스페이스 조회
router.get("/:workspaceId", workspaceController.getOneWorkspace); // 특정 워크스페이스 조회
router.put("/:workspaceId", workspaceController.putWorkspace); // 인원 추가
router.delete("/:workspaceId", workspaceController.deleteWorkspace); // 워크스페이스 삭제

module.exports = {
  router,
};

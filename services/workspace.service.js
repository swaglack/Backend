const ErrorUtils = require("../utils/error.utils");
const WorkspaceRepository = require("../repositories/workspace.repository");

class WorkspaceService {
  workspaceRepository = new WorkspaceRepository();

  // Workspace 생성
  postWorkspace = async (workspaceName, userName, res, next) => {
    const workspace = await this.workspaceRepository.postWorkspace(
      workspaceName,
      userName
    );
    return workspace;
  };

  // 전체 Workspace 정보 가저오기
  getAllWorkspace = async (res, next) => {
    const workspace = await this.workspaceRepository.getAllWorkspace();

    const filteredWorkspace = workspace.map((item) => ({
      workspaceName: item.workspaceName,
      workspaceId: item.workspaceId,
    }));

    return filteredWorkspace;
  };

  // 특정 Workspace 정보 가저오기
  getOneWorkspace = async (workspaceId, res, next) => {
    const workspace = await this.workspaceRepository.getOneWorkspace(
      workspaceId
    );

    const filteredWorkspace = {
      workspaceName: workspace.workspaceName,
      workspaceMember: workspace.workspaceMember,
      workspaceChannel: workspace.workspaceChannel,
    };

    return filteredWorkspace;
  };

  // Workspace 수정 - 인원 추가
  putUserToWorkspace = async (workspaceId, newMember, res, next) => {
    await this.workspaceRepository.putUserToWorkspace(workspaceId, newMember);
    return true;
  };

  // Workspace 삭제
  deleteWorkspace = async (workspaceId, res, next) => {
    await this.workspaceRepository.deleteWorkspace(workspaceId);
    return true;
  };
}

module.exports = WorkspaceService;

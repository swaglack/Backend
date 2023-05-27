const CustomError = require("../utils/error.utils");
const WorkspaceRepository = require("../repositories/workspace.repository");

class WorkspaceService {
  workspaceRepository = new WorkspaceRepository();

  // Workspace 생성
  postWorkspace = async (workspaceName, userName, res, next) => {
    const workspace = await this.workspaceRepository.postWorkspace(
      workspaceName,
      userName,
    );
    return workspace;
  }
}

module.exports = WorkspaceService;

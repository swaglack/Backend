const Workspace = require("../schemas/workspace");

class WorkspaceRepository {
  // Workspace 생성
  postWorkspace = async (workspaceName, userName) => {
    const workspace = await Workspace.create({
      workspaceName,
      workspaceMaster: userName,
      workspaceMember: [userName],
    });
    return workspace ;
  };

  // // Workspace 생성
  // postWorkspace = async (workspaceName, userName) => {
  //   const workspace = await Workspace.create({
  //     workspaceName,
  //     workspaceMaster: userName,
  //     workspaceMember: [userName],
  //   });
  //   return workspace ;
  // };
}

module.exports = WorkspaceRepository;

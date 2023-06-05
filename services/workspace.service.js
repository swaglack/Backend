const WorkspaceRepository = require('../repositories/workspace.repository');

class WorkspaceService {
  workspaceRepository = new WorkspaceRepository();

  postWorkspace = async (workspaceName,workspaceMaster) => {
    console.log("serviceserivceserivce")
    try {
      console.log("serviceserivce")
      const postWorkspace = await this.workspaceRepository.postWorkspace(workspaceName,workspaceMaster)
      return postWorkspace;
    } catch (err) {
      console.log(err,'service')
      return err;
    }
  };
  getAllWorkspace = async (userId) => {
    try {
      const allWorkspace = await this.workspaceRepository.getAllWorkspace(userId);
      console.log(`service ${allWorkspace}`)
      return allWorkspace;
      } catch (err) {
        return err;
      };
  };
  getOneWorkspace = async (workspaceId) => {
    try {
      const oneWorkspace = await this.workspaceRepository.getOneWorkspace(workspaceId);
      return oneWorkspace;
     } catch (err) {
      return err;
    };

 };
  putWorkspace = async (workspaceId,workspaceMember) => {
    try {
      const putWorkspace = await this.workspaceRepository.putWorkspace(workspaceId,workspaceMember);
      return putWorkspace;
    } catch (err) {
      return err;
    };
  };
    deleteWorkspace = async (workspaceId) => {
    try {
      const deleteWorkspace = await this.workspaceRepository.deleteWorkspace(workspaceId);
      return deleteWorkspace;
    } catch (err) {
      return err;
    };
  };

}

module.exports = WorkspaceService;
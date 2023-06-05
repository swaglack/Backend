const WorkspaceRepository = require('../repositories/workspace.repository');

class WorkspaceService {
  workspaceRepository = new WorkspaceRepository();

  postWorkspace = async (workspaceName,workspaceMaster) => {
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
      let allWorkspace = await this.workspaceRepository.getAllWorkspace(userId);
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
  putWorkspace = async (workspaceId,userId,memberUser) => {
    try {
      console.log('Putservice')
      const putWorkspace = await this.workspaceRepository.putWorkspace(workspaceId,userId,memberUser);
      return putWorkspace;
    } catch (err) {
      return err;
    };
  };
    deleteWorkspace = async (workspaceId,userId,masterUser) => {
    try {
      const deleteWorkspace = await this.workspaceRepository.deleteWorkspace(workspaceId,userId,masterUser);
      return deleteWorkspace;
    } catch (err) {
      return err;
    };
  };

}

module.exports = WorkspaceService;
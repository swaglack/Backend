const Workspace = require('../schemas/workspace')


class WorkspaceRepository {
  postWorkspace = async (workspaceName,workspaceMaster) => {
    try {
      console.log(workspaceMaster,workspaceName)
      const postWorkspace = await Workspace.create({
        workspaceName : workspaceName,
        workspaceMaster : workspaceMaster,
        workspaceMember : [workspaceMaster]
      })
      return postWorkspace;
    } catch (err) {
      console.log(err,'repo')
      return err;
    }
  };

  getAllWorkspace = async (userId) => {
    console.log(userId)
    try {
      const allWorkspace = await Workspace.find({
        workspaceMember : 
          { '$elemMatch' : {'$all':userId } }
      })
      console.log(`repo ${allWorkspace}`)
      return allWorkspace;
    } catch(err) {
      return err;
    }

  }

  getOneWorkspace = async (workspaceId) => {
    try {
      const getOneWorkspace = await Workspace.findOne({
        workspaceId : workspaceId
      })
      console.log(getOneWorkspace)
      return getOneWorkspace;
    } catch(err) {
      return err;
    }
    
  }

  putWorkspace = async (workspaceId,workspaceMember) => {
    try {
      const putWorkspace = await Workspace.updateOne({
        workspaceId : workspaceId
      }, {
        '$push' : {workspaceMember : workspaceMember}
      })
      return putWorkspace;
    } catch(err) {
      return err;
    }

  }

  deleteWorkspace = async (workspaceId,workspaceMater) => {
    try {
      const deleteWorkspace = await Workspace.deleteOne({
        workspaceId : workspaceId,
        workspaceMater : workspaceMater
      })
      console.log(typeof deleteWorkspace)
      return deleteWorkspace;
    } catch(err) {
      return err;
    }
  }
}

module.exports = WorkspaceRepository;
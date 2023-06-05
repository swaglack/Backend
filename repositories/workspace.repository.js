const {Workspaces, UserWorkspaces, Users} = require('../models')
const {Op} = require('sequelize')
const ErrorUtils = require('../utils/error.utils')

class WorkspaceRepository {
  postWorkspace = async (workspaceName,workspaceMaster) => {
    try {
      console.log(workspaceMaster,workspaceName)
      const postWorkspace = await Workspaces.create({
        workspaceName : workspaceName,
        userId : workspaceMaster,
      })
      .then(
        (result) => {
          const workspaceId = result.dataValues.workspaceId
          UserWorkspaces.create({
            userId : workspaceMaster,
            workspaceId : workspaceId
          })
      })
      .catch(err => console.log(err))
      return postWorkspace;
    } catch (err) {
      return err;
    }
  };

  getAllWorkspace = async (userId) => {
    console.log(userId)
    try {
      const allWorkspace = await Users.findByPk(userId, {
          include:[Workspaces]
      });


      return allWorkspace
    } catch(err) {
      return err;
    }

  }

  getOneWorkspace = async (workspaceId) => {
    try {
      const getOneWorkspace = await Workspaces.findByPk(workspaceId.workspaceid ,{
        include:[Users]
      });
      return getOneWorkspace;
    } catch(err) {
      return err;
    }
    
  }

  putWorkspace = async (workspaceId,userId,memberUser) => {
    try {
      console.log('repo호출')
        const putWorkspace = await UserWorkspaces.findOne({
          attributes : ['userWorkspaceId'],
          where : {
            [Op.and]:[
              {workspaceId, userId : memberUser},
              {[Op.and] :[
                {workspaceId : {[Op.not]:workspaceId}},
                {userId : {[Op.not]:userId}}
              ]
          }]}
      })
      console.log(`error ${putWorkspace}`)
        if(putWorkspace) {
          UserWorkspaces.create({
            userId : userId,
            workspaceId : workspaceId
          })
        } else {
          throw new ErrorUtils("적합하지 않은 요청입니다",400)
        }
      return putWorkspace;
    } catch(err) {
      return err;
    }

  }

  deleteWorkspace = async (workspaceId,userId, masterUser) => {
    try {
      const deleteWorkspace = await Workspaces.findOne({
        workspaceId, userId : masterUser
      })
      if(deleteWorkspace) {
        UserWorkspaces.destory({
          where :{workspaceId,userId:userId}
        })
      } else {
        throw new ErrorUtils("적합하지 않은 요청입니다",400)
      }
      return deleteWorkspace;
    } catch(err) {
      return err;
    }
  }
}

module.exports = WorkspaceRepository;
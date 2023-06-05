const WorkspaceService = require('../services/workspace.service');
const ErrorUtils = require('../utils/error.utils')
class WorkspaceController {
  workspaceService = new WorkspaceService();
  postWorkspace = async (req,res, next) => {
    try {
      const {workspaceName} = req.body;
      const workspaceMaster = res.local.user.userId; //토큰값 혹은 res.locals값
      const postWorkspace = await this.workspaceService.postWorkspace(workspaceName,workspaceMaster);
      console.log(postWorkspace,'controller 값 체킹');
      return res.status(201).json({message : '워크스페이스 생성 완료'});
    } catch (err) {
      throw new ErrorUtils("워크스페이스 추가 실패",400)
    }
  };

  getAllWorkspace = async (req,res,next) => {
    try {
      const userId = res.local.user.userId; //토큰값 혹은 res.locals값
      const allWorkspace = await this.workspaceService.getAllWorkspace(userId);
      return res.status(200).json(allWorkspace);
      } catch (err) {
        throw new ErrorUtils("워크스페이스 불러오기 실패",400)
      };
  };
  getOneWorkspace = async (req,res,next) => {
    try {
      const workspaceId = req.params;
      const oneWorkspace = await this.workspaceService.getOneWorkspace(workspaceId);
      return res.status(200).json(oneWorkspace);
    } catch (err) {
      throw new ErrorUtils("워크스페이스 불러오기 실패",400)
    };

 };
  putWorkspace = async (req,res,next) => {
  try {
    //const {workspaceId} = req.params;
    //const {userId} = req.body;
    //const memberUser = res.locals.user.userId
    const userId = 2
    const workspaceId = 2
    const memberUser = 1
    await this.workspaceService.putWorkspace(workspaceId,userId,memberUser);
    return res.status(200).json({message:'추가 성공'});
  } catch (err) {
    throw new ErrorUtils("워크스페이스 멤버 추가 실패",400)
  };
 };
  deleteWorkspace = async (req,res,next) => {
  try {
    //const {userId} = req.body;
    //const masterUser = res.locals.user.userId
    //const {workspaceId} = req.params;
    const userId = 2
    const workspaceId = 2
    const masterUser = 1
    await this.workspaceService.deleteWorkspace(workspaceId,userId,masterUser);
    return res.status(200).json({message:'삭제 성공'});
   } catch (err) {
    throw new ErrorUtils("워크스페이스 삭제 실패",400)
  };
 };

}

module.exports = WorkspaceController;
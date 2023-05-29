const WorkspaceService = require('../services/workspace.service');

class WorkspaceController {
  workspaceService = new WorkspaceService();
  postWorkspace = async (req, res, next) => {
    try {
      const {workspaceName} = req.body;
      const {workspaceMaster} = {workspaceMaster:'userId'}; //토큰값 혹은 res.locals값
      const postWorkspace = await this.workspaceService.postWorkspace(workspaceName,workspaceMaster);
      console.log(postWorkspace,'controller 값 체킹');
      return res.status(201).json({message : '워크스페이스 생성 완료'});
    } catch (err) {
      return res.status(400).json({message : '워크스페이스 실패',err})
    }
  };

  getAllWorkspace = async (req,res,next) => {
    try {
      const userId = 'userId'; //토큰값 혹은 res.locals값
      const allWorkspace = await this.workspaceService.getAllWorkspace(userId);
      console.log(`controller ${allWorkspace}`)
      return res.status(200).json(allWorkspace);
      } catch (err) {
        return res.status(400).json({err})
      };
  };
  getOneWorkspace = async (req,res,next) => {
    try {
      const {workspaceId} = req.param;
      const oneWorkspace = await this.workspaceService.getOneWorkspace(workspaceId);
      return res.status(200).json(oneWorkspace);
     } catch (err) {
      return err;
    };

 };
  putWorkspace = async (req,res,next) => {
  try {
    const {workspaceId} = req.param;
    const {workspaceMember} = req.body;
    await this.workspaceService.putWorkspace(workspaceId,workspaceMember);
    return res.status(200).json({message:'추가 성공'});
   } catch (err) {
    return err;
  };
 };
  deleteWorkspace = async (req,res,next) => {
  try {
    const {userId} = 'userId';
    const {workspaceId} = req.param;
    await this.workspaceService.deleteWorkspace(workspaceId,userId)
    return res.status(200).json({message:'삭제 성공'})
   } catch (err) {
    return err;
  };
 };

}

module.exports = WorkspaceController;
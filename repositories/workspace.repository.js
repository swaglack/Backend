const Workspace = require("../schemas/workspace");

class WorkspaceRepository {
  // Workspace 생성
  postWorkspace = async (workspaceName, userName) => {
    const workspace = await Workspace.create({
      workspaceName,
      workspaceMaster: userName,
      workspaceMember: [userName],
    });
    return workspace;
  };

  // 전체 Workspace 정보 가져오기
  getAllWorkspace = async () => {
    const workspace = await Workspace.find({}).sort({updatedAt : -1});
    return workspace;
  };

  // 특정 Workspace 정보 가져오기
  getOneWorkspace = async (workspaceId) => {
    const workspace = await Workspace.findOne({ _id: workspaceId });
    return workspace;
  };

  // Workspace 수정 - 채널 추가
  putChannelToWorkspace = async (workspaceId, newChannel) => {
    const workspace = await Workspace.findByIdAndUpdate(
      { _id: workspaceId},  
      { $push: { workspaceChannel: newChannel } },
      { new: true },
    );
    return workspace;
  };

  // Workspace 수정 - 인원 추가
  putUserToWorkspace = async (workspaceId, newMember) => {
    const workspace = await Workspace.findByIdAndUpdate(
      { _id: workspaceId}, 
      { $push: { workspaceMember: newMember } },
      { new: true },
    );
    return workspace;
  };

  // Workspace 삭제
  deleteWorkspace = async (workspaceId) => {
    const workspace = await Workspace.findByIdAndRemove(
      { _id: workspaceId},
      { new: true },
    );
    return workspace;
  };
}

module.exports = WorkspaceRepository;
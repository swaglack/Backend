const { Op } = require("sequelize"); // Sequlize Operation 연산 사용을 위해 추가
const { Workspaces } = require("../models"); // 모델 가져오기

class WorkspaceRepository {
	/**************************************************
	 *               워크스페이스 생성                *
	 **************************************************/
	postWorkspace = async (contents) => {
		const workspace = await Workspaces.create(contents);
		return workspace;
	}
	
	/**************************************************
	 *            전체 워크스페이스 조회              *
	 **************************************************/
	getAllWorkspace = async (condition) => {
		const workspace = await Workspaces.findAll({
			attributes: ["workspaceId", "workspaceName", "workspaceCreatedAt", "workspaceUpdatedAt", "userId"],
			where: condition,
			order: [["workspaceUpdatedAt", "DESC"]] 
		})
		return workspace;
	}
	
	/**************************************************
	 *             단일 워크스페이스 조회             *
	 **************************************************/
	getOneWorkspace = async (condition) => {
		const workspace = await Workspaces.findOne({
			attributes: ["workspaceId", "workspaceName", "workspaceCreatedAt", "workspaceUpdatedAt", "userId"],
			where: condition,
		})
		return workspace;
	}

	/**************************************************
	 *               워크스페이스 수정                *
	 **************************************************/
	putWorkspace = async (updatedData, condition) => {
		const workspace = await Workspaces.update(
			{ updatedData },
			{ where: condition }
		)
		return workspace;
	}

	/**************************************************
	 *                워크스페이스 삭제               *
	 **************************************************/
	deleteWorkspace = async (condition) => {
		const workspace = await Workspaces.destroy({
			where: condition
		})
		return workspace;
	}
}

module.exports = WorkspaceRepository;

  // // Workspace 생성
  // postWorkspace = async (workspaceName, userName) => {
  //   const workspace = await Workspace.create({
  //     workspaceName,
  //     workspaceMaster: userName,
  //     workspaceMember: [userName],
  //   });
  //   return workspace;
  // };

  // // 전체 Workspace 정보 가져오기
  // getAllWorkspace = async () => {
  //   const workspace = await Workspace.find({}).sort({ updatedAt: -1 });
  //   return workspace;
  // };

  // // 특정 Workspace 정보 가져오기(Id로 조회)
  // getOneWorkspaceById = async (workspaceId) => {
  //   const workspace = await Workspace.findOne({ _id: workspaceId });
  //   return workspace;
  // };

  // // 특정 Workspace 정보 가져오기(workspaceName으로 조회)
  // getOneWorkspaceByName = async (workspaceName) => {
  //   const workspace = await Workspace.findOne({ workspaceName });
  //   return workspace;
  // };

  // // Workspace 수정 - 채널 추가
  // putChannelToWorkspace = async (workspaceId, newChannel) => {
  //   const currentTime = new Date();
  //   const workspace = await Workspace.findByIdAndUpdate(
  //     { _id: workspaceId },
  //     { 
  //       $push: { workspaceChannel: newChannel },
  //       updatedAt: currentTime
  //     },
  //     { new: true }
  //   );
  //   return workspace;
  // };

  // // Workspace 수정 - 인원 추가
  // putUserToWorkspace = async (workspaceId, newMember) => {
  //   const currentTime = new Date();
  //   const workspace = await Workspace.findByIdAndUpdate(
  //     { _id: workspaceId },
  //     { 
  //       $push: { workspaceMember: newMember },
  //       updatedAt: currentTime
  //     },
  //     { new: true }
  //   );
  //   return workspace;
  // };

  // // Workspace 삭제
  // deleteWorkspace = async (workspaceId) => {
  //   const workspace = await Workspace.findByIdAndRemove(
  //     { _id: workspaceId },
  //     { new: true }
  //   );
  //   return workspace;
  // };
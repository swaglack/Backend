const { StatusCodes } = require("http-status-codes"); // StatusCodes를 사용하기 위해 http-status-codes 패키지 추가
const CustomError = require("../utils/error.utils");
const WorkspaceRepository = require("../repositories/workspaces.repository");
const UserWorkspaceRepository = require("../repositories/userWorkspaces.repository");
const ChannelRepository = require("../repositories/channels.repository");
const UserRepository = require("../repositories/users.repository");

class WorkspaceService {
  workspaceRepository = new WorkspaceRepository();
  userWorkspaceRepository = new UserWorkspaceRepository();
  channelRepository = new ChannelRepository();
  userRepository = new UserRepository();

  /**************************************************
   *               워크스페이스 생성                *
   **************************************************/
  postWorkspace = async (workspaceName, userId) => {
    // 워크스페이스 조회
    let workspace = await this.workspaceRepository.getOneWorkspace({
      workspaceName,
      userId,
    });

    // 워크스페이스 유효성 검사
    if (workspace) {
      throw new CustomError(
        "동일한 이름의 workspace가 존재합니다.",
        StatusCodes.BAD_REQUEST
      );
    }

    // workspace 생성
    workspace = await this.workspaceRepository.postWorkspace({
      workspaceName,
      userId,
    });

    // userWorkspace 생성
    await this.userWorkspaceRepository.postUserWorkspace({
      userId,
      workspaceId: workspace.workspaceId,
    });
  };

  /**************************************************
   *            전체 워크스페이스 조회              *
   **************************************************/
  getAllWorkspace = async (userId) => {
    // 현재 접속한 사용자 userId가 멤버인 모든 워크스페이스 조회
    const workspace = await this.workspaceRepository.getAllWorkspace({
      userId,
    });

    const filteredWorkspace = workspace.map((item) => {
      return {
        workspaceName: item.workspaceName,
        workspaceId: item.workspaceId,
      };
    });
    return filteredWorkspace;
  };

  /**************************************************
   *             단일 워크스페이스 조회             *
   **************************************************/
  getOneWorkspace = async (workspaceId) => {
    let workspace = await this.workspaceRepository.getOneWorkspace({
      workspaceId,
    });

    // 해당 워크스페이스가 존재하지 않음
    if (!workspace) {
      throw new CustomError(
        "워크스페이스가 존재하지 않습니다.",
        StatusCodes.NOT_FOUND
      );
    }

    // 워크스페이스가 보유한 멤버 조회
    const userList = await this.userWorkspaceRepository.getAllUserWorkspace({
      workspaceId,
    });
    const filteredUserList = userList.map((item) => {
      const userId = item.userId;
      return userId;
    });

    // 워크스페이스가 보유한 채널 조회
    const channelList = await this.channelRepository.getAllChannel({
      workspaceId,
    });
    const filteredChannelList = channelList.map((item) => {
      const channelId = item.channelId;
      return channelId;
    });

    workspace = {
      workspaceName: workspace.workspaceName,
      workspaceMember: filteredUserList ? filteredUserList : [],
      workspaceChannel: filteredChannelList ? filteredChannelList : [],
    };

    return workspace;
  };

	/**************************************************
	 *               워크스페이스 수정                *
	 **************************************************/
  putUserToWorkspace = async (workspaceId, nickName) => {
    // 워크스페이스 조회
    const workspace = await this.workspaceRepository.getOneWorkspace({
      workspaceId,
    });

    // 해당 워크스페이스가 존재하지 않음
    if (!workspace) {
      throw new CustomError(
        "워크스페이스가 존재하지 않습니다.",
        StatusCodes.NOT_FOUND
      );
    }

    // 유저 조회
    const user = await this.userRepository.getOneUser({ nickName });

    // 해당 유저가 존재하지 않음
    if (!user) {
      throw new CustomError(
        "해당 유저는 존재하지 않습니다.",
        StatusCodes.NOT_FOUND
      );
    }

    // 해당 유저를 UserWorkspaces 테이블에서 조회
    const userList = await this.userWorkspaceRepository.getOneUserWorkspace({
      workspaceId,
			userId: user.userId
    });

    // 워크스페이스 멤버에 이미 해당 인원이 있음
    if (userList) {
      throw new CustomError(
        `${newMember}은/는 이미 해당 워크스페이스의 멤버입니다.`,
        StatusCodes.BAD_REQUEST
      );
    }

		// 워크스페이스에 인원 추가
    await this.userWorkspaceRepository.postUserWorkspace({workspaceId, userId: user.userId});
  };

	/**************************************************
	 *                워크스페이스 삭제               *
	 **************************************************/
  deleteWorkspace = async (workspaceId) => {
    // 워크스페이스 조회
    const workspace = await this.workspaceRepository.getAllWorkspace({
      workspaceId
		});

    // 해당 워크스페이스가 존재하지 않음
    if (!workspace) {
      throw new CustomError(
        "워크스페이스가 존재하지 않습니다.",
        StatusCodes.NOT_FOUND
      );
    }

		// 유저-워크스페이스 삭제
    await this.userWorkspaceRepository.deleteUserWorkspace({workspaceId});

		// 워크스페이스 삭제
    await this.workspaceRepository.deleteWorkspace({workspaceId});
  };
}

module.exports = WorkspaceService;

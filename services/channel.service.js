const { StatusCodes } = require("http-status-codes");
const ErrorUtils = require("../utils/error.utils");
const ChannelRepository = require("../repositories/channel.repository");
const WorkspaceRepository = require("../repositories/workspace.repository");

class ChannelService {
  channelRepository = new ChannelRepository();
  workspaceRepository = new WorkspaceRepository();

  // Channel 생성
  postChannel = async (channelName, userName, workspaceId, res, next) => {
    // 워크스페이스 조회
    let workspace = await this.workspaceRepository.getOneWorkspaceById( workspaceId );
    
    // 해당 워크스페이스가 존재하지 않음
    if (!workspace) {
      throw new ErrorUtils(
        StatusCodes.NOT_FOUND,
        "워크스페이스가 존재하지 않습니다."
      );
    };

    // 워크스페이스 채널에 이미 해당 채널이 있음
    if (workspace.workspaceChannel.includes(channelName)) {
      throw new ErrorUtils(
        StatusCodes.BAD_REQUEST,
        `${channelName}은/는 이미 해당 워크스페이스의 채널입니다.`
      );
    }
    
    // 워크스페이스에 채널 정보 반영
    workspace = await this.workspaceRepository.putChannelToWorkspace(
      workspaceId,
      channelName
    );

    // 워크스페이스에 채널 정보 반영 실패
    if (!workspace) {
      throw new ErrorUtils(
        StatusCodes.BAD_REQUEST,
        "워크스페이스에 채널 정보 반영에 실패했습니다."
      );
    }

    // 채널 조회
    let channel = await this.channelRepository.getOneChannelbyName( channelName, workspaceId );

    // 이미 해당 워크스페이스와 채널 정보를 가진 값이 존재
    if (channel) {
      throw new ErrorUtils(
        StatusCodes.BAD_REQUEST,
        "이미 해당 워크스페이스와 채널 정보를 가진 값이 존재합니다."
      );
    }

    // 채널 생성
    channel = await this.channelRepository.postChannel(
      channelName,
      workspaceId,
      userName
    );

    // 채널이 정상적으로 생성되지 않음
    if (!channel) {
      throw new ErrorUtils(
        StatusCodes.BAD_REQUEST,
        "채널 생성에 실패하였습니다."
      );
    }

    return channel;
  };

  // 전체 Channel 정보 가저오기
  getAllChannel = async (workspaceId, res, next) => {
    const workspace = await this.workspaceRepository.putChannelToWorkspace(
      workspaceId
    );

    // 워크스페이스가 존재하지 않음
    if (!workspace) {
      throw new ErrorUtils(
        StatusCodes.NOT_FOUND,
        "워크스페이스가 존재하지 않습니다."
      );
    }

    const channel = await this.channelRepository.getAllChannel(workspaceId);

    const filteredChannel = channel.map((item) => ({
      channelName: item.channelName,
      channelId: item.channelId,
      userCount: item.channelMember.length,
    }));

    return filteredChannel;
  };

  // 특정 Channel 정보 가저오기
  getOneChannel = async (workspaceId, channelId, res, next) => {
    const workspace = await this.workspaceRepository.putChannelToWorkspace(workspaceId);

    // 워크스페이스가 존재하지 않음
    if (!workspace) {
      throw new ErrorUtils(
        StatusCodes.NOT_FOUND,
        "워크스페이스가 존재하지 않습니다."
      );
    }
    
    const channel = await this.channelRepository.getOneChannelbyId(channelId);

    // 채널이 없는 경우 에러
    if (!channel) {
      throw new ErrorUtils(
        StatusCodes.BAD_REQUEST,
        "채널이 존재하지 않습니다."
      );
    }

    const filteredChannel = {
      channelName: channel.channelName,
      channelMember: channel.channelMember,
      channelChat: channel.channelChat,
    };

    return filteredChannel;
  };

  // Channel 수정 - 인원 추가
  putUserToChannel = async (workspaceId, channelId, newMember, res, next) => {
    const workspace = await this.workspaceRepository.putChannelToWorkspace(workspaceId);

    // 워크스페이스가 존재하지 않음
    if (!workspace) {
      throw new ErrorUtils(
        StatusCodes.NOT_FOUND,
        "워크스페이스가 존재하지 않습니다."
      );
    }
    
    let channel = await this.channelRepository.getOneChannelbyId(channelId);

    // 채널이 없는 경우 에러
    if (!channel) {
      throw new ErrorUtils(
        StatusCodes.BAD_REQUEST,
        "채널이 존재하지 않습니다."
      );
    }

    // 워크스페이스 멤버에 이미 해당 인원이 있음
    if (channel.channelMember.includes(newMember)) {
      throw new ErrorUtils(
        StatusCodes.BAD_REQUEST,
        `${newMember}은/는 이미 해당 채널의 멤버입니다.`
      );
    }

    channel = await this.channelRepository.putUserToChannel(
      channelId,
      newMember
    );
    // return channel;
  };

  // Channel 삭제
  deleteChannel = async (workspaceId, channelId, res, next) => {
    const workspace = await this.workspaceRepository.putChannelToWorkspace(workspaceId);

    // 워크스페이스가 존재하지 않음
    if (!workspace) {
      throw new ErrorUtils(
        StatusCodes.NOT_FOUND,
        "워크스페이스가 존재하지 않습니다."
      );
    }
    
    let channel = await this.channelRepository.getOneChannelbyId(channelId);

    // 채널이 없는 경우 에러
    if (!channel) {
      throw new ErrorUtils(
        StatusCodes.BAD_REQUEST,
        "채널이 존재하지 않습니다."
      );
    }
    
    await this.channelRepository.deleteChannel(channelId);
    // return channel;
  };

  // Channel 수정 - 채팅 추가
  putChatToChannel = async (data, workspaceName, channelName, res, next) => {
    const channel = await this.channelRepository.getOneChannelbyName2(channelName, workspaceName);

    // 채널이 존재하지 않음
    if (!channel) {
      throw new ErrorUtils(
        StatusCodes.NOT_FOUND,
        "채널이 존재하지 않습니다."
      );
    }
    console.log(data.name)
    console.log(data.message)

    if (channel.channelChat[0]) {
      await this.channelRepository.putChatToChannel(data, channelName);
    } else {
      await this.channelRepository.postChatToChannel(data, channelName);
    }
  };
}



module.exports = ChannelService;

const ErrorUtils = require("../utils/error.utils");
const ChannelRepository = require("../repositories/channel.repository");
const WorkspaceRepository = require("../repositories/workspace.repository");

class ChannelService {
  channelRepository = new ChannelRepository();
  workspaceRepository = new WorkspaceRepository();

  // Channel 생성
  postChannel = async (channelName, userName, workspaceId, res, next) => {
    // 워크스페이스에 채널 정보 반영
    const workspace = await this.workspaceRepository.putChannelToWorkspace(workspaceId, channelName)
    if (!workspace) {
      return ErrorUtils.handleErrorResponse(
        res,
        StatusCodes.BAD_REQUEST,
        "워크스페이스에 채널 정보 반영 실패"
      );
    }

    // 채널 생성
    const channel = await this.channelRepository.postChannel(
      channelName,
      workspaceId,
      userName,
    );
    
    // 채널이 정상
    if (!channel) {
      return ErrorUtils.handleErrorResponse(
        res,
        StatusCodes.BAD_REQUEST,
        "채널 생성 실패"
      );
    }

    return channel;
  }

  // 전체 Channel 정보 가저오기
  getAllChannel = async (workspaceId, res, next) => {
    const workspace = await this.workspaceRepository.putChannelToWorkspace(workspaceId, channelName)
    if (!workspace) {
      return ErrorUtils.handleErrorResponse(
        res,
        StatusCodes.BAD_REQUEST,
        "워크스페이스에 채널 정보 반영 실패"
      );
    }

    const channelList = await this.channelRepository.getAllChannel(workspaceId);

    const filteredChannelList = channelList.map(channel => ({
      channelName: channel.channelName,
      channelId: channel.channelId,
      userCount: channel.channelMember.length
    }));

    return filteredChannelList;
  }

  // 특정 Channel 정보 가저오기
  getOneChannel = async (workspaceId, channelId, res, next) => {
    const channel = await this.channelRepository.getOneChannel(channelId);

    const filteredChannel = {
      channelName: channel.channelName,
      channelMember: channel.channelMember,
      channelChat: channel.channelChat, 
    };

    return filteredChannel;
  }

  // Channel 수정 - 인원 추가
  putUserToChannel = async (workspaceId, channelId, newMember, res, next) => {
    const channel = await this.channelRepository.putUserToChannel(channelId, newMember);
    return channel;
  }

  // Channel 삭제
  deleteChannel = async (workspaceId, channelId, res, next) => {
    const channel = await this.channelRepository.deleteChannel(channelId);
    return channel;
  }
}

module.exports = ChannelService;

const Channel = require("../schemas/channel");

class ChannelRepository {
  // Channel 생성
  postChannel = async (channelName, workspaceId, userName) => {
    const channel = await Channel.create({
      channelName,
      workspaceId,
      channelMaster: userName,
      channelMember: [userName],
    });
    return channel;
  };

  // 전체 Channel 정보 가져오기
  getAllChannel = async (workspaceId) => {
    const channel = await Channel.find({ workspaceId }).sort({ updatedAt: -1 });
    return channel;
  };

  // 특정 Channel 정보 가져오기 - channelName, workspaceId
  getOneChannelbyName = async ( channelName, workspaceId ) => {
    const channel = await Channel.findOne({ channelName, workspaceId });
    return channel;
  };

  // 특정 Channel 정보 가져오기 - channelId
  getOneChannelbyId = async (channelId) => {
    const channel = await Channel.findOne({ _id: channelId });
    return channel;
  };

  // Channel 수정 - 인원 추가
  putUserToChannel = async (channelId, newMember) => {
    const currentTime = new Date();
    const channel = await Channel.findByIdAndUpdate(
      { _id: channelId },
      { 
        $push: { channelMember: newMember },
        updatedAt: currentTime
      },
      { new: true }
    );
    return channel;
  };

  // Channel 삭제
  deleteChannel = async (channelId) => {
    const channel = await Channel.findByIdAndRemove(
      { _id: channelId },
      { new: true }
    );
    return channel;
  };
}

module.exports = ChannelRepository;

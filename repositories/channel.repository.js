const Channel = require("../schemas/channel");

class ChannelRepository {
  // Channel 생성
  postChannel = async (channelName, userName, workspaceId) => {
    const channel = await Channel.create({
      channelName,
      workspaceId,
      channelMaster: userName,
      channelMember: [userName],
    });
    return channel ;
  };
}

module.exports = ChannelRepository;

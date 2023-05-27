const CustomError = require("../utils/error.utils");
const ChannelRepository = require("../repositories/channel.repository");

class ChannelService {
  channelService = new ChannelRepository();

  // Channel 생성
  postChannel = async (channelName, userName, workspaceId, res, next) => {
    const channel = await this.channelService.postChannel(
      channelName,
      userName,
      workspaceId
    );
    return channel;
  }
}

module.exports = ChannelService;

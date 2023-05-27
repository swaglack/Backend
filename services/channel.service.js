const CustomError = require("../utils/error.utils");
const ChannelRepository = require("../repositories/channel.repository");

class ChannelService {
  channelService = new ChannelRepository();

  postChannel = async (req, res, next) => {
    try {
      return res.status(201).json({});
    } catch (err) {
      return err;
    }
  };
}

module.exports = ChannelService;

const { Op } = require("sequelize"); // Sequlize Operation 연산 사용을 위해 추가
const { Channels, UserChannels, Chats, Users, sequelize } = require("../models"); // 모델 가져오기

class JoinRepository {
	/**************************************************
	 *        채널조회(Channels & UserChannels)       *
	 **************************************************/
	getAllChannel = async (contents) => {
		const channel = await Channels.findAll({
			where: contents,
			attributes: [
				"channelId",
				"channelName",
				"channelMaster",
				[sequelize.literal('(SELECT COUNT(*) FROM UserChannels WHERE UserChannels.channelId = Channels.channelId)'), 'userCount']
			],
			raw: true, // 원시데이터로 조회
			nest: true,
		});
		return channel;
	}

	/**************************************************
	 * 단일채널조회(Channels & UserChannels & Chats)  *
	 **************************************************/
	getOneChannel = async (contents) => {
		const channel = await Channels.findOne({
			where: contents,
		});
		return channel;
	}
}

module.exports = JoinRepository;
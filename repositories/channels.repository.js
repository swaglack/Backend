const { Op } = require("sequelize"); // Sequlize Operation 연산 사용을 위해 추가
const { Channels } = require("../models"); // 모델 가져오기

class ChannelRepository {
	/**************************************************
	 *                    채널생성                    *
	 **************************************************/
	postChannel = async (contents) => {
		const channel = await Channels.create(contents);
		return channel;
	}

	/**************************************************
	 *                  전체 채널 조회                *
	 **************************************************/
	getAllChannel = async (condition) => {
		const channel = await Channels.findAll({
			attributes: ["channelId", "channelName", "channelMaster", "workspaceId"],
			where: condition,
			order: [["channelUpdatedAt", "DESC"]],
		})
		return channel;
	}
	
	/**************************************************
	 *                 단일 채널 조회                 *
	 **************************************************/
	getOneChannel = async (condition) => {
		const channel = await Channels.findOne({
			attributes: ["channelId", "channelName", "channelMaster", "workspaceId"],
			where: condition
		})
		return channel;
	}

	/**************************************************
	 *                   채널 수정                    *
	 **************************************************/
	putChannel = async (updatedData, condition) => {
		const channel = await Channels.update(
			{ updatedData },
			{ where: condition }
		)
		return channel;
	}

	/**************************************************
	 *                    채널 삭제                   *
	 **************************************************/
	deleteChannel = async (condition) => {
		const channel = await Channels.destroy({
			where: condition
		})
		return channel;
	}
}

module.exports = ChannelRepository;
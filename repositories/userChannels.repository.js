const { Op } = require("sequelize"); // Sequlize Operation 연산 사용을 위해 추가
const { UserChannels } = require("../models"); // 모델 가져오기

class UserChannelRepository {
	/**************************************************
	 *                     UC 생성                    *
	 **************************************************/
	postUserChannel = async (contents) => {
		const userChannel = await UserChannels.create(contents);
		return userChannel;
	}

	/**************************************************
	 *                   전체 UC 조회                 *
	 **************************************************/
	getAllUserChannel = async (conditions) => {
		const userChannel = await UserChannels.findAll({
			attributes: ["userChannelId", "userId", "channelId"],
			where: conditions,
		})
		return userChannel;
	}
	
	/**************************************************
	 *                 단일 UC 조회                   *
	 **************************************************/
	getOneUserChannel = async (condition) => {
		const userChannel = await UserChannels.findOne({
			attributes: ["userChannelId", "userId", "channelId"],
			where: condition
		})
		return userChannel;
	}

	/**************************************************
	 *                    UC 수정                     *
	 **************************************************/
	putUserChannel = async (updatedData, condition) => {
		const userChannel = await UserChannels.update(
			{ updatedData },
			{ where: condition }
		)
		return userChannel;
	}

	/**************************************************
	 *                     UC 삭제                    *
	 **************************************************/
	deleteUserChannel = async (condition) => {
		const userChannel = await UserChannels.destroy({
			where: condition
		})
		return userChannel;
	}
}

module.exports = UserChannelRepository;
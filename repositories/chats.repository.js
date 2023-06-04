const { Op } = require("sequelize"); // Sequlize Operation 연산 사용을 위해 추가
const { Chats } = require("../models"); // 모델 가져오기

class ChatRepository {
	/**************************************************
	 *                    채팅생성                    *
	 **************************************************/
	postChat = async (contents) => {
		const chat = await Chats.create(contents);
		return chat;
	}

	/**************************************************
	 *                  전체 채팅 조회                *
	 **************************************************/
	getAllChat = async (conditions) => {
		const chat = await Chats.findAll({
			attributes: ["chatId", "chatContent", "chatImg", "chatCreatedAt", "channelId", "userId"],
			where: conditions,
			order: [["chatCreatedAt", "DESC"]]
		})
		return chat;
	}
	
	/**************************************************
	 *                 단일 채팅 조회                 *
	 **************************************************/
	getOneChat = async (condition) => {
		const chat = await Chats.findOne({
			attributes: ["chatId", "chatContent", "chatImg", "chatCreatedAt", "channelId", "userId"],
			where: condition
		})
		return chat;
	}

	/**************************************************
	 *                   채팅 수정                    *
	 **************************************************/
	putChat = async (updatedData, condition) => {
		const chat = await Chats.update(
			{ updatedData },
			{ where: condition }
		)
		return chat;
	}

	/**************************************************
	 *                    채팅 삭제                   *
	 **************************************************/
	deleteChat = async (condition) => {
		const chat = await Chats.destroy({
			where: condition
		})
		return chat;
	}
}

module.exports = ChatRepository;
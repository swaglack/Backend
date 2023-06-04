const { Op } = require("sequelize"); // Sequlize Operation 연산 사용을 위해 추가
const { Users } = require("../models"); // 모델 가져오기

class UserRepository {
	/**************************************************
	 *                    유저 생성                   *
	 **************************************************/
	postUser = async (contents) => {
		const user = await Users.create(contents);
		return user;
	}

	/**************************************************
	 *                  전체 유저 조회                *
	 **************************************************/
	getAllUser = async () => {
		const user = await Users.findAll({
			attributes: ["userId", "userName", "nickName", "userPwd", "userCreatedAt"],
			order: [["userCreatedAt", "DESC"]] 
		})
		return user;
	}
	
	/**************************************************
	 *                단일 유저 조회                  *
	 **************************************************/
	getOneUser = async (condition) => {
		const user = await Users.findOne({
			attributes: ["userId", "userName", "nickName", "userPwd", "userCreatedAt"],
			where: condition,
		})
		return user;
	}

	/**************************************************
	 *                   유저 수정                    *
	 **************************************************/
	putUser = async (updatedData, condition) => {
		const user = await Users.update(
			{ updatedData },
			{ where: condition }
		)
		return user;
	}

	/**************************************************
	 *                    유저 삭제                   *
	 **************************************************/
	deleteUser = async (condition) => {
		const user = await Users.destroy({
			where: condition
		})
		return user;
	}
}

module.exports = UserRepository;
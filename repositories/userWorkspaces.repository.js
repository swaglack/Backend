const { Op } = require("sequelize"); // Sequlize Operation 연산 사용을 위해 추가
const { UserWorkspaces } = require("../models"); // 모델 가져오기

class UserWorkspaceRepository {
	/**************************************************
	 *                    UW 생성                     *
	 **************************************************/
	postUserWorkspace = async (contents) => {
		const userWorkspace = await UserWorkspaces.create(contents);
		return userWorkspace;
	}

	/**************************************************
	 *                  전체 UW 조회                  *
	 **************************************************/
	getAllUserWorkspace = async (condition) => {
		const userWorkspace = await UserWorkspaces.findAll({
			attributes: ["userWorkspaceId", "userId", "workspaceId"],
			where: condition,
		})
		return userWorkspace;
	}
	
	/**************************************************
	 *                단일 UW 조회                    *
	 **************************************************/
	getOneUserWorkspace = async (condition) => {
		const userWorkspace = await UserWorkspaces.findOne({
			attributes: ["userWorkspaceId", "userId", "workspaceId"],
			where: condition,
		})
		return userWorkspace;
	}

	/**************************************************
	 *                   UW 수정                      *
	 **************************************************/
	putUserWorkspace = async (updatedData, condition) => {
		const userWorkspace = await UserWorkspaces.update(
			{ updatedData },
			{ where: condition }
		)
		return userWorkspace;
	}

	/**************************************************
	 *                    UW 삭제                     *
	 **************************************************/
	deleteUserWorkspace = async (condition) => {
		const userWorkspace = await UserWorkspaces.destroy({
			where: condition
		})
		return userWorkspace;
	}
}

module.exports = UserWorkspaceRepository;
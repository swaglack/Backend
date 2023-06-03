// const User = require("../schemas/user");
const { Op } = require("sequelize"); // Sequlize Operation 연산 사용을 위해 추가
const { Users } = require("../models"); // 모델 가져오기

class UserRepository {
  // 유저 조회
  getUser = async (userName) => {
    const user = await Users.findOne({
      where: { userName }
    });
    return user;
  };

  // 유저 생성
  postUser = async (userName, nickName, userPwd) => {
    console.log(userName,nickName,userPwd)
    const user = await Users.create({
      userName,
      nickName,
      userPwd
    });
    return user;
  };

  // 유저 정보 변경
  putUser = async (userName, updatedData) => {
    const user = await Users.update(updatedData, {
      where: { userName },
      returning: true,
      plain: true
    });
  
    if (user[0] === 0) {
      return null; // 유저를 찾지 못한 경우 null 반환
    }
  
    return user[1].dataValues; // 업데이트된 유저 정보 반환
  };
  // putUser = async (userName, updatedData) => {
  //   const user = await Users.findOneAndUpdate(
  //     { userName }, 
  //     updatedData,
  //     { new: true });
  //   return user;
  // };
}

module.exports = UserRepository;

// 스키마 가져오기
const User = require("../schemas/user");

class UserRepository {
  // 유저 조회
  getUser = async (userName) => {
    const user = await User.findOne({
      userName,
    });
    return user;
  };

  // 유저 생성
  postUser = async (userName, nickName, userPwd) => {
    const user = await User.create({
      userName,
      nickName,
      userPwd,
    });
    return user;
  };

  // 유저 정보 변경
  putUser = async (userName, updatedData) => {
    const user = await User.findOneAndUpdate(
      { userName }, 
      updatedData, 
      { new: true, }
    );
    return user;
  };
}

module.exports = UserRepository;

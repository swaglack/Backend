const ErrorUtils = require("../utils/error.utils");
const UserRepository = require("../repositories/user.repository");

class UserService {
  userRepository = new UserRepository();

  // 회원가입
  signUp = async (userName, nickName, userPwd, res) => {
    // User 조회
    const getUser = await this.userRepository.getUser(userName);

    // User 중복 검사
    if (getUser) {
      throw new CustomError("요청 정보가 유효하지 않습니다.(닉네임 중복)", 400);
    }

    // User 생성
    const user = await this.userRepository.postUser(
      userName,
      nickName,
      userPwd
    );

    return user;
  };

  // 로그인
  logIn = async (userName, userPwd, res) => {
    // User 조회
    const getUser = await this.userRepository.getUser(userName);

    // User 아이디 및 비밀번호 유효성 검사
    if (!getUser || userPwd !== getUser.userPwd) {
      throw new CustomError(
        "요청 정보가 유효하지 않습니다.(아이디 or 비밀번호 불일치)",
        400
      );
    }

    return true;
  };
}

module.exports = UserService;

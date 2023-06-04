const { StatusCodes } = require("http-status-codes");
const { TokenUtil } = require("../utils/token.utils");
const CustomError = require("../utils/error.utils");
const UserRepository = require("../repositories/users.repository");

class UserService {
  userRepository = new UserRepository();

  /**************************************************
   *                    회원가입                    *
   **************************************************/
  signUp = async (userName, nickName, userPwd) => {
    // User 조회
    let user = await this.userRepository.getOneUser({ userName });

    // User 중복 검사
    if (user) {
      throw new CustomError(
        "요청 정보가 유효하지 않습니다.(userName 중복)",
        StatusCodes.BAD_REQUEST
      );
    }

    // User 생성
    user = await this.userRepository.postUser({
      userName,
      nickName,
      userPwd,
    });

    return user;
  };

  /**************************************************
   *                    로그인                      *
   **************************************************/
  logIn = async (userName, userPwd) => {
    // User 조회
    const user = await this.userRepository.getOneUser({ userName });

    // User 아이디 및 비밀번호 유효성 검사
    if (!user || userPwd !== user.userPwd) {
      throw new CustomError(
        "요청 정보가 유효하지 않습니다.(아이디 or 비밀번호 불일치)",
        StatusCodes.BAD_REQUEST
      );
    }

    // JWT 토큰 생성
    const tokenUtil = new TokenUtil(user.userId, user.userName, user.nickName);
    const token = tokenUtil.createToken();

    return token;
  };
}

module.exports = UserService;

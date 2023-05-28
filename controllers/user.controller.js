const { StatusCodes } = require("http-status-codes");
const ErrorUtils = require("../utils/error.utils");
const UserService = require("../services/user.service");

class UserController {
  userService = new UserService();

  // 회원가입
  signUp = async (req, res, next) => {
    try {
      const { userName, nickName, userPwd } = req.body;

      // 입력값 유효성 검사
      if (!userName || !nickName || !userPwd) {
        return ErrorUtils.handleErrorResponse(
          res,
          StatusCodes.BAD_REQUEST,
          "userName, nickName, userPwd는 필수 입력값입니다."
        );
      }

      await this.userService.signUp(userName, nickName, userPwd, res);

      return res.status(StatusCodes.CREATED).end();
    } catch (err) {
      console.error(err);
      return ErrorUtils.handleInternalServerError(res);
    }
  };

  // 로그인
  logIn = async (req, res, next) => {
    try {
      const { userName, userPwd } = req.body;

       // 입력값 유효성 검사
       if (!userName || !userPwd) {
        return ErrorUtils.handleErrorResponse(
          res,
          StatusCodes.BAD_REQUEST,
          "userName, userPwd는 필수 입력값입니다."
        );
      }

      // 유저 로그인 및 토큰 생성
      const token = await this.userService.logIn(userName, userPwd, res);

      // JWT 토큰을 header로 전달 (body로 전달하는 값은 백엔드 내부 확인용)
      res.header("Authorization", `Bearer ${token}`, { secure: false });

      return res.status(StatusCodes.OK).json({Authorization: `Bearer ${token}`});
    } catch (err) {
      console.error(err);
      return ErrorUtils.handleInternalServerError(res);
    }
  };
}

module.exports = UserController;

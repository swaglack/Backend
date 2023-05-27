const CustomError = require("../utils/error.utils");
const UserService = require("../services/user.service");

class UserController {
  userService = new UserService();

  // 회원가입
  signUp = async (req, res, next) => {
    try {
      const { userName, nickName, userPwd } = req.body;

      // 입력값 유효성 검사
      if (!userName || !nickName || !userPwd) {
        throw new CustomError(
          "요청 정보가 유효하지 않습니다.(입력값 에러)",
          400
        );
      }

      await this.userService.signUp(userName, nickName, userPwd, res);

      return res.status(201).json({});
    } catch (err) {
      if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
          message: err.message,
        });
      }
      console.log(err);
      return res.status(403).json({
        message: "회원가입에 실패했습니다.",
      });
    }
  };

  // 로그인
  logIn = async (req, res, next) => {
    try {
      const { userName, userPwd } = req.body;

      // 입력값 유효성 검사
      if (!userName || !userPwd) {
        throw new CustomError(
          "요청 정보가 유효하지 않습니다.(입력값 에러)",
          400
        );
      }

      await this.userService.logIn(userName, userPwd, res);

      return res.status(201).json({});
    } catch (err) {
      if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
          message: err.message,
        });
      }
      console.log(err);
      return res.status(403).json({
        message: "로그인에 실패했습니다.",
      });
    }
  };
}

module.exports = UserController;

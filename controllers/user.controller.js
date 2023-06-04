const { StatusCodes } = require("http-status-codes");
const CustomError = require("../utils/error.utils");
const UserService = require("../services/user.service");

class UserController {
  userService = new UserService();

  /**************************************************
   *                    회원가입                    *
   **************************************************/
  signUp = async (req, res) => {
    try {
      const { userName, nickName, userPwd } = req.body;

      // 입력값 유효성 검사
      if (!userName || !nickName || !userPwd) {
        throw new CustomError("userName, nickName, userPwd는 필수 입력값입니다.", StatusCodes.BAD_REQUEST);
      }

      await this.userService.signUp(userName, nickName, userPwd);

      return res.status(StatusCodes.CREATED).end();
    } catch (err) {
      console.error(err);
      if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
          message: err.message,
        });
      }
      return res.status(StatusCodes.NOT_ACCEPTABLE).json({
        message: "기타 오류",
      });
    }
  };

  /**************************************************
   *                    로그인                      *
   **************************************************/
  logIn = async (req, res) => {
    try {
      const { userName, userPwd } = req.body;

      // 입력값 유효성 검사
      if (!userName || !userPwd) {
        throw new CustomError("userName, userPwd는 필수 입력값입니다.", StatusCodes.BAD_REQUEST);
      }

      // 유저 로그인 및 토큰 생성
      const token = await this.userService.logIn(userName, userPwd);

      // JWT 토큰을 header로 전달 (body로 전달하는 값은 백엔드 내부 확인용)
      res.set("Authorization", `Bearer ${token}`, { secure: true });

      // JWT 토큰을 cookie로 전달 (body로 전달하는 값은 백엔드 내부 확인용)
      res.cookie("Authorization", `Bearer ${token}`, { secure: true });

      return res
        .status(StatusCodes.OK)
        .json({ Authorization: `Bearer ${token}` });
    } catch (err) {
      console.error(err);
      if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
          message: err.message,
        });
      }
      return res.status(StatusCodes.NOT_ACCEPTABLE).json({
        message: "기타 오류",
      });
    }
  };

  /**************************************************
   *                    유저조회                    *
   **************************************************/
  userinfo = async (req, res, next) => {
    try {
      const { userId, userName, nickName } = res.locals.user;

			// 입력값 유효성 검사
      if (!userId || !userName || !nickName) {
        throw new CustomError("토큰 정보가 유효하지 않습니다.", StatusCodes.BAD_REQUEST);
      }

      return res.status(StatusCodes.OK).json({ 
				userId, userName, nickName 
			});
    } catch (err) {
      console.error(err);
      if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
          message: err.message,
        });
      }
      return res.status(StatusCodes.NOT_ACCEPTABLE).json({
        message: "기타 오류",
      });
    }
  };
}

module.exports = UserController;

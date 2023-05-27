const UserService = require("../services/user.service");

class UserController {
  userService = new UserService();
  
  // 로그인
  logIn = async (req, res, next) => {
    try {
      return res.status(201).json({ });
    } catch (err) {
      return err;
    }
  };

  // 회원가입
  signUp = async (req, res, next) => {
    try {
      return res.status(201).json({ });
    } catch (err) {
      return err;
    }
  };
}

module.exports = UserController;
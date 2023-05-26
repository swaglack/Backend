const UserService = require("../services/user.service");

class UserController {
  userService = new UserService();

  postUser = async (req, res, next) => {
    try {
      return res.status(201).json({ });
    } catch (err) {
      return err;
    }
  };
}

module.exports = UserController;
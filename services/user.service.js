const UserRepository = require("../repositories/user.repository");

class UserService {
  userRepository = new UserRepository();

  postUser = async (req, res, next) => {
    try {
      return res.status(201).json({ });
    } catch (err) {
      return err;
    }
  };
}

module.exports = UserService;
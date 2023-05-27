const WorkspaceRepository = require("../repositories/workspace.repository");

class WorkspaceService {
  userRepository = new WorkspaceRepository();

  postUser = async (req, res, next) => {
    try {
      return res.status(201).json({ });
    } catch (err) {
      return err;
    }
  };
}

module.exports = WorkspaceService;
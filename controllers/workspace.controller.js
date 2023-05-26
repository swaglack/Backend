const WorkspaceService = require("../services/workspace.service");

class WorkspaceController {
  workspaceService = new WorkspaceService();

  postWorkspace = async (req, res, next) => {
    try {
      return res.status(201).json({ });
    } catch (err) {
      return err;
    }
  };
}

module.exports = WorkspaceController;
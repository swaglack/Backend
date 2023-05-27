class WorkspaceRepository {
  postChannel = async (req, res, next) => {
    try {
      return res.status(201).json({ });
    } catch (err) {
      return err;
    }
  };
}

module.exports = WorkspaceRepository;
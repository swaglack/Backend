const mongoose = require("mongoose");

// Workspace 스키마 정의
const WorkspaceSchema = new mongoose.Schema({
  workspaceName: {
    type: String,
    required: true,
    unique: true,
  },
  workspaceMaster: {
    type: String,
    required: true,
  },
  workspaceMember: {
    type: [String],
    required: true,
  },
  workspaceChannel: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

WorkspaceSchema.virtual("workspaceId").get(function () {
  return this._id.toHexString();
});

WorkspaceSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Workspace", WorkspaceSchema);

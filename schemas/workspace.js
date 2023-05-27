const mongoose = require("mongoose");

const Member = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userName: {
    type: String,
    ref: "User",
    required: true,
    unique: true,
  },
});

const Channel = new mongoose.Schema({
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
  },
  channelName: {
    type: String,
    ref: "Channel",
    required: true,
    unique: true,
  },
});

// Workspace 스키마 정의
const WorkspaceSchema = new mongoose.Schema({
  workspaceId: mongoose.Schema.Types.ObjectId,
  workspaceName: {
    type: String,
    required: true,
    unique: true,
  },
  workspaceMaster: {
    type: Member,
    require: true,
  },
  workspaceMember: {
    type: [Member],
    required: true,
  },
  workspaceChannel: {
    type: [Channel],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// WorkspaceSchema.virtual("workspaceId").get(function () {
//   return this.workspaceId.toHexString();
// });

// WorkspaceSchema.set("toJSON", {
//   virtuals: true,
// });

module.exports = mongoose.model("Workspace", WorkspaceSchema);

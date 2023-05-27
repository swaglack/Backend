const mongoose = require("mongoose");

// Workspace 스키마 정의
const workspaceSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default:Date.now
  },
});

module.exports = mongoose.model("Workspace", workspaceSchema);
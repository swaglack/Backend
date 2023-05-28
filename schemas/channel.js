const mongoose = require("mongoose");

// Channel 스키마 정의
const ChannelSchema = new mongoose.Schema({
  channelName: {
    type: String,
    required: true,
    unique: true,
  },
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace",
    required: true,
  },
  channelMaster: {
    type: String,
    required: true,
  },
  channelMember: {
    type: [String],
    required: true,
  },
  channelChat: {
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

ChannelSchema.virtual("channelId").get(function () {
  return this._id.toHexString();
});

ChannelSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Channel", ChannelSchema);

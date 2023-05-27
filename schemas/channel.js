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

// Channel 스키마 정의
const ChannelSchema = new mongoose.Schema({
  channelId: mongoose.Schema.Types.ObjectId,
  channelName: {
    type: String,
    required: true,
    unique: true,
  },
  channelMaster: {
    type: Member,
    required: true,
  },
  channelMember: {
    type: [Member],
    required: true,
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

// ChannelSchema.virtual("channelId").get(function () {
//   return this.channelId.toHexString();
// });

// ChannelSchema.set("toJSON", {
//   virtuals: true,
// });

module.exports = mongoose.model("Channel", ChannelSchema);

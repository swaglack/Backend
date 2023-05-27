const mongoose = require("mongoose");

// Channel 스키마 정의
const channelSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
		unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Channel", channelSchema);
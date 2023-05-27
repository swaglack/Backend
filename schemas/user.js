const mongoose = require("mongoose");

// User 스키마 정의
const userSchema = new mongoose.Schema({
  userId: Schema.Types.ObjectId,
  userName: {
    type: String,
    required: true,
  },
	nickName: {
    type: String,
    required: true,
  },
	userPwd: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
		default:Date.now
  },
});

module.exports = mongoose.model("User", userSchema);
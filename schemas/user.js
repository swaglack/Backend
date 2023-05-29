// schemas/user.js
const mongoose = require("mongoose");

// User 스키마 정의
const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
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
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

UserSchema.virtual("userId").get(function () {
  return this._id.toHexString();
});

UserSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", UserSchema);
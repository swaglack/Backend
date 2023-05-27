// dotenv 호출
require("dotenv").config();

// mongoose를 통한 mongodb 연결
const mongoose = require("mongoose");

const url = process.env.DB_URL || "127.0.0.1";
const dbName = process.env.DB_NAME || "swaglack";

// 127.0.0.1:27017/{본인의컬랙션명}
const connect = () => {
  mongoose
    .connect(`mongodb://${url}:27017/${dbName}`)
    .catch((err) => console.log(err));
};

mongoose.connection.on("error", (err) => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;

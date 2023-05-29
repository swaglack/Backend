// dotenv 호출
require("dotenv").config();

// mongoose를 통한 mongodb 연결
const mongoose = require("mongoose");

const url = process.env.DB_URL; 
const dbName = process.env.DB_NAME;
const options = {
  writeConcern : {w:"majority"}
}
console.log(`${url}/${dbName}`)
// 127.0.0.1:27017/{본인의컬랙션명}
const connect = () => {
  {
  mongoose
    .connect(`${url}/${dbName}`, options)
    .catch((err) => console.log(err));
  }
};

mongoose.connection.on("error", (err) => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;
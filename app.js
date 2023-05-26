// dotenv 호출
require("dotenv").config();
// express 모듈 사용
const express = require("express");
// routes/index.js 파일에서 라우터 정보 가져오기
const routes = require("./routes");
// cors 미들웨어 추가
const cors = require('cors')

const port = process.env.SERVICE_PORT || 3000; // 서비스 포트 정의
const app = express();

// cors 미들웨어 추가, 특정 도메인만 허용하기 위해서는 true 값에 도메인 정보 입력 필요 
// ex> "http://아이피정보"
app.use(cors({ origin: process.env.FRONTEND_DOMAIN || true }))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);

app.get("/", async (req, res) => {
  res.status(200).send("api서버 기본 페이지 입니다.");
});

const start = async () => {
  try {
    app.listen(port, () => {
      console.log("Server is running. PORT :", port);
    });
  } catch (error) {
    console.error(error);
  }
}

start();
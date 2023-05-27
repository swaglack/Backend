// express 모듈 사용
const express = require("express");
// routes/index.js 파일에서 라우터 정보 가져오기
const routes = require("./routes");

const port = 3000; // 서비스 포트 정의
const app = express();

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
};

start();

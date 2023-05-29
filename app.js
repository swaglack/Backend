require("dotenv").config(); // dotenv 호출
const http = require('http'); // http 패키지 추가
const express = require("express"); // express 모듈 사용
const cors = require("cors"); // cors 미들웨어 추가
const ErrorUtils = require("./utils/error.utils"); // Error 처리 핸들러 호출
const routes = require("./routes"); // routes/index.js 파일에서 라우터 정보 가져오기
const logMiddleware = require("./middlewares/log.middleware"); // 로깅 미들웨어
const socketUtil = require("./utils/socket.utils");

const port = process.env.SERVICE_PORT || 3000; // 서비스 포트 정의
const app = express();
const server = http.createServer(app);

// DB 연결, schemas/index.js를 통해 DB 연결
const connect = require("./schemas");
connect();

// 미들웨어
app.use(cors({ origin: process.env.FRONTEND_DOMAIN || true })); // cors 미들웨어
app.use(logMiddleware); // 로깅 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// socket 테스트용 프론트 정보
app.use('/css', express.static('./static/css'));
app.use('/js', express.static('./static/js'));

// socket.io 설정
socketUtil(server);

// 라우터
app.use("/api", routes);

app.get("/", async (req, res) => {
  res.status(200).sendFile(__dirname + '/static/index.html');
});

// 에러처리 미들웨어
app.use(function (err, req, res, next) {
  console.error(err);
  return ErrorUtils.handleInternalServerError(res);
});

const start = async () => {
  try {
    server.listen(port, () => {
      console.log("Server is running. PORT :", port);
    });
  } catch (error) {
    console.error(error);
  }
}

start();
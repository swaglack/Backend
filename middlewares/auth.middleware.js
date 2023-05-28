const { StatusCodes } = require("http-status-codes");
const ErrorUtils = require("../utils/error.utils");
const jwt = require("jsonwebtoken");
const { VerifyToken } = require("../utils/token.utils");

// dotenv 파일을 통해 시크릿 정보 가저오기
require("dotenv").config();
const secretKey = process.env.JWT_SECRET;

// 사용자 인증 미들웨어
module.exports = async (req, res, next) => {
  try {
    // req.header에 토큰 정보가 있는지 확인
    if (
      req.headers.authorization === undefined
    ) {
      return ErrorUtils.handleErrorResponse(
				res,
				StatusCodes.UNAUTHORIZED,
				"로그인 후 이용 가능한 기능입니다.1"
			);
    }
    
    // 토큰 입력값 검증
    const token = req.headers.authorization;
    const [AuthType, AuthToken] = (token ?? "").split(" ");
    if (!AuthToken || AuthType !== "Bearer") {
      return ErrorUtils.handleErrorResponse(
				res,
				StatusCodes.UNAUTHORIZED,
				"로그인 후 이용 가능한 기능입니다.2"
			);
    }

    // 토큰 유효성 검증을 위한 객체 생성
    const verifyToken = new VerifyToken(AuthToken)

    // 토큰 유효성 검증
    const isTokenValidate = verifyToken.validateToken();
    if (!isTokenValidate) {
      return ErrorUtils.handleErrorResponse(
				res,
				StatusCodes.UNAUTHORIZED,
				"로그인 후 이용 가능한 기능입니다.3"
			);
    };

    // 토큰 Decode -> 토큰의 payload에 닮긴 user 정보 추출
    const user = jwt.verify(AuthToken, secretKey);

    res.locals.user = user;
    next();
  } catch (err) {
		return ErrorUtils.handleErrorResponse(
			res,
			StatusCodes.UNAUTHORIZED,
			"로그인 후 이용 가능한 기능입니다.4"
		);
  }
};
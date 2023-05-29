// dotenv 파일을 통해 시크릿 정보 가저오기
require("dotenv").config();
const env = process.env;
const jwt = require("jsonwebtoken");

// 시크릿 키 정의
const secretKey = env.JWT_SECRET;

class TokenUtil {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  // Token 생성 메서드
  createToken() {
    const token = jwt.sign(
      {
        userId: this.id,
        userName: this.name,
      },
      secretKey,
      {
        expiresIn: "7d",
      }
    );
    return token;
  }
}

class VerifyToken {
  constructor(token) {
    this.token = token;
  }

  // Access Token 검증 함수
  validateToken() {
    try {
      const payload = jwt.verify(this.token, secretKey);
      return payload;
    } catch (error) {
      return false;
    }
  }
}

module.exports = {
  TokenUtil,
  VerifyToken,
};

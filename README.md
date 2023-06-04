# Backend 조원
김승철, 김재열, 나상우

# 디렉토리 역할 구조
```
- app.js
- routes : 라우터 파일들, 경로 정의
- controllers : 입력데이터에 대한 유효성 검사
- services : 비즈니스 로직 수행
- repositories : 실제 데이터 베이스 질의 수행
- middlewares : 미들웨어 모듈
- utils : 반복해서 사용하는 클래스를 정의
```

# 디렉토리 구조
![image](https://github.com/swaglack/Backend/assets/58283954/2b463d87-3b68-4993-b3a4-b736f40ae3ae)

# ERD
image.png

# dotenv
```
dotenv : 시크릿 정보가 노출되지 않도록 사용하는 모듈
npm install dotenv로 설치
참고링크 : https://velog.io/@hyunju-song/sequelize%EB%A1%9C-DB%EC%85%8B%ED%8C%85%ED%95%A0-%EB%95%8C-%ED%99%98%EA%B2%BD%EB%B3%80%EC%88%98-%ED%8C%8C%EC%9D%BC-%EC%84%A4%EC%A0%95-%EB%B0%8F-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
```
**dotenv 파일 예시**
```
JWT_SECRET="[시크릿키]"
SERVICE_PORT=[포트정보]
```

# 프로젝트 초기 구성
```
npm init
npm install express jsonwebtoken dotenv mongoose cors http-status-codes socket.io
npm install -D nodemon

# 클라이언트에서 소켓 통신을 위해 아래 모듈 필요
npm install socket.io-client
```

# prettier 준비 (코드 서식 통일)
```
# 1. 모듈 설치
npm i prettier -D

# 2. 설정 파일 추가
module.exports = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  arrowParens: 'always',
};

# 3. package.json 파일 "script" 항목 아래에 다음 항목 추가
"prettify": "prettier --write *.js **/*.js"

# 4. 실행
npm run prettify
```

# .gitignore 파일 추가
VSCODE Extension에서 gitignore

# SWAGGER 추가(api 명세서를 웹서비스 화)
```
npm install -D swagger-jsdoc swagger-ui-express
https://any-ting.tistory.com/105
```

# 에러 핸들러 클래스
```
utils/error.utils.js에 생성

상태 메시지 및 상태 코드 예시
StatusCodes.OK: 200
StatusCodes.CREATED: 201
StatusCodes.NO_CONTENT: 204
StatusCodes.BAD_REQUEST: 400
StatusCodes.UNAUTHORIZED: 401
StatusCodes.FORBIDDEN: 403
StatusCodes.NOT_FOUND: 404
StatusCodes.METHOD_NOT_ALLOWED: 405
StatusCodes.INTERNAL_SERVER_ERROR: 500
StatusCodes.SERVICE_UNAVAILABLE: 503
```

# 서버 구성
```
# 몽고 DB 설치
sudo apt-get install gnupg
curl -fsSL https://pgp.mongodb.com/server-6.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg \
   --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

sudo service mongod restart

# nodejs 설치
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# git clone
git clone https://github.com/swaglack/Backend
cd Backend
npm install

# iptables 설정 3000 -> 80
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000

# pm2 설치
sudo -s
npm install -g pm2

# pm2 시작
pm2 start app.js

# pm2 종료
pm2 delete 0 
```

# DB 변경 (MongoDB -> MySQL)
```
npm install sequelize mysql2
npm install -D sequelize-cli
```
**sequelize 초기 구성**
```
npx sequelize init
```
**DB**
```
npx sequelize db:create
npx sequelize db:migrate
```
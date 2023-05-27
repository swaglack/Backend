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
[image.png](https://user-images.githubusercontent.com/58283954/241258633-2b463d87-3b68-4993-b3a4-b736f40ae3ae.png)

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
npm install express jsonwebtoken dotenv mongoose cors
npm install -D nodemon
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

# 에러 핸들러 클래스로 만들어서 하면 좋음


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
```

# 매니저님 질문 리스트 및 숙제리스트
1. workspace 스키마와 channel 스키마를 통합하는 것과 나누는 것에 대한 장단점 및 매니저님 의견 물어보기
2. 에러처리 미들웨어 및 에러 핸들러 공부해오기
3. API 구성 할때 URL PATH가 길어져서 req.param에 넣는게 좋은지 아니면 req.body에 넣는게 좋은지 물어보기


const express = require("express");
const authrouter  = require("./api/auth.js");
const postrouter = require("./api/posts.js");
const {sequelize} = require("./models/index.js");
const cors= require("cors");
require('dotenv').config();


sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const port = 3306;

//헤더를 이용한 방식
/*app.use((req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header('Access-Control-Allow-Credentials', 'true');
})*/

//미들웨어를 이용한 방식
app.use(cors({
  origin: 'http://localhost:3000/api/posts', // 출처 허용 옵션
  credential: 'true' // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
}));
app.get('/test1', (req, res) => {
  res.send('hello');
});

app.use(express.json());
app.use("/api/posts", postrouter);
app.use("/api/auth", authrouter);

app.listen(port, ()=>{
    console.log('Example app listening at http://localhost:${port}');
});
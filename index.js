
const express = require("express");
const authrouter  = require("./api/auth.js");
const postrouter = require("./api/posts.js");
const {sequelize} = require("./models/index.js");
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
const port = 3000;

app.use(express.json());
app.use("/api/posts", postrouter);
app.use("/api/auth", authrouter);

app.listen(port, ()=>{
    console.log('Example app listening at http://localhost:${port}');
});



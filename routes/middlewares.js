const jwt = require('jsonwebtoken');
const { User } = require('../models/index.js');
const bcrypt = require('bcrypt');

const verifyToken = (req, res, next) => {
  try {
    req.decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') { // 유효기간 초과
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다'
      });
    }
    return res.status(401).json({
      code: 401,
      message: '유효하지 않은 토큰입니다',
    });
  }
};


exports.login= async(req,res,verifyToken)=>{
    try{
        const {email,password} = req.body;
        if(email === null||password === null){     //로그인이 안되어있으면 오류 출력
            return res.status(404).json({
                error:{
                    message: "로그인을 먼저 해주세요",
                }
            })
        }
        const user = await User.findOne({ where: { userId: req.body.email } });     //이메일은 입력했지만 존재하지 않는 경우       
        if(!user){
            return res.status(404).json({error:{message: "User not exist" }});
        }
        const check = await bcrypt.compare(password, user.pw);                    //입력한 패스워드와 서버에 저장된 암호화된 pw 비교 
        if(check) {                                                                //일치하면 토큰 발급 
            const token = jwt.sign({
                email: req.body.email,
                writer: req.body.writer,
              }, process.env.JWT_SECRET, {
                expiresIn: '10m',
                issuer: 'JWT_study',
              });
              verifyToken();                                                    //토큰 검증으로 이동
        }else { 
             return res.status(404).json({
                error:{
                    message: "유효하지않은 회원",
                },
            });
        } 
    }catch(err){
        console.error(err);
        next(err);
    }             
}

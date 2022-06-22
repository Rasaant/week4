
const express = require("express");
const { User } = require("../models/index.js");
const authrouter = express.Router();
const bcrypt = require("bcrypt");
require("dotenv").config();



authrouter.post('/sign-up', async(req, res,next) => {
  try{
    const saltRound = 10;
    const count = await User.findAll({
        raw:true,
        attributes:['id'],
    }); 
        const { email, password } = req.body
        if(!email && !password) {
            return res.json("정상적인 요청이 아닙니다.")
        }    
        if(await User.findOne({ where: { userId: email } })){
            return res.json("이미 존재하는 이메일입니다.") //ok
        }
        const salt =await bcrypt.genSalt(saltRound);
        const hashedPw =  await bcrypt.hash(password,salt);
        await User.create({                           
            userId: email,
            pw: hashedPw,
            data: "default",
        });
        const lastrow = await User.findAll({
         
        attributes:['userId','data','id'],
        where:{userId:email}});
        
        return res.json({
            data:lastrow[0].data,
            user:lastrow[0].userId,
            id:lastrow[0].id,
         });
         
}catch(err){
    console.error(err);
    next(err);
}
});

module.exports= authrouter;

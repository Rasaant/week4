
/*import express from "express";
import userData from "../src/userData.js";*/
const express = require("express");
const { User } = require("../models/index.js");
const userData =require("../src/userData.js");
const authrouter = express.Router();


authrouter.post("/login",async(req,res,next) =>{
    try{
        const useriden = await User.findAll({
            raw: true,
            attributes:['userId'],
        }); //DB에 있는 유저의 아이디들 
        const userpw =await User.findAll({
            raw: true,
            attributes:['pw'],
        });//DB에 있는 비밀번호들
        const userdata = await User.findAll({
            raw:true,
            attributes:['data'],
        })//DB에 있는 데이터들

        for(let i = 0; ; i++){   //반복문을 돌면서 검사를 시작한다.       
            if(useriden[i].userId===req.body.email){ //배열을 돌며 id 검사하고
                if(userpw[i].pw ===req.body.pw){ //id 가 맞으면 pw 검사한다.
                    return res.json({ //둘다 맞으면 출력한다.
                        data: userdata[i].data,
                        user: useriden[i].userId,
                        
                    });
                }
                else{return res.json({error:"pw incorrect"});} //pw가 틀렸다고 메세지
            }
            else{return res.json({error:"id incorrect"})} //    id가 틀렸다고 메세지.
            i++;
        }
    }catch(err){
            console.error(err);
            next(err);
        }
        });

authrouter.post("/register",async(req,res,next)=>{
try{
    const useriden = await User.findAll({//DB에 있는 유저의 아이디들 
        raw: true,
        attributes:['userId'],
    });                                         
    let checksum = false;                //중복 판별용 변수 
    const count = await User.findAll({
        raw:true,
        attributes:['id'],
    });                                 //id로 세는 행의 갯수
    
    for(let i =0;i<count.length ;i++){      //반복하며 id가 중복되는지 검사한다.

        if(useriden[i].userId === req.body.email){  //중복된다면 판별변수를 true로 바꾸고 탈출
            checksum = true;
            break;
        }
    }
 
    if(checksum === true){                      // 중복되므로 에러내보내고 종료
        return res.json({error: "User already exist."});

    }else{

    User.create({                           //생성
        userId: req.body.email,
        pw: req.body.pw,
        data: "default",
    });

    const lastrow = await User.findOne({where:{id:count.length}}); //마지막으로 추가한 행 불러오는 변수
    
    
   return res.json({
       data:lastrow.data,
       user:lastrow.userId,
       id:lastrow.id,
    });
    }
}catch(err){
    console.error(err);
    next(err);
}
});  
        module.exports= authrouter;



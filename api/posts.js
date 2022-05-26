/*import express from "express";
import writes from "../src/writes.js";*/
const express =require("express");
const writes= require("../src/writes");
const postrouter = express.Router();
const { write } = require("../models/index.js");
const e = require("express");
const { update } = require("../models/User");

postrouter.get("/",async(req,res,next)=>{
    const isContent =await write.findAll({ //컨텐츠들이 있으면
        raw: true,
        attributes:['id','content','writer'],
    });
    if(isContent ===null){
        return res.json({
            "data":[]
        })
    }
   return res.send(isContent);

});
postrouter.get("/:postId",async (req,res,next)=>{
    try{
        const parameter = parseInt(req.params.postId);
    const findContent =await write.findAll({ 
        where:{id:parameter}
    });
    
    if(findContent.length ===0 ){
       return res.json({
            error:"Post not exist.",
        });
    }

    return res.send(findContent);
    }catch(err){
        console.error(err);
        next(err);
    }
});


postrouter.post("/", async(req,res,next)=>{
    try{
         const login = parseInt(req.header('X-User-Id'));
         const count = await write.findAll({
            raw:true,
            attributes:['id'],
        });  
        if(login ===1 ){
            write.create({
                content: req.body.content,
                writer: "default",
            });
        }else{
            res.json({
                error:"cannot login",
            });
        }
        const findContent =await write.findAll({ 
        where:{id:count.length}
        });
        res.send(findContent[count.length]);

    }catch(err){
        console.error(err);;
        next(err);
    }
})
postrouter.post("/:postId",async(req,res,next)=>{
    try{
        const login = parseInt(req.header('X-User-Id')); 
    if(login ===1 ){
        const findmyContent =await write.findAll({ //컨텐츠들이 있으면
            raw:true,
            where:{id:login}
            });
        console.log(findmyContent);
        write.update({
            content: req.body.content,
        },{
            where:{id:login},
        });
    }else{
        res.json({
            error:"cannot login"
        })
    }
    const updatedrow = await write.findOne({
        raw:true,
        where:{id:login}});
    return res.json({
        data:updatedrow.content,
        id:updatedrow.id,
    })
    }catch(err){
        console.error(err);
        next(err);
    }
})
postrouter.delete("/:postId",async(req,res,next)=>{
    try{
        const login = parseInt(req.header('X-User-Id')); 

        if(login ===1 ){
            const findmyContent =await write.findAll({ //컨텐츠들이 있으면
                raw:true,
                where:{id:login}
                });
                write.destroy({
                    where:{id:login},
                });
                res.json({
                    data: "successfully deleted"
                })
        }else{
            return res.json({
                err:"cannot delete post",
            })
        }
    }catch(err){
        console.error(err);
        next(err);
    }
})

postrouter.get("/",(req,res)=>{
    if(writes.findIndex(x=> x.id === '1')){//글이 한 개라도 있을 경우
        return res.send(writes);
    }
    else{
        return res.send("couldn't find data."); // 글이 한 개도 없을 경우
    };
    
});
postrouter.get("/:postId",(req,res)=>{
    const index = writes.findIndex(writes =>writes.id ===parseInt(req.params.postId));
        return res.json({
            error: "That data doesn't exist",
        });
    
    res.json(writes.filter(writes=>writes.id === parseInt(req.params.postId))[0]);
    });
//get


postrouter.post("/",(req,res)=>{
    if(req.get('X-User-Id')=== '1'){ //get함수로 header params를 받아 로그인 구별
        console.log("로그인완료");    
    const add = ({
        content: req.body.content,
        id: writes[writes.length-1],
        });  
    writes.push(add); //배열 뒷부분에 추가
    
    writes[writes.length -1 ].id = writes.length; //id 추가
    
    res.json({
        post: writes[writes.length-1].content,
        id: writes[writes.length-1].id,
    });
    }
    else{
        res.json({
            error: "cannot login",
        });
    }
})

//post
postrouter.put("/:postId",(req,res)=>{
    const parameter = parseInt(req.params.postId);
    const index = writes.findIndex(writes=> writes.id === parameter);
    
    const post = req.header("x-user-id")
    console.log(parameter);

    if(post === '1'){
    if( index === -1){
        return res.json({
            error: "Cannot modify post",
        });
    }
    writes[index] = {    
        id: writes[index].id,
        content: req.body.content,
        writer: writes[index].writer,
    };
    res.json({
        id: writes[index].id,
        content: writes[index].content,
        writer: writes[index].writer,
    })
    
}else{
    res.json({
        error: "cannot login",
    })
}
});
//put
postrouter.delete(":postId",(req,res)=>{
    const parameter = parseInt(req.params.postId)
    if(req.get('X-User-Id')== '1'){
    
    writes.splice(writes.findIndex(write=>write.id === parameter),1);
    res.json(writes);
    
    }else{
        res.json({
            error:"cannot delete post ",
        });
    }
})
module.exports= postrouter;
//delete*/
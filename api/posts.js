/* jshint esversion: 6 */
const express =require("express");
const postrouter = express.Router();
const { Write } = require("../models/index.js");
const { login } = require("../routes/middlewares.js");

postrouter.get("/",async(req,res,next)=>{
    
    const isContent =await Write.findAll({ //컨텐츠들이 있으면
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
    const findContent =await Write.findOne({where:{id:parameter}});
    console.log(findContent);
    if(!findContent ===0 ){
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


postrouter.post("/",login, async(req,res,next)=>{
    try{
       let {content, writer} = req.body;
        await Write.create({
            content: content,
            writer: writer,
        });
        const lastrow = await Write.findAll({
            attributes:['writer','content','id'],
            where:{content: content}
        });

            return res.json({
                writer:lastrow[0].writer,
                content:lastrow[0].content,
                id:lastrow[0].id,
             });
    }catch(err){
        console.error(err);;
        next(err);
    }
})

postrouter.post("/:postId",login,async(req,res,next)=>{ //글 수정 
    try{
        const {writer, content} = req.body
        let findmyContent =await Write.findAll({
            where:{writer:req.body.writer}
            });
       console.log(findmyContent[0]);
       console.log(findmyContent !== null);
        if(findmyContent !== undefined){
           await Write.update({
                content: req.body.content,
            },{
                where:{writer:writer},
            })
        }
      
    findmyContent =await Write.findAll({where:{writer:req.body.writer}});

    return res.json({
        content:findmyContent[0].content,
        id:findmyContent[0].id,
    })
    }catch(err){
        console.error(err);
        next(err);
    }
})
postrouter.delete("/:postId",login ,async(req,res,next)=>{
    try{
        const {writer, content} = req.body;
        let findmyContent =await Write.findAll({
            where:{writer:req.body.writer}
            });
                Write.destroy({
                    where:{writer:req.body.writer},
                });
                res.json({
                    data: "successfully deleted"
                })
    }catch(err){
        console.error(err);
        next(err);
    }
})



module.exports= postrouter;

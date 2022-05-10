import express from "express";
import { Router } from "express";

const router = Router();

let writes =[
    { //writes[0]
        id: 1,
        content: 'Avengers',
        writer: 'john',
    },
    {//writes[1]
        id: 2,
        content: 'Spider-man',
        writer: 'jane',
    },
    {//writes[2]
        id: 3,
        content: 'Harry Potter',
        writer: 'julian',
    },
];

router.get("/",(req,res,next)=>{
    if(writes.findIndex(x=> x.id === '1')){//글이 한 개라도 있을 경우
        res.send(writes);

    }
    else{
        res.send("couldn't find data.") // 글이 한 개도 없을 경우
    };
    
})

router.get("/writes", (req,res)=>{
    const index = writes.findIndex(writes =>writes.id ===req.body.id);
    if( index === -1){
        return res.json({
            error: "That data doesn't exist",
        });
    }
    res.json(writes.filter(writes=>writes.id === req.body.id)[0]);
})

router.post("/writes",(req,res)=>{
    
    const json = {
        "data" : req.body.content,
        "id": req.body.id
    };
       
    writes.push(json);
    for(let i=writes.length-1;i>=writes.length-2;i--)
        res.send(writes[i]);
})

router.put("/writes",(req,res)=>{
    
    const index = writes.findIndex(writes=> writes.id === req.body.userId);
    if( index === -1){
        return res.json({
            error: "Cannot modify post",
        });
    }
    writes[index] = {
        id: req.body.postId,
        content: req.body.content,
    };
    res.json(writes);
});

router.delete("/writes",(req,res)=>{
    writes.splice(writes.findIndex(write=>write.id === req.body.userId),1);
    res.json(writes);
    
})
export default router;
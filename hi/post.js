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
let userData = [
    {
        id: 1,
        pw:"pa$$w0rd",
        data:"누군지 모릅니다.",
        user:"rkdgusdnr32@naver.com",
        
        
        
    },
    {
        id:2,
        pw:"ugly",
        data:"못생긴 사람.",
        user:"user1@naver.com",

        
    },
    {
        id:3,
        pw:"handsome",
        data:"잘생긴 사람",
        user:"user2@naver.com",
        
    }
]
router.get("/api/posts",(req,res)=>{
    if(writes.findIndex(x=> x.id === '1')){//글이 한 개라도 있을 경우
        res.send(writes);
    }
    else{
        res.send("couldn't find data.") // 글이 한 개도 없을 경우
    };
    
});
router.get("/api/posts/:postId",(req,res)=>{
    const index = writes.findIndex(writes =>writes.id ===req.body.id);
    if( index === -1){
        return res.json({
            error: "That data doesn't exist",
        });
    }
    res.json(writes.filter(writes=>writes.id === req.body.id)[0]);
})
//get


router.post("/api/posts",(req,res)=>{
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

router.post("/api/auth/login",(req,res) =>{
/*요청 데이터 예시
"email" : rkdgusdnr32@naver.com,
"password": "pa$$w0rd"  
*/
const index = (userData.findIndex(userData=>userData.user === req.body.email)) ;
if(index>=0){
    if(userData[index].pw === req.body.password){
        res.json({
            data: userData[index].data,
            user: userData[index].user,
            id: userData[index].id,
        });      
    }
    else{
        res.json({
            error: "wrong pw"
        });
    }
}
else{
    res.json({
    error: "wrong ID"
    });
}
});

router.post("/api/auth/register", (req,res) =>{
    const index = (userData.findIndex(userData=>userData.user === req.body.email)) ;
    console.log(index);
if(index>=0){
    res.json({
        "error": "User already exist"
    })
}
else{
    const idpop = userData.pop().id +1;
    const newmember =({
        user: req.body.email,
        pw: req.body.password,
        id: idpop,
    });
    userData.push(newmember);
    res.json({
        data: userData[(userData.length) - 1].data,
        user: userData[(userData.length) - 1].user,
        id: userData[(userData.length) - 1].id,
    });   
}
});

//post
router.put("/api/posts/:postId",(req,res)=>{
    
    const index = writes.findIndex(writes=> writes.id === parseInt(req.get('X-User-Id')));
    console.log(index);
    if(req.get('X-User-Id') === '1'){
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
router.delete("/api/posts/:postId",(req,res)=>{
    if(req.get('X-User-Id')== '1'){
    
    writes.splice(writes.findIndex(write=>write.id === parseInt(req.get('X-User-Id'))),1);
    res.json(writes);
    
    }else{
        res.json({
            error:"cannot delete post ",
        });
    }
})
//delete
export default router;
import { Router } from 'express';
import { sign } from 'jsonwebtoken';
import { verifyToken } from './middlewares';

const router = Router();

var nextId = 3;
var user = [
  {
    "id": 1,
    "email": "jwt@email.com",
    "password": "1234",
  },
  {
    "id": 2,
    "email": "node@email.com",
    "password": "1234",
  }
]

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if(user.find(users => users.email === email) && user.find(users => users.password === password)){
    const token = sign({
      id: req.body.id,
      name: req.body.name,
    }, process.env.JWT_SECRET, {
      expiresIn: '10m',
      issuer: 'JWT_study',
    });
    // console.log(req.body);
    return res.json({
      code: 200,
      message: '토큰이 발급되었습니다',
      token,
    });
  }
  res.json({
    code: 400,
    message: '이메일또는 비밀번호가 일치하지않습니다.'
  });
});

router.post('/sign-up', (req, res) => {
  const { email, password } = req.body
  if(!email && !password) {
    return res.json("정상적인 요청이 아닙니다.")
  }
  if(user.find(users => { users.email === email })){
    return res.json("이미 존재하는 이메일입니다.")
  }
  
  user.Create({
    id: nextId++,
    email: req.body.email,
    password: req.body.password,
  });
  return res.json(user);
})

router.get('/test', verifyToken, (req, res) => {
  res.json(user);
})

export default router;
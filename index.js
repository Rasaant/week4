import express from "express";
import hi from "./hi/index.js";


const app = express();
const port = 3000;

app.use(express.json());
app.use("/", hi);


app.listen(port, ()=>{
    console.log('Example app listening at http://localhost:${port}');
});

import { Router } from "express";
import post from "./post.js";


const router = Router();

router.use("/", post);

export default router;
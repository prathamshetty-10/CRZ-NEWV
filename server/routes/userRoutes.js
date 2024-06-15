import express from "express";
import {login,otp} from "../controllers/userControllers.js";
//import { isLoggedIn}  from "../middleware/auth.middleware.js";
//import {upload } from "../middleware/multer.middleware.js"
const router=express.Router();


router.post('/getotp',otp);
router.post('/login',login);


export default router;
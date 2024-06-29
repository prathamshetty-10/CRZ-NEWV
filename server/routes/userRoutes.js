import express from "express";
import {login,otp,logout} from "../controllers/userControllers.js";

//import {upload } from "../middleware/multer.middleware.js"
import { isLoggedIn } from "../middleware/auth.middleware.js";
const router=express.Router();


router.post('/getotp',otp);
router.post('/login',login);
router.get('/logout',logout);


export default router;
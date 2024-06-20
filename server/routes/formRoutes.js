import express from "express";

import {uploadform1,uploadchalan,uploadRTC,uploadSS,submitform} from "../controllers/formControllers.js";
import {upload } from "../middleware/multer.middleware.js"

const router=express.Router();

router.post('/upload/form1',upload.single('form1'),uploadform1);
router.post('/upload/rtc',upload.single('rtc'),uploadRTC);
router.post('/upload/ss',upload.single('ss'),uploadSS);
router.post('/upload/chalan',upload.single('chalan'),uploadchalan);
router.post('/submit',submitform);



export default router;
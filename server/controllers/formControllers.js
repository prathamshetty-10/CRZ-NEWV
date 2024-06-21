
import cloudinary from 'cloudinary'
import fs from 'fs/promises'
import { config } from '../config/dbconfig.js';
import sql from 'mssql'

import AppError from "../utils/error.util.js";
const uploadform1=async(req,res,next)=>{
    try{
        const {ph_no}=req.body;
        if(req.file){
                let pubid='';
                let secureurl='';
                const options = {
                    folder:`${ph_no}`,
                    use_filename: true,
                    unique_filename: false,
                    overwrite: true,
                  };
                
                const result=await cloudinary.v2.uploader.upload(req.file.path,options);
                if(result){
                    pubid=result.public_id;
                    secureurl=result.secure_url;
                    req.pi1=pubid;
                    req.su1=secureurl;
                    fs.rm(`uploads/${req.file.filename}`);
                    console.log('uploaded first form');
                    next();

                }
                else{
                    res.status(500).json({
                        success:false,
                        message:"No cloudinary result"
                    })
                }
    
            }
        else{
            res.status(500).json({
                success:false,
                message:"no file uploaded"
            })


        }
    }
    catch(error){
        return next(new AppError(error,400));
    }

};
const uploadRTC=async(req,res,next)=>{
    try{
        const {ph_no}=req.body;
        if(req.file){
                let pubid='';
                let secureurl='';
                const options = {
                    folder:`${ph_no}`,
                    use_filename: true,
                    unique_filename: false,
                    overwrite: false,
                  };
                const result=await cloudinary.v2.uploader.upload(req.file.path,options);
                if(result){
                    pubid=result.public_id;
                    secureurl=result.secure_url;
                    req.pi2=pubid;
                    req.su2=secureurl;
                    fs.rm(`uploads/${req.file.filename}`);
                    console.log('uploaded rtc');
                    next();
                }
                else{
                    res.status(500).json({
                        success:false,
                        message:"No cloudinary result"
                    })
                }
    
            }
        else{
            res.status(500).json({
                success:false,
                message:"no file uploaded"
            })


        }
    }
    catch(error){
        return next(new AppError(error,400));
    }

};
const uploadSS=async(req,res,next)=>{
    try{
        const {ph_no}=req.body;
        if(req.file){
                let pubid='';
                let secureurl='';
                const options = {
                    folder:`${ph_no}`,
                    use_filename: true,
                    unique_filename: false,
                    overwrite: false,
                  };
                const result=await cloudinary.v2.uploader.upload(req.file.path,options);
                if(result){
                    pubid=result.public_id;
                    secureurl=result.secure_url;
                    req.pi3=pubid;
                    req.su3=secureurl;
                    fs.rm(`uploads/${req.file.filename}`);
                    console.log('uploaded ss');
                    next();
                }
                else{
                    res.status(500).json({
                        success:false,
                        message:"No cloudinary result"
                    })
                }
    
            }
        else{
            res.status(500).json({
                success:false,
                message:"no file uploaded"
            })


        }
    }
    catch(error){
        return next(new AppError(error,400));
    }

};
const uploadchalan=async(req,res,next)=>{
    try{
        const {ph_no}=req.body;
        if(req.file){
                let pubid='';
                let secureurl='';
                const options = {
                    folder:`${ph_no}`,
                    use_filename: true,
                    unique_filename: false,
                    overwrite: false,
                  };
                const result=await cloudinary.v2.uploader.upload(req.file.path,options);
                if(result){
                    pubid=result.public_id;
                    secureurl=result.secure_url;
                    req.pi4=pubid;
                    req.su4=secureurl;
                    fs.rm(`uploads/${req.file.filename}`);
                    next();
                }
                else{
                    res.status(500).json({
                        success:false,
                        message:"No cloudinary result"
                    })
                }
    
            }
        else{
            res.status(500).json({
                success:false,
                message:"no file uploaded"
            })


        }
    }
    catch(error){
        return next(new AppError(error,400));
    }

};
const submitform=async(req,res,next)=>{
    try{

        const {name,email,addr,sur_num,taluk,village,form_type,ph_no}=req.body;
        const pi1=req.pi1;
        const pi2=req.pi2;
        const pi3=req.pi3;
        const pi4=req.pi4;
        const su1=req.su1;
        const su2=req.su2;
        const su3=req.su3;
        const su4=req.su4;

        const pool=await sql.connect(config);
        const form_id=new Date().toLocaleString();;
        
        const data=pool.request().query(`insert into form_tb values('${ph_no}','${name}','${addr}','${sur_num}','${taluk}','${village}','${form_type}','${pi1}','${su1}','${pi2}','${su2}','${pi3}','${su3}','${pi4}','${su4}','${email}','${form_id}')`);
        data.then(async(res1)=>{
            if(res1){
                
                res.status(200).json({
                    success:true,
                    message:"user form submitted successfully"
                })
            }
            else{
                

                res.status(500).json({
                    success:false,
                    message:"OTP wrong please re send otp"
                })
            };
         }
         )


        
    }
    catch(error){
        return next(new AppError(error,400));
    }

};

export {uploadform1,uploadRTC,uploadSS,uploadchalan,submitform};
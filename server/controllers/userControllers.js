import twilio from 'twilio'
import { config } from '../config/dbconfig.js';
import sql from 'mssql'
import JWT from "jsonwebtoken"
import AppError from "../utils/error.util.js";

const cookieoptions={
    httpOnly: true,
    secure:false,
    sameSite: "strict",
    expires: new Date(Date.now() + 7200000),
  }
function generateJWTToken(phone,role,name){
    return JWT.sign({
        name:name,
        ph_no:phone,
        user_role:role,
    },
    process.env.JWT_SECRET,//secret ke
    {expiresIn:process.env.JWT_EXPIRY}//for security dont keep permanent tokens
    )
}
const login=async(req,res,next)=>{
    try{
        const {ph_no,otp,name}=req.body;
        const pool=await sql.connect(config);
        const data=pool.request().query(`select * from user_tb where ph_no='${ph_no}'`);
        data.then(async(res1)=>{
            if(res1.recordset[0].otp==otp){
                const token=generateJWTToken(ph_no,res1.recordset[0].role,name);
                res.cookie('token',token,cookieoptions);

                const pool1=await sql.connect(config);
                const data1=pool.request().query(`delete from user_tb where ph_no='${ph_no}'`)
                data1.then(res1=>{
                    console.log('deleted entry as login complete');
                })
                res.status(200).json({
                    success:true,
                    message:"user logged in successfully"
                })
            }
            else{
                const pool1=await sql.connect(config);
                const data1=pool.request().query(`delete from user_tb where ph_no='${ph_no}'`)
                data1.then(res1=>{
                    console.log('deleted entry as otp wrong');
                })

                res.status(500).json({
                    success:false,
                    message:"OTP wrong please re send otp"
                })
            };
         }
         )

    
    }
    catch(error){
        //return next(new AppError(error.message,500));
        console.log('error');
    }

};
const otp=async(req,res,next)=>{
    try{
        const {ph_no,name}=req.body;
        let role;
        if(ph_no==process.env.PHNO_ADMIN) role="ADMIN";
        else role="USER"
        const ot=`${Math.floor(1000+Math.random()*9000)}`;
        //inserting into user_tb 
        const pool=await sql.connect(config);
        const data=pool.request().query(`insert into user_tb values('${name}','${ph_no}','${ot}','${role}')`);
        data.then(res1=>{
            console.log('inserted entry ! ');
         }
         )
         //creating the otp and sent to phone
        const client=new twilio(process.env.TWILIO_SID,process.env.TWILIO_AUTH_TOKEN);
        client.messages.create({body:ot,from:'+17856997678',to:`${ph_no}`})
        
        .then(message=>console.log('sent'))
        .catch(err=>console.log(err));
        res.status(200).json({
        success:true,
        message:"user logged in successfully"
        
    })}
    catch(error){
       //33333333333333333333
        console.log(error);
    }

};
const logout=(req,res,next)=>{
    try{
        const cookieOptions={
            expires:new Date(),
            secure:false,
            maxAge:0,
            httpOnly:true
        };
        res.cookie("token",null,cookieOptions);
        res.status(200).json({
            success:true,
            message:"logged out sucessfully"
            
        })

    }
    catch(error){
        return next(new AppError(error,400));
    }

};
export {login,otp,logout};
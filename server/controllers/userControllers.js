import twilio from 'twilio'
import { config } from '../config/dbconfig.js';
import sql from 'mssql'
import JWT from "jsonwebtoken"
const cookieoptions={
    httpOnly: true,
    secure:false,
    sameSite: "strict",
    expires: new Date(Date.now() + 7200000),
  }
function generateJWTToken(phone,role){
    return JWT.sign({
        ph_no:phone,
        user_role:role,
    },
    process.env.JWT_SECRET,//secret key
    {expiresIn:process.env.JWT_EXPIRY}//for security dont keep permanent tokens
    )
}
const login=async(req,res,next)=>{
    try{
        const {ph_no,otp}=req.body;
        const pool=await sql.connect(config);
        const data=pool.request().query(`select * from user_tb where ph_no='${ph_no}'`);
        data.then(async(res1)=>{
            if(res1.recordset[0].otp==otp){
                const token=generateJWTToken(ph_no,'USER');
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
        const {ph_no}=req.body;
        const ot=`${Math.floor(1000+Math.random()*9000)}`;
        //inserting entry into user_tb table
        const pool=await sql.connect(config);
        const data=pool.request().query(`insert into user_tb values('${ph_no}','${ot}')`);
        data.then(res1=>{
            console.log('inserted entry !! ');
         }
         )
         //creating the otp message and sent to phone
        const client=new twilio(process.env.TWILIO_SID,process.env.TWILIO_AUTH_TOKEN);
        client.messages.create({body:ot,from:'+17856997678',to:ph_no})
        
        .then(message=>console.log('sent'))
        .catch(err=>console.log(err));
        res.status(200).json({
        success:true,
        message:"user logged in successfully"
        
    })}
    catch(error){
        //return next(new AppError(error.message,500));
        console.log(error);
    }

};
export {login,otp};
import config from 'dotenv'
config.config();
import express from 'express';
const app=express();
import cors from 'cors'



import cookieParser from 'cookie-parser';
import morgan from 'morgan';

app.use(express.json());//allowing json data to be sent
app.use(express.urlencoded({extended:true}))
//app.use(cors({
   // origin:['*'],//allowed localhost:3000 client the access
  // credentials:true
//}))


app.use(cookieParser());
app.use(morgan('dev'))




app.all('*',(req,res)=>{
    res.status(404).send('OOPS!!! 404 page not found');

})


export default app;
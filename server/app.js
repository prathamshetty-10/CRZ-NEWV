import config from 'dotenv'
config.config();
import express from 'express';
const app=express();
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import formRoutes from './routes/formRoutes.js'


import cookieParser from 'cookie-parser';
import morgan from 'morgan';

app.use(express.json());//allowing json data to be sent
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors({
    origin:['*'],
  credentials:true
}));

app.use(cookieParser());
app.use(morgan('dev'))



app.use('/api/user',userRoutes);
app.use('/api/form',formRoutes);
app.all('*',(req,res)=>{
    res.status(404).send('OOPS!!! 404 page not found at all');

})


export default app;
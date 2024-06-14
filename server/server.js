import app from './app.js';
import {connecttodb} from './config/dbconfig.js';

const port=process.env.PORT || 6002;

app.listen(port,async()=>{
    await connecttodb();
    console.log("server is running on port",port);
});
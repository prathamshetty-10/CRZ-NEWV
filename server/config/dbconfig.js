
import sql from 'mssql'

const config={
    user:"crz",
    password:"12345678",
    server:"LAPTOP-9VV2ENKI",
    database:"testdb",
    options:{
        trustServerCertificate:true,
        trustedConnection:false,
        enableArithAbort:true,
        instancename:"SQLEXPRESS"
    },
    port:1433

}

const connecttodb=async()=>{
    try{
        
         const pool=await sql.connect(config);
         
         const data=pool.request().query('select * from name');
         data.then(res1=>{
            console.log('connected to database');
         }
         )
         //pool.request().query('create table newtb(id2 int)');
         //pool.request().query('insert into newtb values(1)');
         }
   
    
    catch(error){
        console.log(error);
    }
    
};
export { connecttodb,config};
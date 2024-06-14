
import sql from 'msnodesqlv8'
const connectionString="server=LAPTOP-9VV2ENKI\SQLEXPRESS;Database=trialdb;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

const connecttodb=async()=>{
    try{
    sql.query(connectionString,"",(err,rows)=>{
        console.log(rows);
    })
    //console.log('connected to database');
    }
    catch(error){
        console.log(error);
    }
    
};
export { connecttodb,sql};
import AppError from "../utils/error.util.js";
import JWT from "jsonwebtoken"
const isLoggedIn=(req,res,next)=>{
    try{
    const token=req.cookies["token"];
    
    if(!token){
        return next(new AppError("unauthenticated,please login again",401));

    }
    
    const userDetails= JWT.verify(token,process.env.JWT_SECRET);
    
    req.user=userDetails;
    }
    catch(error){
        return next(new AppError(error.message,400));
    }
    next();
}
const authorizedRoles=(...roles)=>async(req,res,next)=>{
    const currentUserRoles=req.user.user_role;
    if(!roles.includes(currentUserRoles)){
        return next(new AppError("no permission to access this route",408));
    }
    next();
}
export {isLoggedIn,authorizedRoles}
import { CustomErrorHandler } from "../.."
import { APP_DEBUG } from "../../../config"

 
const errorHandler = (err,req,res,next)=>{
    let statusCode=500
    let data={
        status:statusCode,
        message:"Internal Server Error",
        ...(APP_DEBUG=='true' && {originError:err.message})
    }
    if(err instanceof CustomErrorHandler){
        data={
            status:err.status,
            message:err.message
        }
    }

    return  res.json({error:{data}})
    
}


export default errorHandler
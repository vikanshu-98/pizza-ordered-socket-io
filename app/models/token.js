import mongoose from 'mongoose'
const Schema = mongoose.Schema

const tokenSchema= new Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'Users',
        required:true,
    },
    token:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now(),
    },
    expiresIn:{
        type:Date,
        required:true,
    }
}) 

export default mongoose.model('Tokens',tokenSchema,'tokens')
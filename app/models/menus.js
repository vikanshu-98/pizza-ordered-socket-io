import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'
const productSchema= mongoose.Schema({
    name:{
        type:String,required:true
    },
    image:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    }

},{timestamps:true})

 

export default mongoose.model('Menus',productSchema,'menus')
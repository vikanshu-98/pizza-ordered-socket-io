import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'
const userSchema= mongoose.Schema({
    name:{
        type:String,required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is Invalid!!!')
            }
        }
    },
    password:{
        type:String,required:true
    },
    role:{
        type:String,
        default:"customer",
        enum:['customer','admin','superadmin']
    }

},{timestamps:true})

userSchema.pre('save',async function(){
    if(this.isModified('password')){
       this.password=await bcrypt.hash(this.password,10)

    }
})

export default mongoose.model('Users',userSchema,'users')
import mongoose from "mongoose"; 
const orderScheema= new mongoose.Schema({
    customerId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'Users'
    },
    address:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    orderStatus:{
        type:String,
        enum:['order_placed','order_confirmed','order_prepared','in_the_kitchen','begin_packed','out_for_delivery','delivered'],
        default:'order_placed'
    },
    payment:{
        type:String,
        default:"COD"
    },
    orders:{
        type:Object,
        required:true
    }

},{timestamps:true})

 

export default mongoose.model('Orders',orderScheema,'orders')
import Joi from 'joi'
import { CustomErrorHandler, Orders,Users } from '../../..'
import moment from 'moment'

const orderPlaceController={
    async orderPlace(req,res,next){
        try{
            const {address,number} =req.body
            const schema = Joi.object({
                address:Joi.string().required(),
                number:Joi.string().max(11).required()
            })
            const {error}=schema.validate(req.body)
            if(error){
                req.flash('error',error.message)
                req.flash('number',number)
                req.flash('address',address)
                return res.redirect('/cart')
            }
    
            console.log(req.user);
            const obj =await new Orders({
                customerId:req.user._id,
                address:address,
                phoneNumber:number,
                orders:req.session.cart.items
            })
            const success = await obj.save()
            if(success){
                const data         = await Orders.populate(success,{path:"customerId"})
                const eventEmitter = req.app.get('eventEmitter')
                eventEmitter.emit('newOrderAdded',data)
                delete req.session.cart
                req.flash("success", "Order placed successfully.")
                res.redirect('/customer/orders')

            }
        }
        catch(err){
            next(err)
        }
         
        
         
    },
    async getOrder(req,res,next){
        try{
            const data = await Orders.find({customerId:req.user._id}).sort({createdAt:1})
            res.render('customer/orders',{orderData:data})

        }catch(err){
            next(err)
        }
        
    },
    async singleOrder(req,res,next){
        try{
            const data = await Orders.findById(req.params.id) 
            console.log(data.orderStatus);
            if(req.user._id==data.customerId.toString())
                res.render('customer/single',{'order_Status':data.orderStatus,'order_date':data.createdAt,'order_id':data._id,'orders':data.orders,'complete_data':data})
            else 
                res.redirect('/')
        }catch(err){
            next(err)
        }
    }
}

export default orderPlaceController
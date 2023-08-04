import { OrderStatusService, OrderedStatusEnum, Orders } from "../../.."

const adminOrderPlaceController={
    async getOrders(req,res,next){
        try {
           const result1= await Orders.find({orderStatus:{$ne:'delivered'}}).sort({createAt:-1}).populate('customerId','-password -updatedAt -createdAt')
            if(req.headers.accept=='application/json'){
                return res.json(result1)
            }else{ 
                res.render('admin/orders',{orderData:result1})
            } 
        } catch (error) {
            next(error)
        }
    },
    async updateOrders(req,res,next){
        try {
            const {orderId,status}=req.body;
            const isUpdate = await Orders.findByIdAndUpdate(orderId,({orderStatus:OrderStatusService.getDbStatusName(status)}))
            if(isUpdate){
                let eventEmitter = req.app.get('eventEmitter')
                eventEmitter.emit('orderUpdated',{orderId:orderId,status:OrderStatusService.getDbStatusName(status)},(response)=>{
                    if(response==200){
                       req.flash('success',`order(${orderId }) status has been change from ${OrderStatusService.getStatusName(isUpdate.orderStatus)} to ${OrderStatusService.getStatusName(OrderStatusService.getDbStatusName(status))}`)
                       res.redirect('/admin/orders')
                    }
                    
                })
                                
            }
        } catch (error) {
            next(error) 
        }
    }
}

export default adminOrderPlaceController
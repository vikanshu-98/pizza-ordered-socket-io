import express from 'express'
import { adminOrderPlaceController, cartController, homeController, loginController, orderPlaceController, registerController } from '../app/http/controllers'
import { Auth } from '../app'
const router   = express.Router()
const customer = express.Router()
const admin    = express.Router()

router.get('/',homeController.homepage)
router.get('/register',registerController.index)
router.post('/register',registerController.register)
router.get('/login',loginController.loginForm)
router.post('/login',loginController.index)
router.get('/logout',loginController.logout)
router.post('/updateCart',homeController.updateCart)
router.get('/cart',cartController.index)


router.post('/checkout',orderPlaceController.orderPlace)

router.use('/customer',customer)
router.use('/admin',admin)

customer.get('/orders',Auth,orderPlaceController.getOrder) 

customer.get('/single/:id',Auth,orderPlaceController.singleOrder) 


//admin
admin.get('/orders',adminOrderPlaceController.getOrders)
admin.post('/orders',adminOrderPlaceController.updateOrders)
 
router.get('*',(req,res,next)=>{
    res.status(404).end('not found page')
})

export default router
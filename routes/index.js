import express from 'express'
import { cartController, homeController, loginController, orderPlaceController, registerController } from '../app/http/controllers'
import { Auth } from '../app'
const router = express.Router()
const customer = express.Router()

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

customer.get('/orders',Auth,orderPlaceController.getOrder) 

customer.get('/single/:id',Auth,orderPlaceController.singleOrder) 
 
router.get('*',(req,res,next)=>{
    res.status(404).end('not found page')
})

export default router
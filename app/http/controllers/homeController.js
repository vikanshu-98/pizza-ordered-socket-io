import { Products } from "../.."

const homeController={
    async homepage(req,res,next){
        const menus = await Products.find()
        res.render('homepage',{menus:menus})

    },
    updateCart(req,res){
        if(!req.session.cart){
            req.session.cart={
                items:{},
                totalQty:0,
                totalPrice:0
            }
        }
        let cart =req.session.cart
        console.log(req.body.price);
        if(!cart.items[req.body._id]){
            cart.items[req.body._id]={
                item:req.body,
                qty:1
            }
 
        }else{
            cart.items[req.body._id].qty=cart.items[req.body._id].qty+1
        }
        cart.totalQty+=1
        cart.totalPrice+=(Number) (req.body.price)
        console.log(cart);
        res.json({'totalQty':cart.totalQty})

    }
}

export default homeController
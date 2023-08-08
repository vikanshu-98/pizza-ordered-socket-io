import passport from "passport" 
import { SendEmailNotification, forgetPasswordSchema } from "../.."
 
const loginController={

    loginForm(req,res,next){
        if(req.path=='/login'){
            res.render('auth/login',{isForgetPassword:false})
        }else{ 
            res.render('auth/login',{isForgetPassword:true})
        } 
    },
    async index(req,res,next){
        try{
            const {email,password}  = req.body
            if(!email || !password){
                req.flash('error','*All Fields are required.')
                req.flash('email','email')
                res.redirect('/login')
            }
            passport.authenticate('local',(err,user,message)=>{
                if(err){
                    req.flash('error',message.message)
                    req.flash('email','email')
                    next(err)
                }
                if(!user){
                    req.flash('error',message.message)
                    req.flash('email','email')
                    res.redirect('/login')
                }

                req.logIn(user,(err)=>{
                    if(err){
                        req.flash("error",message.message)
                        req.flash('email','email')
                        return next(err)
                    }
                    return res.redirect('/')
                })
            })(req,res,next) 

        }catch(error){
            next(error) 
        }
    },
    async logout(req,res,next){
        req.logOut((err)=>{
            if(err){
                req.flash('error','something went wrong')
            }
            res.redirect('/')
        })
    },
    async forgetPassword(req,res,next){
        try {
            const {error} = forgetPasswordSchema.validate(req.body)
            if(error){
                req.flash('error',error.message)
                req.flash('email','email')
                res.redirect('/forget-password')   
            } 
           
            await SendEmailNotification.sendEmail('abcd@gmail.com','Reset Password',res.render('email/forgetpassword'));
        } catch (error) {
            next(error)
        }
    }
}


export default loginController
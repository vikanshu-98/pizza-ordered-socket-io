import passport from "passport" 
import crypto from 'crypto'
import bcrpt from 'bcrypt'
import { BcryptServices, SendEmailNotification, Tokens, Users, confirmNewPasswordValidation, forgetPasswordSchema } from "../.."
import { APP_URL, FORGOT_PASSWORD_LINK_EXPIRY_TIME } from "../../../config"
import moment from "moment"
 
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
                // console.log(message)
                if(err){
                    req.flash('error',message.message)
                    req.flash('email',email)
                    next(err)
                }
                if(!user){
                    console.log(message.message)
                    req.flash('error',message.message)
                    req.flash('email',email)
                    res.redirect('/login')
                }

                req.logIn(user,(err)=>{
                    if(err){
                        req.flash("error",message.message)
                        req.flash('email',email)
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
                const user = await Users.findOne(req.body)
                if(!user){
                    req.flash('error','Invalid Email.')
                    req.flash('email','email')
                    res.redirect('/forget-password') 
                }
                
                const resetToken = crypto.randomBytes(32).toString('hex')
                const hashData   = await BcryptServices.hashPassword(resetToken)
                await new Tokens({
                    userId:user._id,
                    token:hashData,
                    createdAt:Date.now(),
                    expiresIn:moment().add(FORGOT_PASSWORD_LINK_EXPIRY_TIME, 'minutes') 
                }).save()

                const resetLink  = `${APP_URL}/forget-password-link/?token=${resetToken}&id=${user._id}`
            console.log(resetLink);
                const html=`
                <div  style="background-color: #F8F8F8; max-width: 1000px;margin:0 auto;padding: 3rem 3rem;height: 100vh;">
                    <div style="padding: 2rem 5rem;border: 2px solid red; max-width: 75%;  margin: 0 auto;   box-shadow: 0px 7px 22px -3px black;">
                        <table style="line-height:22px">
                            <tr>
                                <td style="padding:0.5rem 0;">Hi vikanshu chauhan,</td>
                            </tr>
                            <tr>
                                <td style="padding:0.5rem 0;">You recently requested to reset the password for your account. Click the button below to proceed.</td>
                            </tr>
                            <tr>
                                <td style="padding:1.2rem 0;"><a href="${resetLink}" style="background-color:#FE5F1E !important;padding:0.5rem 1rem; color: white; display:inline;border-radius:20px;text-decoration:none">Reset Your Password</a></td>
                            </tr>
                            <tr>
                                <td  style="padding:0.5rem 0;">If you did not request a password reset, please ignore this email or reply to let us know. <br>
                                    This password reset link is only valid for the next 10 minutes.
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:0.5rem 0;">Thanks,<br><span style="color:#FE5F1E;">My Pizza Team</span> </td>
                            </tr> 
                        </table>
                    </div>  
                </div>`; 
                SendEmailNotification.sendEmail(req.body.email,'Reset Password',html).then(()=>{
                    req.flash('success','*A Email is sent to your registered Email id to reset the password.')
                    res.redirect('login')
                }).catch((err)=>{next(err)})

                 
            }catch (error) {
            next(error)
        }
    },

    async forgetPasswordLinkConfirm(req,res,next){
        try{
            const {token,id}=req.query;
            res.render('auth/confirmpassword',{userId:id,token})
        }
        catch(err){
            next(err)
        }
    },
    async resetPassword(req,res,next){
        try{
            const {token,userId,password,cPassword} = req.body 
            const url = `${APP_URL}/forget-password-link/?token=${token}&id=${userId}`;
            const {error} = confirmNewPasswordValidation.validate({password,cPassword});
            if(error){
                req.flash('error',error.message)
                req.flash('password',password)
                req.flash('cPassword',cPassword)
                res.redirect(url)   
            }
            const find =await Tokens.findOne({'userId':userId}).sort({_id:-1})
            if(!find){
                req.flash('error','Invalid or expired password reset token')
                res.redirect('login')  
            }

            if(await BcryptServices.compareHashedString(token,find.token)==false){
                req.flash('error','Invalid or expired password reset token!!')
                res.redirect('login')  
            } 

            if(moment().isSameOrBefore(moment(find.expiresIn))==false){
                console.log('moment tiem')
                // await find.deleteOne()
                req.flash('error','Invalid or expired password reset token!!')
                res.redirect('login')  
            } 
            
            const hashData   = await BcryptServices.hashPassword(password)
            await Users.findByIdAndUpdate(find.userId,{password:hashData})
            // await find.deleteOne()
            req.flash('success','Password Reset succesfully!')
            res.redirect('login') 

        }catch(error){
            next(error)
        }
         
    }
}


export default loginController
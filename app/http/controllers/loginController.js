import passport from "passport"
const loginController={

    loginForm(req,res,next){
        res.render('auth/login')
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
                    next(err)
                }
                if(!user){
                    req.flash('error',message.message)
                    res.redirect('/login')
                }

                req.logIn(user,(err)=>{
                    if(err){
                        req.flash("error",message.message)
                        return next(err)
                    }
                    return res.redirect('/')
                })
            })(req,res,next) 

        }catch(err){
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
    }
}


export default loginController
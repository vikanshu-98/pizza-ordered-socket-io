import { Users, registrationValidation } from "../.."
const registerController={
    index(req,res,next){
        res.render('auth/registration')
    },
    async register(req,res,next){
        try {
            const {name,email,password} =req.body
            if(!name ||!email || !password ){
                req.flash('error','*All Fields are required.')
                req.flash('name',name)
                req.flash('email',email)
                req.flash('password',password)
                res.redirect('/register')
            }
            const {error} = registrationValidation.validate(req.body)
            if(error){
                req.flash('error',error.message)
                req.flash('name',name)
                req.flash('email',email)
                req.flash('password',password)
                res.redirect('/register')
            }
            const isExist  = await Users.exists({email:email})
            if(isExist){
                req.flash('error','*This email is already taken.') 
                req.flash('name',name)
                req.flash('email',email)
                req.flash('password',password)
                res.redirect('/register')
            }

            const user=new Users({email,name,password})
           if(await user.save()){
                req.flash('success','*Your Registration is successfully completed.') 
                req.flash('name',name)
                res.redirect('/login')
           }

        } catch (error) {
            next(error)
        }
         
    }   
}

export default registerController
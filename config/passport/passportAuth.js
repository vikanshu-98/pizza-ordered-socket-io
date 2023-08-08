// import passport from 'passport'
import passportLocal from 'passport-local'
const PassportLocal = passportLocal.Strategy
import { Users } from '../../app'
import bcrypt from 'bcrypt'

const initializePassport=function(passport){
    const Strategy1 = new PassportLocal({usernameField:"email"},async function(email,password,done){
        const isExist = await Users.findOne({email:email})
        if(!isExist){
            return done(null,false,{message:"*Invalid Email or Password."})
        }
        const isSame=await bcrypt.compare(password,isExist.password);
        if(!isSame){
            return done(null,false,{message:"*Invalid Email or Password."})
        }
        return done(null,isExist,{message:"Login successfully"})
    })

    passport.use(Strategy1)
    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })
    passport.deserializeUser((id,done)=>{
        Users.findById(id,function(err,user){
            done(null,user)
        })
    })
}
export default initializePassport
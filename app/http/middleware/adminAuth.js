const adminAuth=(req,res,next)=>{
    if(req.isAuthenticated()){
        console.log(req.user)
    }else{
        res.redirect('/login')
    }
    next()
}

export default adminAuth
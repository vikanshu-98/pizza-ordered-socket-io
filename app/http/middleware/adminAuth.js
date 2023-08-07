const adminAuth=(req,res,next)=>{
    if(req.isAuthenticated()){
        console.log(req.user.role)
        if(req.user.role=='superadmin' || req.user.admin=='admin')
            next()
    }else{
        res.redirect('/login')
    }
}

export default adminAuth
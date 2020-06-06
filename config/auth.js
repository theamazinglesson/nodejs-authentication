module.exports = {
    isAuthenticated :  (req, res, next)=>{
        if(req.isAuthenticated()){
            return next();
        }else{
            res.redirect('/users/signin');
        }
    },
    isNotAuthenticated :  (req, res, next)=>{
        if(req.isAuthenticated()){
            return res.redirect('/');
        }else{
            next();
        }
    }
}
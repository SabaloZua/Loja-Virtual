module.exports={
    Autenticado:function(req,res,next){
        if(req.isAuthenticated()){
           return next(); 
        }else{

            req.flash("error_msg", "ERRO:Você deve estar autenticado!!")
            res.redirect('/');
        }
    }
}
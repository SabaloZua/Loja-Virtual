//add das ferramentas
const express=require('express')
const Router=express.Router();
const conecao=require('../Modules/db');
const Controller=require('../Controllers/Contorller-Login')

// Rota que busca a Pagina de Login
Router.get('/',Controller.BuscarPaginaLogin);
Router.post('/',Controller.Iniciar_Sessao);

Router.get('/TerminarSessao',(req,res)=>{
    req.logOut((err)=>{
       console.log(err)
    });
    req.flash('success_msg',"Sessão terminado com Sucesso.")
    res.redirect('/');
})
module.exports=Router
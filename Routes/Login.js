//add das ferramentas
const express=require('express')
const Router=express.Router();
const conecao=require('../Modules/db');
const Controller=require('../Controllers/Contorller-Login')

// Rota que busca a Pagina de Login
Router.get('/',Controller.BuscarPaginaLogin);
module.exports=Route
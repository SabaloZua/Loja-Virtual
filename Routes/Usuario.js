//add das ferramentas
const express=require('express')
const conecao=require('../Modules/db')
const Routes=express.Router();
const Contorller=require('../Controllers/Controller -Usuario')
   

//Rota que busca a Pagina de  Usuario
Routes.get('/',Contorller.Buscarusuario);

//Rota que faz o cadastro do usuario
Routes.post('/Cadastrar',Contorller.Cadastrar)


module.exports=Routes


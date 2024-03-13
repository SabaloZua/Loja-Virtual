

//add das ferramentas
const express=require('express')
const Router=express.Router();
const Controller=require('../Controllers/Controller-Produto')
const {Autenticado}=require('../helpers/Autenticado')

// Rota que busca pagina produto
Router.get('/', Autenticado,Controller.BuscarPaginaProduto);
//Rota que busca pagina Produto Detalhes
Router.get('/detalhes/:id/',Controller.BuscarPaginaDetalhes);

// // Rota cadastra o usuario na base de dados
Router.post('/Cadastrar',Controller.Cadastrar);


Router.post('/Buscar',Controller.PesquisarProdutos);


module.exports=Router;
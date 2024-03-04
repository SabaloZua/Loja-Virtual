// obetendo a coneção com a BD
const conecao=require('../Modules/db');
// fs biblioteca para trabalhar com aquirvos para mover apagar ou copiar aquivos de uma pasta
const fs=require('fs');
// path biblioteca para  trabalhar com concatenação de aquirvos 
const path=require("path");

//Controller que busca a Pagina de Produto
exports.BuscarPaginaProduto=(req,res)=>{
 //127.0.0.0:3000/Produtos
let sql='select * from tb_categoria'

conecao.query(sql,(erro,resultado)=>{
   res.render("Produto",{
      scrpit:[
         {linkscrpt:'funcProduto.js'}
      ],
      Categoria:resultado
   });
})

 
}

//Controller que busca a Pagina de Detalhes do Produto
exports.BuscarPaginaDetalhes=(req,res)=>{
     //127.0.0.0:3000/Produtos/deatlhes
     const id=req.params.id;
     let sql=`select * from tb_produto where N_id_Produto=${id}`
     conecao.query(sql,(erro,resultado)=>{
        res.render("Produto_detalhes",{Produto:resultado[0]});
     })

}

//Controller que insere o produto na bd
exports.Cadastrar=(req,res)=>{
   // obtendo os valores enviados no formulario
    const nomeProduto=req.body.nome;
    const valor=req.body.valor;
    const dsc=req.body.dsc;
   const imagem=req.files.imagem.name;
   //caminho da pasta onde será gravada as imgs ATT: path.join utlizada para concatenar caminhos ex:C:\\users\\Desktop\\LojaVirtual\\public\\imgs\\nome da imagem
   const caminhoImagem = path.join(__dirname, '..', 'public','imgs', req.files.imagem.name);
   
   const Categoria=req.body.Categoria
   console.log(caminhoImagem); 
    let sql=`insert into tb_produto (T_Nome_Produto,N_Preco,T_Descricao_Produto,T_Imagem,Id_usuario,N_ID_Categoria)
             values('${nomeProduto}',${valor},'${dsc}','${imagem}',1 ,${Categoria})`;
             conecao.query(sql,(erro,result)=>{
                if(!erro){
                  // função mv é utilizada para mover um arquivo para uma pasta segunda o caminho indicado
                  req.files.imagem.mv(caminhoImagem);
                  // função redirect redireciona para a Rota indicada
                  res.redirect('/');
                }else{
                   console.log('Produto erro ao cadastrar produto '+erro);
                }
 
             });
}
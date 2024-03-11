// obetendo a coneção com a BD
const conecao = require('../Modules/db');
// fs biblioteca para trabalhar com aquirvos para mover apagar ou copiar aquivos de uma pasta
const fs = require('fs');
// path biblioteca para  trabalhar com concatenação de aquirvos 
const path = require("path");

//Controller que busca a Pagina de Produto
exports.BuscarPaginaProduto = async (req, res) => {
   //127.0.0.0:3000/Produtos
   let sql = 'select * from tb_categoria'

   const [resultado] = await conecao.query(sql);

   res.render("Produto", {
      scrpit: [
         { linkscrpt: 'funcProduto.js' }
      ],
      style: [
         { Link: 'AddProd.css' }
      ],
      Categoria: resultado
   });



}

//Controller que busca a Pagina de Detalhes do Produto
exports.BuscarPaginaDetalhes = async (req, res) => {
   //127.0.0.0:3000/Produtos/deatlhes
   const id = req.params.id;

   let sql = `select * from tb_produto where N_id_Produto=${id}`;
   const [resultado] = await conecao.query(sql);
   let sql2=`select * from tb_produto where  N_ID_Categoria=${resultado[0].N_ID_Categoria} and N_id_Produto!=${id} order by rand() limit 3`;
   const [ProdCategoria]= await conecao.query(sql2);

   res.render("Produto_detalhes", {
      Produto: resultado[0], 
       ProdsCateg:ProdCategoria,
      style: [
         { Link: 'AddProd.css' }
      ]

   });



}

//Controller que insere o produto na bd
exports.Cadastrar = async (req, res) => {
   // obtendo os valores enviados no formulario
   const nomeProduto = req.body.nome;
   const valor = req.body.valor;
   const dsc = req.body.dsc;
   const imagem = req.files.imagem.name;
   //caminho da pasta onde será gravada as imgs ATT: path.join utlizada para concatenar caminhos ex:C:\\users\\Desktop\\LojaVirtual\\public\\imgs\\nome da imagem
   const caminhoImagem = path.join(__dirname, '..', 'public', 'imgs', req.files.imagem.name);

   const Categoria = req.body.Categoria
   console.log(caminhoImagem);
   let sql = `insert into tb_produto (T_Nome_Produto,N_Preco,T_Descricao_Produto,T_Imagem,Id_usuario,N_ID_Categoria)
             values('${nomeProduto}',${valor},'${dsc}','${imagem}',1 ,${Categoria})`;

   // Tentativa de execução de uma consulta SQL
   try {
      conecao.query(sql);
      // função mv é utilizada para mover um arquivo para uma pasta segunda o caminho indicado
      req.files.imagem.mv(caminhoImagem);
      // função redirect redireciona para a Rota indicada
      res.redirect('/');
   } // Captura e tratamento de erros
   catch (erro) {
      console.log('Produto erro ao cadastrar produto ' + erro);
   }


}

exports.PesquisarProdutos = async (req, res) => {
   let nomePord = req.body.NomeProduto;

   let sql = `select * from  tb_produto where T_Nome_Produto like'%${nomePord}%' `;

   try {
      const [resultado] = await conecao.query(sql)
      res.render('ProdutoPesq', {
         Produto: resultado,
         style: [
            { Link: "estliloCardProd.css" }
         ]
      });
   } catch (erro) {
      console.log('Erro ao:' + erro);
   }

};


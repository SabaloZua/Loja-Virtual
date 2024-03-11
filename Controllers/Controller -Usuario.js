// obetendo a coneção com a BD
const conecao = require("../Modules/db");
const { sendTestEmail } = require("../Modules/Email.js");
//Controller que busca a Pagina de Usuario
exports.Buscarusuario = async (req, res) => {
   let sql = 'select * from tb_fucao_comercial';
   try {
      const [resultado] = await conecao.query(sql);
      res.render('cadastroUsuario', { fucaoComercial: resultado })
   } catch (erro) {
      console.log(`erro ao ${erro}`);
   }
}


//Controller que inseri o usuario na BD
exports.Cadastrar = async (req, res) => {
   //obtendo os valores enviado no formulario
   const nomeUsuario = req.body.nomeusuario;
   const telefone = req.body.telefone;
   const email = req.body.email;
   const senha = req.body.senha;
   const morada = req.body.morada;
   const fucao = req.body.fucao;

   let dados_email={
      email_clinent:email,
      nome_Client:nomeUsuario
  };
   let sql = `insert into tb_usuario  (T_Nome,T_senha,T_email,N_id_fucao,T_morada,T_telefone)
             values ('${nomeUsuario}','${senha}','${email}',${fucao},'${morada}','${telefone}') `

   try {
     await conecao.query(sql);
      // função redirect redireciona para a Rota indicada
      res.redirect('/');
      sendTestEmail(dados_email);
   } catch (erro) {
      console.log(erro);
   }
}   
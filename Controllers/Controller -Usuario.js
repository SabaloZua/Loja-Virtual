// obetendo a coneção com a BD
const conecao = require("../Modules/db");

//Controller que busca a Pagina de Usuario
exports.Buscarusuario=(req,res)=>{ 
    let sql='select * from tb_fucao_comercial';
    conecao.query(sql,(error,resultado)=>{
          if(!error){

             res.render('cadastroUsuario',{fucaoComercial:resultado})
             console.log(resultado);
          }
    })

}
//Controller que inseri o usuario na BD
exports.Cadastrar=(req,res)=>{
   //obtendo os valores enviado no formulario
    const nomeUsuario=req.body.nomeusuario;
    const telefone=req.body.telefone;
    const email=req.body.email;
    const senha=req.body.senha;
    const morada=req.body.morada;
    const fucao=req.body.fucao;
  
    let sql=`insert into tb_usuario  (T_Nome,T_senha,T_email,N_id_fucao,T_morada,T_telefone)
             values ('${nomeUsuario}','${senha}','${email}',${fucao},'${morada}','${telefone}') `

             conecao.query(sql,(erro,resultado)=>{
                if(!erro){
                  // função redirect redireciona para a Rota indicada
                   res.redirect('/')
                }else{
                   console.log(erro);
                }
 
             })

}   
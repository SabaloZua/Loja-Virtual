// obetendo a coneção com a BD
const conecao = require("../Modules/db")

//Controller que busca a Pagina de Login

exports.BuscarPaginaLogin=(req,res)=>{
 // 127.0.0.0:3000/Login

   //ATT: o parametro style em um objecto que recebe um array de objectos do tipo link eles são usados para 
   // criar links css dinamicamente na pagina que é enviada nesse caso a PG Login EX:<link rel="stylesheet" href="/css/Login.css"> 
   // Em caso de duvida *Pesquisa sobre OBJECTOS LITEARAIS EM JS
   res.render('Login',{style:[
        {Link:"Login.css"}
     ]
  })
}
 const express=require('express');
 const app=express();
 const path=require("path");


 // Importando as rotas
const RotaUsuario=require('./Routes/Usuario');
const RotaProduto=require('./Routes/Produto');
const RotaLogin=require('./Routes/Login');
const RotaSobre=require('./Routes/sobre');
const session=require('express-session');
const flash =require('connect-flash');
const passport = require('passport');
const fileupload=require('express-fileupload')
require('./Modules/PassaportConfig')(passport);
app.use(fileupload());



const {engine}=require('express-handlebars');
const { error } = require('console');

// add de ferramentas do handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// add tecnologia

app.use('/bootstrap',express.static("./node_modules/bootstrap/dist"));
app.use('/bootstrap-i',express.static("./node_modules/bootstrap-icons/font"));
app.use('/css',express.static('./css'));
app.use('/scripts',express.static('./scripts'));
app.use('/imgs',express.static('./imgs'))





//  Pasta public 
//ATT: path.join utlizada para concatenar caminhos  ex:C:\\users\\Desktop\\LojaVirtual\\public
// __dirname busca o diretorio raiz da do app ou seja onde o app esta localizado
app.use(express.static(path.join(__dirname,"public")));


// Configurando o express(app) para trabalhar com JSON
app.use(express.json());
app.use(express.urlencoded({
   extended:false
}));


//Configurando a sessão

app.use(session({
    secret:'1234',
    resave:true,
    saveUninitialized:true
}));

// Configurar passart

app.use(passport.initialize());
app.use(passport.session());

//Configurnado Flahs

app.use(flash());

// Variveis GLOBAIS
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash("error");
    res.locals.user= req.user|| null;
    next();
    
});



//add routas
// const Usuario=require('./Routes/Usuario');


const conecao=require('./Modules/db');

//Rota principal
app.get('/', async(req,res)=>{
 let sql=`select * from tb_produto order by rand()`
//  const IdDoUsuario =req.session.passport.user;

 const [resultado]=await conecao.query(sql);
 
 res.render('home',{Produto:resultado,
    style:[
        {Link:"estliloCardProd.css"}
    ]
});


});


// Dizendendo ao express(app) para usar a Rota do Usuario
app.use('/Usuario',RotaUsuario);

// Dizedendo ao express(app) para usar a Rota do Produto
app.use('/Produto',RotaProduto);

//  Dizedendo ao express(app) para usar a Rota de Longin
app.use('/Login',RotaLogin);

app.use('/Sobre-nos',RotaSobre);


app.listen(3000,()=>console.log("servidor Ligado na porta 3000"));
const passport=require('passport');
const conecao = require('./db');
const LocalStrategy=require('passport-local').Strategy;



module.exports=(passport)=>{

    passport.use(new LocalStrategy(
     
        async function(username, password, done) {
       

            const [resultado]= await conecao.query(`select * from tb_usuario where T_Nome='${username}'`);
            if (resultado.length==  0) {
                return done(null, false, { message: 'Esta Conta não existe' });
            }
            if(resultado[0].T_senha!= password){
            return done(null,false,{message:"Senha Incorrecta Tente Novamente"})
           }
           return done(null,resultado[0]);
            
        }
        
        
     
        ));

        passport.serializeUser(function(user,done){
            done(null,user.Id_usuario);
        });

        passport.deserializeUser( async function(id,done){
            try{
                const erro='errro';
             const [resultado] = await conecao.query(`select * from tb_usuario where Id_usuario=${id} `)
    
             done(null,resultado[0]);
            }catch(erro){
                console.log(erro);
            }
        })



}
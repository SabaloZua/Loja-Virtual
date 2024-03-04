const mysql=require('mysql2');

const conecao=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'astro$17',
    database:"ecommerce"
 });


 

 module.exports=conecao;
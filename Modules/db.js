const mysql=require('mysql2/promise');
require('dotenv').config();
const conecao=mysql.createPool(
    {
    host:'localhost',
    user:'root',
    password:process.env.PassBD,
    database:process.env.DataBase
 }
 );

 
 module.exports=conecao;
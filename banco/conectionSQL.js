import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
    host:'localhost', // host da conexão
    user:'root', //Nome do seu usuario
    password:"",  //Senha ("" <- deixe assim, se não tiver) 
    database:"pizzariaSaborArte"
})

export default db 
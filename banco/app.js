import express from 'express'
import cors from 'cors'
import corzinhaNoConsole from 'node:util';
import db from './conectionSQL.js'
import AddTables from './addTables.js'
import { log } from 'node:console';

const app = express();
app.use(cors());
app.use(express.json());


(async function(){
    await AddTables()
}());


//Rotas Get's:

//Inicio:
app.get('/',(req,res)=>{    
    res.send(`<h1>EU SOU UM SERVIDOR </h1>
            <p>E ESTOU OPERANDO O SEU BANCO DE DADOS</p>`)
    res.end()
})


// Preço das pizzas:
app.get('/priceOfPizzas',async (req,res)=>{
    const [results, fields] = await db.query(
        'SELECT * FROM `pizzas`'
    );
    
    

    res.send(results);
    res.end();
})

//Pegar Usuarios:
app.get('/Read',async(req,res)=>{
    const [results, fields] = await db.query(
        'SELECT * FROM `peopleCadastre`'
    );
    
    res.send(results);
    res.end();
})



//Pegando Todas As Comandas:
app.get('/Comandas',async(req,res)=>{
    
    const [results, fields] = await db.query(
        `SELECT * FROM comandas `
    );
    res.send(results);
    res.end();
})



//Rotas Post's:

//Create Usuario:
app.post('/Create',async(req, res)=>{
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const dob = req.body.dob
    const gender = req.body.gender
    const [resultsTablePeople, fieldsTaablePeople] = await db.query(
        `INSERT INTO peopleCadastre (id, username, email, pass, dob, gender) VALUES
        (default, '${username}', '${email}', '${password}', '${dob}', '${gender}')`
      );
      
    
      res.end()
})


// validação de senha:
app.post('/validation', async(req,res)=>{
    
    const senha = req.body.senha
    const id = req.body.id
    
    const [results, fields] = await db.query(
        `select pass from peopleCadastre where id = ${id}`
        )
        if(results[0].pass === senha){
            res.send(console.log('acertou'))
        }
        else{
            res.status(401).send("Login failed");
        }
        res.end()
})

// Criando Comandas
app.post('/Create/Comandas',async(req,res)=>{
    const edge = req.body.edge
    const quantity = req.body.quantity
    const pizzaName = req.body.pizzaName
    const opc = req.body.opcityon
    const valuePizza = req.body.valuePizza
    const idOfUser = req.body.idOfUser

    const [resultsTableComanda, fieldsTableComanda] = await db.query(
        `INSERT INTO comandas (idComanda, edge, quantity, pizzaName, opcityon, valuePizza, idOfUser) VALUES
        (default, '${edge}', '${quantity}', '${pizzaName}','${opc}','${valuePizza}', '${idOfUser}')`
      );
    

    res.status(201)
    res.end()
})


//Rotas put:

//Editar Usuario:
app.put('/Read/:id', async(req, res)=>{
    const id = req.body.id
    const nome = req.body.username
    const dob = req.body.dob
    const gender = req.body.gender
    
    
        const [results, fields] = await db.query(
            `UPDATE peopleCadastre SET username = '${nome}', dob = '${dob}', gender = '${gender}' WHERE (id = '${id}')`);
          res.send(results);
    

    res.end(console.log(id));
});

//Editar Senha:
app.put('/EditingPassword/', async(req, res)=>{
    const id = req.body.id
    const senhaNv = req.body.senhaNv
    
    
        const [results, fields] = await db.query(
            `UPDATE peopleCadastre SET pass = '${senhaNv}' WHERE (id = '${id}')`);
          res.send(results);
    

    res.end(console.log('Trocado: '+id));
});


//Rota de deletar:

//Deletar Usuario
app.delete('/DeleteUser/:id',async(req, res)=>{
   const id =  req.params.id
    console.log(id);
    
    const [results, fields] = await db.query(
        `delete from peopleCadastre where(id='${id}')`
        )
        console.log(results);
    res.end()
})

//Deletar Comanda
app.delete('/Comanda/Delete/:id',async(req,res)=>{
    const id =  req.params.id
    
    const [results, fields] = await db.query(
        `delete from comandas where(idOfUser='${id}')`
        )
        console.log(results);
    
        const [resultsTablePeople, fieldsTaablePeople] = await db.query(
            `select buys from peoplecadastre where id = '${id}'`
          );
          db.query(select)
        if(resultsTablePeople[0].buys === null){
            
            return db.query(`UPDATE peoplecadastre SET buys = 1 WHERE (id = '${id}')`);
            }
    
            return db.query(`UPDATE peoplecadastre SET buys = ${Number(resultsTablePeople[0].buys)+1} WHERE (id = '${id}')`);
          
})

//porta:
app.listen(8080, ()=>{
    console.log(corzinhaNoConsole.styleText('green',' Estou em http://localhost:8080')); 
})
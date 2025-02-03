import db from './conectionSQL.js'

async function AddingOnTablePizzas() {
  
  const sql = ` insert into pizzas (pricePizza) values ?`;
  const values = [['35.00'],['40.00'],['45.99'],['33.29']]
        await db.query(sql,[values])
}

 export default async function AddingTable(){

   const [resultsTablePizza] = await db.query(
     `CREATE TABLE IF NOT EXISTS pizzas (id int auto_increment, pricePizza decimal(5,2), primary key(id))default charset=utf8mb4;`
    );
    
    
    if(resultsTablePizza.warningStatus === 0){
      
      console.log(resultsTablePizza.warningStatus);
      AddingOnTablePizzas();
    }
    const [resultsTablePeople, fields] = await db.query(
      `CREATE TABLE IF NOT EXISTS peopleCadastre(id int auto_increment,username varchar(20),email varchar(70) unique,pass varchar(45),dob text,gender enum('male', 'female', 'other'), buys int,primary key(id))default charset=utf8mb4;`);
      const [resultsTableComandas] = await db.query(
          `CREATE TABLE IF NOT EXISTS comandas (idComanda int primary key auto_increment, edge text, quantity int, pizzaName text, opcityon varchar(30), valuePizza decimal(5,2), idOfUser int, foreign key(idOfUser) references peoplecadastre(id))default charset=utf8mb4 engine=InnoDB;`
        );
}

AddingTable()

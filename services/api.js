const url = 'http://localhost:8080'


//Criando um Usuario:
async function criandoNoBancoDeDados(obj){
    await fetch(url+'/Create',{
        method:'POST',
        headers:{
            'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(obj)}
    ).catch(e)
}


//Verificando Senha:
async function validandoSenha(id,senha){
    let response=null
    const senhaDoUsuario = {
        id:id,
        senha:senha
    }
    await fetch(url+'/validation',{
        method:"POST",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(senhaDoUsuario)
    }).then(r=>{response = r}).catch(e=> {return e})
    return response
}


//Pegando Usuarios
async function pegarUsuarios(){
return await fetch(url+'/Read').then(r=> r.json()).catch(e => console.log(e))
}


//Editando Usuario
async function EditarUsuario(id,username,dob,gender){
    let response =null

    const obj = {
        id:id,
        username:username,
        dob:dob,
        gender:gender
    }
    await fetch(url+'/Read/'+id,{
        method:'PUT',
        headers:{
            'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(obj)
    }).then(r=>response = r
    ).catch(e => console.log(e))

    return response
    
}

//Editando a senha:
async function EditarSenha(id,senha){
    let response =null
    const obj = {
        id:id,
        senhaNv:senha
    }
    await fetch(url+'/EditingPassword',{
        method:'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(obj)
    }
    ).then(r=> response=r
    ).catch(e=>console.log(e))
    return response;
}

//deletando Usuario:
async function DeletarUsuario(id) {
    let res = null
   await fetch(url+'/DeleteUser/'+id,{
        method:'delete',
        headers:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    }).then(r=> res=r)
    return res
}

//Pegando Todos Os Precos
async function PegarPrecosDaPizza(){
    let response = null
   response = await fetch(url+'/priceOfPizzas').then(r => r)
    return response
}

//Pegando preco especifico pela id passada 
async function precoPizza(id){
    console.log(id);
    const preco = await PegarPrecosDaPizza().then(r=> r.json())
    console.log(preco);
    
    return preco[id].pricePizza
}

//Pegando Comandas
async function PegandoTodasComandas(){
    let response = "Minha Resposta Recebida"
    await fetch(url+'/Comandas').then(r => response = r.json())
    return response
}

//Postando Comandas
async function PostComandas(comanda) {
    const body = {
        edge:comanda.edge,
        quantity:comanda.quantity,
        pizzaName:comanda.pizzaName,
        opcityon:comanda.opcityon,
        valuePizza:comanda.valuePizza,
        idOfUser:comanda.idOfUser
    }
    fetch(url+'/Create/Comandas',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body:JSON.stringify(body)
    }).catch(e => e)

}

//Delete Comandas
async function DeletandoComanda(idOfUser){
    await fetch(url+'/Comanda/Delete/'+idOfUser,{
        method:'DELETE',
        headers:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
    })
  
}
const id = pegandoIdDaPizza()




async function CarregandoPizza(){
    const precoDaPizza = await precoPizza(id)
    carregandoIngredientes(id);
    carregandoMenuCardapio(precoDaPizza);
}

async function precoPizza(id){
    const preco = await PegarPrecosDaPizza().then(r=> r.json())
    return preco[id].pricePizza
}

CarregandoPizza()



function carregandoMenuCardapio(precoTxT){
    const TodasAsPizzas = MinhasPizzas()
    
    
    $("#preco").innerText = "Preço: R$ "+ precoTxT.replace('.',',')
    $("#nome-da-pizza").innerText = TodasAsPizzas[id].nomeDaPizza
    document.querySelector("img").setAttribute("src", TodasAsPizzas[id].img);
}

function carregandoIngredientes(id){
    const TodasAsPizzas = MinhasPizzas()
    $("#ingredientes").innerText = "A nossa pizza apetitosa vem com: "+ TodasAsPizzas[id].ingrediente
}


async function add(){
    let precoDaPizza = "Aqui Farei Uma API para pegar o preco em meu servidor"
    let preco = "Preço que o cliente vai pagar"
    
    let quantidade = Number($('#quantidade').innerText)
    if (quantidade <=5 != true)
        return;
    const aumentar5 = await bordaAumentarValor()
    
    quantidade += 1
    if (aumentar5 === true){
        precoDaPizza = 5 + Number(await precoPizza(id));
        preco = precoDaPizza * quantidade;}
        else{
        precoDaPizza = Number(await precoPizza(id));
        preco = precoDaPizza * quantidade;
}
    $("#quantidade").innerText = quantidade
    exibirValor(preco)
}

async function menos(){
    let quantidade = Number($('#quantidade').innerText)
    
    
    if (quantidade<=1)
        return;
    const precoDaPizza = Number(await precoPizza(id));
    const aumentar5 = await bordaAumentarValor()
    let preco = "Preço que o cliente vai pagar"
    
    
    quantidade -= 1
    if (aumentar5 === true){
        preco = 5 + precoDaPizza * quantidade;}
    else
        preco = precoDaPizza * quantidade;

    $("#quantidade").innerText = quantidade
    exibirValor(preco)
    }



async function adicionarSacola(){
    const precoDoCliente = Number($('#preco').innerHTML.slice(10).replace(',','.'))
    const aumentar5 = await bordaAumentarValor()
    let precoDaPizza = 'Valor Da Pizza Do Cliente'

    if (aumentar5 === true)
        precoDaPizza = 5 + Number(await precoPizza(id));

    else
        precoDaPizza = Number(await precoPizza(id));

    const quantidade = Number($('#quantidade').innerText)
    const ok = (precoDaPizza <= precoDoCliente && quantidade >= 1 && Number.isInteger(Number(quantidade))) ? "sim":"não"
    let quantasPizzas = precoDoCliente/precoDaPizza;
    
    quantasPizzas = quantasPizzas.toFixed(0);
    const valorDasPizzas = quantasPizzas*precoDaPizza
    const selecionandoABorda = BordaSelecionada()
    
    if (ok === 'não')
        return;

    if (localStorage.getItem('user') === null){
        if (localStorage.getItem('Criado') !== null)
            localStorage.removeItem('Criado');
        return alert('Seja membro para comprar pizzas')
    }

    const nome = localStorage.getItem('user')
    const nomeDoUsuario = await pegarNomeDoUsuario(nome)
    if (nomeDoUsuario){
        localStorage.removeItem('user');
        return alert('Usuario Invalido');
    }

    
    await AdicionandoComanda(selecionandoABorda,quantasPizzas,valorDasPizzas,$("#opc").value)
    $('#quantidade').innerHTML = 1
    if (localStorage.Criado)
        return;
    
    const divBtn = $("#btn-container")
    localStorage.setItem("Criado", "true")
    const divSacola = $("#sacola");
    divSacola.setAttribute("id", "sacola");
    divSacola.setAttribute("class", "order-button");
    const txt = document.createTextNode("Ver Sacola");
    divSacola.appendChild(txt);
    divBtn.appendChild(divSacola);
    $("#opc").value = ""
    

}

async function AdicionandoComanda(BordaSeleciona,quantasPizzas,valorDasPizzas,opcityon){
    
    const NomeDaPizza = MinhasPizzas()[id].nomeDaPizza
    const idUsuario = await pegarIdDoUsuario()
    const listaDeComandas = await PegandoTodasComandas();
    
    const pegandoQuantasVezesUsuarioComprou = (array,value)=>array.reduce(
        (acc,item)=> value === item.idOfUser ? acc+1:acc,0)

        
        if (pegandoQuantasVezesUsuarioComprou(listaDeComandas,) >=10) {
            return alert("ALERTA: Limite na Sacola")
        }
    for (const comanda of listaDeComandas) {
        if(comanda.edge === BordaSeleciona && comanda.pizzaName === NomeDaPizza && comanda.quantity === Number(quantasPizzas))
            return alert('mude seu pedido')
    }

    
    
    const comanda = {
        edge:BordaSeleciona,
        quantity:quantasPizzas,
        pizzaName:NomeDaPizza,
        opcityon:opcityon,
        valuePizza:valorDasPizzas,
        idOfUser:await pegarIdDoUsuario()
    };

    await PostComandas(comanda)
    }


function IrParaSacola(){
    location.href="/acess/pages/sacola/sacola.html"
}

async function bordaAumentarValor(){
    
    let aumentar5 = true
    let preco = await precoPizza(id)
    
    
    const radios = document.getElementsByName("value-radio");
    radios.forEach(r =>{
        if(r.checked)
            aumentar5 = (r.value != "Sem Borda") ? true:false ;
    })

    if(aumentar5 === true)
        
        preco = Number(preco)+5;

    if (Number.isInteger(preco) === true) 
        $("#preco").innerText = "Preço: R$ " + preco+",00";
    else
        $("#preco").innerText = "Preço: R$ " + preco.toString().replace('.',',');
    return aumentar5
}


function BordaSelecionada(){
    
    let select = null
    const listaDeBordas = document.getElementsByName("value-radio");
    listaDeBordas.forEach(borda =>{
        if(borda.checked)
            select = borda.value;
    })
    return select
}

function exibirValor(preco){
    
    
    if(Number.isInteger(preco))
    $("#preco").innerText = "Preço: R$ "+ preco.toString().replace(".",",")+",00";
    else{
        $("#preco").innerText = "Preço: R$ "+ preco.toFixed(2).toString().replace(".",",");
    }
}


$("#mais").addEventListener("click", async function(){await add()})
$("#menos").addEventListener("click", async function(){await menos()})
$("#btnSacola").addEventListener("click", async function(){await adicionarSacola()})
$("#sacola").addEventListener("click", IrParaSacola)
$("#radios").addEventListener("click", async function(){await bordaAumentarValor()})
$("#radios").addEventListener("click", function(){$('#quantidade').innerText = '1'})
document.querySelector("#back").addEventListener("click", function(){history.back()})
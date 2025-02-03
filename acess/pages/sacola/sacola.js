
async function ConstruirComanda(){
    const divComandas = $("#comandas");

    if (localStorage.getItem('Criado') === null)
        return $("#titulo").innerText = "Compre Pizzas";

    const idUser = await pegarIdDoUsuario()
    
    $("#titulo").innerText = "Meu Menu";

    const TabelaDeTodasAsComandas = await PegandoTodasComandas()
    
   const listaDeComandas = TabelaDeTodasAsComandas.filter((ExpecifComanda)=>{
    return ExpecifComanda.idOfUser === idUser
    })

    for (const comanda of listaDeComandas) {
        CriarParagrafo(`Borda: ${comanda.edge}, ${comanda.quantity} ${comanda.pizzaName} Opc: ${comanda.opcityon}, R$: ${comanda.valuePizza.replace('.',',')}`)
    }
        divComandas.appendChild(document.createElement('br'))
        CriarParagrafo("Total a pagar é:  R$:"+listaDeComandas.reduce((acc,comanda)=>acc+Number(comanda.valuePizza),0).toString().replace('.',','))

        CriarButton('Finalizar Compra',async function(){await apagarItens(idUser)})
        divComandas.appendChild(document.createElement('br'))
}

async function apagarItens(idUser){
    const divComandas = $("#comandas");
    if(confirm("Você está pagando?") === false)
        return;
    const ListaDeParagrafos = $all('.Paragrafo-Criado')
    for (const paragrafo of ListaDeParagrafos) {
        divComandas.removeChild(paragrafo)
    }
    divComandas.removeChild($(".btnCarrinho"))
    localStorage.removeItem('Criado')
    $("#titulo").innerText = "Compre Pizzas";
    await DeletandoComanda(idUser)
}

function CriarParagrafo(textoParaCriar){
    const divComandas = $("#comandas");
    const texto = document.createTextNode(textoParaCriar);
    const paragrafo = document.createElement("p");
    paragrafo.setAttribute("class", "barlow-condensed-semibold Paragrafo-Criado");
    paragrafo.appendChild(texto);
    divComandas.appendChild(paragrafo);
   
}

function CriarButton(textoDoButton,func){
    const divComandas = $("#comandas");
    const btn = document.createElement("button");
    const txtBTN = document.createTextNode(textoDoButton);
                btn.setAttribute("class", "btnCarrinho");
                btn.appendChild(txtBTN);
                divComandas.appendChild(btn);
                btn.addEventListener("click",func);
                

}


ConstruirComanda()
function contruindoButton(){
    const menuItem = $all(".menu-item");

for (let index = 0; index < menuItem.length; index++) {
    const btn = document.createElement("button");
    btn.setAttribute("class", "buttonPizza");
    btn.setAttribute("id", "btn"+index);
    btn.addEventListener("click", function click(){
        irParaPagina(index);
    })
    const text = document.createTextNode("Ver a pizza");
    btn.appendChild(text);
    
    menuItem[index].appendChild(btn);
}
}

async function CarregandoMenu(){
    const TodasAsPizzas = MinhasPizzas();
    const section = document.querySelector('#menu');
    const CriandoElemento = (elemento, atributo, valor)=>{
            const elementoCriado = document.createElement(elemento);
            elementoCriado.setAttribute(atributo, valor);
            return elementoCriado
        }
    const CriandoTexto = (elemento, texto)=>{
            const textoCriado = document.createElement(elemento);
            textoCriado.innerText = texto;
            return textoCriado;
        }
    for (const pizza of TodasAsPizzas) {
        const indexDaPizza = TodasAsPizzas.indexOf(pizza);
        const precoDaPizza = await precoPizza(indexDaPizza);
        const divMenuItem = document.createElement('div');
        divMenuItem.setAttribute('class', 'menu-item');
        const img = CriandoElemento('img','src',pizza.img);
        const TituloDaPizza = CriandoTexto('h3',pizza.nomeDaPizza);
        const ParagragoDaPizza = CriandoTexto('p',pizza.ingrediente);
        const Preco = CriandoTexto('p', "Preco:  "+precoDaPizza.replace('.',','))
        Preco.setAttribute('class', 'Text-Price')
        divMenuItem.appendChild(img);
        divMenuItem.appendChild(TituloDaPizza);
        divMenuItem.appendChild(ParagragoDaPizza);
        divMenuItem.appendChild(Preco)
        section.appendChild(divMenuItem);
    }
contruindoButton();
}

    (async function(){

        await CarregandoMenu();
    }())
    

function irParaPagina(id){
    location.href="/acess/pizzas/pizzaSelecionada.html?"+id;

}



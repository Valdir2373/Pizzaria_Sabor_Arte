class Sobre{
    constructor(t,s) {
        const sobreDiv = $("#sobre")
        this.sobreConteudoT = (t) => {
            const sobreConteudoT = document.createElement("h3")
            sobreConteudoT.textContent = t
            sobreConteudoT.setAttribute("class", "titulos");
            sobreDiv.appendChild(sobreConteudoT)}
            
            this.sobreConteudoS = (s) => {
            const sobreConteudoS = document.createElement("p")
            sobreConteudoS.textContent = s
            sobreConteudoS.setAttribute("class", "paragrafos");
            sobreDiv.appendChild(sobreConteudoS)}
    }
}

const sobreHistoria ={
historiaT: "Origem Humilde e Raízes Locais",
historiaS:"Nossa pizzaria nasceu na cozinha da casa da vovó Maria, onde ela preparava pizzas para os vizinhosem noites de festa. Hoje, continuamos a tradição, usando receitas que passaram de geração em geração."
,ingredientesT: "Ingredientes Locais e Parcerias com Produtores",
ingredientesS:"Nossos tomates vêm da fazenda do Seu José, nosso queijo é produzido pela cooperativa de laticínios da cidade, e nossas ervas são colhidas no jardim comunitário do bairro."
,comunidadeT: "Eventos e Apoio à Comunidade",
comunidadeS:"Todo mês, organizamos a 'Noite da Pizza Solidária', onde parte da renda é revertida para projetos sociais locais, como a reforma da escola pública do bairro."
,culturalT:"Preservação da Cultura e Tradições",
culturalS:"Nossa decoração é inspirada na arquitetura histórica do centro da cidade, e nossas pizzas têm nomes que homenageiam personalidades e pontos turísticos locais."
,empregosT:"Empregos e Oportunidades para a Comunidade",
empregosS:"Mais de 80% da nossa equipe é formada por moradores do bairro, e estamos comprometidos em oferecer treinamentos e oportunidades de crescimento para todos."
,feedT:"Feedback e Participação da Comunidade"
,feedS:"Todo trimestre, realizamos uma votação para escolher a nova pizza do cardápio. A comunidade decide, e nós preparamos com todo o carinho!"
,clientesT:"Histórias de Clientes e Conexões Pessoais"
,clientesS:"Há 10 anos, o casal Ana e Pedro se conheceram em uma de nossas mesas. Hoje, eles celebram aqui todos os aniversários de casamento com a família."
,selosT:"Selos e Reconhecimentos Locais"
,selosS:"Fomos eleitos a Melhor Pizzaria da Cidade pelo Jornal Local por três anos consecutivos, graças ao apoio e ao carinho da nossa comunidade."

}

const sobre = new Sobre()
const exibirT = (texto) =>{sobre.sobreConteudoT(texto)}; const exibirS = (texto)=>{sobre.sobreConteudoS(texto)}

let sim = false 
for (let index = 0; index < Object.values(sobreHistoria).length; index++) {
    const array = Object.values(sobreHistoria)
    
    if (sim === true) {
        exibirS(array[index])
        sim = false
    }
    else{
        exibirT(array[index])
        sim = true
    }


}




    










// Histórias de Clientes e Conexões Pessoais
// 
// Selos e Reconhecimentos Locais
// "Fomos eleitos a Melhor Pizzaria da Cidade pelo Jornal Local por três anos consecutivos, graças ao apoio e ao carinho da nossa comunidade."
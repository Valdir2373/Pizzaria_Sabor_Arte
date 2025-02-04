const $ = (sel) => document.querySelector(sel)
const $all = (sel) => document.querySelectorAll(sel)



if (location.pathname != "/acess/pizzas/pizzaSelecionada.html")
user();

async function user() {
    if (localStorage.user) {
            const listaDeUsuarios = await pegarUsuarios().then(r=> {return r})
            const nomeDoUsuario = localStorage.getItem('user')
            for (const usuario of listaDeUsuarios) {
                if (usuario.username === nomeDoUsuario){
                    $('#user').innerHTML =`
                    <button class="button">
                        <a class="a-item" href="/acess/pages/user/user.html">User</a>
                    </button>`;
                   await VerSeEstaNaComanda()
                    return
                }
            }
            localStorage.removeItem('user')
            loginRegister()
        return
        
    }
    else{
        loginRegister()
    }
}   


async function VerSeEstaNaComanda(){
    const idUsuario = await pegarIdDoUsuario()
    const listaDeComandas = await PegandoTodasComandas();
    const pegandoQuantasVezesUsuarioComprou = (array,value)=>array.reduce(
        (acc,item)=> value === item.idOfUser ? acc+1:acc,0)


   const EstaNaComanda = (pegandoQuantasVezesUsuarioComprou(listaDeComandas,idUsuario) >=1) ? "Tá Devendokkk":"Não"
   if (EstaNaComanda !== "Não")
        localStorage.setItem('Criado', 'true');
}


function loginRegister(){
    if (location.pathname === "/acess/pages/user/user.html") 
        location.replace('/acess/pages/home/index.html');

    if (location.pathname === "/acess/pages/user/trocarSenha.html")
        location.replace('/acess/pages/home/index.html');

    if (location.pathname === '/acess/pages/sacola/sacola.html'){
        if(localStorage.getItem('Criado')!==null)
            localStorage.removeItem('Criado');
        alert('Seja membro e se registre');
        location.replace('/acess/pages/home/index.html');
    }

    $('#login').innerHTML = `
    <button class="button">
    <a class="a-item" href="/login/login.html">Login</a>
    </button>`;

    $('#register').innerHTML =`
    <button class="button">
    <a class="a-item" href="/register/register.html"> Register </a>
    </button>`;
    return
}

if(localStorage.Criado === "true" && location.pathname != '/acess/pages/sacola/sacola.html'){
    const divContainerSacola = $("#container-sacola")
    const divSacola = $("#sacola");
    divSacola.setAttribute("id", "sacola");
    divSacola.setAttribute("class", "order-button");
    const txt = document.createTextNode("Ver Sacola");
    divSacola.appendChild(txt);
    divContainerSacola.appendChild(divSacola);
    criado = true;
    divSacola.addEventListener("click", function(){location.href="/acess/pages/sacola/sacola.html"})
}

async function construindoEdit(){
    const listaDeUsuarios = await pegarUsuarios().then(r=> {return r});
    const nomeDoUsuario = localStorage.getItem('user') 
    for (const usuario of listaDeUsuarios) {
        if (usuario.username === nomeDoUsuario) {
            
                $('#texto').innerHTML = "Olá: "+usuario.username
                $('#username').value = usuario.username
                $('#gender').value = usuario.gender                
                $('#dob').value = usuario.dob
            
            return
        }
    }
    
}

async function construindoTrocaSenha(){
    const listaDeUsuarios = await pegarUsuarios().then(r=> {return r});
    const nomeDoUsuario = localStorage.getItem('user') 
    for (const usuario of listaDeUsuarios) {
        if (usuario.username === nomeDoUsuario) {
                $('#texto').innerHTML = "Olá: "+usuario.username;
               const senha = $('#senha-atual').value;
               const senhaNv1 =  $('#senha-nova1').value;
               const senhaNv2 = $('#senha-nova2').value;
               
            return
        }
    }
}

if(location.pathname === '/acess/pages/user/trocarSenha.html')
construindoTrocaSenha();

if (location.pathname === '/acess/pages/user/user.html')
    construindoEdit();

if (location.pathname === '/acess/pizzas/pizzaSelecionada.html' || location.pathname === '/acess/pages/menu/menu.html'){
    function MinhasPizzas(){
    const PizzaMargherita = {
        ingrediente:'Queijo, muçarela, manjericão fresco.',
        nomeDaPizza:'Pizza Margherita',
        img:'/acess/pizzas/image/Pizza_Margherita.jpg'
    }
    const PizzaCalabresa = {
        ingrediente:'Queijo, muçarela, calabresa e cebola.',
        nomeDaPizza:'Pizza Calabresa',
        img:'/acess/pizzas/image/calabreza.jpg'
    }
    const pizzaQuatroQueijos = {
        ingrediente:'Queijo, muçarela ralada, provolone, gorgonzola, parmesão ralado, orégano.',
        nomeDaPizza:'Pizza Quatro Queijos',
        img:'/acess/pizzas/image/Pizza-Quatro-Queijos.jpg'
    }
    const pizzaVegetariana = {
        ingrediente:'Queijo, Muçarela de vaca e búfala, Requeijão, Parmesão ralado, Orégano, Manjericão',
        nomeDaPizza:'Pizza Vegetariana',
        img:'/acess/pizzas/image/pizza-vegetariana.jpg'
    }

    const TodasAsPizzas = [
    PizzaMargherita, PizzaCalabresa, pizzaQuatroQueijos,
    pizzaVegetariana

]
return TodasAsPizzas
    }

      
    if (location.pathname === '/acess/pizzas/pizzaSelecionada.html') {
        
        function pegandoIdDaPizza(){

            return location.href.charAt(location.href.length -1)
        }
    }

}

const pegarIdDoUsuario = async ()=>{
    const TodosOsUsuarios = await pegarUsuarios();
    for (const user of TodosOsUsuarios) {
        if(user.username === localStorage.user){
            return user.id
        }
    }
}
const pegarNomeDoUsuario = async(nomeQueProcura)=>{
    const TodosOsUsuarios = await pegarUsuarios();
    for (const user of TodosOsUsuarios) {
        if(user.username === nomeQueProcura){
            return true
        }
    }
    return false
}
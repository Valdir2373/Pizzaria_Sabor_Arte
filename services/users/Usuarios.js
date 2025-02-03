
async function Cadastrando(nome,email,pass,date,gender){
    const pessoa = {
        username:nome,
        email:email,
        password:pass,
        dob:date,
        gender:gender
      }
     await criandoNoBancoDeDados(pessoa).catch((e) => e)
}


async function verificando(email,pass1,pass2) {
    
    if(pass1 === pass2){
        const dados = await pegarUsuarios();
        
        for (const element of dados)
            if(email ===  element.email){
                alert('Email Já Existe')
                return false
        };
        
        return true
    }
    alert('SENHAS DIFERENTES')
    return false
}
async function pegarDadosDosUsuario(email,nome,pass1,pass2,date,gender){
    if (await verificando(email,pass1,pass2) === true){ await Cadastrando(nome,email,pass1,date,gender)
        alert("SEJA BEM VINDO: "+nome+"  🎔")
    localStorage.setItem("user",nome)
    window.location.href='/acess/pages/home/index.html'
    return
    }

}



async function usuario(email,pass){
    
    const dados = await pegarUsuarios()
    

    for (const element of dados)
        if(email ===  element.email && pass === element.pass){
            localStorage.setItem("user",element.username)
            location.href="/acess/pages/home/index.html"
            return
        }
        alert("USUARIO NÃO ENCONTRADO")
}
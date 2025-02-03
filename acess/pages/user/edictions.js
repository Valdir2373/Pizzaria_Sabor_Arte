async function validandoDados(senha1,senha2,senha3){
   let tentarSenha = senha3
   if(tentarSenha === undefined)
    tentarSenha = senha2;

    let okFuncionou = true

    if (senha1 === senha2) {

        const listaDeUsuarios = await pegarUsuarios().then(r=> {return r})
        
        const nomeDoUsuario = localStorage.getItem('user')
        for (const usuario of listaDeUsuarios) {
            
            if (usuario.username === nomeDoUsuario) {
                
                if(await validandoSenha(usuario.id,tentarSenha).then(r=>r.status) === 401){
                    alert('Senha Invalida');
                    return okFuncionou = false
                }
                return okFuncionou
            }
        }
        alert('Usuario Não Encontrado');
        return okFuncionou = false
    }
    else alert("Senhas Diferentes");
    return okFuncionou = false
}

async function pegarDadosDosUsuarios(){
    const listaDeUsuarios = await pegarUsuarios().then(r=> {return r})
    const nomeDoUsuario = localStorage.getItem('user')
    for (const usuario of listaDeUsuarios) {
        if (usuario.username === nomeDoUsuario) {
            return usuario
        }
    }
}


async function editUser(){
    const senha1 =  $('#senha').value
    const senha2 = $('#senha2').value

    if(await validandoDados(senha1,senha2)){
        const usuario = await pegarDadosDosUsuarios()
        const username = $('#username').value;
        const gender = $('#gender').value;
        const dob = $('#dob').value;
        if(await EditarUsuario(usuario.id,username,dob,gender).then(r=>r.status) === 200)
            localStorage.removeItem('user')
            localStorage.setItem('user', username)
            alert('mudei seu usuario')
            location.reload()
            return
    }              
}


async function editPass(){
    const senha = $('#senha-atual');
    const senhaNv1 = $('#senha-nova1');
    const senhaNv2 = $('#senha-nova2');


    if (senha.value === senhaNv1.value && senha.value === senhaNv2.value)
        return alert('Não pode cadastrar a mesma senha');
    
    if(await validandoDados(senhaNv1.value,senhaNv2.value,senha.value)){
        const usuario = await pegarDadosDosUsuarios()
        if(await EditarSenha(usuario.id,senhaNv1.value).then(r=>r.status) === 200)
            alert('mudei sua senha');
        senha.value ='';
        senhaNv1.value = '';
        senhaNv2.value ='';
        return
    }    
}

async function deletingUser(){

    
    const senha1 =  $('#senha').value
    const senha2 = $('#senha2').value

    if (senha1 === senha2) {

        const listaDeUsuarios = await pegarUsuarios().then(r=> {return r})

        const nomeDoUsuario = localStorage.getItem('user')
        for (const usuario of listaDeUsuarios) {
            
            if (usuario.username === nomeDoUsuario) {
                
                if(await validandoSenha(usuario.id,senha1).then(r=>r.status) === 401){
                    alert('Senha Invalida');
                    return
                }
                else{
                    if(confirm('Você está tentando deletar a sua conta?') === true){
                        await DeletarUsuario(usuario.id)
                        localStorage.removeItem('user')
                        alert('Sua Conta foi deletada');
                        location.reload()
                        return
                    }
                    return
                }    
            }
        }
        alert('Usuario Não Encontrado');
    }
    else alert("Senhas Diferentes");

}



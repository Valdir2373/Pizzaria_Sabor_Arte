class ModelForm{ //Criando uma classe do modelo do meu formulario Sem Constructor
    
    register(event){
        event.preventDefault()
        const $ = document.querySelector.bind(document)
        const email = $("#email").value;
        const nome = $("#name").value
        const pass1 = $("#password1").value
        const pass2 = $("#password2").value
        const date = $("#date").value
        const gender = $("#gender").value
        pegarDadosDosUsuario(email,nome,pass1,pass2,date,gender)
    }
    login(event){
       event.preventDefault()
        
        const $ = document.querySelector.bind(document);
        this.email = $("#username").value;
        this.password = $("#password").value;
        let user = this.email
        let pass = this.password
        usuario(user,pass)
}}
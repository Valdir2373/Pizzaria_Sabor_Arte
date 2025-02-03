
const passIn = document.getElementById("checkbox-id")
const inputPass = document.getElementById("password1")
const inputPass2 = document.getElementById("password2")


function MostrarSenha() {    
    const simOuNao = document.querySelector("#checkbox-id").checked
    if (simOuNao === true) {
        inputPass.removeAttribute("type", "password")
        inputPass.setAttribute("type", "text")
        inputPass2.removeAttribute("type", "password")
        inputPass2.setAttribute("type", "text")
    }
    else{
        inputPass.removeAttribute("type", "text")
        inputPass.setAttribute("type", "password")
        inputPass2.removeAttribute("type", "text")
        inputPass2.setAttribute("type", "password")
    }
}

passIn.addEventListener("click", MostrarSenha)
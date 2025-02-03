const passIn = document.getElementById("a-password")
const inputPass = document.getElementById("password")


function troqueAtributo() {
    let simOuNao = document.querySelector("#checkbox-id").checked   
    if (simOuNao === true) {
        inputPass.removeAttribute("type", "password")
        inputPass.setAttribute("type", "text")
    }
    else{
        inputPass.removeAttribute("type", "text")
        inputPass.setAttribute("type", "password")
    }

}

passIn.addEventListener("click", troqueAtributo)
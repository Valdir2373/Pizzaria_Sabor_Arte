async function editSenha(){
    const senha = $('#senha-atual').value
    const senhaNv1 = $('#senha-nova.value1').value
    const senhaNv2 = $('#senha-nova2').value
    alert(senha)
}

$('#btnEditSenha').addEventListener('submit',async function(event) {
    event.preventDefault();
    await editSenha()
})


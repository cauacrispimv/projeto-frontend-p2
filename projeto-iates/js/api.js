function obterMensagens() {

    var retorno = [];

    var consulta = $.ajax({
        url: 'https://app-p2-aab7c7fdddb8.herokuapp.com/mensagens',
        method: 'GET',
        dataType: 'json',
        async: false
    }).fail(function(){
        return retorno;
    });

    consulta.done(function(data) {
        retorno = data;
    });

    return retorno;
}

function inserirMensagem(mensagem) {
    $.ajax({
        url: 'https://app-p2-aab7c7fdddb8.herokuapp.com/mensagens',
        method: 'POST',
        data: JSON.stringify(mensagem),
        dataType: 'json',
        contentType: 'application/json',
        success: function(data) {
            console.log("Mensagem enviada com sucesso");
        },
        error: function(xhr, status, error) {
            console.error("Erro ao enviar mensagem:", error);
        }
    });
}

function validarUsuario(objLoginSenha) {

    //email: admin@admin.com
    //senha: '1234'


    var objLoginSenha = {
            email: "email informado", 
            senha: "senha informada"} 

    var retorno = false;

    var validacao = $.ajax({
        url: 'https://app-p2-aab7c7fdddb8.herokuapp.com/usuarios/validar',
        method: 'POST',
        dataType: 'json',
        async: false,
        headers: {
            'Access-Control-Allow-Origin': '*'
                },
        contentType: 'application/json',
        data: JSON.stringify(objLoginSenha)
    }).fail(function(){
        return retorno;
    });

    validacao.done(function(data) {
        retorno = data;
    });

    return retorno;
}

document.addEventListener("DOMContentLoaded", () => {
    const enviarBotao = document.querySelector(".button");
  
    enviarBotao.addEventListener("click", () => {
      const nome = document.getElementById("nome").value;
      const email = document.getElementById("email").value;
      const mensagemTexto = document.getElementById("msg").value;
  
      const mensagem = {
        nome: nome,
        email: email,
        mensagem: mensagemTexto,
      };
  
      inserirMensagem(mensagem);
  
      alert("Mensagem enviada com sucesso!");
    });
  });
  
  function inserirMensagem(mensagem) {
    console.log("Mensagem recebida:", mensagem);
  }
  
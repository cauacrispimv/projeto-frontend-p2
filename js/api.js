function obterMensagens() {
    var retorno = [];

    var consulta = $.ajax({
        url: 'https://app-p2-aab7c7fdddb8.herokuapp.com/mensagens',
        method: 'GET',
        dataType: 'json',
        async: false
    }).fail(function() {
        alert("Erro ao carregar mensagens!");
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
            alert("Mensagem enviada com sucesso!");
            carregarMensagens(); 
        },
        error: function(xhr, status, error) {
            console.error("Erro ao enviar mensagem:", error);
            alert("Erro ao enviar mensagem.");
        }
    });
}

function validarUsuario(objLoginSenha) {
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
    }).fail(function() {
        return retorno;
    });

    validacao.done(function(data) {
        retorno = data;
    });

    return retorno;
}

function carregarMensagens() {
    const tabela = document.getElementById("mensagens-table").getElementsByTagName('tbody')[0];

    tabela.innerHTML = "";

    const mensagens = obterMensagens();

    mensagens.forEach(function(mensagem) {
        var linha = tabela.insertRow();

        var nomeCell = linha.insertCell(0);
        var emailCell = linha.insertCell(1);
        var mensagemCell = linha.insertCell(2);

        nomeCell.textContent = mensagem.nome;
        emailCell.textContent = mensagem.email;
        mensagemCell.textContent = mensagem.mensagem;
    });
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
    });

    carregarMensagens();

    setInterval(carregarMensagens, 10000);
});

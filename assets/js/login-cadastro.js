const hostApi = "https://us-central1-meu-tcc-1995.cloudfunctions.net/function-1"


//apertando o botão login
$('#btn-login').click(function () {

    $("#credenciaisIncorretas").fadeOut("fast", function () {
        $("#camposEmBranco").fadeOut("fast", function () {

            let email = document.getElementById('email').value
            let senha = document.getElementById('senha').value
            if (email.length > 0 && senha.length > 0) {
                const credentials = {
                    "email": email,
                    "senha": btoa(senha)
                }
                $.ajax({
                    // url: 'https://us-central1-meu-tcc-1995.cloudfunctions.net/function-1/user-login',
                    // data: credentials,
                    // error: function (e) {
                    //     console.log("Ocorreu um error ao se conectar com a API " + e.)
                    // },
                    // success: function (data) {
                    //     console.log(data)
                    //     callback(data)
                    // },
                    // type: 'POST'

                    // url: 'https://us-central1-meu-tcc-1995.cloudfunctions.net/function-1/user-login',
                    // type: 'post',
                    // dataType: 'json',
                    // contentType: 'application/json',
                    // success: function (data) {
                    //     console.log(data)
                    //     callback(data)
                    // },
                    // traditional: true,
                    // data: JSON.stringify(credentials)

                    url: hostApi+'/user-login',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true',
                        'Content-Type':'application/json'
                    },
                    method: 'POST',
                    type: 'POST',
                    dataType: 'json',
                    data: JSON.stringify(credentials),
                    success: function(data){
                        console.log('succes: '+ data['status']);
                        callback(data)
                    }
                });


            } else {
                $("#camposEmBranco").fadeIn("slow")
            }
        })
    })



})

function callback(data) {

    if (data.status) {
        window.location.href = 'dashboard.html'
    }

    else {
        $("#credenciaisIncorretas").fadeIn("slow")
    }
}

$("#senha").on('keypress', function (e) {
    if (e.which == 13) {
        $("#btn-login").trigger("click");
    }
});

//abrir o cadastro e fechar login
$("#abrirCadastro").click(function () {


    $("#login").fadeOut("slow", function () {
        $("#cadastro").fadeIn("slow")

    })

    document.title = "Cadastro"
})

//fechar cadastro  e abrir login
$("#voltarLogin").click(function () {


    $("#cadastro").fadeOut("slow", function () {
        $("#login").fadeIn("slow")

    })

    document.title = "Login"
})

//botão cadastrar 
$('#btn-cadastro').click(function () {
    $("#dadosNaoPreenchidos").fadeOut("fast", function () {
        $("#emailExistente").fadeOut("fast", function () {
            $("#emailExistente").fadeOut("fast", function () {
                $("#senhaCurta").fadeOut("fast", function () {
                    $("#senhasDivergentes").fadeOut("fast", function () {
                        let email = document.getElementById('emailCadastro').value
                        let nome = document.getElementById('nome').value
                        let sobrenome = document.getElementById('sobrenome').value
                        let senha = document.getElementById('senhaCadastro').value
                        let confirmarSenha = document.getElementById('confirmarSenha').value
                        if (email.length > 0 && nome.length > 0 && sobrenome.length > 0 && senha.length > 0 && confirmarSenha.length > 0) {



                            if (senha.length >= 8) {

                                if (senha == confirmarSenha) {
                                    let credentials = {
                                        "nome": nome,
                                        "sobrenome": sobrenome,
                                        "email": email,
                                        "senha": btoa(senha)
                                    }

                                    $.ajax({
                    
                                        url: hostApi+'/novo-usuario',
                                        headers: {
                                            'Access-Control-Allow-Origin': '*',
                                            'Access-Control-Allow-Credentials': 'true',
                                            'Content-Type':'application/json'
                                        },
                                        method: 'POST',
                                        type: 'POST',
                                        dataType: 'json',
                                        data: JSON.stringify(credentials),
                                        success: function(data){
                                            console.log('succes: '+ data['status']);
                                            callbackCadastro(data)
                                        }
                                    });



                                } else {
                                    $("#senhasDivergentes").fadeIn("slow", function () { })
                                }
                            } else {
                                $("#senhaCurta").fadeIn("slow", function () { })
                            }

                        } else {
                            $("#dadosNaoPreenchidos").fadeIn("slow", function () { })
                        }

                    })
                })
            })
        })
    })
})

function callbackCadastro(data) {

    if (data.status) {

        alert("Cadastrado com sucesso!")
        // $("#voltarLogin").trigger("click")
        window.location.href = 'gerar-configuracoes.html'
    } else {

        if (data.mensagem == "E-mail já cadastrado!") {
            emailCadastrado()
        } else {
            alert(data.mensagem)
        }
    }
}

function emailCadastrado() {

    $("#emailExistente").fadeIn("slow", function () { })

}
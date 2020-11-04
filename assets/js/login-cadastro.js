const hostApi = "https://us-central1-meu-tcc-1995.cloudfunctions.net/function-1"


//apertando o botão login
$('#btn-login').click(function () {

    //botão loading
    let iconeCarregar = document.getElementById('icone-loading')
    let conteudoBotao = document.getElementById('conteudo-btn-loginCadastro')

    iconeCarregar.style.display = "block"
    conteudoBotao.style.display = "none"
    

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


                    url: hostApi + '/user-login',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true',
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    type: 'POST',
                    dataType: 'json',
                    data: JSON.stringify(credentials),
                    success: function (data) {
                        console.log(data);
                        callback(data)
                        iconeCarregar.style.display = "none"
                         conteudoBotao.style.display = "block"
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
        localStorage.setItem("id", data.id_user);
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

                                        url: hostApi + '/novo-usuario',
                                        headers: {
                                            'Access-Control-Allow-Origin': '*',
                                            'Access-Control-Allow-Credentials': 'true',
                                            'Content-Type': 'application/json'
                                        },
                                        method: 'POST',
                                        type: 'POST',
                                        dataType: 'json',
                                        data: JSON.stringify(credentials),
                                        success: function (data) {
                                            console.log('succes: ' + data['status']);
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
      location.reload(true)
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
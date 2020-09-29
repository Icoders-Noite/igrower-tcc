


//apertando o botão login
$('#btn-login').click(function () {

    $("#credenciaisIncorretas").fadeOut("fast", function () {
        $("#camposEmBranco").fadeOut("fast", function () {

            let email = document.getElementById('email').value
            let senha = document.getElementById('senha').value
            if (email.length > 0 && senha.length > 0) {
                const credentials = {
                    "user": email,
                    "password": btoa(senha)
                }
                $.ajax({
                    url: 'https://my-json-server.typicode.com/Icoders-Noite/api-fake-test/login',
                    data: credentials,
                    error: function () {
                        alert("Ocorreu um error ao se conectar com a API")
                    },
                    dataType: 'jsonp',
                    success: function (data) {
                        callback(data)
                    },
                    type: 'GET'
                });


            } else {
                $("#camposEmBranco").fadeIn("slow")
            }
        })
    })



})

function callback(data) {

    if (data.entrou) {
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


                                    var xhr = new XMLHttpRequest();
                                
                                    // we defined the xhr

                                    xhr.onreadystatechange = function () {
                                        if (this.readyState != 4) return;

                                        if (this.status == 200) {
                                            var data = JSON.parse(this.responseText);
                                            console.log(data)
                                            // we get the returned data
                                        }

                                        // end of state change: it can be after some time (async)
                                    };
                                    xhr.open("POST", "https://us-central1-meu-tcc-1995.cloudfunctions.net/function-1/novo-usuario", true);
                                
                                    xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*');
                                    // xhr.setRequestHeader( 'Host', 'https://us-central1-meu-tcc-1995.cloudfunctions.net');   
                                    // xhr.setRequestHeader( 'Origin', 'https://us-central1-meu-tcc-1995.cloudfunctions.net');
                                    xhr.setRequestHeader('Content-Type', 'pplication/json');
                                    xhr.send(JSON.stringify({
                                        "nome": nome,
                                        "sobrenome": sobrenome,
                                        "email": email,
                                        "senha": btoa(senha)
                                    }));



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
        $("#voltarLogin").trigger("click")
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



    //apertando o botão login
    $('#btn-login').click(function () {

        $("#credenciaisIncorretas").fadeOut("fast", function () {
            $("#camposEmBranco").fadeOut("fast", function () {

                let email = document.getElementById('email').value
                let senha = document.getElementById('senha').value
                if (email.length > 0 && senha.length > 0) {

                    if (email == 'teste' && senha == '123') {

                        window.location.href = 'dashboard.html'
                    }
                    else {
                        $("#credenciaisIncorretas").fadeIn("slow")
                    }
                } else {
                    $("#camposEmBranco").fadeIn("slow")
                }
            })
        })



    })

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

                                if (email != "aa"/*aqui vai um método bool da api que verifica se o email já tem cadastro */) {


                                    if (senha.length >= 8) {

                                        if (senha == confirmarSenha) {



                                            //para enviar para a API
                                            const objetoPost = {
                                                "nome": nome,
                                                "sobrenome": sobrenome,
                                                "email": email,
                                                "senha": btoa(senha)
                                            }



                                        }
                                        else {
                                            $("#senhasDivergentes").fadeIn("slow", function () { })
                                        }
                                    } else {
                                        $("#senhaCurta").fadeIn("slow", function () { })
                                    }
                                } else {
                                    $("#emailExistente").fadeIn("slow", function () { })
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


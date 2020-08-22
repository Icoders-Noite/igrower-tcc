window.onload = function () {


    //apertando o botão login
    let btnLogin = document.querySelector('#btn-login');
    btnLogin.addEventListener('click', () => {
        let email = document.getElementById('email').value
        let senha = document.getElementById('senha').value

        if (email == 'teste' && senha == '123') {
            window.location.href = 'dashboard.html'
        }
        else {
            let mensagem = document.getElementsByClassName('erroInputLogin')[0]
            mensagem.style.display = 'flex'
        }
    }, false)

    //abrir o cadastro e fechar login
    $("#abrirCadastro").click(function () {


        $("#login").fadeOut("slow", function () {
            $("#cadastro").fadeIn("slow");

        })

        document.title = "Cadastro"
    })

    //fechar cadastro  e abrir login
    $("#voltarLogin").click(function () {


        $("#cadastro").fadeOut("slow", function () {
            $("#login").fadeIn("slow");

        })

        document.title = "Login"
    })

    //botão cadastrar 

    let btnCadastro = document.querySelector('#btn-cadastro');
    btnCadastro.addEventListener('click', () => {
        let email = document.getElementById('emailCadastro').value
        let nome = document.getElementById('nome').value
        let sobrenome = document.getElementById('sobrenome').value
        let senha = document.getElementById('senhaCadastro').value
        let confirmarSenha = document.getElementById('confirmarSenha').value
        if (email.length > 0 && nome.length > 0 && sobrenome.length > 0 && senha.length > 0 && confirmarSenha.length > 0) {
            $("#dadosNaoPreenchidos").fadeOut("slow", function () { })
            if (email != "aa") {

                $("#emailExistente").fadeOut("slow", function () { })
                if (senha.length >= 8) {
                    $("#senhaCurta").fadeOut("slow", function () { })
                    if (senha == confirmarSenha) {

                        $("#senhasDivergentes").fadeOut("slow", function () { })

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


    }, false)

}

$("#btn-gerar-config").click(function () {

    let ssid = $("#ssid").val()
    let senha = $("#senhaWifi").val()
    let minHumidity = $("#minHumidity").children("option:selected").val()
    let autoMode = $("#autoMode").children("option:selected").val()


    if (senha.length > 0 && ssid.length > 0 && minHumidity != "-1" && minHumidity != "0" && autoMode != "-1") {
        alert("Salve o arquivo de configurações dentro do cartão SD do Igrower e selecione para substituir arquivo")
        salvar(`${ssid}\n${senha}\n${minHumidity}\n${autoMode}\n`)
       
    } else {
        alert("Opções inválidas")
    }



})


function salvar(config) {

    let blob = new Blob(Array.from(config), { type: "text/plain;charset=utf-8" });
    saveAs(blob, "CONFIG" + ".txt");
}

$("#minHumidity")
    .change(function () {
        let selecionado = $(this).children("option:selected").val()
        if (selecionado == "-1") {
            $("#minHumidityManual").fadeIn("slow")
        }
    })
    .trigger("change");


let adicionouItens = false
$("#minHumidityManual").change("mousestop", function () {


    if (adicionouItens) {
        $("#itemAdicionado").remove()
    }
    let value = $("#minHumidityManual").val()
    let valueText = `${value}%`
    $("#minHumidity").append(new Option(valueText, value))
    $("#minHumidity").children(":last-child").attr("id", "itemAdicionado").attr('selected', 'selected');
    adicionouItens = true
});

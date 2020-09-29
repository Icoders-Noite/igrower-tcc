function loadConfig() {
    $('#configArduino').html('<iframe id="iframeConfig" src="gerar-configuracoes.html"></iframe>');
}

$('#abrirConfig').click(function () { 
   loadConfig()

});
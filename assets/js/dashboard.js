//<![CDATA[
$(window).on('load', function () {
    $('#preloader .inner').fadeOut();
    $('#preloader').delay(350).fadeOut('slow');
    $('body').delay(350).css({ 'overflow': 'visible' });
})
//]]>

function loadConfig() {
    $('#configArduino').html('<iframe id="iframeConfig" src="gerar-configuracoes.html"></iframe>');
}

$('#abrirConfig').click(function () {
    loadConfig()

});

var ctx = document.getElementById('graficos-dashboard').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Umidade Solo', 'Umidade Solo'],
        datasets: [{
            data: [12, 19, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend: {
            display: false
         },
         tooltips: {
            enabled: false
         }
        
    }
});
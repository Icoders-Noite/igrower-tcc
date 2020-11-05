//<![CDATA[
$(window).on('load', function () {
    $('#preloader .inner').fadeOut()
    $('#preloader').delay(350).fadeOut('slow')
    $('body').delay(350).css({ 'overflow': 'visible' })


    var Requester = window.setInterval(getSensores, 60000)

})
//]]>
function getSensores() {

    const credentials = {
        "id_user":  localStorage.getItem("id")
    }
    $.ajax({


        url: hostApi + '/get-status-sensores',
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
            fillCharts(data)
        },  
        error: function (data) {
            console.log(data);
         
        }
       
    });

}

function fillCharts(data) {
    var result = data.resultado[0]
    chartDough(result.umidade_solo, 'graficos-solo-dashboard', 'Umidade - Solo', 'Solo');
    chartDough(result.umidade_ar, 'graficos-ar-dashboard', 'Umidade - Ar', 'Ar');
    chartTemperatureDough(result.temperatura, 'graficos-temperatura-dashboard')
}
function loadConfig() {
    $('#configArduino').html('<iframe id="iframeConfig" src="gerar-configuracoes.html"></iframe>');
}

$('#abrirConfig').click(function () {
    loadConfig()
});

function chartDough(data, element, label, tipo) {

    var ctx = document.getElementById(element).getContext('2d');
    if (tipo == 'Solo') {
        var corUmidade = switchCorUmidadeSolo(data)
    } else {
        var corUmidade = switchCorUmidadeAr(data)
    }
    var corResto = 'rgba(242, 242, 242,0.2)'
    var resto = 100 - data
    var options = {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
            center: {
                text: `Umidade ${tipo}: ${data}%`,
                color: corUmidade, // Default is #000000
                fontStyle: 'Arial', // Default is Arial
                sidePadding: 20, // Default is 20 (as a percentage)
                minFontSize: 20, // Default is 20 (in px), set to false and text will not wrap.
                lineHeight: 25 // Default is 25 (in px), used for when text wraps
            },
            legend: {
                display: false
            }
        }
    }
    var dataSolo = {
        labels: [label],
        datasets: [{
            data: [data, resto],
            backgroundColor: [
                corUmidade, corResto

            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 0,
        }]
    }
    Chart.defaults.global.legend.display = false
    Chart.defaults.global.tooltips.enabled = false
    Chart.defaults.global.plugins.datalabels.display = false
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: dataSolo,
        options: options,



    }
    );
    Chart.pluginService.register({
        beforeDraw: function (chart) {
            if (chart.config.options.elements.center) {
                // Get ctx from string
                var ctx = chart.chart.ctx;

                // Get options from the center object in options
                var centerConfig = chart.config.options.elements.center;
                var fontStyle = centerConfig.fontStyle || 'Arial';
                var txt = centerConfig.text;
                var color = centerConfig.color || '#000';
                var maxFontSize = centerConfig.maxFontSize || 75;
                var sidePadding = centerConfig.sidePadding || 20;
                var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
                // Start with a base font of 30px
                ctx.font = "30px " + fontStyle;

                // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                var stringWidth = ctx.measureText(txt).width;
                var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

                // Find out how much the font can grow in width.
                var widthRatio = elementWidth / stringWidth;
                var newFontSize = Math.floor(30 * widthRatio);
                var elementHeight = (chart.innerRadius * 2);

                // Pick a new font size so it will not be larger than the height of label.
                var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
                var minFontSize = centerConfig.minFontSize;
                var lineHeight = centerConfig.lineHeight || 25;
                var wrapText = false;

                if (minFontSize === undefined) {
                    minFontSize = 20;
                }

                if (minFontSize && fontSizeToUse < minFontSize) {
                    fontSizeToUse = minFontSize;
                    wrapText = true;
                }

                // Set font settings to draw it correctly.
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
                var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
                ctx.font = fontSizeToUse + "px " + fontStyle;
                ctx.fillStyle = color;

                if (!wrapText) {
                    ctx.fillText(txt, centerX, centerY);
                    return;
                }

                var words = txt.split(' ');
                var line = '';
                var lines = [];

                // Break words up into multiple lines if necessary
                for (var n = 0; n < words.length; n++) {
                    var testLine = line + words[n] + ' ';
                    var metrics = ctx.measureText(testLine);
                    var testWidth = metrics.width;
                    if (testWidth > elementWidth && n > 0) {
                        lines.push(line);
                        line = words[n] + ' ';
                    } else {
                        line = testLine;
                    }
                }

                // Move the center up depending on line height and number of lines
                centerY -= (lines.length / 2) * lineHeight;

                for (var n = 0; n < lines.length; n++) {
                    ctx.fillText(lines[n], centerX, centerY);
                    centerY += lineHeight;
                }
                //Draw text in center
                ctx.fillText(line, centerX, centerY);
            }
        }
    });

    myChart.update();
}

function chartTemperatureDough(data, element) {
    var bar_ctx = document.getElementById(element);
    var bar_chart = new Chart(bar_ctx, {
        type: 'horizontalBar',
        data: {
            labels: [],
            datasets: [{
                data: [data],
                backgroundColor: switchCorTemperatura(data),
                datalabels: {
                    color: 'white'                    		//Color for percentage value
                }
            }, {
                data: [45 - data],
                backgroundColor: "lightgrey",
                hoverBackgroundColor: "lightgrey",
                datalabels: {
                    color: 'lightgray' 									// Make the color of the second bar percentage value same as the color of the bar
                }
            },]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            },
            scales: {
                xAxes: [{
                    display: false,
                    stacked: true
                }],
                yAxes: [{
                    display: false,
                    stacked: true
                }],
            }, // scales
            plugins: {																	// PROVIDE PLUGINS where you can specify custom style
                datalabels: {
                    display: true,
                    align: "start",
                    anchor: "end",
                    backgroundColor: null,
                    borderColor: null,
                    borderRadius: 4,
                    borderWidth: 1,
                    font: {
                        size: 20,
                        weight: "bold",											//Provide Font family for fancier look
                    },
                    offset: 10,
                    formatter: function (value, context) {
                        return context.chart.data.labels[context.dataIndex];		//Provide value of the percentage manually or through data
                    },
                },
            },
        }, // options
    });
}

function switchCorUmidadeAr(data) {

    if (data <= 40) {

        return 'rgba(252,30,68,0.8)'
    } else {
        if (data > 40 && data < 50) {
            return 'rgba(255, 237, 71,0.8)'

        } else {

            return 'rgba(90, 255, 71,0.8)'
        }
    }

}

function switchCorUmidadeSolo(data) {

    if (data <= 10) {

        return 'rgba(199,80,107,0.8)'
    } else {
        return 'rgba(0, 132, 184,0.8)'
    }

}

function switchCorTemperatura(data) {
    if (data <= 12) {
        return 'rgba(0,0,255,0.8)'
    } else {
        if (data > 12 && data < 24) {
            return 'rgba(0,255,0,0.8)'
        } else {
            return 'rgba(255,0,0,0.8)'
        }
    }
}

document.getElementById('icone-menu-dashboard').addEventListener("click", function(){
    let menu = document.getElementById('left-section-dashboard')
    let barra = document.getElementById('mobile-nav')
    if(menu.style.display == 'none' || menu.style.display == "" ){
        menu.style.display = 'flex'
        barra.style.background = "#1F2E52"
    }else{
        menu.style.display = 'none'
        barra.style.background = "#36777A"
    }
})


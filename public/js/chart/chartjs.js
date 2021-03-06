var ctx = document.getElementById("statisticChart");

var statisticChart = new Chart(ctx, {
    type: 'bar',
    data : {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    
    option : {
        scales : {
            yAxes : [{
                ticks:{
                    beginAtZero:true
                }
            }]
        }
    }
});

// 


var DATA_COUNT = 16;
var MIN_XY = -150;
var MAX_XY = 100;

var presets = window.chartColors;
var utils = Samples.utils;

utils.srand(110);

function colorize(opaque, context) {
    var value = context.dataset.data[context.dataIndex];
    var x = value.x / 100;
    var y = value.y / 100;
    var r = x < 0 && y < 0 ? 250 : x < 0 ? 150 : y < 0 ? 50 : 0;
    var g = x < 0 && y < 0 ? 0 : x < 0 ? 50 : y < 0 ? 150 : 250;
    var b = x < 0 && y < 0 ? 0 : x > 0 && y > 0 ? 250 : 150;
    var a = opaque ? 1 : 0.5 * value.v / 1000;

    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}

function generateData() {
    var data = [];
    var i;

    for (i = 0; i < DATA_COUNT; ++i) {
        data.push({
            x: utils.rand(MIN_XY, MAX_XY),
            y: utils.rand(MIN_XY, MAX_XY),
            v: utils.rand(0, 1000)
        });
    }

    return data;
}

var data = {
    datasets: [{
        data: generateData()
    }, {
        data: generateData()
    }]
};

var options = {
    aspectRatio: 1,
    legend: false,
    tooltips: false,

    elements: {
        point: {
            backgroundColor: colorize.bind(null, false),

            borderColor: colorize.bind(null, true),

            borderWidth: function(context) {
                return Math.min(Math.max(1, context.datasetIndex + 1), 8);
            },

            hoverBackgroundColor: 'transparent',

            hoverBorderColor: function(context) {
                return utils.color(context.datasetIndex);
            },

            hoverBorderWidth: function(context) {
                var value = context.dataset.data[context.dataIndex];
                return Math.round(8 * value.v / 1000);
            },

            radius: function(context) {
                var value = context.dataset.data[context.dataIndex];
                var size = context.chart.width;
                var base = Math.abs(value.v) / 1000;
                return (size / 24) * base;
            }
        }
    }
};

var chart = new Chart('chart-0', {
    type: 'bubble',
    data: data,
    options: options
});

function randomize() {
    chart.data.datasets.forEach(function(dataset) {
        dataset.data = generateData()
    });
    chart.update();
}

function addDataset() {
    chart.data.datasets.push({
        data: generateData()
    });
    chart.update();
}

function removeDataset() {
    chart.data.datasets.shift();
    chart.update();
}
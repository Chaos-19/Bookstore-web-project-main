var options = {
  chart: {
    type: 'bar',
    height: 250,
    width: '100%',
    foreColor: '#333',
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      horizontal: false, // Set to true for vertical bars
      columnWidth: '40%', // Adjust the width of the bars
      borderRadius: 10,
      borderRadiusApplication: 'end', // or 'rounded' for rounded bars


    }
  },
  colors: ['#FF5733', '#FFC300', '#36A2EB', '#4CAF50', '#E91E63', '#9C27B0', '#00BCD4', '#FF9800', '#8BC34A'],
  series: [{
    name: 'Sales',
    data: [44, 55, 57, 56, 61, 58, 63]
  }],
  xaxis: {
    categories: ['s', 'm', 't', 'w', 't', 'f', 's'],
    labels: {
      style: {
        fontSize: '12px',
        colors: '#777',
        borderTopRadius: '10px'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '14px',
        colors: '#777'
      }
    }
  }
};

var chart = new ApexCharts(document.querySelector("#apex-chart"), options);
chart.render();


window.Apex = {
  chart: {
    foreColor: '#fff',
    toolbar: {
      show: false
    },
  },
  colors: ['#FCCF31', '#17ead9', '#f02fc2'],
  stroke: {
    width: 3
  },
  dataLabels: {
    enabled: false
  },
  grid: {
    borderColor: "#40475D",
  },
  xaxis: {
    axisTicks: {
      color: '#333'
    },
    axisBorder: {
      color: "#333"
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      gradientToColors: ['#F55555', '#6078ea', '#6094ea']
    },
  },
  tooltip: {
    theme: 'dark',
    x: {
      formatter: function(val) {
        return moment(new Date(val)).format("HH:mm:ss")
      }
    }
  },
  yaxis: {
    decimalsInFloat: 2,
    opposite: true,
    labels: {
      offsetX: -10
    }
  }
};

var trigoStrength = 3
var iteration = 11

function getRandom() {
  var i = iteration;
  return (Math.sin(i / trigoStrength) * (i / trigoStrength) + i / trigoStrength + 1) * (trigoStrength * 2)
}

function getRangeRandom(yrange) {
  return Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
}

function generateMinuteWiseTimeSeries(baseval, count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = baseval;
    var y = ((Math.sin(i / trigoStrength) * (i / trigoStrength) + i / trigoStrength + 1) * (trigoStrength * 2))

    series.push([x, y]);
    baseval += 300000;
    i++;
  }
  return series;
}



function getNewData(baseval, yrange) {
  var newTime = baseval + 300000;
  return {
    x: newTime,
    y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
  }
}

var optionsLine = {
  chart: {
    height: 100,
    width: "100%",
    type: 'line',
    stacked: true,
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: 500
      }
    },
    dropShadow: {
      enabled: true,
      opacity: 0.3,
      blur: 5,
      left: -7,
      top: 22
    },
    events: {
      animationEnd: function(chartCtx, opts) {
        const newData1 = chartCtx.w.config.series[0].data.slice()
        newData1.shift()
        const newData2 = chartCtx.w.config.series[1].data.slice()
        newData2.shift()

        // check animation end event for just 1 series to avoid multiple updates
        if (opts.el.node.getAttribute('index') === '0') {
          window.setTimeout(function() {
            chartCtx.updateOptions({
              series: [{
                data: newData1
              }, {
                data: newData2
              }],
              subtitle: {
                text: parseInt(getRandom() * Math.random()).toString(),
              }
            }, false, false)
          }, 300)
        }

      }
    },
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight',
    width: 5,
  },

  grid: {
    show: false,
    padding: {
      left: -5,
      right: -45,
      bottom: -30,
    }
  },
  markers: {
    size: 0,
    hover: {
      size: 0
    }
  },
  series: [{
    name: 'Running',
    data: generateMinuteWiseTimeSeries(new Date("12/12/2016 00:20:00").getTime(), 12, {
      min: 30,
      max: 110
    })
  }, {
    name: 'Waiting',
    data: generateMinuteWiseTimeSeries(new Date("12/12/2016 00:20:00").getTime(), 12, {
      min: 30,
      max: 110
    })
  }],
  xaxis: {
    type: 'datetime',
    range: 2700000
  },
  title: {
    text: 'Processes',
    align: 'left',
    style: {
      fontSize: '12px'
    }
  },
  subtitle: {
    text: '20',
    floating: true,
    align: 'right',
    offsetY: 0,
    style: {
      fontSize: '22px'
    }
  },
  legend: {
    show: false,
    floating: true,
    horizontalAlign: 'left',
    onItemClick: {
      toggleDataSeries: false
    },
    position: 'top',
    offsetY: -28,
    offsetX: 60
  },

}

var chartLine = new ApexCharts(
  document.querySelector("#linechart"),
  optionsLine
);
chartLine.render()



window.setInterval(function() {

  iteration++;

  chartLine.updateSeries([{
    data: [...chartLine.w.config.series[0].data,
      [
        chartLine.w.globals.maxX + 300000,
        getRandom()
      ]
    ]
  }, {
    data: [...chartLine.w.config.series[1].data,
      [
        chartLine.w.globals.maxX + 300000,
        getRandom()
      ]
    ]
  }])


}, 3000);
document.addEventListener('DOMContentLoaded', function() {
    function yourFunctionName() {
      // Your function's code here 
      const collapseNav = document.querySelector('#nav-collpsed');

      collapseNav.classList.remove('collapse');
      collapseNav.classList.remove('navbar-collapse');
      console.log(collapseNav);
    }

    function expandNavbarOnBreakpoint() {
      const navbarCollapse = document.getElementById('nav-collpsed');
      const mediaQuery = window.matchMedia('(min-width: 768px)');

      function handleMediaQueryChange(e) {
        if (e.matches) {
          yourFunctionName()
        } else {
          navbarCollapse.classList.remove('show');
        }
      }
      handleMediaQueryChange(mediaQuery);
      mediaQuery.addListener(handleMediaQueryChange);
    }
    expandNavbarOnBreakpoint();
  }
)
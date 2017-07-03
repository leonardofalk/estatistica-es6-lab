var _chart1 = null,
  _chart2 = null;

export function chartModule(vals) {
  createHistogram(vals);
  createFrequencyPolygon(vals);
}

function createHistogram(vals) {
  let container = document.getElementById('histograma').getContext('2d');

  if (_chart1 === null) {
    _chart1 = new Chart(container, {
      type: 'bar',
      data: {
        labels: vals.map(String),
        datasets: [
          {
            data: vals,
            backgroundColor: vals.map(function() {
              return '#3F4FFF'
            }),
            borderWidth: 0
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                barPercentage: 1.0,
                categoryPercentage: 1.0
              }
            }
          ],
          xAxes: [
            {
              categoryPercentage: 1,
              barPercentage: 1,
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  } else {
    _chart1.destroy();
    _chart1 = null;
    createHistogram(vals);
  }
}

function createFrequencyPolygon(vals) {
  let container = document.getElementById('poligono_frequencia');
  vals.push(0)
  vals = arrayReverse(vals)
  vals.push(0)

  if (_chart2 === null) {
    _chart2 = new Chart(container, {
      type: 'line',
      data: {
        labels: vals.map(String),
        datasets: [
          {
            data: vals,
            borderColor: '#3F4FFF'
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  } else {
    _chart2.destroy();
    _chart2 = null;
    createFrequencyPolygon(vals);
  }
}

function arrayReverse(vals) {
  let result = []

  for (let x of vals) {
    result.push(x)
  }

  return result.reverse();
}

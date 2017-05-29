export function chartModule(vals) {
  createHistogram(vals);
  createFrequencyPolygon(vals);
}

function createHistogram(vals) {
  let container = document.getElementById('histograma').getContext('2d');

  console.info(vals);

  let chart = new Chart(container, {
    type: 'bar',
    data: {
      labels: vals.map(String),
      datasets: [{
        data: vals,
        backgroundColor: vals.map(function() { return '#3F4FFF' }),
        borderWidth: 0,

      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function createFrequencyPolygon(vals) {
  let container = document.getElementById('poligono_frequencia');

  let chart = new Chart(container, {
    type: 'line',
    data: {
      labels: vals.map(String),
      datasets: [{
        data: vals,
        backgroundColor: vals.map(function() { return '#3F4FFF' }),
        borderWidth: 0,

      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

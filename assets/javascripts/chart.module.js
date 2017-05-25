export function chartModule(vals) {
  createHistogram(vals);
  createOgive(vals);
  createFrequencyPolygon(vals);
}

function createHistogram(vals) {
  let container = document.getElementById('histograma');

  let chart = new Chart(container, {
    type: 'bar',
    labels: vals.map(String),
    data: vals,
    backgroundColor: ['#3F4FFF'],
    borderColor: ['#3F4FFF'],
    borderWidth: 1,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function createOgive(vals) {
  let container = document.getElementById('ogiva_chart');

  let chart = new Chart(container, {
    type: 'bar',
    labels: vals.map(String),
    data: vals,
    backgroundColor: ['#3F4FFF'],
    borderColor: ['#3F4FFF'],
    borderWidth: 1,
    options: {
      scales: {
        yAxes: [{
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
    type: 'bar',
    labels: vals.map(String),
    data: vals,
    backgroundColor: ['#3F4FFF'],
    borderColor: ['#3F4FFF'],
    borderWidth: 1,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

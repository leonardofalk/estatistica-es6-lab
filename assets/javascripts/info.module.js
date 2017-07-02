import {sprintf} from 'sprintf-js';

export function infoModule(vals) {
  vals = vals || [];

  document.getElementById('conjunto').innerHTML = sprintf(`{ %s }`, vals.join(', '));

  let media = calculaMediaAritmetica(vals)

  document.getElementById('media_aritmetica').innerHTML = media;

  document.getElementById('media_geometrica').innerHTML = calculaMediaGeometrica(vals);

  document.getElementById('mediana').innerHTML = calculaMediana(vals);

  document.getElementById('moda').innerHTML = calculaModa(vals);

  let desvios = calculaDesvios(vals, media);

  document.getElementById('desvio_populacional').innerHTML = sprintf("%.2f", desvios.populacional);

  document.getElementById('desvio_amostral').innerHTML = sprintf("%.2f", desvios.amostral);

  document.getElementById('coeficiente_variacao').innerHTML = calculaCoeficienteVariacao(desvios.amostral, media)
}

function calculaDesvios(vals, media) {
  let cals = vals.map(num => Math.abs(num - media) ** 2.0).reduce((a, b) => a + b);

  return {
    amostral: (cals / vals.length) ** 0.5,
    populacional: (cals / (vals.length - 1)) ** 0.5
  }
}

function calculaCoeficienteVariacao(desvio, media) {
  return sprintf(`%.2f`, desvio / media * 100.0);
}

function calculaMediaAritmetica(vals) {
  return sprintf(`%.2f`, vals.reduce((a, b) => {
    return a + b;
  }) / vals.length);
}

function calculaMediaGeometrica(vals) {
  let value = vals.reduce((a, b) => {
    return a * b;
  });

  return sprintf(`%.2f`, Math.pow(value, 1 / vals.length));
}

function calculaMediana(vals) {
  let mid = (Math.floor(vals.length / 2) + vals.length % 2) - 1;

  if (vals.length % 2 == 0) {
    return sprintf(`%.2f`, (vals[mid] + vals[mid + 1]) / 2);
  } else {
    return vals[mid];
  }
}

function calculaModa(vals) {
  let min = Math.min.apply(null, vals);
  let max = Math.max.apply(null, vals);
  let counted = [];
  let answer = [],
    maxModa = -1;

  for (var i = min; i <= max; i++) {
    counted[i] = {
      val: i,
      count: 0
    };
  }

  for (let num of vals) {
    counted[num].count++
  }

  let sortedCount = counted.sort((a, b) => {
    return a.count - b.count;
  }).reverse().filter((a) => {
    return a.hasOwnProperty('val');
  });

  if (sortedCount.length > 1) {
    for (let num of sortedCount) {
      if (num.count > 1 && num.count >= maxModa) {
        answer.push(num.val);
        maxModa = num.count;
      }
    }
  }

  return answer.length > 0
    ? answer.join(', ')
    : 'Amodal';
}

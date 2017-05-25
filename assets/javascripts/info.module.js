import { sprintf } from 'sprintf-js';

export function infoModule(vals) {
  vals = vals || [];

  document
    .getElementById('conjunto')
    .innerHTML = sprintf(`<b>S</b> = { %s }`, vals.join(', '));

  document
    .getElementById('media_aritmetica')
    .innerHTML = calculaMediaAritmetica(vals);

  document
    .getElementById('media_geometrica')
    .innerHTML = calculaMediaGeometrica(vals);

  document
    .getElementById('mediana')
    .innerHTML = calculaMediana(vals);

  document
    .getElementById('moda')
    .innerHTML = calculaModa(vals);
}

function calculaMediaAritmetica(vals) {
  return sprintf(`%.2f <small class="text-muted">= (%s) / %d`, vals.reduce((a, b) => { return a + b; }) / vals.length, vals.join(' + '), vals.length);
}

function calculaMediaGeometrica(vals) {
  let value = vals.reduce((a, b) => {
    return a * b;
  });

  return sprintf(`%.2f <small class="text-muted">= (%s) ^ 1/%d`, Math.pow(value, 1 / vals.length), vals.join(' x '), vals.length);
}

function calculaMediana(vals) {
  let mid = (Math.floor(vals.length / 2) + vals.length % 2) - 1;

  if (vals.length % 2 == 0) {
    return sprintf(`%.2f <small class="text-muted">= %d + %d / 2</small>`, (vals[mid] + vals[mid + 1]) / 2, vals[mid], vals[mid + 1]);
  } else {
    return vals[mid];
  }
}

function calculaModa(vals) {
  let min = Math.min.apply(null, vals);
  let max = Math.max.apply(null, vals);
  let counted = [];
  let answer = [], maxModa = -1;

  for (var i = min; i<= max; i++) {
    counted[i] = {val: i, count: 0};
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

  return answer.length > 0 ? answer.join(', ') : 'Amodal';
}

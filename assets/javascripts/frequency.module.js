import 'bootstrap-sass/assets/javascripts/bootstrap';

$('[data-toggle=tooltip]').tooltip();

export function frequencyModule(vals) {
  let totalSum = vals.reduce((a, b) => { return a + b });
  let media = totalSum / vals.length;
  let intervals = calcIntervals(vals);

  let tableInfo = intervals.map((interval) => {
    let min = interval.min, max = interval.max;;

    return {
      interval: sprintf('%03d ├─ %03d', min, max),
      frequency: vals.map((n) => {
        return (n <= max && n >= min) ? 1 : 0;
      }).reduce((a, b) => {
        return a + b;
      })
    };
  });

  let totalFrequency = tableInfo.map((num) => {
    return num.frequency;
  }).reduce((a, b) => { return a + b; });
  let acumulatedFrequency = 0;

  tableInfo.map((e) => {
    let frequencyPercent = Math.min(e.frequency * 100 / totalFrequency, 100.0);
    acumulatedFrequency += e.frequency;
    let acumulatedFrequencyPercent = Math.min(acumulatedFrequency * 100 / totalFrequency, 100);

    return $.extend(e, {
      frequencyPercent: frequencyPercent,
      acumulatedFrequency: acumulatedFrequency,
      acumulatedFrequencyPercent: acumulatedFrequencyPercent
    });
  });

  let tableHTML = [];

  for (let tableRow of tableInfo) {
    tableHTML.push(sprintf(`
    <tr>
      <td>%3s</td>
      <td>%3d</td>
      <td>%.2f</td>
      <td>%d</td>
      <td>%.2f</td>
    </tr>
    `, tableRow.interval,
       tableRow.frequency,
       tableRow.frequencyPercent,
       tableRow.acumulatedFrequency,
       tableRow.acumulatedFrequencyPercent
    ));
  }

  tableHTML.push(sprintf(`
    <tr>
      <td><b>Total</b> %d</td>
      <td>%d</td>
      <td>%.2f</td>
      <td>-</td>
      <td>-</td>
    </tr>
  `, totalSum, totalFrequency, 100.0));

  document.getElementById('frequency_table').innerHTML = tableHTML.join("\n");
}

function calcIntervals(vals) {
  let intervals = vals.slice(0).sort((a, b) => {
    return parseInt(a || 0, 10) - parseInt(b || 0, 10);
  });
  let maxNum = intervals[intervals.length - 1];
  let minNum = intervals[0];
  let groupCount  = Math.round(1 + 3.22 * Math.log10(intervals.length));
  let groupLength = (maxNum - minNum) / groupCount;
  let result = [], n = minNum;

  for (let i = 0; i < groupCount; i++) {
    result[i] = {min: Math.round(n), max: Math.round(Math.min(n + groupLength, maxNum))}
    n += groupLength + 1;
  }

  return result;
}

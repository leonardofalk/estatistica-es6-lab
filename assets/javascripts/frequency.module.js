import 'bootstrap-sass/assets/javascripts/bootstrap';

export function frequencyModule(vals) {
  let media = vals.reduce((a, b) => { return a + b });
  let total = 0, totald = 0, totald2 = 0;
  let intervals = calcIntervals(vals);

  let tableInfo = intervals.map((interval) => {
    let min = interval.min, max = interval.max;

    return {
      interval: sprintf('%d ├── %d', min, max),
      frequency: vals.map((n) => {
        return (n <= max && n >= min) ? 1 : 0;
      }).reduce((a, b) => {
        return a + b;
      }),
    };
  });

  tableInfo[tableInfo.length] = {
    interval: '-',
    frequency: tableInfo.map((num) => {
      return num.frequency;
    }).reduce((a, b) => { return a + b; })
  }

  let tableHTML = [];

  for (let tableRow of tableInfo) {
    tableHTML.push(sprintf(`
    <tr>
      <td>%s</td>
      <td>%d</td>
    </tr>
    `, tableRow.interval, tableRow.frequency));
  }

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

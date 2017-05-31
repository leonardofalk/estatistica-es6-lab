import 'bootstrap-sass/assets/javascripts/bootstrap';

export function frequencyModule(vals) {
  let media = vals.reduce((a, b) => { return a + b });
  let total = 0, totald = 0, totald2 = 0;

  let tableInfo = vals.map((number) => {
    let d = Math.abs(number - media);

    total += number;
    totald += d;
    totald2 += d ** 2;

    return {number: number, d: d, d2: d ** 2};
  });

  tableInfo.push({number: total, d: totald, d2: totald2});

  let tableHTML = [];

  for (let tableRow of tableInfo) {
    tableHTML.push(sprintf(`
    <tr>
      <td>%.2f</td>
      <td>%.2f</td>
      <td>%.2f</td>
    </tr>
    `, tableRow.number, tableRow.d, tableRow.d2));
  }

  document.getElementById('frequency_table').innerHTML = tableHTML.join("\n");
}

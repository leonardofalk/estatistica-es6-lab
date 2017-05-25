import { infoModule } from './info.module';
import { frequencyModule } from './frequency.module';
import { chartModule } from './chart.module';

for (let ev of ['change', 'keypress', 'keydown', 'keyup']) {
  document.getElementById('entrada').addEventListener(ev, function() {
    let inputVals = this.value.trim().split(/\s+/).map(Number).sort((a, b) => {
      return parseInt(a || 0, 10) - parseInt(b || 0, 10);
    });

    infoModule(inputVals);
    // frequencyModule(inputVals);
    chartModule(inputVals);
  });
}

document.getElementById('example_run').addEventListener('click', () => {
  document.getElementById('entrada').value = '';
  let values = '5 10 13 2 8 25 17 20'.split(/\s+/);

  for (let number of values) {
    document.getElementById('entrada').value = document.getElementById('entrada').value + number + ' ';
  }

  document.getElementById('entrada').dispatchEvent(new CustomEvent('change'));
});

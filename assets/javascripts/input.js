import { infoModule } from './info.module';
import { frequencyModule } from './frequency.module';
import { chartModule } from './chart.module';

for (let ev of ['change', 'keyup', 'keydown']) {
  document.getElementById('entrada').addEventListener(ev, function() {
    let inputVals = this.value.trim().split(/\s+/).map(Number);
    let sortedVals = inputVals.slice(0).sort((a, b) => {
      return parseInt(a || 0, 10) - parseInt(b || 0, 10);
    });

    frequencyModule(inputVals);
    chartModule(inputVals);
    infoModule(sortedVals);
  });
}

document.getElementById('example_run').addEventListener('click', () => {
  document.getElementById('entrada').value = '';
  let values = Array(Math.max(Math.floor(Math.random() * 10), 6));
  for (let i = 0; i < values.length; i++) {
    values[i] = Math.floor(Math.random() * 50);
  }

  document.getElementById('entrada').value = values.join(' ');
  document.getElementById('entrada').dispatchEvent(new CustomEvent('change'));
});

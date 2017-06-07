import { infoModule } from './info.module';
import { frequencyModule } from './frequency.module';
import { chartModule } from './chart.module';

for (let ev of ['change', 'keyup', 'keydown']) {
  let $entrada = document.getElementById('entrada');

  $entrada.addEventListener(ev, () => {
    let inputVals = $entrada.value.trim().split(/\s+/).map(Number);
    let sortedVals = inputVals.slice(0).sort((a, b) => {
      return parseInt(a || 0, 10) - parseInt(b || 0, 10);
    });

    frequencyModule(inputVals);
    chartModule(inputVals);
    infoModule(sortedVals);
  });
}

document.getElementById('example_run').addEventListener('click', () => {
  let maxCount = parseInt(document.getElementById('random_amount').value, 10);
  let maxRandRange = parseInt(document.getElementById('max_random_range').value, 10);
  let minRandRange = parseInt(document.getElementById('min_random_range').value, 10);

  if (isNaN(maxCount))     { maxCount = 6; }
  if (isNaN(maxRandRange)) { maxRandRange = 100; }
  if (isNaN(minRandRange)) { minRandRange = 5; }

  document.getElementById('entrada').value = '';
  let values = Array(maxCount);

  for (let i = 0; i < values.length; i++) {
    values[i] = Math.floor(Math.random() * (maxRandRange - minRandRange + 1) + minRandRange);
  }

  document.getElementById('entrada').value = values.join(' ');
  document.getElementById('entrada').dispatchEvent(new CustomEvent('change'));
});

for (let input of ['random_amount', 'max_random_range', 'min_random_range']) {
  for (let ev of ['change', 'keyup', 'keydown']) {
    document.getElementById(input).addEventListener(ev, () => {
      document.getElementById('example_run').dispatchEvent(new CustomEvent('click'));
    });
  }
};

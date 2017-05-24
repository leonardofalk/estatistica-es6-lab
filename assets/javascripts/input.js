function checkInput() {
  let inputVals = this.value.split(/\s+/);

  console.info(inputVals);

  document.getElementById('saida').value = inputVals.join(' ');
}

for (let ev of ['change', 'keypress', 'keydown', 'keyup']) {
  document.getElementById('entrada').addEventListener(ev, checkInput);
}

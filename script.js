const display = document.getElementById('display');
let current = '';
let operator = null;
let previous = '';

function updateDisplay() {
  display.value = current || previous || '0';
}

function calculate() {
  if (!operator || previous === '' || current === '') return;
  const a = parseFloat(previous);
  const b = parseFloat(current);
  let result = 0;
  switch (operator) {
    case 'add': result = a + b; break;
    case 'subtract': result = a - b; break;
    case 'multiply': result = a * b; break;
    case 'divide': result = b === 0 ? 'Error' : a / b; break;
  }
  previous = String(result);
  current = '';
  operator = null;
}

document.querySelector('.keys').addEventListener('click', (e) => {
  const el = e.target;
  if (!el.matches('button')) return;

  const action = el.dataset.action;
  const value = el.textContent;

  if (!action) {
    // number or dot
    if (value === '.' && current.includes('.')) return;
    current = current === '0' ? value : current + value;
    updateDisplay();
    return;
  }

  if (action === 'clear') {
    current = '';
    previous = '';
    operator = null;
    updateDisplay();
    return;
  }

  if (action === 'equals') {
    calculate();
    updateDisplay();
    return;
  }

  // one of operators
  if (previous === '') {
    previous = current || '0';
    current = '';
    operator = action;
    updateDisplay();
    return;
  }

  // if operator already set, compute then set new operator
  if (operator) {
    calculate();
    operator = action;
    updateDisplay();
    return;
  }
});
updateDisplay();


(function() {
  const m = -0.666846000000;
  const b = 666.738384000000;
  const form = document.getElementById('calc-form');
  const xInput = document.getElementById('xInput');
  const yOutput = document.getElementById('yOutput');
  const roundToggle = document.getElementById('roundToggle');
  const decimals = document.getElementById('decimals');

  function compute() {
    const x = parseFloat(xInput.value);
    if (Number.isNaN(x)) {
      yOutput.textContent = '—';
      return;
    }
    let y = m * x + b;
    const d = parseInt(decimals.value, 10);
    if (roundToggle.checked) { y = Math.round(y); yOutput.textContent = y.toString(); }
    else { yOutput.textContent = Number.isFinite(d) ? y.toFixed(Math.max(0, Math.min(d, 10))) : y.toString(); }
  }

  form.addEventListener('submit', function(e) { e.preventDefault(); compute(); });
  xInput.addEventListener('input', compute);
  roundToggle.addEventListener('change', compute);
  decimals.addEventListener('input', compute);

  // Initialize
  compute();
})();

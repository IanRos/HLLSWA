(function () {
  "use strict";

  const m = -0.666846000000;
  const b = 666.738384000000;

  // Configurable bounds for meters (x)
  const X_MIN = 0;
  const X_MAX = 100000;

  const form = document.getElementById('calc-form');
  const xInput = document.getElementById('xInput');
  const yOutput = document.getElementById('yOutput');
  const roundToggle = document.getElementById('roundToggle');
  const decimals = document.getElementById('decimals');
  const errorEl = document.getElementById('error');

  function showError(msg) {
    if (errorEl) errorEl.textContent = msg; // textContent prevents XSS
    yOutput.textContent = '—';
  }

  function clearError() {
    if (errorEl) errorEl.textContent = '';
  }

  function parseFiniteNumber(value) {
    const n = Number(String(value).trim());
    return Number.isFinite(n) ? n : null;
  }

  function compute() {
    clearError();

    const x = parseFiniteNumber(xInput.value);
    if (x === null) {
      return showError('Meters must be a finite number.');
    }
    if (x < X_MIN || x > X_MAX) {
      return showError(`Meters must be between ${X_MIN} and ${X_MAX}.`);
    }

    const dRaw = parseFiniteNumber(decimals.value);
    const d = dRaw !== null && Number.isInteger(dRaw) ? Math.max(0, Math.min(dRaw, 10)) : null;
    if (d === null) {
      return showError('Decimal places must be an integer between 0 and 10.');
    }

    const y = m * x + b;
    if (!Number.isFinite(y)) {
      return showError('Computation resulted in a non-finite value.');
    }

    if (roundToggle.checked) {
      yOutput.textContent = Math.round(y).toString();
    } else {
      yOutput.textContent = y.toFixed(d);
    }
  }

  form.addEventListener('submit', function (e) { e.preventDefault(); compute(); });
  xInput.addEventListener('input', compute);
  roundToggle.addEventListener('change', compute);
  decimals.addEventListener('input', compute);

  // Initialize
  compute();
}());

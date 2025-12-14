
// HLL Artillery Calculator — WWII-themed UI & logic

// Derived constants from the provided tables
const FORMULAS = {
  SPA_US_RU_AXIS: { forward: m => (2/3) * (1000 - m), range: [200, 600] },
  SPA_UK_CHURCHILL: { forward: m => (4/9) * (1000 - m), range: [200, 600] },
  SPA_UK_BISHOP: { forward: m => (1/3) * (1000 - m), range: [200, 600] },
  FA_US_AXIS: { forward: m => 1001.525 - 0.237088 * m, range: [100, 1600] },
  FA_RU: { forward: m => 1141.375 - 0.213382 * m, range: [100, 1600] },
  FA_UK: { forward: m => 551.125 - 0.177794 * m, range: [100, 1600] },
};

const STEP2_OPTIONS = {
  SPA: [
    { value: 'SPA_US_RU_AXIS', label: 'US/Russia/Axis' },
    { value: 'SPA_UK_CHURCHILL', label: 'UK — Churchill' },
    { value: 'SPA_UK_BISHOP', label: 'UK — Bishop' },
  ],
  FA: [
    { value: 'FA_US_AXIS', label: 'US/Axis' },
    { value: 'FA_RU', label: 'Russia' },
    { value: 'FA_UK', label: 'UK' },
  ],
};

// Elements
const step1El = document.getElementById('step1');
const step2El = document.getElementById('step2');
const metersEl = document.getElementById('meters');
const minusBtn = document.getElementById('minusBtn');
const plusBtn = document.getElementById('plusBtn');
const spaAdjRow = document.getElementById('spaAdjRow');
const spaAdjEl = document.getElementById('spaAdj');
const adjMinusBtn = document.getElementById('adjMinusBtn');
const adjPlusBtn = document.getElementById('adjPlusBtn');
const wholeToggle = document.getElementById('wholeToggle');
const resultEl = document.getElementById('result');
const warningEl = document.getElementById('warning');
const resetBtn = document.getElementById('resetBtn');

// Utility: format MIL with precision
function formatMil(value, whole) {
  return whole ? Math.round(value) : Number(value.toFixed(1));
}

function populateStep2() {
  const cat = step1El.value;
  step2El.innerHTML = '';
  if (!cat) {
    step2El.disabled = true;
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = '— Select Step 1 first —';
    step2El.appendChild(opt);
    spaAdjRow.hidden = true; // hide SPA adjustment when none
    return;
  }
  step2El.disabled = false;
  STEP2_OPTIONS[cat].forEach(({ value, label }) => {
    const opt = document.createElement('option');
    opt.value = value; opt.textContent = label;
    step2El.appendChild(opt);
  });
  // Show/hide SPA adjustment
  spaAdjRow.hidden = cat !== 'SPA';
}

function getSelectedFormulaKey() {
  const key = step2El.value;
  return key && FORMULAS[key] ? key : null;
}

function isExtrapolatedMeters(key, meters) {
  const [minM, maxM] = FORMULAS[key].range;
  return meters < minM || meters > maxM;
}

function update() {
  const key = getSelectedFormulaKey();
  const cat = step1El.value;
  const meters = Number(metersEl.value);

  // Reset output if we lack required inputs
  if (!cat || !key || !Number.isFinite(meters)) {
    resultEl.textContent = 'MIL: —';
    warningEl.hidden = true;
    resultEl.classList.remove('extrapolated');
    return;
  }

  // Compute
  let mil = FORMULAS[key].forward(meters);
  // SPA additive adjustment: computed MIL − entered adjustment
  if (cat === 'SPA') {
    const adj = Number(spaAdjEl.value) || 0;
    mil -= adj; // negative adj adds; positive adj subtracts
  }

  const displayMil = formatMil(mil, wholeToggle.checked);
  resultEl.textContent = `MIL: ${displayMil}`;

  // Extrapolation handling
  const ex = isExtrapolatedMeters(key, meters);
  warningEl.hidden = true;
  resultEl.classList.remove('extrapolated');
  if (ex) {
    resultEl.classList.add('extrapolated');
    const extraText = cat === 'SPA'
      ? 'Reference range for self propelled artillery is 200–600 meters.'
      : 'Reference range for fixed artillery is 100–1600 meters.';
    warningEl.textContent = extraText;
    warningEl.hidden = false;
  }
}

// Event wiring
step1El.addEventListener('change', () => { populateStep2(); update(); });
step2El.addEventListener('change', update);

// Meters input: enforce integer-only and live update
metersEl.addEventListener('input', () => {
  const v = metersEl.value;
  if (v && v.includes('.')) {
    metersEl.value = String(Math.round(Number(v)) || 0);
  }
  update();
});

// Keyboard up/down support
metersEl.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') { e.preventDefault(); plusBtn.click(); }
  if (e.key === 'ArrowDown') { e.preventDefault(); minusBtn.click(); }
});

// Large +/- buttons for meters
plusBtn.addEventListener('click', () => {
  const v = Number(metersEl.value) || 0;
  metersEl.value = String(v + 1);
  update();
});
minusBtn.addEventListener('click', () => {
  const v = Number(metersEl.value) || 0;
  metersEl.value = String(Math.max(0, v - 1));
  update();
});

// SPA adjustment (integer, bounded) + large +/- buttons
spaAdjEl.addEventListener('input', () => {
  let v = Number(spaAdjEl.value) || 0;
  if (!Number.isFinite(v)) v = 0;
  v = Math.max(-1000, Math.min(1000, Math.round(v)));
  spaAdjEl.value = String(v);
  update();
});
adjPlusBtn.addEventListener('click', () => {
  let v = Number(spaAdjEl.value) || 0;
  v = Math.min(1000, v + 1);
  spaAdjEl.value = String(v);
  update();
});
adjMinusBtn.addEventListener('click', () => {
  let v = Number(spaAdjEl.value) || 0;
  v = Math.max(-1000, v - 1);
  spaAdjEl.value = String(v);
  update();
});

// Precision toggle
wholeToggle.addEventListener('change', update);

// Reset button — does NOT reset precision toggle
resetBtn.addEventListener('click', () => {
  step1El.value = '';
  populateStep2();
  metersEl.value = '';
  spaAdjEl.value = '0';
  resultEl.textContent = 'MIL: —';
  warningEl.hidden = true;
  resultEl.classList.remove('extrapolated');
});

// Initialize
populateStep2();
update();

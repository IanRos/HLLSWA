// ========================
// FORMULAS
// ========================

// NEW SPA (verified from latest data)
const SPA_FORMULAS = {
  SPA_US_USSR: { f: m => 0.66647 * m - 33.588, r: [200, 600] },
  SPA_AXIS: { f: m => 0.88838 * m - 78.059, r: [200, 500] },
  SPA_UK_CHURCHILL: { f: m => 1.04456 * m - 4.860, r: [100, 250] },
  SPA_UK_BISHOP: { f: m => 0.19518 * m + 10.846, r: [200, 800] }
};

// EXISTING FA (UNCHANGED — placeholder)
const FA_FORMULAS = {
  FA_US_AXIS: { f: m => 1001.525 - 0.237088 * m, r: [100, 1600] },
  FA_RUSSIA: { f: m => 1141.375 - 0.213382 * m, r: [100, 1600] },
  FA_UK: { f: m => 551.125 - 0.177794 * m, r: [100, 1600] }
};

// ========================
// ELEMENTS
// ========================
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const metersEl = document.getElementById('meters');
const adjEl = document.getElementById('spaAdj');
const adjRow = document.getElementById('spaAdjRow');
const result = document.getElementById('result');
const warning = document.getElementById('warning');
const wholeToggle = document.getElementById('wholeToggle');
const resetBtn = document.getElementById('resetBtn');

// ========================
// HELPERS
// ========================
function fmt(v) {
  return wholeToggle.checked ? Math.round(v) : v.toFixed(1);
}

function populateStep2() {
  step2.innerHTML = '';
  step2.disabled = false;

  if (step1.value === 'SPA') {
    adjRow.hidden = false;
    Object.keys(SPA_FORMULAS).forEach(k => {
      step2.add(new Option(k.replace('SPA_', '').replace('_', ' '), k));
    });
  } else {
    adjRow.hidden = true;
    Object.keys(FA_FORMULAS).forEach(k => {
      step2.add(new Option(k.replace('FA_', '').replace('_', ' '), k));
    });
  }
}

function update() {
  const meters = Number(metersEl.value);
  const adj = Number(adjEl.value) || 0;
  const key = step2.value;

  if (!Number.isFinite(meters) || !key) {
    result.textContent = 'MIL: —';
    warning.hidden = true;
    return;
  }

  const block = key.startsWith('SPA') ? SPA_FORMULAS : FA_FORMULAS;
  let mil = block[key].f(meters);

  // SPA ONLY — computed − adjustment
  if (step1.value === 'SPA') mil -= adj;

  result.textContent = `MIL: ${fmt(mil)}`;

  const [min, max] = block[key].r;
  warning.hidden = !(meters < min || meters > max);
}

// ========================
// EVENTS
// ========================
step1.onchange = () => {
  populateStep2();
  update();
};
step2.onchange = update;
metersEl.oninput = update;
adjEl.oninput = update;
wholeToggle.onchange = update;

document.querySelectorAll('[data-m]').forEach(b =>
  b.onclick = () => {
    metersEl.value = (Number(metersEl.value) || 0) + Number(b.dataset.m);
    update();
  }
);

document.querySelectorAll('[data-a]').forEach(b =>
  b.onclick = () => {
    adjEl.value = (Number(adjEl.value) || 0) + Number(b.dataset.a);
    update();
  }
);

resetBtn.onclick = () => {
  metersEl.value = '';
  adjEl.value = 0;
  result.textContent = 'MIL: —';
  warning.hidden = true;
};

update();
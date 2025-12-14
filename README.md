# HLL Artillery Calculator (WWII-themed)

A client‑side calculator to convert **meters → MIL** for HLL artillery across SPA and FA variants, with a WWII‑inspired design. It auto‑calculates on change, supports whole‑number output toggling, and flags extrapolation beyond reference ranges.

## What’s new (UI/UX)
- Two‑step selection:
  - **Step 1:** SPA or FA (defaults to none)
  - **Step 2:** Variant depends on Step 1
- Always **Meters → MIL** (no inverse mode).
- **Meters input** is **integer‑only** with **large 44×44px +/− controls**.
- **SPA only:** MIL adjustment (integer, −1000 to +1000) applied after computation.
- **Precision toggle** (de‑emphasized) to switch between **1 decimal** and **whole number** output.
- **Reset button** clears selections and inputs (but **does not** change precision toggle).
- **MIL output** is very prominent for readability.
- **Extrapolation** adds inline context: SPA → “Reference range for self propelled artillery is 200–600 meters.”; FA → “Reference range for fixed artillery is 100–1600 meters.”

## Formulas
- SPA (US/RU/Axis): `MIL = (2/3) * (1000 − meters)`
- SPA (UK — Churchill): `MIL = (4/9) * (1000 − meters)`
- SPA (UK — Bishop): `MIL = (1/3) * (1000 − meters)`
- FA (US/Axis): `MIL = 1001.525 − 0.237088·meters`
- FA (Russia): `MIL = 1141.375 − 0.213382·meters`
- FA (UK): `MIL = 551.125 − 0.177794·meters`

## Theme & Accessibility
- WWII palette: Olive Drab, Khaki, Field Gray, Off‑white.
- Headings use a stencil style; body copy uses a readable typewriter‑inspired font with system fallbacks.
- Larger hit areas (≥44×44px), strong focus rings, ARIA live output.

## Usage
1. Upload the five files to your web server.
2. Open `index.html`.
3. Choose **SPA** or **FA**, select a **variant**, set **meters**, and (if SPA) apply any **MIL adjustment**.

## Credit
Footer: **Created by Mr. Fantastic & M365 Copilot**.

## License
MIT

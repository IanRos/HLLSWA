HLL Artillery Calculator (WWII-themed)

A client-side calculator to convert meters → MIL for Hell Let Loose artillery across
Self-Propelled Artillery (SPA) and Fixed Artillery (FA) variants.
Built for fast, in-game use with a WWII-inspired design, touch-friendly controls
(iPad-ready), and minimal cognitive overhead.

----------------------------------------------------------------

WHAT’S NEW (UI / UX)

- Two-step selection
  - Step 1: Artillery Category (SPA or FA)
  - Step 2: Faction / Variant (depends on Step 1)
- Always meters → MIL (no inverse mode)
- Meters input
  - Integer-only
  - Large, touch-friendly buttons: −10 / −1 / +1 / +10
  - Designed for fast changes under combat pressure
- SPA only: Elevation (MIL) adjustment
  - Integer input (−1000 to +1000)
  - Large −10 / −1 / +1 / +10 controls
  - Adjustment is applied as:
    final MIL = computed MIL − adjustment
- Precision toggle
  - Switch between 1 decimal place and whole MIL values
- Reset button
  - Clears meters and adjustment
  - Does not affect precision toggle
- Prominent MIL output
  - Optimized for quick glances during gameplay
- Extrapolation allowed
  - Out-of-range inputs are still calculated
  - Output turns red with a reference-range warning

----------------------------------------------------------------

ARTILLERY GROUPS & FORMULAS

SELF-PROPELLED ARTILLERY (SPA)

US & USSR
MIL = 0.66647 × meters − 33.588

Axis
MIL = 0.88838 × meters − 78.059

UK — Churchill
MIL = 1.04456 × meters − 4.860

UK — Bishop
MIL = 0.19518 × meters + 10.846

SPA elevation adjustment is applied after computation:
final MIL = computed MIL − adjustment

----------------------------------------------------------------

FIXED ARTILLERY (FA)

Fixed Artillery behavior and formulas remain unchanged:

US / Axis
MIL = 1001.525 − 0.237088 × meters

Russia
MIL = 1141.375 − 0.213382 × meters

UK
MIL = 551.125 − 0.177794 × meters

----------------------------------------------------------------

THEME & ACCESSIBILITY

- WWII color palette:
  Olive Drab, Khaki, Field Gray, Off-White
- Fonts:
  - Stencil-style headings
  - Readable typewriter-inspired body text with system fallbacks
- Large hit targets (touch-friendly, ≥ 44px)
- Strong focus rings
- Live result updates designed with accessibility in mind

----------------------------------------------------------------

USAGE

1. Upload all project files to your web server or GitHub Pages repository.
2. Open index.html.
3. Select:
   - Artillery Category (SPA or FA)
   - Faction / Variant
4. Adjust meters using buttons or direct input.
5. (SPA only) Apply elevation adjustment if needed.
6. Use the precision toggle to switch decimal display.

----------------------------------------------------------------

CREDIT

Created by Mr. Fantastic & M365 Copilot
© 2025 & 2026

----------------------------------------------------------------

LICENSE

MIT

----------------------------------------------------------------

STATUS

The calculator is now:
- Feature-complete
- Field-tested for speed and clarity
- Stable for both SPA and FA
- Ready for future balance patches with minimal changes required

If Fixed Artillery changes in a future update, only the FA formula block needs to be updated.
No UI or workflow redesign will be required.

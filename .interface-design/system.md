# Taper — interface system

**Direction:** a ration ledger. Parchment and ink by day, graphite and vapor by night. Honey is the ration already spent; ember is the line you crossed. Calm, honest, tactile; nothing cheerful, nothing clinical.

**Human & task:** one hand, mid-craving, a half-second glance ("can I?") then a tap. The ring answers the glance; the thumb bar takes the tap.

## Tokens
- Surfaces: `--page` (canvas) · `--slab` (raised: Undo, thumb bar). One hue, lightness only.
- Text: `--ink` · `--ink-2` (.74 light / .76 dark) · `--ink-3` (.62 / .55) · `--ink-4` (.34 / .30, non-text only). All text tiers pass 4.5:1 in both modes. Four tiers, weight + opacity before size.
- Lines: `--rule` (.10 / .09 dark) hairlines; `--track` (.08 / .10) for unfilled cells and segments.
- Accent: `--honey` (#b77d0f light / #e3aa3d dark) with `--honey-ink`. Only meaning: a hit spent.
- Alarm: `--ember` (#c4372a / #ee5b46) with `--ember-ink`. Only meaning: at or over the cap. Over-cap strip cells also stand 45% taller, so hue is never the only cue.
- Depth: hairlines + tone shifts only. No drop shadows. Undo uses an inset 1px ring.

## Type
- Display `ui-serif` (New York on iOS; Iowan Old Style / Georgia fallback): date 24/500, hero count 78/500 −0.03em, +1 slab 44/500.
- UI `-apple-system`: body 15, figures 13/500 tabular, row labels 11/600 uppercase .08em.
- Mono `ui-monospace`: strength stamp 12 uppercase .08em, reset countdown 12.
- Root is `font-size: 106.25%; font: -apple-system-body` so iOS Dynamic Type scales everything; all type in rem off 17px. Scale ≈ 1.25: 12 · 13 · 15 · 24 · 44 · 78 (hero clamped 56–92px). Tabular nums on every live number.

## Spacing & density
- 4px base. Gutters 20. Section gap 32. Ledger rows 36 tall, hairline between. Strip cells 2px gap, 10px tall (16 for today).
- Ring 72vw max 268; segments r94 stroke 16; time arc r114 stroke 2; segment gap ≤6°.
- Thumb bar fixed bottom, 88px controls, +1 : Undo = 3 : 1, 18px radius, page-colored fade above.

## Signature elements
1. Ration ring: one segment per allowed hit; segments fill honey, ring turns ember at cap.
2. Minute hand: thin arc from 12 o'clock showing how far to the reset, with "resets in N min".
3. 24-cell hour strips in every ledger row; ember cells mark over-cap hours; today's current hour outlined.
4. Staircase: the 15-week cap schedule as bars, current week honey, past ink-4.
5. The +1 slab carries the state: honey while spending within cap, ember once over.

## States
- Baseline (no cap): thin track ring, "this hour · no cap". Quit: track ring, "Quit · none allowed", ember.
- Undo disabled at .35 opacity. Ghost tools (Export/Reset) 44px tall, ink-3, ember on press for Reset.
- Motion: press scale(.97) 120ms ease-out; new segment `pop` 240ms; color shifts 200ms; reduced-motion drops all.
- Thumb bar also hosts `#note` (transient/persistent messages; `warn` ember, `action` underlined + tappable) and `#backdate` (long-press +1 chooser: 5/15/30 min ago chips, 44px). Undo shows the time of the hit it would remove and is enabled only within 60 min of it.
- Tools row: Copy data · Import · Delete all data, ghost buttons, 16px gap. One `aria-live` region only (`#live`, sr-only), written only when the sentence changes.

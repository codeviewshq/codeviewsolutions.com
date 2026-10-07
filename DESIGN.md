---
name: CodeView Solutions
description: A technical specification sheet for the visitor's own website — drafting stock, one navy ink, one revision red.
colors:
  stock: "#EFEEE7"
  stock-2: "#E6E5DC"
  ink: "#000036"
  red: "#D8261B"
  red-ink: "#C21B12"
  red-lit: "#FF6A5E"
  graphite: "#4E4E47"
  rule: "#C6C5BA"
  rule-2: "#D8D7CD"
  on-ink: "#B9B9C9"
  on-ink-dim: "#9A9AB4"
  rule-on-ink: "rgba(239, 238, 231, 0.3)"
typography:
  display:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "clamp(2.9rem, 8.2vw, 7.25rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 5.4vw, 4.25rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.4vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  subtitle:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.6vw, 2.35rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  display-inner:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 6vw, 5rem)"
    fontWeight: 800
    lineHeight: 0.94
    letterSpacing: "-0.045em"
  sub-heading:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 700
    lineHeight: 1.18
    letterSpacing: "-0.02em"
  hero-sub:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.55vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  lede:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.35vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  prose:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.97rem + 0.25vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  body:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.96rem + 0.2vw, 1.0625rem)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  small-body:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "normal"
  micro-body:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "normal"
  field:
    fontFamily: "Martian Mono Variable, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.11em"
  figure:
    fontFamily: "Martian Mono Variable, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.02em"
  stamp-label:
    fontFamily: "Martian Mono Variable, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.08em"
  dimension:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 3.6vw, 3rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.05em"
rounded:
  none: "0"
spacing:
  rule-hair: "1px"
  rule-key: "1px"
  rule-div: "2px"
  rule-edge: "3px"
  grid: "44px"
  pad: "clamp(1rem, 2.6vw, 2.25rem)"
  rail: "3.25rem"
  cell: "clamp(4.5rem, 7.2vw, 7.5rem)"
  sheet-block: "clamp(2.75rem, 5.5vw, 5rem)"
components:
  stamp:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
    typography: "{typography.stamp-label}"
    rounded: "{rounded.none}"
    padding: "0.95rem 1.5rem"
  stamp-hover:
    backgroundColor: "{colors.red-ink}"
    textColor: "{colors.stock}"
  stamp-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.stamp-label}"
    rounded: "{rounded.none}"
    padding: "0.95rem 1.5rem"
  stamp-ghost-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
  note:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.red-ink}"
    rounded: "{rounded.none}"
    padding: "0.7rem 0.9rem"
  field:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0.35rem 0.9rem 0.75rem"
  field-focus:
    backgroundColor: "{colors.stock-2}"
    textColor: "{colors.ink}"
  cycle-btn:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.8rem 1.2rem"
  cycle-btn-pressed:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
  rail-zone:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.graphite}"
    typography: "{typography.field}"
    rounded: "{rounded.none}"
    padding: "0.85rem 0"
  rail-zone-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock}"
  cell:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.85rem 1rem"
---

# Design System: CodeView Solutions

## Overview

**Creative North Star: "The Redline"**

The site is a technical specification sheet for the visitor's own website. Every
surface behaves like a sheet in a drawing set: bordered by a sheet edge, indexed by
a zone rail down the left margin, ruled into whole cells, numbered, and signed off in
a title block. The category default — a gradient hero floating above three equal
service cards — is refused outright, because the whole promise is that somebody
looked at the thing, wrote it down, ruled it, and put their name on it. The redline
is not a metaphor applied to the surface; it is the layout mechanic. Findings are
drawn in red over the sheet and tied back by a leader line to the exact words they
question.

Density is high and deliberate. Rules do the work that shadows and cards do
elsewhere: a division between two ideas is a line of a stated weight, not a floating
panel. Nothing is soft. No corner radii exist anywhere in the build, no box shadows
exist anywhere, and no decorative gradients; the only repeating fills are the stock's
own 44px field grid and the 45° hatch on the single cut face, both drafting devices
rather than decoration.

The palette is enumerated and closed. Four inks are declared — drafting stock, the
logo's own navy, one spot revision red, one graphite. The red exists at three levels
because it does three jobs, and the stock exists as two cooled tints for the one
reversed-out field; those are the same inks at different levels, not additional
colours. Every one of them is a named custom property in the `:root` block, no colour
literal appears anywhere else in either stylesheet, and `npm run check:contrast` tests
each value against the ground it actually sits on at the threshold that pairing
actually has to meet. Redline is the selected and sole website design.

**Key Characteristics:**
- Four declared inks, never exceeded; one red at three levels, one stock at three levels.
- Every colour in the build is a `:root` token; no literal appears outside the token block.
- Every border is one of four ISO line weights: hairline, keyline, division, sheet edge.
- Zero radii, zero shadows, zero decorative gradients.
- Archivo for sheet lettering; Martian Mono confined to fields, figures, and dimensions.
- Sheets are numbered, zoned, and indexed by a fixed left rail.
- Motion is draw, rule, and stamp. Nothing fades in and nothing drifts.

## Colors

An enumerated four-ink drafting palette: warm off-white stock, the logo's navy as ink,
one spot red for findings, one graphite for the secondary voice. Two of those inks exist
at more than one level — the red at three, chosen by ground and size, and the stock at
three, so it stays readable when reversed out onto the ink field.

### Primary
- **Manuscript Navy** (`{colors.ink}`): the ink of the whole document. Body text, every
  heavy rule, the sheet edge, the rail's divider, stamped action fills, table headers,
  and the single reversed-out field (the closing issue block). Sampled from the owner's
  logo; it is the identity, not a chosen brand blue.

### Secondary
- **Revision Red** (`{colors.red}`): the finding colour, and stroke-only above small-text
  size. Corner registration marks, the revision cloud and its leader, dimension lines,
  the focus ring, the pointer guides, the clause hover bar, schedule tick dashes, and
  the strokes around notes and seals.
- **Revision Red, Text Weight** (`{colors.red-ink}`): the same red darkened until it clears
  4.5:1 on stock. Clause numbers, step and schedule figures, note copy, the live sheet
  stamp, link hover, and any red text below 24px.
- **Revision Red, Lifted** (`{colors.red-lit}`): the same red raised until it clears 4.5:1
  against the navy field. Used only on the closing issue block, where it letters the
  "issued for review" seal. On stock it would be too pale to read; on ink it is the only
  red that works.

### Neutral
- **Drafting Stock** (`{colors.stock}`): the paper. The page ground, every cell face, and
  reversed-out label text on navy fills.
- **Tinted Cell** (`{colors.stock-2}`): one shade of paper darker. Clause row hover,
  focus-within on form fields, the contact plate's header, the palette footer.
- **Graphite** (`{colors.graphite}`): the secondary voice — ledes, descriptions, list
  bodies, table cells, field keys, and the top band's links at rest.
- **Rule** (`{colors.rule}`): the hairline itself — column rules, list dividers, and row
  separators inside a cell.
- **Faint Rule** (`{colors.rule-2}`): the stock's own printed field grid at 44px pitch,
  offset to begin at the rail's inner edge.

### Reversed Out (the ink field)
The closing issue block is the one dark field on the site, so it needs the stock cooled
into a readable text ramp rather than pure stock at every level.
- **Stock on Ink** (`{colors.on-ink}`): body copy set on the navy field.
- **Stock on Ink, Dim** (`{colors.on-ink-dim}`): the mono field keys of the sign-off block —
  the secondary voice of the reversed-out ramp, the way graphite is on stock.
- **Rule on Ink** (`{colors.rule-on-ink}`): the sign-off block's own frame and cell gaps,
  the hairline expressed against ink instead of stock.

### Named Rules
**The Four Inks Rule.** Stock, ink, red, graphite. A new colour is never introduced; it is
derived as another *level* of a declared ink — lifted, darkened, or cooled for the ground it
has to sit on — named in the `:root` block of `src/styles/global.css`, and added to
`scripts/check-contrast.mjs`. If it cannot be named as a level of one of the four, it does
not ship.

**The Split Red Rule.** One red, three levels, chosen by the job and the ground.
`{colors.red}` strokes rules, marks, and large type on stock; `{colors.red-ink}` sets any
red text under 24px, any red on the tinted cell, and any red fill carrying stock-coloured
text; `{colors.red-lit}` is the only red permitted on the navy field. Never pick by taste —
pick by ground and size. `npm run check:contrast` asserts all three separately and is the
gate.

**The Token-Only Rule.** Every colour in the build is a named custom property in `:root`.
No hex, `rgb()`, or `rgba()` literal appears anywhere else in either stylesheet, and the
build currently satisfies this with zero exceptions. A value worth using is worth naming;
a value not worth naming does not ship.

**The Rarity Rule.** Red marks findings, figures, and the one live control the eye should
track. It never fills a large area and never becomes a section background. The single
dark field on the entire site is the closing issue block.

## Typography

**Display Font:** Archivo Variable (with system-ui, sans-serif)
**Body Font:** Archivo Variable — the sheet is lettered in one face
**Label/Mono Font:** Martian Mono Variable (with ui-monospace, monospace)

**Character:** Archivo does the sheet lettering — grotesque, tightly tracked, set very
heavy and very large so a headline reads as drawn lettering rather than marketing copy.
Martian Mono is quarantined to what a drawing actually sets in a technical face: title-
block field keys, clause and step figures, stamp labels, and keyboard hints.

### Hierarchy
- **Display** (800, `{typography.display.fontSize}`, 0.92, -0.045em): the title sheet's
  headline. Capped at 15ch so it always breaks into a block.
- **Display, Inner** (800, `{typography.display-inner.fontSize}`, 0.94, -0.045em): the H1 of
  every inner sheet — one step down from the title sheet, floor 2.4rem, capped at 16ch.
- **Headline** (800, `{typography.headline.fontSize}`, 0.98, -0.04em): the closing issue
  block's call, reversed out on navy, capped at 17ch.
- **Title** (800, `{typography.title.fontSize}`, 1.02, -0.03em): sheet titles in the ruled
  header band; service-detail titles run the same ramp step.
- **Subtitle** (700, `{typography.subtitle.fontSize}`, 1.04, -0.035em): clause names and
  rate-schedule plan names — the rows of a spec list.
- **Sub-heading** (700, `{typography.sub-heading.fontSize}`, 1.18, -0.02em): the heading
  inside a cell — sequence step titles and the question of a drawing note. The smallest
  step still set in the heavy weight.
- **Hero Sub** (400, `{typography.hero-sub.fontSize}`, 1.5, graphite, max 46ch): the
  paragraph directly under the title-sheet headline. One step above the lede, because it
  is the only body copy in the first viewport.
- **Lede** (400, `{typography.lede.fontSize}`, graphite, max 62ch): the one paragraph under
  a sheet title. The issue block's body runs the same ramp step, reversed out, capped at 52ch.
- **Prose** (400, `{typography.prose.fontSize}`, 1.55, graphite, max 66ch): running
  paragraphs on the about and service sheets — body with a slightly higher ceiling, because
  a column of continuous text carries a longer measure.
- **Body** (400, `{typography.body.fontSize}`, 1.55): the document default, set on `body`
  and inherited wherever a more specific step is not named.
- **Small Body** (400, `{typography.small-body.fontSize}`, 1.45): the workhorse of the system
  and the most-used size on the site — clause descriptions (max 58ch), step bodies, note
  answers, schedule lines, plan taglines, group items, table cells, fact and plate values.
  Anything set inside a ruled cell rather than across the sheet uses this step.
- **Micro Body** (400, `{typography.micro-body.fontSize}`, 1.45): the rate schedule's
  inclusion rows and its footnote — one step below small body, where a list has to stay
  dense inside a narrow column.
- **Field** (500–600, `{typography.field.fontSize}`, 0.11em, uppercase, mono): every title-
  block key, form label, table header, group name, and band item.
- **Figure** (500, `{typography.figure.fontSize}`, mono, red-ink): clause numbers, sequence
  step numbers, schedule line numbers, the live sheet stamp. A figure is the bare
  zero-padded number — `01`, not `STEP 01`; the column it sits in already says what it counts.
- **Dimension** (800, `{typography.dimension.fontSize}`, -0.05em, tabular): the price in the
  rate schedule — a measurement, set as one.

### Named Rules
**The Mono Confinement Rule.** Martian Mono is only ever a field key, a figure, a stamp
label, or a keyboard hint. It never sets a sentence, a lede, or a heading. If the string
is prose, it is Archivo.

**The No-Eyebrow Rule.** A sheet's label and number are never stacked above the heading as
a kicker. They sit at the opposite end of the ruled header band, on the same baseline as
the title (`space-between`, `align-items: baseline`), because a header band is a real
drawing device and an eyebrow is not.

**The Cell-Step Rule.** Text set across a sheet uses the lede, prose, or body steps; text
set inside a ruled cell drops to small body (0.9375rem), and only a dense list inside a
narrow column goes to micro body (0.875rem). The step tells you whether you are reading
the sheet or reading a cell of it.

**The Tabular Rule.** `font-variant-numeric: tabular-nums` is set globally on `body`.
Figures on a spec sheet line up in columns and do not reflow between states.

## Layout

One fixed rail plus one flowing body. The zone rail (`{spacing.rail}`, narrowing to 2.4rem
below 44rem) is fixed to the viewport's left edge and carries the mark, the zone letters
for the current page, and the live sheet stamp; the body is offset by exactly that width.
A 3px sheet edge frames the whole document, with red corner registration marks drawn into
its margin.

Pages are a vertical stack of sheets. Each sheet is padded `{spacing.sheet-block}` block by
`{spacing.pad}` inline and closed by a 2px division rule; each carries a `data-sheet` number
that drives the rail's stamp and a `data-mark` group that scopes its own redline.

The stock is ruled at a `{spacing.grid}` field grid in both axes, offset to begin at the
rail's inner edge, so the modular rhythm is literally visible under the content. Multi-cell
regions — title block, fact strip, rate schedule, sequence, groups, footer — are grids with a
navy background and a 1px or 2px gap, so the *gap itself* is the rule between cells and each
cell paints its own stock face. Auto-fit `minmax` tracks (11rem–15rem) let a region reflow
into fewer columns with no breakpoint at all.

Breakpoints, in the order they fire: **66rem** (detail and form two-column grids and the
three-column rate schedule collapse to one), **60rem** (clause parameters drop under the
clause body, notes go single-column, the sign-off block un-floats, the row arrow is
dropped), **52rem** (the revision table de-tabulates into stacked rows), **44rem** (the rail
narrows and drops its zone letters, the band stacks with a scrolling link row, the stamp row
goes full-width and vertical, the seal un-rotates, and the leader line is dropped because
there is no margin left for it to run through).

### Named Rules
**The Whole-Cell Rule.** Elements occupy whole cells of the grid. Regions are laid out as
grid-plus-gap-as-rule, never as free-floating boxes separated by margins.

**The Density-Preservation Rule.** Touch accommodation lives entirely in
`@media (pointer: coarse)`, where targets grow to a 44px minimum and the pointer-position
readout cell (which a coarse pointer cannot drive) is removed. Fine-pointer density is never
lowered to accommodate touch.

## Elevation & Depth

There are no shadows. Not one `box-shadow` exists in the build and none should be added.
Depth is carried entirely by line weight and by figure/ground reversal: a heavier rule reads
as a more significant division, a navy fill reads as a cut face, and the sheet edge reads as
the boundary of the document. The only dark field on the whole site is the closing issue
block, and it earns its weight by being the end of the drawing.

The one depth device beyond line weight is the 45° hatch on that issue block — 1px
stock-coloured lines at 11px pitch, the same order as the stock's own grid — because a cut
face is poché'd on a drawing.

### Named Rules
**The Line-Weight Rule.** Every border picks one of four weights and nothing else:
`{spacing.rule-hair}` hairline (within a cell — list rows, column rules, cell gaps),
`{spacing.rule-key}` keyline (around a cell or component — form boxes, notes, tables, the
rate grid), `{spacing.rule-div}` division (between sheets, the rail edge, stamp-row frames,
focus rings), `{spacing.rule-edge}` sheet edge (the document border and the command palette).
A border with a bespoke width is a bug.

**The No-Shadow Rule.** No `box-shadow`, no `drop-shadow`, no `backdrop-filter`, no blurred
panels. Hierarchy is line weight and reversal. The only translucency in the build is the
command palette's flat navy scrim and `{colors.rule-on-ink}`, which is the hairline
expressed against the ink field.

## Shapes

Everything is a rectangle with square corners. `border-radius` is `{rounded.none}` everywhere,
including on native form controls where it is explicitly reset. The recurring silhouettes are
the ruled box (a keyline rectangle with a mono field key), the tag flag (a solid red-ink label
hung off a note's top-left corner), the stamp (a solid navy rectangle with a letterspaced mono
label), and the seal (a red-stroked box rotated a few degrees, un-rotated at narrow widths).

No decorative gradients exist. The two `repeating-linear-gradient` uses in the build are ruling
devices — the stock's field grid and the cut face's hatch — and both draw hard 1px lines with
no colour transition; they are drawn rules expressed in CSS, not gradient fills. A tonal or
blurred gradient is out.

Icons are inline SVG only, stroked in `currentColor` at 2–2.4 weight with square caps, sized
13–22px. No icon fonts, no emoji, no glyph characters standing in for icons. The one place the
OS would have drawn its own shape — the `<select>` chevron — is overridden with a hand-drawn
1.6-weight caret in the ink.

## Components

### Stamps (buttons)
Actions are stamped, not clicked. Solid navy, stock label, mono uppercase at 0.08em tracking,
square, and arranged inside a shared 2px frame so a primary and a ghost read as one stamped
block rather than two buttons.
- **Shape:** square (`{rounded.none}`); the row is framed by a 2px division rule.
- **Primary:** `{components.stamp}`; hover and focus flip the fill to text-weight red.
- **Ghost:** transparent on stock, separated by a 2px left rule; hover inverts to navy. On the
  dark issue block the whole set inverts — stock fill with navy label, ghost in stock.
- **Focus:** the global 2px red outline at 3px offset. Never a glow.
- **Mobile:** below 44rem the row goes full-width and vertical and the ghost's separator moves
  from left rule to top rule.

### Notes (the revision note)
A boxed margin note in red, with its tag hung above the top-left corner as a solid red-ink flag
carrying `data-tag` (e.g. `REV A · FIRST FINDING`). Mono, 34ch max, stock fill so it sits over
the redline overlay cleanly.

### Cells and ruled regions (cards)
There are no cards. A "card" here is a cell in a ruled region: stock face, no border of its own,
separated from its neighbours by the region's grid gap over a navy ground. Internal padding runs
0.85rem–1.9rem depending on region density. Cells never lift, never round, never shadow.

### Clause rows
The service list is a numbered clause list, not a card grid: a `2.1`-style mono figure in the
margin, a heavy name, a graphite description, a parameter table (`dt`/`dd` pairs on hairlines) in
a third column, and an arrow. Hover tints the row to the tinted cell and wipes a 2px red bar in
from the left via `scaleX`; the arrow shifts 5px and turns red.

### Inputs / Fields
Fields are cells of a ruled form block, not standalone boxes. The form is one keyline rectangle;
each field is a full-width row divided by a keyline. The mono uppercase label sits above the
control inside the same cell, with required marks in red-ink.
- **Focus:** the field cell tints to `{colors.stock-2}` and its label turns red-ink; the control's
  own outline is suppressed because the cell is the focus indicator.
- **Submit:** a full-width stamp in a 2px-topped tray at the foot of the form block.
- **Unwired state:** a red-stroked notice block inside the form, in the sheet's own mono voice.

### Navigation
The top band is a full-width mono uppercase strip under a keyline: legal name and location at
the left, links at the right, each divided by a hairline and inverting to stock-on-navy on hover.
The current page is held at the tinted cell via `aria-current="page"`. The band stacks and the
link row scrolls horizontally below 44rem. The left rail carries the zone letters (A, B, C…) as a
second index, hairline-divided, inverting on hover, and stamps the current sheet number at its
foot.

### Rate schedule
Prices are a ruled three-column table, not pricing cards: a mono plan figure, a heavy plan name,
the price fenced top and bottom by keylines and set in the dimension ramp, a red-stroked saving
tag, inclusions as a hairline-ruled list with an 8px red tick dash, and a full-width stamp pinned
to the bottom of every column by `margin-top: auto`. The cycle control is two mono buttons sharing
one border, the pressed one inverted to navy.

### Command palette ("find on sheet")
The drawing set's index. A native `<dialog>` — focus trapping and Escape come from the platform —
with a 3px sheet edge, mono group headers, hairline-divided rows, and the selected row inverted to
navy with its icon in red. No blur, no radius, no translucent panel; a flat navy scrim behind it.

### The Redline (signature component)
Every `data-mark` group can carry one finding. Inside it, `[data-cloud]` names the phrase being
questioned and `[data-note]` names the note that answers it; an absolutely positioned `.markup` SVG
measures both elements' live bounding boxes and generates a true revision cloud (a run of outward
arcs walked around the perimeter, so it fits any rewrap at any width) plus a three-segment leader
line running out of the note, along the margin, and up to the cloud's lower-left shoulder,
terminated by a dot. It re-measures on `resize` and once on `document.fonts.ready`, because the
webfont settles after first paint and moves the phrase. Because it is scoped per `[data-mark]`,
every page carries its own finding rather than only the home hero.

Two placement rules the mechanic depends on. The clouded phrase is set roman
(`[data-cloud] { font-style: normal }`) on every sheet: the cloud is what marks the words, and
italicising them as well would say the same thing twice in two vocabularies. And on an inner
sheet the note sits above the lede rather than below it, so the leader has a run of empty stock
to travel through — a leader that crosses body copy reads as a strike-through, not a pointer.

### Named Rules
**The Drawn-Not-Faded Rule.** The motion vocabulary is three verbs: **draw** — strokes reveal by
animating `stroke-dashoffset` from their own `getTotalLength()` down to 0, staggered 260/480/640ms
on `cubic-bezier(0.22, 0.61, 0.36, 1)`; **rule** — state changes snap in 80–160ms on
`cubic-bezier(0.9, 0, 0.1, 1)`; **stamp** — the sheet number flashes inverted for 220ms as it
advances. Nothing fades in, nothing drifts up, nothing scales on hover. Under
`prefers-reduced-motion: reduce`, every stroke renders already drawn: `is-drawn` is applied
immediately and dash offset starts at 0, so the finding is never withheld from a reduced-motion
visitor.

**The No-JS-Correct Rule.** Progressive enhancement is structural. The rate schedule renders both
billing cycles into the DOM and CSS shows one based on the group's `data-cycle` attribute, so the
monthly column is correct with the script disabled; the switch only rewrites an attribute and
`aria-pressed`.

## Do's and Don'ts

### Do:
- **Do** derive any new colour as a level of one of the four declared inks, name it in the `:root`
  block of `src/styles/global.css`, and add its pairing to `scripts/check-contrast.mjs`.
- **Do** reach for the reversed-out ramp (`{colors.on-ink}`, `{colors.on-ink-dim}`,
  `{colors.rule-on-ink}`, `{colors.red-lit}`) rather than pure stock whenever you set type or a rule
  on the navy field.
- **Do** pick every border width from the four ISO weights (`--w-hair`, `--w-key`, `--w-div`,
  `--w-edge`).
- **Do** use `{colors.red-ink}` for red under 24px, red on the tinted cell, and any red fill carrying
  stock-coloured text; keep bright `{colors.red}` for strokes, rules, registration marks, and the
  focus ring.
- **Do** build multi-cell regions as a grid with a navy background and a 1px/2px gap, so the gap is
  the rule.
- **Do** give a new sheet a `data-sheet` number, a zone entry, and — if it makes a claim worth
  questioning — its own `data-mark` / `data-cloud` / `data-note` trio.
- **Do** keep Martian Mono on field keys, figures, stamp labels, and keyboard hints only.
- **Do** put touch accommodations inside `@media (pointer: coarse)` rather than lowering density for
  everyone.
- **Do** render both states of any toggled content and let CSS choose from a data attribute, so the
  default state survives without JavaScript.
- **Do** inline icons as SVG stroked in `currentColor` with square caps.

### Don't:
- **Don't** add a `box-shadow`, `drop-shadow`, or `backdrop-filter` anywhere. Hierarchy is line weight
  and figure/ground reversal.
- **Don't** put `{colors.red}` or `{colors.red-ink}` on the navy field, or `{colors.red-lit}` on stock.
  Each level of the red has exactly one ground it is legible against.
- **Don't** add a `border-radius`. The system's only radius value is `0`.
- **Don't** add a tonal or blurred gradient. `repeating-linear-gradient` is permitted only where it
  draws hard 1px rules (the stock's field grid, the cut-face hatch).
- **Don't** stack a label or number above a heading as a kicker or eyebrow; it belongs at the opposite
  end of the ruled header band, on the title's baseline.
- **Don't** set prose, ledes, or headings in Martian Mono.
- **Don't** introduce a fifth ink — not even one accent for a chart, a badge, or a status. The four are
  enumerated and guard-enforced.
- **Don't** fade, slide, or scale anything on entrance. If it should appear, draw it.
- **Don't** use icon fonts, emoji, or glyph characters as icons.
- **Don't** widen the red beyond findings, figures, and the live control; a red section background
  destroys the rarity that makes a finding read as a finding.
- **Don't** write a colour literal anywhere outside the `:root` token block. The build satisfies this
  with zero exceptions today; every colour is a named property and a line in the contrast guard.

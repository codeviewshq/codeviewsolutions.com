---
name: "CodeView Solutions - Signal"
description: "Custom software, consulting, and practical AI with clear scope and client ownership."
colors:
  paper: "#f4f7f8"
  paper-alt: "#e9eff2"
  ink: "#10202e"
  muted: "#516575"
  dark: "#10202e"
  on-dark: "#f4f7f8"
  muted-dark: "#bbccd5"
  accent: "#d6f05a"
  accent-hover: "#e4fb7a"
  accent-text: "#10202e"
  brand-accent: "#d6f05a"
  line: "#c9d5db"
  line-dark: "#3e5364"
  focus: "#527400"
  danger: "#a93228"
typography:
  display:
    fontFamily: "Archivo Variable, sans-serif"
    fontSize: "clamp(3rem, 5.7vw, 5.625rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-.04em"
  headline:
    fontFamily: "Archivo Variable, sans-serif"
    fontSize: "clamp(2rem, 3.2vw, 3.25rem)"
    fontWeight: 750
    lineHeight: 1.1
    letterSpacing: "-.035em"
  title:
    fontFamily: "Archivo Variable, sans-serif"
    fontSize: "1.45rem"
    fontWeight: 750
    lineHeight: 1.1
    letterSpacing: "-.025em"
  body:
    fontFamily: "Archivo Variable, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Archivo Variable, sans-serif"
    fontSize: ".95rem"
    fontWeight: 600
  button:
    fontFamily: "Archivo Variable, sans-serif"
    fontSize: "1rem"
    fontWeight: 650
    lineHeight: 1.45
rounded:
  control: "6px"
  toggle: "4px"
spacing:
  inline: "12px"
  content: "24px"
  block: "32px"
  section: "88px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-text}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "13px 25px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "13px 25px"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "13px 14px"
  plan:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "28px 26px"
---

# Design System: CodeView Solutions - Signal

## Overview

**Creative North Star: "Clear Technical Momentum"**

Midnight navy and cool white establish a precise technology partner. Citron directs action and connects the angular CV mark to functional route graphics. Bold Archivo and clear spacing carry forward momentum without making the software offer opaque.

The system pairs generous page sections with straightforward controls and ruled lists. Software, consulting, and AI share one visual vocabulary; website care is a separate offer within that vocabulary. Generated software imagery is illustrative, not evidence of client work.

**Key Characteristics:**
- Clear hierarchy and generous spacing
- Legible, direct controls
- Flat surfaces with ruled separation
- Angular mark and directional geometry

## Colors

The frontmatter records the active theme's source values; inactive theme selectors are excluded.

### Primary

- **Citron** directs primary actions; the hover variant provides immediate feedback.

### Secondary

- **Midnight Navy** anchors headings and dark regions. The brand accent is reserved for the CV mark.

### Neutral

- **Cool paper and blue-gray** distinguish primary and secondary surfaces.
- Muted copy, light and dark dividers, and on-dark copy have context-specific roles.
- Focus and danger are functional colors rather than decorative accents.

### Named Rules

**The Action Color Rule.** Citron marks primary actions and directional emphasis; navy carries the structure.

## Typography

**Display Font:** Archivo Variable, sans-serif
**Body Font:** Archivo Variable, sans-serif

**Character:** A single variable sans-serif family ties expressive headlines to readable explanatory copy.

### Hierarchy

- **Display:** Hero headings use the frontmatter display role; interior headings use the general heading ramp.
- **Headline:** Major section headings carry bold, tightly spaced type.
- **Title:** Content and service headings use the smaller heading role.
- **Body:** Default text is 17px with a 1.65 line height, changing to 16px at the smallest breakpoint. Paragraphs generally stop at 68ch; lead copy uses 45-56ch.
- **Label:** Fields use medium-weight, readable labels. Navigation uses a quieter regular-weight treatment.
- **Button:** Primary action copy uses the dedicated 650-weight control role.

### Named Rules

**The One Family Rule.** Use the active variable font for headings, body copy, and controls; hierarchy comes from scale and weight.

## Layout

The centered content container caps at 1320px with 48px desktop side gutters. Gutters reduce to 32px at 1100px, 24px at 800px, and 20px at 540px. Desktop hero content is split between copy and artwork; columns stack at 800px. Service previews and plans use three columns, with single-column service previews and plans at 800px. Process, example, and principle groups stack at 540px.

Major sections use 88px vertical padding, reduced to 64px and then 52px. Common internal gaps are 12px, 24px, and 32px, with larger editorial gaps on split sections. Headers reduce from 102px to 86px and then 78px. Mobile navigation expands below the brand row, with its menu trigger at least 44px tall.

## Elevation & Depth

There are no component shadows in the active stylesheet. Tone, fine dividers, and open spacing establish depth. Raster illustration shading is artwork, not a reusable elevation token.

### Named Rules

**The Flat Surfaces Rule.** Separate regions with tone, spacing, and fine borders rather than decorative shadows.

## Shapes

Compact controls use the 6px radius while the CV mark and hero route retain angular directional geometry.

Inline icons are real SVG paths, typically 18-24px, with rounded strokes. Dividers remain fine single-pixel strokes.

## Components

### Buttons

Primary controls are direct, substantial, and easy to identify. Their minimum height is 54px; the padding, color, and radius live in frontmatter. Hover changes the background and shifts the SVG arrow 3px over 160ms. Outline actions retain paper-colored surroundings, a divider border, and an ink-colored hover border. Global focus uses a 3px outline with 5px offset, adapted to the surrounding dark or light region. Disabled buttons reduce opacity to .65 and show a wait cursor.

### Cards / Containers

Website-care plans use bordered paper surfaces with the control radius and 28px by 26px padding. Contact aside panels use the alternate paper tone and 32px padding. Service previews remain open columns divided by rules, rather than becoming enclosed cards.

### Inputs / Fields

Fields use paper backgrounds, ink text, muted borders, 13px by 14px padding, and a minimum height of 50px. Textareas resize vertically. Labels precede fields; hints and live status copy explain state. Required markers use danger color. No unimplemented inline validation visual state is part of this canon.

### Navigation

Horizontal text links use regular-weight type and accent-colored hover/current states. A labeled mobile menu toggles the link row; without scripting the navigation remains accessible. Dark regions adapt the focus outline for visibility.

### Billing Control

A bordered toggle contains two buttons with a smaller inset radius. The selected option uses ink background and paper text, with aria-pressed carrying the state. Both options meet a 44px minimum height.

### FAQ

Native details/summary rows use top and bottom rules, substantial vertical padding, and a plus SVG that rotates when open. Answers sit beneath the question in muted copy.

### Signature

The desktop hero action contains a citron elbow-route SVG pointing into the action button. It is hidden at 1100px and below. This is a deliberate directional relationship, not a detached decorative arrow.

Reduced-motion preference removes animation and transitions and disables smooth scrolling.

## Do's and Don'ts

### Do:

- **Do** keep controls and inline SVG icons paired with readable labels.
- **Do** preserve visible focus and reduced-motion behavior.
- **Do** use the selected identity consistently across pages.
- **Do** identify generated software artwork as illustrative.

### Don't:

- **Don't** import the other standalone theme's palette, mark, or typography.
- **Don't** imply illustrative artwork depicts a shipped client project.
- **Don't** replace functional labels with decorative microtype.

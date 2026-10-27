---
name: CodeView Solutions
description: Quiet momentum — thoughtful digital consulting and development.
colors:
  light-bg: "#f7f8fc"
  light-surface: "#ffffff"
  light-surface-soft: "#eef0f8"
  light-surface-blue: "#e4e8f8"
  light-ink: "#000036"
  light-muted: "#505b78"
  light-accent: "#4655ad"
  light-accent-hover: "#34418e"
  light-line: "#d8ddec"
  light-line-strong: "#8691b1"
  light-field-rgb: rgb(70, 85, 173)
  light-field-bright-rgb: rgb(119, 134, 213)
  light-button-bg: "#000036"
  light-button-ink: "#f7f8fc"
  light-closing: "#0c1237"
  light-closing-ink: "#f0f2ff"
  light-closing-muted: "#bac3e0"
  light-focus: "#4655ad"
  light-closing-line: "#b7c5ff30"
  light-dialog-backdrop: "#04081880"
  dark-bg: "#090d24"
  dark-surface: "#111831"
  dark-surface-soft: "#141d3a"
  dark-surface-blue: "#1a2549"
  dark-ink: "#eff2ff"
  dark-muted: "#b1bcd8"
  dark-accent: "#a7b5ff"
  dark-accent-hover: "#d1d9ff"
  dark-line: "#2b3657"
  dark-line-strong: "#7382ac"
  dark-field-rgb: rgb(120, 142, 237)
  dark-field-bright-rgb: rgb(172, 188, 255)
  dark-button-bg: "#dbe2ff"
  dark-button-ink: "#101632"
  dark-closing: "#131d40"
  dark-closing-ink: "#f0f2ff"
  dark-closing-muted: "#bac3e0"
  dark-focus: "#a7b5ff"
  dark-closing-line: "#b7c5ff30"
  dark-dialog-backdrop: "#04081880"
typography:
  display:
    fontFamily: "\"Manrope Variable\", sans-serif"
    fontSize: clamp(3.25rem, 7.1vw, 6rem)
    fontWeight: 500
    lineHeight: 1.14
    letterSpacing: "-0.035em"
  hero-display:
    fontFamily: "\"Manrope Variable\", sans-serif"
    fontSize: clamp(3.25rem, 7.1vw, 6rem)
    fontWeight: 500
    lineHeight: 1.06
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "\"Manrope Variable\", sans-serif"
    fontSize: clamp(2.15rem, 4.1vw, 3.8rem)
    fontWeight: 500
    lineHeight: 1.14
    letterSpacing: "-0.035em"
  title:
    fontFamily: "\"Manrope Variable\", sans-serif"
    fontSize: clamp(1.65rem, 2.5vw, 2.35rem)
    fontWeight: 500
    lineHeight: 1.14
    letterSpacing: "-0.035em"
  lede:
    fontFamily: "\"Manrope Variable\", sans-serif"
    fontSize: clamp(1.08rem, 1.1vw + 0.5rem, 1.3rem)
    fontWeight: 400
    lineHeight: 1.75
  body:
    fontFamily: "\"Manrope Variable\", sans-serif"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.7
  small:
    fontFamily: "\"Manrope Variable\", sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "\"Manrope Variable\", sans-serif"
    fontSize: 0.9375rem
    fontWeight: 600
    lineHeight: 1.3
rounded:
  surface: 16px
  button: 12px
  result: 10px
  pill: 999px
  circle: 50%
spacing:
  half: 0.5rem
  threequarters: 0.75rem
  one: 1rem
  one-half: 1.5rem
  two: 2rem
  two-half: 2.5rem
  three: 3rem
  three-half: 3.5rem
  five: 5rem
  six: 6rem
  gutter: clamp(1.25rem, 4.5vw, 5rem)
  section: clamp(5rem, 9vw, 8.5rem)
components:
  button-primary:
    backgroundColor: "{colors.light-button-bg}"
    textColor: "{colors.light-button-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: 0.85rem 1.5rem
  button-primary-hover:
    backgroundColor: "{colors.light-accent}"
    textColor: "{colors.light-bg}"
  button-primary-dark:
    backgroundColor: "{colors.dark-button-bg}"
    textColor: "{colors.dark-button-ink}"
  button-primary-dark-hover:
    backgroundColor: "{colors.dark-accent}"
    textColor: "{colors.dark-bg}"
  button-inverse:
    backgroundColor: "{colors.light-closing-ink}"
    textColor: "{colors.light-closing}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: 0.85rem 1.5rem
  button-inverse-dark:
    backgroundColor: "{colors.dark-closing-ink}"
    textColor: "{colors.dark-closing}"
  text-link:
    textColor: "{colors.light-ink}"
    padding: 0.4rem 0
  icon-button:
    textColor: "{colors.light-ink}"
    rounded: "{rounded.circle}"
    width: 44px
    height: 44px
  navigation:
    textColor: "{colors.light-ink}"
    padding: 10px 0
  connection-choice:
    textColor: "{colors.light-muted}"
    rounded: "{rounded.pill}"
    padding: 0.65rem 1rem
  connection-choice-selected:
    backgroundColor: "{colors.light-ink}"
    textColor: "{colors.light-bg}"
  work-placeholder:
    backgroundColor: "{colors.light-surface-soft}"
    rounded: "{rounded.surface}"
    padding: 3rem
  work-placeholder-demo:
    backgroundColor: "{colors.light-surface-blue}"
  search-dialog:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.light-ink}"
    rounded: "{rounded.surface}"
    width: min(620px, calc(100% - 2rem))
  journey:
    textColor: "{colors.light-ink}"
    padding: 2rem 0 0
  connections:
    backgroundColor: "{colors.light-surface-soft}"
    rounded: "{rounded.surface}"
    padding: 2.5rem
---

# Design System: CodeView Solutions

## Overview

**Creative North Star: "Quiet momentum"**

Quiet momentum makes a digital consulting and development partner feel subtle, calm, and inviting. The supplied logo leads the identity: its navy anchors cool white, slate, and periwinkle surfaces, with generous breathing room and open geometric type.

Fine connectors and curved filaments turn connected thinking into a living material. Motion comes from Canvas2D, CSS/SVG signals, and Motion orchestration; it supports readable content and a direct invitation to a free consultation. PRODUCT.md remains the authority for the offer and factual claims.

**Key Characteristics:**

- Logo-led light and dark palettes with clear text and surface roles.
- Self-hosted Manrope, spacious headings, and restrained controls.
- Live curved filaments and real geometric connection diagrams.
- Clearly labeled, noninteractive work and demo placeholders.

## Colors

The frontmatter records explicit light and dark values; names map directly to the matching CSS variables in src/styles/global.css (for example, light-surface-soft and dark-surface-soft both map to --surface-soft).

### Primary

Logo Navy is the light-theme ink and primary button ground. Periwinkle is the accent for the second line of each page’s H1, links, focus, and signals; its dark-theme counterpart is lighter for the deep blue ground. Buttons use dedicated foreground/background pairs. The declared accent-hover variables are currently unused: actual button hover uses accent.

### Neutral

Cool White grounds the light theme; white working surfaces sit above soft slate and pale blue panels. Midnight grounds the dark theme, with stepped blue surfaces, pale text, and muted slate text. Fine and stronger line roles separate content and draw geometry. Closing Navy, Closing Light, and Closing Slate remain a distinct pair of closing-section surfaces and foregrounds. Canvas channel colors are recorded as valid rgb() colors; the code stores those channels in --field-rgb and --field-bright-rgb.

**The Theme Pairing Rule.** Choose foregrounds and surfaces from the same theme; closing sections use their own foreground pairings in both themes.

The head script resolves the OS theme before paint, then follows OS changes until a manual choice is stored. Manual theme and motion preferences persist locally when storage permits; otherwise controls still work on the current page. CSS-only OS-dark fallback supplies the main palette but omits field, closing, and shadow overrides; that fallback mismatch is not a new design rule.

## Typography

**Display and body font:** self-hosted Manrope Variable, imported from @fontsource-variable/manrope/wght.css, with sans-serif fallback. The supplied logo retains its own artwork.

Headings use medium weight, tight tracking, balanced wrapping, and the fluid display/headline/title roles in frontmatter. The hero tightens the display line height; paragraphs retain a relaxed body rhythm. There is no second display face or mono hierarchy. The scale is fluid rather than a fixed ratio.

- Display: page titles; hero-display: the Home headline. At widths up to 760px the hero uses clamp(3.2rem, 9.5vw, 5rem), inner-page titles use clamp(3rem, 9vw, 4.7rem); the hero settles at 3.2rem up to 420px.
- Headline: section headings, usually limited to 13–18ch. Title: capability headings. Smaller component headings commonly use 1.35rem.
- Lede: introductory copy up to 62ch (53ch in page intros). Body: prose; muted supporting text and small labels step down within components. Hero copy uses its own clamp(1.05rem, 1.3vw, 1.2rem), line height 1.8, and 48ch measure.
- Label: the sentence-case primary button treatment. Navigation is 0.9375rem regular; metadata varies by component rather than sharing an uppercase label style.

## Layout

The shared container is min(100% - two gutters, 1320px), centered. On desktop, the hero diagram is positioned inside this content container, relative to the copy rather than the viewport bottom. Its width is min(60%, 820px), with its top 7rem above the end of the copy. The hero uses min(100svh - 89px, 811px) as a minimum height and reserves 15rem below the copy for the diagram and bottom strip; taller content can expand it. This keeps the consultation and diagram together on wide or tall monitors. Fluid gutters and section padding are frontmatter tokens. Two-column introductions, services, approach, FAQs, and contact layouts use asymmetric or equal columns with generous gaps (typically 3–7rem). Work pairs use 1.15fr/0.85fr on Home and equal columns on Work. Heading groups have room for a separate supporting paragraph.

- At 1100px and below: the header consultation shortcut hides; the hero diagram returns to document flow at 75% width and its bottom strip becomes relative; major gaps tighten.
- At 760px and below: the header changes from 88px to 74px, desktop navigation and the search icon hide, mobile navigation appears via its toggle, major layouts become single columns, and the gutter is 1.5rem. Search remains available by keyboard and on the 404 page. The hero diagram uses full width; its three stages remain side by side.
- At 420px and below: the gutter is 1.25rem, hero actions stack, diagram labels simplify, and contact buttons fill their panel.
- Navigation state resets above 760px (the script query starts at 761px).

The sticky header reserves scroll space (110px). With JavaScript unavailable, mobile navigation is visible and diagram choice controls hide. Coarse pointers raise icon, text-link, text-button, and diagram-choice targets to a 44px minimum.

## Elevation & Depth

Depth combines tonal surfaces, fine outlines, a soft radial canvas glow, and selective ambient shadow. The theme shadow is used on the search dialog and the central business node; ordinary service rows and placeholder panels remain flat. Exact light/dark shadows live in the sidecar. The search backdrop is a translucent navy scrim. Its color and the closing arc line are declared as dialog-backdrop and closing-line tokens. A directional background gradient protects hero copy; closing sections use nested elliptical outlines.

## Shapes

Working surfaces and the search dialog share the surface radius. Buttons and placeholder geometry use the button radius; search results use the smaller result radius. Diagram choices are pills; theme/search/menu tools and diagram symbols are circles. Most dividers and connector paths are fine single-pixel strokes. Icons are inline SVG with currentColor, rounded caps/joins, and a 1.6 stroke; preserve logo proportions and paths.

## Components

### Buttons and links

Primary buttons are calm filled invitations: dedicated theme pair, sentence-case semibold label, 48px minimum height, and a trailing arrow. Hover uses accent/bg, moves the arrow 4px, and active presses down 1px. Inverse buttons use closing foreground as the fill and closing background as the text, then closing-muted on hover. Text links use a fine underline and directional SVG; icon tools are circular with a soft-blue hover. The global keyboard focus ring is 2px with 5px offset. Closing sections pair the ring with closing-ink so it clears the navy ground. Icon tools, diagram choices, text links, and motion controls have a 44px minimum target. There is no generic outline-button variant.

### Navigation and search

The opaque sticky header carries the supplied lockup (166px wide; 142px on mobile), sentence-case navigation, search, theme, and consultation tools. Desktop hover/current links reveal a one-pixel accent underline. Mobile links use separated rows and an Escape-dismissable menu. Search is a native dialog with a transparent text input, rounded selected rows on surface-blue, keyboard navigation, Escape/backdrop dismissal, result announcements, and return of focus to its opener. The search input retains the visible global focus ring. The search dialog uses shadow elevation without a border. Contact carries an enquiry form (name, email, optional company, message, hidden honeypot) inside its soft panel: visible semibold labels, no placeholders, fields on the surface color with a one-pixel line border that strengthens on hover and turns accent on focus. It posts natively to the configured HTTPS receiver. Until one is configured, the fieldset is disabled (fields at reduced opacity, submit on surface-blue with muted text) beneath a short note and the primary email button, so email stays the working route.

### Working surfaces and placeholders

Connections and Contact use softly framed panels. The connection choices are real aria-pressed buttons: selected ink/bg, unselected muted/transparent, soft-blue hover. Work and demo panels are static articles with CSS geometry, coming-soon labels, and explanatory captions; the demo uses surface-blue. Their trailing plus icon has been removed. The label inside the decorative visual is hidden from assistive technology with that visual; the Work page separately states that these are placeholders.

**The Honest Placeholder Rule.** Coming-soon work and demo panels stay static, visibly labeled, and free of action icons or simulated project results.

### Living field and connected thinking

The field draws 36 curved filaments and nine traveling points in Canvas2D, with gentle mouse response and a radial glow; a static SVG supplies a fallback. Canvas DPR is capped at 1.5. Updates are throttled by an elapsed interval of at least 32ms (nominally 30fps, not a strict 30fps ceiling on every refresh rate), suspended outside the observed region (50px margin) and while the document is hidden. Pause keeps a static frame. This is code-generated motion, not a raster illustration.

Journey connects three stationary SVG symbols with two hairline connectors anchored between their edges. When 70% of the figure enters view, the connectors trace once in reading order (0.75s each, second delay 0.65s) and settle. The symbols do not spin; the connectors never sweep across them. Without JavaScript or with reduced motion, the complete diagram is visible. Connections selects real SVG paths and updates a live caption; these diagrams explain an approach rather than impersonating a working application. When Connections is half in view, and on every choice, the selected route traces in once (1.2s, shared ease) and stays drawn in accent; neither diagram has a recurring animation. Motion animates the hero over 1.05s and viewport reveals over 0.85s with the shared ease; changing a diagram caption takes 0.35s. Exact values and transforms are in the sidecar.

**The Quiet Motion Rule.** Keep content readable at rest, honor reduced motion and the pause control, and suspend continuous canvas updates when offscreen or the document is hidden.

Reduced motion disables CSS animation/transitions, shows the selected connection route fully drawn, skips entrance orchestration, and disables the pause toggle with a “Reduced motion” label. Manual pause pauses CSS/Web Animations and canvas. Content exists before any entrance animation.

The social image is code-generated and the logo rasters derive from supplied artwork. Embedded provenance is retained; the supplied public-raster scan reports six rasters with none missing provenance. This documentation pass did not rerun that scan or application checks.

## Do's and Don'ts

### Do:

- **Do** preserve the supplied logo geometry and let its color follow the surrounding theme.
- **Do** use theme variables, fluid type, generous section spacing, and fine connectors.
- **Do** preserve keyboard access, visible focus, reduced motion, and direct consultation routes.
- **Do** retain truthful provenance on code-generated social artwork and supplied-logo derivatives.

### Don't:

- **Don't** revive the discarded Redline visual system.
- **Don't** turn work or demo placeholders into apparent links, controls, case studies, or functioning demos.
- **Don't** replace the live field and SVG/CSS signals with a generated raster illustration.
- **Don't** invent commercial claims or portfolio evidence; consult PRODUCT.md.

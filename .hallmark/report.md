# Hallmark polish: Quiet momentum

Applied after the completed Impeccable redesign, on 2026-10-27. This pass preserves the existing design system, routes, logo, light/dark themes, filament field, animated connections, free consultation and explicitly unfinished work/demo slots.

## Picks and outcome

- Scope: six existing pages; polish of material, typography, contrast and states.
- System: custom Quiet momentum, locked in DESIGN.md; modern-minimal genre inferred for the audit.
- Initial sweep: 13 FAIL, 21 REFLEX, 15 WARN. Some were structural prescriptions or source false positives, so this is not a count of defects repaired.
- Confirming rendered sweep: **0 FAIL, 0 WARN, 1 WAIVED, 2 ANSWERED, 3 DISMISSED, 19 NOTE**, across 16 files and six URLs. Thirty screenshots were captured for each sweep.
- One waiver preserves the existing periwinkle second line of each page H1. Caption measures were visually accepted; the source-code quote and intentional layout gaps were answered in the CSS stamp.
- Fresh-context reviewer: **ship**, no material polish defects in all six 1440px full-page before/after pairs and sampled source. The reviewer did not run checks.
- Build and palette checks pass. Responsive, accessibility and behavior checks include six routes at six widths in both themes, theme persistence, search/menu behavior, reduced motion, animation pause/resume, diagrams and no-JavaScript behavior. New regression assertions check closing-action focus contrast in both themes and the search input outline.

See [before/after captures](compare.html). The audit's retained inventory is 30/30 links, 9/9 fields, 40/40 headings and 2/2 figures. “Fields” is the tool's raw inventory label; the site has no enquiry submission form.

## Changes

The consultation band's focus ring now clears its actual navy background. Search retains its focus outline. Controls have consistent minimum target sizes, and primary buttons have a more restrained height. Two remaining alpha colors are named tokens. Introductory text is shorter, headings can wrap safely, and an ornamental hero dot was removed. DESIGN.md and the component sidecar reflect these details.

The contrast checker now accepts either quote style in the dark-theme CSS selector. It previously depended on single quotes, while the formatter had emitted double quotes.

## Structural notes retained

These are audit preferences outside this polish's scope, rather than unresolved material failures. No section was moved or added.

| Source | Observation | Possible future change |
| --- | --- | --- |
| src/styles/global.css:358, :418, :767, :922 | Four spacing values depart from Hallmark's 4px scale. | Normalize them if changing this system's spacing. |
| src/styles/global.css:1087 | Five inner-page introductions finish above a full desktop viewport. | Reconsider introduction height during a composition redesign. |
| src/pages/index.astro:125; src/pages/about.astro:86; src/pages/contact.astro:30; src/pages/services.astro:38 | Four desktop screen windows exceed Hallmark's preferred word budget. | Rebalance copy and layout together if density proves troublesome. |
| src/pages/contact.astro:30; src/pages/work.astro:23; src/styles/global.css:1135 | Three inter-section gaps fall below Hallmark's preferred spacing. | Revisit adjoining bands and service spacing together. |
| src/pages/contact.astro:13; src/pages/404.astro:9 | Contact and 404 have fewer sections than Hallmark's landing-page template. | Keep these purposefully brief unless new content earns a section. |
| src/styles/global.css:1215 | Contact's secondary heading is smaller than Hallmark's suggested ratio. | Rebalance its scale if the panel's hierarchy changes. |

These categories contain 19 individual notes. The reviewer also observed a predictable rhythm on Services, inherited from the existing split sections. Before polish, Contact's reassurance about not needing a polished brief was warmer, and Work's introduction named projects and product ideas more explicitly. The shorter copy trades some specificity for brevity; surrounding content retains that guidance.

## Copy changes

| Source | Before | After |
| --- | --- | --- |
| src/data/site.js | Strategy, design, and software development, brought together around what you need. We create considered digital experiences and connect the systems behind them. | Strategy, design, and development for a more connected business. |
| src/pages/services.astro | We bring the thinking, design, and development together around what your business needs. Start with a challenge; we’ll help find the right shape for the solution. | Thoughtful digital work, shaped around the way your business works. |
| src/pages/about.astro | CodeView is a digital consulting and development partner. We help businesses find a practical way forward—and bring the care and craft to follow it through. | A thoughtful partner for digital consulting, design, and development. |
| src/pages/contact.astro | A new idea, a complicated challenge, or a feeling that something could work better. Tell us a little about it. We’ll take it from there. | Bring an idea, a challenge, or a question worth exploring. |
| src/pages/work.astro | The decisions, the details, and the things they make possible. This is where we’ll share a closer look at our projects and product ideas. | A space for the decisions and details behind our work. |
| src/pages/404.astro | This page couldn’t be found. The address may have changed, or the link may be incomplete. | The page may have moved, or the address may be incomplete. |
| src/pages/index.astro | Whatever brings you here, we start by understanding what you need—not by deciding what to sell you. | Whatever brings you here, we start by understanding what you need. |
| src/pages/contact.astro | The first consultation is free. There’s no need for a polished brief—just a little context about your business and what you have in mind. | The first consultation is free. Bring a little context about your business and what you have in mind. |

## Material handoff

No new material is required for this pass. Work and product demos remain clearly labeled placeholders as requested. The future slots on Work are two project visuals at approximately 644×350px each on wide desktop and 350×300px on a typical phone; the demo visual is approximately 1320×420px on desktop and 350×320px on a phone. Dimensions follow the responsive container.

For the project slots, use a publishable screen capture with a short description of the business problem and the decisions behind it. For the demo slot, use an actual product recording with a poster and playback controls. The single most useful future asset is one publishable project screenshot with its short business story. Nothing has been invented to fill these slots.

Not deployed or committed.

## Subsequent animation refinement

After the Hallmark verdict, the owner flagged the hero Journey animation. The two recurring traveling bars and rotating ring have been replaced by two bounded hairline connectors that trace once in reading order and then rest. Shared Contact anchors were corrected at the same time. This is a later focused change; the Hallmark counts and independent verdict above describe the earlier polish snapshot.

Verified the revised sequence in the collaborative browser, including intermediate animation states, desktop/mobile and both themes. The build, 34 palette pairings, and full 72-case responsive/accessibility/behavior suite pass. Regression checks now verify connector endpoints and vertical alignment, two finite animations, their order, and their settled state. Pause, reduced-motion and no-JavaScript checks also pass. DESIGN.md, the component sidecar and surface brief record the new behavior.

## Subsequent wide-screen layout correction

The owner's larger-screen screenshot exposed a hero positioning defect after the recorded 1280×800 preview. The diagram was positioned from the bottom of a viewport-height hero. In a deterministic Chromium reproduction, the icon row's vertical offset from the consultation action center changed from 28px at 1280×800 to 174px at 2000×994. Anchoring the diagram inside the copy container makes that offset 30px at both sizes. Desktop hero height is bounded, with enough reserved content space to keep the diagram clear of its bottom strip. Mobile remains in document flow.

The original reproduction now passes. Seven desktop size/height combinations, from 1101×720 to 2560×1440, have persistent composition assertions for drift and overlaps. The full layout/accessibility/behavior suite passes, and the result was inspected in the collaborative browser at desktop and mobile sizes in light/dark themes. These later changes have not had a new Hallmark independent review.

# Archived candidate worlds

Six of the seven candidate visual directions built for the CodeView Solutions
homepage. **The Redline was chosen and is now the live site** — these are kept
as the record of the round, not as working code.

- `instruction` — brick build-instruction booklet
- `refraction` — ophthalmic examination / Snellen chart
- `ascii` — live scene rendered as typewriter glyphs
- `pc98` — Japanese sixteen-colour computer screen
- `akari` — washi-over-bamboo lantern workshop
- `breton` — regional ornament plate book

Each was a complete homepage on the real copy in `src/data/site.js`, verified
at 390 / 834 / 1440.

## Restoring one

Move its page back to `src/pages/preview/`, its layout to `src/layouts/`, its
stylesheet to `src/styles/`, and any component it names to `src/components/`
(`instruction` needs `Plate.astro`; `akari` needs `Seal.astro`; `breton` needs
`Unit.astro`). Their fonts are still in `package.json`.

Note: the plans/pricing section added in August 2026 was only ever built for
The Redline. These six have the pricing *styles* appended to their
stylesheets but no pricing markup, so restoring one leaves its plans section
to be written.

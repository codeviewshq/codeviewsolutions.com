# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: small and mid-size companies with no IT function of their own.**

They have no internal engineering team, no technical lead, and no infrastructure
practice. Software still has to get built — a customer-facing site, an internal
tool, an integration between two systems they already pay for, an AI feature
someone upstairs is asking about — and there is nobody inside the company whose
job that is.

The person who makes contact is usually **non-technical**: an owner, an
operations lead, a general manager. They are qualified to describe the problem
but not to evaluate an architecture. They are, in effect, hiring the department
they do not have.

Two consequences future work must respect:

- **They cannot assess technical claims.** Stack lists, framework names, and
  jargon do not build confidence with this buyer — they build unease. Confidence
  comes from plain language about outcomes, process, and cost.
- **Budget anxiety arrives before technical anxiety.** The unspoken first
  question is "can I even afford this," not "are they any good."

## Product Purpose

CodeView Solutions is the software and technology capability those companies
buy instead of building one. Three services, all under that single job:

1. **Custom Software Development** — web applications, internal tools,
   dashboards, APIs, integrations, database work, deployment and handover.
2. **Technical Consulting** — architecture review, codebase audits, scoping and
   estimation before budget is committed, fractional technical leadership,
   vendor evaluation.
3. **AI & AI Integration** — LLM features, retrieval over the client's own
   documents, workflow automation, evaluation harnesses, and cost/latency/
   prompt-injection review before launch.

Success is a signed engagement that starts from the site — a real enquiry
describing a real problem, from a company inside the profile above.

## Positioning

**Confirmed:** CodeView is the software department for companies that do not
have one. Not a staffing supplement to an existing engineering team, not a
specialist subcontractor — the whole capability, from "is this a good idea" to
"it is running and you own it."

**Stale section — flagged, not yet rewritten.** The three services described
above (custom software, consulting, AI) are NOT what the site sells. The live
copy in `src/data/site.js` sells a website partnership: Modern Website Refresh,
Ongoing Website Care, Reliable Growth Infrastructure, under the tagline "A
better website, looked after." The owner confirmed in August 2026 that the live
copy is the truth and this document is out of date. **Reconcile this section
with `src/data/site.js` before relying on it.**

## Operating Context

- **No published location — owner decision, August 2026.** The work is remote
  and the service area is the whole country, so the site names no town, no
  state, and publishes no postal address in its structured data. Do not
  reintroduce a home town as a trust device.
- The buyer is typically comparing three options at once: a freelancer found
  through a referral, a larger agency, and doing nothing. The site is usually
  read before any conversation happens, and often on a phone.
- Enquiry arrives by form or email. Committed response standard: **within one
  business day** (already published in the copy; user-approved).

## Capabilities and Constraints

**Engagement model**

- Fixed scope, milestone-billed, or ongoing retainer.
- **Published monthly plans — owner decision, August 2026. This reverses the
  earlier no-figures rule.** Three tiers, named for the site's own verbs:
  Care $10/mo or $90/yr, Improve $50/mo or $540/yr, Grow $100/mo or $1,080/yr.
  Annual pricing saves 10% on Improve and Grow, and more on Care. Every plan
  includes a free consultation and the first website design at no cost. The
  numbers live in `plans` in `src/data/site.js` and are rendered from there —
  never retype a figure into markup.
- Larger projects outside a plan are still scoped and agreed before work
  begins, and are not published as figures.
- **Post-launch: a 90-day defect warranty.** Anything that does not work as
  scoped is fixed free for 90 days after handover. New work is quoted
  separately. This is the confirmed offer — do not embellish it into an
  open-ended support promise.
- Client owns everything on delivery: code, infrastructure, documentation. No
  proprietary layer, no dependency that must keep being paid for.

**Delivery capacity**

Capacity is single-track and finite. Future copy must not promise 24/7 or
overnight coverage, simultaneous parallel workstreams, dedicated staff assigned
per client, or same-day turnaround. The published one-business-day response
standard is the ceiling of what is claimed on responsiveness.

**Technical**

- Astro 5 static site. Builds to plain HTML/CSS with ~2 KB of JS; deploys to any
  static host. No server runtime, no database, no session state.
- All visitor-facing copy lives in `src/data/site.js`. Content edits should not
  require touching `.astro` files.
- **The contact form is not connected.** `site.formspreeId` is still
  `[YOUR_FORM_ID]`; the form visibly declines to submit rather than dropping
  enquiries silently. Until it is wired, the site cannot capture a lead through
  its primary conversion path.
- **Astro 5 static site, five routes** (home, services, about, contact, 404),
  one shared shell, zero external JavaScript per page.
- **`site.email` and `site.phone` are still placeholders** (`[YOUR EMAIL]`,
  `[YOUR PHONE]`), so there is currently no working way to make contact at all.
  Both render as inert text rather than broken links. **Owner action required —
  do not invent an address.**

**Terminology**

"We" throughout. The company is *CodeView Solutions*; the legal entity is
*CodeView Solutions LLC*. Services are named as listed above.

## Brand Commitments

**Size-neutral voice — binding, and the strictest rule on this project.**
Copy, imagery, and structure must never state, imply, or hint at how many people
deliver the work, in either direction. That rules out: team pages, headcount or
"team of N" phrasing, staff photos or headshots, named individuals, founder
bios, an "our office" or "our team" section, org-chart language, and equally any
solo/freelance/"just me" framing. The company is described by what it delivers,
never by who or how many. This survives every redesign.

**Logo — binding asset.** `first.jpg` at the repository root, supplied by the
owner. A navy eye formed from `< />` angle brackets with an internal circuit-node
motif, set beside "CodeView" in a geometric sans with "SOLUTIONS" letterspaced
beneath. It is the identity; it is not up for redesign.

Two facts about it that future work must deal with rather than ignore:

- **It is a raster JPG on an off-white field, with no transparency and no vector
  source.** It cannot be placed on a dark background as-is, and it will not
  scale to a favicon or a retina header cleanly. It needs a vector redraw or a
  transparent extraction before it can be used in the interface.
- **Resolved, August 2026.** The logo/palette conflict went to the owner and the
  logo won. The near-black refraction spectrum is gone; the site is now THE
  REDLINE — a technical specification sheet on drafting stock #EFEEE7 with the
  mark's own navy **#000036** (sampled from `first.jpg`) as the ink, one spot
  revision red #D8261B, and graphite rule. `src/components/Logo.astro` now
  carries the real traced mark, not the old prism. See DESIGN.md.

**Voice.** First person plural, plain, unhedged. Direct answers to the questions
buyers actually ask. The incumbent copy is user-approved and is the reference
for tone.

## Evidence on Hand

**Real delivered work exists, and none of it can be named.** It is covered by
NDA or owned by former employers. It may be referred to in the abstract — kinds
of systems, classes of problem — and it may never be attached to a client name,
logo, industry specific enough to identify the client, or metric.

Absent, and **not to be fabricated under any circumstances**:

- client names, logos, or a client count
- testimonials, quotes, reviews, or ratings
- case studies or project write-ups
- outcome metrics ("cut costs 40%", "2M requests/day")
- awards, certifications, partner badges, press mentions
- years-in-business or years-of-experience claims — **explicitly dropped by
  owner decision.** The existing `[X]+ years delivering software` and
  `Founded [YEAR]` placeholders are to be removed, not filled. Nothing on the
  site should date the company in either direction.

Present:

- `first.jpg` — the logo (see Brand Commitments).
- `public/og.png` — generated social share image, regenerated by `npm run og`.
- The site's own build quality is, for now, the only demonstrable proof. It is
  the portfolio piece.

Consequence for future work: **the site must persuade on substance alone** —
clarity of offer, quality of thinking, and the evident craft of the artifact
itself. Every conventional trust device is unavailable. Design that leaves
empty slots for logos or testimonials is designing for a site that does not
exist.

## Product Principles

1. **Sell the missing department, not the technology.** The buyer's problem is
   that nobody inside their company owns this. Lead with relief from that, not
   with capability lists or stack names.
2. **Size is never the subject.** Neither big nor small. What is delivered is
   the only thing described.
3. **Claim only what can be shown.** With no nameable proof, credibility comes
   from the precision of the thinking and the quality of the artifact. An
   invented claim is the one failure this project cannot absorb.
4. **Reachable without a price tag.** Never publish a number; never let a small
   business conclude it is not for them.
5. **The client owns the outcome.** Every engagement ends with them holding the
   code, the infrastructure, and the documentation.

## Accessibility & Inclusion

- **WCAG AA is enforced, not aspirational.** `npm run check:contrast` validates
  every foreground/background pairing on the palette and must pass. Accent
  colours are split by role — a hue bright enough for a border is not
  automatically approved for body text.
- Keyboard operation on every interactive element, with visible focus.
- `prefers-reduced-motion` is honoured: the animated hero composes a single
  still frame instead of animating.
- Responsive from 320 px. The non-technical buyer reads this on a phone often
  enough that mobile is a primary case, not a fallback.

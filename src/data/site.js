/* ==========================================================================
   EDIT THIS FILE TO CHANGE THE SITE'S CONTENT.

   Every word a visitor reads lives here — including page headings. You should
   not need to open the .astro files to change copy.

   Anything wrapped in [SQUARE BRACKETS] is a placeholder that still needs
   your real information. Search this file for "[" to find them all.

   A note on voice: the copy is written in the first person plural ("we") and
   is deliberately size-neutral — it describes what the company delivers, not
   how many people deliver it. Keep it that way when you edit, and avoid
   adding claims about team size in either direction.
   ========================================================================== */

export const site = {
  name: 'CodeView Solutions',
  legalName: 'CodeView Solutions LLC',
  domain: 'codeviewsolutions.com',
  url: 'https://codeviewsolutions.com',

  tagline: 'Custom software, delivered end to end.',

  // One sentence, shown in the footer under the logo.
  blurb:
    'A New Jersey software company delivering custom application development, AI integration, and technical consulting.',

  /* --- CONTACT -----------------------------------------------------------
     These appear on the contact page and in the footer. Use an address that
     is actually monitored — something like hello@codeviewsolutions.com.
     Set `phone` to an empty string ('') to hide the phone row entirely.
     While these stay in brackets they render as plain text rather than as
     broken mailto:/tel: links.                                              */
  email: '[YOUR EMAIL]',
  phone: '[YOUR PHONE]',
  location: 'Old Bridge, New Jersey',
  serviceArea: 'Working with clients across the United States',

  /* --- CONTACT FORM ------------------------------------------------------
     The form is built and styled but not connected to anything yet.
     To turn it on:
       1. Create a free form at https://formspree.io
       2. Copy the form ID from the endpoint they give you
          (https://formspree.io/f/XXXXXXXX  ->  the ID is XXXXXXXX)
       3. Paste it below, replacing the whole placeholder string.
     Until you do, the form shows a visible "not connected" notice and
     refuses to submit rather than failing silently.                         */
  formspreeId: '[YOUR_FORM_ID]',

  /* --- SOCIAL / PROFILE LINKS -------------------------------------------
     Delete any you do not want shown. They render in the footer.            */
  links: [
    { label: 'GitHub', href: '[YOUR GITHUB URL]' },
    { label: 'LinkedIn', href: '[YOUR LINKEDIN URL]' },
  ],
};

/* --- MAIN NAVIGATION ----------------------------------------------------- */
export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

/* --- HOME PAGE HERO ------------------------------------------------------ */
export const hero = {
  // Small line above the headline — the first thing a visitor reads, so it
  // should say plainly what the company does. Rendered in caps; keep it short.
  eyebrow: 'Software development · Consulting · AI integration',

  // The headline is split across two lines; the second is painted with the
  // refraction spectrum, so put the words that should carry colour there.
  headlineLead: 'Custom software,',
  headlineAccent: 'delivered end to end.',

  body: 'CodeView Solutions designs, builds, and supports the software businesses run on — customer platforms, internal tools, system integrations, and the technical guidance to keep them moving.',

  primaryCta: { label: 'Start a project', href: '/contact/' },
  secondaryCta: { label: 'View services', href: '/services/' },

  // The quiet four-up row under the buttons. Keep values short.
  facts: [
    { key: 'Engagements', value: 'Fixed scope or ongoing retainer' },
    { key: 'Based in', value: 'Old Bridge, New Jersey' },
    { key: 'Experience', value: '[X]+ years delivering software' },
    { key: 'Response time', value: 'Within one business day' },
  ],
};

/* --- SERVICES ------------------------------------------------------------
   Used on the home page (short rows) and the services page (full detail).
   Add or remove entries freely — the layout adapts to any number.

   The order here is the order they appear on both pages.

   id       -> URL anchor, must be unique and lowercase
   name     -> the heading
   summary  -> one or two lines, shown on the home page
   body     -> one or two paragraphs, shown on the services page
   includes -> bullet list of concrete deliverables
   meta     -> the small key/value strip; keep values short              */
export const services = [
  {
    id: 'custom-software',
    name: 'Custom Software Development',
    summary:
      'Web applications, internal tools, and APIs built around the way your business actually operates.',
    body:
      "Off-the-shelf software makes you change your process to match the tool. Custom software does the opposite. We design and build web applications, internal tools, dashboards, and APIs around the workflow you already have — then hand over a system you own outright.\n\n[EDIT THIS: add a sentence or two about the industries or kinds of systems you most want to be hired for. The more specific, the better — for example, \"We work mostly with logistics and healthcare operations teams.\"]",
    includes: [
      'Web applications and customer-facing portals',
      'Internal tools, admin panels, and dashboards',
      'REST and GraphQL APIs, plus third-party integrations',
      'Database design, migrations, and data modeling',
      'Deployment, CI/CD, and handover documentation',
    ],
    meta: [
      { key: 'Typical timeline', value: '[4–12 weeks]' },
      { key: 'Engagement', value: 'Fixed scope, milestone-billed' },
      { key: 'Good fit for', value: 'Teams outgrowing spreadsheets' },
    ],
  },
  {
    id: 'consulting',
    name: 'Technical Consulting',
    summary:
      'Senior engineering review to pressure-test the plan before you commit the budget.',
    body:
      "Sometimes the need isn't a build — it's a straight answer about whether the plan holds up. We review architectures, audit existing codebases, scope projects into something buildable, and act as the technical counterpart for teams that don't have one in-house.\n\n[EDIT THIS: note whether you offer fractional CTO work, hiring support, or code review retainers, and any industries you know especially well.]",
    includes: [
      'Architecture and technology selection reviews',
      'Codebase audits: quality, security, and scaling risk',
      'Scoping and estimation before budget is committed',
      'Fractional technical leadership for non-technical teams',
      'Vendor and contractor evaluation',
    ],
    meta: [
      { key: 'Typical timeline', value: '[1–3 weeks, or ongoing]' },
      { key: 'Engagement', value: 'Hourly or monthly retainer' },
      { key: 'Good fit for', value: 'Teams without a technical lead' },
    ],
  },
  {
    id: 'ai-integration',
    name: 'AI & AI Integration',
    summary:
      'AI built into real products — scoped, evaluated, and supported like any other part of the system.',
    body:
      "Most AI projects stall between the demo and production. The gap is rarely the model — it's retrieval quality, evaluation, cost control, and failure handling. We build AI features that hold up with real users, and we'll say plainly when a problem doesn't need AI at all.\n\n[EDIT THIS: mention the specific AI work you want more of — retrieval systems, document processing, workflow agents, forecasting, computer vision, whichever applies.]",
    includes: [
      'LLM-powered features: assistants, search, summarization, extraction',
      'Retrieval-augmented generation over your own documents and data',
      'AI workflow automation for repetitive internal work',
      'Evaluation harnesses, so quality is measured rather than assumed',
      'Cost, latency, and prompt-injection review before launch',
    ],
    meta: [
      { key: 'Typical timeline', value: '[3–10 weeks]' },
      { key: 'Engagement', value: 'Discovery sprint, then build' },
      { key: 'Good fit for', value: 'Teams with a real use case' },
    ],
  },
];

/* --- "HOW WE WORK" -------------------------------------------------------
   The questions clients ask before committing to a build. Answer them
   plainly — vague answers here are the ones that lose the work.            */
export const credibility = {
  label: 'How we work',
  heading: 'What you can expect.',
  intro: 'The questions that come up most often before a project starts.',
  items: [
    {
      q: 'How does a project start?',
      a: 'With a scoping conversation, then a written proposal covering milestones, timeline, and cost. You approve the scope before any code is written.',
    },
    {
      q: 'How do we keep you informed?',
      a: 'A shared repository and a working deployment from the first week, plus a regular written update. Progress is visible whenever you want it, not just on a status call.',
    },
    {
      q: 'Who owns the finished work?',
      a: 'You do — the code, the infrastructure, and the documentation. Nothing sits behind a proprietary layer you have to keep paying for.',
    },
    {
      q: 'How is work priced?',
      a: '[EDIT THIS: describe your pricing — for example, "Fixed price for a defined scope, so the number is agreed before we start. Retainers for ongoing work, billed monthly."]',
    },
    {
      q: 'What happens after launch?',
      a: '[EDIT THIS: describe your support offer — for example, "Every build includes a support window after handover, with optional maintenance retainers for ongoing work."]',
    },
    {
      q: 'What if a project needs a specialist?',
      a: 'We say so up front and bring in the right expertise rather than stretching to cover it. A good referral is worth more than a badly fitted engagement.',
    },
  ],
};

/* --- ABOUT PAGE ---------------------------------------------------------- */
export const about = {
  label: 'About',
  headingLead: 'A software company',
  headingAccent: 'built around delivery.',

  // Each string is its own paragraph.
  story: [
    '[YOUR COMPANY STORY — paragraph 1. What CodeView Solutions does and who it serves. Something like: "CodeView Solutions is a software and technology company based in Old Bridge, New Jersey. We build custom applications and AI-enabled systems for [type of client]."]',
    '[YOUR COMPANY STORY — paragraph 2. Capabilities and approach: the kinds of systems you deliver, the technologies you work in most, and what clients typically come to you for. Concrete beats impressive — naming a real system you delivered lands harder than a list of adjectives.]',
    '[YOUR COMPANY STORY — paragraph 3. Why the company exists and how you prefer to work with clients. This is the paragraph that turns a vendor into a partner.]',
  ],

  // Short facts in the sidebar card. Delete any that don't apply.
  facts: [
    { key: 'Founded', value: '[YEAR]' },
    { key: 'Entity', value: 'CodeView Solutions LLC, New Jersey' },
    { key: 'Based in', value: 'Old Bridge, New Jersey' },
    { key: 'Focus', value: 'Software development, consulting, AI' },
  ],

  toolsLabel: 'Capabilities',
  toolsHeading: 'What we build with.',
  toolsLede:
    'A focused stack, chosen for reliability and long-term maintainability rather than novelty. We will use something else when a project genuinely calls for it.',

  // Edit to match what you actually use — an honest short list reads better
  // than an exhaustive one.
  stack: [
    { group: 'Languages', items: ['[TypeScript]', '[Python]', '[SQL]', '[ADD YOURS]'] },
    { group: 'Frameworks', items: ['[React]', '[Node.js]', '[FastAPI]', '[ADD YOURS]'] },
    {
      group: 'AI / ML',
      items: ['[Claude API]', '[RAG pipelines]', '[Vector databases]', '[ADD YOURS]'],
    },
    { group: 'Infrastructure', items: ['[AWS]', '[Docker]', '[Postgres]', '[ADD YOURS]'] },
  ],
};

/* --- CONTACT PAGE -------------------------------------------------------- */
export const contact = {
  label: 'Contact',
  headingLead: 'Tell us what',
  headingAccent: "you're trying to build.",
  intro:
    'A few sentences about the problem is enough to start. We read every message and reply within one business day.',

  // Heading on the card beside the form.
  directLabel: 'Reach us directly',

  // Options in the "What do you need?" dropdown on the form.
  projectTypes: [
    'Custom software development',
    'Technical consulting',
    'AI / AI integration',
    'Not sure yet',
  ],
};

/* --- SECTION HEADINGS ----------------------------------------------------
   Headings for the sections that are not covered above. `Accent` fields are
   painted with the refraction spectrum.                                     */
export const sections = {
  homeServices: {
    label: 'Services',
    heading: 'What we do.',
    lede: "Most engagements start in one of these and grow into another. If you're not sure which one you need, that's a normal place to begin.",
  },
  servicesIntro: {
    label: 'Services',
    headingLead: 'Built, integrated,',
    headingAccent: 'and supported.',
    lede: 'Three kinds of engagement, with the scope and shape of each written out plainly. Every one of them ends with you owning the system.',
  },
};

/* --- CALLS TO ACTION -----------------------------------------------------
   The band at the bottom of each page. `accent` is the spectrum line.       */
export const ctas = {
  home: {
    heading: 'Have a project',
    accent: 'you need delivered?',
    body: 'Send a few sentences about what you are trying to achieve. We read every message and reply within one business day.',
  },
  services: {
    heading: 'Not sure',
    accent: 'which one you need?',
    body: "If you can describe what's going wrong or what you want to be true, we can tell you which of these fits — or point you somewhere better.",
    label: 'Get in touch',
  },
  about: {
    heading: 'Tell us about',
    accent: 'your project.',
    body: `Based in ${site.location}, working with clients wherever they are.`,
  },
};

/* --- SEO / SOCIAL SHARING -----------------------------------------------
   Per-page titles and descriptions. Keep descriptions near 150–160
   characters — search engines truncate past that.                          */
export const meta = {
  home: {
    title: 'CodeView Solutions LLC — Custom Software Development & IT Consulting',
    description:
      'CodeView Solutions is a New Jersey software company delivering custom application development, technical consulting, and AI integration for businesses and startups.',
  },
  services: {
    title: 'Services — Custom Software, Technical Consulting & AI Integration',
    description:
      'Custom software development, technical consulting, and AI integration for businesses and startups. Fixed scope or ongoing retainer, based in New Jersey.',
  },
  about: {
    title: 'About — CodeView Solutions LLC',
    description:
      'CodeView Solutions is a software and technology company based in Old Bridge, New Jersey, serving clients across the United States.',
  },
  contact: {
    title: 'Contact — CodeView Solutions LLC',
    description:
      'Start a conversation about your software, consulting, or AI project. Based in Old Bridge, New Jersey, working with clients across the US.',
  },
};

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

  tagline: 'A better website, looked after.',

  // One sentence, shown in the footer under the logo.
  blurb:
    'A website partner helping small and midsize businesses modernize, stay reliable, and grow with confidence.',

  /* --- CONTACT -----------------------------------------------------------
     Whatever is filled in here becomes a live, clickable channel; anything
     left as an empty string ('') is hidden entirely rather than rendered as
     a dead row. The contact sheet reads these to decide what to offer, so
     adding an address here is all it takes to turn the email route on.

     Keep any address here size-neutral (hello@, support@) rather than a
     personal one — the site never says how many people are behind it.       */
  email: '',
  phone: '(732) 654-9519',
  serviceArea: 'Working with clients across the United States',

  /* --- CONTACT FORM ------------------------------------------------------
     The form is built and styled but has no endpoint yet — a custom one is
     being built to replace Formspree. Until an ID is set here, the contact
     sheet hides the form entirely and offers the phone instead, rather than
     showing a form that cannot send.

     To use Formspree in the meantime: create a form at https://formspree.io
     and paste the ID from the endpoint they give you
     (https://formspree.io/f/XXXXXXXX  ->  the ID is XXXXXXXX).              */
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
  // The headline is split in two. The second part is the phrase the revision
  // cloud is drawn around, so put the words worth marking there — keep it to
  // a few words, since the cloud is measured from the text itself.
  headlineLead: 'Make your website an asset.',
  headlineAccent: 'Keep it that way.',

  body: 'We modernize outdated websites, manage them with predictable monthly support, and keep them dependable as your traffic and business grow.',

  assurance: 'Free, plain-English review. No obligation and no technical runaround.',
  primaryCta: { label: 'Get a free website review', href: '/contact/' },
  secondaryCta: { label: 'See how it works', href: '/#process' },

  // The quiet row under the buttons. Keep values short.
  //
  // Deliberately no years-of-experience or founded-in fact here. Nothing on
  // this site dates the company in either direction — that is a decision, not
  // an omission waiting to be filled.
  facts: [
    { key: 'First step', value: 'A free website review' },
    { key: 'Ongoing care', value: 'Predictable monthly support' },
    { key: 'After launch', value: '90-day warranty' },
    { key: 'Built for', value: 'Reliable, steady growth' },
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
    id: 'website-refresh',
    name: 'Modern Website Refresh',
    summary:
      'Turn an outdated, slow, or hard-to-manage site into a clear, modern home for your business.',
    body:
      'If your website no longer reflects the quality of your business, we will help you fix the parts that are costing you trust and enquiries. That may mean a focused improvement or a full redesign—always guided by what customers need to understand and do.\n\nThe result is a faster, clearer, mobile-friendly site your team can feel confident sending people to.',
    includes: [
      'Message, navigation, and conversion review',
      'Modern responsive design for phones and desktops',
      'Performance, accessibility, and search fundamentals',
      'Content and page improvements around real customer questions',
      'A clean launch plan with no avoidable disruption',
    ],
    meta: [
      { key: 'Starts with', value: 'Free website review' },
      { key: 'Engagement', value: 'Focused improvement project' },
      { key: 'Good fit for', value: 'Sites that feel a step behind' },
    ],
  },
  {
    id: 'website-care',
    name: 'Ongoing Website Care',
    summary:
      'One dependable partner for updates, monitoring, fixes, and steady improvements each month.',
    body:
      "A website is not finished the day it launches. Software changes, content gets stale, and small issues become expensive when nobody owns them. Monthly care gives your business a consistent place to take updates, questions, and problems.\n\nWe learn the site and the business behind it, so you do not have to brief a new freelancer every time something needs attention.",
    includes: [
      'Routine content and page updates',
      'Security, dependency, and uptime monitoring',
      'Backups, recovery checks, and issue response',
      'Performance and accessibility maintenance',
      'A monthly improvement plan with clear priorities',
    ],
    meta: [
      { key: 'Cadence', value: 'Ongoing, month to month' },
      { key: 'Engagement', value: 'Predictable monthly care' },
      { key: 'Good fit for', value: 'Businesses without web staff' },
    ],
  },
  {
    id: 'growth-infrastructure',
    name: 'Reliable Growth Infrastructure',
    summary:
      'Hosting, integrations, and technical foundations that stay dependable when attention and traffic increase.',
    body:
      "Growth should create opportunity, not a scramble to keep the website online. We strengthen the systems behind your site so campaigns, seasonal traffic, new locations, and new customer needs do not expose avoidable weak points.\n\nThat includes choosing sensible hosting, simplifying fragile integrations, and planning capacity before it becomes urgent—not selling complexity your business does not need.",
    includes: [
      'Hosting and deployment reliability review',
      'Traffic, speed, and capacity planning',
      'Analytics, forms, CRM, and business-system integrations',
      'Monitoring and practical recovery planning',
      'Technical improvements staged around business priorities',
    ],
    meta: [
      { key: 'Goal', value: 'Fewer surprises as demand grows' },
      { key: 'Engagement', value: 'Project or monthly care' },
      { key: 'Good fit for', value: 'Sites becoming business-critical' },
    ],
  },
];

/* --- PROCESS -------------------------------------------------------------
   A real sequence from first review through ongoing care.                   */
export const process = {
  label: 'How it works',
  heading: 'A clear path from outdated to looked after.',
  intro:
    'You do not need a technical brief. We start with the website you have, explain what matters, and move at a pace that fits the business.',
  steps: [
    {
      title: 'Free website review',
      body: 'We look at your current site through a customer’s eyes—clarity, trust, mobile experience, speed, and obvious technical risks.',
    },
    {
      title: 'Practical recommendations',
      body: 'You get a plain-English view of what to fix now, what can wait, and whether a focused refresh or broader redesign makes sense.',
    },
    {
      title: 'Redesign or improvement',
      body: 'We make the agreed changes, keep disruption low, and show progress as the improved site takes shape.',
    },
    {
      title: 'Ongoing monthly care',
      body: 'After launch, we stay responsible for updates, monitoring, fixes, and the next improvements as your business grows.',
    },
  ],
};

/* --- "HOW WE WORK" -------------------------------------------------------
   The questions clients ask before committing to a build. Answer them
   plainly — vague answers here are the ones that lose the work.            */
export const credibility = {
  label: 'A long-term partner',
  heading: 'Someone stays responsible.',
  intro: 'Clear ownership, steady communication, and support that continues after the redesigned site goes live.',
  items: [
    {
      q: 'Do we need to know what is wrong first?',
      a: 'No. The free review is designed to find that out. We separate business-impacting issues from nice-to-have changes and explain the tradeoffs in plain language.',
    },
    {
      q: 'Can you work with our existing website?',
      a: 'Usually, yes. We first determine what is worth keeping, what can be improved safely, and whether rebuilding would be the more responsible long-term choice.',
    },
    {
      q: 'How is the work priced?',
      a: 'Ongoing care is a published monthly plan — Care, Improve, or Grow — so you know the number before you start. The consultation and your first website design are free, and larger projects outside a plan are scoped and agreed before any work begins.',
    },
    {
      q: 'Who owns the website and accounts?',
      a: 'You do. Your website, domain, hosting accounts, content, and access stay under your control. Monthly care pays for ongoing help, not access to your own property.',
    },
    {
      q: 'What happens after launch?',
      a: 'Every refresh includes a 90-day warranty for the agreed work. If you choose monthly care, we also handle routine updates, monitoring, fixes, and planned improvements from there.',
    },
    {
      q: 'What happens as traffic grows?',
      a: 'We watch the signals that matter, remove bottlenecks before they become outages, and recommend infrastructure changes only when the business case is real.',
    },
  ],
};

/* --- ABOUT PAGE ---------------------------------------------------------- */
export const about = {
  label: 'About',
  headingLead: 'The website partner',
  headingAccent: 'who stays involved.',

  // Each string is its own paragraph.
  story: [
    'CodeView Solutions is a website and technology partner. We help small and midsize businesses replace outdated web experiences with sites that are clearer, faster, and easier to trust.',
    'Our work connects design, content, development, hosting, and ongoing support. That means fewer handoffs, fewer mystery problems, and one partner who understands how the whole website fits together.',
    'We prefer long-term relationships because good websites improve through steady attention. The goal is not to launch something flashy and disappear; it is to keep a valuable business asset healthy as your needs change.',
  ],

  // Short facts in the sidebar card. Delete any that don't apply.
  // No "Founded" row by decision — see the note on hero.facts.
  facts: [
    { key: 'Entity', value: 'CodeView Solutions LLC' },
    { key: 'Focus', value: 'Website modernization and care' },
    { key: 'Works with', value: 'Small and midsize businesses' },
  ],

  toolsLabel: 'What we look after',
  toolsHeading: 'The whole website, not just the launch.',
  toolsLede:
    'The right tools vary by site. The responsibility does not: keep the experience useful, the systems dependable, and the next decision clear.',

  // Edit to match what you actually use — an honest short list reads better
  // than an exhaustive one.
  stack: [
    { group: 'Customer experience', items: ['Clear messaging', 'Responsive design', 'Accessibility', 'Conversion paths'] },
    { group: 'Website health', items: ['Updates', 'Security', 'Backups', 'Uptime monitoring'] },
    {
      group: 'Performance',
      items: ['Page speed', 'Search foundations', 'Analytics', 'Traffic readiness'],
    },
    { group: 'Business connections', items: ['Forms', 'CRM', 'Scheduling', 'Third-party integrations'] },
  ],
};

/* --- CONTACT PAGE -------------------------------------------------------- */
export const contact = {
  label: 'Free website review',
  headingLead: 'Let’s look at',
  headingAccent: 'the site you have.',
  intro:
    'Send the website address and tell us what feels outdated, frustrating, or unreliable. We will reply within one business day to arrange a no-obligation review.',

  // Heading on the card beside the form.
  directLabel: 'Prefer to talk first?',

  // Options in the "What do you need?" dropdown on the form.
  projectTypes: [
    'Free website review',
    'Modern website refresh',
    'Ongoing website care',
    'Reliable growth infrastructure',
    'Not sure yet',
  ],
};

/* --- SECTION HEADINGS ----------------------------------------------------
   Headings for the sections that are not covered above. `Accent` fields are
   the phrase the revision cloud is drawn around.                            */
export const sections = {
  homeServices: {
    label: 'Website partnership',
    heading: 'Improve it. Care for it. Grow on it.',
    lede: 'Start with the problem in front of you, then keep one dependable partner in place for what comes next.',
  },
  servicesIntro: {
    label: 'Services',
    headingLead: 'A stronger website,',
    headingAccent: 'with someone behind it.',
    lede: 'Three practical ways to improve the site you have now and keep it dependable as the business asks more of it.',
  },
};

/* --- CALLS TO ACTION -----------------------------------------------------
   The band at the bottom of each page. `accent` is the clouded phrase.      */
export const ctas = {
  home: {
    heading: 'Start with a free',
    accent: 'website review.',
    body: 'We will look at what customers see, identify the highest-value improvements, and explain the next step in plain language.',
  },
  services: {
    heading: 'Not sure what',
    accent: 'your website needs?',
    body: 'That is exactly what the free review is for. We will separate urgent issues from useful improvements and give you a sensible path forward.',
    label: 'Get a free website review',
  },
  about: {
    heading: 'Meet your next',
    accent: 'website partner.',
    body: 'Start with a free review, with no obligation to continue.',
  },
};

/* --- SEO / SOCIAL SHARING -----------------------------------------------
   Per-page titles and descriptions. Keep descriptions near 150–160
   characters — search engines truncate past that.                          */
export const meta = {
  home: {
    title: 'Website Redesign & Monthly Care — CodeView Solutions LLC',
    description:
      'Modern website redesign, predictable monthly care, and reliable growth infrastructure for small and midsize businesses. Start with a free website review.',
  },
  services: {
    title: 'Website Redesign, Care & Growth Services — CodeView Solutions',
    description:
      'Modern website refreshes, ongoing monthly website care, and reliable infrastructure for growing small and midsize businesses.',
  },
  about: {
    title: 'About — CodeView Solutions LLC',
    description:
      'CodeView Solutions is a long-term website partner, helping small and midsize businesses improve and maintain their sites.',
  },
  contact: {
    title: 'Free Website Review — CodeView Solutions LLC',
    description:
      'Request a free, no-obligation website review from CodeView Solutions. Get a plain-English view of what to fix now and what can wait.',
  },
};

/* --- PLANS ---------------------------------------------------------------
   Published pricing. Three tiers named after the three things the site says
   it does — Improve it, Care for it, Grow on it — so the plan ladder and the
   services use one vocabulary.

   `monthly.amount` and `annual.amount` are both rendered; CSS shows one and
   hides the other based on the switch, so the monthly column is still correct
   with JavaScript disabled.

   NOTE: this is the first pricing ever published on the site. If you change a
   number here, change it here only — every world reads from this list.       */
export const plans = {
  label: 'Plans',
  heading: 'A plan, not an invoice you cannot predict.',
  intro:
    'Every plan starts the same way: a free consultation and your first website design at no cost. The monthly fee is for looking after it afterwards.',

  // Labels on the billing switch.
  cycles: { monthly: 'Monthly', annual: 'Pay yearly' },
  cycleHint: 'Pay yearly and save.',

  tiers: [
    {
      id: 'care',
      name: 'Care',
      tagline: 'Keep a good website healthy.',
      monthly: { amount: '$10', period: 'per month' },
      annual: { amount: '$90', period: 'per year', note: 'Saves $30 a year' },
      includes: [
        'Free consultation and first website design',
        'Routine content and page updates',
        'Security, dependency, and uptime monitoring',
        'Backups and recovery checks',
        '90-day warranty on the agreed work',
        'Reply within one business day',
      ],
    },
    {
      id: 'improve',
      name: 'Improve',
      tagline: 'Keep making it better every month.',
      monthly: { amount: '$50', period: 'per month' },
      annual: { amount: '$540', period: 'per year', note: 'Saves $60 a year' },
      includes: [
        'Everything in Care',
        'A monthly improvement plan with clear priorities',
        'Message, navigation, and conversion review',
        'Performance and accessibility maintenance',
        'Search fundamentals and analytics',
        'Forms and page improvements as you need them',
      ],
    },
    {
      id: 'grow',
      name: 'Grow',
      tagline: 'Stay dependable as demand increases.',
      monthly: { amount: '$100', period: 'per month' },
      annual: { amount: '$1,080', period: 'per year', note: 'Saves $120 a year' },
      includes: [
        'Everything in Improve',
        'Hosting and deployment reliability review',
        'Traffic, speed, and capacity planning',
        'CRM and business-system integrations',
        'Monitoring and practical recovery planning',
        'Technical work staged around business priorities',
      ],
    },
  ],

  cta: 'Get a free website review',
  footnote:
    'The consultation and your first website design are free on every plan. Larger projects outside a plan are scoped and agreed before any work begins, and you own the website, domain, hosting accounts, and content throughout.',
};

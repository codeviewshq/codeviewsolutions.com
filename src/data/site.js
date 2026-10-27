// Shared company facts and marketing content. Keep unconfigured contact routes hidden.
export const site = {
  name: "CodeView Solutions",
  legalName: "CodeView Solutions LLC",
  domain: "codeviewsolutions.com",
  url: "https://codeviewsolutions.com",
  tagline: "Websites, software, and integrations that fit how you work.",
  blurb: "Websites, custom software, and integrations for small and midsize businesses across the US.",
  email: "hello@codeviewsolutions.com",
  phone: "732.588.3179",
  serviceArea: "Working with businesses across the United States",
  // HTTPS receiver for the Contact form; leave unset to keep the form disabled.
  contactEndpoint: "<VARIABLE>",
  links: [
    { label: "GitHub", href: "[YOUR GITHUB URL]" },
    { label: "LinkedIn", href: "[YOUR LINKEDIN URL]" },
  ],
};

export const nav = [
  { label: "Services", href: "/services/" },
  { label: "Work", href: "/work/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

export const consultationHref = `mailto:${site.email}?subject=${encodeURIComponent("Let’s talk about a project")}`;

export const hero = {
  headline: "Tell us what’s",
  accent: "in your way.",
  body: "Websites, custom software, and integrations for small and midsize businesses. Bring us the thing that’s slowing you down, and we’ll help you fix it.",
  primaryCta: { label: "Let’s talk", href: "/contact/" },
  secondaryCta: { label: "See how we work", href: "/#approach" },
};

export const services = [
  {
    id: "digital-experiences",
    name: "Your website should be working for you.",
    discipline: "Websites & digital experiences",
    summary:
      "A clear, fast website that explains what you do and makes it easy for people to get in touch.",
    body: "If your site is hard to update, looks off on a phone, or just isn’t bringing in enquiries, it’s worth fixing. We work out what your customers need to see, then write, design, and build around that, so you end up with a site you can actually keep up to date.\n\nThat might be a full rebuild or a focused redesign. Either way, we start with your customers and your goals, not a template.",
    includes: [
      "Working out what your site needs to say",
      "Design and development that works on every screen",
      "Accessible, fast-loading pages",
      "Help with launch, and a handover you can follow",
    ],
  },
  {
    id: "products-and-portals",
    name: "When spreadsheets and email stop keeping up.",
    discipline: "Digital products & portals",
    summary:
      "Custom portals and tools that give your customers or your team a simpler way to get things done.",
    body: "A lot of important work runs on spreadsheets, shared inboxes, and follow-up emails. That works until it doesn’t. A customer portal or an internal tool can turn a messy process into something people finish in a few clicks.\n\nWe help you decide what the first useful version should do, design it around the people who’ll use it, and build it so it can grow with you.",
    includes: [
      "Deciding what the first version needs to do",
      "Designing how each screen will work",
      "Custom development",
      "Testing with real use, then handover",
    ],
  },
  {
    id: "connected-systems",
    name: "Stop typing the same thing twice.",
    discipline: "APIs, integrations & automation",
    summary:
      "We connect the tools you already use, so information moves between them without someone copying it by hand.",
    body: "If someone on your team copies orders, contacts, or invoices from one system into another, that’s time you could get back, and a place where mistakes creep in.\n\nOften you don’t need new software, just better connections between what you already have. We use APIs and third-party integrations to move information between your tools, cut out manual steps, and write down how it all fits together.",
    includes: [
      "Mapping how information moves today",
      "Connecting your tools through their APIs",
      "Automating the repetitive steps",
      "Clear notes on what connects to what",
    ],
  },
  {
    id: "consulting",
    name: "Not sure what to do next?",
    discipline: "Technology & product consulting",
    summary:
      "An honest second opinion before you spend money on new software or a rebuild.",
    body: "Maybe you have quotes that don’t agree with each other, or you’re weighing an off-the-shelf product against something custom. It helps to talk it through with someone who isn’t trying to sell you a particular answer.\n\nBring the problem as you see it. We’ll help you understand the options, the tradeoffs, and a sensible scope, so you can decide with confidence.",
    includes: [
      "A look at what you have today",
      "Off-the-shelf or custom: a straight comparison",
      "A practical plan for what to do first",
      "Clear next steps you can act on",
    ],
  },
];

export const process = [
  {
    title: "We listen first.",
    body: "We start by understanding your business, the people involved, and what’s actually getting in the way. Questions come before any proposed solution.",
  },
  {
    title: "We agree on a plan.",
    body: "Together we decide what to build, what to connect, and what can wait. You’ll know the scope and fees before any work starts.",
  },
  {
    title: "We build it with you.",
    body: "Design and development happen side by side, and you’ll see progress along the way. When there’s a decision to make, we explain it in plain language.",
  },
  {
    title: "You stay in control.",
    body: "At handover you get the code, accounts, and documentation. If you’d like ongoing support, we agree it around what you need.",
  },
];

export const questions = [
  {
    q: "Do I need to know exactly what I want?",
    a: "Not at all. Most people come to us with a problem, not a plan. The free consultation is where we work out what’s going on and what a sensible next step looks like.",
  },
  {
    q: "Can you work with the tools we already use?",
    a: "Yes. We can look at your current website, software, or workflow and find a practical way to improve or connect it. Sometimes an existing tool is the right answer; sometimes something custom makes more sense.",
  },
  {
    q: "How much will it cost?",
    a: "It depends on what we agree to do. Before any work starts, we’ll set out the scope and fees for your project, including anything that depends on third-party products, and how changes will be handled.",
  },
  {
    q: "Who owns the finished work?",
    a: "You do. Your website, custom code, content, accounts, and documentation stay yours. If a project relies on third-party products, we’ll name them and their terms up front.",
  },
  {
    q: "What happens once it’s finished?",
    a: "We agree the handover and any ongoing support as part of the project, so you know what happens next before the work begins. There’s no subscription to sign up for.",
  },
];

export const meta = {
  home: {
    title: "CodeView Solutions — Websites, Software & Integrations",
    description:
      "We help small and midsize businesses fix what’s slowing them down: websites, custom software, and the connections between their tools. Start with a free consultation.",
  },
  services: {
    title: "How We Can Help — CodeView Solutions",
    description:
      "Websites that bring in enquiries, portals that replace spreadsheets, integrations that stop the copying and pasting, and honest advice on what to do next.",
  },
  work: {
    title: "Work & Product Demos — CodeView Solutions",
    description:
      "Examples of our work and product demos are on their way. In the meantime, we’re happy to talk through how we’d approach your project.",
  },
  about: {
    title: "About Us — CodeView Solutions",
    description:
      "We help businesses plan, design, and build technology that fits how they work, explained in plain language, with you in control of the result.",
  },
  contact: {
    title: "Contact — CodeView Solutions",
    description:
      "Tell us what’s getting in the way. The first consultation is free, with no obligation, and we reply within one business day.",
  },
};

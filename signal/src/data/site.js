export const site = {
  name: 'CodeView Solutions',
  legalName: 'CodeView Solutions LLC',
  theme: 'signal',
  phone: '(732) 654-9519',
  phoneHref: 'tel:7326549519',
  email: '',
  responseTime: 'Within one business day',
  description: 'Custom software, technical consulting, and practical AI integration for small and midsize businesses across the United States.',
  // Either set PUBLIC_CONTACT_ENDPOINT in .env or set a real form endpoint here.
  // Forms submit only when an HTTPS endpoint is configured.
  contactEndpoint: '',
};

export const nav = [
  { label: 'Services', href: '/services/' },
  { label: 'Website care', href: '/website-care/' },
  { label: 'About', href: '/about/' },
];

export const services = [
  {
    slug: 'software-development', icon: 'code', name: 'Software Development',
    summary: 'Applications and tools built around your business.',
    description: 'Turn the workarounds, spreadsheets, and disconnected systems into software that fits the way your business works.',
    headline: 'Build the software your business needs.',
    intro: 'A customer portal. A better internal tool. Systems that finally talk to each other. We turn a business problem into a practical, well-scoped application.',
    outcomes: ['Less manual work and fewer disconnected processes', 'A clearer experience for customers and colleagues', 'Code, accounts, and documentation under your control'],
    includes: ['Web applications and customer portals', 'Internal tools and business dashboards', 'APIs and third-party integrations', 'Database design and data migration', 'Deployment, documentation, and handover'],
    examples: [
      { title: 'Customer portals', body: 'Give customers a clear place to view information, make requests, and follow progress.' },
      { title: 'Internal operations', body: 'Replace repeated manual steps with a tool designed around the actual workflow.' },
      { title: 'Connected systems', body: 'Move information between the tools you already use, with fewer copy-and-paste handoffs.' },
    ],
    steps: ['Understand the workflow and define what success looks like.', 'Agree the scope, priorities, and cost before development.', 'Build in useful milestones, review together, and hand over clearly.'],
  },
  {
    slug: 'technical-consulting', icon: 'compass', name: 'Technical Consulting',
    summary: 'Clear technical decisions before you commit.',
    description: 'Get a practical view of your systems, options, and next steps before investing time and budget.',
    headline: 'Make your next technical decision a clear one.',
    intro: 'When the options are complicated, the advice should be clear. We help you understand what you have, what is getting in the way, and what to do next.',
    outcomes: ['A plain-English view of the problem and its tradeoffs', 'Priorities that fit the business and available budget', 'A useful plan you can act on, with or without us'],
    includes: ['Architecture and codebase reviews', 'Project discovery, scope, and estimation', 'Vendor and platform evaluation', 'Technical roadmaps and delivery planning', 'Ongoing technical guidance'],
    examples: [
      { title: 'Before a new build', body: 'Check the assumptions, compare approaches, and define the smallest useful first version.' },
      { title: 'When a system struggles', body: 'Review the bottlenecks, fragile connections, and maintenance risks before choosing a fix.' },
      { title: 'When choosing a vendor', body: 'Translate proposals and technology choices into business implications and practical questions.' },
    ],
    steps: ['Start with your decision, concerns, and existing material.', 'Review the relevant systems and compare realistic options.', 'Explain the findings, priorities, and recommended next steps.'],
  },
  {
    slug: 'ai-integration', icon: 'workflow', name: 'AI Integration',
    summary: 'AI features and automation with a practical purpose.',
    description: 'Use AI where it makes the work better, with a clear role for your information, people, and existing systems.',
    headline: 'Put AI to work on a real business problem.',
    intro: 'Start with a useful task, not a technology trend. We help you evaluate, build, and integrate AI features with sensible boundaries and a way to judge whether they work.',
    outcomes: ['A defined use case and a practical way to evaluate it', 'Features connected to your existing information and workflow', 'A clear view of cost, reliability, and human review'],
    includes: ['AI features in existing applications', 'Search and answers over your own documents', 'Workflow and document-processing automation', 'Evaluation of output quality and failure cases', 'Cost, latency, and access-control review'],
    examples: [
      { title: 'Find the right information', body: 'Help people search internal material and trace answers back to the supporting documents.' },
      { title: 'Reduce repetitive handling', body: 'Extract, summarize, or organize information while keeping an appropriate human review step.' },
      { title: 'Improve an existing product', body: 'Add a focused AI feature to the software you already use, then evaluate it against real tasks.' },
    ],
    steps: ['Choose the task, success criteria, and information boundaries.', 'Test a focused prototype against realistic examples.', 'Integrate the useful parts, with evaluation and handover.'],
  },
];

export const process = [
  { title: 'Plan', body: 'Tell us where the business is getting stuck. We clarify the problem, agree the scope, and set a sensible starting point.' },
  { title: 'Build', body: 'We develop and review the work in useful milestones, so decisions stay clear and progress stays visible.' },
  { title: 'Support', body: 'You get a clear handover and ownership of your code. We agree any ongoing help around what you actually need.' },
];

export const faqs = [
  { q: 'Do I need a technical specification to get started?', a: 'No. Describe the problem, who it affects, and how you handle it today. We help turn that into a practical scope before development begins.' },
  { q: 'Can you work with our existing software?', a: 'Yes. We can start with a review of the current system and explain what is worth keeping, what can be improved, and when a rebuild makes sense.' },
  { q: 'How is custom software priced?', a: 'Software development, consulting, and AI work are scoped individually. We agree the work and cost before you commit. The published monthly plans are specifically for website care.' },
  { q: 'Who owns the code and accounts?', a: 'You do. Code, documentation, and the accounts needed to run the agreed work are handed over under your control.' },
  { q: 'What happens after launch?', a: 'We document and hand over the work clearly. Ongoing maintenance and further improvements can be agreed separately. Website refreshes include a 90-day warranty on the agreed work.' },
  { q: 'Do you also build and look after websites?', a: 'Yes. Website redesign, monthly care, and reliable hosting foundations remain part of our offer. You can start with a free website review.' },
];

export const plans = [
  { id: 'care', name: 'Care', tagline: 'Keep a good website healthy.', monthly: '$10', annual: '$90', saving: 'Save $30 a year', includes: ['Free consultation and first website design', 'Routine content and page updates', 'Security, dependency, and uptime monitoring', 'Backups and recovery checks', '90-day warranty on the agreed website work', 'Reply within one business day'] },
  { id: 'improve', name: 'Improve', tagline: 'Keep making it better.', monthly: '$50', annual: '$540', saving: 'Save $60 a year', includes: ['Everything in Care', 'A monthly improvement plan', 'Message, navigation, and conversion review', 'Performance and accessibility maintenance', 'Search fundamentals and analytics', 'Forms and page improvements'] },
  { id: 'grow', name: 'Grow', tagline: 'Stay dependable as demand grows.', monthly: '$100', annual: '$1,080', saving: 'Save $120 a year', includes: ['Everything in Improve', 'Hosting and deployment reliability review', 'Traffic, speed, and capacity planning', 'CRM and business-system integrations', 'Monitoring and recovery planning', 'Technical work around business priorities'] },
];

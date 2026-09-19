// Long-form detail for each service, keyed by the slug used in /services/:slug.
// The summary cards on the home and services pages come from `services` in
// site.js; this file holds everything the dedicated page adds on top.

export const serviceDetails = {
  'app-development': {
    tagline: 'Mobile apps your customers keep on the home screen',
    overview: [
      'We design and build mobile applications for iOS and Android that feel native, load fast, and hold up under real usage. Whether you need a customer-facing product, an internal tool for field staff, or a companion app for an existing platform, we start from how people will actually use it and work backwards to the architecture.',
      'Every build ships with analytics, crash reporting, and an app store release process we run for you — so launch day is a deployment, not an event.',
    ],
    capabilities: [
      {
        title: 'Native iOS & Android',
        description:
          'Swift and Kotlin builds when platform-specific performance, hardware access, or App Store features matter most.',
      },
      {
        title: 'Cross-platform delivery',
        description:
          'React Native and Flutter for teams that want one codebase, two platforms, and a faster path to market.',
      },
      {
        title: 'Offline-first architecture',
        description:
          'Local storage and sync strategies so your app stays useful on patchy connections and syncs cleanly when it recovers.',
      },
      {
        title: 'Store submission & releases',
        description:
          'App Store and Play Store setup, review handling, staged rollouts, and over-the-air updates where the platform allows.',
      },
    ],
    stack: ['Swift', 'Kotlin', 'React Native', 'Flutter', 'Firebase', 'App Store Connect'],
    outcomes: [
      'Apps that load in under two seconds on mid-range devices',
      'A single release pipeline for both platforms',
      'Crash-free session rates you can actually monitor',
    ],
  },

  'web-development': {
    tagline: 'Websites and web apps built to grow with your brand',
    overview: [
      'From marketing sites to complex web applications, we build on modern frameworks that stay fast as your content and traffic grow. Responsive by default, accessible by default, and measured against Core Web Vitals rather than a designer’s mockup on a desktop monitor.',
      'We handle the whole stack — front end, APIs, database, hosting and CI — or slot into an existing team and own a clearly defined piece of it.',
    ],
    capabilities: [
      {
        title: 'Responsive front ends',
        description:
          'Layouts that work from a 320px phone to an ultrawide display, tested on real devices rather than browser resizing.',
      },
      {
        title: 'Performance engineering',
        description:
          'Code splitting, image optimisation, caching and CDN configuration aimed at measurable Core Web Vitals improvements.',
      },
      {
        title: 'SEO foundations',
        description:
          'Semantic markup, structured data, server rendering where it helps, canonical URLs and clean sitemaps.',
      },
      {
        title: 'APIs & integrations',
        description:
          'REST and GraphQL services, third-party integrations, webhooks and background jobs behind a stable contract.',
      },
    ],
    stack: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Vercel'],
    outcomes: [
      'Faster pages and better search visibility',
      'A codebase your own developers can pick up',
      'Deployments that take minutes, not maintenance windows',
    ],
  },

  'wordpress-development': {
    tagline: 'WordPress that is fast, secure, and genuinely easy to edit',
    overview: [
      'WordPress runs a large share of the web, and most of it runs badly — bloated themes, plugin conflicts, and an admin screen nobody wants to open. We build custom themes and plugins instead, so the site stays quick and your team can update it without calling a developer.',
      'We also take over existing WordPress sites: auditing plugins, removing what is not earning its place, hardening security, and getting page speed back under control.',
    ],
    capabilities: [
      {
        title: 'Custom themes',
        description:
          'Purpose-built themes with block editor support, so content editors get sensible, constrained building blocks.',
      },
      {
        title: 'Plugin development',
        description:
          'Bespoke functionality written as a maintainable plugin rather than patched into a theme that a future update overwrites.',
      },
      {
        title: 'Performance tuning',
        description:
          'Query optimisation, object and page caching, image handling and CDN setup for sites that got slow over time.',
      },
      {
        title: 'Security hardening',
        description:
          'Update policy, least-privilege roles, firewall and malware scanning, plus tested backups and a restore plan.',
      },
    ],
    stack: ['WordPress', 'PHP', 'MySQL', 'WooCommerce', 'ACF', 'Gutenberg'],
    outcomes: [
      'Editors who can publish without a developer',
      'Fewer plugins and fewer things that can break',
      'A site that survives its own updates',
    ],
  },

  'salesforce-development': {
    tagline: 'Salesforce shaped around how your business actually runs',
    overview: [
      'Out of the box, Salesforce reflects a generic sales process. We configure and extend it to match yours — custom objects, flows, validation, and Apex where declarative tools run out of road — so your team stops working around the CRM and starts working in it.',
      'We also connect Salesforce to the rest of your stack: billing, support, marketing and data warehouse, so a record updated in one place is correct everywhere.',
    ],
    capabilities: [
      {
        title: 'Custom development',
        description:
          'Apex, Lightning Web Components and custom objects for the parts of your process that configuration cannot cover.',
      },
      {
        title: 'Systems integration',
        description:
          'Bidirectional sync with ERP, billing, support and marketing platforms through the Salesforce API or middleware.',
      },
      {
        title: 'Process automation',
        description:
          'Flows, approval processes and scheduled jobs that replace the spreadsheets and manual handoffs around the CRM.',
      },
      {
        title: 'Data migration',
        description:
          'Mapping, cleansing and staged migration from legacy CRMs, with reconciliation you can verify before cutover.',
      },
    ],
    stack: ['Apex', 'Lightning Web Components', 'Salesforce Flow', 'SOQL', 'MuleSoft', 'Sales Cloud'],
    outcomes: [
      'One record of truth across your systems',
      'Manual data entry replaced by automation',
      'Reports leadership trusts enough to act on',
    ],
  },

  'gen-ai-solutions': {
    tagline: 'AI applied to specific problems, not bolted on for the demo',
    overview: [
      'Generative AI is useful when it is pointed at a concrete task: answering support questions from your own documentation, extracting structure from messy documents, drafting content a human then approves. We build those systems, evaluate them honestly, and tell you where the technology is not the right tool.',
      'That means retrieval pipelines grounded in your data, guardrails and human review where accuracy matters, and cost and latency budgets agreed before we build rather than discovered in production.',
    ],
    capabilities: [
      {
        title: 'Retrieval-augmented assistants',
        description:
          'Chat and search over your own documents and data, with citations so users can verify every answer.',
      },
      {
        title: 'Document processing',
        description:
          'Extracting structured fields from invoices, contracts and forms, with confidence scores and review queues.',
      },
      {
        title: 'Workflow automation',
        description:
          'Classification, routing, summarisation and drafting embedded into existing tools rather than another app to open.',
      },
      {
        title: 'Evaluation & monitoring',
        description:
          'Test sets, accuracy tracking and cost dashboards, so quality regressions surface before your users find them.',
      },
    ],
    stack: ['Python', 'Claude API', 'OpenAI API', 'LangChain', 'Vector databases', 'AWS Bedrock'],
    outcomes: [
      'Measured accuracy, not anecdotes',
      'Predictable per-request cost and latency',
      'A clear boundary between what the model decides and what a person approves',
    ],
  },

  'ui-ux-design': {
    tagline: 'Interfaces that make the next step obvious',
    overview: [
      'Good design is not decoration — it is the difference between a user completing a task and abandoning it. We research how your users work, prototype the flows, test them with real people, and hand engineering a design system rather than a folder of screenshots.',
      'For existing products, we run usability audits that identify exactly where users drop off, and prioritise fixes by impact rather than by how much they bother the design team.',
    ],
    capabilities: [
      {
        title: 'User research',
        description:
          'Interviews, task analysis and journey mapping to find out what users are actually trying to do.',
      },
      {
        title: 'Wireframing & prototyping',
        description:
          'Clickable prototypes that answer layout and flow questions before a line of production code is written.',
      },
      {
        title: 'Design systems',
        description:
          'Tokens, components and usage rules that keep a product consistent as more people contribute to it.',
      },
      {
        title: 'Accessibility',
        description:
          'WCAG 2.1 AA as a baseline: contrast, keyboard operation, screen reader semantics and focus management.',
      },
    ],
    stack: ['Figma', 'Design tokens', 'Storybook', 'WCAG 2.1 AA', 'Usability testing'],
    outcomes: [
      'Higher completion rates on the flows that matter',
      'Designers and developers working from the same components',
      'Accessibility handled during design, not retrofitted',
    ],
  },

  'database-security': {
    tagline: 'Protection for the data your business cannot afford to lose',
    overview: [
      'Your database usually holds the most sensitive thing you own. We assess how it is currently exposed, close the gaps, and put controls in place that keep it protected as the system changes — encryption, access control, auditing, and backups that have actually been tested by restoring them.',
      'Where regulation applies, we map the controls to the standard you are held to, and leave you with evidence an auditor will accept.',
    ],
    capabilities: [
      {
        title: 'Encryption',
        description:
          'Encryption at rest and in transit, key management and rotation, and field-level encryption for the most sensitive columns.',
      },
      {
        title: 'Access control',
        description:
          'Role-based permissions, least privilege by default, credential rotation and removal of shared logins.',
      },
      {
        title: 'Backup & recovery',
        description:
          'Automated backups, point-in-time recovery and documented restore drills with a measured recovery time.',
      },
      {
        title: 'Auditing & compliance',
        description:
          'Query and access logging, anomaly alerting, and control mapping for HIPAA, PCI DSS, SOC 2 and GDPR.',
      },
    ],
    stack: ['PostgreSQL', 'MySQL', 'MongoDB', 'AWS KMS', 'HashiCorp Vault', 'SOC 2', 'HIPAA'],
    outcomes: [
      'A restore you have proven, not one you assume works',
      'No shared credentials and no standing admin access',
      'Audit evidence ready before the auditor asks',
    ],
  },

  cybersecurity: {
    tagline: 'Defence that assumes attackers are already trying',
    overview: [
      'We assess your systems the way an attacker would, fix what we find, and put monitoring in place so the next attempt is caught rather than discovered months later. Threat assessments, penetration testing, security audits and continuous monitoring, sized to your actual risk rather than a checklist.',
      'Findings come with severity, exploitability and a remediation plan in priority order — not a 200-page scanner dump for you to triage yourself.',
    ],
    capabilities: [
      {
        title: 'Threat assessment',
        description:
          'Mapping your attack surface, modelling realistic threats, and ranking them by likelihood and impact.',
      },
      {
        title: 'Security audits',
        description:
          'Code review, configuration review and penetration testing against your applications and infrastructure.',
      },
      {
        title: '24/7 monitoring',
        description:
          'Log aggregation, intrusion detection and alerting with defined escalation paths and on-call response.',
      },
      {
        title: 'Incident response',
        description:
          'A rehearsed plan covering containment, eradication, recovery and the post-incident review.',
      },
    ],
    stack: ['OWASP Top 10', 'SIEM', 'Penetration testing', 'Zero trust', 'ISO 27001', 'NIST CSF'],
    outcomes: [
      'Vulnerabilities ranked by real exploitability',
      'Detection measured in minutes rather than months',
      'An incident plan your team has actually practised',
    ],
  },
};

export const deliveryProcess = [
  {
    step: '01',
    title: 'Consultation',
    description: 'We learn your goals, constraints and existing systems before proposing anything.',
  },
  {
    step: '02',
    title: 'Planning & proposal',
    description: 'Scope, timeline, cost and deliverables written down, with no hidden line items.',
  },
  {
    step: '03',
    title: 'Design & prototyping',
    description: 'Flows and interfaces agreed while changes are still cheap to make.',
  },
  {
    step: '04',
    title: 'Development & testing',
    description: 'Iterative delivery with code review, automated tests and security checks throughout.',
  },
  {
    step: '05',
    title: 'Deployment & launch',
    description: 'Staged rollout, monitoring in place, and a handover your team can work from.',
  },
  {
    step: '06',
    title: 'Support & maintenance',
    description: 'Updates, patches, performance work and a support channel that answers.',
  },
];

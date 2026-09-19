// Long-form case-study copy for each /portfolio/:slug page.
//
// NOTE: this is representative copy describing the kind of work each project
// involved. The figures under `results` are illustrative placeholders — swap
// them for the real, agreed numbers before publishing, and only quote metrics
// the client is happy to have public.

export const projectDetails = {
  'ecommerce-platform': {
    tagline: 'A storefront that stays fast as the catalogue grows',
    client: 'Footwear retailer',
    duration: '14 weeks',
    services: ['Web Development', 'UI/UX Design', 'Database Security'],
    overview: [
      'The client was running a hosted storefront that could not keep up with their catalogue or their marketing. Product pages were slow, the checkout lost customers at the payment step, and merchandising changes meant raising a support ticket.',
      'We rebuilt the store as a custom application with a headless commerce backend, giving the team direct control over merchandising and a checkout measured against real conversion data rather than assumptions.',
    ],
    challenge:
      'Peak-season traffic was three to four times the daily average, and the existing platform degraded exactly when it mattered most. Payment handling also had to satisfy PCI DSS without pushing card data through the client’s own systems.',
    solution:
      'A React storefront backed by a headless commerce API, with server-rendered product pages for search visibility and a CDN in front of everything. Payments run through a tokenised provider integration, so card data never touches the client’s infrastructure and PCI scope stays minimal.',
    features: [
      {
        title: 'Responsive storefront',
        description:
          'A single layout that works from phone to desktop, with product imagery served at the right size for each device.',
      },
      {
        title: 'Tokenised checkout',
        description:
          'Card details go straight to the payment provider. The store never stores or transmits raw card data.',
      },
      {
        title: 'Self-service merchandising',
        description:
          'Collections, promotions and homepage layout are all editable by the client’s team without a developer.',
      },
      {
        title: 'Search and filtering',
        description:
          'Faceted search across size, colour and category that stays responsive as the catalogue grows.',
      },
    ],
    results: [
      { value: '2.1s', label: 'Largest Contentful Paint' },
      { value: '3x', label: 'Peak traffic handled' },
      { value: '99.9%', label: 'Checkout uptime' },
    ],
    stack: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis', 'AWS CloudFront'],
  },

  'fitness-tracker-app': {
    tagline: 'A single daily picture of training and eating, signal or not',
    client: 'Fitness startup',
    duration: '18 weeks',
    services: ['App Development', 'UI/UX Design'],
    overview: [
      'Members were using one app to log workouts and a second to track food, with no connection between them. The client wanted a single product that showed both together and still worked in a gym basement with no signal.',
      'We built a cross-platform app with an offline-first data layer, so logging never depends on connectivity and syncs cleanly once the device is back online.',
    ],
    challenge:
      'Gyms are one of the worst connectivity environments there is. Any design that assumed a live API would lose data mid-session, and losing a logged workout is the fastest way to lose a user.',
    solution:
      'A local-first store on the device is the source of truth during a session. A background sync reconciles with the server when connectivity returns, using per-field conflict resolution so a phone and a tablet editing the same day do not overwrite each other.',
    features: [
      {
        title: 'Offline-first logging',
        description:
          'Every workout and meal is written locally first, then synced. Connectivity loss is invisible to the user.',
      },
      {
        title: 'Combined daily view',
        description:
          'Calories in and calories out on one screen, so progress is visible without switching context.',
      },
      {
        title: 'Wearable integration',
        description:
          'Reads step, heart rate and activity data from Apple Health and Google Fit rather than asking users to re-enter it.',
      },
      {
        title: 'Progress tracking',
        description:
          'Trends over weeks and months, with goals that adjust as the member’s baseline changes.',
      },
    ],
    results: [
      { value: '4.6', label: 'Average store rating' },
      { value: '0', label: 'Sessions lost to connectivity' },
      { value: '2', label: 'Platforms, one codebase' },
    ],
    stack: ['React Native', 'TypeScript', 'SQLite', 'Node.js', 'Apple HealthKit', 'Google Fit'],
  },

  'banking-dashboard': {
    tagline: 'One live view of operations, with every access on the record',
    client: 'Financial services provider',
    duration: '24 weeks',
    services: ['Web Development', 'Cybersecurity', 'Database Security'],
    overview: [
      'Operations staff were reconciling accounts across several internal systems, exporting to spreadsheets to get a consolidated view. That view was out of date the moment it was produced, and it moved sensitive data into files nobody controlled.',
      'We built a single operational dashboard reading directly from the underlying systems, with access control and auditing designed in from the start rather than added at review.',
    ],
    challenge:
      'The data is as sensitive as it gets, and the regulatory expectations around access and auditability are strict. Every design decision had to hold up to an auditor asking who saw what, and when.',
    solution:
      'Role-based access down to the field level, with every read and write written to an append-only audit log. Sessions are short-lived and step-up authentication is required for privileged actions. Nothing sensitive is cached in the browser.',
    features: [
      {
        title: 'Consolidated view',
        description:
          'Balances, transactions and spending analysis from several systems in one live interface.',
      },
      {
        title: 'Field-level permissions',
        description:
          'What a user can see is decided per field, not per page, so one role change does not over-expose data.',
      },
      {
        title: 'Append-only audit trail',
        description:
          'Every access is logged immutably, with the detail an auditor expects and reporting built on top.',
      },
      {
        title: 'Anomaly alerting',
        description:
          'Unusual access patterns raise an alert to the security team rather than waiting for a review cycle.',
      },
    ],
    results: [
      { value: '100%', label: 'Actions audit-logged' },
      { value: '0', label: 'Findings at security review' },
      { value: '40%', label: 'Less time on reconciliation' },
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'OAuth 2.0', 'AWS KMS'],
  },

  'healthcare-portal': {
    tagline: 'A patient’s full history, one search away, across every site',
    client: 'Multi-site clinic group',
    duration: '20 weeks',
    services: ['Web Development', 'Database Security', 'UI/UX Design'],
    overview: [
      'Patient records were split across sites, and clinicians were spending consultation time hunting for history rather than talking to the person in front of them. Any replacement had to be genuinely faster to use, or it would simply be worked around.',
      'We built a portal that puts a patient’s full history one search away, designed around how a consultation actually runs and compliant with HIPAA throughout.',
    ],
    challenge:
      'Clinical software fails when it adds clicks. The system had to satisfy HIPAA — encryption, access control, audit trails, breach procedures — without any of that compliance surfacing as friction during a ten-minute appointment.',
    solution:
      'Encryption at rest and in transit, role-based access tied to care relationships, and complete audit logging — all handled below the interface. Clinicians see a single patient timeline, searchable, that loads fast enough to use while the patient is still talking.',
    features: [
      {
        title: 'Unified patient timeline',
        description:
          'Appointments, records, lab results and messages in one chronological view across every site.',
      },
      {
        title: 'Care-relationship access',
        description:
          'Access follows the clinical relationship, so records are available to the people treating the patient and nobody else.',
      },
      {
        title: 'Tablet-first interface',
        description:
          'Designed for the device clinicians actually carry, usable one-handed during a consultation.',
      },
      {
        title: 'Compliance reporting',
        description:
          'Access logs, retention policies and breach-notification workflows ready for review.',
      },
    ],
    results: [
      { value: 'HIPAA', label: 'Compliant on launch' },
      { value: '<1s', label: 'Record retrieval' },
      { value: '6', label: 'Sites on one system' },
    ],
    stack: ['React', 'Node.js', 'PostgreSQL', 'HL7 FHIR', 'AWS KMS', 'HIPAA controls'],
  },

  'restaurant-ordering-system': {
    tagline: 'Scan, order and pay without waiting for a server',
    client: 'Restaurant group',
    duration: '12 weeks',
    services: ['Web Development', 'App Development', 'UI/UX Design'],
    overview: [
      'Service was bottlenecked at the point of taking orders, particularly at peak. The client wanted diners to be able to browse, order and pay from their own phone without installing anything.',
      'We built a QR-based ordering experience that opens straight in the browser and feeds orders into the kitchen display, alongside a menu the restaurant can update themselves.',
    ],
    challenge:
      'Anything requiring an app install would not be used. It had to open instantly from a QR code, work on an old phone on patchy café Wi-Fi, and route orders reliably to the right kitchen station.',
    solution:
      'A progressive web app kept deliberately small so it opens in about a second on a mid-range phone. Orders go through a queue to the kitchen display, so a dropped connection delays a ticket rather than losing it.',
    features: [
      {
        title: 'No-install ordering',
        description:
          'Scan the code and the menu opens in the browser. Nothing to download, nothing to sign up for.',
      },
      {
        title: 'Live menu management',
        description:
          'Staff mark items unavailable or change prices and it takes effect at the table immediately.',
      },
      {
        title: 'Kitchen display routing',
        description:
          'Orders are split by station and queued, so a network blip delays a ticket instead of losing it.',
      },
      {
        title: 'Pay at the table',
        description:
          'Split bills and card payment from the phone, so leaving does not require finding a server.',
      },
    ],
    results: [
      { value: '~1s', label: 'Time to interactive' },
      { value: '0', label: 'App installs required' },
      { value: '30%', label: 'Faster table turnover' },
    ],
    stack: ['React', 'PWA', 'Node.js', 'PostgreSQL', 'Stripe', 'WebSockets'],
  },

  'travel-companion-app': {
    tagline: 'A travel app that works where there is no signal',
    client: 'Travel technology company',
    duration: '16 weeks',
    services: ['App Development', 'UI/UX Design'],
    overview: [
      'Travel apps tend to fail at the exact moment they are needed — abroad, without data, trying to find the next connection. The client wanted a companion app that stayed useful offline.',
      'We built an app that downloads everything a traveller needs for a trip before departure and keeps working without a connection, syncing changes when one is available.',
    ],
    challenge:
      'Offline is easy to claim and hard to do. Itineraries change mid-trip, so the app had to reconcile updates made on the server with changes the traveller made offline, without silently discarding either.',
    solution:
      'Trip data, maps and documents are bundled and stored on the device. Edits are queued locally and reconciled on reconnect, with genuine conflicts surfaced to the traveller rather than resolved by guessing.',
    features: [
      {
        title: 'Offline trip bundle',
        description:
          'Itinerary, maps, bookings and documents downloaded before departure and available with no signal.',
      },
      {
        title: 'Conflict-aware sync',
        description:
          'Offline edits reconcile with server changes on reconnect; real conflicts are shown, not guessed at.',
      },
      {
        title: 'Live travel updates',
        description:
          'Gate changes and delays arrive as notifications whenever a connection is available.',
      },
      {
        title: 'Document wallet',
        description:
          'Passes, tickets and confirmations stored encrypted on the device and reachable in two taps.',
      },
    ],
    results: [
      { value: '100%', label: 'Core features offline' },
      { value: '2', label: 'Platforms, one codebase' },
      { value: '4.7', label: 'Average store rating' },
    ],
    stack: ['React Native', 'TypeScript', 'SQLite', 'Mapbox', 'Node.js', 'Push notifications'],
  },
};

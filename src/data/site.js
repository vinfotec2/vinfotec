// Single source of truth for company info, services, projects and testimonials.
// Editing a value here updates every page that renders it.

export const company = {
  name: 'VINFOTECH SOLUTION LLC',
  tagline: 'Innovative technology solutions that transform your digital future.',
  blurb:
    'Innovative technology solutions that transform your digital future. We build secure, scalable, and smart digital products.',
  phone: '304-216-9092',
  phoneHref: 'tel:+13042169092',
  email: 'hr@vinfotec.com',
  emailHref: 'mailto:hr@vinfotec.com',
  address: {
    street: '11535 Park Woods Circle, Suite: B2-01',
    city: 'Alpharetta, GA, 30005',
    country: 'USA',
  },
  hours: {
    weekdays: 'Monday - Friday: 8am - 5pm',
    weekend: 'Saturday - Sunday: Closed',
  },
  social: {
    linkedin: 'https://www.linkedin.com/',
    twitter: 'https://twitter.com/vinfotechsolutions',
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
  },
};

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
  { label: 'FAQ', to: '/faq' },
];

export const stats = [
  { value: '300+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '25+', label: 'Years Experience' },
  { value: '99%', label: 'Success Rate' },
];

export const glanceStats = [
  { icon: 'Trophy', value: '300+', label: 'Projects Delivered', color: 'text-green-600' },
  { icon: 'Users', value: '450+', label: 'Global Experts', color: 'text-blue-600' },
  { icon: 'Globe', value: '$1.6M+', label: 'Revenue Generated', color: 'text-purple-600' },
  { icon: 'CircleCheckBig', value: '25+', label: 'Years Experience', color: 'text-orange-600' },
];

// `slug` drives the /services/:slug route; long-form copy for each one lives in
// src/data/services.js under the same key.
export const services = [
  {
    slug: 'app-development',
    art: '/images/services/app-development.webp',
    accent: 'emerald',
    icon: 'Smartphone',
    title: 'App Development',
    description: 'Modern, scalable mobile apps tailored for your business needs.',
    features: ['iOS & Android', 'Cross-platform', 'Native Performance'],
  },
  {
    slug: 'web-development',
    art: '/images/services/web-development.webp',
    accent: 'blue',
    icon: 'Monitor',
    title: 'Web Development',
    description: 'Responsive websites built to grow with your brand.',
    features: ['Responsive Design', 'Fast Loading', 'SEO Optimized'],
  },
  {
    slug: 'wordpress-development',
    art: '/images/services/wordpress-development.webp',
    accent: 'violet',
    icon: 'Code',
    title: 'WordPress Development',
    description: 'Custom themes and plugin solutions for fast, functional WordPress sites.',
    features: ['Custom Themes', 'Plugin Development', 'Performance Optimization'],
  },
  {
    slug: 'salesforce-development',
    art: '/images/services/salesforce-development.webp',
    accent: 'orange',
    icon: 'Zap',
    title: 'Salesforce Development',
    description: 'Custom Salesforce solutions to streamline your CRM and business processes.',
    features: ['Custom Apps', 'Integration', 'Automation'],
  },
  {
    slug: 'gen-ai-solutions',
    art: '/images/services/gen-ai-solutions.webp',
    accent: 'rose',
    icon: 'Bot',
    title: 'Gen AI Solutions',
    description: 'Cutting-edge AI solutions to automate processes and enhance user experiences.',
    features: ['Machine Learning', 'Natural Language Processing', 'Automation'],
  },
  {
    slug: 'ui-ux-design',
    art: '/images/services/ui-ux-design.webp',
    accent: 'purple',
    icon: 'Palette',
    title: 'UI/UX Design',
    description: 'Clean, intuitive designs that boost user engagement and conversions.',
    features: ['User Research', 'Wireframing', 'Prototyping'],
  },
  {
    slug: 'database-security',
    art: '/images/services/database-security.webp',
    accent: 'blue',
    icon: 'Database',
    title: 'Database Security',
    description: 'End-to-end protection of your data assets with industry-grade safeguards.',
    features: ['Data Encryption', 'Access Control', 'Backup Solutions'],
  },
  {
    slug: 'cybersecurity',
    art: '/images/services/cybersecurity.webp',
    accent: 'blue',
    icon: 'Shield',
    title: 'Cybersecurity',
    description: 'Holistic defense strategies to keep your business safe from evolving threats.',
    features: ['Threat Assessment', 'Security Audits', '24/7 Monitoring'],
  },
];

export const getService = (slug) => services.find((s) => s.slug === slug);

// `slug` drives the /portfolio/:slug route, `industry` is the label shown
// above each card title, and `accent` picks the card colour scheme.
// Long-form case-study copy lives in src/data/projects.js under the slug.
export const projects = [
  {
    slug: 'ecommerce-platform',
    image: '/images/projects/ecommerce.webp',
    title: 'E-commerce Platform',
    industry: 'E-Commerce',
    accent: 'teal',
    description: 'Fully responsive store with seamless payment integration',
    tags: ['Web', 'E-commerce', 'Payment Integration'],
  },
  {
    slug: 'fitness-tracker-app',
    image: '/images/projects/fitness.webp',
    title: 'Fitness Tracker App',
    industry: 'Health & Fitness',
    accent: 'blue',
    description: 'Workout and nutrition tracking in one streamlined app',
    tags: ['Mobile', 'Health', 'React Native'],
  },
  {
    slug: 'banking-dashboard',
    image: '/images/projects/banking.webp',
    title: 'Banking Dashboard',
    industry: 'Finance',
    accent: 'navy',
    description: 'Enterprise-grade security for financial operations',
    tags: ['Web', 'Security', 'Finance'],
  },
  {
    slug: 'healthcare-portal',
    image: '/images/projects/healthcare.webp',
    title: 'Healthcare Portal',
    industry: 'Healthcare',
    accent: 'indigo',
    description: 'HIPAA-compliant system for patient data management',
    tags: ['Web', 'Healthcare', 'HIPAA'],
  },
  {
    slug: 'restaurant-ordering-system',
    image: '/images/projects/restaurant.webp',
    title: 'Restaurant Ordering System',
    industry: 'Food & Beverage',
    accent: 'amber',
    description: 'QR-based digital menu and ordering experience',
    tags: ['Web', 'Mobile', 'QR Code'],
  },
  {
    slug: 'travel-companion-app',
    image: '/images/projects/travel.webp',
    title: 'Travel Companion App',
    industry: 'Travel & Lifestyle',
    accent: 'emerald',
    description: 'Offline-friendly mobile app for global travelers',
    tags: ['Mobile', 'Travel', 'Offline'],
  },
];

export const testimonials = [
  {
    quote:
      'VS Tech Inc transformed our operations. Their attention to detail and strategic insight made all the difference.',
    name: 'Vanita Bethu',
    role: 'Founder, Innovatech',
    avatar: null,
  },
  {
    quote:
      'From planning to execution, their team exceeded our expectations. Performance and satisfaction have both soared.',
    name: 'John Doe',
    role: 'CTO, Digital First',
    avatar: '/images/avatar-john.jpg',
  },
  {
    quote:
      'Reliable, responsive, and incredibly skilled—VS Tech is now our go-to tech partner.',
    name: 'Dani Daniels',
    role: 'Project Manager, ByteWorks',
    avatar: '/images/avatar-dani.jpg',
  },
  {
    quote:
      "We're more secure and scalable than ever thanks to their cybersecurity and dev expertise.",
    name: 'Steve Williams',
    role: 'Developer, CodeCraft',
    avatar: '/images/avatar-steve.jpg',
  },
];

export const differentiators = [
  {
    icon: 'CircleCheckBig',
    title: 'End-to-End Development',
    description:
      'From concept to deployment, we handle every aspect of your digital transformation.',
  },
  {
    icon: 'Shield',
    title: 'Security First',
    description:
      'Every solution we build incorporates industry-leading security protocols and compliance standards.',
  },
  {
    icon: 'Users',
    title: 'Dedicated Support',
    description:
      '24/7 global support with transparent communication throughout your project lifecycle.',
  },
  {
    icon: 'Globe',
    title: 'Global Expertise',
    description:
      'Our worldwide team brings diverse perspectives and cutting-edge technical knowledge.',
  },
  {
    icon: 'Trophy',
    title: 'Proven Results',
    description: 'With 300+ successful projects, we deliver measurable business outcomes.',
  },
  {
    icon: 'Clock',
    title: 'Agile Delivery',
    description:
      'Fast, iterative development cycles that adapt to your evolving business needs.',
  },
];

import { company } from '../data/site.js';
import Seo from '../components/Seo.jsx';
import { LegalLayout, LegalList, LegalSection } from '../components/LegalPage.jsx';

export default function Privacy() {
  return (
    <>
      <Seo
        title={`Privacy Policy | ${company.name}`}
        description="How VINFOTECH SOLUTION LLC collects, uses and protects your personal information."
      />
      <LegalLayout
        title="Privacy Policy"
        effectiveDate="June 1, 2025"
        intro={`At ${company.name}, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you interact with our website and services.`}
      >
        <LegalSection heading="1. Information We Collect">
          <p>We may collect:</p>
          <LegalList
            items={[
              'Name, email, and phone number (when filling contact forms)',
              'Business/project details',
              'IP address, browser type, and device information',
              'Cookies to enhance website functionality',
            ]}
          />
        </LegalSection>

        <LegalSection heading="2. How We Use Your Information">
          <LegalList
            items={[
              'To respond to inquiries and project requests',
              'To improve website performance',
              'To send updates, newsletters (opt-in only)',
              'For internal reporting and analytics',
            ]}
          />
        </LegalSection>

        <LegalSection heading="3. Data Protection">
          <p>
            We implement industry-standard security protocols to protect your data from unauthorized
            access, disclosure, or misuse.
          </p>
        </LegalSection>

        <LegalSection heading="4. Third-Party Sharing">
          <p>
            We do not sell or rent your data. Third-party service providers (e.g., analytics tools)
            may access anonymized data strictly to perform services on our behalf.
          </p>
        </LegalSection>

        <LegalSection heading="5. Your Rights">
          <p>You may:</p>
          <LegalList
            items={[
              'Request access or deletion of your data',
              'Opt out of newsletters at any time',
              'Contact us to update or correct your info',
            ]}
          />
        </LegalSection>

        <LegalSection heading="6. Contact Us">
          <p>
            If you have questions about this privacy policy, email us at{' '}
            <a href={company.emailHref} className="text-green-600 hover:underline">
              {company.email}
            </a>
            .
          </p>
        </LegalSection>
      </LegalLayout>
    </>
  );
}

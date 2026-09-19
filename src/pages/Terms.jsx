import { company } from '../data/site.js';
import Seo from '../components/Seo.jsx';
import { LegalLayout, LegalSection } from '../components/LegalPage.jsx';

export default function Terms() {
  return (
    <>
      <Seo
        title={`Terms and Conditions | ${company.name}`}
        description="The terms and conditions governing use of the VINFOTECH SOLUTION LLC website and services."
      />
      <LegalLayout
        title="Terms and Conditions"
        effectiveDate="June 1, 2025"
        intro={`Welcome to ${company.name}. By accessing or using our website or services, you agree to be bound by these Terms and Conditions.`}
      >
        <LegalSection heading="1. Use of Services">
          <p>
            Our services are intended for businesses and professionals. You may not use our website
            for unlawful or unauthorized purposes.
          </p>
        </LegalSection>

        <LegalSection heading="2. Intellectual Property">
          <p>
            All content, designs, and code are the intellectual property of {company.name} and may
            not be reproduced without permission.
          </p>
        </LegalSection>

        <LegalSection heading="3. Third-Party Tools">
          <p>
            We may use third-party platforms or tools in delivering services. We are not responsible
            for their availability, data handling, or content.
          </p>
        </LegalSection>

        <LegalSection heading="4. Limitation of Liability">
          <p>
            {company.name} will not be liable for any indirect, incidental, or consequential damages
            resulting from the use of our services or website.
          </p>
        </LegalSection>

        <LegalSection heading="5. Payment & Invoicing">
          <p>
            Payment terms are outlined in client contracts or proposals. All payments must be made in
            accordance with agreed timelines.
          </p>
        </LegalSection>

        <LegalSection heading="6. Modifications">
          <p>
            We reserve the right to update these terms at any time. Continued use of the site implies
            acceptance of the updated terms.
          </p>
        </LegalSection>

        <LegalSection heading="7. Contact">
          <p>
            For any legal concerns or contract disputes, contact us directly at{' '}
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

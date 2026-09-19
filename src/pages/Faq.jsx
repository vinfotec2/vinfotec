import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { company } from '../data/site.js';
import { faqGroups } from '../data/faq.js';
import { Button, PageHero, cn } from '../components/ui.jsx';
import Seo from '../components/Seo.jsx';

function AccordionItem({ item, isOpen, onToggle, id }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
          className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-base font-medium text-gray-900 transition-colors hover:text-green-700"
        >
          {item.question}
          <ChevronDown
            className={cn(
              'h-5 w-5 flex-shrink-0 text-gray-500 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
            aria-hidden="true"
          />
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        hidden={!isOpen}
        className="px-6 pb-5 text-sm leading-relaxed text-gray-600"
      >
        {item.answer}
      </div>
    </div>
  );
}

export default function Faq() {
  const [openKey, setOpenKey] = useState(null);

  return (
    <>
      <Seo
        title={`FAQ | ${company.name}`}
        description="Answers to common questions about VINFOTECH SOLUTION LLC's services, project timelines, pricing, process and technology stack."
      />
      <PageHero
        title="Frequently Asked"
        highlight="Questions"
        subtitle="Find answers to common questions about our services, processes, and how we can help transform your business."
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {faqGroups.map((group, groupIndex) => (
            <div key={group.heading} className={groupIndex > 0 ? 'mt-12' : ''}>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">{group.heading}</h2>
              <div className="space-y-4">
                {group.items.map((item, itemIndex) => {
                  const key = `${groupIndex}-${itemIndex}`;
                  return (
                    <AccordionItem
                      key={key}
                      id={`faq-${key}`}
                      item={item}
                      isOpen={openKey === key}
                      onToggle={() => setOpenKey((prev) => (prev === key ? null : key))}
                    />
                  );
                })}
              </div>
            </div>
          ))}

          <div className="mt-16 rounded-2xl bg-gray-50 p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Still Have Questions?</h2>
            <p className="mb-6 text-gray-600">
              Can&apos;t find the answer you&apos;re looking for? Our team is here to help you with
              any questions about our services.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button to="/contact">Contact Us</Button>
              <Button href={company.emailHref} variant="outline">
                Email: {company.email}
              </Button>
              <Button href={company.phoneHref} variant="outline">
                Call: {company.phone}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

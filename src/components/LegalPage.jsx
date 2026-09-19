export function LegalLayout({ title, effectiveDate, intro, children }) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">{title}</h1>
          <p className="text-lg text-gray-600">Effective Date: {effectiveDate}</p>
        </div>
        <p className="mb-10 leading-relaxed text-gray-600">{intro}</p>
        <div className="space-y-10">{children}</div>
      </div>
    </section>
  );
}

export function LegalSection({ heading, children }) {
  return (
    <div>
      <h2 className="mb-3 text-xl font-bold text-gray-900">{heading}</h2>
      <div className="space-y-3 leading-relaxed text-gray-600">{children}</div>
    </div>
  );
}

export function LegalList({ items }) {
  return (
    <ul className="list-inside list-disc space-y-1.5 text-gray-600">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

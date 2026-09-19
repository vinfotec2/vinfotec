import { company } from '../data/site.js';
import { Button } from '../components/ui.jsx';
import Seo from '../components/Seo.jsx';

export default function NotFound() {
  return (
    <>
      <Seo title={`Page Not Found | ${company.name}`} description="The page you requested could not be found." />
      <section className="flex min-h-[60vh] items-center justify-center bg-white px-4 py-20">
        <div className="text-center">
          <p className="text-6xl font-bold text-green-600">404</p>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">This page doesn&apos;t exist</h1>
          <p className="mx-auto mt-3 max-w-md text-gray-600">
            The link may be out of date, or the page may have moved. Try our home page or get in
            touch and we&apos;ll point you in the right direction.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/" size="lg">
              Back to Home
            </Button>
            <Button to="/contact" size="lg" variant="outline">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

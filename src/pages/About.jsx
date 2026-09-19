import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { company, differentiators } from '../data/site.js';
import { Button, Card, Icon, PageHero, SectionHeading } from '../components/ui.jsx';
import Reveal from '../components/Reveal.jsx';
import Seo from '../components/Seo.jsx';

export default function About() {
  return (
    <>
      <Seo
        title={`About Us | ${company.name}`}
        description="VINFOTECH SOLUTION LLC is a full-service software development company in Alpharetta, Georgia, building secure, scalable digital solutions for over 25 years."
      />

      <PageHero
        title="Your Trusted Partner in"
        highlight="Digital Innovation"
        subtitle={`At ${company.name}, we combine decades of experience with modern technologies to solve complex business challenges. Our team collaborates closely with clients to deliver high-performance digital solutions.`}
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal direction="right" className="space-y-5">
              <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">Who We Are</h2>
              <p className="leading-relaxed text-gray-600">
                {company.name} is a full-service software development company that specializes in
                building secure, scalable, and smart digital solutions for businesses worldwide.
                Located in Alpharetta, Georgia, we&apos;ve spent over 25 years helping startups, SMBs,
                and enterprises turn their tech vision into reality.
              </p>
              <p className="leading-relaxed text-gray-600">
                Technology is more than code — it&apos;s transformation. Our mission is to build
                tools that empower businesses, accelerate innovation, and improve lives. We believe
                in delivering value, not just software.
              </p>
              <p className="leading-relaxed text-gray-600">
                We partner closely with clients, understanding their pain points, goals, and growth
                ambitions. From custom web and mobile apps to enterprise-grade cybersecurity, our
                team delivers with precision, speed, and passion.
              </p>
            </Reveal>
            <Reveal direction="left" delay={120}>
              <img
                src="/images/about-team.jpg"
                alt="Our team working together"
                loading="lazy"
                className="rounded-2xl shadow-2xl"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              title="What Sets Us Apart"
              subtitle="Our commitment to excellence drives everything we do"
            />
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((item, i) => (
              <Reveal
                key={item.title}
                delay={(i % 3) * 110}
                className="group rounded-lg bg-white p-6 shadow-lg hover:shadow-xl"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 transition-transform duration-300 group-hover:scale-110">
                  <Icon name={item.icon} className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Contact Information" subtitle="Get in touch with us" />
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="p-6 text-center">
              <MapPin className="mx-auto mb-3 h-6 w-6 text-green-600" aria-hidden="true" />
              <h3 className="mb-1 font-semibold text-gray-900">Address</h3>
              <address className="text-sm not-italic text-gray-600">
                {company.address.street}
                <br />
                {company.address.city}
              </address>
            </Card>
            <Card className="p-6 text-center">
              <Phone className="mx-auto mb-3 h-6 w-6 text-green-600" aria-hidden="true" />
              <h3 className="mb-1 font-semibold text-gray-900">Phone</h3>
              <a href={company.phoneHref} className="text-sm text-green-600 hover:underline">
                {company.phone}
              </a>
            </Card>
            <Card className="p-6 text-center">
              <Mail className="mx-auto mb-3 h-6 w-6 text-green-600" aria-hidden="true" />
              <h3 className="mb-1 font-semibold text-gray-900">Email</h3>
              <a href={company.emailHref} className="text-sm text-green-600 hover:underline">
                {company.email}
              </a>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-green-600 to-green-700 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
            Ready to Transform Your Digital Future?
          </h2>
          <p className="mb-8 text-lg text-green-50">Let&apos;s build something amazing together</p>
          <Button
            to="/contact"
            size="lg"
            variant="outline"
            className="group border-0 bg-white text-green-700 hover:bg-green-50"
          >
            Get Started Today
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </section>
    </>
  );
}

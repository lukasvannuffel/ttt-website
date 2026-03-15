import { Diensten } from "@/components/Diensten";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="diagonal-divider" />
      <Diensten />
      <section id="over" className="min-h-[50vh] px-8 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
            Over
          </h2>
          <p className="mt-2 text-[var(--text-secondary)]">
            Placeholder voor over ons.
          </p>
        </div>
      </section>
      <section id="contact" className="min-h-[50vh] px-8 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
            Contact
          </h2>
          <p className="mt-2 text-[var(--text-secondary)]">
            Placeholder voor contact.
          </p>
        </div>
      </section>
    </>
  );
}

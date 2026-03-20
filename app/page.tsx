import { Diensten } from "@/components/Diensten";
import { Hero } from "@/components/Hero";
import { OverOns } from "@/components/OverOns";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="diagonal-divider" />
      <Diensten />
      <OverOns />
      <section id="contact" className="min-h-[50vh] px-6 py-12 md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
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

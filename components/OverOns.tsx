import Image from "next/image";
import Link from "next/link";

export function OverOns() {
  return (
    <section
      id="over"
      className="bg-[var(--surface)] min-h-screen flex items-center px-6 py-12 md:px-10 md:py-20 lg:px-16"
      style={{ minHeight: "100vh" }}
    >
      <div className="mx-auto max-w-[1400px] w-full">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:items-center">
          {/* Image at the top on mobile */}
          <div className="flex w-full justify-center items-center order-[-1] mb-4 lg:order-none lg:mb-0">
            <div className="relative aspect-[4/5] w-[280px] md:w-[350px] lg:w-[400px] overflow-hidden min-h-[280px] md:min-h-[350px] lg:min-h-[400px]">
              <Image
                src="/img/Tom.png"
                alt="Tree Top Tom boomverzorging"
                fill
                className="object-cover object-[top_20%] rounded-sm"
                sizes="(max-width: 1024px) 90vw, 400px"
                priority={false}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--text-tertiary)]">
              Over ons
            </p>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight tracking-tight text-[var(--text-primary)] md:mb-8 md:text-4xl lg:text-5xl">
              Met passie voor vakwerk
            </h2>
            <div className="max-w-2xl space-y-5 text-[var(--text-secondary)] leading-relaxed">
              <p>
                Tree Top Tom staat voor professionele boomverzorging in
                Vlaams-Brabant. Met respect voor elke boom en elke klant zetten we
                ons in voor veilig, vakkundig en duurzaam werk.
              </p>
              <p>
                Of het nu gaat om vellen, snoeien, aanplanting of advies — we
                combineren ervaring met een oog voor detail. Gecertificeerd,
                betrouwbaar en met de focus op kwaliteit en nazorg.
              </p>
            </div>
            <Link
              href="#contact"
              className="btn btn-secondary mt-8 inline-flex min-h-[44px] items-center justify-center"
            >
              Neem contact op
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

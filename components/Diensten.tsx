import Image from "next/image";

import type { Dienst } from "@/types/diensten";

import dienstenData from "@/data/diensten.json";

const diensten = dienstenData as Dienst[];

function ServiceImagePlaceholder({
  icon,
  title,
  index,
}: {
  icon: string;
  title: string;
  index: number;
}) {
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--bg-primary)] md:aspect-[5/4]"
      style={{
        background: `linear-gradient(135deg, var(--accent-tertiary) 0%, var(--accent-secondary) 40%, var(--accent-primary) 100%)`,
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/90">
        <span className="text-5xl md:text-6xl" aria-hidden>
          {icon}
        </span>
        <span className="text-xs font-semibold uppercase tracking-widest">
          Foto placeholder
        </span>
        <span className="max-w-[80%] text-center text-sm opacity-80">
          {title}
        </span>
      </div>
      <div className="absolute bottom-4 right-4 font-serif text-6xl font-bold text-white/20 md:text-7xl">
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>
  );
}

function ServiceRow({
  dienst,
  index,
}: {
  dienst: Dienst;
  index: number;
}) {
  const isImageLeft = index % 2 === 0;

  return (
    <article
      className="group grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-0 lg:min-h-[380px]"
      style={{ scrollMarginTop: "6rem" }}
    >
      <div
        className={`relative min-h-[240px] md:min-h-full ${
          isImageLeft ? "md:order-1" : "md:order-2"
        }`}
      >
        {dienst.image ? (
          <div className="relative h-full min-h-[240px] w-full md:absolute md:inset-0">
            <Image
              src={dienst.image}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ) : (
          <ServiceImagePlaceholder
            icon={dienst.icon}
            title={dienst.title}
            index={index}
          />
        )}
      </div>
      <div
        className={`flex flex-col justify-center bg-[var(--surface)] px-6 py-10 md:px-12 md:py-14 lg:px-16 ${
          isImageLeft ? "md:order-2" : "md:order-1"
        }`}
      >
        <span
          className="mb-2 font-mono text-xs font-medium tracking-widest text-[var(--accent-primary)]"
          aria-hidden
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-serif text-2xl font-bold leading-tight text-[var(--text-primary)] md:text-3xl">
          {dienst.title}
        </h3>
        <p className="mt-4 max-w-xl leading-relaxed text-[var(--text-secondary)]">
          {dienst.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {dienst.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-sm border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)]"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href={dienst.href ?? "#"}
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-primary)] no-underline transition-all hover:gap-3"
        >
          Meer informatie
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </a>
      </div>
    </article>
  );
}

export function Diensten() {
  return (
    <section
      id="diensten"
      className="relative overflow-hidden bg-[var(--bg-primary)]"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24 lg:px-16">
        <header className="mb-16 max-w-2xl md:mb-24">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--text-tertiary)]">
            Onze Diensten
          </p>
          <h2 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-[var(--text-primary)] md:text-5xl lg:text-[56px]">
            Vakwerk in elke tak
          </h2>
        </header>

        <div className="divide-y divide-[var(--border)]">
          {diensten.map((dienst, index) => (
            <ServiceRow key={dienst.title} dienst={dienst} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

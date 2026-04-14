import Image from "next/image";
import Link from "next/link";

export function OverOns() {
    return (
        <section
            id="over"
            className="bg-gradient-to-b from-[var(--surface)] to-[rgba(160,210,180,0.06)] min-h-screen flex items-center px-6 py-16 md:px-10 md:py-24 lg:px-16 relative overflow-hidden"
        >
            {/* Organic background accent */}
            <div
                className="absolute -left-32 top-1/3 w-80 h-80 rounded-full bg-gradient-to-br from-[var(--accent-tertiary)] to-transparent opacity-5 blur-3xl pointer-events-none"
                aria-hidden="true"
            />

            <div className="mx-auto max-w-[1400px] w-full relative z-10">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:items-center">
                    {/* Image — top on mobile */}
                    <div
                        className="flex w-full justify-center items-center order-[-1] mb-6 lg:order-none lg:mb-0"
                    >
                        <div className="relative aspect-[4/5] w-[280px] md:w-[350px] lg:w-[420px] overflow-hidden group">
                            {/* Organic frame background */}
                            <div className="absolute -inset-6 bg-gradient-to-br from-[var(--accent-warm)]/30 to-[var(--accent-gold)]/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />

                            <Image
                                src="/img/Tom.png"
                                alt="Tom, professionele boomverzorger van Tree Top Tom"
                                fill
                                className="object-cover object-[top_20%] transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 1024px) 90vw, 420px"
                            />

                            {/* Corner accents */}
                            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[var(--accent-tertiary)] opacity-30" aria-hidden="true" />
                            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[var(--accent-tertiary)] opacity-30" aria-hidden="true" />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent-tertiary)] to-[var(--accent-secondary)] opacity-70" aria-hidden="true" />
                            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--accent-primary)]">
                                Over mij
                            </p>
                        </div>
                        <h2 className="mb-8 font-serif text-3xl font-bold leading-tight text-[var(--text-primary)] md:mb-10 md:text-4xl lg:text-5xl">
                            Met passie voor vakwerk
                        </h2>

                        <div className="max-w-2xl space-y-7">
                            <p className="text-sm leading-relaxed text-[var(--text-secondary)] md:text-[15px]">
                                Ik ben Tom Vannotten, en bomen zijn al jaren mijn grootste passie. <br /> Wat begon in de
                                tuinbouw groeide na een demo boomverzorging uit tot een duidelijke roeping. Met mijn
                                ETW-opleiding en praktijkervaring help ik klanten vandaag met professionele, veilige
                                boomzorg.
                            </p>

                            <div className="relative">
                                <div
                                    className="pointer-events-none absolute bottom-5 left-[14px] top-5 w-px bg-gradient-to-b from-[var(--accent-tertiary)]/40 via-[var(--accent-tertiary)]/20 to-transparent"
                                    aria-hidden="true"
                                />
                                <ol className="space-y-3">
                                    {[
                                        "Aangetrokken tot natuur",
                                        "Opleiding tuinbouw",
                                        "Demo boomverzorging als kantelpunt",
                                        "ETW-opleiding succesvol afgerond",
                                        "Zelfstandig in bijberoep",
                                    ].map((step, index) => (
                                        <li key={step} className="relative">
                                            <div className="flex items-start gap-3 rounded-2xl border border-[var(--border)]/40 bg-white/70 px-3.5 py-3.5 shadow-[0_8px_24px_rgba(27,67,50,0.08)] backdrop-blur-sm transition-all duration-300 hover:border-[var(--accent-tertiary)]/40 hover:shadow-[0_12px_28px_rgba(27,67,50,0.12)] sm:px-4">
                                                <span
                                                    className="relative z-10 mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent-tertiary)]/20 text-[10px] font-bold text-[var(--accent-primary)]"
                                                    aria-hidden="true"
                                                >
                                                    {index + 1}
                                                </span>
                                                <span className="text-sm leading-relaxed text-[var(--text-secondary)]">
                                                    {step}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </div>

                            <p className="text-sm leading-relaxed text-[var(--text-secondary)] md:text-[15px]">
                                Als zelfstandige in bijberoep sta ik klaar voor boomwerken en algemeen
                                tuinonderhoud, altijd met oog voor veiligheid, kwaliteit en respect voor de natuur.
                            </p>
                        </div>

                        <Link
                            href="#contact"
                            className="btn btn-primary mt-7 inline-flex min-h-[44px] items-center justify-center"
                        >
                            Neem contact op
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

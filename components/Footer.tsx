"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { INSTAGRAM_URL } from "@/constants/config";

const PHONE_URL = "tel:+32479927426";
const EMAIL_URL = "mailto:info@treetoptom.be";

const socialLinks = [
  {
    label: "Bel ons",
    href: PHONE_URL,
    external: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M22 16.92v2.4a1.7 1.7 0 0 1-1.85 1.7A16.8 16.8 0 0 1 12.83 18a16.5 16.5 0 0 1-5.1-5.1 16.8 16.8 0 0 1-3.01-7.37A1.7 1.7 0 0 1 6.42 3.7h2.4a1.7 1.7 0 0 1 1.7 1.47c.13.99.37 1.96.73 2.9a1.7 1.7 0 0 1-.38 1.8L9.85 10.9a13.6 13.6 0 0 0 5.1 5.1l1.03-1.03a1.7 1.7 0 0 1 1.8-.38c.94.36 1.91.6 2.9.73A1.7 1.7 0 0 1 22 16.92Z"
        />
      </svg>
    ),
  },
  {
    label: "Mail ons",
    href: EMAIL_URL,
    external: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: INSTAGRAM_URL,
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="3.75" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
] as const;

const navigatieLinks = [
  { label: "Home", href: "#home" },
  { label: "Over", href: "#over" },
  { label: "Contact", href: "#contact" },
  { label: "Instagram", href: INSTAGRAM_URL, external: true },
];

export function Footer() {
  const ref = useScrollReveal(0.2);

  return (
    <footer ref={ref} className="opacity-0 border-t border-[var(--border)] bg-[var(--bg-secondary)] px-8 pb-12 pt-20 md:px-12 md:pb-16 md:pt-24 lg:px-16 xl:px-24">
      <div className="mx-auto mb-16 grid w-full max-w-5xl grid-cols-1 gap-14 md:gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-20">
        <div>
          <div className="flex justify-center lg:justify-start">
            <Link href="#home" aria-label="Tree Top Tom - Home" className="inline-flex items-center">
              <Image
                src="/Logo.svg"
                alt="Tree Top Tom logo"
                width={110}
                height={120}
                className="h-16 w-auto md:h-20"
              />
            </Link>
          </div>
          <p className="mx-auto mt-8 max-w-[420px] text-center text-sm leading-relaxed text-[var(--text-secondary)] lg:mx-0 lg:text-left">
            Professionele boomverzorging met passie voor vakwerk. Veilig, betrouwbaar en gecertificeerd in Vlaams-Brabant.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                aria-label={item.label}
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--accent-tertiary)]/40 bg-white/60 text-[var(--accent-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)]"
              >
                <span className="h-4 w-4">{item.icon}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="text-center lg:justify-self-end lg:text-left">
          <h4 className="mb-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent-primary)]">
            Navigatie
          </h4>
          <ul className="list-none space-y-3">
            {navigatieLinks.map((item) =>
              item.external ? (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-secondary)] no-underline transition-colors duration-200 hover:text-[var(--accent-gold)]"
                  >
                    {item.label}
                  </a>
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[var(--text-secondary)] no-underline transition-colors duration-200 hover:text-[var(--accent-gold)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-2 border-t border-[var(--border)] pt-8 text-center text-[12px] text-[var(--text-tertiary)] lg:flex-row lg:text-left">
        <p>© 2026 Tree Top Tom Boomverzorging. Alle rechten voorbehouden.</p>
        <p>
          Website by{" "}
          <a
            href="https://www.codelux.be"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-secondary)] no-underline transition-colors duration-200 hover:text-[var(--accent-gold)]"
          >
            Codelux
          </a>
        </p>
      </div>
    </footer>
  );
}

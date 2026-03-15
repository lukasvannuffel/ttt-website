import Link from "next/link";

const INSTAGRAM_URL = "https://instagram.com/treetoptom";

const dienstenLinks = [
  { label: "Vellen", href: "#diensten" },
  { label: "Snoeien", href: "#diensten" },
  { label: "Aanplanting", href: "#diensten" },
  { label: "Advies", href: "#diensten" },
  { label: "Hakselen", href: "#diensten" },
];

const navigatieLinks = [
  { label: "Home", href: "#home" },
  { label: "Over", href: "#over" },
  { label: "Contact", href: "#contact" },
  { label: "Instagram", href: INSTAGRAM_URL, external: true },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)] px-8 pb-12 pt-20 md:px-12 lg:px-[120px]">
      <div className="mb-16 grid grid-cols-1 gap-12 md:gap-12 lg:grid-cols-[2fr_1fr_1fr] lg:gap-20">
        <div>
          <div className="font-serif text-3xl font-bold text-[var(--text-primary)]">
            Tree Top Tom
          </div>
          <p className="mt-6 max-w-[400px] leading-relaxed text-[var(--text-secondary)]">
            Professionele boomverzorging met passie voor vakwerk. Veilig,
            betrouwbaar en gecertificeerd in Vlaams-Brabant.
          </p>
        </div>

        <div>
          <h4 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
            Diensten
          </h4>
          <ul className="list-none">
            {dienstenLinks.map((item) => (
              <li key={item.label} className="mb-3">
                <Link
                  href={item.href}
                  className="text-[var(--text-secondary)] no-underline transition-colors hover:text-[var(--accent-primary)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
            Navigatie
          </h4>
          <ul className="list-none">
            {navigatieLinks.map((item) =>
              item.external ? (
                <li key={item.label} className="mb-3">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-secondary)] no-underline transition-colors hover:text-[var(--accent-primary)]"
                  >
                    {item.label}
                  </a>
                </li>
              ) : (
                <li key={item.label} className="mb-3">
                  <Link
                    href={item.href}
                    className="text-[var(--text-secondary)] no-underline transition-colors hover:text-[var(--accent-primary)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--border)] pt-8 text-center text-[13px] text-[var(--text-tertiary)]">
        © 2026 Tree Top Tom Boomverzorging. Alle rechten voorbehouden.
      </div>
    </footer>
  );
}

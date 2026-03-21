"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { INSTAGRAM_URL, SCROLL_THRESHOLD } from "@/constants/config";

function InstagramIcon() {
  return (
    <svg
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line
        x1="3"
        y1="6"
        x2="21"
        y2="6"
        style={{
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "12px 12px",
          transform: open ? "translateY(6px) rotate(45deg)" : "translateY(0) rotate(0deg)",
          opacity: 1,
        }}
      />
      <line
        x1="3"
        y1="12"
        x2="21"
        y2="12"
        style={{
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          opacity: open ? 0 : 1,
        }}
      />
      <line
        x1="3"
        y1="18"
        x2="21"
        y2="18"
        style={{
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "12px 12px",
          transform: open ? "translateY(-6px) rotate(-45deg)" : "translateY(0) rotate(0deg)",
          opacity: 1,
        }}
      />
    </svg>
  );
}

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#diensten", label: "Diensten" },
  { href: "#over", label: "Over" },
  { href: "#contact", label: "Contact" },
] as const;

const menuItems = [
  { href: "#home", label: "Home", icon: "home" as const },
  { href: "#diensten", label: "Diensten", icon: "services" as const },
  { href: "#over", label: "Over ons", icon: "about" as const },
  { href: "#contact", label: "Contact", icon: "contact" as const },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <>
      <div
        className={`fixed left-1/2 z-[1000] -translate-x-1/2 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isScrolled ? "top-3 md:top-4" : "top-6 md:top-8"
        }`}
      >
        <nav className="flex items-center justify-between gap-4 md:gap-12 rounded-2xl md:rounded-xl border border-[var(--border)]/40 bg-white/40 px-4 py-3 md:px-6 md:py-3.5 shadow-lg shadow-[var(--accent-primary)]/5 backdrop-blur-2xl transition-all duration-300 md:bg-white/35 md:shadow-[0_8px_32px_rgba(45,80,68,0.08)]">
          <Link
            href="/"
            className="flex items-center no-underline flex-shrink-0"
            aria-label="Tree Top Tom - Home"
          >
            <Image
              src="/Logo.svg"
              alt=""
              width={90}
              height={100}
              className="h-8 w-auto md:h-10 transition-all duration-300"
              priority
            />
          </Link>

          <ul className="hidden md:flex list-none gap-10 flex-1">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="nav-link text-sm font-medium text-[var(--text-secondary)] no-underline transition-all duration-200 hover:text-[var(--accent-primary)] relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--accent-primary)] after:transition-all after:duration-300 hover:after:w-full"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full text-[var(--text-primary)] transition-all duration-300 hover:bg-[var(--bg-primary)] hover:text-[var(--accent-primary)]"
            aria-label={isMenuOpen ? "Menu sluiten" : "Menu openen"}
            aria-expanded={isMenuOpen}
          >
            <HamburgerIcon open={isMenuOpen} />
          </button>
        </nav>
      </div>

      <div
        className={`fixed inset-0 z-[999] bg-[var(--surface)]/50 backdrop-blur-xl transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex flex-col h-full pt-32 px-8 pb-8">
          <nav className="flex flex-col gap-8">
            {menuItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                onClick={closeMenu}
                className="nav-link text-2xl font-light tracking-wide text-[var(--text-primary)] no-underline transition-colors duration-300 hover:text-[var(--accent-primary)]"
                style={{
                  animation: isMenuOpen
                    ? `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + idx * 0.08}s both`
                    : "none",
                }}
              >
                {item.label}
              </Link>
            ))}

            <div
              className="h-px bg-[var(--border)]/40 my-4"
              style={{
                animation: isMenuOpen
                  ? `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both`
                  : "none",
              }}
            />

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link text-lg font-light tracking-wide text-[var(--text-secondary)] no-underline transition-colors duration-300 hover:text-[var(--accent-primary)]"
              style={{
                animation: isMenuOpen
                  ? `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both`
                  : "none",
              }}
            >
              Instagram
            </a>
          </nav>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}

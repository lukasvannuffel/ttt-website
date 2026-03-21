"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { INSTAGRAM_URL, SCROLL_THRESHOLD } from "@/constants/config";

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
  { href: "#home", label: "Home" },
  { href: "#diensten", label: "Diensten" },
  { href: "#over", label: "Over ons" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const lastScrollYRef = useRef(0);
  const isDownRef = useRef(false);

  useEffect(() => {
    function handleScroll() {
      const y = window.scrollY;
      const isMobile = window.innerWidth < 768;

      setIsScrolled(y > SCROLL_THRESHOLD);

      if (!isMobile) {
        // Never collapse on desktop
        if (isDownRef.current) {
          isDownRef.current = false;
          setIsNavCollapsed(false);
        }
        lastScrollYRef.current = y;
        return;
      }

      const goingDown = y > lastScrollYRef.current && y > 50;

      // Only update state when direction actually changes
      if (goingDown !== isDownRef.current) {
        isDownRef.current = goingDown;
        setIsNavCollapsed(goingDown);
      }

      lastScrollYRef.current = y;
    }

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
        className={`fixed left-1/2 z-[1000] ${
          isNavCollapsed
            ? "top-3"
            : `${isScrolled ? "top-3 md:top-4" : "top-6 md:top-8"}`
        }`}
        style={{
          transform: isNavCollapsed
            ? "translateX(calc(-50% + 50vw - 1rem - 26px))"
            : "translateX(-50%)",
          transition: "transform 900ms cubic-bezier(0.22, 1, 0.36, 1), top 400ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <nav
          className={`flex items-center overflow-hidden border border-[var(--border)]/40 backdrop-blur-2xl md:gap-12 md:rounded-xl md:bg-white/35 md:px-6 md:py-3.5 md:shadow-[0_8px_32px_rgba(45,80,68,0.08)] ${
            isNavCollapsed
              ? "justify-center rounded-xl bg-white/60 shadow-[0_8px_32px_rgba(45,80,68,0.12)]"
              : "gap-4 rounded-2xl bg-white/40 px-4 py-3 shadow-lg shadow-[var(--accent-primary)]/5"
          }`}
          style={{
            width: isNavCollapsed ? 52 : undefined,
            height: isNavCollapsed ? 52 : undefined,
            padding: isNavCollapsed ? 0 : undefined,
            gap: isNavCollapsed ? 0 : undefined,
            transition: "border-radius 700ms cubic-bezier(0.22, 1, 0.36, 1), background-color 700ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 700ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <Link
            href="/"
            className="flex items-center no-underline flex-shrink-0"
            style={{
              opacity: isNavCollapsed ? 0 : 1,
              position: isNavCollapsed ? "absolute" : "relative",
              width: isNavCollapsed ? 0 : "auto",
              overflow: isNavCollapsed ? "hidden" : "visible",
              pointerEvents: isNavCollapsed ? "none" : "auto",
              transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            aria-label="Tree Top Tom - Home"
          >
            <Image
              src="/Logo.svg"
              alt=""
              width={90}
              height={100}
              className="h-8 w-auto md:h-10"
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
            className="nav-mobile-hamburger md:hidden flex flex-shrink-0 items-center justify-center rounded-full text-[var(--text-primary)] hover:text-[var(--accent-primary)]"
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
                    ? `fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + idx * 0.08}s both`
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
                  ? `fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both`
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
                  ? `fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both`
                  : "none",
              }}
            >
              Instagram
            </a>
          </nav>
        </div>
      </div>

    </>
  );
}

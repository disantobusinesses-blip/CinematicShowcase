"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { label: "How It Works", id: "how-it-works" },
  { label: "Pricing", id: "pricing" },
  { label: "Enquire", id: "enquire" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(18px, 4vw, 48px)",
        height: 68,
        background: scrolled ? "#0A0A0A" : "transparent",
        borderBottom: scrolled
          ? "1px solid rgba(201,168,76,0.3)"
          : "1px solid transparent",
        transition: "background 0.4s ease, border-color 0.4s ease",
      }}
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="IAS — back to top"
        style={{
          fontFamily: "var(--font-display), serif",
          fontWeight: 600,
          fontSize: 28,
          color: "var(--gold)",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          letterSpacing: "0.04em",
        }}
      >
        IAS
      </button>

      <div style={{ display: "flex", gap: "clamp(16px, 3vw, 40px)" }}>
        {LINKS.map((l) => (
          <button
            key={l.id}
            onClick={() => go(l.id)}
            className="nav-link"
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: 13,
              fontWeight: 400,
              letterSpacing: "0.08em",
              color: "var(--text-body)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              transition: "color 0.25s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-body)")
            }
          >
            {l.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

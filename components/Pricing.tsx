"use client";

import Reveal from "./Reveal";

export default function Pricing() {
  const scrollToEnquire = () => {
    document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="pricing"
      style={{
        background: "rgba(10,10,10,0.9)",
        padding: "clamp(90px, 12vh, 160px) clamp(20px, 6vw, 80px)",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <div className="label" style={{ marginBottom: 22 }}>
            INVESTMENT
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            className="font-display"
            style={{
              fontWeight: 600,
              fontSize: "clamp(40px, 7vw, 72px)",
              lineHeight: 1.05,
              color: "var(--text-primary)",
              marginBottom: 26,
            }}
          >
            Cinematic websites from $3,500.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p
            className="font-body"
            style={{
              fontSize: "clamp(15px, 2vw, 17px)",
              color: "var(--muted)",
              fontWeight: 300,
              maxWidth: "36rem",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Includes AI asset generation, cinematic scroll build, one round of
            revisions, and Vercel deployment. 3 business day turnaround.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div style={{ marginTop: 44 }}>
            <button
              onClick={scrollToEnquire}
              className="font-body cta-fill"
              style={{
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#0A0A0A",
                background: "var(--gold)",
                border: "none",
                padding: "1rem 3rem",
                borderRadius: 2,
                cursor: "pointer",
                transition: "background 0.25s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--gold-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--gold)";
              }}
            >
              Enquire Now
            </button>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <p
            className="font-body"
            style={{
              fontSize: 12,
              color: "var(--muted)",
              fontWeight: 300,
              marginTop: 22,
            }}
          >
            Limited availability. We take on a small number of projects each month.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

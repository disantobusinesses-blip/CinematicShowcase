"use client";

import Reveal from "./Reveal";

export default function Enquire() {
  return (
    <section
      id="enquire"
      style={{
        background: "#111111",
        padding: "clamp(90px, 12vh, 160px) clamp(20px, 6vw, 80px)",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <div className="label" style={{ marginBottom: 22 }}>
            LET&rsquo;S TALK
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
            Ready to stand out?
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p
            className="font-body"
            style={{
              fontSize: "clamp(15px, 2vw, 17px)",
              color: "var(--muted)",
              fontWeight: 300,
              maxWidth: "34rem",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Tell us about your business and we&rsquo;ll get back to you within 24
            hours.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 18,
              justifyContent: "center",
              marginTop: 44,
            }}
          >
            <a
              href="mailto:sales@intelligentaisystem.com"
              className="font-body"
              style={{
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#0A0A0A",
                background: "var(--gold)",
                padding: "1rem 2.4rem",
                borderRadius: 2,
                textDecoration: "none",
                transition: "background 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--gold-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--gold)";
              }}
            >
              Email Us Now
            </a>
            <a
              href="https://intelligentaisystem.com/launchflow"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body"
              style={{
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--gold)",
                background: "transparent",
                border: "1px solid var(--gold)",
                padding: "1rem 2.4rem",
                borderRadius: 2,
                textDecoration: "none",
                transition: "color 0.25s ease, background 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(201,168,76,0.1)";
                e.currentTarget.style.color = "var(--gold-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--gold)";
              }}
            >
              Leave a Deposit
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <p
            className="font-body"
            style={{
              fontSize: 12,
              color: "var(--muted)",
              fontWeight: 300,
              marginTop: 24,
            }}
          >
            No lock-in contracts. No hidden fees. Just great websites.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

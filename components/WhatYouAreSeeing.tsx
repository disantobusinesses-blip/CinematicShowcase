"use client";

import Reveal from "./Reveal";

const FEATURES = [
  {
    n: "01",
    title: "10 AI-Generated Visuals",
    desc: "Every room you just walked through was generated with AI — no photoshoot, no stock library, no compromise. Bespoke imagery customised to your brand in hours, not weeks.",
  },
  {
    n: "02",
    title: "Cinematic Scroll Experience",
    desc: "Ken Burns motion, crossfades and considered transitions turn a flat website into a film. Your visitors don't just read your page — they experience it.",
  },
  {
    n: "03",
    title: "Built in Under 3 Days",
    desc: "From your first brief to a finished, polished build in under three business days. We move at the pace of your business, not a traditional agency's calendar.",
  },
  {
    n: "04",
    title: "Deployed and Live",
    desc: "Launched on your own domain via Vercel with global performance and a secure connection. You're handed the keys to a site that's already live.",
  },
];

export default function WhatYouAreSeeing() {
  return (
    <section
      style={{
        background:
          "linear-gradient(to bottom, rgba(10,10,10,0) 0%, rgba(10,10,10,0.45) 8%, rgba(10,10,10,0.86) 26%, rgba(10,10,10,0.92) 100%)",
        padding: "clamp(140px, 22vh, 240px) clamp(20px, 6vw, 80px) clamp(90px, 12vh, 160px)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <div className="label" style={{ marginBottom: 22 }}>
            WHAT YOU&rsquo;RE LOOKING AT
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
              marginBottom: 28,
            }}
          >
            This is a cinematic website.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p
            className="font-body"
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "var(--muted)",
              fontWeight: 300,
              maxWidth: "42rem",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Every image, every transition, every interaction you just experienced
            was built by IAS in under 3 days. This is what we build for businesses
            across Australia.
          </p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "clamp(28px, 4vw, 56px)",
            marginTop: "clamp(56px, 8vh, 96px)",
            textAlign: "left",
          }}
        >
          {FEATURES.map((f, i) => (
            <Reveal key={f.n} delay={0.1 * i}>
              <div>
                <div
                  className="font-display"
                  style={{
                    fontSize: 40,
                    fontWeight: 600,
                    color: "var(--gold)",
                    marginBottom: 14,
                  }}
                >
                  {f.n}
                </div>
                <h3
                  className="font-body"
                  style={{
                    fontSize: 19,
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    marginBottom: 12,
                  }}
                >
                  {f.title}
                </h3>
                <p
                  className="font-body"
                  style={{
                    fontSize: 15,
                    fontWeight: 300,
                    color: "var(--muted)",
                    lineHeight: 1.7,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

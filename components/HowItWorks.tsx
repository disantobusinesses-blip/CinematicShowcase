"use client";

import Reveal from "./Reveal";

const STEPS = [
  {
    n: "1",
    name: "You brief us",
    lines: ["Tell us your business, your style", "and the goals you want to hit."],
  },
  {
    n: "2",
    name: "We generate",
    lines: ["AI-powered visuals and a cinematic", "scroll, built in Claude Code."],
  },
  {
    n: "3",
    name: "You review",
    lines: ["One round of revisions included", "so the final build feels right."],
  },
  {
    n: "4",
    name: "We deploy",
    lines: ["Live on your own domain,", "deployed via Vercel."],
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{
        background: "#111111",
        padding: "clamp(90px, 12vh, 160px) clamp(20px, 6vw, 80px)",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(48px, 7vh, 88px)" }}>
          <Reveal>
            <div className="label" style={{ marginBottom: 22 }}>
              THE PROCESS
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="font-display"
              style={{
                fontWeight: 600,
                fontSize: "clamp(36px, 6vw, 64px)",
                lineHeight: 1.05,
                color: "var(--text-primary)",
              }}
            >
              From brief to live in 3 days.
            </h2>
          </Reveal>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "clamp(32px, 4vw, 48px)",
            position: "relative",
          }}
        >
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={0.12 * i}>
              <div style={{ position: "relative" }}>
                {/* Gold connector line on desktop */}
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden
                    className="step-connector"
                    style={{
                      position: "absolute",
                      top: 44,
                      right: "calc(-1 * clamp(16px, 2vw, 24px))",
                      width: "clamp(32px, 4vw, 48px)",
                      height: 1,
                      background:
                        "linear-gradient(to right, rgba(201,168,76,0.5), rgba(201,168,76,0))",
                    }}
                  />
                )}
                <div
                  className="font-display"
                  style={{
                    fontSize: 80,
                    fontWeight: 600,
                    color: "var(--gold)",
                    lineHeight: 1,
                    marginBottom: 18,
                  }}
                >
                  {s.n}
                </div>
                <h3
                  className="font-body"
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    marginBottom: 12,
                  }}
                >
                  {s.name}
                </h3>
                {s.lines.map((line) => (
                  <p
                    key={line}
                    className="font-body"
                    style={{
                      fontSize: 14,
                      fontWeight: 300,
                      color: "var(--muted)",
                      lineHeight: 1.6,
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

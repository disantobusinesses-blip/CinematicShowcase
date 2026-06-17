"use client";

export default function Footer() {
  return (
    <footer
      style={{
        background: "rgba(8,8,8,0.94)",
        padding: "clamp(56px, 9vh, 96px) clamp(20px, 6vw, 80px)",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div
          className="font-display"
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: "var(--gold)",
            letterSpacing: "0.04em",
            marginBottom: 14,
          }}
        >
          IAS
        </div>
        <p
          className="font-body"
          style={{
            fontSize: 13,
            color: "var(--muted)",
            fontWeight: 300,
            marginBottom: 26,
          }}
        >
          Cinematic websites for businesses that mean business.
        </p>

        <div
          style={{
            display: "flex",
            gap: 28,
            justifyContent: "center",
            marginBottom: 32,
            flexWrap: "wrap",
          }}
        >
          <a
            href="mailto:sales@intelligentaisystem.com"
            className="font-body"
            style={{
              fontSize: 13,
              color: "var(--gold)",
              textDecoration: "none",
              fontWeight: 400,
            }}
          >
            sales@intelligentaisystem.com
          </a>
          <a
            href="https://intelligentaisystem.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body"
            style={{
              fontSize: 13,
              color: "var(--gold)",
              textDecoration: "none",
              fontWeight: 400,
            }}
          >
            intelligentaisystem.com
          </a>
        </div>

        <p
          className="font-body"
          style={{
            fontSize: 11,
            color: "var(--muted)",
            fontWeight: 300,
            marginBottom: 8,
          }}
        >
          &copy; 2025 Capital Intelligence Group. All rights reserved.
        </p>
        <a
          href="https://intelligentaisystem.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-body"
          style={{
            fontSize: 11,
            color: "var(--gold)",
            textDecoration: "none",
            fontWeight: 400,
          }}
        >
          Website by IAS
        </a>
      </div>
    </footer>
  );
}

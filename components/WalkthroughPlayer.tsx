"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// One continuous cinematic walk-through, stitched from 9 Kling transitions
// (room 1 -> 2 -> ... -> 10) and exported to a scroll-scrubbed frame sequence.
const FRAME_COUNT = 363;
const framePath = (i: number) =>
  `/frames/frame-${String(i).padStart(4, "0")}.jpg`;

// How many viewport-heights of scrolling the whole walk-through spans.
const SCROLL_VH = 600;

// Rooms are evenly spaced across the walk-through; index i sits at progress i/9.
const ROOMS = [
  "Exterior",
  "Entry Foyer",
  "Living Room",
  "Kitchen",
  "Dining",
  "Master Bedroom",
  "Ensuite",
  "Home Theatre",
  "Alfresco",
  "Pool at Dusk",
];

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

export default function WalkthroughPlayer() {
  const spacerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastFrameRef = useRef<number>(-1);

  const [loaded, setLoaded] = useState(false);
  const [loadPct, setLoadPct] = useState(0);
  const [progress, setProgress] = useState(0);

  // Draw a single frame to the canvas using object-cover maths.
  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[idx];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cw = canvas.width;
    const ch = canvas.height;
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;
    let dw: number, dh: number, dx: number, dy: number;
    if (cr > ir) {
      dw = cw;
      dh = cw / ir;
      dx = 0;
      dy = (ch - dh) / 2;
    } else {
      dh = ch;
      dw = ch * ir;
      dy = 0;
      dx = (cw - dw) / 2;
    }
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  // Size the canvas to the viewport (device-pixel sharp).
  const sizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    if (lastFrameRef.current >= 0) drawFrame(lastFrameRef.current);
  }, [drawFrame]);

  // Preload the full frame sequence, reporting progress.
  useEffect(() => {
    let done = 0;
    let cancelled = false;
    const imgs: HTMLImageElement[] = new Array(FRAME_COUNT);
    // Reveal once most frames are ready (the rest stream in), so a single
    // stalled request can never lock the site behind the loader.
    const READY_AT = Math.ceil(FRAME_COUNT * 0.9);
    const onOne = () => {
      done += 1;
      if (cancelled) return;
      setLoadPct(done / FRAME_COUNT);
      if (done >= READY_AT) setLoaded(true);
    };
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.onload = onOne;
      img.onerror = onOne;
      img.src = framePath(i + 1);
      imgs[i] = img;
      // Paint the very first frame as soon as it arrives.
      if (i === 0) {
        img.onload = () => {
          onOne();
          if (!cancelled) {
            lastFrameRef.current = 0;
            drawFrame(0);
          }
        };
      }
    }
    imagesRef.current = imgs;
    // Hard fallback: never keep the loader up longer than 12s.
    const fallback = setTimeout(() => {
      if (!cancelled) setLoaded(true);
    }, 12000);
    return () => {
      cancelled = true;
      clearTimeout(fallback);
    };
  }, [drawFrame]);

  // Scroll -> progress -> frame.
  useEffect(() => {
    const update = () => {
      const spacer = spacerRef.current;
      if (!spacer) return;
      const rect = spacer.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = clamp(-rect.top, 0, total);
      const p = total > 0 ? scrolled / total : 0;
      setProgress(p);
      const idx = clamp(Math.round(p * (FRAME_COUNT - 1)), 0, FRAME_COUNT - 1);
      if (idx !== lastFrameRef.current) {
        lastFrameRef.current = idx;
        drawFrame(idx);
      }
    };
    // Update directly on scroll — browsers already coalesce scroll events to
    // frames, and the work (one rect read + a drawImage only when the frame
    // index changes) is cheap. This avoids stalling if rAF is throttled
    // (hidden tab, reduced-motion, background).
    sizeCanvas();
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", sizeCanvas);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", sizeCanvas);
    };
  }, [drawFrame, sizeCanvas]);

  // Redraw current frame once everything has loaded.
  useEffect(() => {
    if (loaded && lastFrameRef.current >= 0) drawFrame(lastFrameRef.current);
  }, [loaded, drawFrame]);

  // Keyboard: arrows nudge the scroll along the walk-through.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const step = window.innerHeight * 0.9;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        window.scrollBy({ top: step, behavior: "smooth" });
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        window.scrollBy({ top: -step, behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scrollToEnquire = useCallback(() => {
    document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Skip the cinematic scroll and jump straight to the site content.
  const skipWalkthrough = useCallback(() => {
    const el = document.getElementById("site-content");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: window.innerHeight * 6, behavior: "smooth" });
  }, []);

  const activeRoom = clamp(Math.round(progress * (ROOMS.length - 1)), 0, ROOMS.length - 1);
  const introOpacity = clamp(1 - progress / 0.07, 0, 1);
  const closingOpacity = clamp((progress - 0.78) / 0.18, 0, 1);
  const uiVisible = progress < 0.999;

  return (
    <>
      {/* In-flow element that provides the scroll distance for the walk-through */}
      <div ref={spacerRef} style={{ height: `${SCROLL_VH}vh` }} aria-hidden />

      {/* Fixed visual layer — the scrubbed canvas sits behind the page content */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          background: "#000",
          zIndex: 10,
        }}
      >
        <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />

        {/* Vignette for UI legibility */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 58%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        {/* Loading overlay */}
        <AnimatePresence>
          {!loaded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: 0,
                background: "#0A0A0A",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "0 24px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: 11,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  fontWeight: 500,
                  marginBottom: 22,
                }}
              >
                PREPARING CINEMATIC WALKTHROUGH
              </div>
              <div
                style={{
                  width: 220,
                  height: 2,
                  background: "rgba(201,168,76,0.18)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    background: "var(--gold)",
                    transformOrigin: "left center",
                    transform: `scaleX(${loadPct})`,
                    transition: "transform 0.2s linear",
                  }}
                />
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: 12,
                  color: "var(--muted)",
                  fontWeight: 300,
                  marginTop: 16,
                }}
              >
                {Math.round(loadPct * 100)}%
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Intro overlay — fades as the walk begins */}
        {loaded && introOpacity > 0.01 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `rgba(0,0,0,${0.55 * introOpacity})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "0 24px",
              opacity: introOpacity,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: 11,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--gold)",
                fontWeight: 500,
                marginBottom: 24,
              }}
            >
              CINEMATIC WALKTHROUGH
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display), serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(48px, 8vw, 80px)",
                lineHeight: 1.05,
                color: "#F5F0E8",
                marginBottom: 18,
              }}
            >
              Step Inside.
            </h1>
            <p
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "clamp(14px, 2vw, 17px)",
                color: "var(--text-body)",
                fontWeight: 300,
                marginBottom: 16,
                maxWidth: 540,
                lineHeight: 1.6,
              }}
            >
              A fully finished luxury home — one continuous walk, no cuts.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "clamp(13px, 1.7vw, 15px)",
                color: "var(--muted)",
                fontWeight: 300,
                marginBottom: 38,
                maxWidth: 540,
                lineHeight: 1.7,
              }}
            >
              Showcase your own work exactly like this. Send us your images and
              our system stitches them together into one seamless cinematic
              walkthrough.
            </p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: 11,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--gold)",
                fontWeight: 500,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                marginBottom: 30,
              }}
            >
              Scroll to explore
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="var(--gold)" strokeWidth="1.5">
                <path d="M9 3v12M4 10l5 5 5-5" />
              </svg>
            </motion.div>
            <button
              onClick={skipWalkthrough}
              style={{
                pointerEvents: "auto",
                fontFamily: "var(--font-body), sans-serif",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--gold)",
                fontWeight: 500,
                background: "transparent",
                border: "1px solid var(--border-gold)",
                padding: "0.75em 1.8em",
                borderRadius: 2,
                cursor: "pointer",
              }}
            >
              Skip the walkthrough
            </button>
          </div>
        )}

        {/* Closing caption — fades in as the walk completes and the house
            becomes the hero behind the site. */}
        {loaded && closingOpacity > 0.01 && (
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "32%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "0 24px",
              opacity: closingOpacity,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display), serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(30px, 5vw, 52px)",
                lineHeight: 1.1,
                color: "#F5F0E8",
                marginBottom: 14,
                textShadow: "0 2px 30px rgba(0,0,0,0.6)",
              }}
            >
              Now picture your work here.
            </div>
            <p
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "clamp(13px, 1.7vw, 15px)",
                color: "var(--text-body)",
                fontWeight: 300,
                maxWidth: 460,
                lineHeight: 1.7,
                textShadow: "0 2px 20px rgba(0,0,0,0.6)",
              }}
            >
              Your images, stitched into a cinematic walkthrough like this one —
              built by IAS.
            </p>
          </div>
        )}

        {/* Walk-through UI — visible while scrubbing */}
        {loaded && uiVisible && (
          <>
            {/* Top left brand */}
            <div
              style={{
                position: "absolute",
                top: 88,
                left: "clamp(18px, 4vw, 32px)",
                fontFamily: "var(--font-body), sans-serif",
                fontSize: 11,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--gold)",
                fontWeight: 500,
                opacity: 1 - introOpacity,
                pointerEvents: "none",
              }}
            >
              IAS BUILD SHOWCASE
            </div>

            {/* Top right room name */}
            <div
              style={{
                position: "absolute",
                top: 88,
                right: "clamp(18px, 4vw, 32px)",
                fontFamily: "var(--font-body), sans-serif",
                fontSize: 13,
                color: "var(--muted)",
                fontWeight: 300,
                opacity: 1 - introOpacity,
                pointerEvents: "none",
              }}
            >
              {ROOMS[activeRoom]}
            </div>

            {/* Centre-bottom room label */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 70,
                display: "flex",
                justifyContent: "center",
                pointerEvents: "none",
                opacity: 1 - introOpacity,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRoom}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontStyle: "italic",
                    fontSize: 28,
                    color: "#F5F0E8",
                    padding: "0.35em 1.4em",
                    borderRadius: 4,
                    background: "rgba(0,0,0,0.5)",
                  }}
                >
                  {ROOMS[activeRoom]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom progress bar */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: 2,
                background: "rgba(201,168,76,0.15)",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  transformOrigin: "left center",
                  transform: `scaleX(${progress})`,
                  background: "var(--gold)",
                }}
              />
            </div>

            {/* Bottom right skip to enquire */}
            <button
              onClick={scrollToEnquire}
              style={{
                position: "absolute",
                bottom: 26,
                right: "clamp(18px, 4vw, 32px)",
                fontFamily: "var(--font-body), sans-serif",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--gold)",
                fontWeight: 500,
                background: "rgba(0,0,0,0.35)",
                border: "1px solid var(--border-gold)",
                padding: "0.7em 1.4em",
                borderRadius: 2,
                cursor: "pointer",
                opacity: 1 - introOpacity,
              }}
            >
              Skip to Enquire
            </button>
          </>
        )}
      </div>
    </>
  );
}

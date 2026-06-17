"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ROOMS = [
  { src: "/images/room-01.jpg", name: "Exterior" },
  { src: "/images/room-02.jpg", name: "Entry Foyer" },
  { src: "/images/room-03.jpg", name: "Living Room" },
  { src: "/images/room-04.jpg", name: "Kitchen" },
  { src: "/images/room-05.jpg", name: "Dining" },
  { src: "/images/room-06.jpg", name: "Master Bedroom" },
  { src: "/images/room-07.jpg", name: "Ensuite" },
  { src: "/images/room-08.jpg", name: "Home Theatre" },
  { src: "/images/room-09.jpg", name: "Alfresco" },
  { src: "/images/room-10.jpg", name: "Pool at Dusk" },
];

const ADVANCE_MS = 5000;

export default function WalkthroughPlayer() {
  const [currentRoom, setCurrentRoom] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect mobile (below 768px) — disables Ken Burns for performance.
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const next = useCallback(() => {
    setCurrentRoom((r) => (r + 1) % ROOMS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentRoom((r) => (r - 1 + ROOMS.length) % ROOMS.length);
  }, []);

  const start = useCallback(() => {
    setCurrentRoom(0);
    setHasStarted(true);
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    if (!hasStarted) return;
    setIsPlaying((p) => !p);
  }, [hasStarted]);

  const scrollToEnquire = useCallback(() => {
    document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Auto-advance every 5s while playing.
  useEffect(() => {
    if (!hasStarted || !isPlaying) return;
    const t = setTimeout(next, ADVANCE_MS);
    return () => clearTimeout(t);
  }, [hasStarted, isPlaying, currentRoom, next]);

  // Keyboard controls: arrows navigate, space toggles play/pause.
  useEffect(() => {
    if (!hasStarted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hasStarted, next, prev, togglePlay]);

  const progress = (currentRoom + 1) / ROOMS.length;

  return (
    <div
      ref={containerRef}
      onClick={() => hasStarted && next()}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#000",
        cursor: hasStarted ? "pointer" : "default",
        zIndex: 10,
      }}
    >
      {/* Image stack — all absolute inset 0, crossfade via opacity */}
      {ROOMS.map((room, i) => {
        const isActive = i === currentRoom;
        return (
          <motion.div
            key={room.src}
            initial={false}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ position: "absolute", inset: 0 }}
          >
            <motion.div
              key={`kb-${i}-${isActive}`}
              initial={{ scale: 1 }}
              animate={{ scale: isActive && !isMobile ? 1.08 : 1 }}
              transition={
                isActive && !isMobile
                  ? { duration: 6, ease: "linear", repeat: Infinity, repeatType: "reverse" }
                  : { duration: 0 }
              }
              style={{ position: "absolute", inset: 0 }}
            >
              <Image
                src={room.src}
                alt={room.name}
                fill
                priority={i === 0}
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Subtle vignette for UI legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Centre-bottom room label */}
      {hasStarted && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: isMobile ? 90 : 64,
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRoom}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
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
              {ROOMS[currentRoom].name}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Walkthrough UI — shown once started */}
      {hasStarted && (
        <>
          {/* Top left brand */}
          <div
            style={{
              position: "absolute",
              top: isMobile ? 80 : 88,
              left: isMobile ? 18 : 32,
              fontFamily: "var(--font-body), sans-serif",
              fontSize: 11,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--gold)",
              fontWeight: 500,
              pointerEvents: "none",
            }}
          >
            IAS BUILD SHOWCASE
          </div>

          {/* Top right room name */}
          <div
            style={{
              position: "absolute",
              top: isMobile ? 108 : 92,
              right: isMobile ? 18 : 32,
              fontFamily: "var(--font-body), sans-serif",
              fontSize: 13,
              color: "var(--muted)",
              fontWeight: 300,
              pointerEvents: "none",
            }}
          >
            {ROOMS[currentRoom].name}
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
            <motion.div
              animate={{ scaleX: progress }}
              transition={{ duration: 0.8, ease: [0.25, 0, 0, 1] }}
              style={{
                height: "100%",
                width: "100%",
                transformOrigin: "left center",
                background: "var(--gold)",
              }}
            />
          </div>

          {/* Bottom left play/pause toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            aria-label={isPlaying ? "Pause walkthrough" : "Play walkthrough"}
            style={{
              position: "absolute",
              bottom: isMobile ? 22 : 28,
              left: isMobile ? 18 : 32,
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "1px solid var(--border-gold)",
              background: "rgba(0,0,0,0.4)",
              color: "var(--gold)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {isPlaying ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <rect x="2" y="1" width="3.5" height="12" rx="1" />
                <rect x="8.5" y="1" width="3.5" height="12" rx="1" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <path d="M3 1.5v11l9-5.5z" />
              </svg>
            )}
          </button>

          {/* Bottom right skip to enquire */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              scrollToEnquire();
            }}
            style={{
              position: "absolute",
              bottom: isMobile ? 22 : 30,
              right: isMobile ? 18 : 32,
              fontFamily: "var(--font-body), sans-serif",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--gold)",
              fontWeight: 500,
              background: "transparent",
              border: "1px solid var(--border-gold)",
              padding: "0.7em 1.4em",
              borderRadius: 2,
              cursor: "pointer",
            }}
          >
            Skip to Enquire
          </button>
        </>
      )}

      {/* Play overlay — shown before start */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            onClick={(e) => {
              e.stopPropagation();
              start();
            }}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.7)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "0 24px",
              cursor: "pointer",
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
                fontSize: isMobile ? 52 : 80,
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
                fontSize: isMobile ? 15 : 17,
                color: "var(--muted)",
                fontWeight: 300,
                marginBottom: 40,
                maxWidth: 480,
              }}
            >
              A fully finished luxury home. Room by room.
            </p>
            <motion.button
              whileHover={{ scale: 1.06, borderColor: "var(--gold-hover)" }}
              whileTap={{ scale: 0.97 }}
              aria-label="Play cinematic walkthrough"
              style={{
                width: 96,
                height: 96,
                borderRadius: "50%",
                border: "1.5px solid var(--gold)",
                background: "rgba(0,0,0,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <svg width="34" height="34" viewBox="0 0 34 34" fill="var(--gold)">
                <path d="M11 7v20l16-10z" />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

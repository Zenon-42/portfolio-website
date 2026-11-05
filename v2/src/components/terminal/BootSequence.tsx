"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  "[  0.000000] Linux version 6.9.1-cinematic (root@devbox) #1 SMP PREEMPT",
  "[  0.041233] Command line: BOOT_IMAGE=/vmlinuz mode=ascend quiet splash",
  "[  0.102451] ACPI: Core revision 20260101",
  "[  0.228900] Loading cinematic engine modules…",
  "[  0.401221] systemd[1]: Detected architecture x86-64.hero",
  "[  0.512384] systemd[1]: Started Portfolio Cinematic Engine.",
  "[  0.598712] systemd[1]: Reached target Graphical Interface.",
  "[  0.655501] gpu: initialising glow shaders… OK",
  "[  0.702118] fonts: mounting anton.ttf… OK",
  "[  0.755900] hero-index: ranking 5 projects by POWER LEVEL… OK",
  "[  0.811244] marquee: velocity set to max… OK",
  "[  0.880012] easter-egg.service: running since forever",
  "[  0.933417] systemd[1]: Reached target SURPRISE.",
  "starting display server…",
];

const TOTAL_MS = 2600; // full sequence (skip button always available)

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState(0);
  const [phase, setPhase] = useState<"boot" | "loading">("boot");
  const [pct, setPct] = useState(0);
  const done = useRef(false);

  const finish = () => {
    if (!done.current) {
      done.current = true;
      onComplete();
    }
  };

  useEffect(() => {
    /* phase 1: fast log lines */
    let n = 0;
    const lineId = setInterval(() => {
      n += 1;
      if (n >= BOOT_LINES.length) {
        clearInterval(lineId);
        setPhase("loading");
      }
      setLines(n);
    }, 105);

    return () => clearInterval(lineId);
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;
    /* phase 2: tbhx-style loading 0→100 */
    const start = performance.now();
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1400);
      // ease-out for satisfying deceleration
      const eased = 1 - Math.pow(1 - p, 2.2);
      setPct(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(finish, 420);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  /* safety: never trap the user */
  useEffect(() => {
    const id = setTimeout(finish, TOTAL_MS + 2000);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(id);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={finish}
      aria-label="Skip boot sequence"
      className="fixed inset-0 z-50 bg-black text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff41]"
    >
      {/* CRT overlays stay on */}
      <div className="crt-scanlines crt-vignette absolute inset-0" aria-hidden="true" />

      {phase === "boot" ? (
        <div className="relative z-10 h-full p-4 sm:p-8 font-mono text-[10px] sm:text-xs text-[#c8ffcf] overflow-hidden">
          {BOOT_LINES.slice(0, lines).map((l, i) => (
            <p key={i} className={l.startsWith("starting") ? "boot-blink mt-2 text-[#00ff41]" : ""}>
              {l.startsWith("starting") ? l : <span><span className="text-[#3f7a4c]">[ OK ]</span> {l}</span>}
            </p>
          ))}
          <p className="cursor-block text-[#00ff41]">▊</p>
        </div>
      ) : (
        <div className="relative z-10 h-full flex flex-col items-center justify-center gap-6 px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <p className="text-[#3f7a4c] text-[10px] sm:text-xs tracking-[0.5em] mb-3">SURPRISE PROTOCOL // EXECUTED</p>
            <h2 className="font-anton text-4xl sm:text-6xl text-[#00ff41] phos-glow tracking-wide">LOADING</h2>
          </motion.div>

          {/* progress bar */}
          <div className="w-full max-w-md">
            <div className="h-[3px] bg-[#0d2413] overflow-hidden">
              <div
                className="h-full bg-[#00ff41] shadow-[0_0_14px_rgba(0,255,65,0.8)] transition-[width] duration-75"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-[10px] sm:text-xs text-[#3f7a4c]">
              <span>rendering hero…</span>
              <span className="text-[#00ff41] phos-glow-soft font-bold tabular-nums">{pct}%</span>
            </div>
          </div>

          <AnimatePresence>
            {pct >= 100 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[#c8ffcf] text-xs sm:text-sm tracking-[0.35em]"
              >
                100% — WELCOME
              </motion.p>
            )}
          </AnimatePresence>

          <p className="absolute bottom-6 text-[9px] sm:text-[10px] text-[#3f7a4c]">click anywhere to skip</p>
        </div>
      )}
    </button>
  );
}

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TerminalMode from "@/components/terminal/TerminalMode";
import BootSequence from "@/components/terminal/BootSequence";
import CinematicMode from "@/components/cinematic/CinematicMode";

type Mode = "terminal" | "boot" | "cinematic";

export default function Home() {
  const [mode, setMode] = useState<Mode>("terminal");

  return (
    <main>
      <AnimatePresence mode="wait">
        {mode === "terminal" && (
          <motion.div
            key="terminal"
            exit={{ opacity: 0, filter: "brightness(3) blur(2px)" }}
            transition={{ duration: 0.28 }}
          >
            <TerminalMode onAscend={() => setMode("boot")} />
          </motion.div>
        )}

        {mode === "boot" && (
          <motion.div key="boot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <BootSequence onComplete={() => setMode("cinematic")} />
          </motion.div>
        )}

        {mode === "cinematic" && (
          <motion.div
            key="cinematic"
            initial={{ opacity: 0, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <CinematicMode onExit={() => setMode("terminal")} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

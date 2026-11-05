"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, Power, ArrowUpRight, Terminal } from "lucide-react";
import { persona, projects, skills, timeline, stats, marqueeItems } from "@/data/portfolio";
import Particles from "./Particles";

type Props = { onExit: () => void };

/* reveal wrapper */
const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

function Reveal({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <motion.section
      id={id}
      variants={rise}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* count-up stat */
function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const dur = 1200;
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / dur);
            setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-anton text-3xl sm:text-5xl text-white">
        {n.toLocaleString("en-IN")}
        <span className="text-[#00ff41]">{suffix}</span>
      </p>
      <p className="mt-1 text-[9px] sm:text-[11px] tracking-[0.3em] text-[#5b8a67]">{label}</p>
    </div>
  );
}

/* ──────────────────────────────────────────────── */

export default function CinematicMode({ onExit }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const p = persona;

  return (
    <div ref={containerRef} className="fixed inset-0 z-40 overflow-y-auto term-scroll bg-black text-white" id="top">
      {/* ══ NAV ══ */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.06] bg-black/70 backdrop-blur-md">
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Main">
          <a href="#top" className="font-anton text-lg tracking-wider text-white">
            SB<span className="text-[#00ff41]">_</span>
          </a>
          <ul className="hidden md:flex items-center gap-7 text-[11px] tracking-[0.25em] text-[#7aa885]">
            {["PROJECTS", "SKILLS", "TIMELINE", "CONTACT"].map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="hover:text-[#00ff41] transition-colors">{l}</a>
              </li>
            ))}
          </ul>
          <button
            onClick={onExit}
            className="flex items-center gap-2 rounded-full border border-[#00ff41]/40 px-3.5 py-1.5 text-[10px] sm:text-[11px] font-bold tracking-widest text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-colors cursor-pointer"
            title="Back to the terminal"
          >
            <Power size={12} aria-hidden="true" />
            <span className="hidden sm:inline">TERMINAL MODE</span>
            <span className="sm:hidden">EXIT</span>
          </button>
        </nav>
      </header>

      {/* ══ HERO ══ */}
      <div ref={heroRef} className="relative flex min-h-[100dvh] flex-col overflow-hidden">
        <div className="cine-grid absolute inset-0" aria-hidden="true" />
        <Particles />

        {/* glow orbs */}
        <div aria-hidden="true" className="absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[720px] rounded-full bg-[#00ff41]/[0.07] blur-[110px]" />
        <div aria-hidden="true" className="absolute bottom-0 right-0 h-[300px] w-[400px] rounded-full bg-[#00e5a0]/[0.05] blur-[100px]" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 pt-24 pb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-6 flex items-center gap-2.5 rounded-full border border-[#00ff41]/25 bg-[#00ff41]/[0.06] px-4 py-1.5"
          >
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#00ff41]" aria-hidden="true" />
            <span className="text-[9px] sm:text-[11px] tracking-[0.35em] text-[#9dffb6]">SYSTEM ONLINE — OPEN TO WORK</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="font-anton uppercase leading-[0.92]"
          >
            <span className="block text-[clamp(3.4rem,13vw,9.5rem)] text-white drop-shadow-[0_0_35px_rgba(0,255,65,0.25)]">
              {p.name.split(" ")[0]}
            </span>
            <span className="block text-[clamp(3.4rem,13vw,9.5rem)] text-stroke">
              {p.name.split(" ").slice(1).join(" ")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-6 max-w-xl text-xs sm:text-sm leading-relaxed text-[#a8d4b2]"
          >
            {p.tagline} — formerly confined to a terminal near you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#projects"
              className="group flex items-center gap-2 rounded-full bg-[#00ff41] px-6 py-2.5 text-[11px] font-bold tracking-[0.2em] text-black hover:shadow-[0_0_35px_rgba(0,255,65,0.45)] transition-shadow"
            >
              VIEW HERO INDEX
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
            </a>
            <a
              href={`mailto:${p.email}`}
              className="rounded-full border border-white/20 px-6 py-2.5 text-[11px] font-bold tracking-[0.2em] text-white hover:border-[#00ff41] hover:text-[#00ff41] transition-colors"
            >
              CONTACT
            </a>
          </motion.div>
        </motion.div>

        <div className="relative z-10 pb-6 text-center" aria-hidden="true">
          <span className="scroll-hint inline-block text-[10px] tracking-[0.4em] text-[#5b8a67]">▼ SCROLL</span>
        </div>
      </div>

      {/* ══ MARQUEE ══ */}
      <div className="relative border-y border-[#00ff41]/15 bg-[#00ff41]/[0.04] py-3 overflow-hidden" aria-hidden="true">
        <div className="animate-marquee flex w-max whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex">
              {marqueeItems.map((m) => (
                <span key={`${dup}-${m}`} className="mx-6 flex items-center gap-6 font-anton text-sm sm:text-lg tracking-wider text-[#00ff41]/90">
                  {m} <span className="text-[#00e5a0]/60">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ══ STATS ══ */}
      <Reveal className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 py-20 sm:grid-cols-4 sm:py-24">
        {stats.map((s) => (
          <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
        ))}
      </Reveal>

      {/* ══ HERO INDEX (projects) ══ */}
      <Reveal id="projects" className="mx-auto max-w-6xl px-4 pb-24">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.4em] text-[#5b8a67]">CLASSIFIED RECORDS</p>
            <h2 className="mt-2 font-anton text-3xl sm:text-5xl uppercase text-white">
              Hero <span className="text-[#00ff41]">Index</span>
            </h2>
          </div>
          <p className="hidden sm:block text-[11px] text-[#5b8a67] max-w-[220px] text-right">
            top 5 projects, ranked by absolute power level
          </p>
        </div>

        <ol className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
          {projects.map((pr, i) => (
            <motion.li
              key={pr.name}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <a
                href={pr.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-4 overflow-hidden px-2 py-6 sm:gap-8 sm:px-4 sm:py-8"
              >
                {/* hover sweep */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#00ff41]/[0.09] to-transparent transition-transform duration-500 group-hover:translate-x-0" aria-hidden="true" />

                <span className="font-anton text-3xl sm:text-6xl text-stroke-white w-14 sm:w-24 shrink-0 group-hover:text-[#00ff41] group-hover:[-webkit-text-stroke:0px] transition-all">
                  {pr.index}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span
                      className={`inline-flex h-6 w-6 items-center justify-center border text-xs font-bold rounded-sm ${
                        pr.rank === "S" ? "rank-s" : pr.rank === "A" ? "rank-a" : "rank-b"
                      }`}
                    >
                      {pr.rank}
                    </span>
                    <span className="font-anton text-xl sm:text-3xl uppercase tracking-wide text-white group-hover:text-[#00ff41] transition-colors">
                      {pr.name}
                    </span>
                    <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-[#5b8a67]">
                      RANK {pr.rank} — LV.{5 - i}
                    </span>
                  </span>
                  <span className="mt-1.5 block text-[11px] sm:text-sm text-[#8fb59a] max-w-2xl">
                    {pr.desc}
                  </span>
                  <span className="mt-2 flex flex-wrap gap-1.5">
                    {pr.stack.map((s) => (
                      <span key={s} className="rounded-full border border-white/10 px-2 py-0.5 text-[9px] sm:text-[10px] tracking-wider text-[#7aa885]">
                        {s}
                      </span>
                    ))}
                  </span>
                </span>

                <ArrowUpRight
                  size={20}
                  className="shrink-0 text-[#00ff41] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                  aria-hidden="true"
                />
              </a>
            </motion.li>
          ))}
        </ol>
      </Reveal>

      {/* ══ SKILLS ══ */}
      <Reveal id="skills" className="mx-auto max-w-5xl px-4 pb-24">
        <p className="text-[10px] tracking-[0.4em] text-[#5b8a67]">LOADOUT</p>
        <h2 className="mt-2 mb-10 font-anton text-3xl sm:text-5xl uppercase text-white">
          Skill <span className="text-[#00ff41]">Tree</span>
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {skills.map((g, i) => (
            <motion.div
              key={g.dir}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-5"
            >
              <p className="mb-3 font-mono text-xs text-[#00ff41]">~/{g.dir}</p>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span key={s} className="rounded-full bg-white/[0.05] px-3 py-1 text-[11px] text-[#c8e6cf] hover:bg-[#00ff41]/15 hover:text-[#00ff41] transition-colors">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Reveal>

      {/* ══ TIMELINE ══ */}
      <Reveal id="timeline" className="mx-auto max-w-3xl px-4 pb-24">
        <p className="text-[10px] tracking-[0.4em] text-[#5b8a67]">ORIGIN STORY</p>
        <h2 className="mt-2 mb-12 font-anton text-3xl sm:text-5xl uppercase text-white">
          The <span className="text-[#00ff41]">Timeline</span>
        </h2>
        <ol className="relative border-l border-[#00ff41]/25 pl-6 sm:pl-8 space-y-10">
          {timeline.map((t, i) => (
            <motion.li
              key={t.year}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="relative"
            >
              <span className="pulse-dot absolute -left-[31px] sm:-left-[39px] top-1 h-2.5 w-2.5 rounded-full bg-[#00ff41]" aria-hidden="true" />
              <p className="font-anton text-2xl text-[#00ff41]">{t.year}</p>
              <p className="mt-1 text-sm font-semibold text-white">{t.line}</p>
              <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#8fb59a]">{t.detail}</p>
            </motion.li>
          ))}
        </ol>
      </Reveal>

      {/* ══ CONTACT ══ */}
      <Reveal id="contact" className="relative overflow-hidden px-4 pb-20 pt-10 text-center">
        <div aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[680px] rounded-full bg-[#00ff41]/[0.06] blur-[120px]" />
        <div className="relative">
          <p className="text-[10px] tracking-[0.4em] text-[#5b8a67]">FINAL SEQUENCE</p>
          <h2 className="mt-3 font-anton uppercase leading-none text-[clamp(2.6rem,9vw,6.5rem)] text-white">
            Initiate<br />
            <span className="text-[#00ff41] drop-shadow-[0_0_28px_rgba(0,255,65,0.4)]">Contact</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-xs sm:text-sm text-[#8fb59a]">
            one mail is all it takes. no cover-letter rituals required.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${p.email}`}
              className="flex items-center gap-2 rounded-full bg-[#00ff41] px-7 py-3 text-[11px] font-bold tracking-[0.2em] text-black hover:shadow-[0_0_40px_rgba(0,255,65,0.5)] transition-shadow"
            >
              <Mail size={14} aria-hidden="true" /> SAY HELLO
            </a>
            <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white hover:border-[#00ff41] hover:text-[#00ff41] transition-colors">
              <Github size={17} aria-hidden="true" />
            </a>
            <a href={p.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white hover:border-[#00ff41] hover:text-[#00ff41] transition-colors">
              <Linkedin size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </Reveal>

      {/* ══ FOOTER ══ */}
      <footer className="border-t border-white/[0.06] px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-[10px] tracking-[0.25em] text-[#5b8a67]">
            © 2026 {p.name.toUpperCase()} — BORN IN A TERMINAL, UPGRADED FOR THE BIG SCREEN
          </p>
          <button
            onClick={onExit}
            className="flex items-center gap-2 text-[10px] tracking-[0.25em] text-[#00ff41] hover:text-white transition-colors cursor-pointer"
          >
            <Terminal size={13} aria-hidden="true" /> $ exit
          </button>
        </div>
      </footer>
    </div>
  );
}

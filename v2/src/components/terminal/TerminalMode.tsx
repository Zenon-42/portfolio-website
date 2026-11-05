"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";
import {
  persona,
  about,
  skills,
  projects,
  timeline,
} from "@/data/portfolio";

/* ────────────────────────────────────────────────
   Types
   ──────────────────────────────────────────────── */

type Variant = "out" | "dim" | "ok" | "warn" | "err" | "head" | "sub";

type TermBlock =
  | { kind: "text"; text: string; variant?: Variant; pre?: boolean }
  | { kind: "jsx"; el: React.ReactNode };

type TermPage = {
  cmd: string;
  blocks: TermBlock[];
};

type Props = {
  onAscend: () => void;
};

const PAGE_LABELS = ["whoami", "about.txt", "skills/", "projects/", "career.log", "contact.sh"];

const variantCls: Record<Variant, string> = {
  out: "text-[#c8ffcf]",
  dim: "text-[#3f7a4c]",
  ok: "text-[#00ff41]",
  warn: "text-[#ffd23f]",
  err: "text-[#ff6b6b]",
  head: "text-[#00ff41] font-bold",
  sub: "text-[#9dffb6]",
};

/* ────────────────────────────────────────────────
   Page builders — each page looks like a shell command
   ──────────────────────────────────────────────── */

const BANNER =
  "▄▀█ █▀█ ░░█ █ █▄░█\n█▄█ █▀▄ █▄█ █ █░▀█";

function buildPages(): TermPage[] {
  const p = persona;

  const whoami: TermBlock[] = [
    { kind: "jsx", el: (
      <pre aria-hidden="true" className="text-[#00ff41] phos-glow text-[9px] leading-[1.15] sm:text-sm whitespace-pre select-none">{BANNER}</pre>
    )},
    { kind: "text", text: `${p.name} — ${p.role}`, variant: "sub" },
    { kind: "text", text: `"${p.tagline}"`, variant: "out" },
    { kind: "text", text: "", variant: "out" },
    { kind: "text", text: `home     ${p.location}`, variant: "dim" },
    { kind: "text", text: `mail     ${p.email}`, variant: "dim" },
    { kind: "text", text: `github   github.com/${p.handle}`, variant: "dim" },
    { kind: "text", text: "", variant: "out" },
    { kind: "text", text: "6 pages found. use ← → or the tabs below.", variant: "ok" },
    { kind: "text", text: "psst… there's a ⚡ button in the status bar. trust it.", variant: "warn" },
  ];

  const aboutBlocks: TermBlock[] = [
    { kind: "text", text: "/* about.txt — last modified: today */", variant: "dim" },
    { kind: "text", text: "", variant: "out" },
    { kind: "text", text: about.paragraphs[0], variant: "out" },
    { kind: "text", text: "", variant: "out" },
    { kind: "text", text: about.paragraphs[1], variant: "out" },
    { kind: "text", text: "", variant: "out" },
    { kind: "jsx", el: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-1">
        {about.facts.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 border-b border-dashed border-[#1c3a24] pb-0.5">
            <span className="text-[#3f7a4c]">{k}</span>
            <span className="text-[#c8ffcf]">{v}</span>
          </div>
        ))}
      </div>
    )},
  ];

  const skillBlocks: TermBlock[] = [
    { kind: "text", text: "/home/arjun/skills", variant: "dim" },
    { kind: "text", text: "", variant: "out" },
    ...skills.flatMap((g, gi): TermBlock[] => [
      { kind: "text", text: `├── ${g.dir}`, variant: "head" },
      { kind: "jsx", el: (
        <div className="flex flex-wrap gap-1.5 pl-6 sm:pl-10 py-0.5" key={`g${gi}`}>
          {g.items.map((s) => (
            <span key={s} className="border border-[#1c3a24] px-1.5 py-[1px] text-[10px] sm:text-xs text-[#c8ffcf] hover:bg-[#00ff41]/10 transition-colors">
              {s}
            </span>
          ))}
        </div>
      )},
    ]),
    { kind: "text", text: "└── …always installing more", variant: "dim" },
  ];

  const projectBlocks: TermBlock[] = [
    { kind: "text", text: "total 5   sorted by: hero rank", variant: "dim" },
    { kind: "text", text: "", variant: "out" },
    ...projects.map((pr): TermBlock => ({ kind: "jsx", el: (
      <a
        key={pr.name}
        href={pr.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group block border-l-2 border-[#1c3a24] pl-3 sm:pl-4 py-1.5 hover:border-[#00ff41] hover:bg-[#00ff41]/[0.04] transition-colors"
      >
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-[#3f7a4c] text-xs">[{pr.index}]</span>
          <span className={`inline-flex items-center justify-center min-w-[1.6rem] h-[1.35rem] px-1 text-[10px] font-bold border rounded-sm ${
            pr.rank === "S" ? "rank-s" : pr.rank === "A" ? "rank-a" : "rank-b"
          }`}>{pr.rank}</span>
          <span className="text-[#00ff41] phos-glow-soft font-bold group-hover:translate-x-0.5 transition-transform">{pr.name}</span>
          <span className="text-[#3f7a4c] text-[10px] sm:text-xs">{pr.stack.join(" · ")}</span>
        </div>
        <p className="text-[#c8ffcf] text-xs sm:text-sm mt-0.5 max-w-prose">{pr.desc}</p>
      </a>
    )})),
  ];

  const careerBlocks: TermBlock[] = [
    { kind: "text", text: "==> career.log <==  (following)", variant: "dim" },
    { kind: "text", text: "", variant: "out" },
    ...timeline.flatMap((t): TermBlock[] => [
      { kind: "text", text: `[${t.year}] ▸ ${t.line}`, variant: "head" },
      { kind: "text", text: `    ${t.detail}`, variant: "out" },
    ]),
    { kind: "text", text: "", variant: "out" },
    { kind: "text", text: "^C  to be continued…", variant: "warn" },
  ];

  const p2 = persona;
  const contactBlocks: TermBlock[] = [
    { kind: "text", text: "#!/bin/bash", variant: "dim" },
    { kind: "text", text: "# initiate_contact.sh — fastest routes to me", variant: "dim" },
    { kind: "text", text: "", variant: "out" },
    { kind: "jsx", el: (
      <div className="space-y-2">
        <a href={`mailto:${p2.email}`} className="flex items-center gap-2 text-[#00ff41] phos-glow-soft hover:underline underline-offset-4">
          <span className="text-[#3f7a4c]">$</span> mailto:{p2.email}
        </a>
        <a href={p2.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#00ff41] phos-glow-soft hover:underline underline-offset-4">
          <span className="text-[#3f7a4c]">$</span> open github.com/{p2.handle}
        </a>
        <a href={p2.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#00ff41] phos-glow-soft hover:underline underline-offset-4">
          <span className="text-[#3f7a4c]">$</span> open linkedin/in/{p2.handle}
        </a>
      </div>
    )},
    { kind: "text", text: "", variant: "out" },
    { kind: "text", text: "response_time: < 24h (usually < 1 episode of anime)", variant: "dim" },
    { kind: "text", text: "exit code 0 — thanks for scrolling this far.", variant: "ok" },
  ];

  return [
    { cmd: "whoami", blocks: whoami },
    { cmd: "cat about.txt", blocks: aboutBlocks },
    { cmd: "tree ~/skills -L 1", blocks: skillBlocks },
    { cmd: "ls ~/projects --sort=rank", blocks: projectBlocks },
    { cmd: "tail -f career.log", blocks: careerBlocks },
    { cmd: "./initiate_contact.sh --now", blocks: contactBlocks },
  ];
}

/* ────────────────────────────────────────────────
   Main component
   ──────────────────────────────────────────────── */

export default function TerminalMode({ onAscend }: Props) {
  const pages = useMemo(() => buildPages(), []);
  const [page, setPage] = useState(0);
  const [prevPage, setPrevPage] = useState(0);
  const [typed, setTyped] = useState(0); // chars of command typed
  const [revealed, setRevealed] = useState(0); // blocks revealed
  const [instant, setInstant] = useState(false);
  const [now, setNow] = useState<Date | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reduced = useRef(false);

  const cmd = pages[page].cmd;
  const blocks = pages[page].blocks;

  /* reset animation state when page changes (React render-phase pattern) */
  if (prevPage !== page) {
    setPrevPage(page);
    setTyped(0);
    setRevealed(0);
  }

  /* reduced motion check (client only, ref only — no state) */
  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  /* clock — initial read deferred so we stay hydration-safe */
  useEffect(() => {
    const tick = () => setNow(new Date());
    const t = setTimeout(tick, 0);
    const id = setInterval(tick, 30_000);
    return () => {
      clearTimeout(t);
      clearInterval(id);
    };
  }, []);

  /* type the command out (all setState inside interval callback) */
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 });
    let i = 0;
    const typeId = setInterval(() => {
      i += 1;
      if (reduced.current || instant) {
        clearInterval(typeId);
        setTyped(cmd.length);
        setRevealed(blocks.length);
        return;
      }
      setTyped(i);
      if (i >= cmd.length) clearInterval(typeId);
    }, 26);
    return () => clearInterval(typeId);
  }, [page, cmd, instant, blocks.length]);

  /* reveal blocks one by one once command is typed */
  useEffect(() => {
    if (typed < cmd.length || revealed >= blocks.length) return;
    const id = setTimeout(() => {
      setRevealed((r) => Math.min(instant ? blocks.length : r + 1, blocks.length));
    }, instant ? 0 : 46);
    return () => clearTimeout(id);
  }, [typed, cmd.length, revealed, blocks.length, instant]);

  /* keyboard nav */
  const go = useCallback(
    (dir: 1 | -1) => {
      setPage((pg) => (pg + dir + pages.length) % pages.length);
    },
    [pages.length]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); go(1); }
      else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); go(-1); }
      else if (/^[1-6]$/.test(e.key)) setPage(Number(e.key) - 1);
      else if (e.key === "Enter" && revealed < blocks.length) {
        setTyped(cmd.length);
        setRevealed(blocks.length);
        setInstant(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, revealed, blocks.length, cmd.length]);

  const skip = () => {
    if (typed < cmd.length) { setTyped(cmd.length); return; }
    if (revealed < blocks.length) { setInstant(true); setRevealed(blocks.length); }
  };

  const cmdDone = typed >= cmd.length;

  return (
    <div
      className="crt-scanlines crt-vignette crt-flicker fixed inset-0 flex items-stretch sm:items-center justify-center bg-[#050705] sm:p-4 md:p-8"
      role="application"
      aria-label="Terminal portfolio"
    >
      <div
        className="w-full sm:max-w-4xl lg:max-w-5xl sm:h-[min(94dvh,880px)] flex flex-col sm:rounded-lg overflow-hidden border border-[#123f1c] sm:shadow-[0_0_70px_rgba(0,255,65,0.08)] bg-[#050705]"
        onClick={skip}
      >
        {/* ── title bar ── */}
        <div className="flex items-center gap-2 px-3 h-9 sm:h-10 border-b border-[#123f1c] bg-[#071009] shrink-0 select-none">
          <span className="flex gap-1.5" aria-hidden="true">
            <i className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <i className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <i className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </span>
          <span className="flex-1 text-center text-[10px] sm:text-xs text-[#3f7a4c] truncate">
            {persona.handle}@{persona.host}: ~ — zsh — 80×24
          </span>
          <span className="text-[10px] sm:text-xs text-[#3f7a4c] hidden sm:inline">tty1</span>
        </div>

        {/* ── command line ── */}
        <div className="px-3 sm:px-5 pt-3 pb-1.5 shrink-0">
          <p className="text-xs sm:text-sm font-semibold" aria-live="polite">
            <span className="text-[#ffbd2e]">{persona.handle}@{persona.host}</span>
            <span className="text-[#3f7a4c]">:</span>
            <span className="text-[#7dd8ff]">~</span>
            <span className="text-[#3f7a4c]">$ </span>
            <span className="text-[#c8ffcf]">{cmd.slice(0, typed)}</span>
            <span className={`cursor-block text-[#00ff41] ${cmdDone ? "" : "opacity-100"}`}>▊</span>
          </p>
        </div>

        {/* ── output ── */}
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto term-scroll px-3 sm:px-5 pb-4 min-h-0"
        >
          <div className="text-[11px] sm:text-sm leading-relaxed">
            {blocks.slice(0, revealed).map((b, i) =>
              b.kind === "text" ? (
                b.text === "" ? (
                  <div key={i} className="h-2 sm:h-2.5" aria-hidden="true" />
                ) : b.pre ? (
                  <pre key={i} className={`whitespace-pre ${variantCls[b.variant ?? "out"]}`}>{b.text}</pre>
                ) : (
                  <motion.p
                    key={i}
                    initial={instant ? false : { opacity: 0, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                    className={variantCls[b.variant ?? "out"]}
                  >
                    {b.text}
                  </motion.p>
                )
              ) : (
                <motion.div
                  key={i}
                  initial={instant ? false : { opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                  className="py-0.5"
                >
                  {b.el}
                </motion.div>
              )
            )}
            {revealed < blocks.length && cmdDone && (
              <span className="cursor-block text-[#00ff41]">▊</span>
            )}
          </div>
        </div>

        {/* ── tmux status bar ── */}
        <div className="shrink-0 border-t border-[#123f1c] bg-[#071009] text-[9px] sm:text-[11px]" onClick={(e) => e.stopPropagation()}>
          {/* window tabs */}
          <div className="flex items-stretch overflow-x-auto term-scroll" role="tablist" aria-label="Pages">
            {PAGE_LABELS.map((label, i) => (
              <button
                key={label}
                role="tab"
                aria-selected={page === i}
                onClick={() => setPage(i)}
                className={`px-2.5 sm:px-3 py-1.5 whitespace-nowrap transition-colors cursor-pointer ${
                  page === i
                    ? "bg-[#00ff41] text-black font-bold"
                    : "text-[#3f7a4c] hover:text-[#c8ffcf] hover:bg-[#00ff41]/10"
                }`}
              >
                {i}:{label}
              </button>
            ))}
          </div>
          {/* actions */}
          <div className="flex items-center justify-between gap-2 px-2 py-1.5 border-t border-[#0d2413]">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => go(-1)}
                aria-label="Previous page"
                className="px-2 py-1 border border-[#1c3a24] text-[#c8ffcf] hover:bg-[#00ff41]/15 hover:border-[#00ff41] transition-colors cursor-pointer"
              >
                ◀ prev
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next page"
                className="px-2 py-1 border border-[#1c3a24] text-[#c8ffcf] hover:bg-[#00ff41]/15 hover:border-[#00ff41] transition-colors cursor-pointer"
              >
                next ▶
              </button>
              <span className="text-[#3f7a4c] hidden sm:inline">{page + 1}/{pages.length}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#3f7a4c] hidden sm:inline" suppressHydrationWarning>
                {now ? now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : "--:--"}
              </span>
              <button
                onClick={onAscend}
                title="Definitely a normal button. Nothing happens. Promise."
                className="flex items-center gap-1.5 px-2.5 py-1 border border-[#00ff41]/70 bg-[#00ff41]/10 text-[#00ff41] font-bold hover:bg-[#00ff41] hover:text-black hover:shadow-[0_0_18px_rgba(0,255,65,0.5)] transition-all cursor-pointer boot-blink"
              >
                <Zap size={11} strokeWidth={2.5} aria-hidden="true" />
                sudo ./ascend.sh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* screen-edge page hint (mobile) */}
      <AnimatePresence>
        {cmdDone && revealed >= blocks.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] text-[#3f7a4c] sm:hidden pointer-events-none"
          >
            tap prev/next or swipe the tabs
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

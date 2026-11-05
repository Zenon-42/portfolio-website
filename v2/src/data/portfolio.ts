/**
 * ─────────────────────────────────────────────────────────────
 *  PORTFOLIO DATA — edit this single file to make it yours.
 *  Everything shown in terminal mode AND cinematic mode
 *  is generated from the object below.
 * ─────────────────────────────────────────────────────────────
 */

export const persona = {
  name: "Surojit Barik",
  handle: "zenon",
  host: "devbox",
  role: "Full-Stack Developer × AI Enthusiast",
  tagline: "I build products where AI meets thoughtful engineering.",
  location: "Visakhapatnam, IN",
  email: "surojitbarik097@gmail.com",
  github: "https://github.com/Zenon-42",
  linkedin: "https://linkedin.com/in/surojitbarik",
  resumeNote: "# placeholder identity — swap every field in src/data/portfolio.ts",
};

export const about = {
  paragraphs: [
    "CS undergrad who spends an unreasonable amount of time in the terminal. I like shipping things end-to-end: scraping the idea off a napkin, wiring the API, styling the UI, and deploying before the coffee gets cold.",
    "Currently deep in AI agents and NLP tooling — teaching machines to be useful, not just clever. When I'm not coding, I'm hunting hackathons, contributing to open source, or ricing my Linux setup for the 47th time.",
  ],
  facts: [
    ["os", "Arch Linux (btw)"],
    ["shell", "zsh + tmux"],
    ["editor", "neovim"],
    ["uptime", "4+ years of shipping"],
    ["location", "New Delhi, IN"],
    ["status", "open to internships"],
  ] as [string, string][],
};

export type SkillGroup = { dir: string; items: string[] };

export const skills: SkillGroup[] = [
  { dir: "languages/", items: ["TypeScript", "Python", "Java", "C++", "Go", "SQL"] },
  { dir: "frontend/", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "shadcn/ui"] },
  { dir: "backend/", items: ["Node.js", "Express", "FastAPI", "PostgreSQL", "MongoDB", "Redis"] },
  { dir: "ai-ml/", items: ["PyTorch", "scikit-learn", "LangChain", "Hugging Face", "OpenAI API"] },
  { dir: "ops/", items: ["Linux", "Docker", "Git", "CI/CD", "Nginx", "Vercel"] },
];

export type Project = {
  index: string;
  rank: "S" | "A" | "B";
  name: string;
  desc: string;
  stack: string[];
  link: string;
};

export const projects: Project[] = [
  {
    index: "01",
    rank: "S",
    name: "CommandDeck",
    desc: "AI-assisted terminal workflow tool that turns plain English into safe, reviewable shell pipelines.",
    stack: ["TypeScript", "Rust", "OpenAI API"],
    link: "https://github.com/Zenon-42",
  },
  {
    index: "02",
    rank: "A",
    name: "KnowFlow",
    desc: "Spaced-repetition learning platform that auto-generates quizzes from your own notes.",
    stack: ["Next.js", "PostgreSQL", "Prisma"],
    link: "https://github.com/Zenon-42",
  },
  {
    index: "03",
    rank: "A",
    name: "ChurnGuard",
    desc: "ML microservice that predicts customer churn and ships explainable reports to the CRM.",
    stack: ["Python", "FastAPI", "scikit-learn"],
    link: "https://github.com/Zenon-42",
  },
  {
    index: "04",
    rank: "B",
    name: "InvoiceForge",
    desc: "Dead-simple invoicing for freelancers. Fill a form, get a clean PDF, get paid.",
    stack: ["React", "Node.js", "SQLite"],
    link: "https://github.com/Zenon-42",
  },
  {
    index: "05",
    rank: "B",
    name: "HinglishNLP",
    desc: "Playground that decodes Hinglish slang — sentiment, tone and intent in real time.",
    stack: ["Python", "Hugging Face", "Gradio"],
    link: "https://github.com/Zenon-42",
  },
];

export type TimelineEntry = { year: string; line: string; detail: string };

export const timeline: TimelineEntry[] = [
  {
    year: "2022",
    line: "B.Tech CSE — started",
    detail: "Enrolled at IIIT Delhi. Wrote 'hello world' in 6 languages in week one, as one does.",
  },
  {
    year: "2023",
    line: "SDE Intern — fintech startup",
    detail: "Built internal dashboards used by the ops team daily. Learned that DB indexes matter.",
  },
  {
    year: "2024",
    line: "Winner — Smart India Hackathon",
    detail: "36 hours, 4 teammates, 1 working AI proctoring prototype and zero sleep.",
  },
  {
    year: "2025",
    line: "Open-source contributor",
    detail: "Shipped PRs to NLP and dev-tool repos. Discovered the joy of reading other people's code.",
  },
  {
    year: "2026",
    line: "Product Engineering Intern — SaaS unicorn",
    detail: "Working on AI features used by thousands. Currently writing this portfolio instead of docs.",
  },
];

export const stats = [
  { label: "YEARS CODING", value: 4, suffix: "+" },
  { label: "PROJECTS SHIPPED", value: 25, suffix: "+" },
  { label: "GIT COMMITS", value: 1200, suffix: "+" },
  { label: "HACKATHONS", value: 7, suffix: "" },
];

export const marqueeItems = [
  "OPEN TO WORK",
  "FULL-STACK",
  "AI ENGINEERING",
  "LINUX",
  "OPEN SOURCE",
  "TYPESCRIPT",
  "PYTHON",
  "HACKATHONS",
];

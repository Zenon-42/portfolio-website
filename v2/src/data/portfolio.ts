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
};

export const about = {
  paragraphs: [
    "Computer Science graduate with a strong interest in software engineering and building practical applications. I enjoy solving problems through code, understanding how systems work behind the scenes, and turning ideas into working software.",

    "My interests lie in backend development, full-stack engineering, and AI/ML. I work with Java, Python, JavaScript, and C++, and enjoy exploring APIs, databases, web technologies, and intelligent applications through hands-on projects."
  ],
  facts: [
    ["education", "B.Tech — Computer Science"],
    ["languages", "Java, Python, JavaScript, C++"],
    ["focus", "Backend & Full-Stack Development"],
    ["interests", "AI/ML, Software Engineering"],
    ["os", "Windows, Linux"],
    ["status", "Exploring opportunities"],
  ] as [string, string][],
};

export type SkillGroup = { dir: string; items: string[] };

export const skills: SkillGroup[] = [
  { dir: "languages/", items: ["Java", "Python", "JavaScript", "TypeScript", "C++", "SQL"] },
  { dir: "frontend/", items: ["React", "Next.js", "Tailwind CSS", "HTML", "CSS"] },
  { dir: "backend/", items: ["Node.js", "Express", "REST APIs", "FastAPI", "SQLite", "PostgreSQL", "MongoDB", "Redis"] },
  { dir: "ai-ml/", items: ["PyTorch", "scikit-learn", "Hugging Face", "OpenAI API"] },
  { dir: "ops/", items: ["Linux", "Docker", "Git", "CI/CD", "Vercel"] },
  { dir: "tools/",items: ["Git", "GitHub", "Postman", "VS Code", "Linux"]},
  { dir: "areas-of-interest/",items: ["Backend Development","Full-Stack Development","Artificial Intelligence","Machine Learning","Natural Language Processing"]},
  { dir: "ai-models/",items: ["Claude","ChatGPT","DeepSeek","Gemini","z.ai"]},
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
    name: "Waste Classifier",
    desc: "An image classification system that categorizes waste into six classes using a CNN and MobileNetV2 transfer learning, with Grad-CAM for model interpretability.",
    stack: ["Python", "TensorFlow", "MobileNetV2", "Streamlit", "Grad-CAM"],
    link: "https://github.com/Zenon-42/waste-classifier",
  },
  {
    index: "02",
    rank: "S",
    name: "Invoice Field Extraction",
    desc: "A hybrid document AI pipeline that automates invoice field extraction using Claude Vision, PaddleOCR, OpenCV, and rule-based validation.",
    stack: ["Python", "Claude Vision", "PaddleOCR", "OpenCV"],
    link: "https://github.com/Zenon-42/invoice-field-extraction",
  },
  {
    index: "03",
    rank: "A",
    name: "Library Management API",
    desc: "A REST API for managing books, members, and loans, built with Express 5, Zod validation, ES modules, and JSON-based storage.",
    stack: ["JavaScript", "Node.js", "Express 5", "Zod"],
    link: "https://github.com/Zenon-42/library-management-api",
  },
  {
    index: "04",
    rank: "B",
    name: "Expense Tracker",
    desc: "A lightweight command-line expense tracker that manages and stores expense records locally using JSON.",
    stack: ["JavaScript", "Node.js", "JSON"],
    link: "https://github.com/Zenon-42/expense-tracker",
  },
  {
    index: "05",
    rank: "B",
    name: "AtmosFX",
    desc: "A software development project focused on building a practical application with an emphasis on implementation and functionality.",
    stack: ["Python"],
    link: "https://github.com/Zenon-42/AtmosFX",
  },
];

export type TimelineEntry = { year: string; line: string; detail: string };

export const timeline: TimelineEntry[] = [
  {
    year: "2022",
    line: "B.Tech CSE — started",
    detail: "Wrote 'hello world' in 6 languages in week one, as one does.",
  },
  {
    year: "2023",
    line: "Exploring Computer Science",
    detail: "Began exploring programming fundamentals, algorithms, and computer science concepts."
  },
  {
    year: "2024",
    line: "Building Backend and Frontend Applications",
    detail: "Explored UI/UX, React.js,HTTP servers, REST APIs, database integration, and backend application development."
  },
  {
    year: "2025",
    line: "Open-source contributor",
    detail: "Discovered the joy of reading other people's code.",
  },
  {
    year: "2026",
    line: "Exploring AI/ML & Full-Stack",
    detail: "Expanding my knowledge of full-stack development, artificial intelligence, machine learning, and software engineering."
  },
  {
    year: "CURRENT",
    line: "Building Real-World Projects",
    detail: "Focusing on backend engineering, API development, software architecture, testing, and exploring AI/ML."
  },
];

export const stats = [
  { label: "PROGRAMMING LANGUAGES", value: 4, suffix: "" },
  { label: "YEARS CODING", value: 4, suffix: "+" },
  { label: "FEATUREDPROJECTS", value: 9, suffix: "+" },
  { label: "DEGREE COMPLETED", value: 1, suffix: "" },
  // { label: "GIT COMMITS", value: 1200, suffix: "+" },
  // { label: "HACKATHONS", value: 7, suffix: "" },
];

export const marqueeItems = [
  "OPEN TO WORK",
  "SOFTWARE ENGINEERING",
  "BACKEND DEVELOPMENT",
  "FULL-STACK DEVELOPMENT",
  "JAVA",
  "PYTHON",
  "JAVASCRIPT",
  "C++",
  "ARTIFICIAL INTELLIGENCE",
  "MACHINE LEARNING",
  "BUILDING PROJECTS",
];

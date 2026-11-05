import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Anton } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jet",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "ARJUN MEHTA — Full-Stack Developer & AI Enthusiast",
  description:
    "Terminal-style portfolio of Arjun Mehta. Page through it like a shell session — or hit the surprise button and watch it reboot into full cinematic mode.",
  keywords: ["portfolio", "developer", "terminal", "full-stack", "AI"],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='black'/><text y='72' x='14' font-size='64' fill='%2300ff41' font-family='monospace'>&gt;_</text></svg>",
  },
  openGraph: {
    title: "ARJUN MEHTA — Portfolio",
    description: "A terminal you can page through. With an easter egg.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050705",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${anton.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-black text-[#00ff41] overflow-x-hidden">{children}</body>
    </html>
  );
}

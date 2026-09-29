import type { Metadata } from "next";
import { JetBrains_Mono, Be_Vietnam_Pro } from "next/font/google";
// @ts-expect-error CSS imports are handled by Next.js at build time.
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin", "vietnamese"],
  variable: "--font-mono",
});

// Be Vietnam Pro: font sans hỗ trợ đầy đủ tiếng Việt
const sans = Be_Vietnam_Pro({
  subsets: ["vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Nguyễn Huy Thông — IT Support | Aspiring DevOps Engineer",
  description:
    "Portfolio của Nguyễn Huy Thông — IT Support tại J&T Express, hướng tới DevOps. Linux (LPIC-1), Networking (CCNA), Docker, n8n, automation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${mono.variable} ${sans.variable}`}>{children}</body>
    </html>
  );
}
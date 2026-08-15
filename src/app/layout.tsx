import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Terra da Arte — Museu Digital Vivo",
  description:
    "Uma experiência única por dia. Uma obra que existe por apenas 5 segundos. Nunca mais será vista. O museu digital mais imersivo já criado.",
  keywords: [
    "arte",
    "museu digital",
    "experiência efêmera",
    "IA generativa",
    "arte contemporânea",
    "Terra da Arte",
  ],
  openGraph: {
    title: "Terra da Arte",
    description: "Uma obra. 5 segundos. Nunca mais.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${sourceCodePro.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[var(--bg-deep)] text-[var(--text-primary)]">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Researcher & Systems Engineer",
  description: "Futuristic portfolio showcasing research, projects, and expertise in systems engineering.",
  keywords: ["researcher", "systems engineer", "portfolio", "technology"],
  authors: [{ name: "Your Name" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Researcher & Systems Engineer",
    description: "Immersive digital experience showcasing innovative research and projects.",
    type: "website",
  },
};

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Cursor />
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col min-h-screen"
            >
              {children}
            </motion.div>
          </AnimatePresence>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

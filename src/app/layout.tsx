import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import Cursor from "@/components/Cursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio - Researcher & Systems Engineer",
  description: "Futuristic portfolio showcasing research, projects, and expertise in systems engineering.",
  keywords: ["researcher", "systems engineer", "portfolio", "technology"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Portfolio - Researcher & Systems Engineer",
    description: "Immersive digital experience showcasing innovative research and projects.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

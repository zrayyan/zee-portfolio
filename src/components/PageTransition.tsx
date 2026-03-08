"use client";

import { ReactNode, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  // hide loader after first mount or when path changes
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
          {/* animated eagle sketch */}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="w-16 h-16 fill-primary"
            animate={{ x: [0, 20, 0], rotate: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          >
            <path d="M10,50 C20,20 40,20 50,40 C60,20 80,20 90,50 C80,60 70,55 60,60 C50,65 40,60 30,65 C20,70 15,60 10,50 Z" />
            <path d="M30,50 L40,40 L50,50 L60,40 L70,50" stroke="#fff" strokeWidth="2" fill="none" />
          </motion.svg>
        </div>
      )}
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
    </>
  );
}

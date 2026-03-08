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
            viewBox="0 0 120 80"
            className="w-16 h-16 fill-primary"
            animate={{ x: [0, 20, 0], rotate: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          >
            {/* simplified eagle silhouette */}
            <path d="M5 40 Q30 20 55 40 T105 40 Q85 25 75 30 Q65 20 55 30 Q45 20 35 30 Q25 20 15 40 Z" />
            <path d="M55 40 L55 60 L45 70 L60 70 L65 60 Z" fill="#fff" />
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

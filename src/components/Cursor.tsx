"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [ripples, setRipples] = useState<{id:number,x:number,y:number}[]>([]);
  const [reduceMotion, setReduceMotion] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // handle preference changes and hover states
  useEffect(() => {
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const interactiveElements = document.querySelectorAll("a, button, [role='button']");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefHandler = () => setReduceMotion(motionQuery.matches);
    motionQuery.addEventListener("change", prefHandler);

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      motionQuery.removeEventListener("change", prefHandler);
    };
  }, []);

  // track mouse and click ripples (respecting reduceMotion)
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleClick = (e: MouseEvent) => {
      if (reduceMotion) return;
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 500);
    };

    document.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("click", handleClick);
    };
  }, [reduceMotion]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-primary rounded-full pointer-events-none z-40"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      />
      {!reduceMotion &&
        ripples.map((r) => (
          <motion.span
            key={r.id}
            className="fixed top-0 left-0 w-8 h-8 bg-primary rounded-full pointer-events-none z-30"
            initial={{ x: r.x - 4, y: r.y - 4, scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        ))}
    </>
  );
}
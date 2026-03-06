"use client";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useState, useEffect } from "react";

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100); // Typing speed

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setCurrentIndex(0);
      setDisplayText("");
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  return <span>{displayText}<span className="animate-pulse">|</span></span>;
}

function AnimatedBackground() {
  return (
    <Canvas className="absolute left-0 md:-left-24 top-0 w-full md:w-[20%] h-full">
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      <Sphere args={[1, 100, 200]} scale={1.0}>
        <MeshDistortMaterial
          color="#4B2E2A" /* dark coffee brown */
          attach="material"
          distort={0.25}
          speed={1.2}
          roughness={0.2}
        />
      </Sphere>
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
}

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/wp-content/uploads/espresso-hero-image.jpg')"
        }}
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50" />
      <AnimatedBackground />
      <div className="relative z-10 w-full flex justify-center px-4">
        <div className="text-center max-w-md lg:max-w-lg xl:max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-6"
          >
            <h4 className="text-lg md:text-xl text-gray-300 mb-2 font-light">
              <TypewriterText text="Express yourself with a cup of Expresso" delay={500} />
            </h4>
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              <TypewriterText text="Expresso Love" delay={2500} />
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <button className="px-8 py-4 bg-primary text-white rounded-full hover:bg-primary/80 transition-colors duration-300">
              Explore My Work
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
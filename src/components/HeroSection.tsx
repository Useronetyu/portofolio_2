import { Suspense, useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeroScene from "./HeroScene";

const SUBTITLE = "Creative Frontend Developer & 3D Web Enthusiast";

const TypingText = () => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(SUBTITLE.slice(0, i));
      if (i >= SUBTITLE.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <span>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-0.5 h-5 bg-primary ml-1 align-middle"
      />
    </span>
  );
};

const HeroSection = () => {
  const scrollToWork = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden z-10">
      {/* 3D Background */}
      <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
        <HeroScene />
      </Suspense>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl sm:text-8xl lg:text-9xl font-display font-bold glow-text text-foreground mb-4"
        >
          Ilham
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-xl font-light tracking-wide"
        >
          <TypingText />
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          onClick={scrollToWork}
          className="mt-10 px-8 py-3 rounded-full bg-primary text-primary-foreground font-display font-semibold text-sm tracking-wider glow-button pointer-events-auto"
        >
          Explore My Work
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "welcome" | "done">("loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const t = setTimeout(() => setPhase("welcome"), 300);
      return () => clearTimeout(t);
    }
  }, [progress]);

  useEffect(() => {
    if (phase === "welcome") {
      const t = setTimeout(() => setPhase("done"), 2200);
      return () => clearTimeout(t);
    }
    if (phase === "done") {
      const t = setTimeout(onComplete, 600);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" ? (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <AnimatePresence mode="wait">
            {phase === "loading" && (
              <motion.div
                key="progress"
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-8"
              >
                {/* Spinning ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 rounded-full border-2 border-border border-t-primary"
                  style={{
                    boxShadow: "0 0 20px hsl(217 100% 60% / 0.3), inset 0 0 20px hsl(217 100% 60% / 0.1)",
                  }}
                />

                {/* Progress bar */}
                <div className="w-48 h-1 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    style={{
                      width: `${progress}%`,
                      boxShadow: "0 0 10px hsl(217 100% 60% / 0.6)",
                    }}
                  />
                </div>

                <p className="text-xs font-mono text-muted-foreground tracking-widest">
                  {progress}%
                </p>
              </motion.div>
            )}

            {phase === "welcome" && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="text-center px-4"
              >
                <motion.h1
                  className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold glow-text text-foreground"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  Welcome to Ilham's
                </motion.h1>
                <motion.span
                  className="block text-3xl sm:text-5xl lg:text-6xl font-display font-bold gradient-text mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  3D Portfolio
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default LoadingScreen;

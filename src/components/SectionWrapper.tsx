import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
}

const SectionWrapper = ({ id, children, className = "" }: SectionWrapperProps) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{ opacity }}
      className={`relative z-10 min-h-screen flex items-center py-20 sm:py-28 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <motion.div style={{ y }} className="max-w-6xl mx-auto w-full">
        {children}
      </motion.div>
    </motion.section>
  );
};

export default SectionWrapper;

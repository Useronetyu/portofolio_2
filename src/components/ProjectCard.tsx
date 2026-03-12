import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
}

const ProjectCard = ({ title, description, tags, image }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const handleMouse = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((yPos - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`);
  };

  const handleLeave = () => setTransform("");

  return (
    <motion.div
      ref={cardRef}
      style={{ y }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        style={{ transform }}
        className="glass rounded-2xl overflow-hidden glow-border transition-transform duration-200"
      >
        <div className="h-44 overflow-hidden bg-muted">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-5 sm:p-6">
          <h3 className="text-lg font-display font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-mono">
                {tag}
              </span>
            ))}
          </div>
          <button className="text-sm font-display font-semibold text-primary hover:text-foreground transition-colors">
            Live Demo →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

import SectionWrapper from "./SectionWrapper";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Interactive 3D Web",
    description: "An immersive 3D web experience built with Three.js and React, featuring real-time lighting and physics.",
    tags: ["Three.js", "React", "WebGL"],
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&h=400&fit=crop",
  },
  {
    title: "React UI Dashboard",
    description: "A modern analytics dashboard with real-time data visualization, dark mode, and responsive design.",
    tags: ["React", "Tailwind", "Recharts"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
  {
    title: "Web3 Concept UI",
    description: "A futuristic decentralized application interface concept with wallet integration and token management.",
    tags: ["Web3", "Ethers.js", "React"],
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&h=400&fit=crop",
  },
];

const ProjectsSection = () => (
  <SectionWrapper id="projects">
    <motion.h2
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-3xl sm:text-4xl font-display font-bold gradient-text mb-12"
    >
      Projects
    </motion.h2>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((p) => (
        <ProjectCard key={p.title} {...p} />
      ))}
    </div>
  </SectionWrapper>
);

export default ProjectsSection;

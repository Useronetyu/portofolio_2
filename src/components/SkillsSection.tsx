import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const categories = [
  {
    title: "Kerampilan front-end",
    skills: ["React", "Vite", "Tailwind CSS", "Three.js"],
  },
  {
    title: "Sedang Mengeksplorasi",
    skills: ["Python", "Node.js", "Web3 / dApps"],
  },
];

const SkillsSection = () => (
  <SectionWrapper id="skills">
    <motion.h2
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-3xl sm:text-4xl font-display font-bold gradient-text mb-12"
    >
      Keterampilan & Perjalanan
    </motion.h2>

    <div className="grid md:grid-cols-2 gap-6">
      {categories.map((cat, ci) => (
        <motion.div
          key={cat.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: ci * 0.15 }}
          className="glass rounded-2xl p-6 sm:p-8 glow-border"
        >
          <h3 className="text-lg font-display font-semibold text-foreground mb-5">
            {cat.title}
          </h3>
          <div className="flex flex-wrap gap-3">
            {cat.skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full text-sm font-medium bg-muted text-foreground border border-border hover:border-primary/50 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);

export default SkillsSection;

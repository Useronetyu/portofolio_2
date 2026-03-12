import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const items = [
  {
    title: "Universitas Putra Bangsa",
    subtitle: "Mahasiswa Semester 6",
    description: "Mempelajari ilmu komputer dengan fokus pada pengembangan front-end, teknologi web 3D dan web 3",
    period: "2023 — Sekarang",
  },
  {
    title: "Web Development Fundamentals",
    subtitle: "Self-taught Journey",
    description: "Explore HTML, JavaScript, and CSS through practical tutorial projects.",
    period: "2023 — 2024",
  },
  {
    title: "React & UI/UX",
    subtitle: "Creative Exploration",
    description: "Stepping into modern frontend development using the React ecosystem to build interactive user interfaces, while exploring creative design concepts.",
    period: "2024 — 2025"
  },
  {
    title: "3D Web & Web3 Exploration",
    subtitle: "Advanced Frontend Journey",
    description: "Expanding my React skills by integrating external APIs, while simultaneously diving into immersive 3D web experiences and the fundamentals of Web3 and cryptocurrency.",
    period: "2025 — Present"
  }
];

const TimelineSection = () => (
  <SectionWrapper id="timeline">
    <motion.h2
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-3xl sm:text-4xl font-display font-bold gradient-text mb-12"
    >
      
    </motion.h2>

    <div className="relative">
      {/* Timeline line - animated */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 timeline-line origin-top"
      />

      <div className="space-y-12">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="relative pl-12 sm:pl-20"
          >
            {/* Dot - animated */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 + 0.2, type: "spring", stiffness: 300 }}
              className="absolute left-2.5 sm:left-6.5 top-1.5 w-3 h-3 rounded-full timeline-dot"
            />

            <div className="glass rounded-xl p-5 sm:p-6 glow-border">
              <span className="text-xs font-mono text-primary mb-1 block">{item.period}</span>
              <h3 className="text-lg font-display font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-primary/80 font-medium mb-2">{item.subtitle}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </SectionWrapper>
);

export default TimelineSection;

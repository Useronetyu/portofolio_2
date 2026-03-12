import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const AboutSection = () => (
  <SectionWrapper id="about">
    <motion.h2
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-3xl sm:text-4xl font-display font-bold gradient-text mb-8"
    >
      tentang saya
    </motion.h2>
    <div className="glass rounded-2xl p-6 sm:p-10 glow-border">
      <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
        Hai, saya <span className="text-foreground font-semibold">Mochamad Ilham Hansyil Alfauzi</span>. 
        Saat ini saya adalah mahasiswa semester 6 di Universitas Putra Bangsa. Saya memiliki minat yang kuat dalam
        pengembangan frontend, dan menciptakan pengalaman web 3D yang imersif. serta saya juga sedang tertarik dengan Web 3 akhir ini, Saya senang mengubah
        ide-ide kreatif menjadi realitas digital interaktif. Meskipun saya terus mengeksplorasi teknologi baru,
        fokus utama saya saat ini adalah membangun antarmuka yang indah dan berpusat pada pengguna menggunakan React dan Three.js.
      </p>
    </div>
  </SectionWrapper>
);

export default AboutSection;

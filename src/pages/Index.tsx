import { useState, useCallback, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TimelineSection from "@/components/TimelineSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import LoadingScreen from "@/components/LoadingScreen";
import ParticleBackground from "@/components/ParticleBackground";
import CustomCursor from "@/components/CustomCursor";
import ChatbotWidget from "@/components/ChatbotWidget";

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      <CustomCursor />
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}
      <div
        className={`relative transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      >
        <Suspense fallback={null}>
          <ParticleBackground />
        </Suspense>
        <Navbar />
        <main>
          <section className="snap-section"><HeroSection /></section>
          <section className="snap-section"><AboutSection /></section>
          <section className="snap-section"><TimelineSection /></section>
          <section className="snap-section"><SkillsSection /></section>
          <section className="snap-section"><ProjectsSection /></section>
          <section className="snap-section"><ContactSection /></section>
        </main>
        <footer className="relative z-10 py-8 text-center text-sm text-muted-foreground border-t border-border">
          <p>© 2024 Ilham. Built with React & Three.js</p>
        </footer>
        <ChatbotWidget />
      </div>
    </>
  );
};

export default Index;

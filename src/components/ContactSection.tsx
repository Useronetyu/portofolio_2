import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

const ContactSection = () => (
  <SectionWrapper id="contact">
    <motion.h2
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-3xl sm:text-4xl font-display font-bold gradient-text mb-12"
    >
      Hubungi Kami
    </motion.h2>

    <div className="glass rounded-2xl p-6 sm:p-10 glow-border max-w-2xl mx-auto">
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Message sent! (Demo only)");
        }}
      >
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">Name</label>
          <input
            type="text"
            required
            className="w-full rounded-lg bg-muted border border-border px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">Email</label>
          <input
            type="email"
            required
            className="w-full rounded-lg bg-muted border border-border px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
            placeholder="you@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">Message</label>
          <textarea
            rows={4}
            required
            className="w-full rounded-lg bg-muted border border-border px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition resize-none"
            placeholder="Your message..."
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm glow-button"
        >
          Send Message
        </button>
      </form>

      <div className="flex items-center justify-center gap-6 mt-8">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200"
        >
          <Github size={24} />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200"
        >
          <Linkedin size={24} />
        </a>
      </div>
    </div>
  </SectionWrapper>
);

export default ContactSection;

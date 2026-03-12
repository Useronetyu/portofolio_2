import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  role: "user" | "bot";
  content: string;
}

const KNOWLEDGE: Record<string, string> = {
  keahlian: "Keahlian utama Ilham meliputi React, Vite, Tailwind CSS, Three.js, dan Blender. Dia juga sedang mempelajari Python, Machine Learning, Node.js, dan Web3/dApps.",
  proyek: "Ilham telah membangun pengalaman Web 3D Interaktif dengan Three.js & WebGL, Dasbor UI React modern dengan Recharts, dan UI Konsep Web3 dengan integrasi dompet.",
  pendidikan: "Ilham saat ini adalah mahasiswa semester 6 di Universitas Putra Bangsa, mengambil jurusan ilmu komputer dengan fokus pada pengembangan frontend.",
  pengalaman: "Ilham adalah pengembang frontend otodidak yang telah mendalami React, Three.js, dan pengembangan web modern sejak 2022, dengan fokus pada eksplorasi kreatif 3D dan UI/UX sejak 2024.",
  hubungi: "Anda dapat menghubungi Ilham melalui formulir kontak di situs web ini, atau melalui profil GitHub dan LinkedIn-nya yang tertaut di bagian bawah.",
  machine: "Saat ini Ilham sedang mengeksplorasi konsep Pembelajaran Mesin menggunakan Python dan TensorFlow, dengan fokus pada pengintegrasian AI ke dalam aplikasi web.",
  lepas: "Ya! Ilham menerima pekerjaan lepas dan kolaborasi. Silakan hubungi melalui formulir kontak atau tautan media sosialnya.",
  pelajari: "Saat ini Ilham sedang mempelajari teknik Three.js tingkat lanjut, Machine Learning dengan Python, pengembangan Web3/dApp, dan teknologi backend seperti Node.js.",
  siapa: "Ilham (Mochamad Ilham Hansyil Alfauzi) adalah seorang pengembang frontend kreatif dan penggemar web 3D. Dia adalah mahasiswa CS semester 6 yang bersemangat membangun pengalaman digital yang imersif.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();

  // 1. Cek otomatis dari daftar KNOWLEDGE di atas
  for (const [key, value] of Object.entries(KNOWLEDGE)) {
    if (lower.includes(key)) return value;
  }

  // 2. Deteksi sapaan
  if (lower.includes("halo") || lower.includes("hi") || lower.includes("hai") || lower.includes("hey")) {
    return "Hai! 👋 Saya asisten AI Ilham. Tanyakan kepada saya tentang keahlian, proyek, pendidikan, atau pengalamannya!";
  }

  // 3. Deteksi istilah teknis bahasa Inggris yang sering dipakai
  if (lower.includes("react") || lower.includes("three") || lower.includes("frontend") || lower.includes("skill")) {
    return KNOWLEDGE.keahlian;
  }

  // 4. Jawaban default jika bot tidak tahu
  return "Saya bisa menceritakan tentang keahlian, proyek, pendidikan, atau pengalaman Ilham. Apa yang ingin Anda ketahui?";
}

const QUICK_QUESTIONS = [
  "Siapakah Ilham?",
  "Apa saja keahlian inti Anda?",
  "Ceritakan tentang proyek web 3D Anda.",
  "Bagaimana pengalaman Anda?",
  "Apakah Anda bekerja dengan React & Three.js?",
  "Apa latar belakang pendidikan Anda?",
  "Bisakah saya melihat konsep Machine Learning Anda?",
  "Apakah Anda terbuka untuk pekerjaan lepas?",
  "Bagaimana saya bisa menghubungi Anda?",
  "Apa yang sedang kamu pelajari saat ini?",
];

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hai! 👋 Saya asisten portofolio Ilham. Tanyakan apa saja tentang keahlian, proyek, atau pengalamannya!" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", content: getResponse(text) }]);
    }, 500);
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center glow-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[28rem] glass rounded-2xl glow-border flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-display font-semibold text-foreground">Asisten Ilham</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Quick chips */}
            <div className="px-3 pt-2 pb-1 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="flex-shrink-0 px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap border border-border"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask about Ilham..."
                className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
              <button onClick={send} className="text-primary hover:text-foreground transition-colors p-2">
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;

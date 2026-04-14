"use client";

import { useEffect, useRef, useState } from "react";
import {
  FolderOpen,
  Award,
  Code2,
  Bot,
  Brain,
  Sparkles,
  MessageSquare,
  BarChart2,
  Container,
  Languages,
  Mail,
  MapPin,
  Briefcase,
  MessageCircle,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import emailjs from "@emailjs/browser";

/* ── Data Sertifikat ─────────────────────────────────────── */
type Cert = {
  title: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
};
type CertCategory = {
  id: string;
  label: string;
  iconComponent: React.ReactNode;
  certs: Cert[];
};

const CERT_CATEGORIES: CertCategory[] = [
  {
    id: "python",
    label: "Python",
    iconComponent: <Code2 size={36} color="var(--accent)" />,
    certs: [
      {
        title: "Python Dasar",
        issuer: "Skilvul",
        year: "2024",
        credentialUrl:
          "https://skilvul.com/courses/python-dasar/student/cm0i4ax6z005201ojlqvf2rdj/",
      },
      {
        title: "Memulai Pemograman dengan Python",
        issuer: "Dicoding Indonesia",
        year: "2024",
        credentialUrl: "https://www.dicoding.com/certificates/98XW5L7O9PM3",
      },
      {
        title: "Python Fundamental for Data Science",
        issuer: "DQLab",
        year: "2024",
        credentialUrl:
          "https://academy.dqlab.id/Certificate_check/result/DQLABINTP1OMSRPT/NONTRACK#mycertificate",
      },
      {
        title: "Introduction to Data Science with Python",
        issuer: "DQLab",
        year: "2024",
        credentialUrl:
          "https://academy.dqlab.id/Certificate_check/result/DQLABINTP1MORQOD/NONTRACK#mycertificate",
      },
    ],
  },
  {
    id: "ml",
    label: "Machine Learning",
    iconComponent: <Bot size={36} color="var(--accent)" />,
    certs: [
      {
        title: "Belajar Machine Learning untuk Pemula",
        issuer: "Dicoding Indonesia",
        year: "2024",
        credentialUrl: "https://www.dicoding.com/certificates/NVP74DQQWPR0",
      },
      {
        title: "Supervised Machine Learning: Regression and Classification",
        issuer: "DeepLearning.AI",
        year: "2025",
        credentialUrl:
          "https://www.coursera.org/account/accomplishments/certificate/21VTX1O74TTR",
      },
      {
        title: "Linear Models in Machine Learning: Fundamentals",
        issuer: "Digital Talent Scholarship",
        year: "2025",
        credentialUrl:
          "https://drive.google.com/drive/folders/1o5fAnA1dj35Et5G55FhL842jY4cjL_c8",
      },
      {
        title: "Linear Models in Machine Learning: Applications",
        issuer: "Digital Talent Scholarship",
        year: "2025",
        credentialUrl:
          "https://drive.google.com/drive/folders/1o5fAnA1dj35Et5G55FhL842jY4cjL_c8",
      },
      {
        title: "Advanced Learning Algorithms",
        issuer: "DeepLearning.AI",
        year: "2025",
        credentialUrl:
          "https://www.coursera.org/account/accomplishments/verify/BHVAF9Y07LHW",
      },
    ],
  },
  {
    id: "dl",
    label: "Deep Learning",
    iconComponent: <Brain size={36} color="var(--accent)" />,
    certs: [
      {
        title: "Fundamental Deep Learning",
        issuer: "Digital Talent Scholarship",
        year: "2025",
        credentialUrl:
          "https://drive.google.com/drive/folders/1o5fAnA1dj35Et5G55FhL842jY4cjL_c8",
      },
      {
        title: "Intermediate Deep Learning",
        issuer: "Digital Talent Scholarship",
        year: "2025",
        credentialUrl:
          "https://drive.google.com/drive/folders/1o5fAnA1dj35Et5G55FhL842jY4cjL_c8",
      },
      {
        title: "Mastery Deep Learning",
        issuer: "Digital Talent Scholarship",
        year: "2025",
        credentialUrl:
          "https://drive.google.com/drive/folders/1o5fAnA1dj35Et5G55FhL842jY4cjL_c8",
      },
    ],
  },
  {
    id: "ai",
    label: "Artificial Intelligence",
    iconComponent: <Sparkles size={36} color="var(--accent)" />,
    certs: [
      {
        title: "Belajar Dasar AI",
        issuer: "Dicoding Indonesia",
        year: "2025",
        credentialUrl: "https://www.dicoding.com/certificates/GRX5460LYP0M",
      },
      {
        title: "Deep Learning Python Project: CNN based Image Classification",
        issuer: "Udemy",
        year: "2025",
        credentialUrl:
          "https://www.udemy.com/certificate/UC-a8d68fd0-808a-4bf3-8a52-2d2183f81126/",
      },
    ],
  },
  {
    id: "prompt",
    label: "Prompt Engineering",
    iconComponent: <MessageSquare size={36} color="var(--accent)" />,
    certs: [
      {
        title: "AI Praktis untuk Produktivitas",
        issuer: "Dicoding Indonesia",
        year: "2025",
        credentialUrl: "https://www.dicoding.com/certificates/L4PQE0252PO1",
      },
      {
        title: "Belajar Penggunaan Generative AI",
        issuer: "Dicoding Indonesia",
        year: "2025",
        credentialUrl: "https://www.dicoding.com/certificates/GRX537L8YZ0M",
      },
    ],
  },
  {
    id: "dataviz",
    label: "Data Visualization",
    iconComponent: <BarChart2 size={36} color="var(--accent)" />,
    certs: [
      {
        title: "Belajar Dasar Visualisasi Data",
        issuer: "Dicoding Indonesia",
        year: "2024",
        credentialUrl: "https://www.dicoding.com/certificates/QLZ9V2E02X5D",
      },
    ],
  },
  {
    id: "docker",
    label: "Docker",
    iconComponent: <Container size={36} color="var(--accent)" />,
    certs: [
      {
        title: "Docker Fundamental",
        issuer: "Adinusa",
        year: "2025",
        credentialUrl:
          "https://adinusa.id/course/publisher/show/634c8158-d730-4a2c-9eba-d5c9510e0d44",
      },
    ],
  },
  {
    id: "english",
    label: "English",
    iconComponent: <Languages size={36} color="var(--accent)" />,
    certs: [
      {
        title: "ECCT",
        issuer: "Telkom University Language Center",
        year: "2026",
        credentialUrl:
          "https://drive.google.com/drive/u/0/folders/1-zFnkVpC44nnZ4dmEXuWwIbPpHxcQRTk",
      },
    ],
  },
];

/* ── Planet data ── */
const PLANETS = [
  { name: "PyTorch", src: "pytorch/pytorch-original", r: 70, angle: 270 },
  {
    name: "TensorFlow",
    src: "tensorflow/tensorflow-original",
    r: 70,
    angle: 90,
  },
  {
    name: "Scikit",
    src: "scikitlearn/scikitlearn-original",
    r: 120,
    angle: 270,
  },
  { name: "NumPy", src: "numpy/numpy-original", r: 120, angle: 0 },
  { name: "Pandas", src: "pandas/pandas-original", r: 120, angle: 90 },
  {
    name: "Matplotlib",
    src: "matplotlib/matplotlib-original",
    r: 120,
    angle: 180,
  },
  { name: "FastAPI", src: "fastapi/fastapi-original", r: 160, angle: 270 },
  { name: "Flask", src: "flask/flask-original", r: 160, angle: 30 },
  { name: "Django", src: "django/django-plain", r: 160, angle: 150 },
  { name: "Next.js", src: "nextjs/nextjs-original", r: 210, angle: 270 },
  { name: "Docker", src: "docker/docker-original", r: 210, angle: 342 },
  { name: "Supabase", src: "supabase/supabase-original", r: 210, angle: 54 },
  { name: "Flutter", src: "flutter/flutter-original", r: 210, angle: 126 },
  { name: "Git", src: "git/git-original", r: 210, angle: 198 },
].map((p) => {
  const rad = (p.angle * Math.PI) / 180;
  const tx = Math.round(p.r * Math.cos(rad) * 10000) / 10000;
  const ty = Math.round(p.r * Math.sin(rad) * 10000) / 10000;
  return { ...p, tx, ty };
});

const ORBIT_GROUPS = [
  { orbitClass: "orbit-1", planets: PLANETS.filter((p) => p.r === 70) },
  { orbitClass: "orbit-2", planets: PLANETS.filter((p) => p.r === 120) },
  { orbitClass: "orbit-3", planets: PLANETS.filter((p) => p.r === 160) },
  { orbitClass: "orbit-4", planets: PLANETS.filter((p) => p.r === 210) },
];

/* ── Typing animation hook ── */
function useTyping(
  words: string[],
  typedRef: React.RefObject<HTMLSpanElement>,
) {
  useEffect(() => {
    let wordIndex = 0,
      charIndex = 0,
      isDeleting = false;
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      const current = words[wordIndex];
      const el = typedRef.current;
      if (!el) return;
      if (!isDeleting) {
        el.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          isDeleting = true;
          timeout = setTimeout(tick, 1800);
          return;
        }
      } else {
        el.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }
      timeout = setTimeout(tick, isDeleting ? 60 : 100);
    };
    timeout = setTimeout(tick, 600);
    return () => clearTimeout(timeout);
  }, []); // eslint-disable-line
}

/* ── Scroll-reveal hook ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

type Message = { role: "user" | "assistant"; content: string };

/* ════════════════════════════════════════════════════════════ */
export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setSending(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string,
        },
      );
      setSent(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    } catch {
      alert("Gagal mengirim, silakan coba lagi.");
    } finally {
      setSending(false);
    }
  };
  const typedRef = useRef<HTMLSpanElement>(null!);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [portfolioTab, setPortfolioTab] = useState<"projects" | "certificates">(
    "projects",
  );
  const [activeCertCat, setActiveCertCat] = useState<CertCategory | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! Saya Jerry, asisten AI Sulthon. Ada yang ingin kamu tanyakan tentang proyek atau skill-nya?",
    },
  ]);

  useTyping(["Ahmad Sulthon Jauhari"], typedRef);
  useReveal();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!chatInput.trim() || isLoading) return;
    const userMsg: Message = { role: "user", content: chatInput };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setChatInput("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Maaf, terjadi kesalahan." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const contactItems = [
    {
      icon: <Mail size={18} color="var(--accent)" />,
      text: "sulthonjauhari1954@gmail.com",
      href: "https://mail.google.com/mail/?view=cm&to=sulthonjauhari1954@gmail.com",
    },
    {
      icon: <MapPin size={18} color="var(--accent)" />,
      text: "Bandung, Indonesia",
      href: null,
    },
    {
      icon: <Briefcase size={18} color="var(--accent)" />,
      text: "Open to work",
      href: null,
    },
    {
      icon: <MessageCircle size={18} color="var(--accent)" />,
      text: "Chat via WhatsApp",
      href: "https://wa.me/628985702531",
    }, // ← ganti nomor WA kamu
  ];

  return (
    <main>
      {/* ── HOME ── */}
      <section id="home" className="home">
        <div className="home-content">
          <h3>
            Hello, <span>I am</span>
          </h3>
          <h1>
            <span ref={typedRef} className="typed-text" />
            <span className="cursor" />
          </h1>
          <h2>AI &amp; Machine Learning Enthusiast</h2>
          <p>
            I build AI systems, machine learning models, and modern web
            applications. Passionate about artificial intelligence and solving
            real-world problems with elegant solutions.
          </p>
          <div className="btn-box">
            <a href="/CV.pdf" className="btn-primary">
              Download CV
            </a>
            <a href="#contact" className="btn-secondary">
              Contact Me
            </a>
          </div>
          <div className="social-icons">
            <a href="https://github.com/Ahjaris" aria-label="GitHub">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/ahmad-sulthon-jauhari/"
              aria-label="LinkedIn"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/sulthonjauhari/"
              aria-label="Instagram"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="home-image">
          <div className="ring" />
          <div className="img-wrapper">
            <img src="/foto.jpg" alt="Ahmad Sulthon Jauhari" />
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section">
        <div className="about-wrapper reveal">
          <div className="about-grid">
            <div>
              <h2 className="section-title">
                About <span>Me</span>
              </h2>
              <div className="section-line" />
            </div>
            <div className="about-text">
              <p>
                I am a{" "}
                <strong style={{ color: "var(--accent)" }}>
                  Telecommunications Engineering
                </strong>{" "}
                student with a deep passion for Artificial Intelligence, Machine
                Learning, and Software Development. I love turning complex
                problems into elegant solutions.
              </p>
              <p>
                Beyond technical work, I am a disciplined and persistent person
                with a visionary mindset — always eager to grow and explore new
                things. I believe that continuous learning is the foundation of
                meaningful innovation.
              </p>
              <div className="btn-box" style={{ marginTop: "28px" }}>
                <a href="#contact" className="btn-primary">
                  Hire Me
                </a>
              </div>
            </div>
          </div>

          <div className="toolkit-box">
            <div className="toolkit-label">Tech Stack</div>
            <div className="toolkit-field">
              <div className="solar-sun">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
                  alt="Python"
                />
                <span>Python</span>
                <div className="sun-glow" />
              </div>
              {ORBIT_GROUPS.map(({ orbitClass, planets }) => (
                <div key={orbitClass} className={`solar-orbit ${orbitClass}`}>
                  <div className="orbit-ring" />
                  {planets.map(({ name, src, tx, ty }) => (
                    <div
                      key={name}
                      className="solar-planet"
                      style={{
                        top: `calc(50% + ${ty}px - 24px)`,
                        left: `calc(50% + ${tx}px - 24px)`,
                      }}
                    >
                      <div className="planet-icon">
                        <img
                          src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${src}.svg`}
                          alt={name}
                        />
                      </div>
                      <span>{name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="section">
        <div className="reveal">
          <h2 className="section-title">
            My <span>Services</span>
          </h2>
          <div className="section-line" />
        </div>
        <div className="services-grid">
          {[
            {
              icon: (
                <img
                  src="/computer_vision.jpg"
                  alt="Computer Vision"
                  className="service-img-icon"
                />
              ),
              title: "Computer Vision",
              desc: "Building image classification and object detection systems using CNN architectures and YOLO with PyTorch & TensorFlow.",
            },
            {
              icon: (
                <img
                  src="/ml.jpg"
                  alt="Machine Learning"
                  className="service-img-icon"
                />
              ),
              title: "Machine Learning",
              desc: "Developing end-to-end ML pipelines — from data preprocessing and feature engineering to model training, evaluation, and optimization.",
            },
            {
              icon: (
                <img
                  src="/bar.jpg"
                  alt="Data Analysis"
                  className="service-img-icon"
                />
              ),
              title: "Data Analysis",
              desc: "Performing exploratory data analysis and visualization using Pandas, NumPy, Matplotlib, and Seaborn to extract insights and improve model performance.",
            },
          ].map((s) => (
            <div className="service-card reveal" key={s.title}>
              <div className="service-icon-wrapper">{s.icon}</div>
              <div className="service-body">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" className="section">
        <div className="reveal">
          <h2 className="section-title">
            My <span>Portfolio</span>
          </h2>
          <div className="section-line" />
          <div className="portfolio-tabs">
            <button
              className={`tab-btn ${portfolioTab === "projects" ? "active" : ""}`}
              onClick={() => setPortfolioTab("projects")}
            >
              <FolderOpen size={15} /> Projects
            </button>
            <button
              className={`tab-btn ${portfolioTab === "certificates" ? "active" : ""}`}
              onClick={() => setPortfolioTab("certificates")}
            >
              <Award size={15} /> Certificates
            </button>
          </div>
        </div>

        {portfolioTab === "projects" && (
          <div className="portfolio-grid">
            {[
              {
                img: "/heart.jpg",
                title: "Heart Disease Prediction",
                desc: "End-to-end ML pipeline — EDA, group-based imputation, multi-model comparison (LR, RF, XGBoost, SVM), GridSearchCV tuning, and TinyLlama LLM-based lifestyle recommendation.",
                tags: ["Python", "Scikit-learn", "TinyLlama"],
                githubUrl:
                  "https://github.com/Ahjaris/Prediksi-Penyakit-Jantung",
              },
              {
                img: "/word.jpg",
                title: "TikTok Sentiment Analysis",
                desc: "Sentiment analysis of 3,000 TikTok comments on Dedi Mulyadi's policies using full Indonesian NLP pipeline — lexicon-based labeling and SVM + TF-IDF classification with 79.18% accuracy.",
                tags: ["Python", "SVM", "Sastrawi", "NLTK"],
                githubUrl:
                  "https://github.com/Ahjaris/Analisis-Sentimen-Komentar-Tiktok-Dedi-Mulaydi",
              },
              {
                img: "/hewan.jpg",
                title: "Wildlife Animal Detection",
                desc: "Detection of 14 Javanese wildlife species at Gunung Masigit Kareumbi using YOLOv11X (mAP50: 99.3%) trained on 6,119 camera trap images, deployed as a web app with FastAPI and Docker.",
                tags: ["Python", "YOLOv11X", "FastAPI", "Docker"],
                githubUrl: "https://github.com/Ahjaris/Animal-Detection-System",
              },
              {
                img: "/mobapp.jpg",
                title: "MyIMV — Lab Management App",
                desc: "Internship project at Lab IMV. Flutter & Supabase mobile app with OTP email verification (Brevo SMTP), role-based access (admin/user), attendance, project tracking, and discussion forum.",
                tags: ["Flutter", "Supabase", "Brevo SMTP"],
                githubUrl: "https://github.com/stevanniep/LALogin",
              },
              {
                img: "/buko.jpg",
                title: "KoBoPan — Buko Pandan Landing Page",
                desc: "Responsive landing page for Buko Pandan beverage brand built for Entrepreneurship course. Features product catalog with ingredient details, customer testimonials, Google Form order system, and social media contact.",
                tags: ["Next.js", "Tailwind CSS", "Vercel"],
                githubUrl: "https://github.com/Ahjaris/Buko-Pandan",
              },
            ].map((p) => (
              <div className="project-card" key={p.title}>
                <div className="project-img">
                  <img
                    src={p.img}
                    alt={p.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="project-info">
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "16px",
                    }}
                  >
                    <div className="project-tags">
                      {p.tags.map((t) => (
                        <span className="tag" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-link"
                    >
                      GitHub ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {portfolioTab === "certificates" && (
          <div className="cert-grid">
            {CERT_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="cert-category-card"
                onClick={() => setActiveCertCat(cat)}
              >
                <div className="cert-cat-icon">{cat.iconComponent}</div>
                <h3>{cat.label}</h3>
                <p>
                  {cat.certs.length} certificate
                  {cat.certs.length > 1 ? "s" : ""}
                </p>
                <div className="cert-cat-arrow">→</div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── CERTIFICATE MODAL ── */}
      {activeCertCat && (
        <div className="modal-overlay" onClick={() => setActiveCertCat(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setActiveCertCat(null)}
            >
              ✕
            </button>
            <div className="modal-header">
              <div className="modal-header-icon">
                {activeCertCat.iconComponent}
              </div>
              <h2>
                {activeCertCat.label} <span>Certificates</span>
              </h2>
            </div>
            <div className="modal-cert-list">
              {activeCertCat.certs.map((cert) => (
                <div className="modal-cert-item" key={cert.title}>
                  <div className="cert-info">
                    <h4>{cert.title}</h4>
                    <p>
                      {cert.issuer} · {cert.year}
                    </p>
                  </div>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-link"
                    >
                      View ↗
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── CONTACT ── */}
      <section id="contact" className="section">
        <div className="reveal">
          <h2 className="section-title">
            Contact <span>Me</span>
          </h2>
          <div className="section-line" />
        </div>
        <div className="contact-wrapper reveal">
          <div className="contact-info">
            <p>
              Looking for an intern, collaborator, or just want to say hi? Feel
              free to reach out — I&apos;m always open to new opportunities,
              interesting projects, and meaningful conversations.
            </p>
            {contactItems.map((item) => (
              <div className="contact-item" key={item.text}>
                <div className="icon">{item.icon}</div>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    {item.text}
                  </a>
                ) : (
                  <span>{item.text}</span>
                )}
              </div>
            ))}
          </div>
          <div className="contact-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>
            <button
              className="btn-submit"
              onClick={handleSubmit}
              disabled={sending || sent}
            >
              {sending
                ? "Sending..."
                : sent
                  ? "Message Sent ✓"
                  : "Send Message →"}
            </button>
          </div>
        </div>
      </section>

      {/* ── CHATBOT ── */}
      <div className="chatbot-wrapper">
        {chatOpen && (
          <div className="chatbot-window">
            <div className="chatbot-header">
              <div className="chatbot-header-info">
                <div className="chatbot-avatar">
                  <img
                    src="/foto.jpg"
                    alt="Sulthon"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      objectPosition: "90% 20%",
                    }}
                  />
                </div>
                <div>
                  <p className="chatbot-name">Jerry</p>
                  <p className="chatbot-status">
                    ● Sulthon&apos;s AI Assistant
                  </p>
                </div>
              </div>
              <button
                className="chatbot-close"
                onClick={() => setChatOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="chatbot-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`chat-bubble ${msg.role}`}>
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ))}
              {isLoading && (
                <div className="chat-bubble assistant">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="chatbot-input-area">
              <input
                type="text"
                placeholder="Tanya sesuatu..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="chatbot-input"
              />
              <button
                onClick={sendMessage}
                className="chatbot-send"
                disabled={isLoading}
              >
                ➤
              </button>
            </div>
          </div>
        )}
        <button
          className="chatbot-toggle"
          onClick={() => setChatOpen(!chatOpen)}
        >
          {chatOpen ? "✕" : <MessageCircle size={24} color="var(--bg)" />}
        </button>
      </div>
    </main>
  );
}

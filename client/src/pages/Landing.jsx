import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight, Star, Telescope, Users, Heart, Compass, ChevronDown } from "lucide-react";
import useStore from "../hooks/useStore";
import "./Landing.css";

/* ─── Animated counter ─── */
function Counter({ target, suffix = "", duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: duration * 1000, bounce: 0 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, target, motionVal]);

  useEffect(() => {
    const unsub = spring.on("change", (v) =>
      setDisplay(Math.round(v).toLocaleString())
    );
    return unsub;
  }, [spring]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ─── Text reveal line by line ─── */
function RevealText({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className={`reveal-wrap ${className}`}>
      <motion.div
        initial={{ y: "110%" }}
        animate={inView ? { y: "0%" } : {}}
        transition={{
          duration: 1.2,
          ease: [0.19, 1, 0.22, 1],
          delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── Magnetic button ─── */
function MagneticButton({ children, className = "", ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.15);
    y.set((e.clientY - cy) * 0.15);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy, display: "inline-block" }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
    >
      <div className={className} {...props}>
        {children}
      </div>
    </motion.div>
  );
}

/* ─── Feature card ─── */
function FeatureCard({ icon: Icon, title, description, index, color }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="feature-card"
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1,
        ease: [0.19, 1, 0.22, 1],
        delay: index * 0.12,
      }}
    >
      <div className="feature-card-number mono">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="feature-card-icon" style={{ color }}>
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <h3 className="feature-card-title">{title}</h3>
      <p className="feature-card-desc body-md text-secondary">{description}</p>
    </motion.div>
  );
}

/* ─── MAIN LANDING ─── */
export default function Landing() {
  const isAuthenticated = useStore((s) => s.isAuthenticated);

  /* Parallax refs */
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 0.6], [1, 0.95]);

  /* Pinned word section */
  const wordRef = useRef(null);
  const { scrollYProgress: wordProgress } = useScroll({
    target: wordRef,
    offset: ["start end", "end start"],
  });
  const wordIndex = useTransform(wordProgress, [0.2, 0.4, 0.55, 0.7], [0, 1, 2, 3]);
  const [currentWord, setCurrentWord] = useState(0);
  useEffect(() => {
    const unsub = wordIndex.on("change", (v) => setCurrentWord(Math.floor(v)));
    return unsub;
  }, [wordIndex]);
  const words = ["Discover.", "Connect.", "Stargaze.", "Orbit."];

  /* Stats section */
  const stats = [
    { value: 182, suffix: "", label: "Cataloged Stars" },
    { value: 30, suffix: "", label: "Constellations" },
    { value: 360, suffix: "°", label: "Sky Coverage" },
    { value: 100, suffix: "%", label: "Real Positions" },
  ];

  const features = [
    {
      icon: Telescope,
      title: "Interactive 3D Sky",
      description:
        "A real-time WebGL celestial sphere with accurate star positions, twinkling effects, and smooth orbital controls.",
      color: "var(--accent-purple)",
    },
    {
      icon: Compass,
      title: "Constellation Atlas",
      description:
        "Trace 30 constellations with their mythological stories, best viewing times, and hemisphere visibility.",
      color: "var(--accent-cyan)",
    },
    {
      icon: Heart,
      title: "Personal Collection",
      description:
        "Favorite celestial objects, log observations with notes, and build your own stargazing journal over time.",
      color: "var(--accent-pink)",
    },
    {
      icon: Users,
      title: "Live Presence",
      description:
        "Real-time Socket.io connection shows what your friends are viewing right now, anywhere in the world.",
      color: "var(--accent-green)",
    },
  ];

  return (
    <div className="landing">
      {/* ═══ HERO ═══ */}
      <section className="hero" ref={heroRef}>
        {/* Star particles */}
        <div className="hero-particles">
          {Array.from({ length: 60 }).map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
              }}
              animate={{
                opacity: [0, 0.4 + Math.random() * 0.6, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2.5 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Radial gradient glow */}
        <div className="hero-glow" />

        <motion.div
          className="hero-content"
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        >
          <motion.div
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="hero-eyebrow-dot" />
            <span className="label">Social Stargazing Platform</span>
          </motion.div>

          <div className="hero-title-wrap">
            <RevealText delay={0.4}>
              <h1 className="display-hero">The night sky,</h1>
            </RevealText>
            <RevealText delay={0.55}>
              <h1 className="display-hero hero-title-accent">reimagined.</h1>
            </RevealText>
          </div>

          <motion.p
            className="hero-subtitle body-lg text-secondary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 1.2 }}
          >
            Explore thousands of stars. Trace ancient constellations.
            <br />
            Share the cosmos with friends — all from your browser.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <MagneticButton>
              <Link
                to={isAuthenticated ? "/dashboard" : "/register"}
                className="btn btn-primary btn-xl"
              >
                {isAuthenticated ? "Go to Dashboard" : "Start Exploring"}
                <ArrowRight size={18} />
              </Link>
            </MagneticButton>
            {!isAuthenticated && (
              <Link to="/login" className="btn btn-secondary btn-lg hero-login-btn">
                Log In
              </Link>
            )}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="hero-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ SCROLL WORDS — pinned reveal ═══ */}
      <section className="words-section" ref={wordRef}>
        <div className="words-sticky">
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentWord}
              className="display-hero words-text"
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(6px)" }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            >
              {words[currentWord]}
            </motion.h2>
          </AnimatePresence>
          <div className="words-progress">
            {words.map((_, i) => (
              <div
                key={i}
                className={`words-dot ${i <= currentWord ? "active" : ""}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS — big numbers ═══ */}
      <section className="stats-section section-padding">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div key={stat.label} className="stat-item">
                <span className="stat-value display-lg">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </span>
                <span className="stat-label label">{stat.label}</span>
              </div>
            ))}
          </div>
          <div className="hr-glow" style={{ marginTop: "var(--space-3xl)" }} />
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="features-section section-padding">
        <div className="container">
          <div className="features-header">
            <RevealText>
              <span className="label" style={{ marginBottom: "var(--space-md)", display: "block" }}>
                What you get
              </span>
            </RevealText>
            <RevealText delay={0.1}>
              <h2 className="display-md">
                Everything you need to
                <br />
                <span className="text-accent">explore the night sky.</span>
              </h2>
            </RevealText>
          </div>

          <div className="features-grid">
            {features.map((f, i) => (
              <FeatureCard key={f.title} {...f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TECH STACK — editorial ═══ */}
      <section className="tech-section section-padding">
        <div className="container">
          <div className="tech-header">
            <RevealText>
              <span className="label">Built with</span>
            </RevealText>
          </div>
          <div className="tech-list dim-list">
            {[
              { name: "React", desc: "UI Framework" },
              { name: "Three.js", desc: "3D Rendering" },
              { name: "Socket.io", desc: "Real-time" },
              { name: "Express", desc: "API Server" },
              { name: "MongoDB", desc: "Database" },
              { name: "Framer Motion", desc: "Animations" },
            ].map((tech, i) => (
              <motion.div
                key={tech.name}
                className="tech-item dim-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  ease: [0.19, 1, 0.22, 1],
                  delay: i * 0.08,
                }}
              >
                <span className="tech-number mono text-tertiary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="tech-name">{tech.name}</span>
                <span className="tech-desc text-secondary">{tech.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="cta-section">
        <div className="cta-glow" />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <RevealText>
            <h2 className="display-lg" style={{ textAlign: "center" }}>
              Ready to look up?
            </h2>
          </RevealText>
          <motion.div
            className="cta-actions"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <MagneticButton>
              <Link
                to={isAuthenticated ? "/dashboard" : "/register"}
                className="btn btn-primary btn-xl"
              >
                {isAuthenticated ? "Open Sky Map" : "Create Account"}
                <ArrowRight size={18} />
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-logo">
              <Star size={16} />
              <span>Orbit</span>
            </div>
            <span className="label">CIS 1962 — Spring 2026</span>
            <span className="label">University of Pennsylvania</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

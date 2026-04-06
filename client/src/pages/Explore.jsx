import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, Star, ArrowRight, MapPin, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useStore from "../hooks/useStore";
import "./Explore.css";

function RevealText({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <div ref={ref} style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ y: "110%" }}
        animate={inView ? { y: "0%" } : {}}
        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Explore() {
  const loadStarData = useStore((s) => s.loadStarData);
  const constellations = useStore((s) => s.constellations);
  const stars = useStore((s) => s.stars);
  const setSelectedConstellation = useStore((s) => s.setSelectedConstellation);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  useEffect(() => { loadStarData(); }, [loadStarData]);

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const currentMonth = new Date().getMonth() + 1;

  const filteredConstellations =
    filter === "tonight"
      ? constellations.filter((c) => Math.abs(c.bestMonth - currentMonth) <= 1 || Math.abs(c.bestMonth - currentMonth) >= 11)
      : filter === "north"
      ? constellations.filter((c) => c.hemisphere !== "south")
      : filter === "south"
      ? constellations.filter((c) => c.hemisphere !== "north")
      : constellations;

  const brightestStars = [...stars].filter((s) => s.name).sort((a, b) => a.mag - b.mag).slice(0, 15);

  const handleConstellationClick = (c) => {
    setSelectedConstellation(c);
    navigate("/sky");
  };

  return (
    <motion.div
      className="explore-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        {/* Header */}
        <div className="explore-header">
          <RevealText>
            <span className="label">Catalog</span>
          </RevealText>
          <RevealText delay={0.1}>
            <h1 className="display-md">Explore the cosmos</h1>
          </RevealText>
        </div>

        {/* Filters */}
        <motion.div
          className="explore-filters"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Filter size={14} className="text-tertiary" />
          {[
            { value: "all", label: "All" },
            { value: "tonight", label: "Visible Tonight" },
            { value: "north", label: "Northern" },
            { value: "south", label: "Southern" },
          ].map((f) => (
            <button
              key={f.value}
              className={`filter-pill ${filter === f.value ? "active" : ""}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Constellations */}
        <section className="explore-section">
          <div className="explore-section-header">
            <h2>
              <BookOpen size={18} strokeWidth={1.5} />
              Constellations
            </h2>
            <span className="label">{filteredConstellations.length} found</span>
          </div>

          <div className="explore-grid">
            {filteredConstellations.map((c, i) => (
              <motion.button
                key={c.id}
                className="explore-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: (i % 3) * 0.08 }}
                whileHover={{ y: -4 }}
                onClick={() => handleConstellationClick(c)}
              >
                <div className="explore-card-top">
                  <span className="mono explore-card-abbr">{c.id}</span>
                  <span className="badge">{months[c.bestMonth - 1]}</span>
                </div>
                <h3 className="explore-card-name">{c.name}</h3>
                <p className="explore-card-meaning body-sm text-secondary">
                  {c.meaning}
                </p>
                <div className="explore-card-bottom">
                  <span className="explore-card-hem">
                    <MapPin size={11} /> {c.hemisphere}
                  </span>
                  <ArrowRight size={14} className="explore-card-arrow" />
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Brightest stars */}
        <section className="explore-section">
          <div className="explore-section-header">
            <h2>
              <Star size={18} strokeWidth={1.5} />
              Brightest Stars
            </h2>
          </div>

          <div className="star-table dim-list">
            <div className="star-table-header">
              <span className="star-col-name label">Star</span>
              <span className="star-col-type label">Type</span>
              <span className="star-col-mag label">Mag</span>
              <span className="star-col-dist label">Distance</span>
            </div>
            {brightestStars.map((star, i) => (
              <motion.div
                key={star.id}
                className="star-table-row dim-item"
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1], delay: i * 0.04 }}
              >
                <div className="star-col-name">
                  <div className="star-dot" style={{ background: star.color, boxShadow: `0 0 8px ${star.color}` }} />
                  <div>
                    <span className="star-name">{star.name}</span>
                    <span className="star-desg mono body-sm text-tertiary">{star.designation}</span>
                  </div>
                </div>
                <span className="star-col-type mono body-sm text-secondary">{star.spectralType}</span>
                <span className="star-col-mag mono">{star.mag.toFixed(2)}</span>
                <span className="star-col-dist mono text-secondary">{star.distance} ly</span>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, Telescope, Heart, Users, Star, BookOpen,
  MapPin, Compass, Eye, Clock,
} from "lucide-react";
import useStore from "../hooks/useStore";
import useGeolocation from "../hooks/useGeolocation";
import { api } from "../utils/api";
import "./Dashboard.css";

function RevealText({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <div ref={ref} style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ y: "110%" }}
        animate={inView ? { y: "0%" } : {}}
        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay }}
      >{children}</motion.div>
    </div>
  );
}

export default function Dashboard() {
  const { user, favorites, loadFavorites, constellations, stars, loadStarData, friends, loadFriends } = useStore();
  const { location } = useGeolocation();
  const [observations, setObservations] = useState([]);

  useEffect(() => {
    loadStarData();
    loadFavorites();
    loadFriends();
    api.getObservations().then((d) => setObservations(d.observations)).catch(() => {});
  }, [loadStarData, loadFavorites, loadFriends]);

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const currentMonth = new Date().getMonth() + 1;
  const hour = new Date().getHours();

  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  // Tonight's visible constellations
  const tonightConstellations = constellations.filter(
    (c) => Math.abs(c.bestMonth - currentMonth) <= 1 || Math.abs(c.bestMonth - currentMonth) >= 11
  ).slice(0, 6);

  // Brightest stars
  const topStars = [...stars].filter((s) => s.name).sort((a, b) => a.mag - b.mag).slice(0, 5);

  return (
    <motion.div className="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="container">
        {/* Header */}
        <div className="dash-header">
          <RevealText>
            <span className="label">{greeting}</span>
          </RevealText>
          <RevealText delay={0.1}>
            <h1 className="display-md">{user?.username}</h1>
          </RevealText>
          {location && (
            <motion.div
              className="dash-location"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <MapPin size={13} className="text-green" />
              <span className="body-sm text-secondary">{location.name}</span>
            </motion.div>
          )}
        </div>

        {/* Quick actions */}
        <motion.div
          className="dash-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <Link to="/sky" className="dash-action-card dash-action-sky">
            <div className="dash-action-icon">
              <Telescope size={22} strokeWidth={1.5} />
            </div>
            <div>
              <h3>Open Sky Map</h3>
              <p className="body-sm text-secondary">Interactive 3D stargazing</p>
            </div>
            <ArrowRight size={16} className="dash-action-arrow" />
          </Link>

          <Link to="/explore" className="dash-action-card">
            <div className="dash-action-icon" style={{ color: "var(--accent-cyan)" }}>
              <Compass size={20} strokeWidth={1.5} />
            </div>
            <div>
              <h3>Explore Catalog</h3>
              <p className="body-sm text-secondary">Stars & constellations</p>
            </div>
            <ArrowRight size={16} className="dash-action-arrow" />
          </Link>

          <Link to="/friends" className="dash-action-card">
            <div className="dash-action-icon" style={{ color: "var(--accent-green)" }}>
              <Users size={20} strokeWidth={1.5} />
            </div>
            <div>
              <h3>Friends</h3>
              <p className="body-sm text-secondary">{friends.length} connected</p>
            </div>
            <ArrowRight size={16} className="dash-action-arrow" />
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="dash-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="dash-stat">
            <Telescope size={15} strokeWidth={1.5} className="text-accent" />
            <span className="dash-stat-val">{user?.totalObservations || 0}</span>
            <span className="label">Observations</span>
          </div>
          <div className="dash-stat">
            <Heart size={15} strokeWidth={1.5} style={{ color: "var(--accent-pink)" }} />
            <span className="dash-stat-val">{favorites.length}</span>
            <span className="label">Favorites</span>
          </div>
          <div className="dash-stat">
            <Users size={15} strokeWidth={1.5} style={{ color: "var(--accent-green)" }} />
            <span className="dash-stat-val">{friends.length}</span>
            <span className="label">Friends</span>
          </div>
          <div className="dash-stat">
            <Star size={15} strokeWidth={1.5} style={{ color: "var(--accent-cyan)" }} />
            <span className="dash-stat-val">{stars.length}</span>
            <span className="label">Stars in Catalog</span>
          </div>
        </motion.div>

        <div className="dash-grid">
          {/* Tonight's sky */}
          <motion.section
            className="dash-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="dash-section-header">
              <h2>
                <Eye size={16} strokeWidth={1.5} />
                Tonight's Sky
              </h2>
              <span className="label">{months[currentMonth - 1]} {new Date().getFullYear()}</span>
            </div>

            {tonightConstellations.length > 0 ? (
              <div className="dash-tonight-grid dim-list">
                {tonightConstellations.map((c, i) => (
                  <Link
                    key={c.id}
                    to="/sky"
                    className="dash-tonight-item dim-item"
                  >
                    <BookOpen size={14} strokeWidth={1.5} className="text-accent" />
                    <div className="dash-tonight-info">
                      <span className="dash-tonight-name">{c.name}</span>
                      <span className="body-sm text-tertiary">{c.meaning}</span>
                    </div>
                    <span className="mono body-sm text-tertiary">{c.id}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="body-sm text-secondary" style={{ padding: "var(--space-lg) 0" }}>
                No constellation data loaded yet.
              </p>
            )}
          </motion.section>

          {/* Brightest stars */}
          <motion.section
            className="dash-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="dash-section-header">
              <h2>
                <Star size={16} strokeWidth={1.5} />
                Brightest Stars
              </h2>
            </div>

            <div className="dash-stars-list">
              {topStars.map((star) => (
                <div key={star.id} className="dash-star-row">
                  <div className="dash-star-dot" style={{ background: star.color, boxShadow: `0 0 6px ${star.color}` }} />
                  <span className="dash-star-name">{star.name}</span>
                  <span className="mono body-sm text-secondary">{star.mag.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Recent observations */}
        {observations.length > 0 && (
          <motion.section
            className="dash-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="dash-section-header">
              <h2>
                <Clock size={16} strokeWidth={1.5} />
                Recent Activity
              </h2>
              <Link to="/profile" className="body-sm text-accent">View all</Link>
            </div>
            <div className="dash-activity">
              {observations.slice(0, 5).map((obs) => (
                <div key={obs._id} className="dash-activity-row">
                  <div className="dash-activity-icon">
                    {obs.type === "star" ? <Star size={12} /> : <BookOpen size={12} />}
                  </div>
                  <span className="body-sm">Observed <strong>{obs.name}</strong></span>
                  <span className="mono body-sm text-tertiary" style={{ marginLeft: "auto" }}>
                    {new Date(obs.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Favorites */}
        {favorites.length > 0 && (
          <motion.section
            className="dash-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="dash-section-header">
              <h2>
                <Heart size={16} strokeWidth={1.5} />
                Your Favorites
              </h2>
              <Link to="/profile" className="body-sm text-accent">View all</Link>
            </div>
            <div className="dash-fav-chips">
              {favorites.map((f) => (
                <div key={f.targetId} className="profile-chip">
                  {f.type === "star" ? (
                    <Star size={12} style={{ color: "var(--accent-cyan)" }} />
                  ) : (
                    <BookOpen size={12} className="text-accent" />
                  )}
                  <span>{f.name}</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </motion.div>
  );
}

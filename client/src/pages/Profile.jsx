import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Telescope, Edit3, Save, Star, BookOpen, Calendar } from "lucide-react";
import useStore from "../hooks/useStore";
import { api } from "../utils/api";
import "./Profile.css";

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

export default function Profile() {
  const { user, favorites, loadFavorites } = useStore();
  const [observations, setObservations] = useState([]);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("");

  useEffect(() => {
    loadFavorites();
    api.getObservations().then((d) => setObservations(d.observations));
  }, [loadFavorites]);

  useEffect(() => { if (user) setBio(user.bio || ""); }, [user]);

  const saveBio = async () => {
    await api.updateProfile({ bio });
    setEditing(false);
  };

  if (!user) return null;

  const starFaves = favorites.filter((f) => f.type === "star");
  const constFaves = favorites.filter((f) => f.type === "constellation");

  return (
    <motion.div className="profile-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="container-narrow">
        {/* Hero */}
        <motion.div
          className="profile-hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="profile-avatar">
            {user.username[0].toUpperCase()}
          </div>

          <RevealText>
            <h1 className="display-md">{user.username}</h1>
          </RevealText>

          {editing ? (
            <div className="profile-bio-edit">
              <textarea
                className="input"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={280}
                rows={2}
                placeholder="Tell us about your stargazing..."
              />
              <div className="profile-bio-actions">
                <span className="mono text-tertiary body-sm">{bio.length}/280</span>
                <button className="btn btn-primary" style={{ padding: "6px 14px", fontSize: "0.78rem" }} onClick={saveBio}>
                  <Save size={13} /> Save
                </button>
              </div>
            </div>
          ) : (
            <div className="profile-bio-display">
              <p className="body-md text-secondary">
                {user.bio || "No bio yet."}
              </p>
              <button className="btn-ghost body-sm text-tertiary" onClick={() => setEditing(true)} style={{ background: "none", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <Edit3 size={12} /> Edit bio
              </button>
            </div>
          )}

          {/* Stats */}
          <div className="profile-stats">
            <div className="profile-stat">
              <Telescope size={15} strokeWidth={1.5} className="text-accent" />
              <span className="profile-stat-val">{user.totalObservations}</span>
              <span className="label">Observations</span>
            </div>
            <div className="profile-stat-divider" />
            <div className="profile-stat">
              <Heart size={15} strokeWidth={1.5} style={{ color: "var(--accent-pink)" }} />
              <span className="profile-stat-val">{favorites.length}</span>
              <span className="label">Favorites</span>
            </div>
            <div className="profile-stat-divider" />
            <div className="profile-stat">
              <Calendar size={15} strokeWidth={1.5} style={{ color: "var(--accent-cyan)" }} />
              <span className="profile-stat-val">
                {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </span>
              <span className="label">Joined</span>
            </div>
          </div>
        </motion.div>

        {/* Favorites */}
        <section className="profile-section">
          <div className="profile-section-header">
            <span className="label">Favorites</span>
            <span className="badge">{favorites.length}</span>
          </div>
          {favorites.length === 0 ? (
            <div className="profile-empty">
              <p className="body-sm text-secondary">Explore the sky and heart your favorites.</p>
            </div>
          ) : (
            <div className="profile-chips">
              {constFaves.map((f) => (
                <div key={f.targetId} className="profile-chip">
                  <BookOpen size={13} className="text-accent" />
                  <span>{f.name}</span>
                </div>
              ))}
              {starFaves.map((f) => (
                <div key={f.targetId} className="profile-chip">
                  <Star size={13} style={{ color: "var(--accent-cyan)" }} />
                  <span>{f.name}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Observations */}
        <section className="profile-section">
          <div className="profile-section-header">
            <span className="label">Recent observations</span>
          </div>
          {observations.length === 0 ? (
            <div className="profile-empty">
              <p className="body-sm text-secondary">No observations logged yet.</p>
            </div>
          ) : (
            <div className="obs-list">
              {observations.map((obs, i) => (
                <motion.div
                  key={obs._id}
                  className="obs-row"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                >
                  <div className="obs-icon">
                    {obs.type === "star" ? <Star size={13} /> : <BookOpen size={13} />}
                  </div>
                  <div className="obs-info">
                    <span className="obs-name">{obs.name}</span>
                    {obs.note && <span className="body-sm text-tertiary">{obs.note}</span>}
                  </div>
                  <span className="mono body-sm text-tertiary">
                    {new Date(obs.createdAt).toLocaleDateString()}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </motion.div>
  );
}

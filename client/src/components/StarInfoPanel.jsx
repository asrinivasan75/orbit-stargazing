import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, BookOpen, Telescope, Check } from "lucide-react";
import useStore from "../hooks/useStore";
import "./StarInfoPanel.css";

export default function StarInfoPanel() {
  const selectedStar = useStore((s) => s.selectedStar);
  const selectedConstellation = useStore((s) => s.selectedConstellation);
  const clearSelection = useStore((s) => s.clearSelection);
  const toggleFavorite = useStore((s) => s.toggleFavorite);
  const favorites = useStore((s) => s.favorites);
  const isAuthenticated = useStore((s) => s.isAuthenticated);
  const [toggling, setToggling] = useState(false);

  const item = selectedStar || selectedConstellation;
  const type = selectedStar ? "star" : "constellation";

  // Derive isFavorite from the favorites array subscription
  const isFav = item ? favorites.some((f) => f.targetId === item.id) : false;

  const handleToggle = async () => {
    if (toggling) return;
    setToggling(true);
    try {
      await toggleFavorite(type, item.id, item.name);
    } catch { /* ignore */ }
    setToggling(false);
  };

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="info-panel glass"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 40, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="info-header">
            <div>
              <span className="info-type-badge badge">
                {type === "star" ? (
                  <><Telescope size={12} /> Star</>
                ) : (
                  <><BookOpen size={12} /> Constellation</>
                )}
              </span>
              <h3 className="info-name">{item.name}</h3>
              {type === "star" && item.designation && (
                <p className="info-designation mono">{item.designation}</p>
              )}
              {type === "constellation" && item.meaning && (
                <p className="info-designation">{item.meaning}</p>
              )}
            </div>
            <button className="info-close" onClick={clearSelection}>
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>

          <div className="info-body">
            {type === "star" && (
              <div className="info-stats">
                <div className="info-stat">
                  <span className="info-stat-label">Magnitude</span>
                  <span className="info-stat-value mono">{item.mag}</span>
                </div>
                <div className="info-stat">
                  <span className="info-stat-label">Distance</span>
                  <span className="info-stat-value mono">{item.distance} ly</span>
                </div>
                <div className="info-stat">
                  <span className="info-stat-label">Type</span>
                  <span className="info-stat-value mono">{item.spectralType}</span>
                </div>
                <div className="info-stat">
                  <span className="info-stat-label">RA / Dec</span>
                  <span className="info-stat-value mono">
                    {item.ra?.toFixed(1)}° / {item.dec?.toFixed(1)}°
                  </span>
                </div>
              </div>
            )}

            {type === "constellation" && (
              <>
                <div className="info-stats">
                  <div className="info-stat">
                    <span className="info-stat-label">Best month</span>
                    <span className="info-stat-value">
                      {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][item.bestMonth - 1]}
                    </span>
                  </div>
                  <div className="info-stat">
                    <span className="info-stat-label">Hemisphere</span>
                    <span className="info-stat-value">{item.hemisphere}</span>
                  </div>
                </div>
                {item.mythology && (
                  <p className="info-mythology">{item.mythology}</p>
                )}
              </>
            )}
          </div>

          {isAuthenticated && (
            <div className="info-actions">
              <motion.button
                className={`btn info-fav-btn ${isFav ? "info-fav-active" : "btn-secondary"}`}
                onClick={handleToggle}
                disabled={toggling}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isFav ? (
                    <motion.span
                      key="faved"
                      className="info-fav-inner"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Heart size={14} fill="currentColor" />
                      Favorited
                      <Check size={13} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="unfaved"
                      className="info-fav-inner"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Heart size={14} />
                      Favorite
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

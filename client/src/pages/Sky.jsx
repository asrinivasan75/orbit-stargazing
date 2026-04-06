import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Layers, MapPin, Clock, Eye } from "lucide-react";
import SkyScene from "../three/SkyScene";
import StarInfoPanel from "../components/StarInfoPanel";
import SearchOverlay from "../components/SearchOverlay";
import SkyNav from "../components/SkyNav";
import useStore from "../hooks/useStore";
import useGeolocation from "../hooks/useGeolocation";
import "./Sky.css";

export default function Sky() {
  const loadStarData = useStore((s) => s.loadStarData);
  const starsLoaded = useStore((s) => s.starsLoaded);
  const constellations = useStore((s) => s.constellations);
  const setSelectedConstellation = useStore((s) => s.setSelectedConstellation);
  const selectedConstellation = useStore((s) => s.selectedConstellation);
  const clearSelection = useStore((s) => s.clearSelection);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showConstellations, setShowConstellations] = useState(false);
  const [ready, setReady] = useState(false);
  const { location } = useGeolocation();
  const [sceneError, setSceneError] = useState(false);

  useEffect(() => {
    loadStarData();
  }, [loadStarData]);

  // Short delay after data loads so Three.js canvas can mount
  useEffect(() => {
    if (starsLoaded) {
      const t = setTimeout(() => setReady(true), 800);
      return () => clearTimeout(t);
    }
  }, [starsLoaded]);

  // Cmd+K search
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        clearSelection();
        setShowConstellations(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [clearSelection]);

  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="sky-page">
      {/* Loading */}
      <AnimatePresence>
        {!ready && (
          <motion.div
            className="sky-loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="sky-loader-content">
              <motion.div
                className="sky-loader-ring"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <svg width="40" height="40" viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(167,139,250,0.15)" strokeWidth="1" />
                  <circle cx="20" cy="20" r="16" fill="none" stroke="var(--accent-purple)" strokeWidth="1" strokeDasharray="18 82" strokeLinecap="round" />
                </svg>
              </motion.div>
              <span className="mono sky-loader-text" style={{ opacity: 0.4 }}>
                {starsLoaded ? "Rendering sky..." : "Loading star catalog..."}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Sky — always render, just behind loader */}
      {starsLoaded && !sceneError && (
        <ErrorBoundary onError={() => setSceneError(true)}>
          <SkyScene />
        </ErrorBoundary>
      )}

      {sceneError && (
        <div className="sky-loader">
          <p className="text-secondary" style={{ fontSize: "0.85rem" }}>
            WebGL rendering failed. Try refreshing the page.
          </p>
        </div>
      )}

      {/* Top bar */}
      {ready && (
        <motion.div
          className="sky-topbar"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="sky-location">
            <MapPin size={12} />
            <span>{location?.name || "Locating..."}</span>
          </div>
          <div className="sky-time">
            <Clock size={12} />
            <span>{timeStr}</span>
          </div>
        </motion.div>
      )}

      {/* Bottom controls */}
      {ready && (
        <motion.div
          className="sky-controls"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <button
            className={`sky-ctrl ${searchOpen ? "active" : ""}`}
            onClick={() => setSearchOpen(true)}
          >
            <Search size={16} strokeWidth={1.5} />
            <span>Search</span>
          </button>
          <div className="sky-ctrl-divider" />
          <button
            className={`sky-ctrl ${showConstellations ? "active" : ""}`}
            onClick={() => setShowConstellations(!showConstellations)}
          >
            <Layers size={16} strokeWidth={1.5} />
            <span>Constellations</span>
          </button>
        </motion.div>
      )}

      {/* Constellation drawer */}
      <AnimatePresence>
        {showConstellations && (
          <motion.div
            className="constellation-drawer glass scrollable"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="constellation-drawer-header">
              <span className="label">Constellations</span>
              <span className="badge">{constellations.length}</span>
            </div>
            <div className="constellation-items dim-list">
              {constellations.map((c) => (
                <button
                  key={c.id}
                  className={`constellation-row dim-item ${
                    selectedConstellation?.id === c.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedConstellation(c)}
                >
                  <Eye size={12} strokeWidth={1.5} />
                  <span className="constellation-row-name">{c.name}</span>
                  <span className="constellation-row-id mono">{c.id}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SkyNav />
      <StarInfoPanel />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {ready && (
        <motion.div
          className="sky-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span>Drag to look around</span>
          <span className="sky-hint-sep">/</span>
          <span>Scroll to zoom</span>
          <span className="sky-hint-sep">/</span>
          <span><kbd>&#8984;K</kbd> search</span>
        </motion.div>
      )}

      <div className="noise-overlay" />
    </div>
  );
}

/* Simple error boundary for Three.js canvas */
import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {
    if (this.props.onError) this.props.onError();
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

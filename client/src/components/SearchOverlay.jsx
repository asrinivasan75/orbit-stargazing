import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, BookOpen, X } from "lucide-react";
import useStore from "../hooks/useStore";
import { api } from "../utils/api";
import "./SearchOverlay.css";

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const setSelectedStar = useStore((s) => s.setSelectedStar);
  const setSelectedConstellation = useStore((s) => s.setSelectedConstellation);
  const stars = useStore((s) => s.stars);
  const constellations = useStore((s) => s.constellations);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (!isOpen) {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  const search = useCallback(
    (q) => {
      if (!q.trim()) {
        setResults([]);
        return;
      }
      const lower = q.toLowerCase();

      const starResults = stars
        .filter((s) => s.name && s.name.toLowerCase().includes(lower))
        .slice(0, 8)
        .map((s) => ({ ...s, type: "star" }));

      const constResults = constellations
        .filter(
          (c) =>
            c.name.toLowerCase().includes(lower) ||
            c.meaning?.toLowerCase().includes(lower)
        )
        .slice(0, 5)
        .map((c) => ({ ...c, type: "constellation" }));

      setResults([...constResults, ...starResults]);
    },
    [stars, constellations]
  );

  useEffect(() => {
    const timer = setTimeout(() => search(query), 150);
    return () => clearTimeout(timer);
  }, [query, search]);

  const handleSelect = (item) => {
    if (item.type === "star") {
      setSelectedStar(item);
    } else {
      setSelectedConstellation(item);
    }
    onClose();
  };

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="search-modal glass"
            initial={{ y: -20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -10, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="search-input-row">
              <Search size={18} className="search-icon" />
              <input
                ref={inputRef}
                type="text"
                className="search-input"
                placeholder="Search stars, constellations..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn-ghost" onClick={onClose}>
                <X size={16} />
              </button>
            </div>

            {results.length > 0 && (
              <div className="search-results">
                {results.map((item) => (
                  <button
                    key={`${item.type}-${item.id}`}
                    className="search-result"
                    onClick={() => handleSelect(item)}
                  >
                    <div className="search-result-icon">
                      {item.type === "star" ? (
                        <Star size={14} />
                      ) : (
                        <BookOpen size={14} />
                      )}
                    </div>
                    <div className="search-result-info">
                      <span className="search-result-name">{item.name}</span>
                      <span className="search-result-meta">
                        {item.type === "star"
                          ? item.designation
                          : item.meaning}
                      </span>
                    </div>
                    <span className="search-result-type badge">
                      {item.type}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {query && results.length === 0 && (
              <div className="search-empty">
                <p>No results for "{query}"</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

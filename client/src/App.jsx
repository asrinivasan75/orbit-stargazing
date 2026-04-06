import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Sky from "./pages/Sky";
import Explore from "./pages/Explore";
import Friends from "./pages/Friends";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import useStore from "./hooks/useStore";
import useSocket from "./hooks/useSocket";
import useLenis from "./hooks/useLenis";

function ProtectedRoute({ children }) {
  const { isAuthenticated, authLoading } = useStore();
  if (authLoading) return null;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const location = useLocation();
  const initAuth = useStore((s) => s.initAuth);
  const isAuthenticated = useStore((s) => s.isAuthenticated);
  const loadFavorites = useStore((s) => s.loadFavorites);

  useEffect(() => { initAuth(); }, [initAuth]);

  useEffect(() => {
    if (isAuthenticated) loadFavorites();
  }, [isAuthenticated, loadFavorites]);

  useSocket();
  useLenis();

  const isSkyPage = location.pathname === "/sky";

  useEffect(() => {
    if (isSkyPage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isSkyPage]);

  // Pages that should NOT show the main navbar
  const hideNavbar =
    location.pathname === "/sky" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/sky" element={<ProtectedRoute><Sky /></ProtectedRoute>} />
          <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
          <Route path="/friends" element={<ProtectedRoute><Friends /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      <div className="noise-overlay" />
    </>
  );
}

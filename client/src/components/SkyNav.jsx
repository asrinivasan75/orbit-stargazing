import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LayoutDashboard, Compass, Users, User, Star, LogOut } from "lucide-react";
import useStore from "../hooks/useStore";
import "./SkyNav.css";

export default function SkyNav() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useStore();
  const navigate = useNavigate();

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/explore", label: "Explore", icon: Compass },
    { to: "/friends", label: "Friends", icon: Users },
    { to: "/profile", label: "Profile", icon: User },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="sky-nav">
      {/* Toggle button */}
      <motion.button
        className="sky-nav-toggle"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      >
        {open ? <X size={16} /> : <Menu size={16} />}
      </motion.button>

      {/* Expanded nav */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="sky-nav-panel glass"
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
          >
            {/* Logo */}
            <Link to="/" className="sky-nav-logo" onClick={() => setOpen(false)}>
              <Star size={14} />
              <span>Orbit</span>
            </Link>

            <div className="sky-nav-divider" />

            {/* Links */}
            <div className="sky-nav-links">
              {links.map((link, i) => {
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                  >
                    <Link
                      to={link.to}
                      className="sky-nav-link"
                      onClick={() => setOpen(false)}
                    >
                      <Icon size={14} strokeWidth={1.5} />
                      <span>{link.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="sky-nav-divider" />

            {/* User + logout */}
            <div className="sky-nav-footer">
              <span className="sky-nav-user label">{user?.username}</span>
              <button className="sky-nav-logout" onClick={handleLogout}>
                <LogOut size={13} strokeWidth={1.5} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, Compass, User, Users, Search, LogOut, Star, Telescope, Menu, X } from "lucide-react";
import useStore from "../hooks/useStore";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useStore();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/sky", label: "Sky Map", icon: Telescope },
    { to: "/explore", label: "Explore", icon: Compass },
    { to: "/friends", label: "Friends", icon: Users },
    { to: "/profile", label: "Profile", icon: User },
  ];

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
    >
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <Star size={16} strokeWidth={2} />
          <span>Orbit</span>
        </Link>

        {isAuthenticated && (
          <>
            <div className={`nav-links ${mobileOpen ? "open" : ""}`}>
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`nav-link ${isActive ? "active" : ""}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon size={14} strokeWidth={1.5} />
                    <span>{link.label}</span>
                    {isActive && (
                      <motion.div
                        className="nav-active-dot"
                        layoutId="nav-dot"
                        transition={{ type: "spring", stiffness: 400, damping: 28 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="nav-right">
              <span className="nav-user label">{user?.username}</span>
              <button className="nav-logout" onClick={logout} title="Log out">
                <LogOut size={14} strokeWidth={1.5} />
              </button>
              <button
                className="nav-mobile-toggle"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </>
        )}

        {!isAuthenticated && (
          <div className="nav-right">
            <Link to="/login" className="nav-link">
              Log in
            </Link>
            <Link to="/register" className="btn btn-primary" style={{ padding: "0.5rem 1.2rem", fontSize: "0.8rem" }}>
              Sign up
            </Link>
          </div>
        )}
      </div>
    </motion.nav>
  );
}

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ArrowRight, Eye, EyeOff } from "lucide-react";
import useStore from "../hooks/useStore";
import "./Auth.css";

export default function Auth() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const navigate = useNavigate();
  const { login, register } = useStore();

  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLogin) {
        await login(form.email, form.password);
      } else {
        await register(form.username, form.email, form.password);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Background particles */}
      <div className="auth-bg">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 1.5}px`,
              height: `${1 + Math.random() * 1.5}px`,
            }}
            animate={{ opacity: [0, 0.4 + Math.random() * 0.4, 0] }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      >
        <Link to="/" className="auth-logo">
          <Star size={18} strokeWidth={1.5} />
        </Link>

        <h2 className="auth-title display-md">
          {isLogin ? "Welcome back" : "Join Orbit"}
        </h2>
        <p className="auth-subtitle body-sm text-secondary">
          {isLogin
            ? "Sign in to continue stargazing"
            : "Create your account and explore the cosmos"}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="auth-field">
              <label className="label">Username</label>
              <input
                className="input"
                type="text"
                placeholder="cosmicexplorer"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
                minLength={3}
                maxLength={24}
                autoComplete="username"
              />
            </div>
          )}

          <div className="auth-field">
            <label className="label">Email</label>
            <input
              className="input"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label className="label">Password</label>
            <div className="auth-password-wrap">
              <input
                className="input"
                type={showPassword ? "text" : "password"}
                placeholder="At least 6 characters"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                minLength={6}
                autoComplete={isLogin ? "current-password" : "new-password"}
              />
              <button
                type="button"
                className="auth-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.p
              className="auth-error"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-lg auth-submit"
            disabled={loading}
          >
            {loading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        <p className="auth-switch body-sm text-secondary">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Link to={isLogin ? "/register" : "/login"} className="text-accent">
            {isLogin ? "Sign up" : "Log in"}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

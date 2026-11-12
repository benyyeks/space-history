import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function LandingPage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-bg" aria-hidden />
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <span className="eyebrow">NASA Space Apps Challenge</span>
          <h1>When the surface fights back</h1>
          <p>
            Six real missions that landed, bounced, drove, or flew on the Moon
            and Mars. Click a marker, watch the path draw, then dig into the
            engineering that broke and what NASA fixed next.
          </p>
          <div className="hero-actions">
            <Link to="/mars-exploration" className="btn btn-primary">
              Open Mars Hub
            </Link>
            <Link to="/lunar-exploration" className="btn">
              Open Lunar Hub
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="container">
        <div className="hub-grid">
          <Link to="/mars-exploration" className="glass glass-card hub-card theme-mars">
            <span className="card-tag">Mars</span>
            <h2>Mars Exploration</h2>
            <p className="text-muted">
              Polar Lander, Phoenix, and Ingenuity. Software snap, sticky soil,
              and the first powered flight on another planet.
            </p>
            <span className="text-accent mono">3 missions · 3D map</span>
          </Link>
          <Link to="/lunar-exploration" className="glass glass-card hub-card theme-lunar">
            <span className="card-tag">Moon</span>
            <h2>Lunar Exploration</h2>
            <p className="text-muted">
              Ranger 4, Surveyor 3, and the Apollo 15 rover. Blind impact,
              radar bounce, and the first tracks on the lunar surface.
            </p>
            <span className="text-accent mono">3 missions · 3D map</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

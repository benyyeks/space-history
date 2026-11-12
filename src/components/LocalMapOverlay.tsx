import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Mission } from "@/data/missions";
import { Link } from "react-router-dom";

type Props = {
  mission: Mission;
  visible: boolean;
  onClose: () => void;
  onPreviewReady: () => void;
};

/** Project lat/lon into a simple local SVG plane around the mission. */
function toLocal(
  lat: number,
  lon: number,
  originLat: number,
  originLon: number,
  scale = 280
): { x: number; y: number } {
  const dx = (lon - originLon) * scale * Math.cos((originLat * Math.PI) / 180);
  const dy = (originLat - lat) * scale;
  return { x: 200 + dx, y: 160 + dy };
}

export function LocalMapOverlay({ mission, visible, onClose, onPreviewReady }: Props) {
  const [pathDone, setPathDone] = useState(false);
  const waypoints = mission.path ?? [
    { id: "site", label: mission.name, lat: mission.lat, lon: mission.lon },
  ];

  const points = useMemo(
    () =>
      waypoints.map((w) =>
        toLocal(w.lat, w.lon, mission.lat, mission.lon, mission.stationary ? 1 : 420)
      ),
    [waypoints, mission]
  );

  const pathD = useMemo(() => {
    if (points.length < 2) return "";
    return points
      .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
      .join(" ");
  }, [points]);

  useEffect(() => {
    setPathDone(false);
  }, [mission.id]);

  useEffect(() => {
    if (!visible) return;
    if (mission.stationary) {
      const t = setTimeout(() => {
        setPathDone(true);
        onPreviewReady();
      }, 900);
      return () => clearTimeout(t);
    }
  }, [visible, mission, onPreviewReady]);

  return (
    <div className={`local-map${visible ? " visible" : ""}`} aria-hidden={!visible}>
      <div className="local-map-controls">
        <button type="button" className="btn btn-sm btn-ghost" onClick={onClose}>
          Back to globe
        </button>
      </div>

      <svg className="local-map-svg" viewBox="0 0 400 320" role="img" aria-label={`Local map for ${mission.name}`}>
        <defs>
          <radialGradient id="zoneGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={mission.accent} stopOpacity="0.25" />
            <stop offset="100%" stopColor={mission.accent} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="320" fill="#0a0c12" />
        <circle cx="200" cy="160" r="120" fill="url(#zoneGlow)" />
        {/* grid */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <line x1={40 + i * 80} y1={20} x2={40 + i * 80} y2={300} stroke="rgba(255,255,255,0.06)" />
            <line x1={20} y1={40 + i * 60} x2={380} y2={40 + i * 60} stroke="rgba(255,255,255,0.06)" />
          </g>
        ))}

        {pathD && (
          <motion.path
            d={pathD}
            fill="none"
            stroke={mission.accent}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            onAnimationComplete={() => {
              setPathDone(true);
              onPreviewReady();
            }}
          />
        )}

        {points.map((p, i) => (
          <motion.g
            key={waypoints[i].id}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={
              pathDone || mission.stationary
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.4 }
            }
            transition={{ delay: mission.stationary ? 0.3 + i * 0.15 : 0.1 * i, duration: 0.35 }}
          >
            <circle cx={p.x} cy={p.y} r={7} fill={mission.accent} />
            <text
              x={p.x + 10}
              y={p.y - 8}
              fill="#e5e7eb"
              fontSize="11"
              fontFamily="Space Mono, monospace"
            >
              {waypoints[i].label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

export function PreviewPanel({
  mission,
  show,
}: {
  mission: Mission;
  show: boolean;
}) {
  if (!show) return null;
  return (
    <motion.aside
      className="glass preview-panel"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <span className="eyebrow">{mission.hub === "mars" ? "Mars" : "Moon"}</span>
      <h3>{mission.name}</h3>
      <p>{mission.shortSummary}</p>
      <div className="preview-actions">
        <Link to={`/missions/${mission.slug}`} className="btn btn-primary">
          Open full profile
        </Link>
      </div>
    </motion.aside>
  );
}

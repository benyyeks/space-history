import { Link, useParams } from "react-router-dom";
import { getMission } from "@/data/missions";
import { MissionQuiz } from "@/components/MissionQuiz";
import { IngenuityViewer } from "@/components/IngenuityViewer";

export function MissionPage() {
  const { slug } = useParams<{ slug: string }>();
  const mission = slug ? getMission(slug) : undefined;

  if (!mission) {
    return (
      <main className="container" style={{ padding: "3rem 4vw" }}>
        <h1>Mission not found</h1>
        <p className="text-muted">That profile is not in this archive.</p>
        <Link to="/" className="btn">
          Back home
        </Link>
      </main>
    );
  }

  const theme = mission.hub === "mars" ? "theme-mars" : "theme-lunar";
  const hubPath = mission.hub === "mars" ? "/mars-exploration" : "/lunar-exploration";

  return (
    <main className={`mission-page ${theme}`}>
      <header className="mission-hero">
        <div className="container">
          <Link to={hubPath} className="text-muted mono" style={{ fontSize: "0.8rem" }}>
            ← Back to {mission.hub === "mars" ? "Mars" : "Lunar"} Hub
          </Link>
          <span className="eyebrow" style={{ display: "block", marginTop: 12 }}>
            {mission.hub === "mars" ? "Mars" : "Moon"} · full profile
          </span>
          <h1>{mission.name}</h1>
          <p className="text-muted" style={{ maxWidth: 640 }}>
            {mission.story}
          </p>
          <p className="mono text-muted">
            {Math.abs(mission.lat).toFixed(2)}°{mission.lat >= 0 ? "N" : "S"},{" "}
            {Math.abs(mission.lon).toFixed(2)}°{mission.lon >= 0 ? "E" : "W"}
          </p>
        </div>
      </header>

      <div className="mission-grid container">
        <div className="glass glass-card section-block">
          <h2>Timeline</h2>
          <ul className="timeline">
            {mission.timeline.map((t) => (
              <li key={t.date + t.event}>
                <div className="date">{t.date}</div>
                <div>{t.event}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass glass-card section-block">
          <h2>Schematics</h2>
          <ul className="schematic-list">
            {mission.schematics.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="glass glass-card section-block">
          <h2>NASA lessons</h2>
          <p>{mission.nasaLessons}</p>
        </div>

        <div className="glass glass-card section-block">
          <h2>Student lessons</h2>
          <p>{mission.studentLessons}</p>
        </div>

        <div className="glass glass-card section-block" style={{ gridColumn: "1 / -1" }}>
          <h2>Quick check</h2>
          <MissionQuiz mission={mission} />
        </div>

        {mission.id === "ingenuity" && (
          <div className="glass glass-card section-block" style={{ gridColumn: "1 / -1" }}>
            <h2>3D hardware viewer</h2>
            <p className="text-muted">
              Rotate the craft and tap the markers on the fuselage, solar array,
              rotors, and legs. Drop <code>public/assets/ingenuity.glb</code> to
              swap the procedural model for the real mesh.
            </p>
            <IngenuityViewer />
          </div>
        )}
      </div>
    </main>
  );
}

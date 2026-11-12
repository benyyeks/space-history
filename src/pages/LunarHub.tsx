import { useCallback, useState } from "react";
import { missionsForHub, getMission } from "@/data/missions";
import { PlanetGlobe } from "@/components/PlanetGlobe";
import { LocalMapOverlay, PreviewPanel } from "@/components/LocalMapOverlay";

const LUNAR = missionsForHub("lunar");

export function LunarHub() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [focusId, setFocusId] = useState<string | null>(null);
  const [showLocal, setShowLocal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const selected = selectedId
    ? getMission(selectedId) ?? LUNAR.find((m) => m.id === selectedId)
    : null;

  const onSelect = useCallback((id: string) => {
    if (!id) {
      setSelectedId(null);
      return;
    }
    setSelectedId(id);
    setFocusId(id);
    setShowLocal(false);
    setShowPreview(false);
  }, []);

  const onZoomComplete = useCallback(() => {
    setShowLocal(true);
  }, []);

  const onPreviewReady = useCallback(() => {
    setShowPreview(true);
  }, []);

  const backToGlobe = () => {
    setShowLocal(false);
    setShowPreview(false);
    setFocusId(null);
  };

  return (
    <main className="hub-page theme-lunar">
      <div className="hub-hero container">
        <span className="eyebrow">Lunar Hub</span>
        <h1>Lunar surface missions</h1>
        <p className="text-muted" style={{ maxWidth: 560 }}>
          Ranger 4 impact, Surveyor 3 bounce site, and the Apollo 15 rover
          track. Same flow as Mars: click, zoom, path draw, then preview.
        </p>
      </div>

      <div className="hub-stage">
        <div className={`hub-canvas${showLocal ? " fade-out" : " fade-in"}`}>
          <PlanetGlobe
            hub="lunar"
            missions={LUNAR}
            selectedId={selectedId}
            onSelect={onSelect}
            focusMissionId={focusId}
            onZoomComplete={onZoomComplete}
          />
        </div>

        {selected && (
          <LocalMapOverlay
            mission={selected}
            visible={showLocal}
            onClose={backToGlobe}
            onPreviewReady={onPreviewReady}
          />
        )}

        {selected && <PreviewPanel mission={selected} show={showPreview && showLocal} />}

        {!showLocal && (
          <div className="scene-hint">Drag to orbit · click a marker to zoom</div>
        )}
      </div>
    </main>
  );
}

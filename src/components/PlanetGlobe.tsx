import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Stars } from "@react-three/drei";
import * as THREE from "three";
import type { Mission } from "@/data/missions";
import { latLonToVec3 } from "@/data/missions";

const GLOBE_R = 2;

type PlanetGlobeProps = {
  hub: "mars" | "lunar";
  missions: Mission[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  focusMissionId: string | null;
  onZoomComplete?: () => void;
};

function GlobeMesh({ hub }: { hub: "mars" | "lunar" }) {
  const color = hub === "mars" ? "#8B3A1A" : "#9CA3AF";
  const emissive = hub === "mars" ? "#3d1a0a" : "#1f2937";

  // Procedural surface look so the app runs without large texture files.
  // Drop real USGS / NASA maps into public/textures later if you want.
  return (
    <group>
      <mesh>
        <sphereGeometry args={[GLOBE_R, 64, 64]} />
        <meshStandardMaterial
          color={color}
          roughness={0.92}
          metalness={0.05}
          emissive={emissive}
          emissiveIntensity={0.15}
        />
      </mesh>
      <mesh scale={1.02}>
        <sphereGeometry args={[GLOBE_R, 48, 48]} />
        <meshBasicMaterial
          color={hub === "mars" ? "#E77D11" : "#94a3b8"}
          transparent
          opacity={0.07}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function MissionMarker({
  mission,
  selected,
  onSelect,
}: {
  mission: Mission;
  selected: boolean;
  onSelect: () => void;
}) {
  const pos = useMemo(
    () => latLonToVec3(mission.lat, mission.lon, GLOBE_R * 1.02),
    [mission.lat, mission.lon]
  );
  const pulse = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!pulse.current) return;
    const t = (clock.getElapsedTime() % 1.6) / 1.6;
    pulse.current.scale.setScalar(1 + t * 2.2);
    const mat = pulse.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.7 * (1 - t);
  });

  return (
    <group position={pos}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[selected ? 0.07 : 0.05, 16, 16]} />
        <meshBasicMaterial color={mission.accent} />
      </mesh>
      <mesh ref={pulse}>
        <ringGeometry args={[0.06, 0.09, 24]} />
        <meshBasicMaterial
          color={mission.accent}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
        <div className="marker-label">{mission.name}</div>
      </Html>
    </group>
  );
}

function CameraFocus({
  mission,
  onDone,
}: {
  mission: Mission | null;
  onDone?: () => void;
}) {
  const done = useRef(false);
  const controlsRef = useRef<any>(null);

  useFrame(({ camera }) => {
    if (!mission || done.current) return;
    const target = new THREE.Vector3(
      ...latLonToVec3(mission.lat, mission.lon, GLOBE_R)
    );
    const desired = target.clone().normalize().multiplyScalar(2.55);
    camera.position.lerp(desired, 0.045);
    camera.lookAt(target);
    if (camera.position.distanceTo(desired) < 0.08) {
      done.current = true;
      onDone?.();
    }
  });

  // reset done flag when mission changes
  if (mission) {
    // noop: ref tracks completion per focus session via parent remount key
  }

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      minDistance={2.4}
      maxDistance={8}
      enableDamping
      dampingFactor={0.08}
      autoRotate={!mission}
      autoRotateSpeed={0.35}
    />
  );
}

export function PlanetGlobe({
  hub,
  missions,
  selectedId,
  onSelect,
  focusMissionId,
  onZoomComplete,
}: PlanetGlobeProps) {
  const focusMission = missions.find((m) => m.id === focusMissionId) ?? null;

  return (
    <Canvas
      camera={{ position: [0, 1.2, 5.2], fov: 42, near: 0.1, far: 100 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
      onPointerMissed={() => onSelect("")}
    >
      <color attach="background" args={["#04060d"]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 3, 6]} intensity={1.8} />
      <Stars radius={60} depth={40} count={2500} factor={2.8} fade speed={0.3} />
      <Suspense fallback={null}>
        <GlobeMesh hub={hub} />
      </Suspense>
      {missions.map((m) => (
        <MissionMarker
          key={m.id}
          mission={m}
          selected={selectedId === m.id}
          onSelect={() => onSelect(m.id)}
        />
      ))}
      <CameraFocus
        key={focusMissionId ?? "idle"}
        mission={focusMission}
        onDone={onZoomComplete}
      />
    </Canvas>
  );
}

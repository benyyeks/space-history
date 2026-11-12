import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

type Hotspot = {
  id: string;
  label: string;
  detail: string;
  position: [number, number, number];
};

const HOTSPOTS: Hotspot[] = [
  {
    id: "fuselage",
    label: "Fuselage",
    detail: "Houses the Snapdragon 801 flight computer and sensors.",
    position: [0, 0.15, 0.05],
  },
  {
    id: "solar",
    label: "Solar array",
    detail: "Top panel charges batteries during Martian day for next flight.",
    position: [0, 0.42, 0],
  },
  {
    id: "rotor",
    label: "Carbon rotors",
    detail: "Twin counter-rotating blades, 1.2 m span, about 2,537 RPM.",
    position: [0.35, 0.38, 0],
  },
  {
    id: "legs",
    label: "Landing legs",
    detail: "Foam-cored legs absorb touchdown energy on soft regolith.",
    position: [0.2, -0.15, 0.15],
  },
];

function ProceduralHeli({ bladesRef }: { bladesRef: React.MutableRefObject<THREE.Group | null> }) {
  return (
    <group>
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.22, 0.14, 0.28]} />
        <meshStandardMaterial color="#c4c8d0" roughness={0.45} metalness={0.35} />
      </mesh>
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[0.36, 0.02, 0.36]} />
        <meshStandardMaterial color="#1e3a5f" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.2, 12]} />
        <meshStandardMaterial color="#9ca3af" />
      </mesh>
      <group ref={bladesRef} position={[0, 0.42, 0]}>
        <mesh>
          <boxGeometry args={[1.2, 0.01, 0.04]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[1.2, 0.01, 0.04]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
      </group>
      {[
        [0.14, -0.05, 0.12],
        [-0.14, -0.05, 0.12],
        [0.14, -0.05, -0.12],
        [-0.14, -0.05, -0.12],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]}>
          <cylinderGeometry args={[0.015, 0.015, 0.28, 8]} />
          <meshStandardMaterial color="#d1d5db" />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  const bladesRef = useRef<THREE.Group | null>(null);
  const [active, setActive] = useState<string | null>(null);

  useFrame((_, dt) => {
    if (bladesRef.current) {
      bladesRef.current.rotation.y += dt * 18;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 2]} intensity={1.6} />
      <directionalLight position={[-2, 1, -3]} intensity={0.4} />
      <Suspense fallback={null}>
        <ProceduralHeli bladesRef={bladesRef} />
      </Suspense>
      {HOTSPOTS.map((h) => (
        <group key={h.id} position={h.position}>
          <mesh
            onClick={(e) => {
              e.stopPropagation();
              setActive((a) => (a === h.id ? null : h.id));
            }}
            onPointerOver={() => {
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              document.body.style.cursor = "auto";
            }}
          >
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshBasicMaterial color={active === h.id ? "#E77D11" : "#f8fafc"} />
          </mesh>
          {active === h.id && (
            <Html center distanceFactor={4} style={{ pointerEvents: "none" }}>
              <div className="glass hotspot-tip">
                <strong>{h.label}</strong>
                <div className="text-muted" style={{ marginTop: 4 }}>
                  {h.detail}
                </div>
              </div>
            </Html>
          )}
        </group>
      ))}
      <OrbitControls makeDefault minDistance={0.8} maxDistance={5} enableDamping />
    </>
  );
}

export function IngenuityViewer() {
  return (
    <div className="ingenuity-stage">
      <Canvas camera={{ position: [0.9, 0.6, 1.4], fov: 40 }}>
        <color attach="background" args={["#05070c"]} />
        <Scene />
      </Canvas>
      <div className="scene-hint">
        Drag to rotate · click dots for parts · drop public/assets/ingenuity.glb later for the real mesh
      </div>
    </div>
  );
}

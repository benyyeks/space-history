export type Hub = "mars" | "lunar";

export type MissionId =
  | "mars-polar-lander"
  | "phoenix"
  | "ingenuity"
  | "ranger-4"
  | "surveyor-3"
  | "apollo-15-lrv";

export type Waypoint = {
  id: string;
  label: string;
  lat: number;
  lon: number;
  day?: string;
};

export type Mission = {
  id: MissionId;
  slug: string;
  name: string;
  hub: Hub;
  shortSummary: string;
  story: string;
  lat: number;
  lon: number;
  stationary: boolean;
  path?: Waypoint[];
  timeline: { date: string; event: string }[];
  schematics: string[];
  nasaLessons: string;
  studentLessons: string;
  imageHint: string;
  accent: string;
};

export const MISSIONS: Mission[] = [
  {
    id: "ranger-4",
    slug: "ranger-4",
    name: "Ranger 4",
    hub: "lunar",
    shortSummary:
      "1962 impact on the lunar farside after a sequencer failure left it blind.",
    story:
      "Launched in 1962, a central computer and sequencer failure prevented solar panel deployment. It drifted completely blind before impacting the lunar farside.",
    lat: -15.5,
    lon: 229.3,
    stationary: true,
    timeline: [
      { date: "April 23, 1962", event: "Launch and sequencer failure" },
      { date: "April 26, 1962", event: "Impact at 12:49:53 UTC" },
    ],
    schematics: [
      "Hexagonal bus",
      "331.12 kg mass",
      "6-inch balsa wood shock absorber",
    ],
    nasaLessons:
      "Replaced complex balsa wood shock absorbers with purely photographic payloads on Block III and implemented strict thermal vacuum testing.",
    studentLessons:
      "Systems must have hardware fallbacks so a single sequencer failure does not destroy passive survival functions.",
    imageHint: "ranger impact probe",
    accent: "#E5E7EB",
  },
  {
    id: "surveyor-3",
    slug: "surveyor-3",
    name: "Surveyor 3",
    hub: "lunar",
    shortSummary:
      "1967 soft lander that bounced twice, later visited by Apollo 12.",
    story:
      "Bounced twice during landing in 1967 due to highly reflective rocks confusing the descent radar. Visited in November 1969 by Apollo 12 astronauts who cut off its camera and scoop.",
    lat: -3.01612,
    lon: -23.41791,
    stationary: true,
    timeline: [
      { date: "April 20, 1967", event: "Landed in Surveyor Crater" },
      { date: "November 19, 1969", event: "Apollo 12 arrival" },
    ],
    schematics: [
      "Tubular aluminum alloy frame",
      "Soil Mechanics Surface Sampler scoop",
    ],
    nasaLessons:
      "Analysis of returned hardware exposed micrometeorite pitting and sparked strict cleanroom protocols to prevent biological contamination.",
    studentLessons:
      "Testing environments must be absolute, as human contamination can compromise global scientific consensus.",
    imageHint: "surveyor lander",
    accent: "#FFFFFF",
  },
  {
    id: "apollo-15-lrv",
    slug: "apollo-15-lrv",
    name: "Apollo 15 LRV",
    hub: "lunar",
    shortSummary:
      "First lunar rover. Drove the Hadley-Apennine region in 1971.",
    story:
      "Transformed lunar exploration by allowing astronauts to drive across the Hadley-Apennine region before being permanently parked on August 2, 1971.",
    lat: 26.132,
    lon: 3.633,
    stationary: false,
    path: [
      { id: "start", label: "Deployment", lat: 26.132, lon: 3.633, day: "July 31" },
      { id: "s1", label: "Station 1 Elbow Crater", lat: 26.12, lon: 3.65, day: "EVA 1" },
      { id: "s2", label: "Station 2 Mt Hadley Delta", lat: 26.08, lon: 3.68, day: "EVA 2" },
      { id: "s6", label: "Station 6 Apennine Front", lat: 26.05, lon: 3.7, day: "EVA 3" },
    ],
    timeline: [
      { date: "July 31, 1971", event: "First EVA deployment" },
      { date: "August 2, 1971", event: "Final parking to broadcast liftoff" },
    ],
    schematics: [
      "Woven zinc-coated piano wire mesh wheels with titanium chevrons",
      "Harmonic drive with 80:1 gear ratio",
    ],
    nasaLessons:
      "Validated wheel odometry and inertial gyroscopes, which became the standard for modern Mars rovers.",
    studentLessons:
      "Computational simplicity in analog sensors often yields the highest reliability in extreme environments.",
    imageHint: "lunar rover",
    accent: "#E5E7EB",
  },
  {
    id: "mars-polar-lander",
    slug: "mars-polar-lander",
    name: "Mars Polar Lander",
    hub: "mars",
    shortSummary:
      "1999 failure: legs deploying were read as touchdown, engines cut at 40 m.",
    story:
      "A fatal software flaw registered the mechanical snap of landing legs deploying as a surface touchdown, causing the computer to cut descent engines at 40 meters altitude.",
    lat: -76,
    lon: -195,
    stationary: true,
    timeline: [
      { date: "January 3, 1999", event: "Launch" },
      { date: "December 3, 1999", event: "Catastrophic failure and impact" },
    ],
    schematics: [
      "Hall-effect magnetic touchdown sensors",
      "Honeycomb crush cores",
      "Deep Space 2 microprobes",
    ],
    nasaLessons:
      "Forced an overhaul of software validation, mandating hardware-in-the-loop simulations to test against physical noise.",
    studentLessons:
      "Software cannot be developed without accounting for the physical mechanical transients of the hardware it controls.",
    imageHint: "mars polar lander",
    accent: "#E77D11",
  },
  {
    id: "phoenix",
    slug: "phoenix",
    name: "Phoenix Mars Lander",
    hub: "mars",
    shortSummary:
      "2008 arctic lander that confirmed water ice, then froze in winter.",
    story:
      "Landed in the arctic in 2008 and found water ice. Suffered from sticky, cohesive soil that clogged its ovens before winter darkness froze its solar arrays.",
    lat: 68.22,
    lon: 233.0,
    stationary: true,
    timeline: [
      { date: "May 25, 2008", event: "Landed" },
      { date: "July 31, 2008", event: "Confirmed water ice" },
      { date: "November 2, 2008", event: "Final communication" },
    ],
    schematics: [
      "2.35-meter robotic arm",
      "TEGA miniature ovens",
      "Decagonal solar arrays",
    ],
    nasaLessons:
      "Redesigned sample handling for Curiosity and Perseverance with percussive drills to force cohesive dirt through instruments.",
    studentLessons:
      "Passive systems fail in unknown environments, requiring active forced-feed mechanisms instead of relying on gravity.",
    imageHint: "phoenix lander",
    accent: "#E77D11",
  },
  {
    id: "ingenuity",
    slug: "ingenuity",
    name: "Ingenuity",
    hub: "mars",
    shortSummary:
      "First powered flight on another world. Grounded after Flight 72 rotor strike.",
    story:
      "Achieved the first powered extraterrestrial flight. Grounded on Flight 72 when visual odometry failed over featureless sand dunes, causing a fatal rotor strike.",
    lat: 18.44,
    lon: 77.45,
    stationary: false,
    path: [
      { id: "wbf", label: "Wright Brothers Field", lat: 18.4447, lon: 77.4508, day: "Flight 1" },
      { id: "mid", label: "Airfield expansion", lat: 18.448, lon: 77.455, day: "Mid campaign" },
      { id: "vh", label: "Valinor Hills (final)", lat: 18.46, lon: 77.47, day: "Flight 72" },
    ],
    timeline: [
      { date: "April 19, 2021", event: "First flight" },
      { date: "January 18, 2024", event: "Navigation failure and rotor damage on Flight 72" },
    ],
    schematics: [
      "1.2-meter carbon fiber rotors spinning at 2,537 RPM",
      "Qualcomm Snapdragon 801 processor",
    ],
    nasaLessons:
      "Pivoted away from relying purely on computer vision, integrating LiDAR and IMUs for future sample recovery helicopters.",
    studentLessons:
      "Autonomous algorithms must define their Operational Design Domain and include hardware fallbacks when physical edge conditions are breached.",
    imageHint: "ingenuity helicopter",
    accent: "#E77D11",
  },
];

export function getMission(slug: string): Mission | undefined {
  return MISSIONS.find((m) => m.slug === slug);
}

export function missionsForHub(hub: Hub): Mission[] {
  return MISSIONS.filter((m) => m.hub === hub);
}

/** Convert lat/lon to a unit vector on a sphere (Y-up, lon from +X). */
export function latLonToVec3(lat: number, lon: number, radius = 1): [number, number, number] {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return [
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

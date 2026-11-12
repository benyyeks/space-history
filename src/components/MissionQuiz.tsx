import { useState } from "react";
import type { Mission } from "@/data/missions";

type Q = {
  prompt: string;
  choices: string[];
  answer: number;
  explain: string;
};

function quizFor(mission: Mission): Q {
  switch (mission.id) {
    case "ranger-4":
      return {
        prompt: "Why did Ranger 4 impact the farside blind?",
        choices: [
          "Fuel ran out mid-cruise",
          "Sequencer failure blocked solar panel deployment",
          "Ground radar lost lock",
          "Heat shield failed at entry",
        ],
        answer: 1,
        explain:
          "A central computer and sequencer failure stopped solar panels from deploying, so the craft had no power for guidance.",
      };
    case "surveyor-3":
      return {
        prompt: "What caused Surveyor 3 to bounce on landing?",
        choices: [
          "Engine restart after false radar lock on bright rocks",
          "Weak landing legs",
          "Wrong target crater",
          "Solar flare interference",
        ],
        answer: 0,
        explain:
          "Highly reflective rocks confused the descent radar, so the engines restarted and the lander bounced twice.",
      };
    case "apollo-15-lrv":
      return {
        prompt: "What wheel design did the LRV use?",
        choices: [
          "Solid rubber tires",
          "Inflatable tires with nitrogen",
          "Zinc-coated piano wire mesh with titanium chevrons",
          "Aluminum treads only",
        ],
        answer: 2,
        explain:
          "Mesh wheels with titanium chevrons gave traction and low mass. That approach influenced later Mars rover wheels.",
      };
    case "mars-polar-lander":
      return {
        prompt: "What false signal cut the engines at 40 m?",
        choices: [
          "Star tracker glitch",
          "Hall-effect sensors reading leg deployment as touchdown",
          "Radio blackout",
          "Parachute release switch",
        ],
        answer: 1,
        explain:
          "Leg deployment snap was treated as surface contact, so the computer shut the engines while still high above the ground.",
      };
    case "phoenix":
      return {
        prompt: "What clogged the Phoenix TEGA ovens?",
        choices: [
          "Dust storms",
          "Sticky, cohesive soil that would not fall in by gravity",
          "Ice melting into liquid",
          "Broken arm joints",
        ],
        answer: 1,
        explain:
          "Cohesive soil stuck and blocked the ovens. Later missions used percussive or forced feed to move samples.",
      };
    case "ingenuity":
      return {
        prompt: "What failed on Flight 72?",
        choices: [
          "Battery voltage only",
          "Visual odometry over featureless dunes, then rotor strike",
          "Radio to Perseverance",
          "Solar panel crack only",
        ],
        answer: 1,
        explain:
          "Featureless sand broke visual odometry. The craft drifted, a rotor hit the ground, and the campaign ended.",
      };
    default:
      return {
        prompt: "What is the core student takeaway?",
        choices: [mission.studentLessons, "Ignore hardware noise", "Skip thermal tests", "Rely on one sensor only"],
        answer: 0,
        explain: mission.studentLessons,
      };
  }
}

export function MissionQuiz({ mission }: { mission: Mission }) {
  const q = quizFor(mission);
  const [picked, setPicked] = useState<number | null>(null);

  return (
    <div className="quiz-block">
      <p style={{ fontWeight: 600 }}>{q.prompt}</p>
      {q.choices.map((c, i) => {
        let cls = "quiz-option btn";
        if (picked !== null) {
          if (i === q.answer) cls += " correct";
          else if (i === picked) cls += " wrong";
        }
        return (
          <button
            key={i}
            type="button"
            className={cls}
            disabled={picked !== null}
            onClick={() => setPicked(i)}
          >
            {c}
          </button>
        );
      })}
      {picked !== null && (
        <p className="quiz-feedback text-muted">
          {picked === q.answer ? "Correct. " : "Not quite. "}
          {q.explain}
        </p>
      )}
    </div>
  );
}

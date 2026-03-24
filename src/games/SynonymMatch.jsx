"use client";
import { useState, useEffect } from 'react';

const WORD_PAIRS = [
  { w: "Happy", s: "Joyful" },
  { w: "Fast", s: "Quick" },
  { w: "Small", s: "Tiny" },
  { w: "Large", s: "Huge" },
  { w: "Sad", s: "Unhappy" },
  { w: "Smart", s: "Intelligent" },
  { w: "Strong", s: "Powerful" },
  { w: "Angry", s: "Mad" }
];

export default function SynonymMatch({ level, onWin, onLoss }) {
  const [target, setTarget] = useState({});
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const targetScore = Math.min(10, 3 + Math.floor(level / 5));

  const generate = () => {
    const pair = WORD_PAIRS[Math.floor(Math.random() * WORD_PAIRS.length)];
    setTarget(pair);
    const others = WORD_PAIRS.filter(p => p.w !== pair.w).map(p => p.s);
    const opts = [pair.s, ...others.sort(() => Math.random() - 0.5).slice(0, 3)].sort(() => Math.random() - 0.5);
    setOptions(opts);
  };

  useEffect(() => {
    generate();
  }, [level]);

  const select = (s) => {
    if (s === target.s) {
      const next = score + 1;
      setScore(next);
      if (next >= targetScore) onWin(3, 1000);
      else generate();
    } else {
      onLoss();
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '10px' }}>Synonym of: ({score}/{targetScore})</h3>
      <h1 style={{ fontSize: '4rem', color: 'var(--accent-primary)', marginBottom: '40px' }}>{target.w}</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {options.map((o, i) => (
          <button key={i} onClick={() => select(o)} className="glass-panel" style={{ padding: '20px', fontSize: '1.5rem', color: 'white', cursor: 'pointer' }}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

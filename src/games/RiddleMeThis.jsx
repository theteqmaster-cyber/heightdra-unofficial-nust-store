"use client";
import { useState, useEffect } from 'react';

const RIDDLES = [
  { q: "What has keys but can't open locks?", a: "Piano", o: ["Piano", "Map", "Keyboard", "Skeleton"] },
  { q: "The more of this there is, the less you see. What is it?", a: "Darkness", o: ["Darkness", "Fog", "Light", "Money"] },
  { q: "What has a thumb and four fingers, but is not a hand?", a: "Glove", o: ["Glove", "Foot", "Tree", "Shadow"] }
];

export default function RiddleMeThis({ level, onWin, onLoss }) {
  const [current, setCurrent] = useState({});
  const [score, setScore] = useState(0);
  const targetScore = 2;

  useEffect(() => {
    const r = RIDDLES[Math.floor(Math.random() * RIDDLES.length)];
    setCurrent({ ...r, options: [...r.o].sort(() => Math.random() - 0.5) });
  }, [level]);

  const select = (o) => {
    if (o === current.a) onWin(3, 1000);
    else onLoss();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px', color: 'var(--accent-primary)' }}>RIDDLE ME THIS:</h3>
      <h2 style={{ fontSize: '2.2rem', marginBottom: '50px', lineHeight: '1.4' }}>{current.q}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {current.options?.map((o, i) => (
          <button key={i} onClick={() => select(o)} className="glass-panel" style={{ padding: '25px', fontSize: '1.2rem', color: 'white' }}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

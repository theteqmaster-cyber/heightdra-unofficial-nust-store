"use client";
import { useState, useEffect } from 'react';

const REALITY = [
  { q: "Assignment due tomorrow → you:", a: "Panic & Netflix", o: ["Sleep", "Panic & Netflix", "Study early", "Call Mom"] },
  { q: "Found a free voucher for 10GB data:", a: "Download all the movies", o: ["Save for research", "Download all the movies", "Share with friends", "Delete it"] },
  { q: "Lecture starts in 2 minutes, you're in bed:", a: "Join Zoom from bed", o: ["Run to class", "Join Zoom from bed", "Skip it", "Cry"] }
];

export default function CampusReality({ level, onWin, onLoss }) {
  const [current, setCurrent] = useState({});

  useEffect(() => {
    setCurrent({ ...REALITY[Math.floor(Math.random() * REALITY.length)], options: REALITY[0].o.sort(() => Math.random() - 0.5) });
  }, [level]);

  const select = (o) => {
    if (o === current.a) onWin(3, 1000);
    else onLoss();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px' }}>Campus Reality Check 🎓</h3>
      <h2 style={{ fontSize: '2rem', marginBottom: '50px' }}>{current.q}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {current.options?.map((o, i) => (
          <button key={i} onClick={() => select(o)} className="glass-panel" style={{ padding: '25px', color: 'white' }}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

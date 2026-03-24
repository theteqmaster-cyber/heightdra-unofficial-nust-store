"use client";
import { useState, useEffect } from 'react';

const SENTENCES = [
  { s: "The ___ is shining brightly.", a: "SUN" },
  { s: "NUST is the best ___ in Zim.", a: "UNIVERSITY" },
  { s: "I love coding ___ games.", a: "MINI" },
  { s: "Water ___ at 100 degrees.", a: "BOILS" },
  { s: "Chill Zone is for ___.", a: "STUDENTS" }
];

export default function FillBlank({ level, onWin, onLoss }) {
  const [target, setTarget] = useState({});
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const s = SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
    setTarget(s);
    const others = ["MOON", "COLLEGE", "VIDEO", "FREEZES", "TEACHERS"];
    const opts = [s.a, ...others.sort(() => Math.random() - 0.5).slice(0, 3)].sort(() => Math.random() - 0.5);
    setOptions(opts);
  }, [level]);

  const select = (o) => {
    if (o === target.a) onWin(3, 1000);
    else onLoss();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', lineHeight: '1.5' }}>{target.s}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {options.map((o, i) => (
          <button key={i} onClick={() => select(o)} className="glass-panel" style={{ padding: '20px', fontSize: '1.2rem', color: 'white', cursor: 'pointer' }}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

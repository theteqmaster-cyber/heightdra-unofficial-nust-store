"use client";
import { useState, useEffect } from 'react';

const QA = [
  { q: "2 + 3 × 2", a: "8" }, { q: "5 + 4 × 2", a: "13" },
  { q: "6 × 2 + 3", a: "15" }, { q: "8 + 2 × 3", a: "14" },
  { q: "10 + 3 × 2", a: "16" }, { q: "12 ÷ 3 + 4", a: "8" },
  { q: "15 ÷ 5 + 6", a: "9" }, { q: "(5 + 3) × 2", a: "16" },
  { q: "20 ÷ (2 + 3)", a: "4" }, { q: "8 × 2 + 6 ÷ 3", a: "18" }
];

export default function LightningChain({ level, onWin, onLoss }) {
  const [current, setCurrent] = useState({});
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const target = Math.min(10, 3 + Math.floor(level / 5));

  const generate = () => {
    const s = QA[Math.floor(Math.random() * QA.length)];
    setCurrent(s);
    const opts = new Set([s.a]);
    while(opts.size < 4) opts.add((parseInt(s.a) + Math.floor(Math.random() * 10) - 5).toString());
    setOptions([...opts].sort(() => Math.random() - 0.5));
  };

  useEffect(() => generate(), [level]);

  const select = (o) => {
    if (o === current.a) {
      if (score + 1 >= target) onWin(5, 2000);
      else { setScore(score+1); generate(); }
    } else onLoss();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ color: 'var(--nust-accent)', marginBottom: '30px' }}>⚡ LIGHTNING CHAIN ({score}/{target})</h3>
      <h1 style={{ fontSize: '4rem', marginBottom: '60px' }}>{current.q}</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {options.map(o => (
          <button key={o} onClick={() => select(o)} className="glass-panel" style={{ padding: '30px', color: 'white', fontSize: '1.5rem', border: '1px solid rgba(252,209,22,0.2)' }}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

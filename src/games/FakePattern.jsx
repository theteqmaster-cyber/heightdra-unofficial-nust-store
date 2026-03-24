"use client";
import { useState, useEffect } from 'react';

const PATTERNS = [
  { p: "2, 4, 8, 16, ?", a: "32", o: ["24", "32", "64", "20"] },
  { p: "3, 6, 7, 14, ?", a: "15", o: ["28", "15", "21", "18"] },
  { p: "5, 10, 9, 18, ?", a: "17", o: ["19", "17", "36", "20"] },
  { p: "10, 20, 19, 38, ?", a: "37", o: ["40", "37", "76", "19"] }
];

export default function FakePattern({ level, onWin, onLoss }) {
  const [current, setCurrent] = useState({});

  useEffect(() => {
    setCurrent(PATTERNS[Math.floor(Math.random() * PATTERNS.length)]);
  }, [level]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ color: 'var(--nust-accent)', marginBottom: '40px' }}>🎭 FAKE PATTERN MATH</h3>
      <h1 style={{ fontSize: '4rem', marginBottom: '60px' }}>{current.p}</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {current.o?.map(o => (
          <button key={o} onClick={() => o === current.a ? onWin(5, 2000) : onLoss()} className="glass-panel" style={{ padding: '30px', color: 'white', border: '1px solid rgba(252,209,22,0.2)' }}>{o}</button>
        )) || PATTERNS[0].o.map(o => (
           <button key={o} onClick={() => o === current.a ? onWin(5, 2000) : onLoss()} className="glass-panel" style={{ padding: '30px', color: 'white', border: '1px solid rgba(252,209,22,0.2)' }}>{o}</button>
        ))}
      </div>
    </div>
  );
}

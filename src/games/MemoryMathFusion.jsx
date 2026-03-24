"use client";
import { useState, useEffect } from 'react';

export default function MemoryMathFusion({ level, onWin, onLoss }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ q1: "2+2", op: "×3", a: "12" });

  useEffect(() => {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    const mult = Math.floor(Math.random() * 5) + 2;
    setData({ q1: `${a}+${b}`, op: `×${mult}`, a: ((a + b) * mult).toString() });
  }, [level]);

  if (step === 1) return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ color: 'var(--nust-accent)' }}>Phase 1: Remember</h3>
      <h1 style={{ fontSize: '6rem', margin: '40px 0' }}>{data.q1}</h1>
      <button onClick={() => setStep(2)} className="play-btn-main">NEXT</button>
    </div>
  );

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ color: 'var(--nust-accent)' }}>Phase 2: Fusion</h3>
      <h2 style={{ fontSize: '3rem', marginBottom: '40px' }}>Result of (Phase 1) {data.op}?</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 200px)', gap: '20px', justifyContent: 'center' }}>
        {[data.a, (parseInt(data.a)+2).toString(), (parseInt(data.a)-5).toString(), "0"].sort().map(o => (
          <button key={o} onClick={() => o === data.a ? onWin(5, 2000) : onLoss()} className="glass-panel" style={{ padding: '30px', color: 'white', border: '1px solid rgba(252,209,22,0.2)' }}>{o}</button>
        ))}
      </div>
    </div>
  );
}

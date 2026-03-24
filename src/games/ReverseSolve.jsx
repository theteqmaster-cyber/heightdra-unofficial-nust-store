"use client";
import { useState, useEffect } from 'react';

export default function ReverseSolve({ level, onWin, onLoss }) {
  const [x, setX] = useState(0);
  const [eq, setEq] = useState("");

  useEffect(() => {
    const val = Math.floor(Math.random() * 10) + 2;
    const mult = Math.floor(Math.random() * 5) + 2;
    const add = Math.floor(Math.random() * 10);
    setEq(`x × ${mult} + ${add} = ${val * mult + add}`);
    setX(val);
  }, [level]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ color: 'var(--nust-accent)', marginBottom: '40px' }}>🔀 REVERSE SOLVE</h3>
      <h1 style={{ fontSize: '4rem', marginBottom: '60px' }}>{eq}</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {[x, x+2, x-1, x*2].sort(() => Math.random() - 0.5).map(o => (
          <button key={o} onClick={() => o === x ? onWin(5, 2000) : onLoss()} className="glass-panel" style={{ padding: '30px', color: 'white', border: '1px solid rgba(252,209,22,0.2)' }}>
            x = {o}
          </button>
        ))}
      </div>
    </div>
  );
}

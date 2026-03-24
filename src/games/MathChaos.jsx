"use client";
import { useState, useEffect } from 'react';

export default function MathChaos({ level, onWin, onLoss }) {
  const [eq, setEq] = useState("2 + 2");
  const [ans, setAns] = useState("4");
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setPos({ x: Math.random() * 40 - 20, y: Math.random() * 40 - 20 });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h3 style={{ color: 'var(--nust-accent)', marginBottom: '40px' }}>🔥 MATH CHAOS (AVOID THE SHAKE!)</h3>
      <div style={{ transform: `translate(${pos.x}px, ${pos.y}px)`, transition: 'transform 0.05s' }}>
        <h1 style={{ fontSize: '5rem', marginBottom: '80px' }}>{eq}</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {["4", "5", "3", "22"].map(o => (
            <button key={o} onClick={() => o === ans ? onWin(5, 3000) : onLoss()} className="glass-panel" style={{ padding: '40px', color: 'white', border: '2px solid var(--nust-accent)' }}>{o}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

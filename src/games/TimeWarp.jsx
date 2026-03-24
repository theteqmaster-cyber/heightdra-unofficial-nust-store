"use client";
import { useState, useEffect } from 'react';

export default function TimeWarp({ level, onWin, onLoss }) {
  const [eq, setEq] = useState("5 + 3 × 2");
  const [ans, setAns] = useState("11");
  const [options, setOptions] = useState([]);
  const [warp, setWarp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setWarp(true), 1500);
    const opts = [ans, "16", "21", "8"].sort(() => Math.random() - 0.5);
    setOptions(opts);
    return () => clearTimeout(timer);
  }, [level]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ color: 'var(--nust-accent)', marginBottom: '40px' }}>⏱️ TIME WARP</h3>
      <h1 style={{ fontSize: '4rem', marginBottom: '60px', transform: warp ? 'rotate(180deg) scale(0.5)' : 'none', transition: 'all 0.5s', opacity: warp ? 0.3 : 1 }}>
        {eq}
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {options.map(o => (
          <button key={o} onClick={() => o === ans ? onWin(5, 2000) : onLoss()} className="glass-panel" style={{ padding: '30px', color: 'white', border: '1px solid rgba(252,209,22,0.2)' }}>{o}</button>
        ))}
      </div>
    </div>
  );
}

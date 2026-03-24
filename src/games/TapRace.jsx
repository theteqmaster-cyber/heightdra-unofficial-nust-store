"use client";
import { useState, useEffect } from 'react';

export default function TapRace({ level, onWin, onLoss }) {
  const [taps, setTaps] = useState(0);
  const target = Math.min(100, 20 + level * 5);
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (taps >= target) onWin(3, taps * 10);
      else onLoss();
      return;
    }
    const t = setInterval(() => setTimeLeft(x => Math.max(0, x - 0.1)), 100);
    return () => clearInterval(t);
  }, [timeLeft, taps, target, onWin, onLoss]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '10px' }}>TAP AS FAST AS YOU CAN!</h3>
      <h1 style={{ fontSize: '4rem', color: '#ff4d4d' }}>{timeLeft.toFixed(1)}s</h1>
      <div style={{ width: '100%', height: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', marginBottom: '40px', overflow: 'hidden' }}>
        <div style={{ width: `${(taps / target) * 100}%`, height: '100%', background: 'var(--accent-primary)', transition: 'width 0.1s linear' }} />
      </div>
      <button 
        onClick={() => setTaps(t => t + 1)}
        style={{
          width: '200px', height: '200px', borderRadius: '50%', border: 'none',
          background: 'var(--accent-primary)', color: '#000', fontSize: '3rem', fontWeight: 'bold',
          boxShadow: '0 0 40px var(--accent-primary)', cursor: 'pointer', outline: 'none'
        }}
      >
        {taps}
      </button>
      <p style={{ marginTop: '20px', color: 'var(--text-secondary)' }}>Target: {target}</p>
    </div>
  );
}

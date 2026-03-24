"use client";
import { useState, useEffect } from 'react';

export default function RhythmTap({ level, onWin, onLoss }) {
  const [pulse, setPulse] = useState(false);
  const [score, setScore] = useState(0);
  const targetScore = Math.min(15, 5 + level);
  const [lastPulse, setLastPulse] = useState(0);

  useEffect(() => {
    const bpm = Math.min(160, 60 + level * 3);
    const interval = 60000 / bpm;
    const t = setInterval(() => {
      setPulse(true);
      setLastPulse(Date.now());
      setTimeout(() => setPulse(false), 100);
    }, interval);
    return () => clearInterval(t);
  }, [level]);

  const tap = () => {
    const now = Date.now();
    const diff = Math.abs(now - lastPulse);
    if (diff < 150) {
      const next = score + 1;
      setScore(next);
      if (next >= targetScore) onWin(3, 1000);
    } else {
      onLoss();
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px' }}>Tap with the pulse! ({score}/{targetScore})</h3>
      <div 
        onClick={tap}
        style={{
          width: '150px', height: '150px', borderRadius: '50%', margin: '0 auto',
          background: pulse ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
          boxShadow: pulse ? '0 0 50px var(--accent-primary)' : 'none',
          border: '4px solid var(--accent-primary)', cursor: 'pointer',
          transition: 'all 0.05s', transform: pulse ? 'scale(1.1)' : 'scale(1)'
        }}
      />
    </div>
  );
}

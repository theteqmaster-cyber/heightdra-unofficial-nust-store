"use client";
import { useState, useEffect, useRef } from 'react';

export default function SpeedBalance({ level, onWin, onLoss }) {
  const [pos, setPos] = useState(50);
  const [target, setTarget] = useState(50);
  const [time, setTime] = useState(0);
  const targetTime = Math.min(10, 3 + Math.floor(level / 5));

  useEffect(() => {
    const drift = setInterval(() => {
      const force = (Math.random() - 0.5) * (level / 2);
      setPos(p => {
        const next = p + force;
        if (next < 0 || next > 100) onLoss();
        return Math.max(0, Math.min(100, next));
      });
    }, 100);
    return () => clearInterval(drift);
  }, [level, onLoss]);

  useEffect(() => {
    if (Math.abs(pos - target) < 10) {
      const t = setInterval(() => setTime(s => s + 0.1), 100);
      return () => clearInterval(t);
    } else {
      setTime(0);
    }
  }, [pos, target]);

  useEffect(() => {
    if (time >= targetTime) onWin(3, 1000);
  }, [time, targetTime]);

  const handleMove = (e) => {
    const { width, left } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    setPos(x);
  };

  return (
    <div 
      onMouseMove={handleMove}
      style={{ textAlign: 'center', width: '100%', height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <h3 style={{ marginBottom: '20px' }}>Keep the slider centered!</h3>
      <div style={{ position: 'relative', width: '100%', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px' }}>
        <div style={{ position: 'absolute', left: '45%', width: '10%', height: '100%', background: 'rgba(102, 252, 241, 0.2)', borderRadius: '5px' }}></div>
        <div style={{ 
          position: 'absolute', left: `${pos}%`, width: '10px', height: '60px', 
          background: 'var(--accent-primary)', transform: 'translate(-50%, -10px)',
          borderRadius: '5px', boxShadow: '0 0 10px var(--accent-primary)',
          transition: 'left 0.05s linear'
        }}></div>
      </div>
      <div style={{ marginTop: '40px', fontSize: '2rem' }}>
        {(time).toFixed(1)}s / {targetTime}s
      </div>
    </div>
  );
}

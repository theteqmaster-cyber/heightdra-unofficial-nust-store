"use client";
import { useState, useEffect } from 'react';

export default function BubblePop({ level, onWin, onLoss }) {
  const [bubbles, setBubbles] = useState([]);
  const [popped, setPopped] = useState(0);
  const targetCount = Math.min(25, 5 + level);
  const maxBubbles = Math.min(8, 3 + Math.floor(level / 5));

  const spawn = () => {
    return {
      id: Math.random(),
      x: Math.random() * 80 + 10,
      y: 110,
      size: Math.max(30, 80 - level),
      speed: Math.random() * 2 + 1 + level / 10
    };
  };

  useEffect(() => {
    const t = setInterval(() => {
      setBubbles(prev => {
        if (prev.length < maxBubbles) return [...prev, spawn()];
        return prev;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [level, maxBubbles]);

  useEffect(() => {
    const move = setInterval(() => {
      setBubbles(prev => {
        const next = prev.map(b => ({ ...b, y: b.y - b.speed }));
        if (next.some(b => b.y < -10)) onLoss(); // Any bubble escapes? Game over logic can be adjusted.
        return next.filter(b => b.y > -10);
      });
    }, 30);
    return () => clearInterval(move);
  }, [onLoss]);

  const pop = (id) => {
    setBubbles(prev => prev.filter(b => b.id !== id));
    const next = popped + 1;
    setPopped(next);
    if (next >= targetCount) onWin(3, 1000);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px', background: 'var(--panel-bg)', borderRadius: '24px', overflow: 'hidden' }}>
      <h3 style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10 }}>Popped: {popped}/{targetCount}</h3>
      {bubbles.map(b => (
        <div 
          key={b.id}
          onClick={() => pop(b.id)}
          style={{
            position: 'absolute', left: `${b.x}%`, top: `${b.y}%`,
            width: b.size, height: b.size, borderRadius: '50%',
            background: 'rgba(102, 252, 241, 0.4)', border: '2px solid var(--accent-primary)',
            boxShadow: '0 0 10px var(--accent-primary)',
            cursor: 'pointer', transform: 'translateX(-50%)',
            transition: 'transform 0.1s'
          }}
        />
      ))}
    </div>
  );
}

"use client";
import { useState, useEffect, useRef } from 'react';

export default function TargetClicker({ level, onWin, onLoss }) {
  const targetCount = Math.min(20, 5 + Math.floor(level / 2));
  const [clicked, setClicked] = useState(0);
  const [targets, setTargets] = useState([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const containerRef = useRef(null);

  const spawnTarget = () => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const size = Math.max(20, 60 - level);
    const x = Math.random() * (width - size);
    const y = Math.random() * (height - size);
    const speed = level > 10 ? (Math.random() * 2 + level / 10) : 0;
    const angle = Math.random() * Math.PI * 2;
    
    return {
      id: Math.random(),
      x, y, size,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed
    };
  };

  useEffect(() => {
    setTargets(Array.from({ length: 3 }, spawnTarget));
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [level]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onLoss();
      return;
    }
    
    const moveInterval = setInterval(() => {
      setTargets(prev => prev.map(t => {
        let nx = t.x + t.vx;
        let ny = t.y + t.vy;
        let nvx = t.vx;
        let nvy = t.vy;

        if (containerRef.current) {
          const { width, height } = containerRef.current.getBoundingClientRect();
          if (nx < 0 || nx > width - t.size) nvx *= -1;
          if (ny < 0 || ny > height - t.size) nvy *= -1;
        }

        return { ...t, x: nx, y: ny, vx: nvx, vy: nvy };
      }));
    }, 16);

    return () => clearInterval(moveInterval);
  }, [timeLeft]);

  const handleTargetClick = (id) => {
    setClicked(c => {
      const next = c + 1;
      if (next >= targetCount) {
        onWin(3, timeLeft * 100);
      }
      return next;
    });
    setTargets(prev => {
      const remaining = prev.filter(t => t.id !== id);
      if (clicked + remaining.length < targetCount) {
        return [...remaining, spawnTarget()];
      }
      return remaining;
    });
  };

  return (
    <div style={{ textAlign: 'center', width: '100%', height: '100%' }}>
      <h3 style={{ color: timeLeft <= 5 ? '#ff4d4d' : 'var(--accent-primary)', marginBottom: '10px' }}>
        Targets: {clicked} / {targetCount} | Time: {timeLeft}s
      </h3>
      <div 
        ref={containerRef}
        style={{ 
          width: '100%', height: '400px', background: 'rgba(0,0,0,0.2)', 
          borderRadius: '24px', position: 'relative', overflow: 'hidden',
          border: '1px solid var(--panel-border)'
        }}
      >
        {targets.map(t => (
          <div 
            key={t.id}
            onClick={() => handleTargetClick(t.id)}
            style={{
              position: 'absolute', left: t.x, top: t.y,
              width: t.size, height: t.size, borderRadius: '50%',
              background: 'var(--accent-primary)', boxShadow: '0 0 15px var(--accent-primary)',
              cursor: 'pointer', transition: 'transform 0.1s'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.8)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        ))}
      </div>
    </div>
  );
}

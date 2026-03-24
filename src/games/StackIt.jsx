"use client";
import { useState, useEffect } from 'react';

export default function StackIt({ level, onWin, onLoss }) {
  const [blocks, setBlocks] = useState([{ id: 0, x: 25, w: 50, y: 90 }]);
  const [current, setCurrent] = useState({ x: 0, w: 50, dir: 1 });
  const targetBlocks = Math.min(12, 4 + Math.floor(level / 3));

  useEffect(() => {
    const speed = 1 + level / 5;
    const interval = setInterval(() => {
      setCurrent(prev => {
        let nextX = prev.x + prev.dir * speed;
        let nextDir = prev.dir;
        if (nextX < 0 || nextX + prev.w > 100) nextDir *= -1;
        return { ...prev, x: nextX, dir: nextDir };
      });
    }, 30);
    return () => clearInterval(interval);
  }, [level]);

  const drop = () => {
    const last = blocks[blocks.length - 1];
    const left = Math.max(current.x, last.x);
    const right = Math.min(current.x + current.w, last.x + last.w);
    const newW = right - left;

    if (newW <= 0) {
      onLoss();
    } else {
      const nextBlocks = [...blocks, { id: blocks.length, x: left, w: newW, y: 90 - blocks.length * 8 }];
      setBlocks(nextBlocks);
      setCurrent(prev => ({ ...prev, w: newW }));
      if (nextBlocks.length >= targetBlocks) onWin(3, 1000);
    }
  };

  return (
    <div onClick={drop} style={{ position: 'relative', width: '100%', height: '400px', background: 'rgba(0,0,0,0.5)', borderRadius: '24px', overflow: 'hidden', cursor: 'pointer' }}>
      <h3 style={{ position: 'absolute', top: '20px', left: '20px' }}>Stacked: {blocks.length - 1}/{targetBlocks - 1}</h3>
      {blocks.map(b => (
        <div key={b.id} style={{ position: 'absolute', left: `${b.x}%`, bottom: `${100 - b.y}%`, width: `${b.w}%`, height: '8%', background: 'var(--accent-primary)', border: '1px solid black', borderRadius: '4px' }} />
      ))}
      <div style={{ position: 'absolute', left: `${current.x}%`, bottom: `${blocks.length * 8 + 10}%`, width: `${current.w}%`, height: '8%', background: '#fcd116', border: '1px solid black', borderRadius: '4px' }} />
    </div>
  );
}

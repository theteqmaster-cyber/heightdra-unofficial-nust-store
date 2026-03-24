"use client";
import { useState, useEffect } from 'react';

export default function DoubleTap({ level, onWin, onLoss }) {
  const [target, setTarget] = useState({ x: 50, y: 50 });
  const [clicks, setClicks] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const targetCount = Math.min(10, 3 + Math.floor(level / 3));
  const [doneCount, setDoneCount] = useState(0);

  const spawn = () => {
    setTarget({ x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 });
    setClicks(0);
  };

  useEffect(() => {
    spawn();
  }, [level, doneCount]);

  const handleClick = () => {
    const now = Date.now();
    if (clicks === 0) {
      setClicks(1);
      setLastClickTime(now);
    } else {
      const diff = now - lastClickTime;
      const threshold = Math.max(150, 400 - level * 10);
      if (diff < threshold) {
        const next = doneCount + 1;
        setDoneCount(next);
        if (next >= targetCount) onWin(3, 1000);
        else spawn();
      } else {
        setClicks(1);
        setLastClickTime(now);
      }
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px', background: 'var(--panel-bg)', borderRadius: '24px' }}>
      <h3 style={{ position: 'absolute', top: '20px', left: '20px' }}>Double Tap: {doneCount}/{targetCount}</h3>
      <div 
        onClick={handleClick}
        style={{
          position: 'absolute', left: `${target.x}%`, top: `${target.y}%`,
          width: '60px', height: '60px', borderRadius: '50%',
          background: clicks === 1 ? '#fcd116' : '#66fcf1',
          boxShadow: `0 0 20px ${clicks === 1 ? '#fcd116' : '#66fcf1'}`,
          cursor: 'pointer', transform: 'translate(-50%, -50%)',
          transition: 'background 0.1s'
        }}
      />
    </div>
  );
}

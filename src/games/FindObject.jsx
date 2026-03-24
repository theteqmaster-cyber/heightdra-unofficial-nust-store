"use client";
import { useState, useEffect } from 'react';

export default function FindObject({ level, onWin, onLoss }) {
  const gridSize = Math.min(10, 5 + Math.floor(level / 5));
  const [cells, setCells] = useState([]);
  const [targetIdx, setTargetIdx] = useState(-1);

  useEffect(() => {
    const total = gridSize * gridSize;
    const tIdx = Math.floor(Math.random() * total);
    setTargetIdx(tIdx);
    const arr = Array(total).fill('x');
    setCells(arr);
  }, [level, gridSize]);

  const click = (i) => {
    if (i === targetIdx) onWin(3, 1000);
    else onLoss();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px' }}>Find the hidden <span style={{color: 'var(--accent-primary)'}}>GLOW</span>!</h3>
      <div style={{ 
        display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 1fr)`, gap: '5px',
        padding: '10px', background: 'rgba(0,0,0,0.5)', borderRadius: '12px'
      }}>
        {cells.map((_, i) => (
          <div 
            key={i}
            onClick={() => click(i)}
            style={{
              width: `${Math.max(20, 300 / gridSize)}px`, 
              height: `${Math.max(20, 300 / gridSize)}px`,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              cursor: 'pointer',
              borderRadius: '4px',
              transition: 'all 0.1s'
            }}
            onMouseOver={e => {
              if (i === targetIdx) e.currentTarget.style.boxShadow = 'inset 0 0 10px var(--accent-primary)';
            }}
            onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}
          />
        ))}
      </div>
    </div>
  );
}

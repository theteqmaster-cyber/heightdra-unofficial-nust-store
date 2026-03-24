"use client";
import { useState, useEffect } from 'react';

const ICONS = ['🍎', '🍏', '🍊', '🍋', '🍐', '🍓', '🍒', '🍑'];

export default function OddOneOut({ level, onWin, onLoss }) {
  const gridSize = Math.min(6, 3 + Math.floor(level / 10));
  const [items, setItems] = useState([]);
  const [oddIdx, setOddIdx] = useState(-1);

  useEffect(() => {
    const total = gridSize * gridSize;
    const baseIcon = ICONS[Math.floor(Math.random() * ICONS.length)];
    let oddIcon = ICONS[Math.floor(Math.random() * ICONS.length)];
    while(oddIcon === baseIcon) oddIcon = ICONS[Math.floor(Math.random() * ICONS.length)];
    
    const arr = Array(total).fill(baseIcon);
    const oIdx = Math.floor(Math.random() * total);
    arr[oIdx] = oddIcon;
    setOddIdx(oIdx);
    setItems(arr);
  }, [level, gridSize]);

  const select = (idx) => {
    if (idx === oddIdx) onWin(3, 1000);
    else onLoss();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>Find the odd one out!</h3>
      <div style={{ 
        display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 1fr)`, gap: '10px',
        padding: '20px', background: 'var(--panel-bg)', borderRadius: '16px'
      }}>
        {items.map((item, i) => (
          <div 
            key={i}
            onClick={() => select(i)}
            style={{
              width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(255,255,255,0.05)', fontSize: '2rem', cursor: 'pointer',
              borderRadius: '8px', border: '1px solid var(--panel-border)',
              filter: level > 15 ? `hue-rotate(${Math.random() * 20}deg)` : 'none'
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

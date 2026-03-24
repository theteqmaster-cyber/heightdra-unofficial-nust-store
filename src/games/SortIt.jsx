"use client";
import { useState, useEffect } from 'react';

export default function SortIt({ level, onWin, onLoss }) {
  const count = Math.min(10, 3 + Math.floor(level / 4));
  const [items, setItems] = useState([]);
  const [sorted, setSorted] = useState([]);

  useEffect(() => {
    const arr = Array.from({ length: count }, () => Math.floor(Math.random() * 100));
    setItems([...arr].sort(() => Math.random() - 0.5));
    setSorted([...arr].sort((a,b) => a - b));
  }, [level, count]);

  const move = (idx) => {
    const val = items[idx];
    if (val === sorted[0]) {
      const nextItems = items.filter((_, i) => i !== idx);
      const nextSorted = sorted.slice(1);
      setItems(nextItems);
      setSorted(nextSorted);
      if (nextItems.length === 0) onWin(3, 1000);
    } else {
      onLoss();
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px' }}>Sort in ascending order!</h3>
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {items.map((v, i) => (
          <div 
            key={i}
            onClick={() => move(i)}
            className="glass-panel"
            style={{ padding: '20px', fontSize: '1.5rem', minWidth: '80px', cursor: 'pointer', color: 'var(--accent-primary)' }}
          >
            {v}
          </div>
        ))}
      </div>
    </div>
  );
}

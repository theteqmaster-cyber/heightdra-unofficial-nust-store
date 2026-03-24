"use client";
import { useState, useEffect } from 'react';

export default function BreakBlocks({ level, onWin, onLoss }) {
  const count = Math.min(12, 3 + Math.floor(level / 4));
  const [blocks, setBlocks] = useState([]);
  const [expected, setExpected] = useState(0);

  useEffect(() => {
    const b = Array.from({ length: count }, (_, i) => ({ id: i, val: i + 1 }));
    setBlocks(b.sort(() => Math.random() - 0.5));
    setExpected(1);
  }, [level, count]);

  const click = (v) => {
    if (v === expected) {
      if (v === count) onWin(3, 1000);
      else setExpected(v + 1);
    } else {
      onLoss();
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px' }}>Break blocks in order: {expected} to {count}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
        {blocks.map(b => (
          <div 
            key={b.id}
            onClick={() => click(b.val)}
            className="glass-panel"
            style={{
              height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem', cursor: 'pointer', 
              background: b.val < expected ? 'transparent' : 'rgba(102, 252, 241, 0.1)',
              border: b.val < expected ? 'none' : '2px solid var(--accent-primary)',
              opacity: b.val < expected ? 0 : 1,
              transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              transform: b.val < expected ? 'scale(0)' : 'scale(1)'
            }}
          >
            {b.val}
          </div>
        ))}
      </div>
    </div>
  );
}

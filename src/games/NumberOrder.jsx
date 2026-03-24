"use client";
import { useState, useEffect } from 'react';

export default function NumberOrder({ level, onWin, onLoss }) {
  const count = Math.min(25, 4 + Math.floor(level / 2));
  const [numbers, setNumbers] = useState([]);
  const [expected, setExpected] = useState(1);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let arr = Array.from({length: count}, (_, i) => ({ id: i, val: i + 1 }));
    // Shuffle
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setNumbers(arr);

    if (level > 15) {
      const t = setTimeout(() => setHidden(true), Math.max(1000, 3000 - level * 50));
      return () => clearTimeout(t);
    }
  }, [level, count]);

  const handleClick = (val) => {
    if (val === expected) {
      if (val === count) {
        onWin(3, 1000);
      } else {
        setExpected(val + 1);
      }
    } else {
      onLoss();
    }
  };

  const cols = Math.ceil(Math.sqrt(count));

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px', color: 'var(--text-primary)' }}>Click numbers in order (1 to {count})</h3>
      <div style={{ 
        display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '10px',
        background: 'var(--panel-bg)', padding: '20px', borderRadius: '16px'
      }}>
        {numbers.map((n) => {
          const isClicked = n.val < expected;
          return (
            <div 
              key={n.id}
              onClick={() => !isClicked && handleClick(n.val)}
              style={{
                width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: isClicked ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                color: isClicked ? '#000' : (hidden && !isClicked && level > 15 ? 'transparent' : 'white'),
                borderRadius: '8px', cursor: isClicked ? 'default' : 'pointer',
                fontSize: '1.5rem', fontWeight: 'bold',
                opacity: isClicked ? 0.3 : 1
              }}
            >
              {n.val}
            </div>
          );
        })}
      </div>
    </div>
  );
}

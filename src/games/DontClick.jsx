"use client";
import { useState, useEffect } from 'react';

export default function DontClick({ level, onWin, onLoss }) {
  const [items, setItems] = useState([]);
  const [score, setScore] = useState(0);
  const targetScore = Math.min(15, 5 + level);
  const totalItems = 8;

  const generate = () => {
    const specialIdx = Math.floor(Math.random() * totalItems);
    const arr = Array.from({ length: totalItems }, (_, i) => i === specialIdx ? 'BOMB' : 'CLICK');
    setItems(arr);
  };

  useEffect(() => {
    generate();
  }, [level]);

  const clickItem = (type) => {
    if (type === 'BOMB') onLoss();
    else {
      const s = score + 1;
      setScore(s);
      if (s >= targetScore) onWin(3, 1000);
      else generate();
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px' }}>DON'T CLICK THE <span style={{color: '#ff4d4d'}}>BOMB!</span> ({score}/{targetScore})</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 2fr)', gap: '15px' }}>
        {items.map((type, i) => (
          <div 
            key={i}
            onClick={() => clickItem(type)}
            className="glass-panel"
            style={{
              height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold',
              color: type === 'BOMB' ? '#ff4d4d' : 'var(--accent-primary)',
              transition: 'transform 0.1s'
            }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.9)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {type}
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from 'react';

export default function AvoidRed({ level, onWin, onLoss }) {
  const [tiles, setTiles] = useState([]);
  const [greenCount, setGreenCount] = useState(0);
  const targetGreen = Math.min(20, 5 + level);

  const generateTiles = () => {
    const total = 12;
    const redCount = Math.min(6, 2 + Math.floor(level / 5));
    const arr = Array(total).fill('green');
    const reds = [];
    while(reds.length < redCount) {
      const idx = Math.floor(Math.random() * total);
      if (!reds.includes(idx)) reds.push(idx);
    }
    reds.forEach(r => arr[r] = 'red');
    setTiles(arr);
  };

  useEffect(() => {
    generateTiles();
  }, [level]);

  const tileClick = (type) => {
    if (type === 'red') onLoss();
    else {
      const next = greenCount + 1;
      setGreenCount(next);
      if (next >= targetGreen) onWin(3, 1000);
      else generateTiles();
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px' }}>Click <span style={{color: '#66fcf1'}}>GREEN</span> only! ({greenCount}/{targetGreen})</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
        {tiles.map((type, i) => (
          <div 
            key={i}
            onClick={() => tileClick(type)}
            style={{
              width: '80px', height: '80px', borderRadius: '12px',
              background: type === 'green' ? '#66fcf1' : '#ff4d4d',
              boxShadow: `0 0 15px ${type === 'green' ? '#66fcf1' : '#ff4d4d'}`,
              cursor: 'pointer', transition: 'transform 0.1s'
            }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.9)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        ))}
      </div>
    </div>
  );
}

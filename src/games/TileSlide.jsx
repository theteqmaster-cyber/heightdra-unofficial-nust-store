"use client";
import { useState, useEffect } from 'react';

export default function TileSlide({ level, onWin, onLoss }) {
  const [tiles, setTiles] = useState([1, 2, 3, 0]); // 2x2 grid
  const solution = [1, 2, 3, 0];

  useEffect(() => {
    // Shuffle
    let s = [1, 2, 3, 0];
    for (let i = 0; i < 10; i++) {
      const idx = s.indexOf(0);
      const possible = [];
      if (idx > 1) possible.push(idx - 2);
      if (idx < 2) possible.push(idx + 2);
      if (idx % 2 !== 0) possible.push(idx - 1);
      if (idx % 2 !== 1) possible.push(idx + 1);
      const move = possible[Math.floor(Math.random() * possible.length)];
      [s[idx], s[move]] = [s[move], s[idx]];
    }
    setTiles(s);
  }, []);

  const move = (idx) => {
    const zeroIdx = tiles.indexOf(0);
    const isAdjacent = (Math.abs(idx - zeroIdx) === 1 && Math.floor(idx / 2) === Math.floor(zeroIdx / 2)) || Math.abs(idx - zeroIdx) === 2;
    
    if (isAdjacent) {
      const next = [...tiles];
      [next[idx], next[zeroIdx]] = [next[zeroIdx], next[idx]];
      setTiles(next);
      if (JSON.stringify(next) === JSON.stringify(solution)) onWin(3, 1000);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px' }}>Slide to sort!</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', width: '200px', margin: '0 auto' }}>
        {tiles.map((t, i) => (
          <div 
            key={i}
            onClick={() => move(i)}
            className="glass-panel"
            style={{ 
              width: '90px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem', cursor: t === 0 ? 'default' : 'pointer',
              background: t === 0 ? 'transparent' : 'rgba(102, 252, 241, 0.1)',
              border: t === 0 ? 'none' : '1px solid var(--accent-primary)',
              color: 'white'
            }}
          >
            {t !== 0 && t}
          </div>
        ))}
      </div>
    </div>
  );
}

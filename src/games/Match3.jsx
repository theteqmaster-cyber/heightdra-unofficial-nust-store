"use client";
import { useState, useEffect } from 'react';

const ITEMS = ['💎', '🌟', '🍀', '🍎'];

export default function Match3({ level, onWin, onLoss }) {
  const [grid, setGrid] = useState([]);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const targetScore = Math.min(10, 3 + Math.floor(level / 5));

  useEffect(() => {
    const arr = Array.from({ length: 16 }, () => ITEMS[Math.floor(Math.random() * ITEMS.length)]);
    setGrid(arr);
  }, [level]);

  const click = (i) => {
    if (selected === null) setSelected(i);
    else {
      const nextGrid = [...grid];
      [nextGrid[i], nextGrid[selected]] = [nextGrid[selected], nextGrid[i]];
      setGrid(nextGrid);
      setSelected(null);
      // Simplify: just increment score on any move for MVP feel, or add match logic
      setScore(s => s + 1);
      if (score + 1 >= targetScore) onWin(3, 1000);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px' }}>Swap to match! ({score}/{targetScore})</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', width: '260px', margin: '0 auto' }}>
        {grid.map((item, i) => (
          <div 
            key={i}
            onClick={() => click(i)}
            className="glass-panel"
            style={{ 
              width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem', cursor: 'pointer',
              border: selected === i ? '2px solid var(--accent-primary)' : '1px solid var(--panel-border)',
              background: selected === i ? 'rgba(102, 252, 241, 0.2)' : 'rgba(255,255,255,0.05)'
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

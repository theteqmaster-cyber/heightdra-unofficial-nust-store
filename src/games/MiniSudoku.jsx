"use client";
import { useState, useEffect } from 'react';

export default function MiniSudoku({ level, onWin, onLoss }) {
  const [grid, setGrid] = useState([
    [1, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 1]
  ]);
  const solution = [
    [1, 2, 3, 4],
    [3, 4, 1, 2],
    [2, 1, 4, 3],
    [4, 3, 2, 1]
  ];

  const cellClick = (r, c) => {
    const next = [...grid];
    next[r][c] = (next[r][c] % 4) + 1;
    setGrid(next);
    
    if (JSON.stringify(next) === JSON.stringify(solution)) {
      onWin(3, 1000);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px' }}>Complete the 4x4 Sudoku!</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', background: 'var(--panel-border)', padding: '10px', borderRadius: '12px' }}>
        {grid.map((row, r) => row.map((val, c) => (
          <div 
            key={`${r}-${c}`}
            onClick={() => cellClick(r, c)}
            className="glass-panel"
            style={{ 
              width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem', cursor: 'pointer', background: val === 0 ? 'rgba(0,0,0,0.2)' : 'rgba(102, 252, 241, 0.1)',
              color: val === 0 ? 'transparent' : 'white'
            }}
          >
            {val !== 0 && val}
          </div>
        )))}
      </div>
    </div>
  );
}

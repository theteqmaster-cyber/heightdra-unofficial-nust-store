"use client";
import { useState, useEffect } from 'react';

export default function MultiTask({ level, onWin, onLoss }) {
  const [clickCount, setClickCount] = useState(0);
  const targetClick = 10;
  const [mathA, setMathA] = useState(0);
  const [mathB, setMathB] = useState(0);
  const [mathRes, setMathRes] = useState("");
  const [mathTarget, setMathTarget] = useState(0);

  useEffect(() => {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    setMathA(a);
    setMathB(b);
    setMathTarget(a + b);
  }, [level]);

  const checkMath = (e) => {
    e.preventDefault();
    if (parseInt(mathRes) === mathTarget && clickCount >= targetClick) onWin(3, 1000);
    else onLoss();
  };

  return (
    <div style={{ textAlign: 'center', display: 'flex', gap: '40px', justifyContent: 'center', alignItems: 'center' }}>
      <div className="glass-panel" style={{ padding: '30px' }}>
        <h3>TASK 1: TAP 10 TIMES</h3>
        <button 
          onClick={() => setClickCount(c => Math.min(targetClick, c + 1))}
          style={{ padding: '20px 40px', fontSize: '2rem', marginTop: '20px', background: clickCount >= targetClick ? '#66fcf1' : 'transparent', color: clickCount >= targetClick ? '#000' : 'white', border: '2px solid #66fcf1', borderRadius: '12px' }}
        >
          {clickCount} / {targetClick}
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '30px' }}>
        <h3>TASK 2: SOLVE MATH</h3>
        <h2 style={{ fontSize: '2rem', margin: '20px 0' }}>{mathA} + {mathB} = ?</h2>
        <form onSubmit={checkMath}>
          <input 
            type="number"
            value={mathRes}
            onChange={e => setMathRes(e.target.value)}
            style={{ fontSize: '1.5rem', padding: '10px', width: '100px', textAlign: 'center', background: 'rgba(0,0,0,0.3)', color: 'white', border: '1px solid var(--accent-primary)', borderRadius: '8px' }}
          />
        </form>
      </div>
    </div>
  );
}

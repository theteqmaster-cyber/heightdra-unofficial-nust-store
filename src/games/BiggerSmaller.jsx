"use client";
import { useState, useEffect } from 'react';

export default function BiggerSmaller({ level, onWin, onLoss }) {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [target, setTarget] = useState('BIGGER'); // BIGGER or SMALLER
  const [score, setScore] = useState(0);
  const targetScore = Math.min(20, 5 + level);

  const generate = () => {
    const valA = Math.floor(Math.random() * 100);
    let valB = Math.floor(Math.random() * 100);
    while(valB === valA) valB = Math.floor(Math.random() * 100);
    setA(valA);
    setB(valB);
    setTarget(Math.random() > 0.5 ? 'BIGGER' : 'SMALLER');
  };

  useEffect(() => {
    generate();
  }, [level]);

  const select = (val) => {
    const other = val === a ? b : a;
    const isCorrect = target === 'BIGGER' ? val > other : val < other;
    if (isCorrect) {
      const next = score + 1;
      setScore(next);
      if (next >= targetScore) onWin(3, 1000);
      else generate();
    } else {
      onLoss();
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px' }}>Pick the {target} value! ({score}/{targetScore})</h3>
      <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>
        <button onClick={() => select(a)} className="glass-panel" style={{ width: '150px', height: '150px', fontSize: '3rem', color: 'white', cursor: 'pointer' }}>{a}</button>
        <button onClick={() => select(b)} className="glass-panel" style={{ width: '150px', height: '150px', fontSize: '3rem', color: 'white', cursor: 'pointer' }}>{b}</button>
      </div>
    </div>
  );
}

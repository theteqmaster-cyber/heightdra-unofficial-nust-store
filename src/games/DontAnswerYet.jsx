"use client";
import { useState, useEffect } from 'react';

export default function DontAnswerYet({ level, onWin, onLoss }) {
  const [canAnswer, setCanAnswer] = useState(false);
  const [timer, setTimer] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanAnswer(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [level]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px' }}>{canAnswer ? "GO! GO! GO!" : `DO NOT CLICK FOR ${timer}s!`}</h3>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '60px' }}>What is 10 x 10?</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {["10", "100", "1000", "0"].map(o => (
          <button key={o} onClick={() => {
            if (!canAnswer) onLoss();
            else if (o === "100") onWin(3, 1000);
            else onLoss();
          }} className="glass-panel" style={{ padding: '30px', color: 'white', opacity: canAnswer ? 1 : 0.3 }}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

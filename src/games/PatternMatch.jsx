"use client";
import { useState, useEffect } from 'react';

const SHAPES = ['●', '■', '▲', '◆', '★', '✖'];
const COLORS = ['#66fcf1', '#fcd116', '#ff4d4d', '#b266ff', '#45a29e', '#ffffff'];

export default function PatternMatch({ level, onWin, onLoss }) {
  const choiceCount = Math.min(6, 2 + Math.floor(level / 6));
  const [target, setTarget] = useState(null);
  const [choices, setChoices] = useState([]);
  const [phase, setPhase] = useState('memorize');
  const [timeLeft, setTimeLeft] = useState(10);

  const generateRound = () => {
    const all = [];
    for (let s of SHAPES) {
      for (let c of COLORS) {
        all.push({ shape: s, color: c });
      }
    }
    
    const selected = [];
    while(selected.length < choiceCount) {
      const r = all[Math.floor(Math.random() * all.length)];
      if (!selected.find(x => x.shape === r.shape && x.color === r.color)) {
        selected.push(r);
      }
    }
    
    setChoices(selected);
    const tar = selected[Math.floor(Math.random() * selected.length)];
    setTarget(tar);
    setPhase('memorize');

    const memoTime = Math.max(500, 2000 - level * 50);
    setTimeout(() => setPhase('match'), memoTime);
  };

  useEffect(() => {
    generateRound();
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [level]);

  useEffect(() => {
    if (timeLeft <= 0) onLoss();
  }, [timeLeft]);

  const handleChoice = (choice) => {
    if (phase !== 'match') return;
    if (choice.shape === target.shape && choice.color === target.color) {
      onWin(3, timeLeft * 150);
    } else {
      onLoss();
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>
        {phase === 'memorize' ? 'MEMORIZE THIS' : 'FIND THE MATCH'}
      </h3>
      
      <div className="glass-panel" style={{ padding: '30px', display: 'inline-block', marginBottom: '40px', minWidth: '150px' }}>
        {target && (phase === 'memorize' || phase === 'done') ? (
          <span style={{ fontSize: '5rem', color: target.color }}>{target.shape}</span>
        ) : (
          <span style={{ fontSize: '5rem', color: 'rgba(255,255,255,0.1)' }}>?</span>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {choices.map((c, i) => (
          <div 
            key={i}
            onClick={() => handleChoice(c)}
            className="glass-panel"
            style={{ 
              padding: '20px', fontSize: '3rem', color: c.color, 
              cursor: phase === 'match' ? 'pointer' : 'default',
              opacity: phase === 'memorize' ? 0.1 : 1,
              transition: 'all 0.2s'
            }}
          >
            {c.shape}
          </div>
        ))}
      </div>
    </div>
  );
}

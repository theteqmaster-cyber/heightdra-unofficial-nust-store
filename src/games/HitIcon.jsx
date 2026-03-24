"use client";
import { useState, useEffect } from 'react';

const ICONS = ['🔥', '🧊', '⚡', '🧠', '🧩', '🎯', '🎲', '🔄', '🚫', '🔢', '🟦', '📍', '🚦', '🔤', '➕'];

export default function HitIcon({ level, onWin, onLoss }) {
  const [target, setTarget] = useState("");
  const [choices, setChoices] = useState([]);
  const choiceCount = Math.min(20, 6 + Math.floor(level / 2));
  const [score, setScore] = useState(0);
  const targetScore = Math.min(15, 5 + level);

  const generate = () => {
    const t = ICONS[Math.floor(Math.random() * ICONS.length)];
    setTarget(t);
    const others = ICONS.filter(i => i !== t).sort(() => Math.random() - 0.5).slice(0, choiceCount - 1);
    const all = [t, ...others].sort(() => Math.random() - 0.5);
    setChoices(all);
  };

  useEffect(() => {
    generate();
  }, [level]);

  const select = (i) => {
    if (i === target) {
      const s = score + 1;
      setScore(s);
      if (s >= targetScore) onWin(3, 1000);
      else generate();
    } else {
      onLoss();
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '10px' }}>Find the <span style={{fontSize: '2rem'}}>{target}</span> ({score}/{targetScore})</h3>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(choiceCount))}, 1fr)`, gap: '15px' }}>
        {choices.map((icon, i) => (
          <div 
            key={i}
            onClick={() => select(icon)}
            className="glass-panel"
            style={{ 
              width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem', cursor: 'pointer', transition: 'all 0.1s'
            }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.9)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {icon}
          </div>
        ))}
      </div>
    </div>
  );
}

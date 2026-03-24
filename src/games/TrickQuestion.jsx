"use client";
import { useState, useEffect } from 'react';

const QUESTIONS = [
  { q: "Which is heavier: 1kg of feathers or 1kg of bricks?", a: "They are the same", o: ["Bricks", "Feathers", "They are the same", "Depends on humidity"] },
  { q: "How many months have 28 days?", a: "All of them", o: ["1", "6", "12", "All of them"] },
  { q: "If you're in a race and you pass the person in second place, what place are you in?", a: "Second", o: ["First", "Second", "Third", "Last"] },
  { q: "A farmer has 17 sheep and all but nine run away. How many are left?", a: "9", o: ["8", "9", "17", "0"] }
];

export default function TrickQuestion({ level, onWin, onLoss }) {
  const [current, setCurrent] = useState({});
  const [score, setScore] = useState(0);
  const targetScore = Math.min(5, 2 + Math.floor(level / 10));

  const generate = () => {
    const q = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
    setCurrent({ ...q, options: [...q.o].sort(() => Math.random() - 0.5) });
  };

  useEffect(() => {
    generate();
  }, [level]);

  const select = (o) => {
    if (o === current.a) {
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
      <h3 style={{ marginBottom: '20px' }}>Wait, what? ({score}/{targetScore})</h3>
      <h2 style={{ fontSize: '2rem', marginBottom: '40px', color: 'white' }}>{current.q}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {current.options?.map((o, i) => (
          <button key={i} onClick={() => select(o)} className="glass-panel" style={{ padding: '20px', fontSize: '1.1rem', color: 'white' }}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

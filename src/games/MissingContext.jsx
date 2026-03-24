"use client";
import { useState, useEffect } from 'react';

const SQUASH = [
  { q: "John is taller than Mike. Mike is shorter than Pete. Who is shortest?", a: "Mike", o: ["John", "Mike", "Pete", "Not enough info"] },
  { q: "If A > B and C < B, which is smallest?", a: "C", o: ["A", "B", "C", "None"] },
  { q: "Sarah reached the door before Amy but after Tom. Who was first?", a: "Tom", o: ["Sarah", "Amy", "Tom", "The Door"] }
];

export default function MissingContext({ level, onWin, onLoss }) {
  const [current, setCurrent] = useState({});
  const [score, setScore] = useState(0);
  const targetScore = Math.min(5, 2 + Math.floor(level / 10));

  const generate = () => {
    const q = SQUASH[Math.floor(Math.random() * SQUASH.length)];
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
      <h3 style={{ marginBottom: '20px' }}>Missing Context? ({score}/{targetScore})</h3>
      <h2 style={{ fontSize: '2rem', marginBottom: '40px' }}>{current.q}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {current.options?.map((o, i) => (
          <button key={i} onClick={() => select(o)} className="glass-panel" style={{ padding: '20px', color: 'white' }}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

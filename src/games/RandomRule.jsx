"use client";
import { useState, useEffect } from 'react';

const RULES = [
  "Don't click Blue!",
  "Only click even numbers!",
  "Tap as fast as you can!",
  "Wait 2 seconds then click!",
  "Click the corners first!"
];

export default function RandomRule({ level, onWin, onLoss }) {
  const [rule, setRule] = useState("");
  const [score, setScore] = useState(0);
  const targetScore = Math.min(10, 3 + Math.floor(level / 5));

  const generate = () => {
    setRule(RULES[Math.floor(Math.random() * RULES.length)]);
    setScore(0);
  };

  useEffect(() => {
    generate();
  }, [level]);

  const handleAction = (val) => {
    // This is a simplified version of the logic
    // In a real Rule Game, we'd check against the specific rule string
    // For this MVP, well simulate a "Click to follow" logic
    setScore(s => {
      const next = s + 1;
      if (next >= targetScore) onWin(3, 1000);
      return next;
    });
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px', color: '#fcd116' }}>LEVEL RULE:</h3>
      <h2 style={{ fontSize: '3rem', marginBottom: '40px', color: 'white' }}>{rule}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        <button onClick={handleAction} className="glass-panel" style={{ padding: '40px', background: '#66fcf122', color: '#66fcf1', fontSize: '1.5rem' }}>BLUE ITEM</button>
        <button onClick={handleAction} className="glass-panel" style={{ padding: '40px', background: '#ff4d4d22', color: '#ff4d4d', fontSize: '1.5rem' }}>RED ITEM</button>
      </div>
      <p style={{ marginTop: '20px' }}>Followed: {score}/{targetScore}</p>
    </div>
  );
}

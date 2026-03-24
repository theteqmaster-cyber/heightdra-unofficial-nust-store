"use client";
import { useState, useEffect } from 'react';

const QUESTIONS = [
  { q: "Is 15 divisible by 3?", a: true },
  { q: "Is blue a warm color?", a: false },
  { q: "Is Zimbabwe in Africa?", a: true },
  { q: "Does water boil at 50°C?", a: false },
  { q: "Is coding fun?", a: true },
  { q: "Is Earth flat?", a: false },
  { q: "Is 7 a prime number?", a: true },
  { q: "Are cats birds?", a: false },
  { q: "Is the sun a planet?", a: false },
  { q: "Does 5 + 5 = 11?", a: false }
];

const TRICK_QUESTIONS = [
  { q: "Is a square a rectangle?", a: true },
  { q: "Do plants eat sunlight?", a: true },
  { q: "Is the moon a light source?", a: false },
  { q: "Is 1 a prime number?", a: false },
  { q: "Can penguins fly?", a: false }
];

export default function QuickDecision({ level, onWin, onLoss }) {
  const targetStreak = Math.min(15, 5 + Math.floor(level / 3));
  const [currentQ, setCurrentQ] = useState(null);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3);

  const nextQuestion = () => {
    const bank = level > 12 ? [...QUESTIONS, ...TRICK_QUESTIONS] : QUESTIONS;
    const q = bank[Math.floor(Math.random() * bank.length)];
    setCurrentQ(q);
    setTimeLeft(Math.max(1, 3.5 - level / 10));
  };

  useEffect(() => {
    nextQuestion();
  }, [level]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onLoss();
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => Math.max(0, t - 0.1)), 100);
    return () => clearInterval(timer);
  }, [timeLeft, onLoss]);

  const handleAnswer = (ans) => {
    if (ans === currentQ.a) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak >= targetStreak) {
        onWin(3, 1000);
      } else {
        nextQuestion();
      }
    } else {
      onLoss();
    }
  };

  return (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <div style={{ 
        width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', 
        borderRadius: '4px', marginBottom: '30px', overflow: 'hidden' 
      }}>
        <div style={{ 
          height: '100%', background: timeLeft < 1 ? '#ff4d4d' : 'var(--accent-primary)',
          width: `${(timeLeft / (3.5 - level / 10)) * 100}%`,
          transition: 'width 0.1s linear'
        }}></div>
      </div>

      <h3 style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>Streak: {streak} / {targetStreak}</h3>
      
      <div className="glass-panel" style={{ padding: '60px', borderRadius: '24px', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2.5rem', minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {currentQ?.q}
        </h2>
      </div>

      <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>
        <button 
          onClick={() => handleAnswer(true)}
          style={{
            padding: '20px 60px', fontSize: '2rem', borderRadius: '16px', border: 'none',
            background: 'var(--accent-primary)', color: '#000', fontWeight: 'bold', cursor: 'pointer',
            transition: 'transform 0.1s'
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.9)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          YES
        </button>
        <button 
          onClick={() => handleAnswer(false)}
          style={{
            padding: '20px 60px', fontSize: '2rem', borderRadius: '16px', border: 'none',
            background: '#ff4d4d', color: '#fff', fontWeight: 'bold', cursor: 'pointer',
            transition: 'transform 0.1s'
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.9)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          NO
        </button>
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from 'react';

const SENTENCES = [
  "The quick brown fox jumps over the lazy dog.",
  "Heightdra Chill Zone is the best spot for NUST students.",
  "Coding mini-games is a great way to boost your resume.",
  "Relax your mind and flex your brain with these challenges.",
  "Zimbabwean students are engineering the future of tech.",
  "Don't doom scroll, play a quick game instead.",
  "Consistency is the key to mastering any skill.",
  "Fast typing saves time and increases productivity."
];

export default function TypingSprint({ level, onWin, onLoss }) {
  const [target, setTarget] = useState("");
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(15);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const idx = Math.floor(Math.random() * SENTENCES.length);
    let text = SENTENCES[idx];
    if (level < 5) text = text.split(" ").slice(0, 4).join(" ");
    if (level > 20) text = text + " " + text;
    setTarget(text);
    
    setTimeLeft(Math.max(5, 20 - Math.floor(level / 2)));
    setInput("");
    setIsActive(false);
  }, [level]);

  useEffect(() => {
    if (!isActive) return;
    if (timeLeft <= 0) {
      onLoss();
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isActive, onLoss]);

  const handleChange = (e) => {
    if (!isActive) setIsActive(true);
    const val = e.target.value;
    setInput(val);
    if (val === target) {
      onWin(3, timeLeft * 200);
    }
  };

  return (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <h3 style={{ color: timeLeft <= 5 ? '#ff4d4d' : 'var(--accent-primary)', marginBottom: '20px' }}>
        Time: {timeLeft}s
      </h3>
      <div className="glass-panel" style={{ padding: '30px', borderRadius: '24px', marginBottom: '30px', textAlign: 'left' }}>
        <p style={{ fontSize: '1.5rem', lineHeight: '1.6', marginBottom: '20px', color: 'var(--text-secondary)', position: 'relative' }}>
          {target.split("").map((char, i) => {
            let color = 'var(--text-secondary)';
            if (i < input.length) {
              color = input[i] === char ? 'var(--accent-primary)' : '#ff4d4d';
            }
            return <span key={i} style={{ color, borderBottom: i === input.length ? '2px solid var(--accent-primary)' : 'none' }}>{char}</span>;
          })}
        </p>
        <textarea 
          autoFocus
          value={input}
          onChange={handleChange}
          style={{
            width: '100%', padding: '15px', borderRadius: '12px', background: 'rgba(0,0,0,0.3)',
            color: 'white', border: '1px solid var(--panel-border)', fontSize: '1.2rem', outline: 'none',
            resize: 'none', height: '100px'
          }}
          placeholder="Start typing..."
        />
      </div>
    </div>
  );
}

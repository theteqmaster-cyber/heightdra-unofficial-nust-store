"use client";
import { useState, useEffect } from 'react';

const WORDS_EASY = ['CAT', 'DOG', 'HAT', 'SUN', 'ZIP', 'FOX', 'BUS'];
const WORDS_MED = ['CAMPUS', 'STUDENT', 'LIBRARY', 'DEGREE', 'EXAMS', 'LAPTOP'];
const WORDS_HARD = ['UNIVERSITY', 'ASSIGNMENT', 'ENGINEERING', 'GRADUATION', 'PROGRAMMING'];

export default function WordScramble({ level, onWin, onLoss }) {
  const [word, setWord] = useState('');
  const [scrambled, setScrambled] = useState('');
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    let bank = WORDS_EASY;
    if (level > 7) bank = WORDS_MED;
    if (level > 15) bank = WORDS_HARD;
    if (level > 22) bank = [...WORDS_MED, ...WORDS_HARD];

    const target = bank[Math.floor(Math.random() * bank.length)];
    setWord(target);

    let arr = target.split('');
    // Scramble until different
    let shuff = '';
    do {
      let temp = [...arr];
      for(let i = temp.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [temp[i], temp[j]] = [temp[j], temp[i]];
      }
      shuff = temp.join('');
    } while(shuff === target && target.length > 2);
    
    setScrambled(shuff);
    setTimeLeft(Math.max(5, 25 - Math.floor(level / 2)));
    setInput('');
  }, [level]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onLoss();
      return;
    }
    const t = setInterval(() => setTimeLeft(x => x - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft, onLoss]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.toUpperCase().trim() === word) {
      onWin(3, timeLeft * 100);
    } else {
      setInput('');
      setTimeLeft(x => x - 3); // penalty
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ color: timeLeft <= 5 ? '#ff4d4d' : 'var(--accent-primary)', marginBottom: '20px' }}>
        Time: {timeLeft}s
      </h3>
      <div className="glass-panel" style={{ padding: '40px', borderRadius: '24px' }}>
        <h1 style={{ fontSize: '4rem', letterSpacing: '10px', marginBottom: '30px', color: 'var(--text-primary)' }}>
          {scrambled}
        </h1>
        <form onSubmit={handleSubmit}>
          <input 
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Unscramble..."
            autoFocus
            style={{
              fontSize: '2rem', padding: '15px 30px', borderRadius: '50px',
              border: '2px solid var(--panel-border)', background: 'rgba(0,0,0,0.3)',
              color: 'white', textAlign: 'center', outline: 'none', width: '100%', maxWidth: '400px'
            }}
          />
        </form>
      </div>
    </div>
  );
}

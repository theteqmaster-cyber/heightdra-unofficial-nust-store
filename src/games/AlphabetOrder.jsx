"use client";
import { useState, useEffect } from 'react';

export default function AlphabetOrder({ level, onWin, onLoss }) {
  const count = Math.min(10, 3 + Math.floor(level / 4));
  const [letters, setLetters] = useState([]);
  const [expected, setExpected] = useState('');

  const generate = () => {
    const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const sub = alpha.split('').sort(() => Math.random() - 0.5).slice(0, count);
    setLetters(sub);
    setExpected([...sub].sort()[0]);
  };

  useEffect(() => {
    generate();
  }, [level, count]);

  const select = (l) => {
    const sorted = [...letters].sort();
    const currentIdx = sorted.indexOf(l);
    const firstRemainingIdx = letters.map(char => sorted.indexOf(char)).sort((a,b) => a-b)[0];
    
    if (currentIdx === firstRemainingIdx) {
      const nextLetters = letters.filter(char => char !== l);
      if (nextLetters.length === 0) onWin(3, 1000);
      else {
        setLetters(nextLetters);
        const nextSorted = [...nextLetters].sort();
        setExpected(nextSorted[0]);
      }
    } else {
      onLoss();
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px' }}>Tap in alphabetical order!</h3>
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {letters.map((l, i) => (
          <div 
            key={l}
            onClick={() => select(l)}
            className="glass-panel"
            style={{ 
              width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem', cursor: 'pointer', color: 'var(--accent-primary)'
            }}
          >
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}

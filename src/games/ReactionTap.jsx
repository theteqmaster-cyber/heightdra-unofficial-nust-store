"use client";
import { useState, useEffect, useRef } from 'react';

export default function ReactionTap({ level, onWin, onLoss }) {
  const [state, setState] = useState('waiting'); // waiting, ready, too_early, won
  const [reactionTime, setReactionTime] = useState(null);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    // Random delay between 2 to 5 seconds
    const delay = Math.random() * 3000 + 2000;
    
    // Fake outs for high levels
    const hasFakeOut = level > 10 && Math.random() > 0.5;

    timerRef.current = setTimeout(() => {
      if (hasFakeOut) {
        setState('fake');
        setTimeout(() => {
          if (state !== 'too_early') {
            setState('waiting_again');
            timerRef.current = setTimeout(() => {
              setState('ready');
              startTimeRef.current = Date.now();
            }, Math.random() * 2000 + 1000);
          }
        }, 800);
      } else {
        setState('ready');
        startTimeRef.current = Date.now();
      }
    }, delay);

    return () => clearTimeout(timerRef.current);
  }, [level]);

  const handleTap = () => {
    if (state === 'waiting' || state === 'fake' || state === 'waiting_again') {
      clearTimeout(timerRef.current);
      setState('too_early');
      setTimeout(onLoss, 1000);
    } else if (state === 'ready') {
      const time = Date.now() - startTimeRef.current;
      setReactionTime(time);
      setState('won');
      
      // Target time gets tighter as level increases
      const targetTime = Math.max(200, 800 - level * 15);
      
      if (time <= targetTime || level < 5) {
        setTimeout(() => onWin(3, Math.max(10, 1000 - time)), 1000);
      } else {
        setTimeout(onLoss, 1000);
      }
    }
  };

  let bg = 'var(--panel-bg)';
  let text = 'WAIT FOR GREEN...';
  if (state === 'ready') { bg = '#66fcf1'; text = 'TAP NOW!'; }
  if (state === 'fake') { bg = '#ff4d4d'; text = 'NO WAIT!'; }
  if (state === 'too_early') { bg = '#ff4d4d'; text = 'TOO EARLY!'; }
  if (state === 'won') { bg = '#fcd116'; text = `${reactionTime}ms!`; }

  return (
    <div 
      onClick={handleTap}
      style={{
        width: '100%', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: bg, borderRadius: '24px', cursor: 'pointer', transition: 'background 0.1s',
        boxShadow: state === 'ready' ? '0 0 50px #66fcf1' : 'none',
        color: state === 'ready' ? '#000' : 'white',
        fontSize: '3rem', fontWeight: 'bold'
      }}
    >
      {text}
    </div>
  );
}

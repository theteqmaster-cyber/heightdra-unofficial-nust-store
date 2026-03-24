"use client";
import { useState, useEffect } from 'react';

const GOOD = ['🍕', '🍔', '🍎', '🍣', '🍦'];
const BAD = ['💣', '💩', '💀', '🔥'];

export default function CatchFood({ level, onWin, onLoss }) {
  const [items, setItems] = useState([]);
  const [score, setScore] = useState(0);
  const targetScore = Math.min(20, 5 + level);
  const [playerX, setPlayerX] = useState(50);

  const spawn = () => {
    const isGood = Math.random() > 0.3;
    return {
      id: Math.random(),
      icon: isGood ? GOOD[Math.floor(Math.random() * GOOD.length)] : BAD[Math.floor(Math.random() * BAD.length)],
      isGood,
      x: Math.random() * 90 + 5,
      y: -10,
      speed: Math.random() * 2 + 2 + level / 10
    };
  };

  useEffect(() => {
    const t = setInterval(() => {
      setItems(prev => [...prev, spawn()]);
    }, 800 - level * 10);
    return () => clearInterval(t);
  }, [level]);

  useEffect(() => {
    const move = setInterval(() => {
      setItems(prev => {
        return prev.map(item => ({ ...item, y: item.y + item.speed }))
          .filter(item => {
            if (item.y > 90) {
              if (Math.abs(item.x - playerX) < 10) {
                if (item.isGood) setScore(s => s + 1);
                else onLoss();
                return false;
              }
              if (item.y > 110) {
                if (item.isGood) onLoss();
                return false;
              }
            }
            return true;
          });
      });
    }, 30);
    return () => clearInterval(move);
  }, [playerX, onLoss]);

  useEffect(() => {
    if (score >= targetScore) onWin(3, 1000);
  }, [score, targetScore]);

  return (
    <div 
      onMouseMove={e => {
        const { left, width } = e.currentTarget.getBoundingClientRect();
        setPlayerX(((e.clientX - left) / width) * 100);
      }}
      style={{ position: 'relative', width: '100%', height: '400px', background: 'rgba(0,0,0,0.5)', borderRadius: '24px', overflow: 'hidden' }}
    >
      <h3 style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10 }}>Score: {score}/{targetScore}</h3>
      {items.map(item => (
        <div key={item.id} style={{ position: 'absolute', left: `${item.x}%`, top: `${item.y}%`, fontSize: '2rem', transform: 'translateX(-50%)' }}>
          {item.icon}
        </div>
      ))}
      <div style={{ position: 'absolute', bottom: '10px', left: `${playerX}%`, fontSize: '3rem', transform: 'translateX(-50%)' }}>
        🛒
      </div>
    </div>
  );
}

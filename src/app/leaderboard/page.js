"use client";
import { useState, useEffect } from 'react';

const MOCK_LEADERBOARD = Array(20).fill(0).map((_, i) => ({
  rank: i + 1,
  name: `Student_${Math.floor(Math.random() * 9000) + 1000}`,
  stars: 270 - (i * 12) + Math.floor(Math.random() * 5),
})).sort((a,b) => b.stars - a.stars).map((u, i) => ({...u, rank: i+1}));

export default function Leaderboard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', padding: '40px 0' }}>
      <h1 className="title-glow" style={{ fontSize: '3.5rem', textAlign: 'center', marginBottom: '40px', letterSpacing: '2px' }}>Global Top 20</h1>
      
      <div className="glass-panel" style={{ padding: '10px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 100px', padding: '15px 30px', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', fontWeight: 'bold', letterSpacing: '1px' }}>
          <div>RANK</div>
          <div>PLAYER</div>
          <div style={{ textAlign: 'right' }}>STARS</div>
        </div>
        
        {MOCK_LEADERBOARD.map((user, idx) => (
          <div 
            key={idx} 
            style={{ 
              display: 'grid', gridTemplateColumns: '80px 1fr 100px', padding: '15px 30px', 
              borderBottom: idx === 19 ? 'none' : '1px solid rgba(255,255,255,0.05)',
              alignItems: 'center',
              background: idx === 0 ? 'rgba(252, 209, 22, 0.1)' : idx === 1 ? 'rgba(224, 224, 224, 0.08)' : idx === 2 ? 'rgba(205, 127, 50, 0.08)' : 'transparent',
              transition: 'all 0.2s ease',
              borderRadius: idx === 0 ? '12px 12px 0 0' : idx === 19 ? '0 0 12px 12px' : '0'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.transform = 'scale(1.01)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = idx === 0 ? 'rgba(252, 209, 22, 0.1)' : idx === 1 ? 'rgba(224, 224, 224, 0.08)' : idx === 2 ? 'rgba(205, 127, 50, 0.08)' : 'transparent';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <div style={{ 
              fontSize: '1.4rem', fontWeight: 'bold', 
              color: idx === 0 ? '#fcd116' : idx === 1 ? '#e0e0e0' : idx === 2 ? '#cd7f32' : 'var(--text-secondary)',
              textShadow: idx < 3 ? `0 0 10px ${idx === 0 ? '#fcd116' : idx === 1 ? '#e0e0e0' : '#cd7f32'}` : 'none'
            }}>
              #{user.rank}
            </div>
            <div style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: idx < 3 ? 'bold' : 'normal' }}>
              {user.name} {idx === 0 && '👑'} {idx === 1 && '🥈'} {idx === 2 && '🥉'}
            </div>
            <div style={{ textAlign: 'right', color: 'var(--nust-accent)', fontWeight: 'bold', fontSize: '1.2rem', textShadow: '0 0 10px rgba(252, 209, 22, 0.4)' }}>
              {user.stars} ★
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

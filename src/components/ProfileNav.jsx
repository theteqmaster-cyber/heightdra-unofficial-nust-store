"use client";
import { useState, useEffect } from 'react';
import { getTotalStars } from '@/lib/store';

export default function ProfileNav() {
  const [stars, setStars] = useState(0);

  useEffect(() => {
    setStars(getTotalStars());
    
    const handleUpdate = () => {
      setStars(getTotalStars());
    };

    window.addEventListener('starsUpdated', handleUpdate);
    return () => window.removeEventListener('starsUpdated', handleUpdate);
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(255,255,255,0.05)', padding: '5px 15px', borderRadius: '30px', border: '1px solid var(--panel-border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--accent-primary)', fontWeight: 'bold' }}>
        <span style={{ fontSize: '1.2rem' }}>★</span>
        <span style={{ fontSize: '1.1rem' }}>{stars}</span>
      </div>
      <div style={{ 
        width: '35px', height: '35px', borderRadius: '50%', background: 'linear-gradient(45deg, var(--accent-primary), var(--nust-accent))',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'
      }}>
        👤
      </div>
    </div>
  );
}

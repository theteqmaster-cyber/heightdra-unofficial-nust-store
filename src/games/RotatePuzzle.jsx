"use client";
import { useState, useEffect } from 'react';

export default function RotatePuzzle({ level, onWin, onLoss }) {
  const pieceCount = Math.min(12, 2 + Math.floor(level / 4));
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const p = Array.from({ length: pieceCount }, (_, i) => ({
      id: i,
      rotation: (Math.floor(Math.random() * 3) + 1) * 90 // 90, 180, 270
    }));
    setPieces(p);
  }, [level, pieceCount]);

  const rotatePiece = (id) => {
    setPieces(prev => {
      const next = prev.map(p => {
        if (p.id === id) {
          const newRot = (p.rotation + 90) % 360;
          return { ...p, rotation: newRot };
        }
        return p;
      });
      
      if (next.every(p => p.rotation === 0)) {
        setTimeout(() => onWin(3, 1000), 500);
      }
      return next;
    });
  };

  const cols = Math.ceil(Math.sqrt(pieceCount));

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '30px', color: 'var(--text-secondary)' }}>Click pieces to rotate them into position</h3>
      <div style={{
        display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '20px',
        padding: '30px', background: 'var(--panel-bg)', borderRadius: '24px', border: '1px solid var(--panel-border)'
      }}>
        {pieces.map(p => (
          <div 
            key={p.id}
            onClick={() => rotatePiece(p.id)}
            style={{
              width: '80px', height: '80px', background: 'rgba(255,255,255,0.05)',
              border: `2px solid ${p.rotation === 0 ? 'var(--accent-primary)' : 'rgba(255,255,255,0.2)'}`,
              borderRadius: '12px', cursor: 'pointer', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: `rotate(${p.rotation}deg) scale(${p.rotation === 0 ? 1.05 : 1})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: p.rotation === 0 ? '0 0 20px rgba(102, 252, 241, 0.4)' : 'none'
            }}
          >
            <div style={{ width: '40px', height: '4px', background: 'var(--accent-primary)' }}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from 'react';

const SHAPES = ['▲', '■', '◆', '▼', '◀', '▶'];

export default function RotateShapeMatch({ level, onWin, onLoss }) {
  const [targetShape, setTargetShape] = useState('');
  const [targetRotation, setTargetRotation] = useState(0);
  const [currentRotation, setCurrentRotation] = useState(0);

  useEffect(() => {
    setTargetShape(SHAPES[Math.floor(Math.random() * SHAPES.length)]);
    setTargetRotation((Math.floor(Math.random() * 3) + 1) * 90);
    setCurrentRotation(0);
  }, [level]);

  const rotate = () => {
    const next = (currentRotation + 90) % 360;
    setCurrentRotation(next);
    if (next === targetRotation) {
      onWin(3, 1000);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px' }}>Match the target rotation!</h3>
      <div style={{ display: 'flex', gap: '60px', justifyContent: 'center', alignItems: 'center', marginBottom: '40px' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>TARGET</p>
          <div style={{ 
            width: '100px', height: '100px', fontSize: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: `rotate(${targetRotation}deg)`, opacity: 0.5, border: '2px dashed var(--panel-border)', borderRadius: '12px'
          }}>
            {targetShape}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--accent-primary)', marginBottom: '10px' }}>YOURS</p>
          <div 
            onClick={rotate}
            className="glass-panel"
            style={{ 
              width: '100px', height: '100px', fontSize: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: `rotate(${currentRotation}deg)`, cursor: 'pointer', transition: 'transform 0.3s'
            }}
          >
            {targetShape}
          </div>
        </div>
      </div>
      <p style={{ color: 'var(--text-secondary)' }}>Click your shape to rotate it.</p>
    </div>
  );
}

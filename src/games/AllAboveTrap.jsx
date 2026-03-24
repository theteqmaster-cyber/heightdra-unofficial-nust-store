"use client";
import { useState, useEffect } from 'react';

export default function AllAboveTrap({ level, onWin, onLoss }) {
  const q = "Which of these is a fruit?";
  const options = ["Apple", "Orange", "Banana", "All of the Above"];
  const correct = "All of the Above";

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px' }}>Classic MCQ Trap 🤔</h3>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '60px' }}>{q}</h2>
      <div style={{ display: 'grid', gap: '15px' }}>
        {options.map(o => (
          <button key={o} onClick={() => o === correct ? onWin(3, 1000) : onLoss()} className="glass-panel" style={{ padding: '25px', color: 'white', fontSize: '1.2rem' }}>{o}</button>
        ))}
      </div>
    </div>
  );
}

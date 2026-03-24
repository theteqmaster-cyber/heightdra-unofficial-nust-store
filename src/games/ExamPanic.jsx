"use client";
import { useState, useEffect } from 'react';

export default function ExamPanic({ level, onWin, onLoss }) {
  const q = "What's the first thing you forget in the exam hall?";
  const options = ["Your Name", "The Formula", "Everything", "Where you are"];
  const answer = "Everything";

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px' }}>Exam Panic Mode 📚</h3>
      <h2 style={{ fontSize: '2.2rem', marginBottom: '50px' }}>{q}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {options.map(o => (
          <button key={o} onClick={() => o === answer ? onWin(3, 5000) : onLoss()} className="glass-panel" style={{ padding: '30px', color: 'white' }}>{o}</button>
        ))}
      </div>
    </div>
  );
}

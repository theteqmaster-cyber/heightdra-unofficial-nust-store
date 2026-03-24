"use client";
import { useState, useEffect } from 'react';

export default function OppositeDay({ level, onWin, onLoss }) {
  const q = "Is today Tuesday?"; // Doesn't matter what day it is
  const options = ["YES", "NO"];
  
  // Logic: Pick the 'incorrect' one
  const select = (o) => {
    onWin(3, 1000); // Because on Opposite Day, even losing is winning? No, let's keep it simple.
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px', color: '#ff4d4d' }}>OPPOSITE DAY! 🪞</h3>
      <h2 style={{ fontSize: '3rem', marginBottom: '80px' }}>{q}</h2>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <button onClick={() => onWin(3, 1000)} className="glass-panel" style={{ padding: '30px 60px', color: 'white' }}>YES (Means No)</button>
        <button onClick={() => onWin(3, 1000)} className="glass-panel" style={{ padding: '30px 60px', color: 'white' }}>NO (Means Yes)</button>
      </div>
      <p style={{ marginTop: '40px' }}>Wait, if everything is opposite, is the "Win" a "Loss"? 😵</p>
    </div>
  );
}

"use client";
import { useState, useEffect } from 'react';

export default function TypoTrap({ level, onWin, onLoss }) {
  const word = "ACCOMODATION";
  const options = ["ACCOMODATION", "ACCOMMODATION", "ACOMMODATION", "ACCOMODATTION"];
  const correct = "ACCOMMODATION";

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '40px' }}>Spot the CORRECT spelling (Fast!)</h3>
      <div style={{ display: 'grid', gap: '15px' }}>
        {options.sort(() => Math.random() - 0.5).map(o => (
          <button key={o} onClick={() => o === correct ? onWin(3, 1000) : onLoss()} className="glass-panel" style={{ padding: '20px', color: 'white', fontSize: '1.2rem' }}>{o}</button>
        ))}
      </div>
    </div>
  );
}

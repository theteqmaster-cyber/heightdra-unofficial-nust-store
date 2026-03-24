"use client";
import { useState, useEffect } from 'react';

export default function MissingNumber({ level, onWin, onLoss }) {
  const [seq, setSeq] = useState([]);
  const [missingIdx, setMissingIdx] = useState(-1);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const len = 5;
    const start = Math.floor(Math.random() * 50) + 1;
    const step = Math.floor(Math.random() * 5) + 1;
    const full = Array.from({ length: len }, (_, i) => start + i * step);
    const mIdx = Math.floor(Math.random() * len);
    setMissingIdx(mIdx);
    setSeq(full);

    const mVal = full[mIdx];
    const opts = [mVal, mVal + step, mVal - step, mVal + 2];
    setOptions(opts.sort(() => Math.random() - 0.5));
  }, [level]);

  const select = (val) => {
    if (val === seq[missingIdx]) onWin(3, 1000);
    else onLoss();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '3rem', letterSpacing: '20px', marginBottom: '40px' }}>
        {seq.map((v, i) => (i === missingIdx ? "?" : v)).join(" ")}
      </h2>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        {options.map((o, i) => (
          <button key={i} onClick={() => select(o)} className="glass-panel" style={{ padding: '20px 40px', fontSize: '1.5rem', color: 'white', cursor: 'pointer' }}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

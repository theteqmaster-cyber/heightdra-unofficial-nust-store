"use client";
import { useState, useEffect } from 'react';

const DESIGNS = [
  "   *   \n  ***  \n ***** \n   *   ",
  " *   * \n  * *  \n   *   \n  * *  ",
  " ***** \n *     \n ***** \n     * ",
  " * * * \n  * *  \n * * * \n  * *  "
];

export default function MirrorMatch({ level, onWin, onLoss }) {
  const [design, setDesign] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const d = DESIGNS[Math.floor(Math.random() * DESIGNS.length)];
    setDesign(d);
    
    // Create mirrored and random variants
    const mirrored = d.split("\n").map(line => line.split("").reverse().join("")).join("\n");
    const fake = d.split("\n").reverse().join("\n");
    
    setOptions([mirrored, fake, d].sort(() => Math.random() - 0.5));
  }, [level]);

  const select = (opt) => {
    const mirrored = design.split("\n").map(line => line.split("").reverse().join("")).join("\n");
    if (opt === mirrored) onWin(3, 1000);
    else onLoss();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px' }}>Pick the mirrored version!</h3>
      <pre style={{ 
        background: 'rgba(0,0,0,0.5)', padding: '20px', borderRadius: '12px', display: 'inline-block',
        fontSize: '1.2rem', color: 'var(--accent-primary)', border: '1px solid var(--panel-border)', marginBottom: '40px'
      }}>
        {design}
      </pre>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        {options.map((opt, i) => (
          <button 
            key={i} 
            onClick={() => select(opt)} 
            className="glass-panel" 
            style={{ padding: '15px', cursor: 'pointer', fontFamily: 'monospace', fontSize: '0.8rem', color: 'white' }}
          >
            <pre>{opt}</pre>
          </button>
        ))}
      </div>
    </div>
  );
}

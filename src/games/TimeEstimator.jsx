"use client";
import { useState, useEffect, useRef } from 'react';

export default function TimeEstimator({ level, onWin, onLoss }) {
  const targetTime = Math.floor(Math.random() * 5) + 3 + (level % 5);
  const [state, setState] = useState('idle'); // idle, running, finished
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const requestRef = useRef();

  const animate = (time) => {
    if (startTime) {
      setElapsed((Date.now() - startTime) / 1000);
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [startTime]);

  const handleAction = () => {
    if (state === 'idle') {
      setStartTime(Date.now());
      setState('running');
    } else if (state === 'running') {
      const endTime = Date.now();
      const finalElapsed = (endTime - startTime) / 1000;
      setElapsed(finalElapsed);
      setState('finished');
      
      const diff = Math.abs(finalElapsed - targetTime);
      const tolerance = Math.max(0.1, 0.8 - level * 0.025);

      if (diff <= tolerance) {
        onWin(3, Math.floor((1 - diff) * 1000));
      } else {
        setTimeout(onLoss, 1500);
      }
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Estimate {targetTime} Seconds</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>Press to start, press again when you think time is up!</p>
      
      <div className="glass-panel" style={{ padding: '60px', borderRadius: '50%', width: '300px', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto', border: state === 'running' ? '2px solid var(--accent-primary)' : '1px solid var(--panel-border)', boxShadow: state === 'running' ? '0 0 30px rgba(102, 252, 241, 0.3)' : 'none' }}>
        {state === 'idle' && <span style={{ fontSize: '1.5rem' }}>READY?</span>}
        {state === 'running' && <span style={{ fontSize: '4rem', color: 'rgba(255,255,255,0.05)' }}>...</span>}
        {state === 'finished' && (
          <div style={{ animation: 'bounce 0.5s' }}>
            <span style={{ fontSize: '3rem', display: 'block' }}>{elapsed.toFixed(2)}s</span>
            <span style={{ color: 'var(--text-secondary)' }}>Off by {Math.abs(elapsed - targetTime).toFixed(2)}s</span>
          </div>
        )}
      </div>

      <button 
        onClick={handleAction}
        disabled={state === 'finished'}
        style={{
          marginTop: '40px', padding: '20px 60px', borderRadius: '50px',
          background: state === 'running' ? '#ff4d4d' : 'var(--accent-primary)',
          color: state === 'running' ? 'white' : '#000',
          fontSize: '1.5rem', fontWeight: 'bold', border: 'none', cursor: 'pointer',
          transition: 'all 0.2s'
        }}
      >
        {state === 'idle' ? 'START TIMER' : state === 'running' ? 'STOP NOW!' : 'CHECKING...'}
      </button>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}

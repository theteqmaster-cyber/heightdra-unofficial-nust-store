export function saveProgress(gameId, level, stars, score) {
  if (typeof window === 'undefined') return;
  const key = `brainflex_progress_${gameId}`;
  const data = JSON.parse(localStorage.getItem(key) || '{}');
  
  const oldStars = data[level]?.stars || 0;
  if (!data[level] || data[level].stars < stars) {
    data[level] = { stars, score };
    localStorage.setItem(key, JSON.stringify(data));
    
    // Update total stars
    const totalKey = 'brainflex_total_stars';
    const currentTotal = parseInt(localStorage.getItem(totalKey) || '0');
    localStorage.setItem(totalKey, (currentTotal + (stars - oldStars)).toString());
    
    // Trigger custom event for UI update
    window.dispatchEvent(new Event('starsUpdated'));
  }
}

export function getTotalStars() {
  if (typeof window === 'undefined') return 0;
  return parseInt(localStorage.getItem('brainflex_total_stars') || '0');
}

export function getProgress(gameId) {
  if (typeof window === 'undefined') return {};
  const key = `brainflex_progress_${gameId}`;
  return JSON.parse(localStorage.getItem(key) || '{}');
}

export function getUser() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('brainflex_user') || 'Guest Player';
}

import styles from "./page.module.css";
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.watermark}></div>
      
      <section className={styles.hero}>
        <h1 className="title-glow" style={{ fontSize: '4.5rem', marginBottom: '10px' }}>Heightdra Chill Zone</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>Engineered by students. Built for the NUST community.</p>
        <Link href="/games" className={styles.smallPlay}>Quick Play ➔</Link>
      </section>

      <div className={styles.presentation}>
        <section className={styles.section}>
          <h2>The Problem 😫</h2>
          <p>
            Library sessions that never end. Assignments stacking like mountains. 
            NUST life is a high-speed sprint, but sometimes your brain just needs a quality 2-minute reset 
            from the endless PDF scrolls and lecture notes.
          </p>
        </section>

        <section className={styles.section} style={{ borderColor: 'var(--accent-primary)' }}>
          <h2>The Solution: Chill Zone 🧊</h2>
          <p>
            A frictionless, premium mini-game vault designed to refuel your mental energy. 
            No logins, no ads, no complexity. Just pure brain-flexing fun that feels as premium as your top-tier degree.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Engineered Features ✨</h2>
          <p>Built with modern web tech to ensure your break is as smooth as possible.</p>
          <div className={styles.featureList}>
            <div className={styles.featureItem}>⚡ 53 Active Games</div>
            <div className={styles.featureItem}>🏆 30 Scalable Levels</div>
            <div className={styles.featureItem}>⭐ Global Star Counter</div>
            <div className={styles.featureItem}>🛸 Glassmorphic UI</div>
            <div className={styles.featureItem}>🔏 100% Privacy</div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Why Chill Zone? 🎯</h2>
          <p>
            Instead of doom-scrolling TikTok for 2 hours, spend 2 minutes playing a reflex or logic game. 
            It improves focus, settles the nerves, and keeps you sharp for your next academic conquest.
          </p>
        </section>

        <section className={`${styles.section} ${styles.warningSection}`}>
          <h2 style={{ color: '#ff4d4d' }}>School is Priority! 🚧</h2>
          <p>
            Success is the ultimate goal. Don't get too addicted! 
            Chill Zone is here for the breaks between study sessions, not for the lectures. 
            <strong>Study hard, play chill, stay winning.</strong>
          </p>
        </section>

        <section className={styles.section} style={{ textAlign: 'center', border: 'none', background: 'none' }}>
          <h2 style={{ justifyContent: 'center' }}>Take a Break, You Deserve It</h2>
          <p>Ready to enter the vault and flex your brain?</p>
          <Link href="/games" className={styles.playBtnPrimary}>PLAY NOW 🚀</Link>
          <p style={{ marginTop: '50px', opacity: 0.5, fontSize: '0.9rem' }}>engineered by mphathisi ndlovu</p>
        </section>
      </div>
    </div>
  );
}

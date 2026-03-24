import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Heightdra Chill Zone",
  description: "Built by students, for students. A relaxing web app with mini-games.",
};

import Link from "next/link";
import ProfileNav from "@/components/ProfileNav";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <nav className="glass-panel" style={{ margin: '20px', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <h2 className="title-glow" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>Heightdra Chill Zone</h2>
            </Link>
            <ProfileNav />
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="/games" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>Games Vault</a>
            <a href="/leaderboard" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}>Leaderboard</a>
          </div>
        </nav>
        
        <main style={{ padding: '0 20px', flex: 1, display: 'flex', flexDirection: 'column', zIndex: 5 }}>
          {children}
        </main>

        <footer style={{ marginTop: 'auto', padding: '30px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', borderTop: '1px solid var(--panel-border)', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', zIndex: 10 }}>
          <p style={{ marginBottom: '10px', fontSize: '1.1rem' }}>
            engineered by <a href="https://portfolio-site-for-mphatic-teqmaste.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 'bold' }}>mphathisi</a>
          </p>
          <p>© {new Date().getFullYear()} Heightdra • +263787146103</p>
        </footer>
      </body>
    </html>
  );
}

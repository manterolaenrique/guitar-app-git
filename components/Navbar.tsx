'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Guitar, Music2, Info } from 'lucide-react';

const Navbar = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const pathname = usePathname();

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link href="/" className={`nav-btn ${pathname === '/' ? 'active' : ''}`}>
          <Home className="nav-icon" />
          <span>Inicio</span>
        </Link>
        <Link href="/tuner" className={`nav-btn ${pathname === '/tuner' ? 'active' : ''}`}>
          <Guitar className="nav-icon" />
          <span>Afinador</span>
        </Link>
        <Link href="/chords" className={`nav-btn ${pathname === '/chords' ? 'active' : ''}`}>
          <Music2 className="nav-icon" />
          <span>Triadas</span>
        </Link>
        <Link href="/about" className={`nav-btn ${pathname === '/about' ? 'active' : ''}`}>
          <Info className="nav-icon" />
          <span>Sobre Nosotros</span>
        </Link>
      </div>
      <div className="nav-right">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Modo Oscuro' : '☀️ Modo Claro'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

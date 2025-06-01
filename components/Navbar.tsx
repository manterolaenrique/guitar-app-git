'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Guitar, Music2, Info, Circle, Music, Sun, Moon } from 'lucide-react';
import { useMusicNotation } from '../contexts/MusicNotationContext';

const Navbar = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const pathname = usePathname();
  const { notation, toggleNotation } = useMusicNotation();

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
        <Link href="/circle-of-fifths" className={`nav-btn ${pathname === '/circle-of-fifths' ? 'active' : ''}`}>
          <Circle className="nav-icon" />
          <span>Círculo de Quintas</span>
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
        <button className="theme-toggle" onClick={toggleNotation}>
          <Music className="nav-icon" />
          <span>{notation === 'spanish' ? 'Español' : 'Americano'}</span>
        </button>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? <Moon className="nav-icon" /> : <Sun className="nav-icon" />}
          <span>{theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

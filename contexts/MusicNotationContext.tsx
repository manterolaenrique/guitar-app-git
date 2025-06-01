'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type NotationType = 'american' | 'spanish';

interface MusicNotationContextType {
  notation: NotationType;
  toggleNotation: () => void;
}

const MusicNotationContext = createContext<MusicNotationContextType | undefined>(undefined);

export function MusicNotationProvider({ children }: { children: ReactNode }) {
  const [notation, setNotation] = useState<NotationType>('spanish');

  const toggleNotation = () => {
    setNotation(prev => prev === 'spanish' ? 'american' : 'spanish');
  };

  return (
    <MusicNotationContext.Provider value={{ notation, toggleNotation }}>
      {children}
    </MusicNotationContext.Provider>
  );
}

export function useMusicNotation() {
  const context = useContext(MusicNotationContext);
  if (context === undefined) {
    throw new Error('useMusicNotation must be used within a MusicNotationProvider');
  }
  return context;
} 
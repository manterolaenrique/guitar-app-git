import type { Metadata } from 'next';
import ChordInfo from '@/components/ChordInfo';
import { parseChordDeepLink } from '@/data/deepLinks';

export const metadata: Metadata = {
  title: 'Triadas y acordes | GuitarFlow',
  description: 'Explora triadas, cuatriadas, grados e intervalos sobre GuitarFlow.',
};

interface ChordsPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default function ChordsPage({ searchParams }: ChordsPageProps) {
  const initialState = parseChordDeepLink(searchParams);

  return <ChordInfo initialState={initialState} syncUrl />;
} 

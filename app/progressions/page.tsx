import type { Metadata } from 'next';
import ProgressionLab from '@/components/ProgressionLab';
import { parseProgressionDeepLink } from '@/data/deepLinks';

export const metadata: Metadata = {
  title: 'Progresiones armonicas | GuitarFlow',
  description: 'Construye progresiones, analiza funcion tonal y comparte configuraciones por URL.',
};

interface ProgressionsPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default function ProgressionsPage({ searchParams }: ProgressionsPageProps) {
  const initialState = parseProgressionDeepLink(searchParams);

  return <ProgressionLab initialState={initialState} syncUrl />;
}

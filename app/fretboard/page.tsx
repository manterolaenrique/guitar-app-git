import type { Metadata } from 'next';
import ScaleViewer from '@/components/ScaleViewer';
import { parseScaleDeepLink } from '@/data/deepLinks';

export const metadata: Metadata = {
  title: 'Escalas y diapason | GuitarFlow',
  description: 'Visualiza escalas, tonicas e intervalos sobre el diapason con URLs compartibles para estudiar guitarra.',
};

interface FretboardPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default function FretboardPage({ searchParams }: FretboardPageProps) {
  const initialState = parseScaleDeepLink(searchParams);

  return <ScaleViewer initialState={initialState} syncUrl />;
}

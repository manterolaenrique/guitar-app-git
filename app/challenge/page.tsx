import type { Metadata } from 'next';
import ChallengeGame from '@/components/ChallengeGame';
import { PlatformHero } from '@/components/ui/PlatformHero';

export const metadata: Metadata = {
  title: 'GuitarFlow Challenge | GuitarFlow',
  description:
    'Juego musical de GuitarFlow para desafiar conocimientos de teoría, mástil, acordes y progresiones con feedback inmediato.',
};

export default function ChallengePage() {
  return (
    <div className="platform-page challenge-page">
      <PlatformHero
        kicker="DESAFÍO"
        title="GuitarFlow Challenge"
        subtitle="Poné a prueba teoría, mástil y armonía con preguntas rápidas conectadas a la guitarra."
      />

      <ChallengeGame />
    </div>
  );
}

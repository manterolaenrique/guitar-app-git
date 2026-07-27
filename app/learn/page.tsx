import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Dumbbell, Lightbulb, Music4 } from 'lucide-react';
import { PlatformHero } from '@/components/ui/PlatformHero';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { learnCategories } from '@/data/lessons';

export const metadata: Metadata = {
  title: 'Aprender guitarra | GuitarFlow',
  description: 'Tecnica, teoria, improvisacion y practica aplicadas al instrumento con lecciones conectadas a GuitarFlow.',
};

const categoryIcons = {
  technique: Dumbbell,
  theory: BookOpen,
  improvisation: Music4,
  practice: Lightbulb,
};

export default function LearnPage() {
  return (
    <div className="platform-page">
      <PlatformHero
        kicker="APRENDER"
        title="Aprender guitarra"
        subtitle="Tecnica, teoria y practica aplicadas al instrumento."
      />

      <section className="platform-section">
        <SectionHeader
          kicker="CONTENIDO"
          title="Rutas de aprendizaje"
          description="La biblioteca arranca con lecciones reales y deja preparado el indice para crecer sin un CMS externo todavia."
        />

        <div className="learn-category-stack">
          {learnCategories.map((category) => {
            const Icon = categoryIcons[category.id];

            return (
              <section key={category.id} className="learn-category-panel">
                <div className="learn-category-header">
                  <span className="platform-card-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <div>
                    <h2>{category.title}</h2>
                    <p>{category.description}</p>
                  </div>
                </div>

                <div className="learn-topic-grid">
                  {category.topics.map((topic) => {
                    const content = (
                      <>
                        <div className="learn-topic-top">
                          <h3>{topic.title}</h3>
                          <StatusBadge tone="ready">Leccion</StatusBadge>
                        </div>
                        <p>{topic.description}</p>
                        <span className="platform-card-link">
                          Abrir leccion
                          <ArrowRight className="platform-card-link-icon" />
                        </span>
                      </>
                    );

                    return (
                      <Link key={topic.title} href={`/learn/${topic.slug}`} className="learn-topic-card">
                        {content}
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </div>
  );
}

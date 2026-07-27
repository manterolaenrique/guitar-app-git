import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Gauge } from 'lucide-react';
import { PracticeWithGuitarFlow } from '@/components/learn/PracticeWithGuitarFlow';
import { PlatformHero } from '@/components/ui/PlatformHero';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { getCategoryTitle, getLesson, lessons } from '@/data/lessons';

interface LessonPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export function generateMetadata({ params }: LessonPageProps): Metadata {
  const lesson = getLesson(params.slug);

  if (!lesson) {
    return {
      title: 'Leccion | GuitarFlow',
    };
  }

  return {
    title: `${lesson.title} | GuitarFlow`,
    description: lesson.description,
  };
}

export default function LessonPage({ params }: LessonPageProps) {
  const lesson = getLesson(params.slug);

  if (!lesson) notFound();

  return (
    <article className="lesson-page">
      <Link href="/learn" className="platform-back-link">
        <ArrowLeft className="platform-card-link-icon" />
        Volver a aprender
      </Link>

      <PlatformHero
        kicker={getCategoryTitle(lesson.category)}
        title={lesson.title}
        subtitle={lesson.description}
      >
        <div className="lesson-meta-row">
          <StatusBadge>{lesson.level}</StatusBadge>
          <span className="lesson-meta-pill">
            <Clock />
            {lesson.estimatedTime}
          </span>
          <span className="lesson-meta-pill">
            <Gauge />
            Practica guiada
          </span>
        </div>
      </PlatformHero>

      <div className="lesson-layout">
        <div className="lesson-content">
          <LessonBlock title="Concepto" items={lesson.concept} />
          <LessonBlock title="Como practicarlo" items={lesson.practice} />
          <LessonBlock title="Error comun" items={lesson.commonMistakes} />

          <section className="lesson-block">
            <h2>Ejercicio</h2>
            <div className="lesson-exercise-list">
              {lesson.exercises.map((exercise) => (
                <article key={exercise.title} className="lesson-exercise-card">
                  <h3>{exercise.title}</h3>
                  <ol>
                    {exercise.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          </section>

          <LessonBlock title="Checkpoint" items={lesson.checkpoint} />
          <PracticeWithGuitarFlow {...lesson.toolLink} />
        </div>

        <aside className="lesson-side-panel">
          <h2>Tips de estudio</h2>
          <ul>
            {lesson.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </aside>
      </div>
    </article>
  );
}

function LessonBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="lesson-block">
      <h2>{title}</h2>
      {items.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </section>
  );
}

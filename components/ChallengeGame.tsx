'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, RotateCcw, Trophy, XCircle } from 'lucide-react';
import { challengeModes, challengeQuestions, type ChallengeMode, type ChallengeQuestion } from '@/data/challenge';
import { extraChallengeQuestions } from '@/data/challengeExtraQuestions';

interface AnsweredQuestion {
  question: ChallengeQuestion;
  selectedAnswer: string;
  isCorrect: boolean;
}

const QUESTION_COUNT = 10;
const STORAGE_PREFIX = 'guitarflow-challenge-best';
const LAST_QUESTIONS_PREFIX = 'guitarflow-challenge-last-questions';

const shuffle = <T,>(items: T[]) => {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
};

const getBestScoreKey = (modeId: string) => `${STORAGE_PREFIX}-${modeId}`;
const getLastQuestionKey = (modeId: string) => `${LAST_QUESTIONS_PREFIX}-${modeId}`;
const challengeQuestionCatalog = [...challengeQuestions, ...extraChallengeQuestions];

const shuffleQuestionOptions = (question: ChallengeQuestion): ChallengeQuestion => ({
  ...question,
  options: shuffle(question.options),
});

const readStoredQuestionIds = (modeId: string) => {
  try {
    const storedIds = JSON.parse(window.localStorage.getItem(getLastQuestionKey(modeId)) ?? '[]');
    return Array.isArray(storedIds) ? storedIds.filter((id): id is string => typeof id === 'string') : [];
  } catch {
    return [];
  }
};

export default function ChallengeGame() {
  const [selectedMode, setSelectedMode] = useState<ChallengeMode | null>(null);
  const [questions, setQuestions] = useState<ChallengeQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>([]);
  const [bestScores, setBestScores] = useState<Record<string, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const storedScores = challengeModes.reduce<Record<string, number>>((scores, mode) => {
      const storedScore = window.localStorage.getItem(getBestScoreKey(mode.id));
      scores[mode.id] = storedScore ? Number(storedScore) : 0;
      return scores;
    }, {});
    setBestScores(storedScores);
  }, []);

  const currentQuestion = questions[currentIndex];
  const progress = questions.length ? ((currentIndex + 1) / questions.length) * 100 : 0;

  const missedQuestions = useMemo(
    () => answeredQuestions.filter((answer) => !answer.isCorrect).slice(0, 3),
    [answeredQuestions],
  );

  const startGame = (mode: ChallengeMode) => {
    const modeQuestions = challengeQuestionCatalog.filter((question) => question.mode === mode.id);
    const lastQuestionIds = new Set(readStoredQuestionIds(mode.id));
    const freshQuestions = shuffle(modeQuestions.filter((question) => !lastQuestionIds.has(question.id)));
    const fallbackQuestions = shuffle(modeQuestions.filter((question) => lastQuestionIds.has(question.id)));
    const selectedQuestions = [...freshQuestions, ...fallbackQuestions].slice(0, QUESTION_COUNT).map(shuffleQuestionOptions);

    window.localStorage.setItem(
      getLastQuestionKey(mode.id),
      JSON.stringify(selectedQuestions.map((question) => question.id)),
    );

    setSelectedMode(mode);
    setQuestions(selectedQuestions);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setStreak(0);
    setCorrectCount(0);
    setAnsweredQuestions([]);
    setIsFinished(false);
  };

  const chooseAnswer = (answer: string) => {
    if (!currentQuestion || selectedAnswer) return;

    const isCorrect = answer === currentQuestion.correctAnswer;
    const nextStreak = isCorrect ? streak + 1 : 0;
    const streakBonus = isCorrect && nextStreak % 3 === 0 ? 25 : 0;

    setSelectedAnswer(answer);
    setStreak(nextStreak);
    setScore((currentScore) => currentScore + (isCorrect ? 100 + streakBonus : 0));
    setCorrectCount((currentCorrectCount) => currentCorrectCount + (isCorrect ? 1 : 0));
    setAnsweredQuestions((currentAnswers) => [
      ...currentAnswers,
      { question: currentQuestion, selectedAnswer: answer, isCorrect },
    ]);
  };

  const finishGame = () => {
    if (!selectedMode) return;

    const bestScore = Math.max(bestScores[selectedMode.id] ?? 0, score);
    window.localStorage.setItem(getBestScoreKey(selectedMode.id), String(bestScore));
    setBestScores((currentScores) => ({ ...currentScores, [selectedMode.id]: bestScore }));
    setIsFinished(true);
  };

  const nextQuestion = () => {
    if (currentIndex >= questions.length - 1) {
      finishGame();
      return;
    }

    setCurrentIndex((index) => index + 1);
    setSelectedAnswer(null);
  };

  const resetGame = () => {
    setSelectedMode(null);
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setStreak(0);
    setCorrectCount(0);
    setAnsweredQuestions([]);
    setIsFinished(false);
  };

  if (!selectedMode) {
    return (
      <div className="challenge-game">
        <section className="challenge-mode-grid" aria-label="Modos de GuitarFlow Challenge">
          {challengeModes.map((mode) => (
            <button key={mode.id} type="button" className="challenge-mode-card" onClick={() => startGame(mode)}>
              <span>{mode.focus}</span>
              <strong>{mode.title}</strong>
              <small>{mode.description}</small>
            </button>
          ))}
        </section>
      </div>
    );
  }

  if (isFinished) {
    const percentage = questions.length ? Math.round((correctCount / questions.length) * 100) : 0;
    const bestScore = bestScores[selectedMode.id] ?? score;

    return (
      <div className="challenge-game">
        <section className="challenge-result-panel">
          <span className="section-kicker">RESULTADO</span>
          <h2>{selectedMode.title}</h2>
          <div className="challenge-result-score">
            <Trophy />
            <strong>{score}</strong>
            <span>puntos</span>
          </div>

          <div className="challenge-result-stats">
            <span>
              <strong>{correctCount}/{questions.length}</strong>
              aciertos
            </span>
            <span>
              <strong>{percentage}%</strong>
              precisión
            </span>
            <span>
              <strong>{bestScore}</strong>
              mejor marca
            </span>
          </div>

          {missedQuestions.length ? (
            <div className="challenge-review-panel">
              <h3>Para repasar</h3>
              {missedQuestions.map(({ question }) => (
                <article key={question.id}>
                  <strong>{question.category}</strong>
                  <p>{question.explanation}</p>
                </article>
              ))}
            </div>
          ) : (
            <p className="challenge-perfect-copy">Partida limpia. Hermoso: entendiste y respondiste con claridad.</p>
          )}

          <div className="challenge-actions">
            <button type="button" className="platform-button secondary" onClick={() => startGame(selectedMode)}>
              <RotateCcw className="platform-button-icon" />
              <span>Jugar de nuevo</span>
            </button>
            <button type="button" className="platform-button secondary" onClick={resetGame}>
              Cambiar modo
            </button>
            <Link href={selectedMode.relatedHref} className="platform-button primary">
              <span>{selectedMode.relatedLabel}</span>
              <ArrowRight className="platform-button-icon" />
            </Link>
          </div>
        </section>
      </div>
    );
  }

  if (!currentQuestion) return null;

  const hasAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <div className="challenge-game">
      <section className="challenge-play-panel">
        <div className="challenge-play-header">
          <div>
            <span className="section-kicker">{selectedMode.title}</span>
            <h2>Pregunta {currentIndex + 1} de {questions.length}</h2>
          </div>
          <div className="challenge-score-strip" aria-label="Puntaje actual">
            <span>{score} pts</span>
            <span>Racha {streak}</span>
          </div>
        </div>

        <div className="challenge-progress-track" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>

        <article className="challenge-question-card">
          <div className="challenge-question-meta">
            <span>{currentQuestion.category}</span>
            <span>{currentQuestion.difficulty}</span>
          </div>
          <h3>{currentQuestion.prompt}</h3>

          <div className="challenge-options-grid">
            {currentQuestion.options.map((option) => {
              const optionIsCorrect = option === currentQuestion.correctAnswer;
              const optionWasSelected = option === selectedAnswer;
              const stateClass = hasAnswered
                ? optionIsCorrect
                  ? 'is-correct'
                  : optionWasSelected
                    ? 'is-wrong'
                    : ''
                : '';

              return (
                <button
                  key={option}
                  type="button"
                  className={`challenge-option ${stateClass}`}
                  onClick={() => chooseAnswer(option)}
                  disabled={hasAnswered}
                  aria-pressed={optionWasSelected}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </article>

        {hasAnswered ? (
          <aside className={`challenge-feedback ${isCorrect ? 'is-correct' : 'is-wrong'}`}>
            {isCorrect ? <CheckCircle2 /> : <XCircle />}
            <div>
              <strong>{isCorrect ? 'Correcto' : 'Todavía no'}</strong>
              <p>{currentQuestion.explanation}</p>
            </div>
          </aside>
        ) : null}

        <div className="challenge-actions">
          <button type="button" className="platform-button secondary" onClick={resetGame}>
            Salir
          </button>
          <button type="button" className="platform-button primary" onClick={nextQuestion} disabled={!hasAnswered}>
            <span>{currentIndex >= questions.length - 1 ? 'Ver resultado' : 'Siguiente'}</span>
            <ArrowRight className="platform-button-icon" />
          </button>
        </div>
      </section>
    </div>
  );
}

import { useState, useMemo, useCallback } from 'react';
import { UserSearch, Heart, ArrowRight, RotateCw } from 'lucide-react';
import Layout from '@/components/Layout';
import { useMemories } from '@/context/MemoryContext';
import { buildChoices, buildQuizQueue } from '@/utils/quiz';
import type { Memory } from '@/types';

const MAX_ROUNDS = 5;
const QUIZ_SUBTITLE = 'Helping you hold onto the people and moments that matter.';

type Phase = 'question' | 'feedback' | 'complete';

export default function RecognizeScreen() {
  const { memories, logAttempt } = useMemories();

  const quizQueue = useMemo(
    () => (memories.length >= 3 ? buildQuizQueue(memories, MAX_ROUNDS) : []),
    [memories],
  );

  const [round, setRound] = useState(0);
  const [phase, setPhase] = useState<Phase>('question');
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [wasCorrect, setWasCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const current = quizQueue[round];
  const choices = useMemo(
    () => (current ? buildChoices(current, memories) : []),
    [current, memories],
  );

  const handleAnswer = useCallback(
    (name: string) => {
      if (!current || phase !== 'question') return;
      const correct = name === current.name;
      setSelectedName(name);
      setWasCorrect(correct);
      setPhase('feedback');
      if (correct) setCorrectCount((c) => c + 1);
      logAttempt({
        memoryId: current.id,
        personName: current.name,
        selectedName: name,
        correct,
      });
    },
    [current, phase, logAttempt],
  );

  const handleNext = useCallback(() => {
    if (round + 1 >= quizQueue.length) {
      setPhase('complete');
    } else {
      setRound((r) => r + 1);
      setSelectedName(null);
      setWasCorrect(false);
      setPhase('question');
    }
  }, [round, quizQueue.length]);

  const handleRestart = useCallback(() => {
    setRound(0);
    setSelectedName(null);
    setWasCorrect(false);
    setCorrectCount(0);
    setPhase('question');
  }, []);

  if (memories.length < 3) {
    return (
      <Layout subtitle={QUIZ_SUBTITLE}>
        <div className="mb-6">
          <h2 className="font-serif text-3xl font-bold text-ink">Remember Who</h2>
        </div>
        <EmptyState />
      </Layout>
    );
  }

  if (phase === 'complete') {
    return (
      <Layout subtitle={QUIZ_SUBTITLE}>
        <div className="flex flex-col items-center justify-center py-12">
          <span className="flex h-28 w-28 items-center justify-center rounded-full bg-pill-bg">
            <Heart className="h-14 w-14 text-accent" strokeWidth={1.5} />
          </span>
          <h2 className="mt-6 font-serif text-4xl font-bold text-ink">Great job today!</h2>
          <p className="mt-3 text-xl text-ink-soft">
            You went through {quizQueue.length} people. Every moment of practice helps keep those
            memories close.
          </p>
          <button
            onClick={handleRestart}
            className="mt-8 flex w-full max-w-sm items-center justify-center gap-2 rounded-xl bg-primary py-4 text-lg font-bold text-white shadow-card transition-colors hover:bg-primary-dark active:scale-[0.99]"
          >
            <RotateCw className="h-5 w-5" />
            Try Again
          </button>
        </div>
      </Layout>
    );
  }

  if (!current) return null;

  return (
    <Layout subtitle={QUIZ_SUBTITLE}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-serif text-3xl font-bold text-ink">Remember Who</h2>
        <span className="rounded-full bg-pill-bg px-4 py-2 text-base font-semibold text-pill-text">
          {round + 1} of {quizQueue.length}
        </span>
      </div>
      <p className="mb-6 text-lg text-ink-soft">Take your time — there's no rush.</p>

      {/* Photo */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-card-bg shadow-card">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-pill-bg">
          <img
            src={current.photoUrl}
            alt="Who is this?"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="px-6 py-5 text-center">
          <p className="font-serif text-2xl font-bold text-ink">Who is this?</p>
        </div>
      </div>

      {/* Answer buttons */}
      <div className="mt-6 space-y-3">
        {choices.map((choice) => {
          const isSelected = selectedName === choice.name;
          const showAsCorrect = phase === 'feedback' && choice.name === current.name;
          const showAsSelectedWrong =
            phase === 'feedback' && isSelected && !wasCorrect;

          let cls =
            'border-gray-200 bg-card-bg text-ink hover:border-primary/30 hover:shadow-card';
          if (phase === 'feedback') {
            if (showAsCorrect) {
              cls = 'border-primary bg-primary-50 text-primary';
            } else if (showAsSelectedWrong) {
              cls = 'border-gray-200 bg-card-bg text-ink-soft';
            } else {
              cls = 'border-gray-200 bg-card-bg text-ink-soft opacity-60';
            }
          }

          return (
            <button
              key={choice.id}
              onClick={() => handleAnswer(choice.name)}
              disabled={phase === 'feedback'}
              className={`flex w-full items-center justify-center gap-2 rounded-xl border-2 py-5 text-xl font-bold shadow-row transition-all active:scale-[0.99] ${cls}`}
            >
              {showAsCorrect && <Heart className="h-5 w-5" />}
              {choice.name}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {phase === 'feedback' && (
        <div className="mt-6 rounded-xl border border-gray-200 bg-card-bg p-6 shadow-card">
          {wasCorrect ? (
            <div>
              <p className="font-serif text-2xl font-bold text-primary">
                That's right!
              </p>
              <p className="mt-2 text-lg text-ink">
                This is your {current.relationship.toLowerCase()}, {current.name}.
              </p>
            </div>
          ) : (
            <div>
              <p className="font-serif text-2xl font-bold text-ink">
                This is your {current.relationship.toLowerCase()}, {current.name}.
              </p>
              <p className="mt-2 text-lg text-ink-soft">
                Don't worry — every try helps keep the memory warm.
              </p>
            </div>
          )}

          {current.note && (
            <div className="mt-4 border-t border-gray-100 pt-4">
              <p className="text-base leading-relaxed text-ink-soft">{current.note}</p>
            </div>
          )}

          <button
            onClick={handleNext}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-lg font-bold text-white transition-colors hover:bg-primary-dark active:scale-[0.99]"
          >
            {round + 1 >= quizQueue.length ? 'Finish' : 'Next'}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </Layout>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <span className="flex h-24 w-24 items-center justify-center rounded-full bg-pill-bg">
        <UserSearch className="h-12 w-12 text-ink-soft" strokeWidth={1.5} />
      </span>
      <p className="mt-4 text-xl font-semibold text-ink">Let's add some faces first</p>
      <p className="mt-2 max-w-sm text-center text-lg text-ink-soft">
        You'll need at least 3 people in your Memory Vault to start this activity. Ask a caregiver
        to add a few family photos, then come back and try again.
      </p>
    </div>
  );
}

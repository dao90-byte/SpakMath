import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { CheckCircle2, XCircle } from 'lucide-react';

interface BottleSpec {
  id: string;
  label: string;
  levelPercent: number;
  color: string;
}

interface QuestionSpec {
  id: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
}

interface VolumeComparisonProps {
  bottles: BottleSpec[];
  questions: QuestionSpec[];
  onCompleted: () => void;
}

export const VolumeComparison: React.FC<VolumeComparisonProps> = ({
  bottles,
  questions,
  onCompleted
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSelect = (qId: string, opt: string, correct: string) => {
    setAnswers((prev) => {
      const next = { ...prev, [qId]: opt };
      if (opt === correct) {
        sound.playCorrect();
      } else {
        sound.playWrong();
      }

      const allRight = questions.every((q) => {
        const val = q.id === qId ? opt : next[q.id];
        return val === q.correctAnswer;
      });

      if (allRight) {
        setTimeout(() => {
          sound.playStarCollect();
          onCompleted();
        }, 500);
      }
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Visual Bottles Grid */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-slate-100 shadow-md">
        <div className="grid grid-cols-4 gap-3 md:gap-6 justify-items-center">
          {bottles.map((b) => (
            <div key={b.id} className="flex flex-col items-center space-y-2">
              <span className="font-extrabold text-slate-700 text-sm md:text-base">
                {b.label}
              </span>

              {/* Bottle Shape */}
              <div className="w-16 md:w-20 h-44 md:h-52 border-3 md:border-4 border-slate-700 rounded-b-2xl rounded-t-md bg-slate-50 relative overflow-hidden flex flex-col justify-end shadow-inner">
                {/* Cap */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-4 bg-slate-800 rounded-t-xs" />
                {/* Water Level */}
                <div
                  style={{ height: `${b.levelPercent}%` }}
                  className="w-full bg-gradient-to-t from-sky-600 to-sky-400 transition-all relative"
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-sky-200/80 rounded-full" />
                </div>
              </div>

              <span className="text-xs font-semibold text-slate-500">
                {b.levelPercent}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sub questions */}
      <div className="space-y-4">
        {questions.map((q) => {
          const selected = answers[q.id];
          const isCorrect = selected === q.correctAnswer;
          const hasAnswered = !!selected;

          return (
            <div
              key={q.id}
              className={`p-5 rounded-3xl border-2 transition-all ${
                isCorrect
                  ? 'bg-emerald-50/70 border-emerald-400'
                  : hasAnswered
                  ? 'bg-rose-50/60 border-rose-300'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-slate-800 text-sm md:text-base">
                  {q.prompt}
                </span>
                {hasAnswered && (
                  isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-500" />
                  )
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {q.options.map((opt) => {
                  const isThisSelected = selected === opt;
                  let style = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
                  if (isThisSelected) {
                    style = isCorrect
                      ? 'bg-emerald-500 text-white font-bold shadow-md'
                      : 'bg-rose-500 text-white font-bold';
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelect(q.id, opt, q.correctAnswer)}
                      className={`px-4 py-2.5 rounded-2xl font-semibold text-xs md:text-sm border transition-all active:scale-95 ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { CheckCircle2, XCircle } from 'lucide-react';

interface MatrixStep {
  stepNum: number;
  content: string; // Emojis or textual/visual representation
  note?: string;
}

interface PatternChoice {
  id: string;
  label: string;
  content: string;
}

interface PatternMatrixViewerProps {
  ruleDescription: string;
  steps: MatrixStep[];
  choices: PatternChoice[];
  correctChoiceId: string;
  onCompleted: () => void;
}

export const PatternMatrixViewer: React.FC<PatternMatrixViewerProps> = ({
  ruleDescription,
  steps,
  choices,
  correctChoiceId,
  onCompleted
}) => {
  const [typedInput, setTypedInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const correctChoice = choices.find((c) => c.id === correctChoiceId);

  const handleCheckAnswer = () => {
    sound.playClick();
    const cleanIn = typedInput.trim().toLowerCase();
    if (!cleanIn) return;

    const cleanId = correctChoiceId.toLowerCase();
    const cleanLabel = (correctChoice?.label || '').toLowerCase();
    const cleanContent = (correctChoice?.content || '').toLowerCase();

    const isMatch =
      cleanIn === cleanId ||
      cleanLabel.includes(cleanIn) ||
      cleanContent.includes(cleanIn) ||
      cleanIn.includes(cleanId) ||
      (cleanIn.replace(/\D/g, '') && cleanIn.replace(/\D/g, '') === cleanContent.replace(/\D/g, ''));

    if (isMatch) {
      sound.playCorrect();
      setIsSuccess(true);
      setErrorMessage(null);
      setTimeout(() => {
        sound.playVictory();
        onCompleted();
      }, 500);
    } else {
      sound.playWrong();
      setErrorMessage('Chưa chính xác rồi em ơi! 🤔 Gợi mở tư duy: Em hãy quan sát vị trí và chiều di chuyển hoặc số lượng các cạnh của hình qua từng bước để nhận ra quy luật nhé!');
    }
  };

  return (
    <div className="space-y-6 flex flex-col items-center">
      {/* Pattern Sequence Row */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-slate-100 shadow-md w-full max-w-2xl">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">
          {ruleDescription}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 items-center">
          {steps.map((st) => (
            <div
              key={st.stepNum}
              className="flex flex-col items-center p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl"
            >
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full mb-2">
                Bước {st.stepNum}
              </span>
              <div className="text-3xl md:text-4xl min-h-[50px] flex items-center justify-center font-black">
                {st.content}
              </div>
              {st.note && (
                <span className="text-[10px] text-slate-500 mt-1 font-semibold">
                  {st.note}
                </span>
              )}
            </div>
          ))}

          {/* Target Step 4 (Question Mark) */}
          <div
            className={`flex flex-col items-center p-4 rounded-2xl border-3 transition-all ${
              isSuccess
                ? 'bg-emerald-50 border-emerald-500 ring-4 ring-emerald-300'
                : 'bg-amber-50 border-dashed border-amber-400'
            }`}
          >
            <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full mb-2">
              Bước 4 (?)
            </span>
            <div className="text-3xl md:text-4xl min-h-[50px] flex items-center justify-center font-black">
              {isSuccess ? correctChoice?.content : '❓'}
            </div>
            <span className="text-[10px] font-bold text-amber-800 mt-1">
              {isSuccess ? correctChoice?.label : 'Chờ nhập đáp án'}
            </span>
          </div>
        </div>
      </div>

      {/* Direct Typed Answer Input */}
      <div className="w-full max-w-md bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4 text-center">
        <h4 className="font-black text-slate-800 text-sm md:text-base">
          Hình hoặc quy luật nào sẽ xuất hiện ở Bước 4?
        </h4>
        <div className="flex items-center justify-center gap-3">
          <input
            type="text"
            value={typedInput}
            disabled={isSuccess}
            onChange={(e) => {
              setTypedInput(e.target.value);
              setErrorMessage(null);
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleCheckAnswer()}
            placeholder="Tự tay nhập câu trả lời của em..."
            className={`flex-1 px-4 py-3 rounded-2xl border-2 text-sm md:text-base font-bold text-center outline-none transition-all ${
              isSuccess
                ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-black cursor-default'
                : 'border-slate-300 text-slate-800 focus:border-amber-500 focus:ring-4 focus:ring-amber-200'
            }`}
          />
          <button
            type="button"
            onClick={handleCheckAnswer}
            disabled={isSuccess || !typedInput.trim()}
            className={`px-6 py-3 rounded-2xl font-black text-sm shadow-md transition-all active:scale-95 ${
              isSuccess
                ? 'bg-emerald-600 text-white cursor-default'
                : typedInput.trim()
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isSuccess ? 'Đúng ✓' : 'Kiểm tra'}
          </button>
        </div>

        {errorMessage && (
          <div className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 py-2.5 px-3 rounded-xl animate-shake text-left">
            {errorMessage}
          </div>
        )}
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-900 font-bold text-center animate-bounce-slow w-full max-w-md">
          🎉 Chính xác! Bạn đã tự tay tìm ra quy luật biến đổi xoay vòng của hình ảnh!
        </div>
      )}
    </div>
  );
};

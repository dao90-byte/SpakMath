import React, { useState } from 'react';
import { sound } from '../utils/soundEffects';
import { X, Star, CheckSquare, Square, Pencil, HeartHandshake } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SelfAssessmentProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenScratchpad: () => void;
  totalStars: number;
}

export const SelfAssessmentModal: React.FC<SelfAssessmentProps> = ({
  isOpen,
  onClose,
  onOpenScratchpad,
  totalStars
}) => {
  const [checks, setChecks] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true
  });

  const [ratings, setRatings] = useState<Record<string, number>>({
    method: 3,
    steps: 3,
    effort: 3
  });

  const [storyNote, setStoryNote] = useState(
    'đọc biểu đồ hình ảnh và tính số lít nước ép táo giúp bạn Abby!'
  );

  const toggleCheck = (idx: number) => {
    sound.playClick();
    setChecks((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const setRating = (key: string, stars: number) => {
    sound.playStarCollect();
    setRatings((prev) => ({ ...prev, [key]: stars }));
  };

  const handleSaveAndCheer = () => {
    sound.playVictory();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl shadow-2xl border-4 border-emerald-400 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📋</span>
            <div>
              <h2 className="text-xl font-bold font-display text-white">
                Sổ Đánh Giá & Nhật Ký Bài Học (Trang 41)
              </h2>
              <p className="text-xs text-emerald-100">
                Ghi lại những điều tuyệt vời bé đã đạt được hôm nay!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Section 1: Vẽ */}
          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-amber-900 text-sm md:text-base flex items-center gap-2">
                <span>❶</span> Vẽ lại điều em học được
              </h4>
              <p className="text-xs text-amber-700 mt-0.5">
                Hãy mở bảng vẽ để phác họa lại biểu đồ tranh hoặc bình nước!
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenScratchpad();
              }}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs md:text-sm flex items-center gap-1.5 shadow-md shrink-0 transition-transform active:scale-95"
            >
              <Pencil className="w-4 h-4" />
              Mở Bảng Vẽ
            </button>
          </div>

          {/* Section 2: Tự đánh giá hiểu bài */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-800 text-sm md:text-base flex items-center gap-2">
              <span>❷</span> Tự đánh giá mức độ tiếp thu:
            </h4>
            <div className="space-y-2">
              {[
                { id: 1, text: '1. Em có thể hiểu được nội dung bài giảng ngày hôm nay.' },
                { id: 2, text: '2. Em có thể nhớ được các kiến thức đã học trong hôm nay.' },
                { id: 3, text: '3. Em có thể áp dụng các kiến thức đã học vào cuộc sống.' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`w-full p-3 rounded-2xl border-2 flex items-center gap-3 text-left transition-all ${
                    checks[item.id]
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  {checks[item.id] ? (
                    <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                  <span className="text-xs md:text-sm">{item.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Câu chuyện toán học & Tự chấm sao */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-800 text-sm md:text-base flex items-center gap-2">
              <span>❸</span> Câu chuyện toán học & Tự thưởng sao:
            </h4>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <label className="text-xs font-bold text-slate-600 block">
                Hôm nay, mình sẽ khoe với bố mẹ rằng mình biết làm:
              </label>
              <input
                type="text"
                value={storyNote}
                onChange={(e) => setStoryNote(e.target.value)}
                className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 text-xs md:text-sm font-medium focus:ring-2 focus:ring-emerald-400 outline-none"
              />

              {/* Rubric Star Ratings */}
              <div className="space-y-2.5 pt-2">
                {[
                  { key: 'method', label: 'Em đã biết áp dụng đúng phương pháp' },
                  { key: 'steps', label: 'Em đã biết làm đúng các bước để tìm ra kết quả' },
                  { key: 'effort', label: 'Em đã cố gắng hết sức để giải bài' }
                ].map((crit) => (
                  <div
                    key={crit.key}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs"
                  >
                    <span className="font-semibold text-slate-700">{crit.label}</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3].map((starIdx) => (
                        <button
                          key={starIdx}
                          type="button"
                          onClick={() => setRating(crit.key, starIdx)}
                          className="p-1 hover:scale-125 transition-transform"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              starIdx <= ratings[crit.key]
                                ? 'fill-amber-400 text-amber-500'
                                : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mascot cheering quote */}
          <div className="flex items-center gap-3 p-3.5 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl border border-emerald-200 text-xs md:text-sm text-emerald-900 font-semibold">
            <span className="text-3xl">🐰🐵🐹</span>
            <span>
              "Giỏi lắm bạn ơi! Tích lũy được <span className="font-extrabold text-amber-600">{totalStars} ⭐</span> rồi! Hãy chia sẻ lại với ba mẹ để nhớ bài thật lâu nhé!"
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={handleSaveAndCheer}
            className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-transform active:scale-95 flex items-center gap-2"
          >
            <HeartHandshake className="w-4 h-4" />
            Lưu Nhật Ký & Nhận Khen Thưởng
          </button>
        </div>
      </div>
    </div>
  );
};

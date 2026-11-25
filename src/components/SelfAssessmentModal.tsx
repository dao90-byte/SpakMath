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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030617]/80 backdrop-blur-md p-4">
      <div className="relative bg-[radial-gradient(ellipse_at_top_right,_rgba(56,189,248,0.2),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(168,85,247,0.18),_transparent_55%),linear-gradient(160deg,_rgba(15,24,68,0.98),_rgba(7,12,38,0.99))] rounded-3xl shadow-[0_28px_70px_rgba(3,7,24,0.88),0_0_42px_rgba(34,211,238,0.18)] border border-cyan-300/45 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden text-white animate-in fade-in zoom-in-95 duration-200">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-8 h-[2.5px] rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-400 shadow-[0_0_16px_rgba(34,211,238,0.7)]"
        />

        {/* Header */}
        <div className="relative bg-[radial-gradient(ellipse_at_top_left,_rgba(34,211,238,0.24),_transparent_58%),radial-gradient(ellipse_at_top_right,_rgba(217,70,239,0.2),_transparent_58%),linear-gradient(180deg,_rgba(12,22,66,0.96),_rgba(6,11,36,0.92))] border-b border-cyan-300/45 shadow-[0_8px_32px_rgba(34,211,238,0.2),inset_0_1px_0_rgba(165,243,252,0.28)] px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-300 via-sky-400 to-fuchsia-400 text-slate-950 flex items-center justify-center text-lg shadow-[0_0_26px_rgba(34,211,238,0.68),0_0_46px_rgba(217,70,239,0.38)] ring-2 ring-cyan-200/45 shrink-0">
              📋
            </span>
            <div>
              <h2 className="text-xl font-black font-display bg-gradient-to-r from-white via-cyan-200 to-fuchsia-200 bg-clip-text text-transparent drop-shadow-[0_0_16px_rgba(56,189,248,0.68)]">
                Sổ Đánh Giá &amp; Nhật Ký Bài Học
              </h2>
              <p className="text-xs font-medium text-cyan-100/95 drop-shadow-[0_0_10px_rgba(34,211,238,0.48)]">
                Ghi lại những điều tuyệt vời bé đã đạt được hôm nay!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white/[0.1] hover:bg-cyan-400/25 border border-cyan-300/30 hover:border-cyan-300/75 shadow-[0_0_14px_rgba(34,211,238,0.18)] hover:shadow-[0_0_22px_rgba(34,211,238,0.5)] flex items-center justify-center transition-all text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 bg-[radial-gradient(ellipse_at_top_right,_rgba(56,189,248,0.14),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(192,132,252,0.14),_transparent_55%)] shadow-[inset_0_10px_30px_rgba(34,211,238,0.1)]">
          {/* Section 1: Vẽ */}
          <div className="p-4 rounded-2xl bg-[#091238]/90 border border-cyan-300/40 shadow-[0_0_24px_rgba(34,211,238,0.16)] flex items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-white text-sm md:text-base flex items-center gap-2">
                <span className="text-cyan-300">1.</span> Vẽ lại điều em học được
              </h4>
              <p className="text-xs text-cyan-200/80 mt-0.5">
                Hãy mở bảng vẽ vũ trụ để phác họa lại biểu đồ tranh hoặc sơ đồ đoạn thẳng!
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenScratchpad();
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 hover:brightness-110 text-slate-950 font-black text-xs md:text-sm flex items-center gap-1.5 shadow-[0_0_20px_rgba(34,211,238,0.35)] shrink-0 transition-all active:scale-95 cursor-pointer"
            >
              <Pencil className="w-4 h-4" />
              Mở Bảng Vẽ
            </button>
          </div>

          {/* Section 2: Tự đánh giá hiểu bài */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm md:text-base flex items-center gap-2">
              <span className="text-cyan-300">2.</span> Tự đánh giá mức độ tiếp thu:
            </h4>
            <div className="space-y-2">
              {[
                { id: 1, text: '1. Em có thể hiểu được nội dung bài giảng ngày hôm nay.' },
                { id: 2, text: '2. Em có thể nhớ được các kiến thức đã học trong hôm nay.' },
                { id: 3, text: '3. Em có thể áp dụng các kiến thức đã học vào cuộc sống.' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleCheck(item.id)}
                  className={`w-full p-3.5 rounded-2xl border flex items-center gap-3 text-left transition-all cursor-pointer ${
                    checks[item.id]
                      ? 'bg-emerald-500/15 border-emerald-400/55 text-emerald-100 font-bold shadow-[0_0_16px_rgba(52,211,153,0.16)]'
                      : 'bg-[#091238]/70 border-white/15 text-slate-300 hover:border-cyan-300/50'
                  }`}
                >
                  {checks[item.id] ? (
                    <CheckSquare className="w-5 h-5 text-emerald-300 shrink-0" />
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
            <h4 className="font-bold text-white text-sm md:text-base flex items-center gap-2">
              <span className="text-cyan-300">3.</span> Câu chuyện toán học &amp; Tự thưởng sao:
            </h4>

            <div className="p-4 bg-[#070D28]/90 rounded-2xl border border-cyan-300/25 space-y-3">
              <label className="text-xs font-bold text-cyan-200 block">
                Hôm nay, mình sẽ khoe với bố mẹ rằng mình biết làm:
              </label>
              <input
                type="text"
                value={storyNote}
                onChange={(e) => setStoryNote(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#050A1F] rounded-xl border border-cyan-300/35 text-xs md:text-sm font-medium text-white focus:border-cyan-300 focus:shadow-[0_0_16px_rgba(34,211,238,0.28)] outline-none"
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
                    <span className="font-semibold text-slate-200">{crit.label}</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3].map((starIdx) => (
                        <button
                          key={starIdx}
                          type="button"
                          onClick={() => setRating(crit.key, starIdx)}
                          className="p-1 hover:scale-125 transition-transform cursor-pointer"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              starIdx <= ratings[crit.key]
                                ? 'fill-amber-400 text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]'
                                : 'text-slate-600'
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
          <div className="flex items-center gap-3 p-3.5 bg-gradient-to-r from-cyan-500/15 via-indigo-500/15 to-fuchsia-500/15 rounded-2xl border border-cyan-300/30 text-xs md:text-sm text-cyan-100 font-semibold">
            <span className="text-3xl">🐰🐵🐹</span>
            <span>
              &ldquo;Giỏi lắm bạn ơi! Tích lũy được <span className="font-extrabold text-amber-300 tabular-nums">{totalStars} ⭐</span> rồi! Hãy chia sẻ lại với ba mẹ để nhớ bài thật lâu nhé!&rdquo;
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#060B24]/90 px-6 py-4 border-t border-cyan-300/20 flex justify-end">
          <button
            type="button"
            onClick={handleSaveAndCheer}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 hover:brightness-110 text-slate-950 font-black text-sm shadow-[0_0_22px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.65)] transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <HeartHandshake className="w-4 h-4" />
            Lưu Nhật Ký &amp; Nhận Khen Thưởng
          </button>
        </div>
      </div>
    </div>
  );
};

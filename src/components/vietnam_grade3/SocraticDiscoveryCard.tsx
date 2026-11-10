import React, { useState, useEffect } from 'react';
import { SocraticCard } from '../../data/vietnamGrade3LessonsData';
import { sound } from '../../utils/soundEffects';
import { markSocraticCardUnlocked } from '../../utils/cosmicProgressStorage';
import { 
  Lightbulb, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles,
  Layers,
  Split,
  Scale,
  Equal,
  Lock,
  Unlock,
  Key
} from 'lucide-react';

interface SocraticDiscoveryCardProps {
  card: SocraticCard;
  currentStep: number;
  totalSteps: number;
  lessonId?: string;
  nextStageTitle?: string;
  onNextStep: () => void;
  onPrevStep: () => void;
  onCompleteDiscovery: () => void;
}

export const SocraticDiscoveryCard: React.FC<SocraticDiscoveryCardProps> = ({
  card,
  currentStep,
  totalSteps,
  lessonId,
  nextStageTitle,
  onNextStep,
  onPrevStep,
  onCompleteDiscovery
}) => {
  // State for Main Prompt
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [attemptedWrongIds, setAttemptedWrongIds] = useState<string[]>([]);
  const [isPrompt1Correct, setIsPrompt1Correct] = useState(false);

  // State for Follow-up Prompt (if present)
  const [followUpSelectedId, setFollowUpSelectedId] = useState<string | null>(null);
  const [followUpAttemptedWrongIds, setFollowUpAttemptedWrongIds] = useState<string[]>([]);
  const [isFollowUpCorrect, setIsFollowUpCorrect] = useState(false);

  // Unlock state: whether the Key Takeaway is revealed
  const isTakeawayUnlocked = card.followUpPrompt
    ? isPrompt1Correct && isFollowUpCorrect
    : isPrompt1Correct;

  // Auto-save cosmic progress when Key Takeaway is unlocked
  useEffect(() => {
    if (isTakeawayUnlocked) {
      const activeLId = lessonId || 'vn3-c4-l23';
      markSocraticCardUnlocked(activeLId, card.id);
    }
  }, [isTakeawayUnlocked, card.id, lessonId]);

  // Reset state on card step change
  useEffect(() => {
    setSelectedOptionId(null);
    setAttemptedWrongIds([]);
    setIsPrompt1Correct(false);
    setFollowUpSelectedId(null);
    setFollowUpAttemptedWrongIds([]);
    setIsFollowUpCorrect(false);
  }, [card.id]);

  const handleSelectOption1 = (opt: { id: string; isCorrect: boolean }) => {
    if (isPrompt1Correct) return; // Already solved, locked

    setSelectedOptionId(opt.id);

    if (opt.isCorrect) {
      setIsPrompt1Correct(true);
      sound.playCorrect();
      if (!card.followUpPrompt) {
        sound.playVictory();
      }
    } else {
      sound.playWrong();
      if (!attemptedWrongIds.includes(opt.id)) {
        setAttemptedWrongIds((prev) => [...prev, opt.id]);
      }
    }
  };

  const handleSelectFollowUpOption = (opt: { id: string; isCorrect: boolean }) => {
    if (isFollowUpCorrect) return; // Already solved, locked

    setFollowUpSelectedId(opt.id);

    if (opt.isCorrect) {
      setIsFollowUpCorrect(true);
      sound.playVictory();
    } else {
      sound.playWrong();
      if (!followUpAttemptedWrongIds.includes(opt.id)) {
        setFollowUpAttemptedWrongIds((prev) => [...prev, opt.id]);
      }
    }
  };

  const selectedOption1 = card.socraticPrompt.options.find(
    (opt) => opt.id === selectedOptionId
  );

  const selectedFollowUpOption = card.followUpPrompt?.options.find(
    (opt) => opt.id === followUpSelectedId
  );

  // Dynamic Visual Renderers for mathematical intuition
  const renderVisual = () => {
    switch (card.visualType) {
      case 'multiplication_groups': {
        const { groupCount = 3, itemsPerGroup = 12, itemIcon = '🧁', groupLabels = [], expressionLong } = card.visualData;
        const displayCount = Math.min(groupCount, 8);
        return (
          <div className="bg-[#0B132B]/90 border-2 border-amber-400/40 rounded-3xl p-5 sm:p-6 my-5 shadow-[0_0_20px_rgba(251,191,36,0.12)]">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="text-sm sm:text-base font-extrabold text-amber-300 flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-400" />
                <span>Mô hình trực quan: {groupCount} khay bánh bằng nhau</span>
              </span>
              <span className="text-xs sm:text-sm font-black text-slate-950 bg-gradient-to-r from-amber-300 to-yellow-300 px-3.5 py-1 rounded-full shadow-xs">
                Mỗi khay có {itemsPerGroup} chiếc bánh
              </span>
            </div>

            <div className={`grid gap-3 ${displayCount > 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-1 sm:grid-cols-3'}`}>
              {Array.from({ length: displayCount }).map((_, gIdx) => (
                <div 
                  key={gIdx}
                  className="bg-slate-900/90 border-2 border-amber-400/30 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col items-center hover:border-amber-400/60 transition-colors"
                >
                  <div className="text-xs sm:text-sm font-black text-amber-200 mb-2">
                    {groupLabels[gIdx] || `Khay ${gIdx + 1}`}
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 p-2.5 bg-slate-950/70 rounded-xl w-full justify-items-center border border-slate-800">
                    {Array.from({ length: Math.min(itemsPerGroup, 12) }).map((_, i) => (
                      <span key={i} className="text-lg sm:text-xl select-none transform hover:scale-125 transition-transform" title={`Bánh ${i+1}`}>
                        {itemIcon}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm font-black text-amber-300 mt-2">
                    = {itemsPerGroup} cái
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-amber-400/30 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-sm sm:text-base font-bold">
              <span className="flex items-center gap-2 bg-slate-900/90 px-4 py-2.5 rounded-2xl border border-slate-700">
                <span className="text-slate-400">Cách cộng dài:</span>
                <span className="text-amber-300 font-mono font-black text-xs sm:text-base">
                  {expressionLong || (groupCount === 3 ? '12 + 12 + 12 = 36' : `${Array(groupCount).fill(itemsPerGroup).join(' + ')} = ?`)}
                </span>
              </span>
              <span className="text-amber-400 font-black text-lg">⇌</span>
              <span className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 px-4.5 py-2.5 rounded-2xl shadow-md font-black">
                <span>Cách nhân siêu gọn:</span>
                <span className="font-mono text-sm sm:text-lg">
                  {itemsPerGroup} × {groupCount} = {itemsPerGroup * groupCount}
                </span>
              </span>
            </div>
          </div>
        );
      }

      case 'multiplication_carry': {
        const { factorA = 26, factorB = 3, step1, step2, result = 78, hasCarry } = card.visualData;
        return (
          <div className="bg-[#0B132B]/90 border-2 border-sky-400/40 rounded-3xl p-5 sm:p-6 my-5 shadow-[0_0_20px_rgba(56,189,248,0.12)]">
            <div className="text-sm sm:text-base font-extrabold text-sky-300 mb-4 flex items-center gap-2">
              <Equal className="w-5 h-5 text-sky-400" />
              <span>Quy tắc đặt tính thẳng cột: Nhân từ phải sang trái</span>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-around gap-6">
              <div className="bg-slate-900/90 border-2 border-sky-400/60 rounded-2xl p-5 shadow-lg font-mono text-2xl sm:text-3xl font-black text-white w-48 text-right pr-7">
                <div className="text-xs sm:text-sm font-sans text-sky-300 font-black mb-1.5 flex justify-end gap-6">
                  <span>Hàng Chục</span>
                  <span>Đ.vị</span>
                </div>
                {hasCarry && (
                  <div className="text-xs sm:text-sm text-amber-300 font-sans font-black text-left pl-1">
                    (Nhớ 1) ↙
                  </div>
                )}
                <div>{factorA}</div>
                <div className="border-b-2 border-slate-600 pb-1 flex justify-between items-center text-sky-300">
                  <span className="text-xl font-sans">×</span>
                  <span>{factorB}</span>
                </div>
                <div className="pt-2 text-emerald-400 font-black text-3xl">{result}</div>
              </div>

              <div className="space-y-3 text-sm sm:text-base text-slate-200 max-w-md">
                <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-sky-500/30">
                  <span className="font-black text-sky-300 block mb-1">Bước 1: Nhân hàng đơn vị trước</span>
                  <span className="leading-relaxed">{step1 || 'Nhân chữ số hàng đơn vị. Nếu kết quả ≥ 10, nhớ phần chục sang bên trái.'}</span>
                </div>
                <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-sky-500/30">
                  <span className="font-black text-sky-300 block mb-1">Bước 2: Nhân hàng chục &amp; cộng nhớ</span>
                  <span className="leading-relaxed">{step2 || 'Nhân chữ số hàng chục rồi cộng thêm số đã nhớ vào kết quả.'}</span>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'scale_up_comparison': {
        const { barA, barB, maiCount, namMultiplied, lanAdded } = card.visualData;
        return (
          <div className="bg-[#0B132B]/90 border-2 border-emerald-400/40 rounded-3xl p-5 sm:p-6 my-5 shadow-[0_0_20px_rgba(52,211,153,0.12)]">
            <div className="text-sm sm:text-base font-extrabold text-emerald-300 mb-4 flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-400" />
              <span>So sánh bản chất: Gấp số lần (Phép nhân) vs Thêm đơn vị (Phép cộng)</span>
            </div>

            {barA && barB ? (
              <div className="space-y-4">
                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                  <div className="flex justify-between text-sm font-bold text-slate-300 mb-2">
                    <span>{barA.label}</span>
                    <span className="text-emerald-300 font-mono font-black text-base">{barA.value} cm</span>
                  </div>
                  <div className="h-8 w-28 bg-emerald-500 rounded-xl shadow-xs border border-emerald-400 flex items-center justify-center text-sm font-black text-slate-950">
                    2 cm
                  </div>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                  <div className="flex justify-between text-sm font-bold text-slate-300 mb-2">
                    <span>{barB.label}</span>
                    <span className="text-emerald-300 font-mono font-black text-base">{barB.value} cm</span>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    <div className="h-8 w-28 bg-emerald-600 rounded-xl shadow-xs border border-emerald-400 flex items-center justify-center text-sm font-black text-white">
                      2 cm
                    </div>
                    <div className="h-8 w-28 bg-emerald-600 rounded-xl shadow-xs border border-emerald-400 flex items-center justify-center text-sm font-black text-white">
                      2 cm
                    </div>
                    <div className="h-8 w-28 bg-emerald-600 rounded-xl shadow-xs border border-emerald-400 flex items-center justify-center text-sm font-black text-white">
                      2 cm
                    </div>
                  </div>
                  <div className="text-sm text-emerald-300 font-bold mt-2">
                    = 3 đoạn 2 cm ghép lại: 2 × 3 = 6 cm
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                <div className="bg-slate-900/90 p-4 sm:p-5 rounded-2xl border-2 border-emerald-400/50 shadow-sm">
                  <div className="font-black text-emerald-300 mb-1.5 text-base sm:text-lg flex items-center gap-2">
                    <span>⚡ GẤP 4 LẦN</span>
                    <span className="text-xs text-emerald-200 bg-emerald-950 px-2 py-0.5 rounded-full">(Phép nhân)</span>
                  </div>
                  <div className="text-slate-300 font-medium">Bạn Nam có số kẹp gấp 4 lần Mai:</div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-300 font-mono mt-2">
                    {namMultiplied}
                  </div>
                </div>
                <div className="bg-slate-900/90 p-4 sm:p-5 rounded-2xl border-2 border-amber-400/50 shadow-sm">
                  <div className="font-black text-amber-300 mb-1.5 text-base sm:text-lg flex items-center gap-2">
                    <span>➕ NHIỀU HƠN 4 CÁI</span>
                    <span className="text-xs text-amber-200 bg-amber-950 px-2 py-0.5 rounded-full">(Phép cộng)</span>
                  </div>
                  <div className="text-slate-300 font-medium">Bạn Lan có nhiều hơn Mai 4 kẹp:</div>
                  <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono mt-2">
                    {lanAdded}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      }

      case 'division_exact_vs_remainder': {
        const { totalItems = 7, eachGets = 3, leftover = 1, itemIcon = '🍓' } = card.visualData;
        return (
          <div className="bg-[#0B132B]/90 border-2 border-rose-400/40 rounded-3xl p-5 sm:p-6 my-5 shadow-[0_0_20px_rgba(244,63,94,0.12)]">
            <div className="text-sm sm:text-base font-extrabold text-rose-300 mb-4 flex flex-wrap items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                <Split className="w-5 h-5 text-rose-400" />
                <span>Có tổng cộng {totalItems} quả chia đều cho 2 bạn</span>
              </span>
              <span className="text-rose-200 font-mono font-black text-xs sm:text-sm bg-rose-950/80 border border-rose-400/50 px-3 py-1 rounded-full">
                {leftover === 0 ? 'Chia hết (dư 0)' : `Chia có dư (dư ${leftover})`}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/90 border-2 border-slate-800 rounded-2xl p-4 shadow-sm">
                <div className="text-sm font-bold text-slate-200 mb-2.5 flex items-center justify-between">
                  <span>🐰 Bạn Thỏ nhận được:</span>
                  <span className="font-mono font-black text-rose-300 text-base">{eachGets} quả</span>
                </div>
                <div className="flex gap-2.5 text-3xl p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  {Array.from({ length: eachGets }).map((_, i) => (
                    <span key={i} className="hover:scale-125 transition-transform">{itemIcon}</span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/90 border-2 border-slate-800 rounded-2xl p-4 shadow-sm">
                <div className="text-sm font-bold text-slate-200 mb-2.5 flex items-center justify-between">
                  <span>🐻 Bạn Gấu nhận được:</span>
                  <span className="font-mono font-black text-rose-300 text-base">{eachGets} quả</span>
                </div>
                <div className="flex gap-2.5 text-3xl p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  {Array.from({ length: eachGets }).map((_, i) => (
                    <span key={i} className="hover:scale-125 transition-transform">{itemIcon}</span>
                  ))}
                </div>
              </div>
            </div>

            {leftover > 0 && (
              <div className="mt-4 p-4 bg-amber-950/50 border-2 border-amber-400/60 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl animate-bounce-slow">{itemIcon}</span>
                  <span className="text-sm sm:text-base font-black text-amber-200">
                    Phần quả còn lại không thể chia đều: <span className="underline text-amber-300">SỐ DƯ = {leftover}</span>
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-black text-slate-950 bg-amber-400 px-3 py-1 rounded-full shrink-0">
                  Số dư {leftover} &lt; Số chia 2
                </span>
              </div>
            )}
          </div>
        );
      }

      case 'division_steps': {
        const { dividend = 72, divisor = 3, stepTens, stepCombine, stepUnits, result = 24 } = card.visualData;
        return (
          <div className="bg-[#0B132B]/90 border-2 border-purple-400/40 rounded-3xl p-5 sm:p-6 my-5 shadow-[0_0_20px_rgba(168,85,247,0.12)]">
            <div className="text-sm sm:text-base font-extrabold text-purple-300 mb-4 flex items-center gap-2">
              <Split className="w-5 h-5 text-purple-400" />
              <span>Quy trình chia tuần tự: Từ hàng chục sang hàng đơn vị</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
              <div className="bg-slate-900/90 border-2 border-purple-400/60 rounded-2xl p-5 font-mono font-black text-white text-2xl w-52 shadow-lg">
                <div className="flex justify-between border-b-2 border-slate-600 pb-2">
                  <span>{dividend}</span>
                  <span className="text-purple-300 border-l-2 border-slate-600 pl-4">{divisor}</span>
                </div>
                <div className="flex justify-end text-emerald-400 pt-2 text-3xl font-black">
                  {result}
                </div>
              </div>

              <div className="space-y-3 text-sm sm:text-base text-slate-200 max-w-md">
                <div className="p-3 bg-slate-900/90 rounded-2xl border border-purple-500/30">
                  <span className="font-black text-purple-300 block mb-1">Lượt 1 (Hàng chục):</span>
                  <span>{stepTens || 'Chia chữ số hàng chục cho số chia, tìm số dư.'}</span>
                </div>
                <div className="p-3 bg-slate-900/90 rounded-2xl border border-purple-500/30">
                  <span className="font-black text-purple-300 block mb-1">Ghép số:</span>
                  <span>{stepCombine || 'Hạ chữ số hàng đơn vị xuống ghép với số dư.'}</span>
                </div>
                <div className="p-3 bg-slate-900/90 rounded-2xl border border-purple-500/30">
                  <span className="font-black text-purple-300 block mb-1">Lượt 2 (Hàng đơn vị):</span>
                  <span>{stepUnits || 'Chia số mới tạo thành để tìm chữ số thứ hai của thương.'}</span>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'scale_down_comparison': {
        const { barCD, barAB, case1, case2, start, stepA, stepB } = card.visualData;
        return (
          <div className="bg-[#0B132B]/90 border-2 border-teal-400/40 rounded-3xl p-5 sm:p-6 my-5 shadow-[0_0_20px_rgba(45,212,191,0.12)]">
            <div className="text-sm sm:text-base font-extrabold text-teal-300 mb-4 flex items-center gap-2">
              <Scale className="w-5 h-5 text-teal-400" />
              <span>Giảm đi số lần (Phép chia) vs Bớt đi đơn vị (Phép trừ)</span>
            </div>

            {barCD && barAB ? (
              <div className="space-y-4">
                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                  <div className="flex justify-between text-sm font-bold text-slate-300 mb-2">
                    <span>{barCD.label}</span>
                    <span className="text-teal-300 font-mono font-black text-base">6 cm</span>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    <div className="h-8 w-24 bg-teal-600 rounded-xl flex items-center justify-center text-sm font-bold text-white shadow-xs">
                      2 cm
                    </div>
                    <div className="h-8 w-24 bg-teal-600 rounded-xl flex items-center justify-center text-sm font-bold text-white shadow-xs">
                      2 cm
                    </div>
                    <div className="h-8 w-24 bg-teal-600 rounded-xl flex items-center justify-center text-sm font-bold text-white shadow-xs">
                      2 cm
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                  <div className="flex justify-between text-sm font-bold text-slate-300 mb-2">
                    <span>{barAB.label}</span>
                    <span className="text-teal-300 font-mono font-black text-base">2 cm</span>
                  </div>
                  <div className="h-8 w-24 bg-emerald-500 rounded-xl flex items-center justify-center text-sm font-black text-slate-950 shadow-xs">
                    2 cm
                  </div>
                  <span className="text-sm font-bold text-teal-300 mt-2 block">
                    = Chỉ lấy 1 phần trong 3 phần bằng nhau: 6 : 3 = 2 cm
                  </span>
                </div>
              </div>
            ) : case1 && case2 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                <div className="bg-slate-900/90 p-4 sm:p-5 rounded-2xl border-2 border-teal-400/50 shadow-sm">
                  <div className="font-black text-teal-300 mb-1.5 text-base sm:text-lg flex items-center gap-2">
                    <span>📉 GIẢM ĐI 3 LẦN</span>
                    <span className="text-xs text-teal-200 bg-teal-950 px-2 py-0.5 rounded-full">(Phép chia)</span>
                  </div>
                  <div className="text-slate-300 font-medium">Chia đều 3 phần, chỉ giữ 1 phần:</div>
                  <div className="text-xl sm:text-2xl font-black text-teal-300 font-mono mt-2">
                    {case1}
                  </div>
                </div>
                <div className="bg-slate-900/90 p-4 sm:p-5 rounded-2xl border-2 border-slate-700 shadow-sm">
                  <div className="font-black text-slate-200 mb-1.5 text-base sm:text-lg flex items-center gap-2">
                    <span>➖ BỚT ĐI 3 CON</span>
                    <span className="text-xs text-slate-300 bg-slate-800 px-2 py-0.5 rounded-full">(Phép trừ)</span>
                  </div>
                  <div className="text-slate-300 font-medium">Bán bớt đúng 3 con gà:</div>
                  <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono mt-2">
                    {case2}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-teal-400/40 text-center font-bold text-sm sm:text-base text-slate-200">
                <span className="text-teal-300 font-mono text-lg">{start}</span>
                <span className="mx-2 text-cyan-400">─(Gấp 4 lần: × 4)─▶</span>
                <span className="text-purple-300 font-mono text-lg">{stepA}</span>
                <span className="mx-2 text-cyan-400">─(Giảm 4 lần: : 4)─▶</span>
                <span className="text-emerald-300 font-mono font-black text-xl">{stepB}</span>
              </div>
            )}
          </div>
        );
      }

      case 'two_step_bar_model': {
        const { row1 = 3, step1Result, step2Result } = card.visualData;
        return (
          <div className="bg-[#0B132B]/90 border-2 border-indigo-400/40 rounded-3xl p-5 sm:p-6 my-5 shadow-[0_0_20px_rgba(99,102,241,0.12)]">
            <div className="text-sm sm:text-base font-extrabold text-indigo-300 mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              <span>Mô hình hai bước: Đi tìm đại lượng trung gian ẩn giấu</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-slate-300 w-28 shrink-0">Hàng trên:</span>
                <div className="h-8 px-4 bg-indigo-500 rounded-xl flex items-center justify-center text-sm font-black text-white shadow-xs">
                  {row1} bông hoa
                </div>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-sm font-bold text-slate-300 w-28 shrink-0">Hàng dưới:</span>
                <div className="flex gap-2 items-center flex-wrap">
                  <div className="h-8 px-4 bg-indigo-600 rounded-xl flex items-center justify-center text-sm font-black text-white">
                    3 bông
                  </div>
                  <div className="h-8 px-3.5 bg-amber-400 rounded-xl border-2 border-dashed border-amber-600 flex items-center justify-center text-sm font-black text-slate-950">
                    + 2 bông
                  </div>
                  <span className="text-sm font-black text-amber-300 ml-2">
                    = ? (Chưa biết, phải tính trước!)
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-indigo-500/30 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base">
                <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-indigo-500/30">
                  <span className="font-black text-indigo-300 block mb-1">Bước 1: Tìm hàng dưới</span>
                  <span className="font-bold text-white">{step1Result || '3 + 2 = 5 bông hoa'}</span>
                </div>
                <div className="p-3.5 bg-indigo-950/80 text-white rounded-2xl border border-indigo-400/50 shadow-sm">
                  <span className="font-black text-cyan-300 block mb-1">Bước 2: Tìm cả hai hàng</span>
                  <span className="font-black text-emerald-300">{step2Result || '3 + 5 = 8 bông hoa'}</span>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'practical_farm': {
        const { pillars, totalCorn, keptForSeeds, remainingCalculation, baskets, perBasket } = card.visualData;
        return (
          <div className="bg-[#0B132B]/90 border-2 border-amber-400/40 rounded-3xl p-5 sm:p-6 my-5 shadow-[0_0_20px_rgba(251,191,36,0.12)]">
            <div className="text-sm sm:text-base font-extrabold text-amber-300 mb-4 flex items-center gap-2">
              <span className="text-xl">🌾</span>
              <span>Tình huống thực tế đời sống: Thu hoạch nông trại</span>
            </div>

            {pillars ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {pillars.map((p: string, idx: number) => (
                  <div key={idx} className="p-3.5 bg-slate-900/90 rounded-2xl border border-amber-400/30 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-slate-200">{p}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3.5 text-sm sm:text-base">
                <div className="flex items-center justify-between p-4 bg-slate-900/90 rounded-2xl border border-amber-400/40">
                  <span className="font-bold text-slate-300">Tổng số ngô thu hoạch:</span>
                  <span className="font-mono font-black text-amber-300 text-xl">{totalCorn} bắp ngô 🌽</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-amber-400/30">
                    <span className="font-black text-amber-300 block mb-1">Bước 1: Bớt lại hạt giống (Trừ)</span>
                    <span className="font-mono font-bold text-white text-base">{remainingCalculation}</span>
                  </div>
                  <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-emerald-400/30">
                    <span className="font-black text-emerald-300 block mb-1">Bước 2: Chia đều vào {baskets} rổ (Chia)</span>
                    <span className="font-mono font-bold text-white text-base">{perBasket}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="bg-[#0B0F19] rounded-3xl border-2 border-cyan-500/40 shadow-[0_0_40px_rgba(0,240,255,0.1)] overflow-hidden animate-fade-in font-sans relative text-white">
      {/* Top Cosmic Telemetry Header */}
      <div className="bg-gradient-to-r from-cyan-950/90 via-blue-950/90 to-purple-950/90 border-b border-cyan-500/30 text-white px-5 sm:px-7 py-4 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/60 text-cyan-300 flex items-center justify-center font-black text-base shadow-[0_0_12px_rgba(0,240,255,0.4)] font-mono">
            {currentStep}
          </div>
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block font-mono">
              TRẠM KHÁM PHÁ · {card.stageTitle}
            </span>
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span>Bản Chất Toán Học Thiên Hà</span>
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </h3>
          </div>
        </div>

        <div className="text-xs sm:text-sm font-black text-cyan-200 bg-cyan-950/80 px-4 py-1.5 rounded-full border border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.3)] font-mono">
          CHẶNG {currentStep} / {totalSteps}
        </div>
      </div>

      <div className="p-5 sm:p-8">
        {/* Core Socratic Question - Cosmic HUD Focus */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-slate-900/95 via-cyan-950/40 to-purple-950/40 border-2 border-cyan-500/50 mb-6 shadow-[0_0_25px_rgba(0,240,255,0.1)]">
          <div className="flex items-start gap-4">
            <span className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 flex items-center justify-center text-2xl font-black shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              🪐
            </span>
            <div className="flex-1">
              <span className="text-xs font-black uppercase text-cyan-400 tracking-wider block mb-1.5 font-mono">
                Tín hiệu triết lý từ hệ mặt trời:
              </span>
              <h4 className="text-lg sm:text-2xl font-black text-white leading-relaxed">
                {card.questionText}
              </h4>
              {card.subText && (
                <p className="text-sm sm:text-base text-cyan-200/90 mt-2.5 font-semibold leading-relaxed">
                  {card.subText}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Visual Intuition Model */}
        {renderVisual()}

        {/* Socratic Interactive Choice Prompt - Tier 1 */}
        <div className="mt-6 p-5 sm:p-6 bg-slate-900/90 rounded-3xl border border-slate-800 shadow-md">
          <div className="flex items-center gap-2.5 text-sm sm:text-base font-bold text-slate-200 mb-4">
            <Lightbulb className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="text-cyan-300 font-black">
              {card.followUpPrompt ? 'Chòm sao suy ngẫm 1:' : 'Chòm sao suy ngẫm:'}
            </span>
            <span className="text-white font-extrabold text-base sm:text-lg leading-relaxed">
              {card.socraticPrompt.question}
            </span>
          </div>

          <div className="space-y-3">
            {card.socraticPrompt.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const isWrongAttempt = attemptedWrongIds.includes(opt.id);

              let btnClass = 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-100 hover:border-cyan-500/50 hover:text-white';

              if (isPrompt1Correct && opt.isCorrect) {
                btnClass = 'bg-emerald-950/80 border-emerald-400 text-emerald-200 ring-2 ring-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.35)] cursor-default';
              } else if (isSelected && !opt.isCorrect) {
                btnClass = 'bg-rose-950/80 border-rose-500 text-rose-200 ring-2 ring-rose-500/50';
              } else if (isWrongAttempt) {
                btnClass = 'bg-rose-950/40 border-rose-500/40 text-rose-300 opacity-80';
              } else if (isPrompt1Correct) {
                btnClass = 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60 cursor-default';
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isPrompt1Correct}
                  onClick={() => handleSelectOption1(opt)}
                  className={`w-full p-4 sm:p-5 rounded-2xl border-2 text-left text-sm sm:text-base font-bold transition-all flex items-start gap-3.5 active:scale-[0.99] leading-relaxed ${btnClass}`}
                >
                  <span className="w-7 h-7 rounded-xl border-2 border-current flex items-center justify-center shrink-0 text-xs sm:text-sm font-black mt-0.5 font-mono">
                    {opt.id.toUpperCase().replace('OPT', '')}
                  </span>
                  <span className="flex-1 leading-relaxed">{opt.label}</span>
                  {isPrompt1Correct && opt.isCorrect && (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {((isSelected && !opt.isCorrect) || isWrongAttempt) && !isPrompt1Correct && (
                    <XCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback for Tier 1 */}
          {selectedOption1 && (
            <div className={`mt-4 p-4 sm:p-5 rounded-2xl border animate-fade-in text-sm sm:text-base leading-relaxed ${
              selectedOption1.isCorrect 
                ? 'bg-emerald-950/80 border-emerald-500/70 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                : 'bg-rose-950/80 border-rose-500/70 text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
            }`}>
              <div className="font-black flex items-center gap-2 mb-1.5 text-base sm:text-lg">
                {selectedOption1.isCorrect ? (
                  <>
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    <span>Tín hiệu chính xác!</span>
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-5 h-5 text-rose-400" />
                    <span>Gợi ý từ trạm chỉ huy (Hãy thử suy ngẫm và chọn lại nhé):</span>
                  </>
                )}
              </div>
              <p className="leading-relaxed font-semibold">{selectedOption1.feedback}</p>
            </div>
          )}
        </div>

        {/* Socratic Interactive Choice Prompt - Tier 2 (Follow-up if available) - [TARGET FOCUS ELEMENT] */}
        {card.followUpPrompt && isPrompt1Correct && (
          <div className="mt-5 p-5 sm:p-6 bg-gradient-to-br from-cyan-950/60 via-purple-950/50 to-slate-900/90 rounded-3xl border-2 border-cyan-400/80 shadow-[0_0_30px_rgba(0,240,255,0.25)] animate-fade-in text-white backdrop-blur-md relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm sm:text-base font-bold text-slate-200 mb-4">
              <span className="text-cyan-300 font-black flex items-center gap-2 shrink-0">
                <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
                Chòm Sao Suy Ngẫm 2 (Khám Phá Sâu Bản Chất):
              </span>
              <span className="text-sm sm:text-base font-extrabold text-cyan-100 bg-cyan-900/50 border border-cyan-500/40 px-4 py-2 rounded-2xl shadow-inner leading-relaxed flex-1">
                {card.followUpPrompt.question}
              </span>
            </div>

            <div className="space-y-3">
              {card.followUpPrompt.options.map((opt) => {
                const isSelected = followUpSelectedId === opt.id;
                const isWrongAttempt = followUpAttemptedWrongIds.includes(opt.id);

                let btnClass = 'bg-slate-900/85 hover:bg-slate-800 border-slate-700 text-slate-100 hover:border-cyan-400/60 hover:text-white';

                if (isFollowUpCorrect && opt.isCorrect) {
                  btnClass = 'bg-emerald-950/80 border-emerald-400 text-emerald-200 ring-2 ring-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.35)] cursor-default';
                } else if (isSelected && !opt.isCorrect) {
                  btnClass = 'bg-rose-950/80 border-rose-500 text-rose-200 ring-2 ring-rose-500/50';
                } else if (isWrongAttempt) {
                  btnClass = 'bg-rose-950/40 border-rose-500/40 text-rose-300 opacity-80';
                } else if (isFollowUpCorrect) {
                  btnClass = 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60 cursor-default';
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={isFollowUpCorrect}
                    onClick={() => handleSelectFollowUpOption(opt)}
                    className={`w-full p-4 sm:p-5 rounded-2xl border-2 text-left text-sm sm:text-base font-bold transition-all flex items-start gap-3.5 active:scale-[0.99] leading-relaxed ${btnClass}`}
                  >
                    <span className="w-7 h-7 rounded-xl border-2 border-current flex items-center justify-center shrink-0 text-xs sm:text-sm font-black mt-0.5 font-mono">
                      {opt.id.toUpperCase().replace('FUP', '')}
                    </span>
                    <span className="flex-1 leading-relaxed">{opt.label}</span>
                    {isFollowUpCorrect && opt.isCorrect && (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {((isSelected && !opt.isCorrect) || isWrongAttempt) && !isFollowUpCorrect && (
                      <XCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback for Tier 2 */}
            {selectedFollowUpOption && (
              <div className={`mt-4 p-4 sm:p-5 rounded-2xl border animate-fade-in text-sm sm:text-base leading-relaxed ${
                selectedFollowUpOption.isCorrect 
                  ? 'bg-emerald-950/80 border-emerald-500/70 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                  : 'bg-rose-950/80 border-rose-500/70 text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
              }`}>
                <div className="font-black flex items-center gap-2 mb-1.5 text-base sm:text-lg">
                  {selectedFollowUpOption.isCorrect ? (
                    <>
                      <Sparkles className="w-5 h-5 text-emerald-400" />
                      <span>Tuyệt đỉnh tư duy thiên hà!</span>
                    </>
                  ) : (
                    <>
                      <HelpCircle className="w-5 h-5 text-rose-400" />
                      <span>Cùng suy ngẫm lại (Hãy tự tin chọn lại nhé):</span>
                    </>
                  )}
                </div>
                <p className="leading-relaxed font-semibold">{selectedFollowUpOption.feedback}</p>
              </div>
            )}
          </div>
        )}

        {/* GATED INSIGHT: "Lõi Năng Lượng Vũ Trụ" (Chỉ hiện khi hoàn thành câu hỏi suy ngẫm!) */}
        {!isTakeawayUnlocked ? (
          <div className="mt-6 p-5 sm:p-6 rounded-3xl border-2 border-dashed border-cyan-500/40 bg-cyan-950/20 flex items-center gap-4 text-cyan-200">
            <div className="w-12 h-12 rounded-2xl bg-cyan-900/50 border border-cyan-500/50 flex items-center justify-center text-2xl shrink-0 shadow-xs">
              <Lock className="w-6 h-6 text-cyan-400 animate-pulse" />
            </div>
            <div className="flex-1">
              <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-cyan-300 block font-mono">
                LÕI NĂNG LƯỢNG BẢN CHẤT (ĐANG KHÓA)
              </span>
              <span className="text-sm sm:text-base text-cyan-200/90 font-medium leading-relaxed">
                Hãy suy nghĩ và chọn đúng câu trả lời bên trên để kích hoạt Lõi Năng Lượng và thắp sáng hành tinh nhé!
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-6 p-5 sm:p-7 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-slate-950 rounded-3xl shadow-[0_0_35px_rgba(251,191,36,0.55)] border-2 border-amber-200 animate-unlock-glow flex items-start gap-4 sm:gap-5">
            <div className="w-12 h-12 rounded-2xl bg-white/40 backdrop-blur-md flex items-center justify-center text-3xl shrink-0 border border-white/50 shadow-inner">
              ✨
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-black uppercase tracking-wider bg-black/25 text-amber-950 px-3.5 py-1 rounded-full border border-black/10 flex items-center gap-1.5 font-mono">
                  <Key className="w-3.5 h-3.5 text-slate-950" />
                  ĐÃ KÍCH HOẠT LÕI NĂNG LƯỢNG BẢN CHẤT
                </span>
              </div>
              <p className="text-base sm:text-xl font-black leading-relaxed text-slate-950">
                {card.keyTakeaway}
              </p>
            </div>
          </div>
        )}

        {/* Navigation Step Actions - Seamless Transition to Next Stage */}
        <div className="mt-8 pt-5 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onPrevStep();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={currentStep === 1}
            className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-colors ${
              currentStep === 1
                ? 'text-slate-600 cursor-not-allowed'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/90 border border-slate-700'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Chặng trước</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm font-black text-cyan-300 font-mono hidden sm:inline bg-cyan-950/60 border border-cyan-500/40 px-3 py-1.5 rounded-xl">
              Chặng {currentStep} / {totalSteps}
            </span>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onNextStep();
                }}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs sm:text-sm md:text-base flex items-center gap-2.5 shadow-[0_0_20px_rgba(0,240,255,0.45)] active:scale-95 transition-transform"
              >
                <span>
                  {nextStageTitle 
                    ? `Tiến Sang Chặng ${currentStep + 1}: ${nextStageTitle.split(':')[0] || 'Kế tiếp'}`
                    : `Tiến Sang Chặng ${currentStep + 1} / ${totalSteps}`}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  sound.playVictory();
                  onCompleteDiscovery();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs sm:text-sm md:text-base flex items-center gap-2.5 shadow-[0_0_25px_rgba(251,191,36,0.6)] active:scale-95 transition-transform"
              >
                <span>Vào Thử Thách Hành Tinh Ngay</span>
                <Sparkles className="w-4 h-4 text-slate-950" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

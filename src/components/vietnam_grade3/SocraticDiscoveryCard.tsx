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
  onNextStep: () => void;
  onPrevStep: () => void;
  onCompleteDiscovery: () => void;
}

export const SocraticDiscoveryCard: React.FC<SocraticDiscoveryCardProps> = ({
  card,
  currentStep,
  totalSteps,
  lessonId,
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
        const { groupCount = 3, itemsPerGroup = 12, itemIcon = '🧁', groupLabels = [] } = card.visualData;
        return (
          <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4 sm:p-5 my-4">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-amber-600" />
                <span>{groupCount} khay bằng nhau</span>
              </span>
              <span className="text-xs font-black text-amber-800 bg-amber-200/70 px-2.5 py-1 rounded-full">
                Mỗi khay: {itemsPerGroup} chiếc
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Array.from({ length: Math.min(groupCount, 3) }).map((_, gIdx) => (
                <div 
                  key={gIdx}
                  className="bg-white border-2 border-amber-200 rounded-xl p-3 shadow-xs flex flex-col items-center"
                >
                  <div className="text-xs font-bold text-slate-600 mb-2">
                    {groupLabels[gIdx] || `Khay ${gIdx + 1}`}
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 p-2 bg-amber-50/40 rounded-lg w-full justify-items-center">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <span key={i} className="text-base select-none transform hover:scale-125 transition-transform" title={`Bánh ${i+1}`}>
                        {itemIcon}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-black text-amber-700 mt-2">
                    = 12 cái bánh
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-amber-200/80 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-bold text-slate-700">
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-amber-200">
                <span className="text-slate-500">Cách cộng dài:</span>
                <span className="text-amber-700 font-mono font-black">12 + 12 + 12 = 36</span>
              </span>
              <span className="text-amber-500 font-black">⇌</span>
              <span className="flex items-center gap-1.5 bg-amber-600 text-white px-3.5 py-1.5 rounded-lg shadow-xs">
                <span>Cách nhân nhanh:</span>
                <span className="font-mono font-black">12 × 3 = 36</span>
              </span>
            </div>
          </div>
        );
      }

      case 'multiplication_carry': {
        const { factorA = 26, factorB = 3, step1, step2, result = 78, hasCarry } = card.visualData;
        return (
          <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-4 sm:p-5 my-4">
            <div className="text-xs font-bold text-sky-900 mb-3 flex items-center gap-1.5">
              <Equal className="w-4 h-4 text-sky-600" />
              Đặt tính thẳng cột từ phải sang trái
            </div>

            <div className="flex flex-col md:flex-row items-center justify-around gap-6">
              <div className="bg-white border-2 border-sky-300 rounded-xl p-4 shadow-sm font-mono text-xl sm:text-2xl font-black text-slate-800 w-44 text-right pr-6">
                <div className="text-xs font-sans text-sky-600 font-bold mb-1 flex justify-end gap-5">
                  <span>Chục</span>
                  <span>Đ.vị</span>
                </div>
                {hasCarry && (
                  <div className="text-xs text-rose-500 font-sans font-bold text-left pl-2">
                    (Nhớ 1) ↙
                  </div>
                )}
                <div>{factorA}</div>
                <div className="border-b-2 border-slate-700 pb-1 flex justify-between items-center">
                  <span className="text-base text-sky-600 font-sans">×</span>
                  <span>{factorB}</span>
                </div>
                <div className="pt-1 text-emerald-600 font-black">{result}</div>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 max-w-md">
                <div className="p-2.5 bg-white rounded-xl border border-sky-200">
                  <span className="font-black text-sky-800 block mb-0.5">Nhân hàng đơn vị trước:</span>
                  <span>{step1 || 'Nhân chữ số hàng đơn vị. Nếu kết quả ≥ 10, nhớ phần chục sang bên trái.'}</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-sky-200">
                  <span className="font-black text-sky-800 block mb-0.5">Nhân hàng chục & cộng nhớ:</span>
                  <span>{step2 || 'Nhân chữ số hàng chục rồi cộng thêm số đã nhớ vào kết quả.'}</span>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'scale_up_comparison': {
        const { barA, barB, maiCount, namMultiplied, lanAdded } = card.visualData;
        return (
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 sm:p-5 my-4">
            <div className="text-xs font-bold text-emerald-900 mb-3 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-emerald-600" />
              So sánh trực quan: Gấp số lần vs Thêm đơn vị
            </div>

            {barA && barB ? (
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                    <span>{barA.label}</span>
                    <span className="text-emerald-700 font-mono">{barA.value} cm</span>
                  </div>
                  <div className="h-6 w-24 bg-emerald-400 rounded-md shadow-xs border border-emerald-500 flex items-center justify-center text-xs font-black text-white">
                    2 cm
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                    <span>{barB.label}</span>
                    <span className="text-emerald-700 font-mono font-black">{barB.value} cm</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="h-6 w-24 bg-emerald-600 rounded-md shadow-xs border border-emerald-700 flex items-center justify-center text-xs font-black text-white">
                      2 cm
                    </div>
                    <div className="h-6 w-24 bg-emerald-600 rounded-md shadow-xs border border-emerald-700 flex items-center justify-center text-xs font-black text-white">
                      2 cm
                    </div>
                    <div className="h-6 w-24 bg-emerald-600 rounded-md shadow-xs border border-emerald-700 flex items-center justify-center text-xs font-black text-white">
                      2 cm
                    </div>
                  </div>
                  <div className="text-[11px] text-emerald-800 font-bold mt-1">
                    = 3 đoạn 2 cm ghép lại: 2 × 3 = 6 cm
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="bg-white p-3.5 rounded-xl border-2 border-emerald-400 shadow-xs">
                  <div className="font-black text-emerald-800 mb-1">⚡ GẤP 4 LẦN (Phép nhân)</div>
                  <div className="text-slate-600">Bạn Nam có số kẹp gấp 4 lần Mai:</div>
                  <div className="text-base font-black text-emerald-600 font-mono mt-1">
                    {namMultiplied}
                  </div>
                </div>
                <div className="bg-white p-3.5 rounded-xl border-2 border-amber-300 shadow-xs">
                  <div className="font-black text-amber-800 mb-1">➕ NHIỀU HƠN 4 CÁI (Phép cộng)</div>
                  <div className="text-slate-600">Bạn Lan có nhiều hơn Mai 4 kẹp:</div>
                  <div className="text-base font-black text-amber-600 font-mono mt-1">
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
          <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-4 sm:p-5 my-4">
            <div className="text-xs font-bold text-rose-900 mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Split className="w-4 h-4 text-rose-600" />
                Có {totalItems} quả chia đều cho 2 bạn
              </span>
              <span className="text-rose-700 font-mono font-black text-xs bg-rose-100 px-2.5 py-1 rounded-full">
                {leftover === 0 ? 'Chia hết (dư 0)' : `Chia có dư (dư ${leftover})`}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border-2 border-rose-200 rounded-xl p-3 shadow-xs">
                <div className="text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
                  <span>🐰 Bạn Thỏ nhận được:</span>
                  <span className="font-mono font-black text-rose-600">{eachGets} quả</span>
                </div>
                <div className="flex gap-2 text-2xl p-2 bg-rose-50/40 rounded-lg">
                  {Array.from({ length: eachGets }).map((_, i) => (
                    <span key={i}>{itemIcon}</span>
                  ))}
                </div>
              </div>

              <div className="bg-white border-2 border-rose-200 rounded-xl p-3 shadow-xs">
                <div className="text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
                  <span>🐻 Bạn Gấu nhận được:</span>
                  <span className="font-mono font-black text-rose-600">{eachGets} quả</span>
                </div>
                <div className="flex gap-2 text-2xl p-2 bg-rose-50/40 rounded-lg">
                  {Array.from({ length: eachGets }).map((_, i) => (
                    <span key={i}>{itemIcon}</span>
                  ))}
                </div>
              </div>
            </div>

            {leftover > 0 && (
              <div className="mt-3 p-3 bg-amber-100/90 border border-amber-300 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl animate-bounce-slow">{itemIcon}</span>
                  <span className="text-xs sm:text-sm font-black text-amber-900">
                    Phần còn lại không thể chia đều: <span className="underline">SỐ DƯ = {leftover}</span>
                  </span>
                </div>
                <span className="text-[11px] font-bold text-amber-800 bg-white px-2 py-0.5 rounded-full border border-amber-300">
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
          <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-4 sm:p-5 my-4">
            <div className="text-xs font-bold text-purple-900 mb-3 flex items-center gap-1.5">
              <Split className="w-4 h-4 text-purple-600" />
              Quy trình chia từ hàng chục sang hàng đơn vị
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-around gap-4">
              <div className="bg-white border-2 border-purple-300 rounded-xl p-4 font-mono font-black text-slate-800 text-lg w-48 shadow-sm">
                <div className="flex justify-between border-b-2 border-slate-700 pb-1">
                  <span>{dividend}</span>
                  <span className="text-purple-600 border-l-2 border-slate-700 pl-3">{divisor}</span>
                </div>
                <div className="flex justify-end text-emerald-600 pt-1 text-xl">
                  {result}
                </div>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-slate-700 max-w-md">
                <div className="p-2 bg-white rounded-lg border border-purple-200">
                  <span className="font-bold text-purple-800 block">Lượt 1 (Hàng chục):</span>
                  <span>{stepTens || 'Chia chữ số hàng chục cho số chia, tìm số dư.'}</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-purple-200">
                  <span className="font-bold text-purple-800 block">Ghép số:</span>
                  <span>{stepCombine || 'Hạ chữ số hàng đơn vị xuống ghép với số dư.'}</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-purple-200">
                  <span className="font-bold text-purple-800 block">Lượt 2 (Hàng đơn vị):</span>
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
          <div className="bg-teal-50/70 border border-teal-200 rounded-2xl p-4 sm:p-5 my-4">
            <div className="text-xs font-bold text-teal-900 mb-3 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-teal-600" />
              Giảm đi số lần (Phép chia) vs Bớt đi đơn vị (Phép trừ)
            </div>

            {barCD && barAB ? (
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                    <span>{barCD.label}</span>
                    <span className="text-teal-700 font-mono font-black">6 cm</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="h-6 w-20 bg-teal-600 rounded-md flex items-center justify-center text-xs font-bold text-white shadow-xs">
                      2 cm
                    </div>
                    <div className="h-6 w-20 bg-teal-600 rounded-md flex items-center justify-center text-xs font-bold text-white shadow-xs">
                      2 cm
                    </div>
                    <div className="h-6 w-20 bg-teal-600 rounded-md flex items-center justify-center text-xs font-bold text-white shadow-xs">
                      2 cm
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                    <span>{barAB.label}</span>
                    <span className="text-teal-700 font-mono font-black">2 cm</span>
                  </div>
                  <div className="h-6 w-20 bg-emerald-500 rounded-md flex items-center justify-center text-xs font-black text-white shadow-xs">
                    2 cm
                  </div>
                  <span className="text-[11px] font-bold text-teal-800 mt-1 block">
                    = Chỉ lấy 1 phần trong 3 phần bằng nhau: 6 : 3 = 2 cm
                  </span>
                </div>
              </div>
            ) : case1 && case2 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="bg-white p-3.5 rounded-xl border-2 border-teal-400 shadow-xs">
                  <div className="font-black text-teal-800 mb-1">📉 GIẢM ĐI 3 LẦN (Phép chia)</div>
                  <div className="text-slate-600">Chia đều 3 phần, chỉ giữ 1 phần:</div>
                  <div className="text-base font-black text-teal-700 font-mono mt-1">
                    {case1}
                  </div>
                </div>
                <div className="bg-white p-3.5 rounded-xl border-2 border-slate-300 shadow-xs">
                  <div className="font-black text-slate-800 mb-1">➖ BỚT ĐI 3 CON (Phép trừ)</div>
                  <div className="text-slate-600">Bán bớt đúng 3 con gà:</div>
                  <div className="text-base font-black text-slate-700 font-mono mt-1">
                    {case2}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-white rounded-xl border border-teal-200 text-center font-bold text-xs sm:text-sm text-slate-700">
                <span className="text-teal-700 font-mono">{start}</span>
                <span className="mx-2 text-slate-400">─(Gấp 4 lần: × 4)─▶</span>
                <span className="text-indigo-700 font-mono">{stepA}</span>
                <span className="mx-2 text-slate-400">─(Giảm 4 lần: : 4)─▶</span>
                <span className="text-emerald-700 font-mono font-black">{stepB}</span>
              </div>
            )}
          </div>
        );
      }

      case 'two_step_bar_model': {
        const { row1 = 3, step1Result, step2Result } = card.visualData;
        return (
          <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-4 sm:p-5 my-4">
            <div className="text-xs font-bold text-indigo-900 mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-600" />
              Đi tìm đại lượng trung gian ẩn giấu
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-600 w-24">Hàng trên:</span>
                <div className="h-6 w-24 bg-indigo-400 rounded-md flex items-center justify-center text-xs font-bold text-white shadow-xs">
                  {row1} bông hoa
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-600 w-24">Hàng dưới:</span>
                <div className="flex gap-1 items-center">
                  <div className="h-6 w-24 bg-indigo-500 rounded-md flex items-center justify-center text-xs font-bold text-white">
                    3 bông
                  </div>
                  <div className="h-6 w-16 bg-amber-400 rounded-md border border-dashed border-amber-600 flex items-center justify-center text-xs font-bold text-amber-950">
                    + 2 bông
                  </div>
                  <span className="text-xs font-black text-indigo-800 ml-2">
                    = ? (Chưa biết!)
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-indigo-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-white rounded-xl border border-indigo-200">
                  <span className="font-black text-indigo-700 block mb-1">Bước 1: Tìm hàng dưới</span>
                  <span>{step1Result || '3 + 2 = 5 bông hoa'}</span>
                </div>
                <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-xs">
                  <span className="font-black text-indigo-100 block mb-1">Bước 2: Tìm cả hai hàng</span>
                  <span className="font-bold">{step2Result || '3 + 5 = 8 bông hoa'}</span>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'practical_farm': {
        const { pillars, totalCorn, keptForSeeds, remainingCalculation, baskets, perBasket } = card.visualData;
        return (
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 sm:p-5 my-4">
            <div className="text-xs font-bold text-amber-900 mb-3 flex items-center gap-1.5">
              <span className="text-base">🌾</span>
              Tình huống nông trại thực tế
            </div>

            {pillars ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {pillars.map((p: string, idx: number) => (
                  <div key={idx} className="p-2.5 bg-white rounded-xl border border-amber-200 flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-slate-700">{p}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-amber-200">
                  <span className="font-bold text-slate-700">Tổng số ngô thu hoạch:</span>
                  <span className="font-mono font-black text-amber-700 text-base">{totalCorn} bắp ngô 🌽</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-3 bg-amber-100/70 rounded-xl border border-amber-300">
                    <span className="font-bold text-amber-900 block mb-0.5">Bước 1: Bớt hạt giống (Trừ)</span>
                    <span className="font-mono font-bold text-slate-800">{remainingCalculation}</span>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-300">
                    <span className="font-bold text-emerald-900 block mb-0.5">Bước 2: Chia vào {baskets} rổ (Chia)</span>
                    <span className="font-mono font-bold text-slate-800">{perBasket}</span>
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
    <div className="bg-[#0B0F19] rounded-3xl border-2 border-cyan-500/30 shadow-[0_0_40px_rgba(0,240,255,0.08)] overflow-hidden animate-fade-in font-sans relative text-white">
      {/* Top Cosmic Telemetry Header */}
      <div className="bg-gradient-to-r from-cyan-950/90 via-blue-950/90 to-purple-950/90 border-b border-cyan-500/30 text-white px-5 sm:px-7 py-3.5 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/60 text-cyan-300 flex items-center justify-center font-black text-sm shadow-[0_0_10px_rgba(0,240,255,0.4)]">
            {currentStep}
          </div>
          <div>
            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block font-mono">
              TRẠM KHÁM PHÁ · {card.stageTitle}
            </span>
            <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-1.5">
              <span>Bản Chất Toán Học Thiên Hà</span>
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </h3>
          </div>
        </div>

        <div className="text-xs font-bold text-cyan-200 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/40 shadow-inner font-mono">
          CHẶNG {currentStep} / {totalSteps}
        </div>
      </div>

      <div className="p-5 sm:p-7">
        {/* Core Socratic Question - Cosmic HUD Focus */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900/95 via-cyan-950/30 to-purple-950/30 border-2 border-cyan-500/40 mb-5 shadow-[0_0_20px_rgba(0,240,255,0.08)]">
          <div className="flex items-start gap-3.5">
            <span className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 flex items-center justify-center text-xl font-black shrink-0 shadow-[0_0_12px_rgba(0,240,255,0.3)]">
              🪐
            </span>
            <div className="flex-1">
              <span className="text-[11px] font-black uppercase text-cyan-400 tracking-wider block mb-1 font-mono">
                Tín hiệu triết lý từ hệ mặt trời:
              </span>
              <h4 className="text-base sm:text-xl font-black text-white leading-snug">
                {card.questionText}
              </h4>
              {card.subText && (
                <p className="text-xs sm:text-sm text-slate-300 mt-2 font-medium leading-relaxed">
                  {card.subText}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Visual Intuition Model */}
        {renderVisual()}

        {/* Socratic Interactive Choice Prompt - Tier 1 */}
        <div className="mt-5 p-4 sm:p-5 bg-slate-900/90 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-200 mb-3.5">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-cyan-400 font-black">
              {card.followUpPrompt ? 'Chòm sao suy ngẫm 1:' : 'Chòm sao suy ngẫm:'}
            </span>
            <span className="text-white font-bold">
              {card.socraticPrompt.question}
            </span>
          </div>

          <div className="space-y-2.5">
            {card.socraticPrompt.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const isWrongAttempt = attemptedWrongIds.includes(opt.id);

              let btnClass = 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-cyan-500/50 hover:text-white';

              if (isPrompt1Correct && opt.isCorrect) {
                btnClass = 'bg-emerald-950/70 border-emerald-400 text-emerald-200 ring-2 ring-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-default';
              } else if (isSelected && !opt.isCorrect) {
                btnClass = 'bg-rose-950/70 border-rose-500 text-rose-200 ring-2 ring-rose-500/50';
              } else if (isWrongAttempt) {
                btnClass = 'bg-rose-950/30 border-rose-500/40 text-rose-300 opacity-80';
              } else if (isPrompt1Correct) {
                btnClass = 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60 cursor-default';
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isPrompt1Correct}
                  onClick={() => handleSelectOption1(opt)}
                  className={`w-full p-3.5 rounded-2xl border-2 text-left text-xs sm:text-sm font-bold transition-all flex items-start gap-3 active:scale-[0.99] ${btnClass}`}
                >
                  <span className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center shrink-0 text-xs font-black mt-0.5">
                    {opt.id.toUpperCase().replace('OPT', '')}
                  </span>
                  <span className="flex-1 leading-relaxed">{opt.label}</span>
                  {isPrompt1Correct && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {((isSelected && !opt.isCorrect) || isWrongAttempt) && !isPrompt1Correct && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback for Tier 1 */}
          {selectedOption1 && (
            <div className={`mt-3.5 p-3.5 rounded-xl border animate-fade-in text-xs sm:text-sm ${
              selectedOption1.isCorrect 
                ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-200' 
                : 'bg-rose-950/70 border-rose-500/60 text-rose-200'
            }`}>
              <div className="font-black flex items-center gap-1.5 mb-1">
                {selectedOption1.isCorrect ? (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Tín hiệu chính xác!</span>
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-4 h-4 text-rose-400" />
                    <span>Gợi ý từ trạm chỉ huy (Hãy thử lại nhé):</span>
                  </>
                )}
              </div>
              <p className="leading-relaxed font-medium">{selectedOption1.feedback}</p>
            </div>
          )}
        </div>

        {/* Socratic Interactive Choice Prompt - Tier 2 (Follow-up if available) - [TARGET FOCUS ELEMENT] */}
        {card.followUpPrompt && isPrompt1Correct && (
          <div className="mt-4 p-4 sm:p-5 bg-gradient-to-br from-cyan-950/50 via-purple-950/40 to-slate-900/90 rounded-2xl border-2 border-cyan-400/80 shadow-[0_0_25px_rgba(0,240,255,0.25)] animate-fade-in text-white backdrop-blur-md relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs sm:text-sm font-bold text-slate-200 mb-3.5">
              <span className="text-cyan-300 font-black flex items-center gap-1.5 shrink-0">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                Chòm Sao Suy Ngẫm 2 (Khám Phá Sâu Bản Chất):
              </span>
              <span className="text-xs sm:text-sm md:text-base font-extrabold text-cyan-100 bg-cyan-900/40 border border-cyan-500/40 px-3.5 py-1.5 rounded-xl shadow-inner leading-snug flex-1">
                {card.followUpPrompt.question}
              </span>
            </div>

            <div className="space-y-2.5">
              {card.followUpPrompt.options.map((opt) => {
                const isSelected = followUpSelectedId === opt.id;
                const isWrongAttempt = followUpAttemptedWrongIds.includes(opt.id);

                let btnClass = 'bg-slate-900/80 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-cyan-400/60 hover:text-white';

                if (isFollowUpCorrect && opt.isCorrect) {
                  btnClass = 'bg-emerald-950/70 border-emerald-400 text-emerald-200 ring-2 ring-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-default';
                } else if (isSelected && !opt.isCorrect) {
                  btnClass = 'bg-rose-950/70 border-rose-500 text-rose-200 ring-2 ring-rose-500/50';
                } else if (isWrongAttempt) {
                  btnClass = 'bg-rose-950/30 border-rose-500/40 text-rose-300 opacity-80';
                } else if (isFollowUpCorrect) {
                  btnClass = 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60 cursor-default';
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={isFollowUpCorrect}
                    onClick={() => handleSelectFollowUpOption(opt)}
                    className={`w-full p-3.5 rounded-2xl border-2 text-left text-xs sm:text-sm font-bold transition-all flex items-start gap-3 active:scale-[0.99] ${btnClass}`}
                  >
                    <span className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center shrink-0 text-xs font-black mt-0.5">
                      {opt.id.toUpperCase().replace('FUP', '')}
                    </span>
                    <span className="flex-1 leading-relaxed">{opt.label}</span>
                    {isFollowUpCorrect && opt.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {((isSelected && !opt.isCorrect) || isWrongAttempt) && !isFollowUpCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback for Tier 2 */}
            {selectedFollowUpOption && (
              <div className={`mt-3.5 p-3.5 rounded-xl border animate-fade-in text-xs sm:text-sm ${
                selectedFollowUpOption.isCorrect 
                  ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-200' 
                  : 'bg-rose-950/70 border-rose-500/60 text-rose-200'
              }`}>
                <div className="font-black flex items-center gap-1.5 mb-1">
                  {selectedFollowUpOption.isCorrect ? (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>Tuyệt đỉnh tư duy thiên hà!</span>
                    </>
                  ) : (
                    <>
                      <HelpCircle className="w-4 h-4 text-rose-400" />
                      <span>Cùng suy ngẫm lại (Hãy chọn lại nhé):</span>
                    </>
                  )}
                </div>
                <p className="leading-relaxed font-medium">{selectedFollowUpOption.feedback}</p>
              </div>
            )}
          </div>
        )}

        {/* GATED INSIGHT: "Lõi Năng Lượng Vũ Trụ" (Chỉ hiện khi hoàn thành câu hỏi suy ngẫm!) */}
        {!isTakeawayUnlocked ? (
          <div className="mt-5 p-4 sm:p-5 rounded-2xl border-2 border-dashed border-cyan-500/40 bg-cyan-950/20 flex items-center gap-3.5 text-cyan-200">
            <div className="w-10 h-10 rounded-2xl bg-cyan-900/40 border border-cyan-500/50 flex items-center justify-center text-xl shrink-0 shadow-xs">
              <Lock className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-black uppercase tracking-wider text-cyan-300 block font-mono">
                LÕI NĂNG LƯỢNG BẢN CHẤT (ĐANG KHÓA)
              </span>
              <span className="text-xs text-cyan-200/80 font-semibold leading-relaxed">
                Hãy suy nghĩ và chọn đúng câu trả lời bên trên để kích hoạt Lõi Năng Lượng và thắp sáng hành tinh nhé!
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-5 p-4 sm:p-5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 rounded-2xl shadow-[0_0_35px_rgba(251,191,36,0.5)] border-2 border-amber-200 animate-unlock-glow flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-white/30 backdrop-blur-md flex items-center justify-center text-2xl shrink-0 border border-white/40 shadow-inner">
              ✨
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider bg-black/30 text-amber-950 px-2.5 py-0.5 rounded-full border border-black/10 flex items-center gap-1">
                  <Key className="w-3 h-3 text-slate-950" />
                  ĐÃ KÍCH HOẠT LÕI NĂNG LƯỢNG BẢN CHẤT
                </span>
              </div>
              <p className="text-sm sm:text-base font-black leading-snug text-slate-950">
                {card.keyTakeaway}
              </p>
            </div>
          </div>
        )}

        {/* Navigation Step Actions */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onPrevStep();
            }}
            disabled={currentStep === 1}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors ${
              currentStep === 1
                ? 'text-slate-600 cursor-not-allowed'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Chặng trước</span>
          </button>

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onNextStep();
              }}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.4)] active:scale-95 transition-transform"
            >
              <span>Bay sang chặng tiếp theo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onCompleteDiscovery();
              }}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(251,191,36,0.5)] active:scale-95 transition-transform"
            >
              <span>Vào Thử Thách Hành Tinh Ngay</span>
              <Sparkles className="w-4 h-4 text-slate-950" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

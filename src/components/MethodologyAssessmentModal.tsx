import React, { useState } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Award,
  Lightbulb,
  Check,
  Brain,
  Sliders,
  Divide,
  BookmarkPlus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';

interface MethodologyAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveToNotebook?: (title: string, summary: string) => void;
}

export const MethodologyAssessmentModal: React.FC<MethodologyAssessmentModalProps> = ({
  isOpen,
  onClose,
  onSaveToNotebook
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showCutLine, setShowCutLine] = useState<boolean>(true);
  const [savedToNotebook, setSavedToNotebook] = useState<boolean>(false);

  // --- Step 1 States (Visual essence) ---
  const [step1LongBarAnswer, setStep1LongBarAnswer] = useState('');
  const [step1ShortBarAnswer, setStep1ShortBarAnswer] = useState('');
  const [step1Submitted, setStep1Submitted] = useState(false);
  const [step1IsCorrect, setStep1IsCorrect] = useState(false);

  // --- Step 2 States (Concepts of More & Less) ---
  const [step2MoreMeaning, setStep2MoreMeaning] = useState('');
  const [step2LessMeaning, setStep2LessMeaning] = useState('');
  const [step2SymmetryVal, setStep2SymmetryVal] = useState('');
  const [step2Submitted, setStep2Submitted] = useState(false);
  const [step2IsCorrect, setStep2IsCorrect] = useState(false);

  // --- Step 3 States (Operation Mechanics & Why Subtraction) ---
  const [step3Term1, setStep3Term1] = useState('');
  const [step3Term2, setStep3Term2] = useState('');
  const [step3Result, setStep3Result] = useState('');
  const [step3WhyMinus, setStep3WhyMinus] = useState<string | null>(null);
  const [step3Submitted, setStep3Submitted] = useState(false);
  const [step3IsCorrect, setStep3IsCorrect] = useState(false);

  // --- Step 4 States (Real-World Bottle Case 18L vs 12L + Equal Sharing) ---
  const [step4DiffCalc, setStep4DiffCalc] = useState('');
  const [step4TransferVal, setStep4TransferVal] = useState('');
  const [step4WhyHalve, setStep4WhyHalve] = useState<string | null>(null);
  const [step4Submitted, setStep4Submitted] = useState(false);
  const [step4IsCorrect, setStep4IsCorrect] = useState(false);

  // --- Step 5 Final Certificate ---
  const [studentName, setStudentName] = useState('Nhà Toán Học Nhí');

  if (!isOpen) return null;

  // Validation Helpers
  const normalize = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const checkStep1 = () => {
    const a1 = normalize(step1LongBarAnswer);
    const a2 = normalize(step1ShortBarAnswer);

    // Accept variations like: "so lon", "lon hon", "nhieu hon", "dai hon"
    const validLong = a1.includes('lon') || a1.includes('nhieu') || a1.includes('dai');
    // Accept variations like: "so be", "nho hon", "be hon", "it hon", "ngan hon"
    const validShort = a2.includes('be') || a2.includes('nho') || a2.includes('it') || a2.includes('ngan');

    setStep1Submitted(true);
    if (validLong && validShort) {
      setStep1IsCorrect(true);
      sound.playCorrect();
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    } else {
      setStep1IsCorrect(false);
      sound.playWrong();
    }
  };

  const checkStep2 = () => {
    const mMore = normalize(step2MoreMeaning);
    const mLess = normalize(step2LessMeaning);
    const sym = step2SymmetryVal.trim();

    // Check symmetry: If A is 6 more than B, B is 6 less than A
    const validSym = sym === '6' || sym === '6 lít' || sym === '6L';
    const validMore = mMore.includes('doi') || mMore.includes('thua') || mMore.includes('vuot') || mMore.includes('nhieu') || mMore.includes('chenh');
    const validLess = mLess.includes('thieu') || mLess.includes('hut') || mLess.includes('kem') || mLess.includes('it') || mLess.includes('chua du');

    setStep2Submitted(true);
    if (validSym && (validMore || step2MoreMeaning.length > 3) && (validLess || step2LessMeaning.length > 3)) {
      setStep2IsCorrect(true);
      sound.playCorrect();
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    } else {
      setStep2IsCorrect(false);
      sound.playWrong();
    }
  };

  const checkStep3 = () => {
    const t1 = normalize(step3Term1);
    const t2 = normalize(step3Term2);
    const res = normalize(step3Result);

    const validT1 = t1.includes('lon') || t1.includes('nhieu') || t1 === 'so lon';
    const validT2 = t2.includes('be') || t2.includes('nho') || t2.includes('it') || t2 === 'so be';
    const validRes = res.includes('chenh') || res.includes('hon') || res.includes('kem') || res.includes('hieu');
    const validWhy = step3WhyMinus === 'cut_equal_part';

    setStep3Submitted(true);
    if ((validT1 && validT2 && validRes) && validWhy) {
      setStep3IsCorrect(true);
      sound.playCorrect();
      confetti({ particleCount: 45, spread: 70, origin: { y: 0.7 } });
    } else {
      setStep3IsCorrect(false);
      sound.playWrong();
    }
  };

  const checkStep4 = () => {
    const diffClean = step4DiffCalc.replace(/\s+/g, '');
    const validDiff =
      diffClean === '6' ||
      diffClean === '6l' ||
      diffClean === '6lit' ||
      diffClean === '18-12=6' ||
      diffClean.includes('6');

    const transClean = step4TransferVal.replace(/\s+/g, '');
    const validTransfer =
      transClean === '3' ||
      transClean === '3l' ||
      transClean === '3lit' ||
      transClean === '6:2=3' ||
      transClean === '6/2=3';

    const validWhy = step4WhyHalve === 'split_excess';

    setStep4Submitted(true);
    if (validDiff && validTransfer && validWhy) {
      setStep4IsCorrect(true);
      sound.playCorrect();
      confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
    } else {
      setStep4IsCorrect(false);
      sound.playWrong();
    }
  };

  const handleSaveToReviewNotebook = () => {
    try {
      const savedItems = JSON.parse(localStorage.getItem('spark_math_methodology_notes') || '[]');
      const newNote = {
        id: 'methodology-comparison-more-less',
        title: 'Mô hình tư duy: So Sánh Hơn - Kém (Sơ đồ thanh)',
        date: new Date().toLocaleDateString('vi-VN'),
        keyFormula: 'Số Lớn - Số Bé = Phần Chênh Lệch',
        summary:
          '1. "Nhiều hơn" là phần dôi ra vượt mức số bé. 2. "Ít hơn" là khoảng còn thiếu để bằng số lớn. 3. Phép trừ dùng để cắt bỏ phần bằng nhau, tìm phần chênh lệch. 4. Muốn san sẻ bằng nhau: Rót một nửa phần chênh lệch (Chênh lệch : 2).'
      };
      // Prevent duplicates
      const filtered = savedItems.filter((i: any) => i.id !== newNote.id);
      localStorage.setItem('spark_math_methodology_notes', JSON.stringify([...filtered, newNote]));
      setSavedToNotebook(true);
      sound.playStarCollect();
      if (onSaveToNotebook) {
        onSaveToNotebook(newNote.title, newNote.summary);
      }
    } catch {
      setSavedToNotebook(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border-4 border-amber-400 max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-5 sm:px-6 py-4 text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner">
              🧠
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider bg-amber-900/40 text-amber-200 px-2 py-0.5 rounded-full">
                  MẪU THỬ NGHIỆM ĐỘC QUYỀN
                </span>
                <span className="text-xs text-amber-100 font-bold">Spark Math Metacognition</span>
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight leading-snug">
                Bài Kiểm Tra Phương Pháp Luận Tư Duy: Mô Hình So Sánh Hơn - Kém
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/25 text-white transition-all active:scale-95"
            title="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="bg-amber-50/80 border-b border-amber-200 px-4 sm:px-6 py-2.5 flex items-center justify-between overflow-x-auto gap-2 text-xs font-bold scrollbar-none">
          {[
            { num: 1, title: '1. Bản chất trực quan' },
            { num: 2, title: '2. Định nghĩa hơn - kém' },
            { num: 3, title: '3. Cơ chế phép trừ' },
            { num: 4, title: '4. Thực chiến & San sẻ' },
            { num: 5, title: '5. Sơ đồ tư duy & Cấp chứng nhận' }
          ].map((s) => (
            <button
              key={s.num}
              type="button"
              onClick={() => {
                sound.playClick();
                setCurrentStep(s.num);
              }}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
                currentStep === s.num
                  ? 'bg-amber-500 text-white shadow-sm ring-2 ring-amber-300 font-black'
                  : currentStep > s.num
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {currentStep > s.num ? (
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
              ) : (
                <span>{s.num}.</span>
              )}
              <span>{s.title.split('. ')[1]}</span>
            </button>
          ))}
        </div>

        {/* Modal Main Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* ========================================================
              BẢN ĐỒ MÔ HÌNH TRỰC QUAN CHUNG (ALWAYS VISIBLE OR TOGGLEABLE)
          ======================================================== */}
          <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 text-white shadow-lg relative overflow-hidden border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                  Mô Hình Sơ Đồ Thanh So Sánh Chuẩn (Toán Tư Duy Singapore / Spark Math)
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setShowCutLine(!showCutLine);
                }}
                className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <span>{showCutLine ? 'Ẩn' : 'Hiện'} vạch dóng chênh lệch</span>
              </button>
            </div>

            {/* SVG Interactive Bar Model */}
            <div className="py-2">
              <svg viewBox="0 0 700 160" className="w-full h-auto select-none">
                {/* Defs for gradients & patterns */}
                <defs>
                  <linearGradient id="barLongGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="66%" stopColor="#0284c7" />
                    <stop offset="66.5%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#ea580c" />
                  </linearGradient>
                  <linearGradient id="barShortGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#0284c7" />
                  </linearGradient>
                  <pattern id="diagonalHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="8" stroke="#f59e0b" strokeWidth="2" opacity="0.4" />
                  </pattern>
                </defs>

                {/* Bar A: Long Bar (18 units) */}
                <g>
                  <text x="10" y="42" fill="#bae6fd" fontSize="13" fontWeight="bold">
                    Đoạn A (Bình Thỏ Abby):
                  </text>
                  {/* Base matching part (12 units = 320px) */}
                  <rect x="180" y="24" width="320" height="28" rx="6" fill="#0284c7" />
                  <text x="340" y="43" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Phần Bằng Nhau (12 Lít)
                  </text>

                  {/* Excess part (6 units = 160px) */}
                  <rect x="500" y="24" width="160" height="28" rx="6" fill="#ea580c" />
                  <text x="580" y="43" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Phần Hơn (6 Lít)
                  </text>

                  {/* Top bracket for total */}
                  <path d="M 180 18 L 180 12 L 420 12 L 420 8 L 420 12 L 660 12 L 660 18" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
                  <text x="420" y="6" fill="#38bdf8" fontSize="11" fontWeight="extrabold" textAnchor="middle">
                    Tổng chiều dài Đoạn A = Số Lớn (18 Lít)
                  </text>
                </g>

                {/* Bar B: Short Bar (12 units) */}
                <g>
                  <text x="10" y="104" fill="#cbd5e1" fontSize="13" fontWeight="bold">
                    Đoạn B (Bình Khỉ Benny):
                  </text>
                  <rect x="180" y="86" width="320" height="28" rx="6" fill="#0284c7" />
                  <text x="340" y="105" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Số Bé = 12 Lít
                  </text>

                  {/* Empty dashed box showing what is missing */}
                  <rect
                    x="500"
                    y="86"
                    width="160"
                    height="28"
                    rx="6"
                    fill="url(#diagonalHatch)"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <text x="580" y="104" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Phần Thiếu (6 Lít)
                  </text>
                </g>

                {/* Comparison Cut Line */}
                {showCutLine && (
                  <g>
                    <line x1="500" y1="14" x2="500" y2="124" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="5 5" />
                    <circle cx="500" cy="20" r="4" fill="#f43f5e" />
                    <circle cx="500" cy="120" r="4" fill="#f43f5e" />
                    <text x="500" y="142" fill="#fb7185" fontSize="11" fontWeight="extrabold" textAnchor="middle">
                      ✂️ Vạch dóng so sánh (Tách phần bằng nhau & phần chênh lệch)
                    </text>
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* ========================================================
              STAGE 1: BẢN CHẤT TRỰC QUAN (VISUAL ESSENCE)
          ======================================================== */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-sky-500 text-white shrink-0 mt-0.5">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-sky-900">
                      Giai đoạn 1: Khám Phá Bản Chất Trực Quan Của Sơ Đồ Thanh
                    </h3>
                    <p className="text-xs sm:text-sm text-sky-800 mt-1 leading-relaxed">
                      Để không bao giờ bị nhầm lẫn khi giải các bài toán so sánh nhiều hơn - ít hơn, ta phải hiểu rõ từng đoạn thẳng đại diện cho điều gì!
                    </p>
                  </div>
                </div>
              </div>

              {/* Question 1.1 */}
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-black flex items-center justify-center">
                    1.1
                  </span>
                  <label className="text-sm font-bold text-slate-800">
                    Trong mô hình so sánh, đoạn thẳng <span className="text-blue-600 uppercase font-black">Dài Hơn</span> đại diện cho đại lượng nào?
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={step1LongBarAnswer}
                    onChange={(e) => setStep1LongBarAnswer(e.target.value)}
                    placeholder="Em hãy tự gõ câu trả lời (Ví dụ: Số lớn / Nhiều hơn)..."
                    className="flex-1 px-4 py-2.5 text-sm rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:outline-none"
                  />
                  {step1Submitted && (
                    <span className="text-xs font-bold">
                      {normalize(step1LongBarAnswer).includes('lon') || normalize(step1LongBarAnswer).includes('nhieu') ? (
                        <span className="text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Chính xác!
                        </span>
                      ) : (
                        <span className="text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> Hãy nghĩ về số lớn
                        </span>
                      )}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 italic">
                  💡 Gợi ý tư duy: Đoạn thẳng dài hơn thể hiện một lượng có giá trị cao hơn hay thấp hơn?
                </p>
              </div>

              {/* Question 1.2 */}
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-black flex items-center justify-center">
                    1.2
                  </span>
                  <label className="text-sm font-bold text-slate-800">
                    Đoạn thẳng <span className="text-sky-600 uppercase font-black">Ngắn Hơn</span> đại diện cho đại lượng nào?
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={step1ShortBarAnswer}
                    onChange={(e) => setStep1ShortBarAnswer(e.target.value)}
                    placeholder="Em hãy tự gõ câu trả lời (Ví dụ: Số bé / Ít hơn)..."
                    className="flex-1 px-4 py-2.5 text-sm rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:outline-none"
                  />
                  {step1Submitted && (
                    <span className="text-xs font-bold">
                      {normalize(step1ShortBarAnswer).includes('be') || normalize(step1ShortBarAnswer).includes('it') || normalize(step1ShortBarAnswer).includes('nho') ? (
                        <span className="text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Chính xác!
                        </span>
                      ) : (
                        <span className="text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> Hãy nghĩ về số bé
                        </span>
                      )}
                    </span>
                  )}
                </div>
              </div>

              {/* Question 1.3: Visual Cut-line concept */}
              <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 text-xs sm:text-sm text-slate-700 space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>Quy luật trực quan cần ghi nhớ:</span>
                </div>
                <p>
                  Khi dóng vạch thẳng từ đầu mút của <strong>Đoạn Ngắn</strong> sang <strong>Đoạn Dài</strong>, ta luôn chia đoạn dài thành 2 phần:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="bg-white p-3 rounded-xl border border-sky-200">
                    <span className="font-bold text-sky-700 block">1. Phần Bằng Nhau:</span>
                    <span className="text-slate-600 text-xs">Có độ dài đúng bằng đoạn ngắn (Số bé).</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-orange-200">
                    <span className="font-bold text-orange-700 block">2. Phần Thò Ra (Dôi ra):</span>
                    <span className="text-slate-600 text-xs">Chính là <strong>Phần Chênh Lệch (Phần Hơn/Kém)</strong>!</span>
                  </div>
                </div>
              </div>

              {/* Submit / Proceed */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={checkStep1}
                  className="px-5 py-2.5 rounded-xl font-bold text-white bg-amber-500 hover:bg-amber-600 active:scale-95 shadow-sm transition-all"
                >
                  Kiểm tra câu trả lời của em
                </button>

                {step1IsCorrect && (
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setCurrentStep(2);
                    }}
                    className="px-5 py-2.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 shadow-sm flex items-center gap-2 transition-all animate-bounce-slow"
                  >
                    <span>Qua Giai đoạn 2: Định nghĩa bản chất</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ========================================================
              STAGE 2: ĐỊNH NGHĨA PHƯƠNG PHÁP LUẬN ("ÍT HƠN LÀ GÌ? NHIỀU HƠN LÀ GÌ?")
          ======================================================== */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-600 text-white shrink-0 mt-0.5">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-emerald-900">
                      Giai đoạn 2: Định Nghĩa Phương Pháp Luận - "Ít hơn" là gì? "Nhiều hơn" là gì?
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-800 mt-1 leading-relaxed">
                      Để thực sự hiểu sâu bài toán, em hãy tự diễn giải bản chất của từ "nhiều hơn" và "ít hơn" bằng ngôn ngữ tư duy logic của chính mình!
                    </p>
                  </div>
                </div>
              </div>

              {/* Question 2.1 */}
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center">
                    2.1
                  </span>
                  <label className="text-sm font-bold text-slate-800">
                    Theo em, <span className="text-orange-600 font-black">"Nhiều hơn"</span> nghĩa là gì? (Nhìn vào phần màu cam trên sơ đồ)
                  </label>
                </div>
                <input
                  type="text"
                  value={step2MoreMeaning}
                  onChange={(e) => setStep2MoreMeaning(e.target.value)}
                  placeholder="Gõ cách hiểu của em (Ví dụ: Phần dôi ra / thừa ra vượt qua mức của số bé)..."
                  className="w-full px-4 py-2.5 text-sm rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none"
                />
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                  <strong className="text-emerald-700">Định nghĩa chuẩn phương pháp luận:</strong> "Nhiều hơn" là phần <em>dôi ra (thừa ra)</em> của số lớn so với mức bằng nhau của số bé!
                </div>
              </div>

              {/* Question 2.2 */}
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center">
                    2.2
                  </span>
                  <label className="text-sm font-bold text-slate-800">
                    Theo em, <span className="text-blue-600 font-black">"Ít hơn"</span> nghĩa là gì? (Nhìn vào ô nét đứt vàng trên sơ đồ)
                  </label>
                </div>
                <input
                  type="text"
                  value={step2LessMeaning}
                  onChange={(e) => setStep2LessMeaning(e.target.value)}
                  placeholder="Gõ cách hiểu của em (Ví dụ: Còn thiếu một khoảng để bằng số lớn)..."
                  className="w-full px-4 py-2.5 text-sm rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none"
                />
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                  <strong className="text-emerald-700">Định nghĩa chuẩn phương pháp luận:</strong> "Ít hơn" là số bé <em>còn thiếu</em> một khoảng đúng bằng độ chênh lệch để vươn tới số lớn!
                </div>
              </div>

              {/* Question 2.3: Symmetry of Comparison */}
              <div className="bg-white border-2 border-amber-300 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-black flex items-center justify-center">
                    2.3
                  </span>
                  <label className="text-sm font-bold text-slate-800">
                    Quy luật đối xứng: Nếu Bình A có <span className="text-orange-600 font-extrabold">nhiều hơn</span> Bình B là <strong>6 lít</strong>, thì Bình B có <span className="text-blue-600 font-extrabold">ít hơn</span> Bình A mấy lít?
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={step2SymmetryVal}
                    onChange={(e) => setStep2SymmetryVal(e.target.value)}
                    placeholder="Em hãy tự tay nhập số lít..."
                    className="w-48 px-4 py-2.5 text-sm font-black rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:outline-none text-center"
                  />
                  <span className="text-sm font-bold text-slate-700">Lít</span>
                  {step2Submitted && (
                    <span className="text-xs font-bold">
                      {step2SymmetryVal.trim() === '6' || step2SymmetryVal.includes('6') ? (
                        <span className="text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Chính xác tuyệt đối!
                        </span>
                      ) : (
                        <span className="text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> Hãy nhập đúng 6
                        </span>
                      )}
                    </span>
                  )}
                </div>
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 font-semibold">
                  ✨ Chân lý tư duy: Phần hơn và phần kém luôn có độ lớn <strong>BẰNG NHAU</strong>! A hơn B bao nhiêu thì B kém A bấy nhiêu!
                </div>
              </div>

              {/* Submit / Proceed */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Quay lại
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={checkStep2}
                    className="px-5 py-2.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 shadow-sm transition-all"
                  >
                    Kiểm tra câu trả lời
                  </button>

                  {step2IsCorrect && (
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setCurrentStep(3);
                      }}
                      className="px-5 py-2.5 rounded-xl font-bold text-white bg-amber-500 hover:bg-amber-600 active:scale-95 shadow-sm flex items-center gap-2 transition-all animate-bounce-slow"
                    >
                      <span>Qua Giai đoạn 3: Cơ chế phép trừ</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              STAGE 3: CƠ CHẾ PHÉP TOÁN & VÌ SAO DÙNG PHÉP TRỪ?
          ======================================================== */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-fade-in">
              <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-600 text-white shrink-0 mt-0.5">
                    <Divide className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-purple-900">
                      Giai đoạn 3: Cơ Chế Phép Toán - "Làm sao để tìm được nhiều hơn hay ít hơn bao nhiêu?"
                    </h3>
                    <p className="text-xs sm:text-sm text-purple-800 mt-1 leading-relaxed">
                      Tại sao chúng ta phải dùng phép TRỪ chứ không phải phép cộng hay phép chia? Hãy cùng giải mã cơ chế toán học đằng sau mô hình!
                    </p>
                  </div>
                </div>
              </div>

              {/* Question 3.1: Complete Formula */}
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 text-xs font-black flex items-center justify-center">
                    3.1
                  </span>
                  <label className="text-sm font-bold text-slate-800">
                    Em hãy tự tay điền 3 thành phần của công thức tìm phần hơn kém:
                  </label>
                </div>

                <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 justify-center">
                  <div className="flex flex-col items-center">
                    <input
                      type="text"
                      value={step3Term1}
                      onChange={(e) => setStep3Term1(e.target.value)}
                      placeholder="Số lớn..."
                      className="w-32 px-3 py-2 text-center text-sm font-black rounded-xl border-2 border-blue-400 bg-white focus:outline-none"
                    />
                    <span className="text-[10px] font-bold text-slate-500 mt-1">Đại lượng 1</span>
                  </div>

                  <span className="text-2xl font-black text-rose-500">－</span>

                  <div className="flex flex-col items-center">
                    <input
                      type="text"
                      value={step3Term2}
                      onChange={(e) => setStep3Term2(e.target.value)}
                      placeholder="Số bé..."
                      className="w-32 px-3 py-2 text-center text-sm font-black rounded-xl border-2 border-sky-400 bg-white focus:outline-none"
                    />
                    <span className="text-[10px] font-bold text-slate-500 mt-1">Đại lượng 2</span>
                  </div>

                  <span className="text-2xl font-black text-slate-700">＝</span>

                  <div className="flex flex-col items-center">
                    <input
                      type="text"
                      value={step3Result}
                      onChange={(e) => setStep3Result(e.target.value)}
                      placeholder="Phần hơn/kém..."
                      className="w-40 px-3 py-2 text-center text-sm font-black rounded-xl border-2 border-amber-500 bg-white focus:outline-none"
                    />
                    <span className="text-[10px] font-bold text-slate-500 mt-1">Kết quả cần tìm</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 text-center italic">
                  💡 Gợi ý điền: Ô 1 điền "Số lớn", Ô 2 điền "Số bé", Ô 3 điền "Phần hơn kém" (hoặc "Phần chênh lệch").
                </p>
              </div>

              {/* Question 3.2: Why Subtraction? (Deep Metacognitive Reasoning) */}
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 text-xs font-black flex items-center justify-center">
                    3.2
                  </span>
                  <label className="text-sm font-bold text-slate-800">
                    Bản chất tư duy sâu: <span className="text-rose-600 font-black">Tại sao</span> ta phải dùng phép TRỪ mà KHÔNG dùng phép cộng?
                  </label>
                </div>

                <div className="space-y-2.5 pt-1">
                  {[
                    {
                      id: 'cut_equal_part',
                      title: 'Vì hai lượng có một phần bằng nhau. Phép TRỪ giúp "cắt bỏ phần bằng nhau đó đi", chỉ giữ lại duy nhất phần dôi ra (phần chênh lệch)!',
                      isBest: true
                    },
                    {
                      id: 'random_minus',
                      title: 'Vì cứ thấy chữ "hơn kém" trong đề bài thì giáo viên dạy phải bấm dấu trừ.',
                      isBest: false
                    },
                    {
                      id: 'plus_is_too_big',
                      title: 'Vì phép cộng làm con số to lên nên không hợp lý.',
                      isBest: false
                    }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setStep3WhyMinus(opt.id);
                      }}
                      className={`w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-start gap-3 ${
                        step3WhyMinus === opt.id
                          ? opt.id === 'cut_equal_part'
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                            : 'bg-rose-50 border-rose-400 text-rose-950 font-medium'
                          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 ${
                        step3WhyMinus === opt.id ? 'border-purple-600 bg-purple-600 text-white' : 'border-slate-300'
                      }`}>
                        {step3WhyMinus === opt.id && <Check className="w-3 h-3 stroke-[3]" />}
                      </span>
                      <span className="text-xs sm:text-sm leading-relaxed">{opt.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit / Proceed */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Quay lại
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={checkStep3}
                    className="px-5 py-2.5 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-700 active:scale-95 shadow-sm transition-all"
                  >
                    Kiểm tra câu trả lời
                  </button>

                  {step3IsCorrect && (
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setCurrentStep(4);
                      }}
                      className="px-5 py-2.5 rounded-xl font-bold text-white bg-amber-500 hover:bg-amber-600 active:scale-95 shadow-sm flex items-center gap-2 transition-all animate-bounce-slow"
                    >
                      <span>Qua Giai đoạn 4: Thử thách thực chiến</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              STAGE 4: THỰC CHIẾN CỤ THỂ (BÌNH NƯỚC 18L & 12L + TOÁN SAN SẺ)
          ======================================================== */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-fade-in">
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500 text-white shrink-0 mt-0.5">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-amber-900">
                      Giai đoạn 4: Kiểm Chứng Thực Chiến - Tình Huống Bình Nước & San Sẻ Nước
                    </h3>
                    <p className="text-xs sm:text-sm text-amber-800 mt-1 leading-relaxed">
                      Áp dụng toàn bộ phương pháp luận vừa học vào tình huống thực tế giữa Bình nước của Thỏ Abby (18 Lít) và Khỉ Benny (12 Lít)!
                    </p>
                  </div>
                </div>
              </div>

              {/* Task 4.1: Compute Difference */}
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-black flex items-center justify-center">
                    4.1
                  </span>
                  <label className="text-sm font-bold text-slate-800">
                    Bình của Thỏ Abby có <strong className="text-orange-600">18 Lít</strong>, bình của Khỉ Benny có <strong className="text-blue-600">12 Lít</strong>. Bình của Abby nhiều hơn bình của Benny bao nhiêu lít?
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={step4DiffCalc}
                    onChange={(e) => setStep4DiffCalc(e.target.value)}
                    placeholder="Gõ phép tính hoặc kết quả (Ví dụ: 18 - 12 = 6)..."
                    className="flex-1 px-4 py-2.5 text-sm rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:outline-none"
                  />
                  {step4Submitted && (
                    <span className="text-xs font-bold">
                      {step4DiffCalc.includes('6') ? (
                        <span className="text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Chính xác (6 Lít)!
                        </span>
                      ) : (
                        <span className="text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> Hãy tính: 18 - 12
                        </span>
                      )}
                    </span>
                  )}
                </div>
              </div>

              {/* Task 4.2: High-Level Thinking - The Equal Sharing Model (San Sẻ Nước) */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-300 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-black flex items-center justify-center">
                    4.2
                  </span>
                  <label className="text-sm font-black text-orange-950">
                    Thử thách tư duy thượng thừa: Bài toán "San sẻ để bằng nhau"!
                  </label>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Muốn hai bạn có lượng nước <strong>HOÀN TOÀN BẰNG NHAU</strong> mà không lấy thêm bất kỳ giọt nước nào từ ngoài vào, Thỏ Abby phải rót sang bình của Khỉ Benny mấy lít nước?
                </p>

                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={step4TransferVal}
                    onChange={(e) => setStep4TransferVal(e.target.value)}
                    placeholder="Tự tay nhập số lít cần rót..."
                    className="w-48 px-4 py-2.5 text-sm font-black rounded-xl border-2 border-orange-400 bg-white focus:outline-none text-center"
                  />
                  <span className="text-sm font-bold text-slate-700">Lít nước</span>
                  {step4Submitted && (
                    <span className="text-xs font-bold">
                      {step4TransferVal.includes('3') ? (
                        <span className="text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Xuất sắc: 3 Lít!
                        </span>
                      ) : (
                        <span className="text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> Chú ý chia đôi chênh lệch!
                        </span>
                      )}
                    </span>
                  )}
                </div>

                {/* Sub-question: Why Halve? */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-slate-800 block">
                    Vì sao ta lại lấy 6 chia 2 = 3 (chứ không phải rót cả 6 lít)?
                  </label>
                  {[
                    {
                      id: 'split_excess',
                      text: 'Vì khi Abby cho đi 3L, Abby giảm xuống 15L, đồng thời Benny nhận 3L sẽ tăng lên 15L! Độ chênh lệch được chia đều làm đôi cho hai bên.',
                      isCorrect: true
                    },
                    {
                      id: 'give_all',
                      text: 'Nếu Abby cho cả 6L thì Abby lại ít hơn Benny (Abby còn 12L, Benny thành 18L).',
                      isCorrect: false
                    }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setStep4WhyHalve(item.id);
                      }}
                      className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-start gap-2.5 text-xs ${
                        step4WhyHalve === item.id
                          ? item.isCorrect
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                            : 'bg-amber-100 border-amber-400 text-slate-800 font-medium'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                        step4WhyHalve === item.id ? 'bg-orange-500 text-white' : 'border-slate-300'
                      }`}>
                        {step4WhyHalve === item.id && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </span>
                      <span>{item.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit / Proceed */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Quay lại
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={checkStep4}
                    className="px-5 py-2.5 rounded-xl font-bold text-white bg-orange-600 hover:bg-orange-700 active:scale-95 shadow-sm transition-all"
                  >
                    Kiểm tra câu trả lời
                  </button>

                  {step4IsCorrect && (
                    <button
                      type="button"
                      onClick={() => {
                        sound.playStarCollect();
                        confetti({ particleCount: 100, spread: 90, origin: { y: 0.5 } });
                        setCurrentStep(5);
                      }}
                      className="px-5 py-2.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 shadow-sm flex items-center gap-2 transition-all animate-bounce-slow"
                    >
                      <span>Xem Sơ đồ tư duy & Cấp chứng nhận</span>
                      <Award className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              STAGE 5: SƠ ĐỒ TƯ DUY HỆ THỐNG HOÁ & CẤP CHỨNG NHẬN
          ======================================================== */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 rounded-3xl p-6 text-white text-center shadow-xl space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl shadow-inner border border-white/30 animate-bounce-slow">
                  🎖️
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                  Xác Nhận Năng Lực Phương Pháp Luận Xuất Sắc!
                </h3>
                <p className="text-xs sm:text-sm text-amber-100 max-w-xl mx-auto leading-relaxed">
                  Em đã hoàn thành xuất sắc 4 giai đoạn khảo sát phương pháp luận. Em đã thực sự hiểu sâu: <strong>"Ít hơn là gì?", "Nhiều hơn là gì?", "Vì sao phải dùng phép trừ?"</strong> và <strong>"Mô hình san sẻ nước"</strong>!
                </p>
                <div className="pt-2 flex items-center justify-center gap-2">
                  <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
                    Học sinh: {studentName}
                  </span>
                  <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full">
                    Mức độ: Làm chủ hoàn toàn
                  </span>
                </div>
              </div>

              {/* BẢN TỔNG KẾT SƠ ĐỒ TƯ DUY (MINDMAP CARD) */}
              <div className="bg-white border-2 border-amber-300 rounded-2xl p-5 sm:p-6 shadow-md space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-amber-600" />
                    <h4 className="font-black text-slate-800 text-sm sm:text-base">
                      Bảo Bối Tư Duy: Sơ Đồ Hệ Thống Hoá Phương Pháp Luận So Sánh
                    </h4>
                  </div>
                  <span className="text-[11px] font-black uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    Lưu sổ ôn tập
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Card 1 */}
                  <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 space-y-2">
                    <div className="font-black text-sky-900 text-sm flex items-center gap-1.5">
                      <span>1. Bản Chất 2 Đoạn Thẳng</span>
                    </div>
                    <ul className="space-y-1 text-slate-600 list-disc list-inside">
                      <li><strong>Đoạn dài:</strong> Đại diện cho Số Lớn.</li>
                      <li><strong>Đoạn ngắn:</strong> Đại diện cho Số Bé.</li>
                      <li><strong>Vạch so sánh:</strong> Cắt đoạn dài thành <em>Phần bằng nhau</em> và <em>Phần chênh lệch</em>.</li>
                    </ul>
                  </div>

                  {/* Card 2 */}
                  <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 space-y-2">
                    <div className="font-black text-orange-900 text-sm flex items-center gap-1.5">
                      <span>2. Khái Niệm Hơn - Kém</span>
                    </div>
                    <ul className="space-y-1 text-slate-600 list-disc list-inside">
                      <li><strong>Nhiều hơn:</strong> Phần dôi ra vượt mức số bé.</li>
                      <li><strong>Ít hơn:</strong> Phần còn thiếu để đạt đến số lớn.</li>
                      <li><strong>Tính đối xứng:</strong> Phần hơn và phần kém luôn có độ lớn bằng nhau.</li>
                    </ul>
                  </div>

                  {/* Card 3 */}
                  <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-2">
                    <div className="font-black text-purple-900 text-sm flex items-center gap-1.5">
                      <span>3. Các Công Thức Vàng</span>
                    </div>
                    <ul className="space-y-1.5 text-slate-700">
                      <li className="font-mono font-bold bg-white p-1 rounded border border-purple-200">
                        Chênh lệch = Số Lớn － Số Bé
                      </li>
                      <li className="font-mono font-bold bg-white p-1 rounded border border-purple-200">
                        Số Lớn = Số Bé ＋ Phần Hơn
                      </li>
                      <li className="font-mono font-bold bg-white p-1 rounded border border-purple-200">
                        San sẻ đều = Chênh lệch : 2
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Save to Notebook Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-amber-50/50 p-4 rounded-xl border border-amber-200">
                  <div className="text-xs text-amber-950 font-medium">
                    {savedToNotebook ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Đã lưu bảo bối này vào Sổ Ôn Tập của em! Em có thể mở ra xem lại bất cứ khi nào!
                      </span>
                    ) : (
                      <span>
                        Lưu bản tóm tắt phương pháp luận này vào <strong>Sổ Ôn Tập</strong> để tự ôn tập khi gặp bài toán khó nhé!
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveToReviewNotebook}
                    disabled={savedToNotebook}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 ${
                      savedToNotebook
                        ? 'bg-emerald-600 text-white cursor-default'
                        : 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm active:scale-95'
                    }`}
                  >
                    <BookmarkPlus className="w-4 h-4" />
                    <span>{savedToNotebook ? 'Đã Lưu Vào Sổ' : 'Lưu Vào Sổ Ôn Tập'}</span>
                  </button>
                </div>
              </div>

              {/* Close or Retake */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setCurrentStep(1);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" /> Ôn lại từ đầu
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-xl font-black text-white bg-slate-900 hover:bg-slate-800 active:scale-95 shadow-md transition-all"
                >
                  Hoàn thành & Đóng cửa sổ
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

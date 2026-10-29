import React, { useState, useEffect } from 'react';
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
  BookmarkPlus,
  ShieldCheck,
  Target
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';
import {
  PERIODIC_ASSESSMENTS,
  PeriodicAssessment,
  markPeriodicAssessmentCompleted,
  getCompletedPeriodicIds
} from '../data/periodicAssessmentsData';

interface PeriodicAssessmentRunnerModalProps {
  isOpen: boolean;
  assessmentId?: string | null;
  onClose: () => void;
  onCompleted?: (assessmentId: string) => void;
  onSaveToNotebook?: (title: string, summary: string) => void;
}

export const PeriodicAssessmentRunnerModal: React.FC<PeriodicAssessmentRunnerModalProps> = ({
  isOpen,
  assessmentId = 'periodic-comparison-bar-model',
  onClose,
  onCompleted,
  onSaveToNotebook
}) => {
  const selectedAssessment: PeriodicAssessment =
    PERIODIC_ASSESSMENTS.find((a) => a.id === assessmentId) || PERIODIC_ASSESSMENTS[0];

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showCutLine, setShowCutLine] = useState<boolean>(true);
  const [savedToNotebook, setSavedToNotebook] = useState<boolean>(false);

  // --- Step 1 States (Bản chất trực quan) ---
  const [step1LongBarAnswer, setStep1LongBarAnswer] = useState('');
  const [step1ShortBarAnswer, setStep1ShortBarAnswer] = useState('');
  const [step1Submitted, setStep1Submitted] = useState(false);
  const [step1IsCorrect, setStep1IsCorrect] = useState(false);

  // --- Step 2 States (Định nghĩa nhiều hơn & ít hơn) ---
  const [step2MoreMeaning, setStep2MoreMeaning] = useState('');
  const [step2LessMeaning, setStep2LessMeaning] = useState('');
  const [step2SymmetryVal, setStep2SymmetryVal] = useState('');
  const [step2Submitted, setStep2Submitted] = useState(false);
  const [step2IsCorrect, setStep2IsCorrect] = useState(false);

  // --- Step 3 States (Cơ chế phép toán & Vì sao dùng phép trừ) ---
  const [step3Term1, setStep3Term1] = useState('');
  const [step3Term2, setStep3Term2] = useState('');
  const [step3Result, setStep3Result] = useState('');
  const [step3WhyMinus, setStep3WhyMinus] = useState<string | null>(null);
  const [step3Submitted, setStep3Submitted] = useState(false);
  const [step3IsCorrect, setStep3IsCorrect] = useState(false);

  // --- Step 4 States (Thực chiến & San sẻ cân bằng) ---
  const [step4DiffCalc, setStep4DiffCalc] = useState('');
  const [step4TransferVal, setStep4TransferVal] = useState('');
  const [step4WhyHalve, setStep4WhyHalve] = useState<string | null>(null);
  const [step4Submitted, setStep4Submitted] = useState(false);
  const [step4IsCorrect, setStep4IsCorrect] = useState(false);

  // --- Step 5 Final Certificate ---
  const [studentName, setStudentName] = useState('Nhà Toán Học Nhí');

  // Reset when assessment opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setSavedToNotebook(false);
      setStep1Submitted(false);
      setStep2Submitted(false);
      setStep3Submitted(false);
      setStep4Submitted(false);
    }
  }, [isOpen, assessmentId]);

  if (!isOpen) return null;

  // Normalization helper
  const normalize = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  // Step 1 Checker
  const checkStep1 = () => {
    const a1 = normalize(step1LongBarAnswer);
    const a2 = normalize(step1ShortBarAnswer);

    const validLong =
      a1.includes('lon') || a1.includes('nhieu') || a1.includes('dai') || a1.includes('cao');
    const validShort =
      a2.includes('be') || a2.includes('nho') || a2.includes('it') || a2.includes('ngan') || a2.includes('thap');

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

  // Step 2 Checker
  const checkStep2 = () => {
    const sym = step2SymmetryVal.trim();
    const validSym = sym === '6' || sym === '6 lít' || sym === '6L';
    const hasMoreContent = step2MoreMeaning.trim().length >= 3;
    const hasLessContent = step2LessMeaning.trim().length >= 3;

    setStep2Submitted(true);
    if (validSym && hasMoreContent && hasLessContent) {
      setStep2IsCorrect(true);
      sound.playCorrect();
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    } else {
      setStep2IsCorrect(false);
      sound.playWrong();
    }
  };

  // Step 3 Checker
  const checkStep3 = () => {
    const t1 = normalize(step3Term1);
    const t2 = normalize(step3Term2);
    const res = normalize(step3Result);

    const validT1 = t1.includes('lon') || t1.includes('nhieu') || t1 === 'so lon' || t1 === 'dai';
    const validT2 = t2.includes('be') || t2.includes('nho') || t2.includes('it') || t2 === 'so be' || t2 === 'ngan';
    const validRes = res.includes('chenh') || res.includes('hon') || res.includes('kem') || res.includes('hieu');
    const validWhy = step3WhyMinus === 'cut_equal_part';

    setStep3Submitted(true);
    if (validT1 && validT2 && validRes && validWhy) {
      setStep3IsCorrect(true);
      sound.playCorrect();
      confetti({ particleCount: 45, spread: 70, origin: { y: 0.7 } });
    } else {
      setStep3IsCorrect(false);
      sound.playWrong();
    }
  };

  // Step 4 Checker
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
      markPeriodicAssessmentCompleted(selectedAssessment.id);
      if (onCompleted) onCompleted(selectedAssessment.id);
    } else {
      setStep4IsCorrect(false);
      sound.playWrong();
    }
  };

  // Save to Notebook
  const handleSaveToReviewNotebook = () => {
    try {
      const savedItems = JSON.parse(localStorage.getItem('spark_math_methodology_notes') || '[]');
      const newNote = {
        id: selectedAssessment.id,
        title: selectedAssessment.title,
        date: new Date().toLocaleDateString('vi-VN'),
        keyFormula: selectedAssessment.keyRuleSummary[2] || 'Số Lớn － Số Bé = Phần Chênh Lệch',
        summary: selectedAssessment.keyRuleSummary.join(' ')
      };
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
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border-4 border-amber-400 max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-5 sm:px-6 py-4 text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner">
              {selectedAssessment.icon || '🧠'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-black/25 text-amber-200 px-2 py-0.5 rounded-full border border-white/20">
                  {selectedAssessment.code}
                </span>
                <span className="text-xs text-amber-100 font-bold">
                  {selectedAssessment.stationName}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight leading-snug">
                {selectedAssessment.title}
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
            title="Đóng bài kiểm tra định kỳ"
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
                  ? 'bg-amber-500 text-white shadow-xs ring-2 ring-amber-300 font-black'
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
          {/* Visual Model Canvas */}
          <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 text-white shadow-lg relative overflow-hidden border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                  Mô Hình Tư Duy: {selectedAssessment.thinkingModelName}
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
                <span>{showCutLine ? 'Ẩn' : 'Hiện'} vạch dóng so sánh</span>
              </button>
            </div>

            {/* Interactive SVG Bar Model */}
            <div className="py-2">
              <svg viewBox="0 0 700 160" className="w-full h-auto select-none">
                <defs>
                  <pattern
                    id="diagonalHatch"
                    width="8"
                    height="8"
                    patternTransform="rotate(45 0 0)"
                    patternUnits="userSpaceOnUse"
                  >
                    <line x1="0" y1="0" x2="0" y2="8" stroke="#f59e0b" strokeWidth="2" opacity="0.4" />
                  </pattern>
                </defs>

                {/* Long Bar */}
                <g>
                  <text x="10" y="42" fill="#bae6fd" fontSize="13" fontWeight="bold">
                    Đoạn thẳng A (Số Lớn):
                  </text>
                  <rect x="190" y="24" width="310" height="28" rx="6" fill="#0284c7" />
                  <text x="345" y="43" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Phần Trùng Khớp Bằng Nhau
                  </text>
                  <rect x="500" y="24" width="160" height="28" rx="6" fill="#ea580c" />
                  <text x="580" y="43" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Phần Dôi Ra
                  </text>
                  <path
                    d="M 190 18 L 190 12 L 425 12 L 425 8 L 425 12 L 660 12 L 660 18"
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <text x="425" y="6" fill="#38bdf8" fontSize="11" fontWeight="extrabold" textAnchor="middle">
                    Chiều Dài Toàn Bộ Đoạn A (Đại lượng thứ nhất)
                  </text>
                </g>

                {/* Short Bar */}
                <g>
                  <text x="10" y="104" fill="#cbd5e1" fontSize="13" fontWeight="bold">
                    Đoạn thẳng B (Số Bé):
                  </text>
                  <rect x="190" y="86" width="310" height="28" rx="6" fill="#0284c7" />
                  <text x="345" y="105" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Chiều Dài Đoạn B (Đại lượng thứ hai)
                  </text>
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
                    Khoảng Còn Thiếu
                  </text>
                </g>

                {/* Comparison Cut Line */}
                {showCutLine && (
                  <g>
                    <line x1="500" y1="14" x2="500" y2="124" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="5 5" />
                    <circle cx="500" cy="20" r="4" fill="#f43f5e" />
                    <circle cx="500" cy="120" r="4" fill="#f43f5e" />
                    <text x="500" y="142" fill="#fb7185" fontSize="11" fontWeight="extrabold" textAnchor="middle">
                      ✂️ Đường dóng ranh giới (Tách phần bằng nhau &amp; phần chênh lệch)
                    </text>
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* ========================================================
              STAGE 1: BẢN CHẤT TRỰC QUAN
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
                      Giai đoạn 1: Bản Chất Trực Quan Của Sơ Đồ Đoạn Thẳng
                    </h3>
                    <p className="text-xs sm:text-sm text-sky-800 mt-1 leading-relaxed">
                      Để giải quyết chính xác các bài toán so sánh, trước hết em hãy quan sát kỹ độ dài của các thanh và nhận diện bản chất đại lượng mà mỗi thanh đại diện.
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
                    placeholder="Em hãy tự tay nhập câu trả lời của mình..."
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
                          <AlertCircle className="w-4 h-4" /> Chưa chính xác
                        </span>
                      )}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-600 italic">
                  🤔 Câu hỏi gợi mở tư duy: Khi quan sát hai đoạn thẳng đặt cạnh nhau, độ dài trực quan này gợi cho em suy nghĩ gì về đại lượng mà nó đại diện?
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
                    placeholder="Em hãy tự tay nhập câu trả lời của mình..."
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
                          <AlertCircle className="w-4 h-4" /> Chưa chính xác
                        </span>
                      )}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-600 italic">
                  🤔 Câu hỏi gợi mở tư duy: Sự khác biệt về kích thước giữa hai thanh giúp em nhận biết điều gì trong mối tương quan so sánh?
                </p>
              </div>

              {/* Submit / Proceed */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={checkStep1}
                  className="px-5 py-2.5 rounded-xl font-bold text-white bg-amber-500 hover:bg-amber-600 active:scale-95 shadow-xs transition-all"
                >
                  Kiểm tra câu trả lời
                </button>

                {step1IsCorrect && (
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setCurrentStep(2);
                    }}
                    className="px-5 py-2.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 shadow-xs flex items-center gap-2 transition-all"
                  >
                    <span>Qua Giai đoạn 2: Định nghĩa hơn - kém</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ========================================================
              STAGE 2: ĐỊNH NGHĨA PHƯƠNG PHÁP LUẬN HƠN - KÉM
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
                      Giai đoạn 2: Khái Niệm Bản Chất - "Ít hơn là gì?" và "Nhiều hơn là gì?"
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-800 mt-1 leading-relaxed">
                      Em hãy tự diễn đạt cách hiểu của mình về hiện tượng một đại lượng dôi ra hoặc còn thiếu so với đại lượng còn lại.
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
                    Theo suy ngẫm của em, <span className="text-orange-600 font-black">"Nhiều hơn"</span> thể hiện điều gì giữa hai đại lượng?
                  </label>
                </div>
                <input
                  type="text"
                  value={step2MoreMeaning}
                  onChange={(e) => setStep2MoreMeaning(e.target.value)}
                  placeholder="Em hãy diễn giải theo tư duy của mình..."
                  className="w-full px-4 py-2.5 text-sm rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none"
                />
                <p className="text-[11px] text-slate-600 italic">
                  🤔 Câu hỏi gợi mở tư duy: Khi đối chiếu hai thanh cùng vạch xuất phát, phần xuất hiện thêm gợi cho em liên tưởng đến khái niệm gì?
                </p>
              </div>

              {/* Question 2.2 */}
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center">
                    2.2
                  </span>
                  <label className="text-sm font-bold text-slate-800">
                    Theo suy ngẫm của em, <span className="text-blue-600 font-black">"Ít hơn"</span> thể hiện điều gì về đại lượng bé?
                  </label>
                </div>
                <input
                  type="text"
                  value={step2LessMeaning}
                  onChange={(e) => setStep2LessMeaning(e.target.value)}
                  placeholder="Em hãy diễn giải theo tư duy của mình..."
                  className="w-full px-4 py-2.5 text-sm rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none"
                />
                <p className="text-[11px] text-slate-600 italic">
                  🤔 Câu hỏi gợi mở tư duy: Khoảng trống còn lại giữa hai đầu mút phản ánh điều gì về mối quan hệ giữa hai đại lượng?
                </p>
              </div>

              {/* Question 2.3: Symmetry */}
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
                    placeholder="Em hãy tự tay nhập đáp số..."
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
                          <AlertCircle className="w-4 h-4" /> Em hãy kiểm tra lại mối quan hệ giữa hai đại lượng
                        </span>
                      )}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-600 italic">
                  🤔 Câu hỏi gợi mở tư duy: Nếu thay đổi chiều nhìn từ đối tượng này sang đối tượng kia, mức độ chênh lệch giữa chúng có đặc điểm gì cần lưu ý?
                </p>
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
                    className="px-5 py-2.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 shadow-xs transition-all"
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
                      className="px-5 py-2.5 rounded-xl font-bold text-white bg-amber-500 hover:bg-amber-600 active:scale-95 shadow-xs flex items-center gap-2 transition-all"
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
              STAGE 3: CƠ CHẾ PHÉP TOÁN
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
                      Để tìm khoảng cách chênh lệch mà không cần đoán mò, chúng ta cần hiểu rõ lý do toán học dẫn đến việc lựa chọn phép tính.
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
                    Em hãy tự tay điền tên 3 thành phần của công thức xác định độ chênh lệch:
                  </label>
                </div>

                <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 justify-center">
                  <div className="flex flex-col items-center">
                    <input
                      type="text"
                      value={step3Term1}
                      onChange={(e) => setStep3Term1(e.target.value)}
                      placeholder="Thành phần 1..."
                      className="w-32 px-3 py-2 text-center text-sm font-black rounded-xl border-2 border-blue-400 bg-white focus:outline-none"
                    />
                    <span className="text-[10px] font-bold text-slate-400 mt-1">Ô số 1</span>
                  </div>

                  <span className="text-2xl font-black text-rose-500">－</span>

                  <div className="flex flex-col items-center">
                    <input
                      type="text"
                      value={step3Term2}
                      onChange={(e) => setStep3Term2(e.target.value)}
                      placeholder="Thành phần 2..."
                      className="w-32 px-3 py-2 text-center text-sm font-black rounded-xl border-2 border-sky-400 bg-white focus:outline-none"
                    />
                    <span className="text-[10px] font-bold text-slate-400 mt-1">Ô số 2</span>
                  </div>

                  <span className="text-2xl font-black text-slate-700">＝</span>

                  <div className="flex flex-col items-center">
                    <input
                      type="text"
                      value={step3Result}
                      onChange={(e) => setStep3Result(e.target.value)}
                      placeholder="Kết quả..."
                      className="w-40 px-3 py-2 text-center text-sm font-black rounded-xl border-2 border-amber-500 bg-white focus:outline-none"
                    />
                    <span className="text-[10px] font-bold text-slate-400 mt-1">Ô số 3</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 italic text-center">
                  🤔 Câu hỏi gợi mở tư duy: Làm thế nào để sắp xếp các đại lượng trên sơ đồ thành một biểu thức toán học biểu thị mối liên hệ giữa chúng?
                </p>
              </div>

              {/* Question 3.2: Why Subtraction */}
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 text-xs font-black flex items-center justify-center">
                    3.2
                  </span>
                  <label className="text-sm font-bold text-slate-800">
                    Tư duy phương pháp luận: <span className="text-rose-600 font-black">Tại sao</span> ta cần dùng phép trừ trong trường hợp này?
                  </label>
                </div>

                <div className="space-y-2.5 pt-1">
                  {[
                    {
                      id: 'cut_equal_part',
                      title: 'Vì hai lượng đều có chung một phần bằng nhau. Phép TRỪ loại bỏ phần bằng nhau đó đi, để lộ ra duy nhất phần dôi ra cần tìm!',
                      isBest: true
                    },
                    {
                      id: 'random_minus',
                      title: 'Vì trong câu hỏi xuất hiện từ khóa so sánh nên bắt buộc phải chọn phép trừ.',
                      isBest: false
                    },
                    {
                      id: 'plus_is_too_big',
                      title: 'Vì phép cộng sẽ cho ra một con số quá lớn so với các số ban đầu.',
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
                      <span
                        className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 ${
                          step3WhyMinus === opt.id
                            ? 'border-purple-600 bg-purple-600 text-white'
                            : 'border-slate-300'
                        }`}
                      >
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
                    className="px-5 py-2.5 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-700 active:scale-95 shadow-xs transition-all"
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
                      className="px-5 py-2.5 rounded-xl font-bold text-white bg-amber-500 hover:bg-amber-600 active:scale-95 shadow-xs flex items-center gap-2 transition-all"
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
              STAGE 4: THỰC CHIẾN CỤ THỂ
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
                      Giai đoạn 4: Ứng Dụng Thực Chiến - Bài Toán San Sẻ Cân Bằng Nước
                    </h3>
                    <p className="text-xs sm:text-sm text-amber-800 mt-1 leading-relaxed">
                      Áp dụng toàn bộ phương pháp luận vào tình huống thực tế giữa Bình nước của Thỏ Abby (18 Lít) và Khỉ Benny (12 Lít).
                    </p>
                  </div>
                </div>
              </div>

              {/* Task 4.1 */}
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-black flex items-center justify-center">
                    4.1
                  </span>
                  <label className="text-sm font-bold text-slate-800">
                    Bình của Thỏ Abby có <strong className="text-orange-600">18 Lít</strong>, bình của Khỉ Benny có <strong className="text-blue-600">12 Lít</strong>. Độ chênh lệch giữa hai bình là bao nhiêu lít?
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={step4DiffCalc}
                    onChange={(e) => setStep4DiffCalc(e.target.value)}
                    placeholder="Em hãy tự tay nhập phép tính hoặc đáp số..."
                    className="flex-1 px-4 py-2.5 text-sm rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:outline-none"
                  />
                  {step4Submitted && (
                    <span className="text-xs font-bold">
                      {step4DiffCalc.includes('6') ? (
                        <span className="text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Chính xác!
                        </span>
                      ) : (
                        <span className="text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> Em hãy kiểm tra lại mức chênh lệch giữa hai bình
                        </span>
                      )}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-600 italic">
                  🤔 Câu hỏi gợi mở tư duy: Khi đối chiếu dung tích giữa hai bình, làm thế nào để xác định được khoảng cách chênh lệch giữa chúng?
                </p>
              </div>

              {/* Task 4.2 */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-300 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-black flex items-center justify-center">
                    4.2
                  </span>
                  <label className="text-sm font-black text-orange-950">
                    Tư duy san sẻ cân bằng:
                  </label>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Muốn hai bạn có lượng nước <strong>HOÀN TOÀN BẰNG NHAU</strong> mà không lấy thêm nước từ bên ngoài, Thỏ Abby cần rót sang cho Khỉ Benny mấy lít nước?
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
                          <CheckCircle2 className="w-4 h-4" /> Xuất sắc!
                        </span>
                      ) : (
                        <span className="text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> Em hãy quan sát sự biến động khi chuyển nước giữa hai bình
                        </span>
                      )}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-600 italic">
                  🤔 Câu hỏi gợi mở tư duy: Khi một bên chuyển bớt nước sang cho bên kia, sự thay đổi của cả hai bên sẽ diễn ra thế nào để cùng đạt mức bằng nhau?
                </p>

                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-slate-800 block">
                    Bản chất logic của việc san sẻ:
                  </label>
                  {[
                    {
                      id: 'split_excess',
                      text: 'Vì khi bình lớn bớt đi bao nhiêu thì bình nhỏ nhận thêm bấy nhiêu. Do đó phần chênh lệch phải được chia đều làm đôi để hai bên gặp nhau ở mức cân bằng!',
                      isCorrect: true
                    },
                    {
                      id: 'give_all',
                      text: 'Phải rót toàn bộ phần chênh lệch sang bên kia.',
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
                      <span
                        className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                          step4WhyHalve === item.id ? 'bg-orange-500 text-white' : 'border-slate-300'
                        }`}
                      >
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
                    className="px-5 py-2.5 rounded-xl font-bold text-white bg-orange-600 hover:bg-orange-700 active:scale-95 shadow-xs transition-all"
                  >
                    Kiểm tra và hoàn thành
                  </button>

                  {step4IsCorrect && (
                    <button
                      type="button"
                      onClick={() => {
                        sound.playStarCollect();
                        confetti({ particleCount: 100, spread: 90, origin: { y: 0.5 } });
                        setCurrentStep(5);
                      }}
                      className="px-5 py-2.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 shadow-xs flex items-center gap-2 transition-all animate-bounce-slow"
                    >
                      <span>Xem Sơ đồ tư duy &amp; Cấp chứng nhận</span>
                      <Award className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              STAGE 5: SƠ ĐỒ TƯ DUY TỔNG HỢP & CHỨNG NHẬN
          ======================================================== */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 rounded-3xl p-6 text-white text-center shadow-xl space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl shadow-inner border border-white/30 animate-bounce-slow">
                  🎖️
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                  Xác Nhận Hoàn Thành Bài Kiểm Tra Định Kỳ!
                </h3>
                <p className="text-xs sm:text-sm text-amber-100 max-w-xl mx-auto leading-relaxed">
                  Em đã hoàn thành xuất sắc toàn bộ bài kiểm tra định kỳ của mô hình tư duy: <strong>{selectedAssessment.thinkingModelName}</strong>! Cụm bài tập kế tiếp đã được mở khóa.
                </p>
                <div className="pt-2 flex items-center justify-center gap-2">
                  <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
                    Học sinh: {studentName}
                  </span>
                  <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full">
                    Trạng thái: Đạt chuẩn tư duy
                  </span>
                </div>
              </div>

              {/* Sơ đồ tư duy */}
              <div className="bg-white border-2 border-amber-300 rounded-2xl p-5 sm:p-6 shadow-md space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-amber-600" />
                    <h4 className="font-black text-slate-800 text-sm sm:text-base">
                      Bảo Bối Tư Duy: Sơ Đồ Hệ Thống Hóa Quy Tắc Vàng
                    </h4>
                  </div>
                  <span className="text-[11px] font-black uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    Đã kiểm tra đạt
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {selectedAssessment.keyRuleSummary.slice(0, 3).map((rule, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                      <div className="font-black text-amber-900 text-sm flex items-center gap-1.5">
                        <Target className="w-4 h-4 text-amber-600" />
                        <span>Quy Tắc {idx + 1}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed font-medium">{rule}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-amber-50/50 p-4 rounded-xl border border-amber-200">
                  <div className="text-xs text-amber-950 font-medium">
                    {savedToNotebook ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Đã lưu nội dung kiểm tra định kỳ này vào Sổ Ôn Tập!
                      </span>
                    ) : (
                      <span>
                        Lưu bản tóm tắt bài kiểm tra định kỳ vào <strong>Sổ Ôn Tập</strong> để tự ôn tập khi gặp bài toán khó nhé!
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
                        : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs active:scale-95'
                    }`}
                  >
                    <BookmarkPlus className="w-4 h-4" />
                    <span>{savedToNotebook ? 'Đã Lưu Vào Sổ' : 'Lưu Vào Sổ Ôn Tập'}</span>
                  </button>
                </div>
              </div>

              {/* Action buttons */}
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
                  Hoàn thành &amp; Đóng bài kiểm tra
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Backward compatibility export
export const MethodologyAssessmentModal = PeriodicAssessmentRunnerModal;

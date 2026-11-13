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
  BookmarkPlus,
  ShieldCheck,
  Target
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';
import {
  PERIODIC_ASSESSMENTS,
  PeriodicAssessment,
  AssessmentStageQuestion,
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
  const [studentName, setStudentName] = useState('Nhà Toán Học Nhí');

  // Dynamic state for question answers
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submittedSteps, setSubmittedSteps] = useState<Record<number, boolean>>({});
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});

  // Reset when modal opens or assessment changes
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setSavedToNotebook(false);
      setAnswers({});
      setSubmittedSteps({});
      setStepErrors({});
    }
  }, [isOpen, assessmentId]);

  if (!isOpen) return null;

  // Text normalization for fuzzy answer checking
  const normalize = (text: string) =>
    (text || '')
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const cfg = selectedAssessment.stagesConfig;

  // Helper to get questions for current step (1 to 4)
  const getQuestionsForStep = (step: number): { title: string; desc: string; questions: AssessmentStageQuestion[] } => {
    if (!cfg) return { title: '', desc: '', questions: [] };
    switch (step) {
      case 1:
        return { title: cfg.stage1Title, desc: cfg.stage1Desc, questions: cfg.stage1Questions };
      case 2:
        return { title: cfg.stage2Title, desc: cfg.stage2Desc, questions: cfg.stage2Questions };
      case 3:
        return { title: cfg.stage3Title, desc: cfg.stage3Desc, questions: cfg.stage3Questions };
      case 4:
        return { title: cfg.stage4Title, desc: cfg.stage4Desc, questions: cfg.stage4Questions };
      default:
        return { title: '', desc: '', questions: [] };
    }
  };

  const currentStepData = getQuestionsForStep(currentStep);

  // Validate a single question
  const isQuestionCorrect = (q: AssessmentStageQuestion): boolean => {
    const val = answers[q.questionId] || '';
    if (!val.trim()) return false;

    if (q.type === 'choice') {
      const correctOpt = q.options?.find((o) => o.isCorrect);
      return correctOpt ? val === correctOpt.id : false;
    }

    if (q.type === 'number') {
      const cleanVal = val.replace(/\s+/g, '').toLowerCase();
      const expected = String(q.correctNumeric || '').replace(/\s+/g, '').toLowerCase();
      return cleanVal === expected || cleanVal.includes(expected);
    }

    if (q.type === 'text') {
      const norm = normalize(val);
      if (q.correctKeywords && q.correctKeywords.length > 0) {
        return q.correctKeywords.some((kw) => norm.includes(normalize(kw)));
      }
      return norm.length >= 2;
    }

    return false;
  };

  // Check current step submission
  const handleCheckStep = () => {
    const questions = currentStepData.questions;
    let allValid = true;
    const errors: Record<string, string> = {};

    for (const q of questions) {
      if (!isQuestionCorrect(q)) {
        allValid = false;
        errors[q.questionId] = q.hint || 'Câu trả lời chưa chính xác, hãy đọc gợi ý để tư duy nhé!';
      }
    }

    setSubmittedSteps((prev) => ({ ...prev, [currentStep]: true }));
    setStepErrors(errors);

    if (allValid) {
      sound.playCorrect();
      confetti({ particleCount: 45, spread: 70, origin: { y: 0.6 } });

      if (currentStep === 4) {
        // Passed entire assessment!
        markPeriodicAssessmentCompleted(selectedAssessment.id);
        if (onCompleted) onCompleted(selectedAssessment.id);
      }
    } else {
      sound.playWrong();
    }
  };

  const isCurrentStepPassed =
    submittedSteps[currentStep] && currentStepData.questions.every((q) => isQuestionCorrect(q));

  // Save summary to notebook
  const handleSaveToReviewNotebook = () => {
    try {
      const savedItems = JSON.parse(localStorage.getItem('spark_math_methodology_notes') || '[]');
      const newNote = {
        id: selectedAssessment.id,
        title: selectedAssessment.title,
        date: new Date().toLocaleDateString('vi-VN'),
        keyFormula: selectedAssessment.keyRuleSummary[1] || selectedAssessment.keyRuleSummary[0],
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

  // Render Visual Model SVG based on selected assessment
  const renderVisualModel = () => {
    switch (selectedAssessment.id) {
      case 'periodic-comparison-bar-model':
        return (
          <svg viewBox="0 0 700 160" className="w-full h-auto select-none">
            <defs>
              <pattern id="diagonalHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="8" stroke="#f59e0b" strokeWidth="2" opacity="0.4" />
              </pattern>
            </defs>
            <g>
              <text x="10" y="42" fill="#bae6fd" fontSize="13" fontWeight="bold">Đoạn thẳng A (Số Lớn):</text>
              <rect x="190" y="24" width="310" height="28" rx="6" fill="#0284c7" />
              <text x="345" y="43" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Phần Trùng Khớp Bằng Nhau</text>
              <rect x="500" y="24" width="160" height="28" rx="6" fill="#ea580c" />
              <text x="580" y="43" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Phần Dôi Ra (6L)</text>
              <path d="M 190 18 L 190 12 L 425 12 L 425 8 L 425 12 L 660 12 L 660 18" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
              <text x="425" y="6" fill="#38bdf8" fontSize="11" fontWeight="extrabold" textAnchor="middle">Bình A: 18 Lít (Số Lớn)</text>
            </g>
            <g>
              <text x="10" y="104" fill="#cbd5e1" fontSize="13" fontWeight="bold">Đoạn thẳng B (Số Bé):</text>
              <rect x="190" y="86" width="310" height="28" rx="6" fill="#0284c7" />
              <text x="345" y="105" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Bình B: 12 Lít (Số Bé)</text>
              <rect x="500" y="86" width="160" height="28" rx="6" fill="url(#diagonalHatch)" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" />
              <text x="580" y="104" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">Khoảng Còn Thiếu</text>
            </g>
            {showCutLine && (
              <g>
                <line x1="500" y1="14" x2="500" y2="124" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="5 5" />
                <circle cx="500" cy="20" r="4" fill="#f43f5e" />
                <circle cx="500" cy="120" r="4" fill="#f43f5e" />
                <text x="500" y="146" fill="#fb7185" fontSize="11" fontWeight="extrabold" textAnchor="middle">
                  ✂️ Đường dóng ranh giới (Lấy Số Lớn trừ Số Bé sẽ ra phần chênh lệch)
                </text>
              </g>
            )}
          </svg>
        );

      case 'periodic-pictograph-ratio':
        return (
          <svg viewBox="0 0 700 160" className="w-full h-auto select-none">
            <g>
              <rect x="20" y="12" width="220" height="34" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="35" y="34" fill="#fef08a" fontSize="13" fontWeight="black">⭐ Quy ước: 1 ⭐ ＝ 4 quyển sách</text>
            </g>
            <g>
              <text x="20" y="75" fill="#bae6fd" fontSize="13" fontWeight="bold">Tổ 1 (5 ⭐):</text>
              <text x="130" y="77" fontSize="20">⭐⭐⭐⭐⭐</text>
              <text x="320" y="75" fill="#38bdf8" fontSize="12" fontWeight="black">➡️ 5 × 4 ＝ 20 quyển</text>
            </g>
            <g>
              <text x="20" y="125" fill="#cbd5e1" fontSize="13" fontWeight="bold">Tổ 2 (3 ⭐):</text>
              <text x="130" y="127" fontSize="20">⭐⭐⭐</text>
              <text x="320" y="125" fill="#cbd5e1" fontSize="12" fontWeight="black">➡️ 3 × 4 ＝ 12 quyển</text>
            </g>
            {showCutLine && (
              <g>
                <line x1="242" y1="52" x2="242" y2="135" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" />
                <text x="490" y="100" fill="#f43f5e" fontSize="12" fontWeight="black" textAnchor="middle">
                  💡 Chênh lệch: (5 － 3) × 4 ＝ 2 × 4 ＝ 8 quyển sách
                </text>
              </g>
            )}
          </svg>
        );

      case 'periodic-volume-fluid-sharing':
        return (
          <svg viewBox="0 0 700 160" className="w-full h-auto select-none">
            {/* Beaker A */}
            <g>
              <rect x="60" y="20" width="70" height="110" rx="4" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
              <rect x="62" y="45" width="66" height="83" fill="#0284c7" opacity="0.8" rx="2" />
              <text x="95" y="85" fill="#ffffff" fontSize="12" fontWeight="black" textAnchor="middle">16 Lít</text>
              <text x="95" y="148" fill="#bae6fd" fontSize="11" fontWeight="bold" textAnchor="middle">Thùng A</text>
            </g>
            {/* Arrow */}
            <g>
              <path d="M 145 75 L 205 75 M 195 67 L 205 75 L 195 83" stroke="#f59e0b" strokeWidth="3" fill="none" />
              <text x="175" y="60" fill="#f59e0b" fontSize="11" fontWeight="black" textAnchor="middle">Rót 3L</text>
            </g>
            {/* Beaker B */}
            <g>
              <rect x="220" y="20" width="70" height="110" rx="4" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
              <rect x="222" y="75" width="66" height="53" fill="#0284c7" opacity="0.8" rx="2" />
              <text x="255" y="105" fill="#ffffff" fontSize="12" fontWeight="black" textAnchor="middle">10 Lít</text>
              <text x="255" y="148" fill="#cbd5e1" fontSize="11" fontWeight="bold" textAnchor="middle">Thùng B</text>
            </g>
            {/* Archimedes Demonstration */}
            <g>
              <rect x="420" y="20" width="80" height="110" rx="4" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
              <rect x="422" y="70" width="76" height="58" fill="#0284c7" opacity="0.5" />
              <rect x="422" y="45" width="76" height="25" fill="#38bdf8" opacity="0.8" />
              <circle cx="460" cy="105" r="14" fill="#64748b" stroke="#475569" strokeWidth="2" />
              <text x="460" y="109" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle">Đá</text>
              <text x="515" y="58" fill="#38bdf8" fontSize="11" fontWeight="bold">Nước dâng (+3L)</text>
              <text x="460" y="148" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">Archimedes: Vật chiếm chỗ</text>
            </g>
          </svg>
        );

      case 'periodic-logic-deduction-sudoku':
        return (
          <svg viewBox="0 0 700 160" className="w-full h-auto select-none">
            <g>
              <rect x="40" y="15" width="130" height="130" fill="#1e293b" rx="8" stroke="#f59e0b" strokeWidth="2" />
              {/* 4x4 Grid preview */}
              <line x1="72" y1="15" x2="72" y2="145" stroke="#475569" strokeWidth="1" />
              <line x1="105" y1="15" x2="105" y2="145" stroke="#f59e0b" strokeWidth="2" />
              <line x1="137" y1="15" x2="137" y2="145" stroke="#475569" strokeWidth="1" />
              <line x1="40" y1="47" x2="170" y2="47" stroke="#475569" strokeWidth="1" />
              <line x1="40" y1="80" x2="170" y2="80" stroke="#f59e0b" strokeWidth="2" />
              <line x1="40" y1="112" x2="170" y2="112" stroke="#475569" strokeWidth="1" />
              {/* Row Highlight */}
              <rect x="40" y="15" width="130" height="32" fill="#ea580c" opacity="0.3" />
              <text x="56" y="37" fill="#ffffff" fontSize="14" fontWeight="bold">1</text>
              <text x="88" y="37" fill="#ffffff" fontSize="14" fontWeight="bold">2</text>
              <text x="121" y="37" fill="#facc15" fontSize="16" fontWeight="black">?</text>
              <text x="153" y="37" fill="#ffffff" fontSize="14" fontWeight="bold">4</text>
            </g>
            <g>
              <text x="200" y="45" fill="#fde047" fontSize="14" fontWeight="black">
                🔍 Quy Tắc Vàng Loại Trừ Trong Ma Trận 4x4:
              </text>
              <text x="200" y="75" fill="#e2e8f0" fontSize="12">
                1. Mỗi hàng, cột, và khối 2x2 chỉ chứa các số {'{1, 2, 3, 4}'} đúng 1 lần duy nhất.
              </text>
              <text x="200" y="100" fill="#e2e8f0" fontSize="12">
                2. Nếu hàng đã có 1, 2 và 4 ➡️ Ô trống <tspan fill="#facc15" fontWeight="black">[?]</tspan> BẮT BUỘC phải là <tspan fill="#4ade80" fontWeight="black">3</tspan>!
              </text>
              <text x="200" y="125" fill="#38bdf8" fontSize="12" fontWeight="bold">
                🎯 Ưu tiên số 1: Luôn giải ô ở hàng/cột chỉ còn thiếu 1 phần tử trước!
              </text>
            </g>
          </svg>
        );

      case 'periodic-queue-intersection-counter':
        return (
          <svg viewBox="0 0 700 160" className="w-full h-auto select-none">
            {/* Queue Horizontal */}
            <g>
              <text x="20" y="35" fill="#fde047" fontSize="13" fontWeight="bold">Hàng dọc (8 bạn):</text>
              <path d="M 30 55 L 430 55" stroke="#64748b" strokeWidth="2" strokeDasharray="3 3" />
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
                const isBenny = num === 5;
                const x = 30 + num * 45;
                return (
                  <g key={num}>
                    <circle cx={x} cy={55} r={isBenny ? 14 : 10} fill={isBenny ? '#ea580c' : '#38bdf8'} stroke={isBenny ? '#fde047' : '#0284c7'} strokeWidth={2} />
                    <text x={x} y={59} fill="#ffffff" fontSize={isBenny ? 11 : 9} fontWeight="bold" textAnchor="middle">
                      {isBenny ? 'B' : num}
                    </text>
                  </g>
                );
              })}
              <text x="255" y="90" fill="#ea580c" fontSize="11" fontWeight="bold" textAnchor="middle">
                Benny: Thứ 5 từ trước ⬇️ &amp; Thứ 4 từ sau ⬆️
              </text>
              <text x="255" y="110" fill="#fde047" fontSize="12" fontWeight="black" textAnchor="middle">
                Tổng ＝ 5 ＋ 4 － 1 (Bù trừ vì Benny bị đếm 2 lần!) ＝ 8 bạn
              </text>
            </g>
            {/* Cross diagram */}
            <g>
              <text x="510" y="35" fill="#38bdf8" fontSize="12" fontWeight="bold">Điểm giao Chữ Thập (+):</text>
              <circle cx="580" cy="80" r="16" fill="#f43f5e" stroke="#fecdd3" strokeWidth="2" />
              <text x="580" y="85" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Giao</text>
              <text x="580" y="120" fill="#cbd5e1" fontSize="11" textAnchor="middle">Trừ 1 người ở ngã tư</text>
            </g>
          </svg>
        );

      case 'periodic-grand-comprehensive-arena':
      default:
        return (
          <svg viewBox="0 0 700 160" className="w-full h-auto select-none">
            <g>
              <rect x="250" y="10" width="200" height="135" rx="16" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <text x="350" y="50" fontSize="32" textAnchor="middle">🏆</text>
              <text x="350" y="80" fill="#fde047" fontSize="14" fontWeight="black" textAnchor="middle">ĐẤU TRƯỜNG TOÀN NĂNG</text>
              <text x="350" y="105" fill="#e2e8f0" fontSize="11" textAnchor="middle">Hội tụ 5 Mô Hình Tư Duy Cốt Lõi</text>
              <text x="350" y="125" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Toán Học Tư Duy Spark Math Lớp 3</text>
            </g>
            <g>
              <text x="60" y="45" fill="#bae6fd" fontSize="12" fontWeight="bold">📊 Sơ Đồ Đoạn Thẳng</text>
              <text x="60" y="85" fill="#a7f3d0" fontSize="12" fontWeight="bold">📈 Tỉ Lệ Nhân Biểu Đồ</text>
              <text x="60" y="125" fill="#bae6fd" fontSize="12" fontWeight="bold">💧 Khối Nước Cân Bằng</text>
            </g>
            <g>
              <text x="490" y="55" fill="#fde047" fontSize="12" fontWeight="bold">🧩 Ma Trận Sudoku</text>
              <text x="490" y="105" fill="#fecdd3" fontSize="12" fontWeight="bold">🚶 Bù Trừ Hàng Ngũ</text>
            </g>
          </svg>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#030617]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fade-in">
      <div className="relative bg-[radial-gradient(ellipse_at_top_right,_rgba(56,189,248,0.2),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(168,85,247,0.18),_transparent_55%),linear-gradient(160deg,_rgba(15,24,68,0.98),_rgba(7,12,38,0.99))] rounded-3xl shadow-[0_28px_70px_rgba(3,7,24,0.88),0_0_42px_rgba(34,211,238,0.18)] border border-cyan-300/45 max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden text-white">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-8 h-[2.5px] rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-400 shadow-[0_0_16px_rgba(34,211,238,0.7)]"
        />

        {/* Top Header */}
        <div className="bg-[#060B24]/90 border-b border-cyan-300/25 px-5 sm:px-6 py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-300 via-sky-400 to-fuchsia-400 text-slate-950 flex items-center justify-center text-2xl shadow-[0_0_18px_rgba(34,211,238,0.45)] shrink-0">
              {selectedAssessment.icon || '🧠'}
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-black uppercase tracking-wider text-cyan-300">
                  {selectedAssessment.code}
                </span>
                <span className="text-slate-500" aria-hidden="true">·</span>
                <span className="text-cyan-100/80 font-bold">
                  {selectedAssessment.stationName}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight leading-snug text-white">
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
            className="w-10 h-10 rounded-xl bg-white/[0.08] hover:bg-cyan-400/20 border border-white/15 hover:border-cyan-300/60 hover:shadow-[0_0_16px_rgba(34,211,238,0.35)] text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer"
            title="Đóng bài kiểm tra định kỳ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="bg-[#091238]/90 border-b border-cyan-300/20 px-4 sm:px-6 py-2.5 flex items-center justify-between overflow-x-auto gap-2 text-xs font-bold scrollbar-none">
          {[
            { num: 1, title: '1. Bản chất trực quan' },
            { num: 2, title: '2. Khái niệm cốt lõi' },
            { num: 3, title: '3. Cơ chế phép toán' },
            { num: 4, title: '4. Thực chiến tính toán' },
            { num: 5, title: '5. Sơ đồ & Chứng nhận' }
          ].map((s) => (
            <button
              key={s.num}
              type="button"
              onClick={() => {
                sound.playClick();
                setCurrentStep(s.num);
              }}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                currentStep === s.num
                  ? 'bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 text-slate-950 font-black shadow-[0_0_18px_rgba(34,211,238,0.45)]'
                  : currentStep > s.num
                  ? 'bg-emerald-500/15 border border-emerald-400/40 text-emerald-200'
                  : 'bg-white/[0.04] text-cyan-100/75 hover:text-white hover:bg-cyan-400/15 border border-white/10'
              }`}
            >
              {currentStep > s.num ? (
                <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[3]" />
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
          <div className="bg-[#050A1F]/95 rounded-2xl p-4 sm:p-5 text-white shadow-inner relative overflow-hidden border border-cyan-300/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-300" />
                <span className="text-xs font-black uppercase tracking-wider text-cyan-200">
                  Mô Hình Tư Duy: {selectedAssessment.thinkingModelName}
                </span>
              </div>
              {selectedAssessment.id === 'periodic-comparison-bar-model' || selectedAssessment.id === 'periodic-pictograph-ratio' ? (
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setShowCutLine(!showCutLine);
                  }}
                  className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white/[0.08] hover:bg-cyan-400/15 text-cyan-100 border border-cyan-300/30 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>{showCutLine ? 'Ẩn' : 'Hiện'} vạch dóng so sánh</span>
                </button>
              ) : null}
            </div>

            {/* Interactive SVG Model */}
            <div className="py-2">{renderVisualModel()}</div>
          </div>

          {/* ========================================================
              STAGES 1 to 4: DYNAMIC QUESTION CONTENT
          ======================================================== */}
          {currentStep >= 1 && currentStep <= 4 && (
            <div className="space-y-5 animate-fade-in">
              <div className="bg-[#091238]/90 border border-cyan-300/30 rounded-2xl p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-300/40 text-cyan-300 shrink-0 mt-0.5">
                    {currentStep === 1 ? (
                      <Lightbulb className="w-5 h-5" />
                    ) : currentStep === 2 ? (
                      <Brain className="w-5 h-5" />
                    ) : currentStep === 3 ? (
                      <Sliders className="w-5 h-5" />
                    ) : (
                      <Target className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">
                      Giai đoạn {currentStep}: {currentStepData.title || `Khảo sát Giai đoạn ${currentStep}`}
                    </h3>
                    <p className="text-xs sm:text-sm text-cyan-100/85 mt-1 leading-relaxed">
                      {currentStepData.desc || 'Em hãy đọc kỹ câu hỏi và tư duy để chọn hoặc điền câu trả lời chính xác.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {currentStepData.questions.map((q, idx) => {
                  const val = answers[q.questionId] || '';
                  const hasSubmitted = submittedSteps[currentStep];
                  const isCorrect = hasSubmitted && isQuestionCorrect(q);
                  const isWrong = hasSubmitted && !isCorrect;

                  return (
                    <div
                      key={q.questionId}
                      className={`bg-[#070D28]/90 border rounded-2xl p-5 space-y-3 transition-colors ${
                        isCorrect
                          ? 'border-emerald-400/60 bg-emerald-500/10'
                          : isWrong
                          ? 'border-rose-400/60 bg-rose-500/10'
                          : 'border-cyan-300/25'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-300/40 text-cyan-200 text-xs font-black flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                          {currentStep}.{idx + 1}
                        </span>
                        <label className="text-sm font-bold text-white leading-snug">
                          {q.prompt}
                        </label>
                      </div>

                      {/* Question Input by Type */}
                      {q.type === 'choice' && q.options && (
                        <div className="space-y-2 pt-1">
                          {q.options.map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => {
                                sound.playClick();
                                setAnswers((prev) => ({ ...prev, [q.questionId]: opt.id }));
                              }}
                              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-2.5 text-xs cursor-pointer ${
                                val === opt.id
                                  ? hasSubmitted
                                    ? opt.isCorrect
                                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-100 font-bold'
                                      : 'bg-rose-500/20 border-rose-400 text-rose-100 font-bold'
                                    : 'bg-cyan-500/20 border-cyan-300 text-white font-bold shadow-[0_0_16px_rgba(34,211,238,0.22)]'
                                  : 'bg-[#0B133B]/80 border-white/15 hover:border-cyan-300/50 text-slate-200'
                              }`}
                            >
                              <span
                                className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                                  val === opt.id ? 'bg-cyan-300 border-cyan-200 text-slate-950' : 'border-cyan-300/40'
                                }`}
                              >
                                {val === opt.id && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                              </span>
                              <span>{opt.text}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {q.type === 'number' && (
                        <div className="flex items-center gap-3 pt-1">
                          <input
                            type="text"
                            value={val}
                            onChange={(e) =>
                              setAnswers((prev) => ({ ...prev, [q.questionId]: e.target.value }))
                            }
                            placeholder={q.placeholder || 'Nhập đáp số...'}
                            className="w-48 px-4 py-2.5 text-sm font-black rounded-xl bg-[#050A1F] border border-cyan-300/35 text-white placeholder:text-slate-500 focus:border-cyan-300 focus:outline-none text-center tabular-nums"
                          />
                          {q.unit && (
                            <span className="text-sm font-bold text-cyan-200">{q.unit}</span>
                          )}
                        </div>
                      )}

                      {q.type === 'text' && (
                        <div className="pt-1">
                          <input
                            type="text"
                            value={val}
                            onChange={(e) =>
                              setAnswers((prev) => ({ ...prev, [q.questionId]: e.target.value }))
                            }
                            placeholder={q.placeholder || 'Nhập câu trả lời của em...'}
                            className="w-full px-4 py-2.5 text-sm rounded-xl bg-[#050A1F] border border-cyan-300/35 text-white placeholder:text-slate-500 focus:border-cyan-300 focus:outline-none"
                          />
                        </div>
                      )}

                      {/* Feedback status & hint */}
                      {hasSubmitted && (
                        <div className="text-xs pt-1">
                          {isCorrect ? (
                            <span className="text-emerald-300 font-bold flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 shrink-0" />
                              <span>{q.explanation}</span>
                            </span>
                          ) : (
                            <span className="text-rose-300 font-medium flex items-center gap-1.5">
                              <AlertCircle className="w-4 h-4 shrink-0" />
                              <span>Gợi ý tư duy: {q.hint}</span>
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setCurrentStep((prev) => prev - 1);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-cyan-200 bg-white/[0.06] border border-white/15 hover:bg-cyan-400/15 hover:border-cyan-300/50 flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" /> Quay lại
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCheckStep}
                    className="px-5 py-2.5 rounded-xl font-black text-slate-950 bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all cursor-pointer"
                  >
                    Kiểm tra câu trả lời
                  </button>

                  {isCurrentStepPassed && (
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setCurrentStep((prev) => prev + 1);
                      }}
                      className="px-5 py-2.5 rounded-xl font-black text-slate-950 bg-gradient-to-r from-emerald-300 to-cyan-300 hover:brightness-110 active:scale-95 shadow-[0_0_22px_rgba(52,211,153,0.45)] flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <span>
                        {currentStep === 4 ? 'Xem Sơ đồ & Nhận Chứng Nhận' : `Qua Giai đoạn ${currentStep + 1}`}
                      </span>
                      {currentStep === 4 ? <Award className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
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
              <div className="bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.22),_transparent_60%),linear-gradient(135deg,_rgba(30,58,138,0.65),_rgba(88,28,135,0.55))] border border-cyan-300/40 rounded-3xl p-6 text-white text-center shadow-[0_0_32px_rgba(34,211,238,0.2)] space-y-3">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-300 to-yellow-400 text-slate-950 flex items-center justify-center text-4xl shadow-[0_0_24px_rgba(251,191,36,0.45)]">
                  🎖️
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Xác Nhận Đạt Chuẩn Bài Kiểm Tra Định Kỳ
                </h3>
                <p className="text-xs sm:text-sm text-cyan-100/90 max-w-xl mx-auto leading-relaxed">
                  Em đã hoàn thành xuất sắc toàn bộ bài kiểm tra định kỳ của mô hình tư duy:{' '}
                  <strong className="text-amber-300">{selectedAssessment.thinkingModelName}</strong>! Cụm bài tập kế tiếp đã được mở khóa.
                </p>
                <div className="pt-2 flex items-center justify-center gap-3 text-xs font-bold text-cyan-200">
                  <span>Học sinh: {studentName}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-300">Trạng thái: Đạt chuẩn tư duy</span>
                </div>
              </div>

              {/* Sơ đồ tư duy */}
              <div className="bg-[#070D28]/90 border border-cyan-300/30 rounded-2xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-cyan-300/20 pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-cyan-300" />
                    <h4 className="font-black text-white text-sm sm:text-base">
                      Bảo Bối Tư Duy: Sơ Đồ Hệ Thống Hóa Quy Tắc Vàng
                    </h4>
                  </div>
                  <span className="text-xs font-black text-emerald-300">
                    Đã kiểm tra đạt
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {selectedAssessment.keyRuleSummary.map((rule, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#0B133B]/80 border border-cyan-300/20 space-y-1.5">
                      <div className="font-black text-amber-300 text-xs sm:text-sm flex items-center gap-1.5">
                        <Target className="w-4 h-4 text-cyan-300 shrink-0" />
                        <span>Quy Tắc {idx + 1}</span>
                      </div>
                      <p className="text-slate-200 leading-relaxed font-medium">{rule}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#050A1F]/80 p-4 rounded-xl border border-cyan-300/25">
                  <div className="text-xs text-cyan-100/90 font-medium">
                    {savedToNotebook ? (
                      <span className="text-emerald-300 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Đã lưu nội dung kiểm tra định kỳ này vào Sổ Ôn Tập!
                      </span>
                    ) : (
                      <span>
                        Lưu bản tóm tắt bài kiểm tra định kỳ vào <strong className="text-white">Sổ Ôn Tập</strong> để tự ôn tập khi gặp bài toán khó nhé!
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveToReviewNotebook}
                    disabled={savedToNotebook}
                    className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shrink-0 ${
                      savedToNotebook
                        ? 'bg-emerald-500/25 border border-emerald-400/50 text-emerald-200 cursor-default'
                        : 'bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 text-slate-950 hover:brightness-110 shadow-[0_0_18px_rgba(34,211,238,0.38)] active:scale-95 cursor-pointer'
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
                  className="px-4 py-2 rounded-xl text-xs font-bold text-cyan-200 bg-white/[0.06] border border-white/15 hover:bg-cyan-400/15 hover:border-cyan-300/50 flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <RotateCcw className="w-4 h-4" /> Ôn lại từ đầu
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-xl font-black text-slate-950 bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all cursor-pointer"
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

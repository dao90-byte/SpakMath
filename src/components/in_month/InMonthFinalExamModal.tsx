import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  InMonthFinalExam,
  InMonthSkillDomain,
} from '../../data/inMonthNovemberData';
import { evaluateWeeklyReasoningText } from '../../data/inMonthWeeklyTestsData';
import { getMonthStorageKeys } from '../../data/inMonthGrade3Catalog';
import { InMonthVisualModels } from './InMonthVisualModels';
import { sound } from '../../utils/soundEffects';
import { clearExerciseScreenInk } from '../ScreenAnnotationOverlay';
import {
  getInMonthQuestionInputSpec,
  isInMonthAnswerCorrect,
} from '../../utils/inMonthAnswerUtils';
import { MINDMATH_PILLAR_COLORS } from '../../utils/oklchApcaPalette';
import {
  Trophy,
  Award,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Sparkles,
  RotateCcw,
  PenTool,
  Calendar,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  BarChart3,
  Lightbulb,
  BookOpen,
  Clock,
  Pause,
  Play,
  MessageSquareQuote,
} from 'lucide-react';

export interface InMonthExamSavedResult {
  totalScore: number;
  basicScore: number;
  olympiadScore: number;
  reasoningScore?: number;
  reasoningTexts?: Record<string, string>;
  elapsedSeconds?: number;
  completedAt: string;
  studentName: string;
  answers: Record<string, string>;
}

interface InMonthFinalExamModalProps {
  monthNumber: number;
  unitLabel?: 'Ngày' | 'Buổi';
  finalExam: InMonthFinalExam;
  savedResult: InMonthExamSavedResult | null;
  onSaveResult: (result: InMonthExamSavedResult) => void;
  onClose: () => void;
  onJumpToDay: (dayNumber: number) => void;
  onOpenScratchpad: () => void;
}

type PillarMetaEntry = {
  title: string;
  color: string;
  reviewDays: number[];
  strongComment: string;
  improveComment: string;
};

const DEFAULT_PILLAR_META: Record<InMonthSkillDomain, PillarMetaEntry> = {
  bar_model: {
    title: 'Toán Đố Sơ Đồ Thanh (Nhân & Chia)',
    color: MINDMATH_PILLAR_COLORS.bar_model.fill,
    reviewDays: [1, 3, 5, 7],
    strongComment:
      'Nắm vững kỹ thuật vẽ sơ đồ thanh Singapore (Bar Model), phân biệt xuất sắc bài toán Phần - Tổng và So sánh Hơn - Kém.',
    improveComment:
      'Cần chú ý bước xác định "1 phần bằng nhau" và kiểm tra kỹ đề bài hỏi Tổng hay Hiệu số phần.',
  },
  remainder: {
    title: 'Phép Chia Có Dư & Quy Luật Chu Kỳ',
    color: MINDMATH_PILLAR_COLORS.remainder.fill,
    reviewDays: [8, 10, 11, 13],
    strongComment:
      'Xử lý nhạy bén số dư thực tế (làm tròn lên khi thuê thuyền/xe, lấy phần nguyên khi đóng hộp) và tìm chính xác phần tử thứ N trong chu kỳ.',
    improveComment:
      'Cần ôn lại sự khác biệt giữa bài toán "Cần ít nhất bao nhiêu chuyến" (Thương + 1) và "Đóng được nhiều nhất bao nhiêu hộp" (Lấy thương).',
  },
  interval: {
    title: 'Toán Khoảng Cách & Ứng Dụng (Trồng Cây, Cưa Gỗ, Cầu Thang)',
    color: MINDMATH_PILLAR_COLORS.interval.fill,
    reviewDays: [15, 18, 19, 20],
    strongComment:
      'Phân biệt chuẩn xác số khoảng và số điểm mốc trong cả 4 dạng: trồng 2 đầu, 1 đầu, không trồng 2 đầu, đường khép kín, cưa gỗ và cầu thang.',
    improveComment:
      'Lưu ý quy tắc vàng: Số lần cưa = Số đoạn - 1; Số khoảng tầng cầu thang cần leo = Tầng đến - Tầng xuất phát.',
  },
  measurement: {
    title: 'Đo Lường (Độ Dài, Khối Lượng, Thể Tích) & Biểu Đồ',
    color: MINDMATH_PILLAR_COLORS.measurement.fill,
    reviewDays: [22, 24, 25, 27],
    strongComment:
      'Đổi đơn vị đo (km-m-cm, kg-g, L-mL) thành thạo, đọc cân thăng bằng, tính vật rỗng/ruột và phân tích biểu đồ chính xác tuyệt đối.',
    improveComment:
      'Cần kiểm tra kỹ bước đổi về cùng một đơn vị đo trước khi cộng trừ và lưu ý trừ khối lượng vỏ hộp/chai khi tìm một nửa.',
  },
};

const DECEMBER_PILLAR_META: Record<InMonthSkillDomain, PillarMetaEntry> = {
  interval: {
    title: 'Chu Vi Hình Vuông, Hình Chữ Nhật & Toán Ngược',
    color: MINDMATH_PILLAR_COLORS.interval.fill,
    reviewDays: [1, 2, 4, 5],
    strongComment:
      'Thành thạo công thức chu vi, phân biệt rõ Nửa chu vi với Chu vi, giải chính xác bài toán ngược tìm cạnh và bài toán rào vườn chừa cổng.',
    improveComment:
      'Cần nhớ bước chia đôi tìm Nửa chu vi trước khi trừ chiều dài/rộng và chú ý trừ đi chiều rộng cổng khi tính lưới rào.',
  },
  bar_model: {
    title: 'Chu Vi Hình Ghép & Kỹ Thuật Dời Cạnh (Side-Shifting)',
    color: MINDMATH_PILLAR_COLORS.bar_model.fill,
    reviewDays: [6, 7, 9, 10],
    strongComment:
      'Ứng dụng xuất sắc kỹ thuật Dời cạnh Singapore cho hình chữ L, bậc thang, đếm đúng cạnh viền hình ghép vuông và cộng đủ 2 thành khe lõm chữ U.',
    improveComment:
      'Cần phân biệt kỹ: ghép hình vuông mất 2 cạnh ở mỗi mối ghép; hình chữ L bằng khung bao; hình chữ U cộng thêm 2 lần độ sâu khe lõm.',
  },
  remainder: {
    title: 'Đo Lường Khối Lượng (kg – g), Trừ Bì & Cân Thăng Bằng',
    color: MINDMATH_PILLAR_COLORS.remainder.fill,
    reviewDays: [11, 12, 13, 14],
    strongComment:
      'Đổi đơn vị kg – g chuẩn xác (không thiếu chữ số 0), xử lý mượt bài toán trừ bì, cân đĩa thăng bằng, cả thùng – nửa thùng và san giỏ.',
    improveComment:
      'Lưu ý quy tắc 1 kg = 1 000 g (3 chữ số phần gam) và hiệu giữa thùng đầy với thùng còn nửa hàng chính là một nửa lượng hàng bên trong.',
  },
  measurement: {
    title: 'Đo Lường Thể Tích (L – mL), Chia Đều & San Bình',
    color: MINDMATH_PILLAR_COLORS.measurement.fill,
    reviewDays: [16, 17, 18, 20],
    strongComment:
      'Quy đổi L – mL nhanh nhạy, giải tốt bài toán rót đều vào chai/cốc, san bình bằng nhau (một nửa hiệu) và suy luận ngược thể tích.',
    improveComment:
      'Luôn đổi về cùng đơn vị mL trước khi cộng trừ hoặc chia đều, và nhớ khi rót x từ bình A sang B thì hiệu giữa hai bình thay đổi 2 × x.',
  },
};

const JANUARY_PILLAR_META: Record<InMonthSkillDomain, PillarMetaEntry> = {
  measurement: {
    title: 'Số Phạm Vi 10 000 (Cấu Tạo Hàng, So Sánh, Ghép Số & Làm Tròn)',
    color: MINDMATH_PILLAR_COLORS.measurement.fill,
    reviewDays: [1, 3, 5, 7],
    strongComment:
      'Đọc và phân tích chuẩn xác 4 hàng Nghìn – Trăm – Chục – Đơn vị trên Thẻ giá trị vị trí, giữ chỗ bằng chữ số 0 đúng vị trí, ghép số không đặt 0 đứng đầu và làm tròn tự tin trên trục số.',
    improveComment:
      'Cần kiểm tra kỹ chữ số 0 giữ chỗ khi hàng trống, tránh đặt chữ số 0 ở hàng nghìn khi ghép số nhỏ nhất, và nhớ quy tắc 5 làm tròn lên khi xét chữ số ngay bên phải.',
  },
  interval: {
    title: 'Cộng Trừ Có Nhớ 10 000 & Giải Mã Chuỗi Số Quy Luật',
    color: MINDMATH_PILLAR_COLORS.interval.fill,
    reviewDays: [8, 10, 12, 14],
    strongComment:
      'Thực hiện thành thạo cộng trừ có nhớ và trừ mượn dây chuyền qua số 0 trong phạm vi 10 000, đồng thời phát hiện nhạy bén quy luật khoảng nhảy bậc 2, Fibonacci, cấp số nhân và dãy xen kẽ 2 nhánh.',
    improveComment:
      'Cần viết rõ các khoảng nhảy (vòng cung bước nhảy) giữa hai số hạng liên tiếp để phân biệt dãy cộng đều, dãy bậc 2 tăng dần và dãy xen kẽ vị trí lẻ – chẵn.',
  },
  bar_model: {
    title: 'Diện Tích Ô Vuông, Hình Chữ Nhật, Hình Chữ L & Khung Viền',
    color: MINDMATH_PILLAR_COLORS.bar_model.fill,
    reviewDays: [15, 17, 19, 21],
    strongComment:
      'Hiểu bản chất diện tích qua đếm ô vuông đơn vị (kể cả ghép nửa ô tam giác), vận dụng linh hoạt 2 chiến lược Cắt–Cộng và Bao–Trừ cho hình chữ L và tính chính xác diện tích khung viền lối đi.',
    improveComment:
      'Lưu ý đổi hai cạnh về cùng đơn vị đo trước khi nhân diện tích, và với lối đi bao quanh rộng d ở cả 4 phía thì mỗi kích thước khung ngoài phải cộng thêm 2 × d.',
  },
  remainder: {
    title: 'Liên Kết Chu Vi – Diện Tích, Tối Ưu Hình Học & Uốn Dây',
    color: MINDMATH_PILLAR_COLORS.remainder.fill,
    reviewDays: [22, 24, 26, 28],
    strongComment:
      'Chuyển đổi hai chiều giữa Chu vi và Diện tích chính xác, kết hợp xuất sắc Sơ đồ thanh tìm kích thước, hiểu sâu định lý cùng chu vi hình vuông diện tích lớn nhất và bảo toàn chu vi khi uốn lại dây.',
    improveComment:
      'Nhớ chia 2 để tìm Nửa chu vi (Dài + Rộng) trước khi chia phần hoặc tìm cạnh còn lại; khi kéo dài cạnh chữ nhật thì diện tích tăng thêm bằng phần kéo dài nhân cạnh không đổi.',
  },
};

function fireExamCelebration() {
  const cosmicColors = ['#FBBF24', '#EC4899', '#22D3EE', '#34D399', '#A855F7', '#FFFFFF'];
  confetti({
    particleCount: 110,
    spread: 90,
    origin: { y: 0.6 },
    colors: cosmicColors,
  });
  setTimeout(() => {
    confetti({
      particleCount: 70,
      angle: 60,
      spread: 75,
      origin: { x: 0.05, y: 0.7 },
      colors: cosmicColors,
    });
    confetti({
      particleCount: 70,
      angle: 120,
      spread: 75,
      origin: { x: 0.95, y: 0.7 },
      colors: cosmicColors,
    });
  }, 240);
}

export const InMonthFinalExamModal: React.FC<InMonthFinalExamModalProps> = ({
  monthNumber,
  unitLabel = 'Ngày',
  finalExam,
  savedResult,
  onSaveResult,
  onClose,
  onJumpToDay,
  onOpenScratchpad,
}) => {
  const examDraftKey = getMonthStorageKeys(monthNumber).examDraftKey;
  const examQuestions = finalExam.questions;
  const totalQuestions = examQuestions.length;
  const defaultSeconds = finalExam.durationMinutes * 60;

  const [studentName, setStudentName] = useState(() => {
    if (savedResult?.studentName) return savedResult.studentName;
    try {
      const raw = localStorage.getItem(examDraftKey);
      if (raw) return JSON.parse(raw).studentName || 'Phi Hành Gia Nhí';
    } catch {
      // ignore
    }
    return 'Phi Hành Gia Nhí';
  });
  const [currentIdx, setCurrentIdx] = useState(() => {
    if (savedResult) return 0;
    try {
      const raw = localStorage.getItem(examDraftKey);
      if (raw) {
        return Math.min(
          Math.max(0, JSON.parse(raw).currentIdx || 0),
          Math.max(0, totalQuestions - 1)
        );
      }
    } catch {
      // ignore
    }
    return 0;
  });
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    if (savedResult?.answers) return savedResult.answers;
    try {
      const raw = localStorage.getItem(examDraftKey);
      if (raw) return JSON.parse(raw).answers || {};
    } catch {
      // ignore
    }
    return {};
  });
  const [reasoningTexts, setReasoningTexts] = useState<Record<string, string>>(() => {
    if (savedResult?.reasoningTexts) return savedResult.reasoningTexts;
    try {
      const raw = localStorage.getItem(examDraftKey);
      if (raw) return JSON.parse(raw).reasoningTexts || {};
    } catch {
      // ignore
    }
    return {};
  });
  const [remainingSeconds, setRemainingSeconds] = useState<number>(() => {
    if (savedResult) return defaultSeconds;
    try {
      const raw = localStorage.getItem(examDraftKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed.remainingSeconds === 'number' && parsed.remainingSeconds > 0) {
          return Math.min(parsed.remainingSeconds, defaultSeconds);
        }
      }
    } catch {
      // ignore
    }
    return defaultSeconds;
  });
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(!!savedResult);
  const [activeTab, setActiveTab] = useState<'report' | 'review'>('report');

  useEffect(() => {
    if (isSubmitted) return;
    try {
      localStorage.setItem(
        examDraftKey,
        JSON.stringify({ studentName, currentIdx, answers, reasoningTexts, remainingSeconds })
      );
    } catch {
      // ignore
    }
  }, [examDraftKey, studentName, currentIdx, answers, reasoningTexts, remainingSeconds, isSubmitted]);

  useEffect(() => {
    clearExerciseScreenInk();
  }, [currentIdx]);

  const currentQ = examQuestions[Math.min(currentIdx, Math.max(0, totalQuestions - 1))];
  const currentExamInputSpec = getInMonthQuestionInputSpec(currentQ.correctAnswer);

  const partAQuestions = examQuestions.filter((q) => q.part === 'A');
  const partBQuestions = examQuestions.filter((q) => q.part === 'B');
  const partCQuestions = examQuestions.filter((q) => q.part === 'C');
  const hasPartC = partCQuestions.length > 0;

  const partAStartIdx = examQuestions.findIndex((q) => q.part === 'A');
  const partBStartIdx = examQuestions.findIndex((q) => q.part === 'B');
  const partCStartIdx = examQuestions.findIndex((q) => q.part === 'C');

  const partAMax = partAQuestions.reduce((acc, q) => acc + q.points, 0);
  const partBMax = partBQuestions.reduce((acc, q) => acc + q.points, 0);
  const partCMax = partCQuestions.reduce((acc, q) => acc + q.points, 0);

  const handleSelectOption = (opt: string) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [currentQ.id]: opt }));
  };

  const computeExamScores = (
    ansMap: Record<string, string>,
    textMap: Record<string, string>
  ) => {
    let basic = 0;
    let olympiad = 0;
    let reasoning = 0;

    examQuestions.forEach((q) => {
      const userAns = (ansMap[q.id] || '').trim();
      const isRightOption = isInMonthAnswerCorrect(userAns, q.correctAnswer);
      if (q.part === 'A') {
        if (isRightOption) basic += q.points;
      } else if (q.part === 'B') {
        if (isRightOption) olympiad += q.points;
      } else {
        // Phần C (Nghị luận Tư duy): 5đ chọn lập luận đúng + tối đa 5đ viết lời giải trình bày
        const evalRes = evaluateWeeklyReasoningText(textMap[q.id] || '', q.reasoningKeywords);
        const halfPts = Math.floor(q.points / 2);
        const textMax = q.points - halfPts;
        if (isRightOption) reasoning += halfPts;
        reasoning += Math.min(textMax, evalRes.points);
      }
    });

    return {
      basicScore: basic,
      olympiadScore: olympiad,
      reasoningScore: reasoning,
      totalScore: basic + olympiad + reasoning,
    };
  };

  const handleSubmitExam = () => {
    const scores = computeExamScores(answers, reasoningTexts);
    const elapsedSeconds = Math.max(1, defaultSeconds - remainingSeconds);

    const result: InMonthExamSavedResult = {
      totalScore: scores.totalScore,
      basicScore: scores.basicScore,
      olympiadScore: scores.olympiadScore,
      reasoningScore: scores.reasoningScore,
      reasoningTexts,
      elapsedSeconds,
      completedAt: new Date().toLocaleDateString('vi-VN'),
      studentName: studentName.trim() || 'Phi Hành Gia Nhí',
      answers,
    };

    try {
      localStorage.removeItem(examDraftKey);
    } catch {
      // ignore
    }

    onSaveResult(result);
    setIsSubmitted(true);
    setActiveTab('report');
    sound.playVictory();
    fireExamCelebration();
  };

  // Countdown timer for final exam (e.g. 50 minutes for 45–60 min standard)
  useEffect(() => {
    if (isSubmitted || isPaused) return;
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted, isPaused]);

  // Auto-submit when countdown hits 0
  useEffect(() => {
    if (!isSubmitted && remainingSeconds === 0) {
      handleSubmitExam();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingSeconds, isSubmitted]);

  const handleRetakeExam = () => {
    try {
      localStorage.removeItem(examDraftKey);
    } catch {
      // ignore
    }
    setAnswers({});
    setReasoningTexts({});
    setCurrentIdx(0);
    setRemainingSeconds(defaultSeconds);
    setIsPaused(false);
    setIsSubmitted(false);
  };

  const formatCountdown = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  const isQuestionAnswered = (q: (typeof examQuestions)[number]) => {
    const ans = (answers[q.id] || '').trim();
    if (q.part === 'C') {
      const txt = (reasoningTexts[q.id] || '').trim();
      return ans !== '' && txt.length >= 6;
    }
    return ans !== '';
  };

  const isQuestionMastered = (q: (typeof examQuestions)[number]) => {
    const ans = (answers[q.id] || '').trim();
    const isOptRight = isInMonthAnswerCorrect(ans, q.correctAnswer);
    if (q.part === 'C') {
      const evalRes = evaluateWeeklyReasoningText(reasoningTexts[q.id] || '', q.reasoningKeywords);
      return isOptRight && evalRes.isComplete;
    }
    return isOptRight;
  };

  const getPillarStats = (pillar: InMonthSkillDomain) => {
    const qs = examQuestions.filter((q) => q.skillDomain === pillar);
    const correct = qs.filter((q) => isQuestionMastered(q)).length;
    const pct = qs.length > 0 ? Math.round((correct / qs.length) * 100) : 0;
    return { total: qs.length, correct, pct };
  };

  const { basicScore, olympiadScore, reasoningScore, totalScore } = computeExamScores(
    answers,
    reasoningTexts
  );

  const getRankBadge = (score: number) => {
    if (score >= 90)
      return {
        rank: 'Chỉ Huy Tối Cao Ngân Hà (Xuất sắc - Đạt chuẩn Olympic Singapore)',
        badgeColor: 'from-amber-400 to-orange-500 text-slate-950',
      };
    if (score >= 75)
      return {
        rank: 'Thuyền Trưởng Tinh Anh (Giỏi - Nắm vững tư duy CPA)',
        badgeColor: 'from-cyan-400 to-blue-500 text-slate-950',
      };
    if (score >= 55)
      return {
        rank: 'Phi Hành Gia Khám Phá (Khá - Cần rèn thêm câu vận dụng cao)',
        badgeColor: 'from-emerald-400 to-teal-500 text-slate-950',
      };
    return {
      rank: `Tân Binh Vũ Trụ (Cần ôn tập lại các ${unitLabel.toLowerCase()} trọng tâm)`,
      badgeColor: 'from-purple-500 to-indigo-600 text-white',
    };
  };

  const rankInfo = getRankBadge(totalScore);
  const answeredCount = examQuestions.filter((q) => isQuestionAnswered(q)).length;
  const currentReasoningEval =
    currentQ.part === 'C'
      ? evaluateWeeklyReasoningText(reasoningTexts[currentQ.id] || '', currentQ.reasoningKeywords)
      : null;

  return (
    <div className="min-h-screen mm-cosmic-canvas pb-16 relative overflow-hidden">
      {/* Deep Space Starfield, Orbital Rings & Multi-Spectrum Aurora Blooms */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-28 left-1/5 w-[540px] h-[540px] rounded-full bg-cyan-400/22 blur-[145px] cosmic-light-bloom" />
        <div className="absolute top-1/4 -right-24 w-[500px] h-[500px] rounded-full bg-fuchsia-500/20 blur-[145px] cosmic-light-bloom" />
        <div className="absolute bottom-0 left-1/3 w-[540px] h-[540px] rounded-full bg-amber-400/14 blur-[155px] cosmic-light-bloom" />
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full opacity-80"
        >
          <circle cx="1220" cy="140" r="260" fill="none" stroke="rgba(103,232,249,0.22)" strokeWidth="1.2" strokeDasharray="6 10" />
          <circle cx="1220" cy="140" r="370" fill="none" stroke="rgba(251,191,36,0.16)" strokeWidth="1" />
          <circle cx="180" cy="760" r="240" fill="none" stroke="rgba(232,121,249,0.2)" strokeWidth="1.2" strokeDasharray="4 10" />
          <circle cx="110" cy="95" r="1.8" fill="#67E8F9" />
          <circle cx="290" cy="160" r="1.6" fill="#FDE68A" />
          <circle cx="640" cy="210" r="2" fill="#67E8F9" />
          <circle cx="880" cy="90" r="1.7" fill="#F9A8D4" />
          <circle cx="1090" cy="240" r="2.2" fill="#FDE68A" />
          <circle cx="195" cy="490" r="1.9" fill="#FDE68A" />
          <circle cx="520" cy="640" r="1.6" fill="#67E8F9" />
          <circle cx="1160" cy="680" r="2" fill="#F9A8D4" />
        </svg>
      </div>

      {/* Top Cosmic Mission Command Bar */}
      <div className="sticky top-0 z-30 backdrop-blur-2xl bg-[color:color-mix(in_oklch,var(--mm-surface-inset)_94%,transparent)] border-b border-[color:color-mix(in_oklch,var(--mm-cyan-border)_68%,transparent)] px-4 py-3.5 shadow-[0_24px_64px_rgba(3,7,24,0.88),0_0_40px_rgba(34,211,238,0.18)] overflow-hidden">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-amber-300 opacity-95 shadow-[0_0_22px_rgba(34,211,238,0.85)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300/90 to-transparent shadow-[0_0_22px_rgba(34,211,238,0.75)]"
        />
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2.5 rounded-xl bg-white/[0.09] hover:bg-cyan-400/20 text-white font-bold text-xs flex items-center gap-1.5 border border-cyan-300/45 hover:border-cyan-200/80 shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_28px_rgba(34,211,238,0.45)] cursor-pointer transition-all duration-200 min-h-[44px] whitespace-nowrap"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-300" aria-hidden="true" />
              <span>Quay Về Lịch {finalExam.monthLabel}</span>
            </button>
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(251,191,36,1)]" aria-hidden="true" />
                <span className="drop-shadow-[0_0_8px_rgba(251,191,36,0.45)]">
                  Lớp 3 · {finalExam.monthLabel} · {finalExam.durationRangeLabel || `${finalExam.durationMinutes} phút`}
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-extrabold font-display bg-gradient-to-r from-amber-200 via-white to-cyan-200 bg-clip-text text-transparent mt-0.5 cosmic-glow-title-cyan">
                {finalExam.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {!isSubmitted && (
              <div
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl border font-black text-xs sm:text-sm tabular-nums min-h-[44px] ${
                  remainingSeconds <= 300
                    ? 'bg-rose-950/90 border-rose-400 text-rose-200 shadow-[0_0_24px_rgba(244,63,94,0.45)] animate-pulse'
                    : 'bg-[#0A1136]/95 border-cyan-300/55 text-cyan-200 shadow-[0_0_28px_rgba(34,211,238,0.28)]'
                }`}
              >
                <Clock className="w-4 h-4 text-amber-300 shrink-0" aria-hidden="true" />
                <span>{formatCountdown(remainingSeconds)}</span>
                <button
                  type="button"
                  onClick={() => setIsPaused(!isPaused)}
                  aria-label={isPaused ? 'Tiếp tục đồng hồ' : 'Tạm dừng đồng hồ'}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-cyan-400/25 border border-cyan-300/30 flex items-center justify-center text-white cursor-pointer"
                  title={isPaused ? 'Tiếp tục' : 'Tạm dừng'}
                >
                  {isPaused ? (
                    <Play className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
                  ) : (
                    <Pause className="w-3.5 h-3.5 text-cyan-200" aria-hidden="true" />
                  )}
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={onOpenScratchpad}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-300 via-orange-400 to-pink-500 hover:from-amber-200 hover:to-pink-400 text-slate-950 font-black text-xs flex items-center gap-1.5 ring-1 ring-amber-200/90 shadow-[0_8px_28px_rgba(251,191,36,0.52),0_0_32px_rgba(236,72,153,0.28)] hover:shadow-[0_12px_36px_rgba(251,191,36,0.72),0_0_42px_rgba(236,72,153,0.42)] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 min-h-[44px]"
            >
              <PenTool className="w-4 h-4" aria-hidden="true" />
              <span>Bảng Vẽ Nháp</span>
            </button>

            {isSubmitted && (
              <button
                type="button"
                onClick={handleRetakeExam}
                className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-cyan-400/20 text-white font-bold text-xs flex items-center gap-1.5 border border-cyan-300/35 hover:border-cyan-300/75 hover:shadow-[0_0_20px_rgba(34,211,238,0.35)] cursor-pointer transition-all duration-200 min-h-[44px]"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Làm Lại Đề Thi</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mode 1: Taking the Exam */}
      {!isSubmitted ? (
        <div className="relative z-10 max-w-7xl mx-auto px-4 mt-6">
          {/* Student Name & Dynamic Part Switcher Banner */}
          <div className="relative overflow-hidden rounded-3xl mm-surface-card backdrop-blur-2xl border p-4 sm:p-5 mb-5 flex flex-wrap items-center justify-between gap-4 shadow-[0_20px_52px_rgba(3,7,24,0.72),0_0_30px_rgba(34,211,238,0.14),inset_0_1px_0_rgba(255,255,255,0.14)]">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 inset-x-6 h-[2.5px] rounded-full bg-gradient-to-r from-[color:var(--mm-cyan-brightFill)] via-[color:var(--mm-violet-accent)] to-[color:var(--mm-amber-brightFill)] shadow-[0_0_16px_rgba(34,211,238,0.7)]"
            />
            <div className="flex flex-wrap items-center gap-3">
              <label htmlFor="exam-student-name" className="text-xs font-extrabold text-[color:var(--mm-cyan-text)] uppercase tracking-wider">
                Họ tên thí sinh trên Chứng nhận:
              </label>
              <input
                id="exam-student-name"
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="px-4 py-2 rounded-xl bg-[color:var(--mm-surface-inset)] text-[color:var(--mm-ink-primary)] font-black text-sm border-2 border-[color:var(--mm-amber-border)] focus:border-[color:var(--mm-cyan-accent)] focus:outline-none min-h-[42px] placeholder:text-[color:var(--mm-ink-muted)] shadow-inner"
                placeholder="Nhập tên của em..."
              />
            </div>

            <div role="group" aria-label="Chọn phần thi" className="flex flex-wrap items-center gap-2">
              {partAStartIdx !== -1 && (
                <button
                  type="button"
                  aria-pressed={currentQ.part === 'A'}
                  onClick={() => setCurrentIdx(partAStartIdx)}
                  className={`px-4 py-2.5 rounded-xl font-black text-xs transition-all duration-200 cursor-pointer min-h-[42px] ${
                    currentQ.part === 'A'
                      ? 'bg-[color:var(--mm-cyan-brightFill)] text-[#05081D] shadow-[0_0_20px_rgba(34,211,238,0.35)]'
                      : 'bg-white/10 text-[color:var(--mm-ink-secondary)] hover:bg-white/20'
                  }`}
                >
                  Phần A: Cơ Bản ({partAQuestions.length} câu • {partAMax}đ)
                </button>
              )}
              {partBStartIdx !== -1 && (
                <button
                  type="button"
                  aria-pressed={currentQ.part === 'B'}
                  onClick={() => setCurrentIdx(partBStartIdx)}
                  className={`px-4 py-2.5 rounded-xl font-black text-xs transition-all duration-200 cursor-pointer min-h-[42px] ${
                    currentQ.part === 'B'
                      ? 'bg-[color:var(--mm-amber-brightFill)] text-[#05081D] shadow-[0_0_20px_rgba(251,191,36,0.35)]'
                      : 'bg-white/10 text-[color:var(--mm-ink-secondary)] hover:bg-white/20'
                  }`}
                >
                  Phần B: Tư Duy Olympic ({partBQuestions.length} câu • {partBMax}đ)
                </button>
              )}
              {hasPartC && partCStartIdx !== -1 && (
                <button
                  type="button"
                  aria-pressed={currentQ.part === 'C'}
                  onClick={() => setCurrentIdx(partCStartIdx)}
                  className={`px-4 py-2.5 rounded-xl font-black text-xs transition-all duration-200 cursor-pointer min-h-[42px] inline-flex items-center gap-1.5 ${
                    currentQ.part === 'C'
                      ? 'bg-[color:var(--mm-violet-brightFill)] text-[#05081D] shadow-[0_0_20px_rgba(232,121,249,0.4)]'
                      : 'bg-white/10 text-[color:var(--mm-ink-secondary)] hover:bg-white/20'
                  }`}
                >
                  <MessageSquareQuote className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Phần C: Nghị Luận ({partCQuestions.length} câu • {partCMax}đ)</span>
                </button>
              )}
            </div>
          </div>

          {/* Dynamic Constellation Question Number Navigator */}
          <div className="relative overflow-hidden rounded-3xl mm-surface-card backdrop-blur-2xl border p-4 mb-6 flex flex-wrap items-center justify-between gap-3 shadow-[0_20px_52px_rgba(3,7,24,0.72),0_0_30px_rgba(34,211,238,0.14),inset_0_1px_0_rgba(255,255,255,0.14)]">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 inset-x-6 h-[2.5px] rounded-full bg-gradient-to-r from-[color:var(--mm-cyan-brightFill)] via-[color:var(--mm-violet-accent)] to-[color:var(--mm-amber-brightFill)] shadow-[0_0_16px_rgba(34,211,238,0.7)]"
            />
            <div role="group" aria-label={`Danh sách ${totalQuestions} câu thi`} className="flex flex-wrap gap-1.5">
              {examQuestions.map((q, idx) => {
                const hasAns = isQuestionAnswered(q);
                const isCurr = idx === currentIdx;
                return (
                  <button
                    key={q.id}
                    type="button"
                    aria-label={`Câu ${idx + 1}${hasAns ? ' (Đã hoàn thành)' : ''}`}
                    aria-pressed={isCurr}
                    onClick={() => setCurrentIdx(idx)}
                    className={`w-10 h-10 rounded-xl font-black text-xs transition-all duration-200 cursor-pointer tabular-nums ${
                      isCurr
                        ? q.part === 'C'
                          ? 'bg-[color:var(--mm-violet-brightFill)] text-[#05081D] ring-2 ring-[color:var(--mm-violet-bright)] shadow-[0_0_22px_rgba(232,121,249,0.55)] scale-105'
                          : 'bg-[color:var(--mm-amber-brightFill)] text-[#05081D] ring-2 ring-[color:var(--mm-amber-bright)] shadow-[0_0_22px_rgba(251,191,36,0.55)] scale-105'
                        : hasAns
                        ? q.part === 'C'
                          ? 'bg-[color:var(--mm-violet-fill)] text-white border border-[color:var(--mm-violet-accent)] shadow-[0_0_12px_rgba(232,121,249,0.3)]'
                          : 'bg-[color:var(--mm-cyan-fill)] text-white border border-[color:var(--mm-cyan-accent)] shadow-[0_0_12px_rgba(34,211,238,0.3)]'
                        : 'bg-[color:var(--mm-surface-inset)] text-[color:var(--mm-ink-secondary)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_45%,transparent)] hover:border-[color:var(--mm-cyan-accent)]'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3.5 py-2 rounded-xl bg-[color:var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_55%,transparent)] text-xs font-bold text-[color:var(--mm-ink-secondary)] tabular-nums">
                Đã trả lời: <strong className="text-[color:var(--mm-cyan-text)]">{answeredCount}/{totalQuestions}</strong>
              </span>
              <button
                type="button"
                onClick={handleSubmitExam}
                className="px-4 py-2.5 rounded-2xl bg-[color:var(--mm-emerald-brightFill)] hover:brightness-110 text-[#05081D] font-black text-xs shadow-[0_8px_24px_rgba(52,211,153,0.35)] cursor-pointer transition-all duration-200 min-h-[42px]"
              >
                Nộp Bài &amp; Xem Đánh Giá Năng Lực
              </button>
            </div>
          </div>

          {/* Two-Zone Exam Question Sandbox */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7">
              <InMonthVisualModels model={currentQ.visualModel} isAnswered={false} />
            </div>

            <div className="lg:col-span-5 relative overflow-hidden mm-surface-card backdrop-blur-2xl rounded-3xl p-6 sm:p-7 shadow-[0_32px_84px_rgba(3,7,24,0.9),0_0_46px_rgba(34,211,238,0.16),inset_0_1px_0_rgba(255,255,255,0.16)] border">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-0 inset-x-6 h-[2.5px] rounded-full bg-gradient-to-r from-[color:var(--mm-cyan-brightFill)] via-[color:var(--mm-amber-brightFill)] to-[color:var(--mm-violet-accent)] shadow-[0_0_22px_rgba(34,211,238,0.8)]"
              />
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/15">
                <span
                  className={`font-black text-xs uppercase tracking-wider ${
                    currentQ.part === 'A'
                      ? 'text-[color:var(--mm-cyan-text)]'
                      : currentQ.part === 'B'
                      ? 'text-[color:var(--mm-amber-text)]'
                      : 'text-[color:var(--mm-violet-text)]'
                  }`}
                >
                  Câu {currentIdx + 1}/{totalQuestions} ·{' '}
                  {currentQ.part === 'A'
                    ? 'Phần A: Cơ Bản'
                    : currentQ.part === 'B'
                    ? 'Phần B: Olympic'
                    : 'Phần C: Nghị Luận'}
                </span>
                <span className="text-xs font-black text-[color:var(--mm-amber-text)] tabular-nums">
                  +{currentQ.points} điểm
                </span>
              </div>

              <div className="rounded-2xl bg-[color:var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_58%,transparent)] p-4 sm:p-5 mb-6 shadow-[inset_0_2px_16px_rgba(0,0,0,0.5)]">
                <p className="text-base sm:text-lg font-extrabold text-[color:var(--mm-ink-primary)] leading-relaxed">
                  {currentQ.prompt}
                </p>
              </div>

              {currentQ.part === 'C' ? (
                /* Phần C: Nghị Luận Tư Duy (5đ Chọn lập luận + 5đ Tự trình bày lời giải) */
                <div className="mb-6 space-y-5">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-fuchsia-200">
                      <span>Bước 1 (5 điểm): Chọn lập luận toán học đúng nhất</span>
                      {answers[currentQ.id] && (
                        <span className="text-emerald-300">✓ Đã chọn</span>
                      )}
                    </div>
                    <div className="space-y-2">
                      {currentQ.options.map((opt, oIdx) => {
                        const isSelected = (answers[currentQ.id] || '').trim() === opt.trim();
                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => handleSelectOption(opt)}
                            className={`w-full p-3.5 rounded-2xl border-2 font-bold text-left transition-all flex items-start gap-2.5 cursor-pointer text-xs sm:text-sm leading-relaxed ${
                              isSelected
                                ? 'bg-gradient-to-r from-fuchsia-300/95 via-amber-200/95 to-cyan-300/95 border-white text-slate-950 font-black shadow-[0_0_24px_rgba(232,121,249,0.45)]'
                                : 'bg-[#080E32]/90 border-fuchsia-300/35 text-white hover:border-fuchsia-300 hover:bg-indigo-900/60'
                            }`}
                          >
                            <span
                              className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 mt-0.5 ${
                                isSelected
                                  ? 'bg-slate-950 text-fuchsia-300'
                                  : 'bg-fuchsia-400/20 text-fuchsia-200 border border-fuchsia-300/40'
                              }`}
                            >
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[color:var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-violet-border)_62%,transparent)] space-y-2.5">
                    <div className="flex items-center justify-between gap-2 text-xs font-black uppercase tracking-wider text-[color:var(--mm-violet-text)]">
                      <span>Bước 2 (5 điểm): Tự viết lời giải trình bày</span>
                      {currentReasoningEval && (
                        <span className="text-[11px] font-bold text-[color:var(--mm-cyan-text)] tabular-nums">
                          {(reasoningTexts[currentQ.id] || '').trim().length >= 6
                            ? '✓ Đã trình bày'
                            : 'Cần ít nhất 6 ký tự'}
                        </span>
                      )}
                    </div>
                    {currentQ.reasoningPrompt && (
                      <p className="text-xs font-semibold text-[color:var(--mm-ink-secondary)] leading-relaxed">
                        {currentQ.reasoningPrompt}
                      </p>
                    )}
                    <textarea
                      id={`exam-reason-${currentQ.id}`}
                      rows={4}
                      value={reasoningTexts[currentQ.id] || ''}
                      onChange={(e) =>
                        setReasoningTexts((prev) => ({
                          ...prev,
                          [currentQ.id]: e.target.value,
                        }))
                      }
                      placeholder={
                        currentQ.reasoningPlaceholder ||
                        'Trình bày ngắn gọn các bước tính toán và lập luận của em...'
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[color:var(--mm-canvas)] border-2 border-[color:var(--mm-violet-border)] focus:border-[color:var(--mm-amber-brightFill)] focus:outline-none text-[color:var(--mm-ink-primary)] font-semibold text-sm leading-relaxed placeholder:text-[color:var(--mm-ink-muted)] resize-y"
                    />
                  </div>
                </div>
              ) : (
                <div className="mb-6 p-4 rounded-2xl bg-[color:var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_58%,transparent)] shadow-[inset_0_2px_12px_rgba(0,0,0,0.6)] space-y-2.5">
                  <label htmlFor={`exam-ans-${currentQ.id}`} className="block text-xs font-black uppercase tracking-wider text-[color:var(--mm-cyan-text)]">
                    Nhập câu trả lời của em
                  </label>
                  <div className="flex items-center gap-2.5">
                    <input
                      id={`exam-ans-${currentQ.id}`}
                      type="text"
                      inputMode={currentExamInputSpec.mode === 'text_number' ? 'numeric' : 'text'}
                      value={answers[currentQ.id] || ''}
                      onChange={(e) => handleSelectOption(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && currentIdx < examQuestions.length - 1) {
                          setCurrentIdx((prev) => Math.min(examQuestions.length - 1, prev + 1));
                        }
                      }}
                      placeholder={currentExamInputSpec.mode === 'text_number' ? 'Nhập đáp án...' : 'Nhập câu trả lời...'}
                      className="flex-1 min-w-0 px-4 py-3.5 rounded-xl bg-[color:var(--mm-canvas)] border-2 border-[color:var(--mm-azure-border)] focus:border-[color:var(--mm-amber-brightFill)] focus:shadow-[0_0_20px_rgba(251,191,36,0.28)] focus:outline-none text-[color:var(--mm-ink-primary)] font-black text-xl tabular-nums placeholder:text-[color:var(--mm-ink-muted)] placeholder:text-sm transition-all"
                    />
                    {currentExamInputSpec.mode === 'text_number' && currentExamInputSpec.unitLabel && (
                      <span className="px-4 py-3.5 rounded-xl bg-[color:var(--mm-surface-2)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_62%,transparent)] text-[color:var(--mm-cyan-text)] font-black text-sm shrink-0">
                        {currentExamInputSpec.unitLabel}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1 border border-white/15 cursor-pointer transition-colors duration-200 min-h-[44px]"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  <span>Câu trước</span>
                </button>

                {currentIdx < examQuestions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentIdx((prev) =>
                        Math.min(examQuestions.length - 1, prev + 1)
                      )
                    }
                    className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-1 cursor-pointer transition-all duration-200 min-h-[46px] shadow-[0_8px_24px_rgba(34,211,238,0.35)]"
                  >
                    <span>Câu tiếp theo</span>
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmitExam}
                    className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-300 via-orange-400 to-pink-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-[0_10px_28px_rgba(251,191,36,0.4)] cursor-pointer transition-all duration-200 min-h-[46px]"
                  >
                    <Trophy className="w-4 h-4" aria-hidden="true" />
                    <span>Hoàn Tất &amp; Xem Đánh Giá</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Mode 2: Comprehensive Competency Evaluation Report & Certificate */
        <div className="max-w-6xl mx-auto px-4 mt-6 space-y-6">
          <div role="group" aria-label="Chuyển đổi báo cáo" className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              aria-pressed={activeTab === 'report'}
              onClick={() => setActiveTab('report')}
              className={`px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 cursor-pointer transition-all duration-200 min-h-[44px] ${
                activeTab === 'report'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Award className="w-4 h-4" aria-hidden="true" />
              <span>Báo Cáo Đánh Giá Năng Lực &amp; Chứng Nhận {finalExam.monthLabel}</span>
            </button>
            <button
              type="button"
              aria-pressed={activeTab === 'review'}
              onClick={() => setActiveTab('review')}
              className={`px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 cursor-pointer transition-all duration-200 min-h-[44px] ${
                activeTab === 'review'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>Xem Chi Tiết Đáp Án &amp; Lời Giải {totalQuestions} Câu</span>
            </button>
          </div>

          {activeTab === 'report' ? (
            <>
              {/* Score Summary & Official Certificate Card */}
              <div className="mm-surface-card rounded-3xl p-6 sm:p-8 border-2 border-[color:var(--mm-amber-border)] shadow-2xl relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className={`${hasPartC ? 'lg:col-span-6' : 'lg:col-span-7'} space-y-3`}>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[color:color-mix(in_oklch,var(--mm-amber-tint)_55%,transparent)] border border-[color:var(--mm-amber-border)] text-[color:var(--mm-amber-text)] text-xs font-black uppercase">
                      <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                      <span>Chứng Nhận Hoàn Thành IN MONTH • {finalExam.monthLabel}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[color:var(--mm-ink-primary)]">
                      Chúc mừng {studentName}!
                    </h3>
                    <p className="text-sm text-[color:var(--mm-ink-secondary)] leading-relaxed">
                      Đã hoàn thành chương trình Toán Tư Duy Singapore Lớp 3 <strong>IN MONTH — {finalExam.monthLabel}</strong> ({finalExam.title}).
                    </p>
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r ${rankInfo.badgeColor} font-black text-xs sm:text-sm shadow-md`}
                    >
                      <Award className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Danh hiệu: {rankInfo.rank}</span>
                    </div>
                  </div>

                  <div
                    className={`${
                      hasPartC ? 'lg:col-span-6 grid-cols-2 sm:grid-cols-4' : 'lg:col-span-5 grid-cols-3'
                    } grid gap-3 text-center`}
                  >
                    <div className="p-4 rounded-2xl bg-[color:var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-amber-border)_55%,transparent)]">
                      <div className="text-xs text-[color:var(--mm-ink-secondary)] font-bold">Tổng Điểm</div>
                      <div className="text-3xl font-extrabold font-display text-[color:var(--mm-amber-text)] mt-1 tabular-nums">
                        {totalScore}
                        <span className="text-sm font-sans text-[color:var(--mm-ink-muted)]">/100</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-[color:var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_55%,transparent)]">
                      <div className="text-xs text-[color:var(--mm-cyan-text)] font-bold">Cơ Bản</div>
                      <div className="text-2xl font-extrabold font-display text-[color:var(--mm-ink-primary)] mt-1 tabular-nums">
                        {basicScore}
                        <span className="text-xs font-sans text-[color:var(--mm-ink-muted)]">/{partAMax}</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-[color:var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-amber-border)_55%,transparent)]">
                      <div className="text-xs text-[color:var(--mm-amber-text)] font-bold">Olympic</div>
                      <div className="text-2xl font-extrabold font-display text-[color:var(--mm-ink-primary)] mt-1 tabular-nums">
                        {olympiadScore}
                        <span className="text-xs font-sans text-[color:var(--mm-ink-muted)]">/{partBMax}</span>
                      </div>
                    </div>
                    {hasPartC && (
                      <div className="p-4 rounded-2xl bg-[color:var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-violet-border)_55%,transparent)]">
                        <div className="text-xs text-[color:var(--mm-violet-text)] font-bold">Nghị Luận</div>
                        <div className="text-2xl font-extrabold font-display text-[color:var(--mm-ink-primary)] mt-1 tabular-nums">
                          {reasoningScore}
                          <span className="text-xs font-sans text-[color:var(--mm-ink-muted)]">/{partCMax}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 4-Pillar Competency Breakdown */}
              <div className="mm-surface-card backdrop-blur-xl rounded-3xl p-6 shadow-xl border">
                <h4 className="text-lg sm:text-xl font-extrabold font-display text-[color:var(--mm-ink-primary)] mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[color:var(--mm-cyan-accent)]" aria-hidden="true" />
                  <span>Đánh Giá Chi Tiết Theo 4 Trụ Cột Năng Lực {finalExam.monthLabel}</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(monthNumber === 12
                    ? (['interval', 'bar_model', 'remainder', 'measurement'] as InMonthSkillDomain[])
                    : monthNumber === 1
                    ? (['measurement', 'interval', 'bar_model', 'remainder'] as InMonthSkillDomain[])
                    : (['bar_model', 'remainder', 'interval', 'measurement'] as InMonthSkillDomain[])
                  ).map((pillarKey) => {
                    const meta = (
                      monthNumber === 12
                        ? DECEMBER_PILLAR_META
                        : monthNumber === 1
                        ? JANUARY_PILLAR_META
                        : DEFAULT_PILLAR_META
                    )[pillarKey];
                    const stats = getPillarStats(pillarKey);
                    const isStrong = stats.pct >= 80;

                    return (
                      <div
                        key={pillarKey}
                        className="p-5 rounded-2xl border border-[color:color-mix(in_oklch,var(--mm-azure-border)_45%,transparent)] bg-[color:var(--mm-surface-inset)] flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="font-black text-sm text-[color:var(--mm-ink-primary)]">
                              {meta.title}
                            </span>
                            <span
                              className={`px-2.5 py-0.5 rounded-lg font-black text-xs tabular-nums ${
                                isStrong
                                  ? 'bg-[color:color-mix(in_oklch,var(--mm-emerald-tint)_60%,transparent)] text-[color:var(--mm-emerald-text)] border border-[color:var(--mm-emerald-border)]'
                                  : 'bg-[color:color-mix(in_oklch,var(--mm-amber-tint)_55%,transparent)] text-[color:var(--mm-amber-text)] border border-[color:var(--mm-amber-border)]'
                              }`}
                            >
                              {stats.correct}/{stats.total} câu ({stats.pct}%)
                            </span>
                          </div>

                          <div className="w-full h-3 bg-[color:var(--mm-canvas)] rounded-full overflow-hidden mb-3 border border-white/10">
                            <div
                              style={{
                                width: `${stats.pct}%`,
                                backgroundColor: meta.color,
                              }}
                              className="h-full rounded-full transition-all duration-500"
                            />
                          </div>

                          <p className="text-xs text-[color:var(--mm-ink-secondary)] leading-relaxed mb-4 flex items-start gap-1.5">
                            {isStrong ? (
                              <CheckCircle2 className="w-4 h-4 text-[color:var(--mm-emerald-accent)] shrink-0 mt-0.5" aria-hidden="true" />
                            ) : (
                              <Lightbulb className="w-4 h-4 text-[color:var(--mm-amber-accent)] shrink-0 mt-0.5" aria-hidden="true" />
                            )}
                            <span>{isStrong ? meta.strongComment : meta.improveComment}</span>
                          </p>
                        </div>

                        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[11px] font-bold text-[color:var(--mm-ink-muted)] flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-[color:var(--mm-cyan-accent)]" aria-hidden="true" />
                            {unitLabel} ôn tập gợi ý:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {meta.reviewDays.map((d) => (
                              <button
                                key={d}
                                type="button"
                                onClick={() => onJumpToDay(d)}
                                className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-[color:var(--mm-cyan-brightFill)] text-[color:var(--mm-cyan-text)] hover:text-[#05081D] font-black text-xs border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_55%,transparent)] transition-colors duration-200 cursor-pointer tabular-nums min-h-[34px]"
                              >
                                {unitLabel} {d}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="mm-surface-card backdrop-blur-xl rounded-3xl p-6 shadow-xl border space-y-4">
              <h4 className="text-lg sm:text-xl font-extrabold font-display text-[color:var(--mm-ink-primary)] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[color:var(--mm-cyan-accent)]" aria-hidden="true" />
                <span>Chi Tiết Đáp Án &amp; Giải Thích {totalQuestions} Câu Đề Thi {finalExam.monthLabel}</span>
              </h4>
              <div className="space-y-3">
                {examQuestions.map((q, idx) => {
                  const userAns = (answers[q.id] || '').trim();
                  const correct = isQuestionMastered(q);
                  const reasoningText = (reasoningTexts[q.id] || '').trim();
                  const reasoningEval =
                    q.part === 'C'
                      ? evaluateWeeklyReasoningText(reasoningText, q.reasoningKeywords)
                      : null;
                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-2xl border ${
                        correct
                          ? 'bg-[color:color-mix(in_oklch,var(--mm-emerald-tint)_38%,transparent)] border-[color:var(--mm-emerald-border)]'
                          : 'bg-[color:color-mix(in_oklch,var(--mm-rose-tint)_38%,transparent)] border-[color:var(--mm-rose-border)]'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <span className="font-black text-xs uppercase text-[color:var(--mm-cyan-text)]">
                          Câu {idx + 1} (
                          {q.part === 'A'
                            ? 'Phần A - Cơ Bản'
                            : q.part === 'B'
                            ? 'Phần B - Olympic'
                            : 'Phần C - Nghị Luận'}
                          )
                        </span>
                        <div className="flex flex-wrap items-center gap-2 text-xs font-bold tabular-nums">
                          <span className="text-[color:var(--mm-ink-secondary)]">
                            Bài làm: <strong className="text-[color:var(--mm-ink-primary)]">{userAns || 'Chưa trả lời'}</strong>
                          </span>
                          <span className="text-[color:var(--mm-ink-muted)]">•</span>
                          <span className="text-[color:var(--mm-emerald-text)]">
                            Đáp án đúng: <strong>{q.correctAnswer}</strong>
                          </span>
                          {correct ? (
                            <CheckCircle2 className="w-4 h-4 text-[color:var(--mm-emerald-accent)]" aria-hidden="true" />
                          ) : (
                            <XCircle className="w-4 h-4 text-[color:var(--mm-rose-accent)]" aria-hidden="true" />
                          )}
                        </div>
                      </div>
                      <p className="text-sm font-bold text-[color:var(--mm-ink-primary)] mb-2">{q.prompt}</p>
                      {q.part === 'C' && (
                        <div className="mb-2 space-y-2">
                          <div className="text-xs bg-[color:var(--mm-surface-inset)] p-3 rounded-xl border border-[color:color-mix(in_oklch,var(--mm-violet-border)_45%,transparent)] text-[color:var(--mm-ink-secondary)]">
                            <strong className="text-[color:var(--mm-violet-text)]">
                              Lời giải em đã trình bày ({reasoningEval?.points ?? 0}/5đ):
                            </strong>{' '}
                            {reasoningText || 'Chưa viết lời giải trình bày.'}
                          </div>
                          {q.reasoningSampleAnswer && (
                            <div className="text-xs bg-[color:color-mix(in_oklch,var(--mm-violet-tint)_38%,transparent)] p-3 rounded-xl border border-[color:var(--mm-violet-border)] text-[color:var(--mm-ink-primary)]">
                              <strong className="text-[color:var(--mm-violet-text)]">Lời giải nghị luận mẫu:</strong>{' '}
                              {q.reasoningSampleAnswer}
                            </div>
                          )}
                        </div>
                      )}
                      <p className="text-xs text-[color:var(--mm-ink-secondary)] bg-[color:var(--mm-surface-inset)] p-3 rounded-xl border border-white/10 flex items-start gap-1.5">
                        <Lightbulb className="w-4 h-4 text-[color:var(--mm-amber-accent)] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>
                          <strong>Giải thích:</strong> {q.explanation}
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

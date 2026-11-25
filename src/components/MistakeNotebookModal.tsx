import React, { useState, useEffect } from 'react';
import {
  X,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sparkles,
  Trash2,
  Plus,
  Send,
  HelpCircle,
  Lightbulb,
  ExternalLink,
  Edit2,
  Check,
  Award,
  Filter,
  Brain,
  Sliders
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';
import {
  CollectedMistake,
  getMistakes,
  markMistakeMastered,
  reopenMistake,
  updateMistakeNote,
  deleteMistake,
  clearMasteredMistakes,
  recordMistake,
  reportBug,
  getReportedBugs,
  ReportedBug
} from '../utils/mistakeManager';

interface MistakeNotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson?: (lessonId: string) => void;
  currentLessonId?: string | null;
  isFullPageTab?: boolean;
  onOpenMethodology?: () => void;
}

export const MistakeNotebookModal: React.FC<MistakeNotebookModalProps> = ({
  isOpen,
  onClose,
  onSelectLesson,
  currentLessonId,
  isFullPageTab = false,
  onOpenMethodology
}) => {
  const [mistakes, setMistakes] = useState<CollectedMistake[]>([]);
  const [bugs, setBugs] = useState<ReportedBug[]>([]);
  const [activeSubTab, setActiveSubTab] = useState<'notebook' | 'report' | 'add' | 'methodology'>('notebook');
  const [filterStatus, setFilterStatus] = useState<'all' | 'unresolved' | 'mastered'>('all');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState('');

  // Retake direct typed answers state
  const [retakeInputs, setRetakeInputs] = useState<Record<string, string>>({});
  const [retakeFeedback, setRetakeFeedback] = useState<Record<string, 'correct' | 'wrong' | null>>({});

  // Manual Add Mistake Form
  const [newPrompt, setNewPrompt] = useState('');
  const [newUserAnswer, setNewUserAnswer] = useState('');
  const [newCorrectAnswer, setNewCorrectAnswer] = useState('');
  const [newExplanation, setNewExplanation] = useState('');
  const [newNote, setNewNote] = useState('');
  const [newCategory, setNewCategory] = useState<'concept' | 'calculation' | 'reading' | 'other'>('concept');

  // Bug Report Form
  const [bugCategory, setBugCategory] = useState<'typo' | 'logic_error' | 'display' | 'other'>('logic_error');
  const [bugDescription, setBugDescription] = useState('');
  const [bugSuccess, setBugSuccess] = useState(false);

  const loadData = () => {
    setMistakes(getMistakes());
    setBugs(getReportedBugs());
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleUpdate = () => loadData();
    window.addEventListener('spark_math_mistakes_updated', handleUpdate);
    return () => window.removeEventListener('spark_math_mistakes_updated', handleUpdate);
  }, []);

  const getThinkingGuidance = (m: CollectedMistake): string => {
    const prompt = (m.questionPrompt || '').toLowerCase();
    const topic = (m.topicName || '').toLowerCase();

    if (topic.includes('lít') || topic.includes('thể tích') || prompt.includes('lít') || prompt.includes('bình') || prompt.includes('bể')) {
      return '🤔 Gợi mở tư duy: Quan sát lượng nước so với sức chứa của bình gợi cho em điều gì? Khi dịch chuyển nước giữa các bình, tổng thể tích có giữ nguyên không?';
    }
    if (topic.includes('hàng ngũ') || prompt.includes('hàng') || prompt.includes('đứng thứ') || prompt.includes('đầu hàng')) {
      return '🤔 Gợi mở tư duy: Em hãy phác thảo sơ đồ các vị trí: Bạn ở vị trí đặc biệt đang được quan sát theo những hướng nào trong hàng?';
    }
    if (topic.includes('biểu đồ') || prompt.includes('biểu đồ') || prompt.includes('quy ước')) {
      return '🤔 Gợi mở tư duy: Mỗi biểu tượng trên biểu đồ phản ánh điều gì theo quy ước? Mối tương quan giữa hình vẽ và giá trị thực tế là gì?';
    }
    if (topic.includes('sudoku') || prompt.includes('ô trống')) {
      return '🤔 Gợi mở tư duy: Khu vực nào (hàng, cột hay khối) có nhiều thông tin nhất để suy luận trước? Quy tắc không trùng lặp giúp em loại trừ được gì?';
    }
    if (topic.includes('khối') || prompt.includes('lập phương') || prompt.includes('tầng')) {
      return '🤔 Gợi mở tư duy: Khi phân tích mô hình 3D, có những khối nào bị che khuất nhưng bắt buộc phải có để nâng đỡ các tầng phía trên?';
    }
    if (topic.includes('cân') || prompt.includes('thăng bằng')) {
      return '🤔 Gợi mở tư duy: Trạng thái thăng bằng của đĩa cân nói lên điều gì về mối tương quan giữa các vật thể? Em có thể liên hệ giữa các đĩa cân ra sao?';
    }
    return '🤔 Gợi mở tư duy: Em hãy đọc kỹ câu hỏi, xác định mối liên hệ cốt lõi giữa các dữ kiện và suy ngẫm: Điều gì thay đổi và điều gì giữ nguyên?';
  };

  if (!isOpen) return null;

  const total = mistakes.length;
  const unresolvedCount = mistakes.filter((m) => m.status === 'unresolved').length;
  const masteredCount = mistakes.filter((m) => m.status === 'mastered').length;
  const masteryRate = total > 0 ? Math.round((masteredCount / total) * 100) : 100;

  const filteredMistakes = mistakes.filter((m) => {
    if (filterStatus === 'unresolved') return m.status === 'unresolved';
    if (filterStatus === 'mastered') return m.status === 'mastered';
    return true;
  });

  const handleToggleMastery = (m: CollectedMistake) => {
    sound.playClick();
    if (m.status === 'unresolved') {
      markMistakeMastered(m.id);
      sound.playVictory();
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    } else {
      reopenMistake(m.id);
    }
  };

  const handleDelete = (id: string) => {
    sound.playClick();
    deleteMistake(id);
  };

  const handleSaveNote = (id: string) => {
    sound.playClick();
    updateMistakeNote(id, tempNote);
    setEditingNoteId(null);
  };

  const handleRetakeSubmit = (m: CollectedMistake) => {
    sound.playClick();
    const entered = (retakeInputs[m.id] || '').trim().toLowerCase();
    if (!entered) return;

    const target = (m.correctAnswer || '').trim().toLowerCase();
    const enteredDigits = entered.replace(/\D/g, '');
    const targetDigits = target.replace(/\D/g, '');

    const isCorrect =
      (enteredDigits && targetDigits && enteredDigits === targetDigits) ||
      entered === target ||
      target.includes(entered) ||
      entered.includes(target);

    if (isCorrect) {
      sound.playCorrect();
      setRetakeFeedback((prev) => ({ ...prev, [m.id]: 'correct' }));
      markMistakeMastered(m.id);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } else {
      sound.playWrong();
      setRetakeFeedback((prev) => ({ ...prev, [m.id]: 'wrong' }));
    }
  };

  const handleCreateManualMistake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrompt.trim() || !newCorrectAnswer.trim()) return;

    sound.playStarCollect();
    recordMistake({
      questionPrompt: newPrompt.trim(),
      userAnswer: newUserAnswer.trim() || 'Chưa làm đúng',
      correctAnswer: newCorrectAnswer.trim(),
      explanation: newExplanation.trim() || 'Cần đọc kỹ đề và phân tích từng bước.',
      userNote: newNote.trim(),
      category: newCategory,
      lessonTitle: 'Tự thu thập câu hỏi khó',
      topicName: 'Luyện tập cá nhân'
    });

    setNewPrompt('');
    setNewUserAnswer('');
    setNewCorrectAnswer('');
    setNewExplanation('');
    setNewNote('');
    setActiveSubTab('notebook');
  };

  const handleSubmitBug = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bugDescription.trim()) return;

    sound.playVictory();
    reportBug({
      category: bugCategory,
      description: bugDescription.trim(),
      lessonId: currentLessonId || undefined,
      lessonTitle: currentLessonId ? `Bài học ${currentLessonId}` : 'Ứng dụng chung'
    });

    setBugDescription('');
    setBugSuccess(true);
    setBugs(getReportedBugs());
    setTimeout(() => setBugSuccess(false), 3000);
  };

  const content = (
    <div
      className={`relative bg-[radial-gradient(ellipse_at_top_right,_rgba(56,189,248,0.2),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(168,85,247,0.18),_transparent_55%),linear-gradient(160deg,_rgba(15,24,68,0.98),_rgba(7,12,38,0.99))] rounded-3xl shadow-[0_28px_70px_rgba(3,7,24,0.88),0_0_42px_rgba(34,211,238,0.18)] border border-cyan-300/45 text-white w-full flex flex-col overflow-hidden animate-in fade-in duration-200 ${
        isFullPageTab ? 'max-w-5xl mx-auto' : 'max-w-4xl max-h-[92vh]'
      }`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-8 h-[2.5px] rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-400 shadow-[0_0_16px_rgba(34,211,238,0.7)]"
      />

      {/* Header */}
      <div className="bg-[#060B24]/90 border-b border-cyan-300/25 px-6 py-4.5 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400/25 via-sky-400/20 to-fuchsia-400/25 border border-cyan-300/40 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(34,211,238,0.25)] shrink-0">
            📖
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-xl md:text-2xl font-black font-display text-white tracking-tight">
                Sổ Thu Thập Lỗi Sai &amp; Ôn Luyện
              </h2>
              {unresolvedCount > 0 && (
                <span className="bg-rose-500/25 text-rose-200 border border-rose-400/50 font-extrabold text-xs px-2.5 py-0.5 rounded-full shadow-[0_0_12px_rgba(244,63,94,0.3)] tabular-nums">
                  {unresolvedCount} cần ôn
                </span>
              )}
            </div>
            <p className="text-xs md:text-sm text-cyan-100/80 font-medium mt-0.5">
              Mỗi sai sót là một bậc thang tiến bộ · Thu thập, phân tích và làm chủ kiến thức!
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-xl bg-white/[0.08] hover:bg-cyan-400/20 border border-white/15 hover:border-cyan-300/60 hover:shadow-[0_0_16px_rgba(34,211,238,0.35)] transition-all text-white"
          title="Đóng sổ"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="bg-[#091238]/90 border-b border-cyan-300/20 px-6 py-3 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveSubTab('notebook');
            }}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs md:text-sm font-bold border transition-all ${
              activeSubTab === 'notebook'
                ? 'bg-gradient-to-r from-cyan-400/25 to-sky-400/20 border-cyan-300/60 text-cyan-100 shadow-[0_0_16px_rgba(34,211,238,0.28)]'
                : 'bg-white/[0.05] text-slate-300 hover:text-white hover:bg-white/[0.1] border-white/10 hover:border-cyan-300/35'
            }`}
          >
            <BookOpen className="w-4 h-4 text-cyan-300" />
            <span className="tabular-nums">Danh Sách Lỗi Thu Thập ({total})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveSubTab('add');
            }}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold border transition-all ${
              activeSubTab === 'add'
                ? 'bg-gradient-to-r from-cyan-400/25 to-sky-400/20 border-cyan-300/60 text-cyan-100 shadow-[0_0_16px_rgba(34,211,238,0.28)]'
                : 'bg-white/[0.05] text-slate-300 hover:text-white hover:bg-white/[0.1] border-white/10 hover:border-cyan-300/35'
            }`}
          >
            <Plus className="w-4 h-4 text-sky-300" />
            <span>Tự Thêm Câu Khó</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveSubTab('report');
            }}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold border transition-all ${
              activeSubTab === 'report'
                ? 'bg-gradient-to-r from-rose-500/30 to-fuchsia-500/20 border-rose-400/60 text-rose-100 shadow-[0_0_16px_rgba(244,63,94,0.28)]'
                : 'bg-white/[0.05] text-slate-300 hover:text-white hover:bg-white/[0.1] border-white/10 hover:border-rose-400/40'
            }`}
          >
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span className="tabular-nums">Báo Lỗi Đề Bài ({bugs.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveSubTab('methodology');
            }}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold border transition-all ${
              activeSubTab === 'methodology'
                ? 'bg-gradient-to-r from-amber-400/25 to-fuchsia-400/20 border-amber-300/60 text-amber-100 shadow-[0_0_16px_rgba(251,191,36,0.28)]'
                : 'bg-white/[0.05] text-slate-300 hover:text-white hover:bg-white/[0.1] border-white/10 hover:border-amber-300/40'
            }`}
          >
            <Brain className="w-4 h-4 text-amber-300" />
            <span>Kiểm Tra Định Kỳ</span>
            <span className="bg-amber-400/20 text-amber-200 border border-amber-300/40 text-[9px] font-black px-1.5 py-0.5 rounded-full">
              MÔ HÌNH
            </span>
          </button>
        </div>

        {activeSubTab === 'notebook' && masteredCount > 0 && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Bạn có chắc muốn xóa tất cả câu đã khắc phục thành công?')) {
                sound.playClick();
                clearMasteredMistakes();
              }
            }}
            className="text-xs text-slate-300 hover:text-cyan-200 font-semibold underline underline-offset-4 transition-colors"
          >
            Dọn dẹp câu đã thành thạo
          </button>
        )}
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {activeSubTab === 'notebook' && (
          <>
            {/* Stats KPI Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#070D28]/90 border border-cyan-300/30 rounded-2xl p-3.5 text-center shadow-[0_0_16px_rgba(34,211,238,0.1)]">
                <span className="text-xs font-bold text-slate-300 block">Tổng câu thu thập</span>
                <span className="text-2xl font-black text-cyan-300 mt-0.5 block tabular-nums">{total}</span>
              </div>
              <div className="bg-[#070D28]/90 border border-rose-400/35 rounded-2xl p-3.5 text-center shadow-[0_0_16px_rgba(244,63,94,0.1)]">
                <span className="text-xs font-bold text-slate-300 block">Cần ôn luyện</span>
                <span className="text-2xl font-black text-rose-300 mt-0.5 block tabular-nums">{unresolvedCount}</span>
              </div>
              <div className="bg-[#070D28]/90 border border-emerald-400/35 rounded-2xl p-3.5 text-center shadow-[0_0_16px_rgba(52,211,153,0.1)]">
                <span className="text-xs font-bold text-slate-300 block">Đã nắm vững</span>
                <span className="text-2xl font-black text-emerald-300 mt-0.5 block tabular-nums">{masteredCount}</span>
              </div>
              <div className="bg-[#070D28]/90 border border-indigo-400/35 rounded-2xl p-3.5 text-center shadow-[0_0_16px_rgba(129,140,248,0.12)]">
                <span className="text-xs font-bold text-slate-300 block">Tỉ lệ sửa sai</span>
                <span className="text-2xl font-black text-fuchsia-300 mt-0.5 block tabular-nums">{masteryRate}%</span>
              </div>
            </div>

            {/* Filter Row */}
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-cyan-300/15 pb-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 flex-wrap">
                <Filter className="w-3.5 h-3.5 text-cyan-300" />
                <span>Bộ lọc:</span>
                <button
                  type="button"
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-1 rounded-full border transition-all tabular-nums ${
                    filterStatus === 'all'
                      ? 'bg-cyan-400/25 border-cyan-300/60 text-cyan-100 shadow-[0_0_12px_rgba(34,211,238,0.25)]'
                      : 'bg-white/[0.05] border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.1]'
                  }`}
                >
                  Tất cả ({total})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterStatus('unresolved')}
                  className={`px-3 py-1 rounded-full border transition-all tabular-nums ${
                    filterStatus === 'unresolved'
                      ? 'bg-rose-500/30 border-rose-400/60 text-rose-100 shadow-[0_0_12px_rgba(244,63,94,0.25)]'
                      : 'bg-white/[0.05] border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.1]'
                  }`}
                >
                  Cần ôn ({unresolvedCount})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterStatus('mastered')}
                  className={`px-3 py-1 rounded-full border transition-all tabular-nums ${
                    filterStatus === 'mastered'
                      ? 'bg-emerald-500/30 border-emerald-400/60 text-emerald-100 shadow-[0_0_12px_rgba(52,211,153,0.25)]'
                      : 'bg-white/[0.05] border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.1]'
                  }`}
                >
                  Đã nắm vững ({masteredCount})
                </button>
              </div>

              <span className="text-xs text-cyan-200/75 italic">
                💡 Mẹo: Tự nhập đáp án đúng vào ô thử thách để làm chủ ngay!
              </span>
            </div>

            {/* Mistakes List */}
            {filteredMistakes.length === 0 ? (
              <div className="text-center py-12 px-4 bg-[#070D28]/80 rounded-3xl border border-dashed border-cyan-300/30">
                <span className="text-5xl block mb-3">🎉</span>
                <h3 className="text-lg font-bold text-white">Không có câu sai nào trong mục này!</h3>
                <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-md mx-auto">
                  {filterStatus === 'unresolved'
                    ? 'Tuyệt vời! Bé đã khắc phục hết tất cả các câu khó trong sổ tay!'
                    : 'Khi làm bài tập nếu gặp câu khó hoặc bấm nhầm đáp án, câu hỏi sẽ tự động được thu thập về đây.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMistakes.map((m) => {
                  const isMastered = m.status === 'mastered';
                  const feedback = retakeFeedback[m.id];

                  return (
                    <div
                      key={m.id}
                      className={`rounded-3xl border transition-all p-5 ${
                        isMastered
                          ? 'bg-emerald-500/10 border-emerald-400/40 shadow-[0_0_20px_rgba(52,211,153,0.12)]'
                          : 'bg-[#070D28]/90 border-cyan-300/30 hover:border-cyan-300/55 shadow-[0_12px_30px_rgba(3,7,24,0.45)]'
                      }`}
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="text-2xl">{m.mascotAvatar || '🐰'}</span>
                          <span className="text-xs font-bold bg-cyan-400/15 text-cyan-200 border border-cyan-300/35 px-2.5 py-0.5 rounded-full">
                            {m.topicName}
                          </span>
                          <span className="text-xs font-semibold text-slate-300">
                            {m.lessonTitle}
                          </span>
                          {m.attemptsCount > 1 && (
                            <span className="text-[11px] font-bold text-slate-300 bg-white/[0.08] border border-white/10 px-2 py-0.5 rounded-full tabular-nums">
                              Đã thử {m.attemptsCount} lần
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleToggleMastery(m)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                              isMastered
                                ? 'bg-emerald-500/25 border-emerald-300/60 text-emerald-100 shadow-[0_0_14px_rgba(52,211,153,0.28)]'
                                : 'bg-amber-400/15 border-amber-300/40 text-amber-200 hover:bg-emerald-500/25 hover:border-emerald-300/60 hover:text-emerald-100'
                            }`}
                          >
                            {isMastered ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Đã nắm vững ⭐</span>
                              </>
                            ) : (
                              <>
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Cần ôn lại</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(m.id)}
                            className="text-slate-400 hover:text-rose-300 p-1.5 rounded-lg hover:bg-rose-500/15 transition-colors"
                            title="Xóa khỏi sổ"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Question Prompt */}
                      <div className="mt-3.5">
                        <p className="text-base md:text-lg font-bold text-white leading-relaxed">
                          {m.questionPrompt}
                        </p>
                      </div>

                      {/* Student's previous mistake record */}
                      <div className="bg-rose-500/12 border border-rose-400/35 rounded-2xl p-3 mt-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1">
                          <span>❌</span> Câu trả lời chưa chính xác trước đây:
                        </span>
                        <p className="text-sm font-bold text-rose-100 mt-1">
                          {m.userAnswer}
                        </p>
                      </div>

                      {/* Spark Math Pedagogical Thinking Guidance (No spoilers) */}
                      <div className="mt-3 bg-cyan-500/10 border border-cyan-300/30 rounded-2xl p-3.5 flex items-start gap-2.5">
                        <Lightbulb className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                        <div className="text-xs md:text-sm text-cyan-50 font-medium leading-relaxed">
                          <span className="font-extrabold text-amber-200 block mb-1">
                            💡 Gợi ý tự tư duy (Không đưa sẵn lời giải):
                          </span>
                          {getThinkingGuidance(m)}
                        </div>
                      </div>

                      {/* Interactive In-Place Direct Typed Retake Section */}
                      <div className="mt-4 bg-[#050A1F]/90 border border-cyan-300/25 rounded-2xl p-4 space-y-2.5">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="text-xs font-black text-cyan-200 uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                            Thử thách tự tay nhập đáp án đúng:
                          </span>
                          {feedback === 'correct' && (
                            <span className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                              <Check className="w-4 h-4" /> Chính xác tuyệt đối! Đã làm chủ bài toán ⭐
                            </span>
                          )}
                          {feedback === 'wrong' && (
                            <span className="text-xs font-bold text-rose-300 flex items-center gap-1">
                              Chưa chính xác, em hãy suy ngẫm theo gợi ý tự tư duy nhé!
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={retakeInputs[m.id] || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setRetakeInputs((prev) => ({ ...prev, [m.id]: val }));
                              if (retakeFeedback[m.id] === 'wrong') {
                                setRetakeFeedback((prev) => ({ ...prev, [m.id]: null }));
                              }
                            }}
                            onKeyDown={(e) => e.key === 'Enter' && handleRetakeSubmit(m)}
                            placeholder="Tự tay gõ câu trả lời của em vào đây..."
                            disabled={isMastered && feedback === 'correct'}
                            className="flex-1 px-4 py-2.5 rounded-xl bg-[#050A1F] border border-cyan-300/35 text-sm font-bold text-white placeholder:text-slate-500 focus:border-cyan-300 focus:outline-none disabled:opacity-60"
                          />
                          <button
                            type="button"
                            onClick={() => handleRetakeSubmit(m)}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 hover:brightness-110 text-slate-950 font-black text-xs shadow-[0_0_20px_rgba(34,211,238,0.35)] transition-all active:scale-95 shrink-0"
                          >
                            Kiểm tra
                          </button>
                        </div>
                      </div>

                      {/* User Personal Notes */}
                      <div className="mt-3 pt-3 border-t border-cyan-300/15 flex items-center justify-between flex-wrap gap-2 text-xs">
                        {editingNoteId === m.id ? (
                          <div className="flex items-center gap-2 w-full">
                            <input
                              type="text"
                              value={tempNote}
                              onChange={(e) => setTempNote(e.target.value)}
                              placeholder="Ghi chú mẹo nhớ của riêng em..."
                              className="flex-1 px-3 py-1.5 rounded-xl bg-[#050A1F] border border-cyan-300/40 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-300"
                            />
                            <button
                              type="button"
                              onClick={() => handleSaveNote(m.id)}
                              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-300 to-sky-300 text-slate-950 font-black"
                            >
                              Lưu
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingNoteId(null)}
                              className="px-2 py-1.5 text-slate-300 hover:text-white"
                            >
                              Hủy
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-400">Mẹo của em:</span>
                            <span className="text-slate-200 italic">
                              {m.userNote || 'Chưa có ghi chú'}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingNoteId(m.id);
                                setTempNote(m.userNote || '');
                              }}
                              className="text-cyan-300 hover:text-cyan-200 hover:underline inline-flex items-center gap-0.5 ml-1"
                            >
                              <Edit2 className="w-3 h-3" /> Sửa
                            </button>
                          </div>
                        )}

                        {onSelectLesson && m.lessonId && (
                          <button
                            type="button"
                            onClick={() => {
                              sound.playClick();
                              onClose();
                              onSelectLesson(m.lessonId);
                            }}
                            className="inline-flex items-center gap-1 font-bold text-cyan-300 hover:text-cyan-200 transition-colors ml-auto"
                          >
                            <span>Vào làm lại bài này</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* SubTab 2: Manual Add Mistake Form */}
        {activeSubTab === 'add' && (
          <div className="bg-[#070D28]/90 rounded-3xl border border-cyan-300/35 p-6 shadow-[0_16px_38px_rgba(3,7,24,0.6)] max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/15 border border-cyan-300/35 flex items-center justify-center text-xl shrink-0">
                📝
              </div>
              <div>
                <h3 className="text-lg font-black text-white">
                  Thêm bài toán khó hoặc lỗi cần ghi nhớ
                </h3>
                <p className="text-xs text-slate-300">
                  Bé có thể chủ động lưu lại các câu hỏi hóc búa để ôn luyện trước kỳ thi!
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateManualMistake} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-cyan-200 uppercase tracking-wider mb-1">
                  Đề bài / Câu hỏi khó *
                </label>
                <textarea
                  required
                  value={newPrompt}
                  onChange={(e) => setNewPrompt(e.target.value)}
                  rows={2}
                  placeholder="Ví dụ: Tính tổng số lít nước khi đổ 3 bình 5L vào bể 20L..."
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#050A1F] border border-cyan-300/35 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-cyan-200 uppercase tracking-wider mb-1">
                    Câu trả lời dễ nhầm (Lỗi sai)
                  </label>
                  <input
                    type="text"
                    value={newUserAnswer}
                    onChange={(e) => setNewUserAnswer(e.target.value)}
                    placeholder="Ví dụ: 15 lít (quên trừ dung tích bể)"
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#050A1F] border border-cyan-300/35 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-cyan-200 uppercase tracking-wider mb-1">
                    Đáp án đúng chuẩn *
                  </label>
                  <input
                    required
                    type="text"
                    value={newCorrectAnswer}
                    onChange={(e) => setNewCorrectAnswer(e.target.value)}
                    placeholder="Ví dụ: Bể còn thiếu 5 lít nữa mới đầy"
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#050A1F] border border-cyan-300/35 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-cyan-200 uppercase tracking-wider mb-1">
                  Bí kíp tư duy / Giải thích
                </label>
                <textarea
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  rows={2}
                  placeholder="Giải thích vì sao cần làm như vậy..."
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#050A1F] border border-cyan-300/35 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-cyan-200 uppercase tracking-wider mb-1">
                    Phân loại lỗi
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#050A1F] border border-cyan-300/35 text-sm text-white focus:border-cyan-300 focus:outline-none"
                  >
                    <option value="concept" className="bg-[#050A1F] text-white">Khái niệm &amp; Bản chất</option>
                    <option value="calculation" className="bg-[#050A1F] text-white">Tính toán số học</option>
                    <option value="reading" className="bg-[#050A1F] text-white">Đọc hiểu &amp; Quy ước</option>
                    <option value="other" className="bg-[#050A1F] text-white">Bẫy tư duy khác</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-cyan-200 uppercase tracking-wider mb-1">
                    Mẹo của em
                  </label>
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Lời nhắc nhở bản thân..."
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#050A1F] border border-cyan-300/35 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveSubTab('notebook')}
                  className="px-5 py-2.5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-sm font-bold text-slate-200 transition-colors"
                >
                  Quay lại
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 hover:brightness-110 text-slate-950 font-black text-sm shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all active:scale-95"
                >
                  Lưu vào Sổ Lỗi
                </button>
              </div>
            </form>
          </div>
        )}

        {/* SubTab 3: Report Bug Form */}
        {activeSubTab === 'report' && (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="bg-[#070D28]/90 rounded-3xl border border-rose-400/35 p-6 shadow-[0_16px_38px_rgba(3,7,24,0.6)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-400/35 flex items-center justify-center text-xl shrink-0">
                  🐞
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">
                    Báo cáo lỗi đề bài hoặc lỗi hiển thị
                  </h3>
                  <p className="text-xs text-slate-300">
                    Nếu bé phát hiện lỗi chính tả, sai đáp án đề thi hoặc trục trặc giao diện, hãy gửi cho chúng mình nhé!
                  </p>
                </div>
              </div>

              {bugSuccess && (
                <div className="mb-4 p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-400/45 text-emerald-100 text-xs md:text-sm font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                  Cảm ơn bạn! Đã ghi nhận báo cáo lỗi thành công!
                </div>
              )}

              <form onSubmit={handleSubmitBug} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-rose-200 uppercase tracking-wider mb-1">
                    Loại lỗi gặp phải
                  </label>
                  <select
                    value={bugCategory}
                    onChange={(e) => setBugCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#050A1F] border border-rose-400/35 text-sm text-white focus:border-rose-400 focus:outline-none"
                  >
                    <option value="logic_error" className="bg-[#050A1F] text-white">Lỗi logic / Đáp án đề bài bị sai</option>
                    <option value="typo" className="bg-[#050A1F] text-white">Lỗi chính tả / câu từ khó hiểu</option>
                    <option value="display" className="bg-[#050A1F] text-white">Lỗi hiển thị / giao diện bị lệch</option>
                    <option value="other" className="bg-[#050A1F] text-white">Ý kiến đóng góp khác</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-rose-200 uppercase tracking-wider mb-1">
                    Mô tả chi tiết lỗi *
                  </label>
                  <textarea
                    required
                    value={bugDescription}
                    onChange={(e) => setBugDescription(e.target.value)}
                    rows={3}
                    placeholder="Mô tả cụ thể ở bài nào, hiện tượng gì xảy ra để đội ngũ sửa chữa..."
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#050A1F] border border-rose-400/35 text-sm text-white placeholder:text-slate-500 focus:border-rose-400 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-fuchsia-500 hover:brightness-110 text-white font-black text-sm shadow-[0_0_20px_rgba(244,63,94,0.35)] transition-all active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>Gửi Báo Cáo Lỗi</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Previously Reported Bugs List */}
            {bugs.length > 0 && (
              <div className="bg-[#070D28]/80 rounded-3xl border border-cyan-300/20 p-5">
                <h4 className="text-xs font-black text-cyan-200 uppercase tracking-wider mb-3 tabular-nums">
                  Lịch sử các phản hồi đã gửi ({bugs.length})
                </h4>
                <div className="space-y-2">
                  {bugs.map((b) => (
                    <div
                      key={b.id}
                      className="bg-[#050A1F]/90 p-3 rounded-2xl border border-white/10 text-xs flex items-start justify-between gap-3"
                    >
                      <div>
                        <span className="font-bold text-white block">
                          {b.lessonTitle || 'Ứng dụng chung'}: {b.description}
                        </span>
                        <span className="text-slate-400 text-[11px]">
                          {new Date(b.timestamp).toLocaleString('vi-VN')}
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-emerald-500/20 text-emerald-200 border border-emerald-400/35 shrink-0">
                        Đã tiếp nhận
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* SubTab 4: Methodology Thinking Models & Mindmaps */}
        {activeSubTab === 'methodology' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-indigo-950/90 via-[#0C194B] to-fuchsia-950/80 rounded-3xl p-6 text-white border border-cyan-300/40 shadow-[0_0_28px_rgba(34,211,238,0.16)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <span className="w-12 h-12 rounded-2xl bg-cyan-400/15 border border-cyan-300/35 flex items-center justify-center text-3xl shadow-inner shrink-0">
                  🧠
                </span>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-200 border border-amber-300/35 px-2.5 py-0.5 rounded-full">
                    HỆ THỐNG BÀI KIỂM TRA ĐỊNH KỲ TƯ DUY
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-white mt-1.5">
                    Kiểm Tra Định Kỳ &amp; Sơ Đồ Mô Hình Toán Lớp 3
                  </h3>
                  <p className="text-xs text-cyan-100/80 mt-0.5 leading-relaxed">
                    Giúp bé hiểu bản chất từng dạng toán, vượt qua chốt chặn định kỳ và mở khóa hành trình tiếp theo.
                  </p>
                </div>
              </div>
              {onOpenMethodology && (
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onOpenMethodology();
                  }}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm whitespace-nowrap shadow-[0_0_20px_rgba(34,211,238,0.4)] active:scale-95 transition-all shrink-0"
                >
                  Vào Bài Kiểm Tra Định Kỳ →
                </button>
              )}
            </div>

            {/* Model 1: Comparison Bar Model */}
            <div className="bg-[#070D28]/90 rounded-3xl border border-cyan-300/35 p-6 shadow-[0_14px_34px_rgba(3,7,24,0.55)] space-y-4">
              <div className="flex items-center justify-between border-b border-cyan-300/15 pb-3 flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">📊</span>
                  <div>
                    <h4 className="font-black text-white text-sm sm:text-base">
                      Mô Hình 1: So Sánh Hơn - Kém &amp; Bản Chất Phép Trừ
                    </h4>
                    <p className="text-xs text-slate-300">
                      Áp dụng ở Trạm 1 (Biểu đồ dữ liệu) &amp; Trạm 2 (Thể tích Lít &amp; Dung tích)
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black text-emerald-200 bg-emerald-500/20 border border-emerald-400/40 px-2.5 py-1 rounded-full">
                  Chốt chặn định kỳ
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-sky-500/10 rounded-2xl p-4 border border-sky-400/30 space-y-2">
                  <div className="font-black text-sky-200 text-sm">
                    1. Bản Chất 2 Đoạn Thẳng &amp; Định Nghĩa
                  </div>
                  <ul className="space-y-1.5 text-slate-200 list-disc list-inside">
                    <li><strong>Đoạn dài:</strong> Luôn đại diện cho <em>Số Lớn (Nhiều hơn)</em>.</li>
                    <li><strong>Đoạn ngắn:</strong> Đại diện cho <em>Số Bé (Ít hơn)</em>.</li>
                    <li><strong>"Nhiều hơn":</strong> Phần dôi ra vượt mức của số bé.</li>
                    <li><strong>"Ít hơn":</strong> Khoảng còn thiếu để bằng số lớn.</li>
                    <li><strong>Tính đối xứng:</strong> A hơn B bao nhiêu thì B kém A bấy nhiêu!</li>
                  </ul>
                </div>

                <div className="bg-amber-500/10 rounded-2xl p-4 border border-amber-400/30 space-y-2">
                  <div className="font-black text-amber-200 text-sm">
                    2. Cơ Chế Phép Trừ &amp; San Sẻ
                  </div>
                  <ul className="space-y-1.5 text-slate-200 list-disc list-inside">
                    <li><strong>Vì sao dùng phép trừ:</strong> Cắt bỏ phần bằng nhau, giữ lại duy nhất phần chênh lệch.</li>
                    <li><strong>Công thức 1:</strong> <code className="px-1.5 py-0.5 rounded bg-white/10 text-cyan-200">Chênh Lệch = Số Lớn － Số Bé</code></li>
                    <li><strong>Công thức 2:</strong> <code className="px-1.5 py-0.5 rounded bg-white/10 text-cyan-200">Số Lớn = Số Bé ＋ Phần Hơn</code></li>
                    <li><strong>Mô hình san sẻ đều:</strong> Abby rót sang Benny một nửa chênh lệch: <code className="px-1.5 py-0.5 rounded bg-white/10 text-cyan-200">Chênh Lệch : 2</code>.</li>
                  </ul>
                </div>
              </div>

              {onOpenMethodology && (
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      onOpenMethodology();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 hover:brightness-110 text-slate-950 font-black text-xs shadow-[0_0_20px_rgba(34,211,238,0.35)] flex items-center gap-2 active:scale-95 transition-all"
                  >
                    <Brain className="w-4 h-4 text-slate-900" />
                    <span>Mở Bài Kiểm Tra Định Kỳ Mô Hình Này</span>
                    <span>→</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal Footer */}
      <div className="bg-[#060B24]/90 border-t border-cyan-300/25 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
          <Award className="w-4 h-4 text-amber-300" />
          <span>Sổ Thu Thập Lỗi · Spark Math Singapore Pedagogy</span>
        </div>
        {!isFullPageTab && (
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-2xl bg-white/[0.08] hover:bg-cyan-400/20 border border-white/15 hover:border-cyan-300/60 hover:shadow-[0_0_16px_rgba(34,211,238,0.35)] text-xs font-bold text-white transition-all"
          >
            Đóng
          </button>
        )}
      </div>
    </div>
  );

  if (isFullPageTab) {
    return <div className="w-full pb-12">{content}</div>;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030617]/80 backdrop-blur-md p-3 md:p-6 overflow-y-auto">
      {content}
    </div>
  );
};

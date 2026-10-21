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
  Filter
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
}

export const MistakeNotebookModal: React.FC<MistakeNotebookModalProps> = ({
  isOpen,
  onClose,
  onSelectLesson,
  currentLessonId
}) => {
  const [mistakes, setMistakes] = useState<CollectedMistake[]>([]);
  const [bugs, setBugs] = useState<ReportedBug[]>([]);
  const [activeSubTab, setActiveSubTab] = useState<'notebook' | 'report' | 'add'>('notebook');
  const [filterStatus, setFilterStatus] = useState<'all' | 'unresolved' | 'mastered'>('all');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState('');

  // Retake interactive mini-quiz states
  const [selectedRetakeAnswer, setSelectedRetakeAnswer] = useState<Record<string, string>>({});
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

  const handleRetakeOptionClick = (m: CollectedMistake, option: string) => {
    setSelectedRetakeAnswer((prev) => ({ ...prev, [m.id]: option }));

    // Check if correct (either matches full answer or starts with option)
    const isCorrect =
      option.trim().toLowerCase() === m.correctAnswer.trim().toLowerCase() ||
      m.correctAnswer.trim().toLowerCase().startsWith(option.trim().toLowerCase());

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 md:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border-4 border-amber-400 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-6 py-4.5 flex items-center justify-between text-white shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shadow-inner shrink-0">
              📖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl md:text-2xl font-black font-display text-white tracking-tight">
                  Sổ Thu Thập Lỗi Sai & Ôn Luyện
                </h2>
                {unresolvedCount > 0 && (
                  <span className="bg-rose-500 text-white font-extrabold text-xs px-2.5 py-0.5 rounded-full ring-2 ring-white/50 animate-pulse">
                    {unresolvedCount} cần ôn
                  </span>
                )}
              </div>
              <p className="text-xs md:text-sm text-amber-100 font-medium">
                Mỗi sai sót là một bậc thang tiến bộ · Thu thập, phân tích và làm chủ kiến thức!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
            title="Đóng sổ"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="bg-amber-50/70 border-b border-amber-200 px-6 py-2.5 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setActiveSubTab('notebook');
              }}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                activeSubTab === 'notebook'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-amber-100/60 border border-amber-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Danh Sách Lỗi Thu Thập ({total})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setActiveSubTab('add');
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                activeSubTab === 'add'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-amber-100/60 border border-amber-200'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Tự Thêm Câu Khó</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setActiveSubTab('report');
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                activeSubTab === 'report'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-rose-50 border border-rose-200'
              }`}
            >
              <AlertCircle className="w-4 h-4 text-rose-500" />
              <span>Báo Lỗi Đề Bài ({bugs.length})</span>
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
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold underline"
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
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-3.5 text-center shadow-xs">
                  <span className="text-xs font-bold text-slate-500 block">Tổng câu thu thập</span>
                  <span className="text-2xl font-black text-amber-700 mt-0.5 block">{total}</span>
                </div>
                <div className="bg-gradient-to-br from-rose-50 to-red-50 border border-rose-200 rounded-2xl p-3.5 text-center shadow-xs">
                  <span className="text-xs font-bold text-slate-500 block">Cần ôn luyện</span>
                  <span className="text-2xl font-black text-rose-600 mt-0.5 block">{unresolvedCount}</span>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-3.5 text-center shadow-xs">
                  <span className="text-xs font-bold text-slate-500 block">Đã nắm vững</span>
                  <span className="text-2xl font-black text-emerald-600 mt-0.5 block">{masteredCount}</span>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-sky-50 border border-indigo-200 rounded-2xl p-3.5 text-center shadow-xs">
                  <span className="text-xs font-bold text-slate-500 block">Tỉ lệ sửa sai</span>
                  <span className="text-2xl font-black text-indigo-700 mt-0.5 block">{masteryRate}%</span>
                </div>
              </div>

              {/* Filter Row */}
              <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <span>Bộ lọc:</span>
                  <button
                    type="button"
                    onClick={() => setFilterStatus('all')}
                    className={`px-3 py-1 rounded-full transition-colors ${
                      filterStatus === 'all'
                        ? 'bg-slate-800 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Tất cả ({total})
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterStatus('unresolved')}
                    className={`px-3 py-1 rounded-full transition-colors ${
                      filterStatus === 'unresolved'
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Cần ôn ({unresolvedCount})
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterStatus('mastered')}
                    className={`px-3 py-1 rounded-full transition-colors ${
                      filterStatus === 'mastered'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Đã nắm vững ({masteredCount})
                  </button>
                </div>

                <span className="text-xs text-slate-400 italic">
                  💡 Mẹo: Bấm &quot;Thử thách sửa sai&quot; để luyện tập lại ngay!
                </span>
              </div>

              {/* Mistakes List */}
              {filteredMistakes.length === 0 ? (
                <div className="text-center py-12 px-4 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                  <span className="text-5xl block mb-3">🎉</span>
                  <h3 className="text-lg font-bold text-slate-800">Không có câu sai nào trong mục này!</h3>
                  <p className="text-xs md:text-sm text-slate-500 mt-1 max-w-md mx-auto">
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
                        className={`rounded-3xl border-2 transition-all p-5 shadow-sm ${
                          isMastered
                            ? 'bg-emerald-50/40 border-emerald-200'
                            : 'bg-white border-amber-200 hover:border-amber-300'
                        }`}
                      >
                        {/* Card Header */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span className="text-2xl">{m.mascotAvatar || '🐰'}</span>
                            <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                              {m.topicName}
                            </span>
                            <span className="text-xs font-semibold text-slate-600">
                              {m.lessonTitle}
                            </span>
                            {m.attemptsCount > 1 && (
                              <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                                Đã thử {m.attemptsCount} lần
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleToggleMastery(m)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs ${
                                isMastered
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-amber-100 text-amber-900 hover:bg-emerald-500 hover:text-white'
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
                              className="text-slate-400 hover:text-rose-500 p-1 rounded-lg transition-colors"
                              title="Xóa khỏi sổ"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Question Prompt */}
                        <div className="mt-3.5">
                          <p className="text-base md:text-lg font-bold text-slate-800">
                            {m.questionPrompt}
                          </p>
                        </div>

                        {/* Comparison Panels */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                          <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-3">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 block flex items-center gap-1">
                              <span>❌</span> Câu trả lời trước đây:
                            </span>
                            <p className="text-sm font-bold text-rose-950 mt-1">
                              {m.userAnswer}
                            </p>
                          </div>

                          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block flex items-center gap-1">
                              <span>✅</span> Đáp án chuẩn xác:
                            </span>
                            <p className="text-sm font-bold text-emerald-950 mt-1">
                              {m.correctAnswer}
                            </p>
                          </div>
                        </div>

                        {/* Spark Math Pedagogical Explanation */}
                        {m.explanation && (
                          <div className="mt-3 bg-amber-50/60 border border-amber-200/80 rounded-2xl p-3.5 flex items-start gap-2.5">
                            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <div className="text-xs md:text-sm text-slate-700 font-medium">
                              <span className="font-bold text-amber-900 block mb-0.5">
                                Bí kíp tư duy Spark Math:
                              </span>
                              {m.explanation}
                            </div>
                          </div>
                        )}

                        {/* Interactive In-Place Retake Section */}
                        {m.options && m.options.length > 0 && (
                          <div className="mt-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                Thử thách sửa sai trực tiếp:
                              </span>
                              {feedback === 'correct' && (
                                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                                  <Check className="w-4 h-4" /> Chính xác tuyệt đối! 🎉
                                </span>
                              )}
                              {feedback === 'wrong' && (
                                <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
                                  Chưa đúng, bé hãy suy nghĩ lại nhé!
                                </span>
                              )}
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {m.options.map((opt) => {
                                const isSelected = selectedRetakeAnswer[m.id] === opt;
                                return (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => handleRetakeOptionClick(m, opt)}
                                    className={`py-2 px-3 rounded-xl text-xs md:text-sm font-bold transition-all text-center border-2 ${
                                      isSelected && feedback === 'correct'
                                        ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                                        : isSelected && feedback === 'wrong'
                                        ? 'bg-rose-50 text-rose-700 border-rose-300 animate-shake'
                                        : 'bg-slate-50 hover:bg-amber-100 text-slate-700 border-slate-200'
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* User Personal Notes */}
                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 text-xs">
                          {editingNoteId === m.id ? (
                            <div className="flex items-center gap-2 w-full">
                              <input
                                type="text"
                                value={tempNote}
                                onChange={(e) => setTempNote(e.target.value)}
                                placeholder="Ghi chú mẹo nhớ của riêng em..."
                                className="flex-1 px-3 py-1.5 rounded-xl border border-amber-300 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
                              />
                              <button
                                type="button"
                                onClick={() => handleSaveNote(m.id)}
                                className="px-3 py-1.5 rounded-xl bg-amber-500 text-white font-bold"
                              >
                                Lưu
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingNoteId(null)}
                                className="px-2 py-1.5 text-slate-400"
                              >
                                Hủy
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-slate-500">Mẹo của em:</span>
                              <span className="text-slate-700 italic">
                                {m.userNote || 'Chưa có ghi chú'}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingNoteId(m.id);
                                  setTempNote(m.userNote || '');
                                }}
                                className="text-amber-600 hover:underline inline-flex items-center gap-0.5 ml-1"
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
                              className="inline-flex items-center gap-1 font-bold text-amber-700 hover:text-amber-900 transition-colors ml-auto"
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
            <div className="bg-white rounded-3xl border-2 border-amber-200 p-6 shadow-sm max-w-2xl mx-auto">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="text-2xl">📝</span>
                <div>
                  <h3 className="text-lg font-black text-slate-800">
                    Thêm bài toán khó hoặc lỗi cần ghi nhớ
                  </h3>
                  <p className="text-xs text-slate-500">
                    Bé có thể chủ động lưu lại các câu hỏi hóc búa để ôn luyện trước kỳ thi!
                  </p>
                </div>
              </div>

              <form onSubmit={handleCreateManualMistake} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Đề bài / Câu hỏi khó *
                  </label>
                  <textarea
                    required
                    value={newPrompt}
                    onChange={(e) => setNewPrompt(e.target.value)}
                    rows={2}
                    placeholder="Ví dụ: Tính tổng số lít nước khi đổ 3 bình 5L vào bể 20L..."
                    className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Câu trả lời dễ nhầm (Lỗi sai)
                    </label>
                    <input
                      type="text"
                      value={newUserAnswer}
                      onChange={(e) => setNewUserAnswer(e.target.value)}
                      placeholder="Ví dụ: 15 lít (quên trừ dung tích bể)"
                      className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Đáp án đúng chuẩn *
                    </label>
                    <input
                      required
                      type="text"
                      value={newCorrectAnswer}
                      onChange={(e) => setNewCorrectAnswer(e.target.value)}
                      placeholder="Ví dụ: Bể còn thiếu 5 lít nữa mới đầy"
                      className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Bí kíp tư duy / Giải thích
                  </label>
                  <textarea
                    value={newExplanation}
                    onChange={(e) => setNewExplanation(e.target.value)}
                    rows={2}
                    placeholder="Giải thích vì sao cần làm như vậy..."
                    className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Phân loại lỗi
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 text-sm focus:border-amber-400 focus:outline-none bg-white"
                    >
                      <option value="concept">Khái niệm & Bản chất</option>
                      <option value="calculation">Tính toán số học</option>
                      <option value="reading">Đọc hiểu & Quy ước</option>
                      <option value="other">Bẫy tư duy khác</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Mẹo của em
                    </label>
                    <input
                      type="text"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Lời nhắc nhở bản thân..."
                      className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveSubTab('notebook')}
                    className="px-5 py-2.5 rounded-2xl border-2 border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Quay lại
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-white font-black text-sm shadow-md transition-all active:scale-95"
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
              <div className="bg-white rounded-3xl border-2 border-rose-200 p-6 shadow-sm">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="text-2xl">🐞</span>
                  <div>
                    <h3 className="text-lg font-black text-slate-800">
                      Báo cáo lỗi đề bài hoặc lỗi hiển thị
                    </h3>
                    <p className="text-xs text-slate-500">
                      Nếu bé phát hiện lỗi chính tả, sai đáp án đề thi hoặc trục trặc giao diện, hãy gửi cho chúng mình nhé!
                    </p>
                  </div>
                </div>

                {bugSuccess && (
                  <div className="mb-4 p-3.5 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs md:text-sm font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    Cảm ơn bạn! Đã ghi nhận báo cáo lỗi thành công!
                  </div>
                )}

                <form onSubmit={handleSubmitBug} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Loại lỗi gặp phải
                    </label>
                    <select
                      value={bugCategory}
                      onChange={(e) => setBugCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 text-sm focus:border-rose-400 focus:outline-none bg-white"
                    >
                      <option value="logic_error">Lỗi logic / Đáp án đề bài bị sai</option>
                      <option value="typo">Lỗi chính tả / câu từ khó hiểu</option>
                      <option value="display">Lỗi hiển thị / giao diện bị lệch</option>
                      <option value="other">Ý kiến đóng góp khác</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Mô tả chi tiết lỗi *
                    </label>
                    <textarea
                      required
                      value={bugDescription}
                      onChange={(e) => setBugDescription(e.target.value)}
                      rows={3}
                      placeholder="Mô tả cụ thể ở bài nào, hiện tượng gì xảy ra để đội ngũ sửa chữa..."
                      className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 text-sm focus:border-rose-400 focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-sm shadow-md transition-all active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                      <span>Gửi Báo Cáo Lỗi</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Previously Reported Bugs List */}
              {bugs.length > 0 && (
                <div className="bg-slate-50 rounded-3xl border border-slate-200 p-5">
                  <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3">
                    Lịch sử các phản hồi đã gửi ({bugs.length})
                  </h4>
                  <div className="space-y-2">
                    {bugs.map((b) => (
                      <div
                        key={b.id}
                        className="bg-white p-3 rounded-2xl border border-slate-200 text-xs flex items-start justify-between gap-3"
                      >
                        <div>
                          <span className="font-bold text-slate-800 block">
                            {b.lessonTitle || 'Ứng dụng chung'}: {b.description}
                          </span>
                          <span className="text-slate-400 text-[11px]">
                            {new Date(b.timestamp).toLocaleString('vi-VN')}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 text-emerald-800 shrink-0">
                          Đã tiếp nhận
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Sổ Thu Thập Lỗi · Spark Math Singapore Pedagogy</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-2xl bg-white border-2 border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 shadow-2xs transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

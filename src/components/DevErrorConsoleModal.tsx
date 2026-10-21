import React, { useState, useEffect } from 'react';
import {
  X,
  Bug,
  Terminal,
  AlertTriangle,
  RotateCcw,
  Copy,
  Check,
  Trash2,
  Download,
  Play,
  Layers,
  Globe,
  Clock,
  ChevronDown,
  ChevronUp,
  PlusCircle,
  Send,
  Sparkles
} from 'lucide-react';
import {
  ProgramErrorRecord,
  ErrorCategory,
  ERROR_TYPE_LABELS,
  getProgramErrors,
  clearProgramErrors,
  recordExerciseIssue,
  triggerTestRuntimeError,
  triggerTestPromiseRejection,
  triggerTestExerciseIssue,
  exportErrorsFormatted
} from '../utils/devErrorCollector';
import { sound } from '../utils/soundEffects';

interface DevErrorConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLessonId?: string | null;
  currentLessonTitle?: string;
  defaultTab?: 'list' | 'report';
}

export const DevErrorConsoleModal: React.FC<DevErrorConsoleModalProps> = ({
  isOpen,
  onClose,
  currentLessonId,
  currentLessonTitle,
  defaultTab = 'list'
}) => {
  const [errors, setErrors] = useState<ProgramErrorRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'list' | 'report'>('list');
  const [filterType, setFilterType] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedSingleId, setCopiedSingleId] = useState<string | null>(null);

  // New Issue Report Form
  const [reportType, setReportType] = useState<'logic_error' | 'display_error' | 'interaction_error' | 'runtime'>('display_error');
  const [reportMessage, setReportMessage] = useState('');
  const [reportDesc, setReportDesc] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);

  const loadErrors = () => {
    setErrors(getProgramErrors());
  };

  useEffect(() => {
    if (isOpen) {
      loadErrors();
      setActiveTab(defaultTab);
    }
  }, [isOpen, defaultTab]);

  useEffect(() => {
    const handleUpdate = () => loadErrors();
    window.addEventListener('spark_math_dev_error_logged', handleUpdate);
    return () => window.removeEventListener('spark_math_dev_error_logged', handleUpdate);
  }, []);

  if (!isOpen) return null;

  const filtered = errors.filter((e) => {
    if (filterType === 'all') return true;
    if (filterType === 'programming') {
      return ['runtime', 'promise', 'react_boundary', 'resource_error', 'console_error'].includes(e.type);
    }
    return e.type === filterType;
  });

  const handleClear = () => {
    if (window.confirm('Xóa toàn bộ lịch sử lỗi đã thu thập?')) {
      sound.playClick();
      clearProgramErrors();
      setErrors([]);
    }
  };

  const handleCopyAll = () => {
    sound.playClick();
    const formatted = exportErrorsFormatted();
    navigator.clipboard.writeText(formatted);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleCopySingle = (err: ProgramErrorRecord) => {
    sound.playClick();
    const text = [
      `### BÁO CÁO LỖI SPARK MATH [${ERROR_TYPE_LABELS[err.type]?.label || err.type.toUpperCase()}]`,
      `**Tiêu đề**: ${err.message}`,
      err.description ? `**Mô tả chi tiết**: ${err.description}` : '',
      err.lessonTitle ? `**Bài học**: ${err.lessonTitle} (${err.lessonId || ''})` : '',
      `**Nguồn**: ${err.source || 'N/A'}${err.lineno ? `:${err.lineno}:${err.colno}` : ''}`,
      `**Thời gian**: ${new Date(err.timestamp).toLocaleString('vi-VN')}`,
      `**URL**: ${err.url}`,
      err.stack ? `\n**Stack Trace**:\n\`\`\`\n${err.stack}\n\`\`\`` : '',
      err.componentStack ? `\n**Component Stack**:\n\`\`\`\n${err.componentStack}\n\`\`\`` : ''
    ]
      .filter(Boolean)
      .join('\n');

    navigator.clipboard.writeText(text);
    setCopiedSingleId(err.id);
    setTimeout(() => setCopiedSingleId(null), 2000);
  };

  const handleDownloadLog = () => {
    sound.playClick();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(exportErrorsFormatted());
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `spark-math-errors-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleSubmitNewReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportMessage.trim()) return;

    sound.playVictory();
    recordExerciseIssue({
      type: reportType,
      message: reportMessage.trim(),
      description: reportDesc.trim(),
      lessonId: currentLessonId || undefined,
      lessonTitle: currentLessonTitle || (currentLessonId ? `Bài học ${currentLessonId}` : 'Ứng dụng chung')
    });

    setReportMessage('');
    setReportDesc('');
    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setActiveTab('list');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-3 md:p-6 overflow-y-auto">
      <div className="bg-slate-900 border-2 border-slate-700 text-slate-100 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-800/90 border-b border-slate-700/80 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-xl shrink-0">
              <Bug className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg md:text-xl font-bold font-mono text-white">
                  Trung Tâm Thu Thập & Chẩn Đoán Lỗi
                </h2>
                <span className="bg-rose-500/20 text-rose-300 font-mono text-xs px-2.5 py-0.5 rounded-full border border-rose-500/30">
                  {errors.length} lỗi đã ghi
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Thu thập toàn diện: Lỗi lập trình, lỗi logic bài tập, lỗi hiển thị & lỗi tương tác
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Switching Bar */}
        <div className="bg-slate-950/80 border-b border-slate-800 px-6 py-2.5 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setActiveTab('list');
              }}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                activeTab === 'list'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              📋 Danh Sách Lỗi ({errors.length})
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setActiveTab('report');
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                activeTab === 'report'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Ghi Nhận / Báo Lỗi Bài Tập</span>
            </button>
          </div>

          {activeTab === 'list' && errors.length > 0 && (
            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={handleCopyAll}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                {copiedAll ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedAll ? 'Đã chép' : 'Sao chép hết'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadLog}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                title="Tải log dạng file .json"
              >
                <Download className="w-3 h-3" />
                <span>Tải JSON</span>
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>Xoá</span>
              </button>
            </div>
          )}
        </div>

        {/* Tab 1: Error List */}
        {activeTab === 'list' && (
          <>
            {/* Filter Chips & Test Triggers */}
            <div className="bg-slate-950/40 border-b border-slate-800/80 px-6 py-2.5 flex items-center justify-between flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-slate-400 font-bold mr-1">Phân loại:</span>
                {[
                  { id: 'all', label: `Tất cả (${errors.length})` },
                  { id: 'programming', label: '💻 Lỗi Lập Trình' },
                  { id: 'logic_error', label: '🧠 Lỗi Logic' },
                  { id: 'display_error', label: '🎨 Lỗi Hiển Thị' },
                  { id: 'interaction_error', label: '👆 Lỗi Tương Tác' }
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFilterType(f.id)}
                    className={`px-2.5 py-1 rounded-lg font-mono transition-colors ${
                      filterType === f.id
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Sample Test Triggers */}
              <div className="flex items-center gap-1.5 ml-auto text-[11px] font-mono">
                <span className="text-slate-500 font-sans">Thử nghiệm:</span>
                <button
                  type="button"
                  onClick={() => triggerTestRuntimeError()}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-red-300 border border-red-500/30"
                  title="Kích hoạt lỗi runtime mẫu"
                >
                  + Lập trình
                </button>
                <button
                  type="button"
                  onClick={() => triggerTestExerciseIssue('logic_error')}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-purple-300 border border-purple-500/30"
                  title="Tạo lỗi logic mẫu"
                >
                  + Logic
                </button>
                <button
                  type="button"
                  onClick={() => triggerTestExerciseIssue('display_error')}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30"
                  title="Tạo lỗi hiển thị mẫu"
                >
                  + Hiển thị
                </button>
                <button
                  type="button"
                  onClick={() => triggerTestExerciseIssue('interaction_error')}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30"
                  title="Tạo lỗi tương tác mẫu"
                >
                  + Tương tác
                </button>
              </div>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 font-mono">
              {filtered.length === 0 ? (
                <div className="text-center py-16 px-4 bg-slate-950/40 rounded-2xl border border-slate-800">
                  <span className="text-4xl block mb-2">🎉</span>
                  <h3 className="text-base font-bold text-slate-300">Không có lỗi nào trong danh mục này!</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                    Mọi lỗi lập trình (runtime, crash) hoặc lỗi bài tập (logic, hiển thị, tương tác) khi được ghi nhận sẽ hiển thị đầy đủ tại đây.
                  </p>
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => setActiveTab('report')}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs font-sans transition-all"
                    >
                      Bấm để ghi nhận lỗi đầu tiên
                    </button>
                  </div>
                </div>
              ) : (
                filtered.map((err) => {
                  const isExpanded = expandedId === err.id;
                  const isCopied = copiedSingleId === err.id;
                  const typeMeta = ERROR_TYPE_LABELS[err.type] || {
                    label: err.type,
                    badgeClass: 'bg-slate-700 text-slate-300 border-slate-600',
                    icon: '⚠️'
                  };

                  return (
                    <div
                      key={err.id}
                      className="bg-slate-950/80 rounded-2xl border border-slate-800 p-4 hover:border-slate-700 transition-colors"
                    >
                      {/* Top Bar of Card */}
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border uppercase flex items-center gap-1 ${typeMeta.badgeClass}`}>
                            <span>{typeMeta.icon}</span>
                            <span>{typeMeta.label}</span>
                          </span>

                          {err.lessonTitle && (
                            <span className="text-xs font-bold text-amber-300 bg-amber-950/50 border border-amber-800/40 px-2 py-0.5 rounded-md">
                              {err.lessonTitle}
                            </span>
                          )}

                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(err.timestamp).toLocaleTimeString('vi-VN')} ({new Date(err.timestamp).toLocaleDateString('vi-VN')})
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopySingle(err)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors"
                            title="Sao chép thông tin lỗi này để gửi AI phân tích"
                          >
                            {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{isCopied ? 'Đã sao chép' : 'Sao chép lỗi'}</span>
                          </button>

                          {(err.stack || err.componentStack || err.description) && (
                            <button
                              type="button"
                              onClick={() => setExpandedId(isExpanded ? null : err.id)}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors"
                            >
                              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                              <span>{isExpanded ? 'Thu gọn' : 'Chi tiết'}</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Error Message */}
                      <div className="mt-2 text-sm font-bold text-rose-200 break-words leading-relaxed">
                        {err.message}
                      </div>

                      {/* Optional User Description */}
                      {err.description && (
                        <div className="mt-1.5 text-xs text-slate-300 font-sans bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl">
                          <span className="font-bold text-amber-400 block mb-0.5">Hiện tượng cụ thể:</span>
                          {err.description}
                        </div>
                      )}

                      {/* Source and Location */}
                      {err.source && (
                        <div className="mt-1 text-xs text-slate-400 break-all flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span>
                            Nguồn: {err.source}
                            {err.lineno !== undefined ? ` (dòng ${err.lineno}:${err.colno})` : ''}
                          </span>
                        </div>
                      )}

                      {/* Expanded Stack Trace */}
                      {isExpanded && (
                        <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-2">
                          {err.stack && (
                            <div>
                              <span className="text-[11px] font-bold text-slate-500 block mb-1">Stack Trace:</span>
                              <pre className="text-[11px] text-slate-300 bg-slate-900 p-3 rounded-xl overflow-x-auto border border-slate-800 whitespace-pre-wrap">
                                {err.stack}
                              </pre>
                            </div>
                          )}

                          {err.componentStack && (
                            <div>
                              <span className="text-[11px] font-bold text-slate-500 block mb-1">Component Stack:</span>
                              <pre className="text-[11px] text-slate-300 bg-slate-900 p-3 rounded-xl overflow-x-auto border border-slate-800 whitespace-pre-wrap">
                                {err.componentStack}
                              </pre>
                            </div>
                          )}

                          <div className="text-[10px] text-slate-500 pt-1">
                            URL: {err.url} | User Agent: {err.userAgent}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}

        {/* Tab 2: Manual Report Form */}
        {activeTab === 'report' && (
          <div className="flex-1 overflow-y-auto p-4 md:p-6 font-sans">
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 max-w-2xl mx-auto shadow-md">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-xl shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-black text-white">
                    Ghi Nhận Lỗi Bài Tập (Logic, Hiển Thị, Tương Tác, Code)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Thu thập ngay bất kỳ trục trặc nào phát hiện được để AI/lập trình viên khắc phục chuẩn xác.
                  </p>
                </div>
              </div>

              {reportSuccess && (
                <div className="mb-4 p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs md:text-sm font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Đã thu thập và lưu trữ lỗi thành công vào hệ thống chẩn đoán!</span>
                </div>
              )}

              <form onSubmit={handleSubmitNewReport} className="space-y-4 text-xs md:text-sm">
                {/* Category Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Loại lỗi gặp phải *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'logic_error', title: '🧠 Lỗi Logic Bài Tập', desc: 'Sai đáp án, mâu thuẫn câu hỏi, suy luận sai' },
                      { id: 'display_error', title: '🎨 Lỗi Hiển Thị', desc: 'Vỡ layout, che khuất chữ, nút đè lên nhau' },
                      { id: 'interaction_error', title: '👆 Lỗi Tương Tác', desc: 'Bấm nút không ăn, kéo thả bị đơ, không cuộn được' },
                      { id: 'runtime', title: '💻 Lỗi Lập Trình / Crash', desc: 'Trục trặc mã nguồn, đứng hình, ngoại lệ script' }
                    ].map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setReportType(c.id as any)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          reportType === c.id
                            ? 'bg-amber-500/20 border-amber-400 text-white ring-2 ring-amber-400/30'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                        }`}
                      >
                        <span className="font-bold text-xs block mb-0.5">{c.title}</span>
                        <span className="text-[11px] text-slate-400 block">{c.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lesson context display */}
                {currentLessonTitle && (
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Bài học đang mở:</span>
                    <span className="font-bold text-amber-300">{currentLessonTitle}</span>
                  </div>
                )}

                {/* Error title */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Tiêu đề lỗi tóm tắt *
                  </label>
                  <input
                    type="text"
                    required
                    value={reportMessage}
                    onChange={(e) => setReportMessage(e.target.value)}
                    placeholder="Ví dụ: Nút lỗi lập trình bị đè lên nút Bài tiếp theo / Đáp án câu 2 bị ngược..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none text-xs md:text-sm font-sans"
                  />
                </div>

                {/* Detailed description */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Mô tả chi tiết hiện tượng & vị trí xuất hiện
                  </label>
                  <textarea
                    rows={3}
                    value={reportDesc}
                    onChange={(e) => setReportDesc(e.target.value)}
                    placeholder="Mô tả cụ thể: Thao tác như thế nào thì bị, ở màn hình nào, nút nào bấm không phản hồi..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none text-xs md:text-sm font-sans"
                  />
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('list')}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black transition-all active:scale-95 shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>Lưu & Thu Thập Lỗi Ngay</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-slate-950/80 border-t border-slate-800 px-6 py-3 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-500" />
            <span>Trung Tâm Thu Thập Lỗi · Spark Math Universal Error Logger</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

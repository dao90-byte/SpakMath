/**
 * Developer & Exercise Comprehensive Error Collection System (Thu Thập & Chẩn Đoán Toàn Bộ Lỗi Bài Tập & Lập Trình)
 * Captures all error types:
 * - Programming & Code Crashes: Runtime, Promise Rejection, 404 Resource, React Boundary
 * - Exercise Logic Errors: Wrong answer, formula mismatch, flawed reasoning rule
 * - Exercise Display Errors: Broken layout, overlapping text, hidden elements, scaling
 * - Exercise Interaction Errors: Non-responsive clicks, stuck drag-and-drop, frozen inputs
 */

export type ErrorCategory =
  | 'runtime'
  | 'promise'
  | 'react_boundary'
  | 'resource_error'
  | 'console_error'
  | 'logic_error'
  | 'display_error'
  | 'interaction_error';

export interface ProgramErrorRecord {
  id: string;
  type: ErrorCategory;
  message: string;
  description?: string;
  stack?: string;
  source?: string;
  lineno?: number;
  colno?: number;
  componentStack?: string;
  timestamp: number;
  url: string;
  userAgent: string;
  handled: boolean;
  lessonId?: string;
  lessonTitle?: string;
  context?: {
    activeTab?: string;
    activeLessonId?: string | null;
  };
}

export const ERROR_TYPE_LABELS: Record<ErrorCategory, { label: string; badgeClass: string; icon: string }> = {
  runtime: { label: 'Lỗi Lập Trình (Runtime)', badgeClass: 'bg-red-500/20 text-red-300 border-red-500/40', icon: '💻' },
  react_boundary: { label: 'Sập Giao Diện React', badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40', icon: '💥' },
  promise: { label: 'Bất Đồng Bộ (Promise)', badgeClass: 'bg-orange-500/20 text-orange-300 border-orange-500/40', icon: '⚡' },
  resource_error: { label: 'Lỗi Tải Tài Nguyên (404)', badgeClass: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40', icon: '📦' },
  console_error: { label: 'Lỗi Console Log', badgeClass: 'bg-slate-700 text-slate-300 border-slate-600', icon: '📝' },
  logic_error: { label: 'Lỗi Logic Bài Tập', badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40', icon: '🧠' },
  display_error: { label: 'Lỗi Hiển Thị Giao Diện', badgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40', icon: '🎨' },
  interaction_error: { label: 'Lỗi Tương Tác / Bấm Đơ', badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40', icon: '👆' }
};

const STORAGE_KEY = 'spark_math_dev_errors';
const MAX_ERRORS = 80;

let isInitialized = false;

export const getProgramErrors = (): ProgramErrorRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveProgramErrors = (errors: ProgramErrorRecord[]) => {
  try {
    const trimmed = errors.slice(0, MAX_ERRORS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('spark_math_dev_error_logged'));
    }
  } catch (e) {
    console.warn('Could not save error to localStorage:', e);
  }
};

export const logProgramError = (entry: Partial<ProgramErrorRecord> & { message: string }): ProgramErrorRecord => {
  const current = getProgramErrors();

  const newError: ProgramErrorRecord = {
    id: `err-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    type: entry.type || 'runtime',
    message: entry.message || 'Lỗi không xác định',
    description: entry.description,
    stack: entry.stack || '',
    source: entry.source || (typeof window !== 'undefined' ? window.location.href : ''),
    lineno: entry.lineno,
    colno: entry.colno,
    componentStack: entry.componentStack,
    timestamp: Date.now(),
    url: typeof window !== 'undefined' ? window.location.href : '',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    handled: entry.handled ?? false,
    lessonId: entry.lessonId,
    lessonTitle: entry.lessonTitle,
    context: entry.context
  };

  // Avoid spamming identical duplicate errors within 1 second
  const lastError = current[0];
  if (
    lastError &&
    lastError.message === newError.message &&
    Math.abs(lastError.timestamp - newError.timestamp) < 1000
  ) {
    return lastError;
  }

  current.unshift(newError);
  saveProgramErrors(current);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('spark_math_error_toast', {
        detail: {
          error: newError,
          message: `Đã ghi nhận ${ERROR_TYPE_LABELS[newError.type]?.label || 'lỗi'}!`
        }
      })
    );
  }

  return newError;
};

export const recordExerciseIssue = (params: {
  type: 'logic_error' | 'display_error' | 'interaction_error' | 'runtime';
  message: string;
  description?: string;
  lessonId?: string;
  lessonTitle?: string;
}) => {
  return logProgramError({
    type: params.type,
    message: params.message,
    description: params.description,
    lessonId: params.lessonId,
    lessonTitle: params.lessonTitle,
    source: params.lessonTitle ? `Bài học: ${params.lessonTitle}` : 'Bài tập',
    handled: true
  });
};

export const clearProgramErrors = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('spark_math_dev_error_logged'));
    }
  } catch (e) {
    console.warn('Could not clear errors:', e);
  }
};

/**
 * Initialize global window listeners for runtime errors and unhandled rejections
 */
export const initDevErrorCollector = () => {
  if (isInitialized || typeof window === 'undefined') return;
  isInitialized = true;

  // 1. Capture uncaught runtime errors and asset 404s
  window.addEventListener(
    'error',
    (event: ErrorEvent | Event) => {
      // Check if it's a resource loading error (script, img, link 404)
      if (event instanceof Event && !(event instanceof ErrorEvent)) {
        const target = event.target as HTMLElement | null;
        if (target) {
          const src = (target as any).src || (target as any).href || target.tagName;
          logProgramError({
            type: 'resource_error',
            message: `Không thể tải tài nguyên (404/Network Error): ${src}`,
            source: src,
            handled: false
          });
        }
        return;
      }

      const errorEvent = event as ErrorEvent;
      logProgramError({
        type: 'runtime',
        message: errorEvent.message || 'Lỗi Runtime Script',
        stack: errorEvent.error?.stack || '',
        source: errorEvent.filename,
        lineno: errorEvent.lineno,
        colno: errorEvent.colno,
        handled: false
      });
    },
    true
  );

  // 2. Capture unhandled Promise rejections
  window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
    let msg = 'Lỗi bất đồng bộ Promise không được xử lý';
    let stack = '';

    if (event.reason instanceof Error) {
      msg = event.reason.message;
      stack = event.reason.stack || '';
    } else if (typeof event.reason === 'string') {
      msg = event.reason;
    } else {
      try {
        msg = JSON.stringify(event.reason);
      } catch {
        msg = String(event.reason);
      }
    }

    logProgramError({
      type: 'promise',
      message: msg,
      stack,
      handled: false
    });
  });

  // 3. Intercept console.error to collect logged programming issues
  const originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    originalConsoleError.apply(console, args);

    const firstArg = args[0];
    let message = 'console.error được gọi';
    let stack = '';

    if (firstArg instanceof Error) {
      message = firstArg.message;
      stack = firstArg.stack || '';
    } else if (typeof firstArg === 'string') {
      message = args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
    }

    if (message.includes('[vite]') || message.includes('WebSocket')) {
      return;
    }

    logProgramError({
      type: 'console_error',
      message: `[Console.error] ${message}`,
      stack,
      handled: true
    });
  };
};

// Test error triggers
export const triggerTestRuntimeError = () => {
  setTimeout(() => {
    throw new Error('🧪 Lỗi mẫu Runtime: Kiểm tra hệ thống thu thập lỗi lập trình!');
  }, 50);
};

export const triggerTestPromiseRejection = () => {
  Promise.reject(new Error('🧪 Lỗi mẫu Promise: Thử nghiệm bắt unhandled rejection!'));
};

export const triggerTestExerciseIssue = (type: 'logic_error' | 'display_error' | 'interaction_error') => {
  const sampleMap = {
    logic_error: {
      message: 'Mâu thuẫn logic: Đáp án trắc nghiệm không khớp với công thức',
      description: 'Ví dụ bài đếm hàng ngũ: Benny đứng thứ 3 từ trước, Abby thứ 2 từ sau, tổng đáp án không ra 4.'
    },
    display_error: {
      message: 'Lỗi hiển thị: Nút bấm bị chồng chéo lên thanh điều hướng',
      description: 'Phần tử nổi ở góc phải màn hình bị đè lên nút "Bài tiếp theo" khi hiển thị trên mobile.'
    },
    interaction_error: {
      message: 'Lỗi tương tác: Thao tác bấm nút không phản hồi (đơ sự kiện)',
      description: 'Nhấn vào lựa chọn đáp án nhưng màn hình không cập nhật trạng thái đã chọn.'
    }
  };

  const sample = sampleMap[type];
  recordExerciseIssue({
    type,
    message: sample.message,
    description: sample.description,
    lessonTitle: 'Bài tập kiểm thử'
  });
};

export const exportErrorsFormatted = (): string => {
  const errors = getProgramErrors();
  return JSON.stringify(errors, null, 2);
};

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logProgramError } from '../utils/devErrorCollector';
import { AlertTriangle, RotateCcw, Copy, Check, Terminal, Bug } from 'lucide-react';

interface Props {
  children: ReactNode;
  onOpenDevConsole?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  copied: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    copied: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
      copied: false
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    logProgramError({
      type: 'react_boundary',
      message: `[React Crash] ${error.message}`,
      stack: error.stack,
      componentStack: errorInfo.componentStack || undefined,
      handled: false
    });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleResetStorageAndReload = () => {
    if (window.confirm('Xóa bộ nhớ đệm và tải lại trang? Các lỗi đã thu thập vẫn sẽ được lưu trữ.')) {
      const devErrors = localStorage.getItem('spark_math_dev_errors');
      localStorage.clear();
      if (devErrors) {
        localStorage.setItem('spark_math_dev_errors', devErrors);
      }
      window.location.reload();
    }
  };

  private handleCopyDiagnostic = () => {
    const { error, errorInfo } = this.state;
    const report = [
      '### BÁO CÁO SỰ CỐ LẬP TRÌNH SPARK MATH',
      `**Thời gian**: ${new Date().toLocaleString('vi-VN')}`,
      `**URL**: ${window.location.href}`,
      `**Lỗi**: ${error?.name}: ${error?.message}`,
      '\n**Stack Trace**:',
      '```',
      error?.stack || 'Không có stack',
      '```',
      '\n**Component Stack**:',
      '```',
      errorInfo?.componentStack || 'Không có component stack',
      '```'
    ].join('\n');

    navigator.clipboard.writeText(report);
    this.setState({ copied: true });
    setTimeout(() => this.setState({ copied: false }), 2500);
  };

  public render() {
    if (this.state.hasError) {
      const { error, errorInfo, copied } = this.state;

      return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4 font-sans">
          <div className="bg-slate-800 border-2 border-rose-500/70 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl">
            {/* Header */}
            <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-slate-700">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-2xl shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-black text-white">
                  Đã phát hiện lỗi trong quá trình lập trình
                </h1>
                <p className="text-xs md:text-sm text-slate-400 mt-0.5">
                  Lỗi hệ thống runtime đã được tự động bắt và lưu vào nhật ký chẩn đoán lỗi.
                </p>
              </div>
            </div>

            {/* Error Detail Display */}
            <div className="bg-slate-950/80 rounded-2xl border border-rose-500/30 p-4 mb-5 overflow-hidden">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider mb-2">
                <Terminal className="w-3.5 h-3.5" />
                <span>Chi tiết thông điệp lỗi:</span>
              </div>
              <p className="text-sm font-mono text-rose-200 font-bold break-all">
                {error?.name}: {error?.message}
              </p>
              {error?.stack && (
                <div className="mt-3 pt-3 border-t border-slate-800">
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">Stack Trace:</span>
                  <pre className="text-[11px] font-mono text-slate-400 max-h-36 overflow-y-auto whitespace-pre-wrap">
                    {error.stack}
                  </pre>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={this.handleReload}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs md:text-sm transition-all active:scale-95 shadow-md"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Tải lại trang</span>
                </button>

                <button
                  type="button"
                  onClick={this.handleResetStorageAndReload}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs transition-colors"
                  title="Xóa bộ nhớ đệm cache và nạp lại từ đầu"
                >
                  Xóa cache & Tải lại
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={this.handleCopyDiagnostic}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs font-bold text-slate-200 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Đã sao chép!' : 'Sao chép lỗi gửi AI'}</span>
                </button>

                {this.props.onOpenDevConsole && (
                  <button
                    type="button"
                    onClick={this.props.onOpenDevConsole}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white transition-colors"
                  >
                    <Bug className="w-3.5 h-3.5" />
                    <span>Xem nhật ký lỗi</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

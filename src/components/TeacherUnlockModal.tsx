import React, { useState } from 'react';
import { KeyRound, X, CheckCircle2, AlertCircle, Lock, Unlock, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';
import { isTeacherUnlocked, setTeacherUnlocked } from '../data/periodicAssessmentsData';

interface TeacherUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockedStatusChange?: (unlocked: boolean) => void;
}

export const TeacherUnlockModal: React.FC<TeacherUnlockModalProps> = ({
  isOpen,
  onClose,
  onUnlockedStatusChange
}) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isCurrentlyUnlocked, setIsCurrentlyUnlocked] = useState(isTeacherUnlocked());
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === '7979') {
      sound.playStarCollect();
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      setTeacherUnlocked(true);
      setIsCurrentlyUnlocked(true);
      setErrorMsg(null);
      setShowSuccessToast(true);
      if (onUnlockedStatusChange) onUnlockedStatusChange(true);
      setTimeout(() => {
        setShowSuccessToast(false);
        onClose();
      }, 1400);
    } else {
      sound.playWrong();
      setErrorMsg('Mật khẩu không chính xác. Vui lòng kiểm tra lại mật mã giáo viên.');
    }
  };

  const handleRelock = () => {
    sound.playClick();
    setTeacherUnlocked(false);
    setIsCurrentlyUnlocked(false);
    setPasswordInput('');
    setErrorMsg(null);
    if (onUnlockedStatusChange) onUnlockedStatusChange(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#030617]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative bg-[radial-gradient(ellipse_at_top_right,_rgba(56,189,248,0.2),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(168,85,247,0.18),_transparent_55%),linear-gradient(160deg,_rgba(15,24,68,0.98),_rgba(7,12,38,0.99))] rounded-3xl shadow-[0_28px_70px_rgba(3,7,24,0.88),0_0_42px_rgba(34,211,238,0.18)] border border-cyan-300/45 max-w-md w-full overflow-hidden text-white animate-fade-in">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-6 h-[2.5px] rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-400 shadow-[0_0_16px_rgba(34,211,238,0.7)]"
        />

        {/* Header */}
        <div className="bg-[#060B24]/90 border-b border-cyan-300/25 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-300 via-sky-400 to-fuchsia-400 text-slate-950 flex items-center justify-center shadow-[0_0_18px_rgba(34,211,238,0.45)] shrink-0">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-wider text-cyan-300">
                Dành riêng cho giáo viên
              </p>
              <h3 className="text-base font-black text-white">Cổng Mở Khóa Giáo Viên</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-9 h-9 rounded-xl bg-white/[0.08] hover:bg-cyan-400/20 border border-white/15 hover:border-cyan-300/60 hover:shadow-[0_0_16px_rgba(34,211,238,0.35)] text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {isCurrentlyUnlocked ? (
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 mx-auto flex items-center justify-center shadow-[0_0_24px_rgba(52,211,153,0.3)]">
                <Unlock className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-black text-white">
                  Chế Độ Giáo Viên Đang Bật
                </h4>
                <p className="text-xs text-cyan-100/80 mt-1.5 leading-relaxed">
                  Toàn bộ các bài tập và bài kiểm tra định kỳ đã được mở khóa tự do để thầy cô tiện kiểm tra bài giảng và duyệt nhanh nội dung.
                </p>
              </div>

              <div className="bg-emerald-500/15 border border-emerald-400/40 rounded-2xl p-3 text-xs font-bold text-emerald-200 flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Quyền quản trị bài giảng: Đang kích hoạt</span>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleRelock}
                  className="px-4 py-2.5 rounded-xl border border-cyan-300/30 bg-white/[0.06] text-xs font-bold text-cyan-100 hover:bg-cyan-400/15 hover:border-cyan-300/60 hover:shadow-[0_0_14px_rgba(34,211,238,0.3)] flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Khóa lại</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 hover:brightness-110 text-slate-950 text-xs font-black shadow-[0_0_20px_rgba(34,211,238,0.38)] active:scale-95 transition-all cursor-pointer"
                >
                  Đóng cửa sổ
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUnlock} className="space-y-4">
              <p className="text-xs text-cyan-100/85 leading-relaxed">
                Để phục vụ thầy cô giảng dạy hoặc duyệt nhanh toàn bộ giáo án mà không cần làm tuần tự từng bài, hãy nhập mật mã giáo viên.
              </p>

              <div>
                <label className="block text-xs font-black text-cyan-200 tracking-wide mb-1.5">
                  Mật khẩu giáo viên (4 chữ số):
                </label>
                <div className="relative">
                  <input
                    type="password"
                    maxLength={10}
                    autoFocus
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setErrorMsg(null);
                    }}
                    placeholder="Nhập mật khẩu..."
                    className="w-full px-4 py-3 text-center text-lg tracking-widest font-black rounded-2xl bg-[#050A1F] border border-cyan-300/35 text-white placeholder:text-slate-500 focus:border-cyan-300 focus:shadow-[0_0_18px_rgba(34,211,238,0.3)] focus:outline-none"
                  />
                  <KeyRound className="w-5 h-5 text-cyan-300/70 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-400/45 text-xs font-bold text-rose-200 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {showSuccessToast && (
                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-400/45 text-xs font-black text-emerald-200 flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Mở khóa thành công! Chế độ giáo viên đã kích hoạt.</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-cyan-200/75 hover:text-white hover:bg-white/[0.06] transition-all cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 hover:brightness-110 text-slate-950 font-black text-xs shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_28px_rgba(34,211,238,0.65)] active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Mở Khóa Toàn Bộ</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

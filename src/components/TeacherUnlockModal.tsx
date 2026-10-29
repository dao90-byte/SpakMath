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
      setErrorMsg('Mật khẩu không chính xác. Mật khẩu chuẩn dành cho giáo viên là: 7979');
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
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border-4 border-amber-400 max-w-md w-full overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-inner">
              🔑
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-black/20 text-amber-200 px-2 py-0.5 rounded-full">
                Dành Riêng Cho Giáo Viên
              </span>
              <h3 className="text-base font-black">Cổng Mở Khóa Giáo Viên</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-xl hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {isCurrentlyUnlocked ? (
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <Unlock className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-black text-slate-900">
                  Chế Độ Giáo Viên Đang Bật
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Toàn bộ các bài tập và các bài kiểm tra định kỳ đã được mở khóa tự do để thầy cô tiện kiểm tra bài giảng và duyệt nhanh nội dung.
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-xs font-bold text-emerald-800 flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Quyền quản trị bài giảng: Đang kích hoạt</span>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleRelock}
                  className="px-4 py-2.5 rounded-xl border-2 border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-2 transition-all active:scale-95"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Khóa lại (Về chế độ học sinh)</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black shadow-md active:scale-95 transition-all"
                >
                  Đóng cửa sổ
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUnlock} className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Để phục vụ thầy cô giảng dạy hoặc duyệt nhanh toàn bộ giáo án mà không cần học sinh phải làm từng bài tập tuần tự, hãy nhập mật mã giáo viên.
              </p>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
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
                    placeholder="Nhập 7979..."
                    className="w-full px-4 py-3 text-center text-lg tracking-widest font-black rounded-2xl border-2 border-slate-300 focus:border-amber-500 focus:outline-none"
                  />
                  <KeyRound className="w-5 h-5 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {showSuccessToast && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-black text-emerald-800 flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Mở khóa thành công! Chế độ giáo viên đã kích hoạt.</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs shadow-md active:scale-95 transition-all flex items-center gap-2"
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

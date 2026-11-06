import React, { useState } from 'react';
import { sound } from '../utils/soundEffects';
import {
  Volume2,
  VolumeX,
  Pencil,
  Star,
  Award,
  Compass,
  BookOpen,
  BookMarked,
  Bug,
  Brain,
  KeyRound,
  ClipboardCheck
} from 'lucide-react';

interface NavbarProps {
  currentTab: 'map' | 'lessons' | 'periodic' | 'review' | 'assessment';
  onSelectTab: (tab: 'map' | 'lessons' | 'periodic' | 'review' | 'assessment') => void;
  programMode: 'thinking' | 'textbook';
  onToggleProgramMode: (mode: 'thinking' | 'textbook') => void;
  onOpenScratchpad: () => void;
  onOpenMistakes?: () => void;
  onOpenDevConsole?: () => void;
  onOpenMethodology?: () => void;
  onOpenTeacherUnlock?: () => void;
  isTeacherMode?: boolean;
  starsCount: number;
  unresolvedMistakesCount?: number;
  programErrorsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  programMode,
  onToggleProgramMode,
  onOpenScratchpad,
  onOpenMistakes,
  onOpenDevConsole,
  onOpenMethodology,
  onOpenTeacherUnlock,
  isTeacherMode = false,
  starsCount,
  unresolvedMistakesCount = 0,
  programErrorsCount = 0
}) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  const handleToggleSound = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
  };

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md transition-colors duration-500 border-b ${
      programMode === 'textbook'
        ? 'bg-[#0B0F19]/90 border-cyan-500/30 text-white shadow-[0_4px_25px_rgba(0,0,0,0.5)]'
        : 'bg-white/95 border-slate-200 text-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 md:gap-6 px-4 md:px-6 py-2.5">
        {/* Zone 1: Single text element Brand title & Program Switcher */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              if (programMode === 'thinking') {
                onSelectTab('map');
              }
            }}
            className="flex items-center gap-2 text-left shrink-0 hover:opacity-90 transition-opacity"
          >
            <span className="text-2xl md:text-3xl">
              {programMode === 'thinking' ? '✨' : '🪐'}
            </span>
            <div>
              {programMode === 'thinking' ? (
                <>
                  <span className="text-base md:text-xl font-black font-display tracking-tight text-amber-600 block leading-tight">
                    Spark Math
                  </span>
                  <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Toán Tư Duy Lớp 3
                  </span>
                </>
              ) : (
                <>
                  <span className="text-base md:text-xl font-black font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 block leading-tight">
                    Vũ Trụ Toán 3
                  </span>
                  <span className="text-[10px] md:text-xs font-bold text-cyan-400/80 uppercase tracking-wider block font-mono">
                    Hệ Mặt Trời Tri Thức
                  </span>
                </>
              )}
            </div>
          </button>

          {/* Dedicated Program Mode Switcher */}
          <div className={`flex items-center p-0.5 sm:p-1 rounded-xl border text-xs font-black transition-colors ${
            programMode === 'textbook'
              ? 'bg-slate-900/90 border-cyan-500/40 text-slate-300'
              : 'bg-slate-100 border-slate-200 text-slate-600'
          }`}>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onToggleProgramMode('thinking');
              }}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                programMode === 'thinking'
                  ? 'bg-white text-amber-700 shadow-xs ring-1 ring-slate-200'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🧠</span>
              <span className="hidden md:inline">Toán Tư Duy</span>
              <span className="md:hidden">Tư Duy</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onToggleProgramMode('textbook');
              }}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                programMode === 'textbook'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🚀</span>
              <span className="hidden md:inline">Vũ Trụ SGK 3</span>
              <span className="md:hidden">Vũ Trụ</span>
              <span className="hidden sm:inline text-[9px] font-black bg-cyan-950/80 text-cyan-300 px-1.5 py-0.2 rounded-full uppercase border border-cyan-400/40 font-mono">
                NEON
              </span>
            </button>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="flex items-center gap-1.5 sm:gap-3 md:gap-5 text-xs md:text-sm font-bold text-slate-600 overflow-x-auto py-1 scrollbar-none">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onSelectTab('map');
            }}
            className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 ${
              currentTab === 'map'
                ? 'text-amber-600 border-b-2 border-amber-500'
                : 'hover:text-slate-900'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span className="hidden sm:inline">Bản đồ</span> Phiêu lưu
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onSelectTab('lessons');
            }}
            className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 ${
              currentTab === 'lessons'
                ? 'text-amber-600 border-b-2 border-amber-500'
                : 'hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Sách</span> Bài tập
          </button>

          {/* Dedicated Tab: Bài Kiểm Tra Định Kỳ */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onSelectTab('periodic');
            }}
            className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 ${
              currentTab === 'periodic'
                ? 'text-amber-600 border-b-2 border-amber-500 font-black'
                : 'hover:text-slate-900'
            }`}
            title="Thanh Bài Kiểm Tra Định Kỳ (Sau Mỗi Cụm Mô Hình Tư Duy)"
          >
            <ClipboardCheck className="w-4 h-4 text-amber-600" />
            <span>Kiểm Tra Định Kỳ</span>
          </button>

          {/* Sổ Ôn Tập: Permanent Navigation Tab */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onSelectTab('review');
            }}
            className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 relative ${
              currentTab === 'review'
                ? 'text-amber-600 border-b-2 border-amber-500'
                : 'hover:text-slate-900'
            }`}
            title="Sổ Ôn Tập & Khắc Phục Lỗi Sai"
          >
            <BookMarked className="w-4 h-4 text-rose-500" />
            <span>Sổ Ôn Tập</span>
            {unresolvedMistakesCount > 0 && (
              <span className="bg-rose-500 text-white font-black text-[10px] px-1.5 py-0.2 rounded-full leading-tight shrink-0 shadow-xs animate-bounce-slow">
                {unresolvedMistakesCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onSelectTab('assessment');
            }}
            className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 ${
              currentTab === 'assessment'
                ? 'text-amber-600 border-b-2 border-amber-500'
                : 'hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4" />
            <span className="hidden sm:inline">Nhật ký</span> Tự đánh giá
          </button>
        </nav>

        {/* Zone 3: Star Counter & Primary Action */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* Star counter */}
          <div className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full font-black text-amber-900 text-xs md:text-sm">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500 animate-spin-slow" />
            <span className="tabular-nums">{starsCount}</span>
          </div>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={handleToggleSound}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200"
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          </button>

          {/* Unified Error Center Button */}
          {onOpenDevConsole && (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onOpenDevConsole();
              }}
              className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95 ${
                programErrorsCount > 0
                  ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-300 ring-2 ring-rose-200'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
              title="Trung tâm chẩn đoán & báo lỗi (lập trình, logic, hiển thị, tương tác)"
            >
              <Bug className={`w-3.5 h-3.5 ${programErrorsCount > 0 ? 'text-rose-600 animate-pulse' : 'text-slate-500'}`} />
              <span className="hidden lg:inline">Báo & Bắt Lỗi</span>
              {programErrorsCount > 0 && (
                <span className="bg-rose-600 text-white font-black text-[10px] px-1.5 py-0.2 rounded-full leading-tight shrink-0">
                  {programErrorsCount}
                </span>
              )}
            </button>
          )}

          {/* Teacher Unlock Mode Button */}
          {onOpenTeacherUnlock && (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onOpenTeacherUnlock();
              }}
              className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95 ${
                isTeacherMode
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-2 ring-emerald-200 shadow-xs'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
              }`}
              title="Cổng dành cho giáo viên"
            >
              <KeyRound className={`w-3.5 h-3.5 ${isTeacherMode ? 'text-emerald-600' : 'text-amber-600'}`} />
              <span className="hidden sm:inline">Giáo Viên</span>
              {isTeacherMode && (
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-emerald-600 text-white">
                  ĐÃ MỞ
                </span>
              )}
            </button>
          )}

          {/* Primary Action Button: Bảng Vẽ Nháp */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenScratchpad();
            }}
            className="px-3.5 py-2 text-xs md:text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl shadow-sm transition-transform active:scale-95 flex items-center gap-1.5 whitespace-nowrap"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>Bảng Vẽ Nháp</span>
          </button>
        </div>
      </div>
    </header>
  );
};

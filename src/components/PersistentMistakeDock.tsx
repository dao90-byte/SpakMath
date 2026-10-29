import React, { useState } from 'react';
import { BookMarked, Brain, ChevronDown, ChevronUp, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface PersistentMistakeDockProps {
  unresolvedCount: number;
  onOpenMistakes: () => void;
  onOpenMethodology: () => void;
}

export const PersistentMistakeDock: React.FC<PersistentMistakeDockProps> = ({
  unresolvedCount,
  onOpenMistakes,
  onOpenMethodology
}) => {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <aside aria-label="Khay công cụ hỗ trợ tư duy và lỗi sai" className="fixed bottom-5 right-5 z-40 select-none flex flex-col items-end gap-2 pointer-events-auto">
      {/* Minimized Floating Button */}
      {isMinimized ? (
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setIsMinimized(false);
          }}
          className="p-3 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white rounded-full shadow-2xl flex items-center justify-center border-2 border-white/80 active:scale-95 transition-all animate-bounce-slow"
          title="Mở thanh Sổ Lỗi Sai & Kiểm Tra Phương Pháp Luận"
        >
          <BookMarked className="w-5 h-5" />
          {unresolvedCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow">
              {unresolvedCount}
            </span>
          )}
        </button>
      ) : (
        <div className="bg-white/95 backdrop-blur-md border-2 border-slate-300/80 shadow-2xl rounded-2xl p-2.5 flex flex-col gap-2 max-w-xs ring-4 ring-black/5 animate-fade-in">
          {/* Header row with minimize button */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-1.5 px-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Luôn Sẵn Sàng Hỗ Trợ
            </span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsMinimized(true);
              }}
              className="text-slate-400 hover:text-slate-700 p-0.5 rounded-lg"
              title="Thu nhỏ thanh này"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Button 1: SỔ LỖI SAI (LUÔN HIỂN THỊ) */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenMistakes();
            }}
            className={`w-full px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between gap-3 shadow-xs transition-all active:scale-95 ${
              unresolvedCount > 0
                ? 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white ring-2 ring-rose-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <BookMarked className="w-4 h-4 text-white shrink-0" />
              <div className="text-left">
                <span className="block font-black leading-tight">📖 Sổ Lỗi Sai</span>
                <span className="text-[10px] opacity-90 block font-normal">
                  {unresolvedCount > 0 ? `${unresolvedCount} bài cần khắc phục` : 'Chưa có lỗi tồn đọng'}
                </span>
              </div>
            </div>
            <div className="shrink-0">
              {unresolvedCount > 0 ? (
                <span className="bg-white text-rose-600 text-xs font-black px-2 py-0.5 rounded-full shadow-xs animate-pulse">
                  {unresolvedCount}
                </span>
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              )}
            </div>
          </button>

          {/* Button 2: BÀI KIỂM TRA PHƯƠNG PHÁP LUẬN TƯ DUY (MẪU THỬ CHO NGƯỜI DÙNG) */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenMethodology();
            }}
            className="w-full px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs flex items-center justify-between gap-2 shadow-xs transition-all active:scale-95"
          >
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-amber-200 shrink-0" />
              <div className="text-left">
                <span className="block font-black leading-tight">🧪 Kiểm Tra Phương Pháp Luận</span>
                <span className="text-[10px] text-amber-100 block font-normal">Mô hình So sánh Hơn - Kém</span>
              </div>
            </div>
            <span className="text-[10px] bg-amber-900/40 text-amber-200 px-1.5 py-0.5 rounded font-black shrink-0">
              MẪU
            </span>
          </button>
        </div>
      )}
    </aside>
  );
};

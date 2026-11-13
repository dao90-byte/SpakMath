import React, { useState } from 'react';
import { InMonthVisualModelConfig } from '../../data/inMonthNovemberData';
import {
  Eye,
  Ruler,
  Scissors,
  Zap,
  X,
} from 'lucide-react';

interface InMonthVisualModelsProps {
  model: InMonthVisualModelConfig;
  isAnswered?: boolean;
}

const CosmicHoloCorner = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 180 120"
    className="pointer-events-none absolute -top-2 -right-2 w-44 h-28 opacity-45"
  >
    <circle cx="150" cy="18" r="64" fill="none" stroke="rgba(34,211,238,0.25)" strokeWidth="1" strokeDasharray="4 6" />
    <circle cx="150" cy="18" r="92" fill="none" stroke="rgba(251,191,36,0.16)" strokeWidth="1" />
    <circle cx="96" cy="26" r="1.5" fill="#67E8F9" />
    <circle cx="132" cy="54" r="1.8" fill="#FDE68A" />
    <circle cx="164" cy="40" r="1.2" fill="#FFFFFF" />
  </svg>
);

export const InMonthVisualModels: React.FC<InMonthVisualModelsProps> = ({
  model,
  isAnswered = false,
}) => {
  const [selectedBarIdx, setSelectedBarIdx] = useState<number | null>(null);
  const [highlightedGroupIdx, setHighlightedGroupIdx] = useState<number | null>(null);
  const [showIntervalMarkers, setShowIntervalMarkers] = useState<boolean>(true);

  if (model.type === 'bar_model') {
    const bars = model.bars || [];
    const maxUnits = Math.max(...bars.map((b) => b.units), 1);

    return (
      <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_rgba(56,189,248,0.18),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(168,85,247,0.14),_transparent_55%),linear-gradient(160deg,_rgba(15,24,68,0.97),_rgba(8,13,40,0.99))] backdrop-blur-2xl rounded-3xl border border-cyan-300/40 p-5 sm:p-6 shadow-[0_26px_65px_rgba(3,7,24,0.8),inset_0_1px_0_rgba(255,255,255,0.14)] text-white">
        <CosmicHoloCorner />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-6 h-[2.5px] rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 shadow-[0_0_16px_rgba(34,211,238,0.65)]"
        />
        {model.totalBracketLabel && (
          <div className="relative z-10 flex items-center justify-end mb-4 pb-3 border-b border-white/10">
            <div className="px-3.5 py-1.5 rounded-xl bg-amber-400/20 border border-amber-300/60 text-amber-200 text-xs font-black tabular-nums shadow-[0_0_16px_rgba(251,191,36,0.2)]">
              {model.totalBracketLabel}
            </div>
          </div>
        )}

        <div className="relative z-10 space-y-3.5 my-2">
          {bars.map((bar, bIdx) => {
            const isSelected = selectedBarIdx === bIdx;
            return (
              <button
                key={bIdx}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedBarIdx(isSelected ? null : bIdx)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-900/80 to-purple-900/60 border-amber-300 shadow-[0_0_24px_rgba(251,191,36,0.28)]'
                    : 'bg-[#080E2B]/85 border-indigo-400/25 hover:border-cyan-300/65 hover:bg-[#0D153F]/90'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <span className="text-xs sm:text-sm font-extrabold text-white flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full inline-block shrink-0 ring-2 ring-white/45 shadow-sm"
                      style={{ backgroundColor: bar.color }}
                      aria-hidden="true"
                    />
                    <span>{bar.label}</span>
                  </span>
                </div>

                <div className="flex gap-1.5">
                  {Array.from({ length: Math.min(bar.units, 12) }).map((_, sIdx) => {
                    const widthPct = Math.max(
                      8,
                      Math.floor((1 / Math.max(maxUnits, bar.units)) * 100)
                    );
                    return (
                      <div
                        key={sIdx}
                        style={{
                          width: `${widthPct}%`,
                          backgroundColor: bar.color,
                        }}
                        className="relative overflow-hidden h-11 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_12px_rgba(0,0,0,0.3)] border border-white/35 tabular-nums px-1 truncate"
                      >
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent"
                        />
                        <span className="relative z-10 truncate">
                          {sIdx === 0 ? bar.valueLabel : `1 phần`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </button>
            );
          })}
        </div>

        {model.differenceBracketLabel && (
          <div className="relative z-10 mt-4 pt-3.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-500/25 to-purple-500/20 text-pink-100 border border-pink-400/50 font-black tabular-nums inline-flex items-center gap-1.5 shadow-[0_0_18px_rgba(236,72,153,0.2)]">
              <Zap className="w-4 h-4 text-pink-300" aria-hidden="true" />
              <span>{model.differenceBracketLabel}</span>
            </span>
          </div>
        )}
      </div>
    );
  }

  if (model.type === 'remainder_groups') {
    const quotient = model.quotient ?? 1;
    const divisor = model.divisor ?? 1;
    const remainder = model.remainder ?? 0;
    const dividend = model.dividend ?? quotient * divisor + remainder;
    const groupLabel = model.groupLabel || 'Nhóm';
    const itemIcon = model.itemIcon || '⭐';
    const displayGroups = Math.min(quotient, 10);
    const hasMoreGroups = quotient > 10;

    return (
      <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_rgba(56,189,248,0.18),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(251,191,36,0.12),_transparent_55%),linear-gradient(160deg,_rgba(15,24,68,0.97),_rgba(8,13,40,0.99))] backdrop-blur-2xl rounded-3xl border border-cyan-300/40 p-5 sm:p-6 shadow-[0_26px_65px_rgba(3,7,24,0.8),inset_0_1px_0_rgba(255,255,255,0.14)] text-white">
        <CosmicHoloCorner />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-6 h-[2.5px] rounded-full bg-gradient-to-r from-sky-300 via-cyan-400 to-amber-300 shadow-[0_0_16px_rgba(34,211,238,0.65)]"
        />
        <div className="relative z-10 flex items-center justify-end mb-4 pb-3 border-b border-white/10">
          <span className="px-3.5 py-1.5 rounded-xl bg-cyan-400/20 border border-cyan-300/55 text-cyan-100 text-xs font-black tabular-nums shadow-[0_0_16px_rgba(34,211,238,0.2)]">
            {dividend} : {divisor}
          </span>
        </div>

        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 my-3">
          {Array.from({ length: displayGroups }).map((_, gIdx) => {
            const isHighlighted = highlightedGroupIdx === gIdx;
            return (
              <button
                key={gIdx}
                type="button"
                aria-pressed={isHighlighted}
                onClick={() => setHighlightedGroupIdx(isHighlighted ? null : gIdx)}
                className={`p-3 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer min-h-[76px] ${
                  isHighlighted
                    ? 'bg-gradient-to-br from-cyan-500/30 to-indigo-600/30 border-amber-300 shadow-[0_0_22px_rgba(34,211,238,0.38)]'
                    : 'bg-[#080E2B]/85 border-indigo-400/25 hover:border-cyan-300/65 hover:bg-[#0D153F]/90'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-cyan-200 mb-1.5">
                  <span className="capitalize">
                    {groupLabel} {gIdx + 1}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 text-xs">
                  {Array.from({ length: Math.min(divisor, 10) }).map((__, dotIdx) => (
                    <span key={dotIdx}>{itemIcon}</span>
                  ))}
                </div>
              </button>
            );
          })}

          {hasMoreGroups && (
            <div className="p-3 rounded-2xl border-2 border-dashed border-cyan-300/45 bg-cyan-500/12 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-black text-cyan-200 tabular-nums">
                + {quotient - displayGroups} {groupLabel}
              </span>
              <span className="text-[11px] text-cyan-300/80 font-medium tabular-nums">
                (Tổng {quotient} nhóm)
              </span>
            </div>
          )}

          {remainder > 0 && (
            <div className="p-3 rounded-2xl border-2 border-amber-300/65 bg-gradient-to-br from-amber-500/22 to-orange-500/12 flex flex-col justify-between shadow-[0_0_20px_rgba(251,191,36,0.2)]">
              <div className="flex items-center justify-between text-[11px] font-black text-amber-200 mb-1.5">
                <span>Dư lẻ</span>
              </div>
              <div className="flex flex-wrap gap-1 text-xs">
                {Array.from({ length: Math.min(remainder, 10) }).map((_, rIdx) => (
                  <span key={rIdx}>{itemIcon}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (model.type === 'interval_model') {
    const subtype = model.intervalSubtype || 'both_ends';
    const intervals = model.intervalsCount ?? 5;
    const stepLen = model.stepLength ?? 4;
    const totalLen = model.totalLength ?? intervals * stepLen;
    const objectsCount = model.objectsCount ?? intervals + 1;
    const unit = model.unitLabel || 'm';
    const objIcon = model.objectIcon || '🌲';

    const previewIntervals = Math.min(intervals, 8);

    return (
      <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_rgba(52,211,153,0.18),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(34,211,238,0.14),_transparent_55%),linear-gradient(160deg,_rgba(15,24,68,0.97),_rgba(8,13,40,0.99))] backdrop-blur-2xl rounded-3xl border border-emerald-300/40 p-5 sm:p-6 shadow-[0_26px_65px_rgba(3,7,24,0.8),inset_0_1px_0_rgba(255,255,255,0.14)] text-white">
        <CosmicHoloCorner />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-6 h-[2.5px] rounded-full bg-gradient-to-r from-emerald-300 via-teal-400 to-cyan-400 shadow-[0_0_16px_rgba(52,211,153,0.65)]"
        />
        <div className="relative z-10 flex items-center justify-end mb-4 pb-3 border-b border-white/10">
          <button
            type="button"
            aria-pressed={showIntervalMarkers}
            onClick={() => setShowIntervalMarkers(!showIntervalMarkers)}
            className="px-3.5 py-2 rounded-xl bg-emerald-400/18 hover:bg-emerald-400/28 text-emerald-200 border border-emerald-300/45 text-xs font-bold flex items-center gap-1.5 transition-colors duration-200 cursor-pointer min-h-[38px]"
          >
            <Eye className="w-4 h-4" aria-hidden="true" />
            <span>{showIntervalMarkers ? 'Đang hiện khoảng' : 'Hiện khoảng'}</span>
          </button>
        </div>

        <div className="relative z-10 my-4 p-4 rounded-2xl bg-[#080E2B]/85 border border-emerald-400/30 overflow-x-auto shadow-inner">
          <div className="min-w-[360px] flex items-center justify-between relative py-4 px-3">
            <div className="absolute left-4 right-4 h-1.5 bg-gradient-to-r from-emerald-400 via-cyan-300 to-emerald-400 rounded-full top-1/2 -translate-y-1/2 shadow-[0_0_16px_rgba(52,211,153,0.6)]" />
            {Array.from({ length: previewIntervals + 1 }).map((_, idx) => {
              const isStart = idx === 0;
              const isEnd = idx === previewIntervals;
              const hasPoint =
                subtype === 'both_ends' ||
                subtype === 'stairs' ||
                (subtype === 'one_end' && !isStart) ||
                (subtype === 'neither_end' && !isStart && !isEnd) ||
                subtype === 'closed_loop' ||
                (subtype === 'wood_cuts' && !isStart && !isEnd);

              return (
                <div key={idx} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black shadow-md border-2 ${
                      hasPoint
                        ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 border-white ring-4 ring-emerald-400/25'
                        : 'bg-slate-800 text-slate-400 border-slate-600'
                    }`}
                  >
                    {subtype === 'wood_cuts' ? (
                      hasPoint ? (
                        <Scissors className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        '|'
                      )
                    ) : subtype === 'stairs' ? (
                      `T${idx + 1}`
                    ) : hasPoint ? (
                      objIcon
                    ) : (
                      <X className="w-4 h-4" aria-hidden="true" />
                    )}
                  </div>
                  {showIntervalMarkers && idx < previewIntervals && (
                    <span className="mt-2 px-2 py-0.5 rounded-lg bg-[#0D1640] border border-emerald-400/45 text-[11px] font-extrabold text-emerald-200 tabular-nums shadow-sm">
                      {stepLen} {unit}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          {intervals > previewIntervals && (
            <p className="text-center text-xs text-emerald-200 font-semibold mt-1 tabular-nums">
              Mô hình có <strong>{intervals} khoảng</strong> • Mỗi khoảng <strong>{stepLen} {unit}</strong>
            </p>
          )}
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-2.5 text-center">
          <div className="p-3 rounded-2xl bg-[#080E2B]/85 border border-white/10">
            <div className="text-[11px] text-indigo-200 font-semibold">1 khoảng</div>
            <div className="text-sm font-black text-white tabular-nums mt-0.5">
              {stepLen} {unit}
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-[#080E2B]/85 border border-emerald-400/25">
            <div className="text-[11px] text-indigo-200 font-semibold">Số khoảng</div>
            <div className="text-sm font-black text-emerald-300 tabular-nums mt-0.5">
              {isAnswered ? intervals : '?'} khoảng
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-[#080E2B]/85 border border-amber-400/25">
            <div className="text-[11px] text-indigo-200 font-semibold">Tổng / Số mốc</div>
            <div className="text-sm font-black text-amber-300 tabular-nums mt-0.5">
              {isAnswered ? `${totalLen} ${unit} (${objectsCount})` : 'Đang tính'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // measurement_lab

  const chartItems = model.chartItems || [];
  const maxVal = Math.max(...chartItems.map((i) => i.value), 1);

  return (
    <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_rgba(192,132,252,0.18),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(34,211,238,0.14),_transparent_55%),linear-gradient(160deg,_rgba(15,24,68,0.97),_rgba(8,13,40,0.99))] backdrop-blur-2xl rounded-3xl border border-purple-300/40 p-5 sm:p-6 shadow-[0_26px_65px_rgba(3,7,24,0.8),inset_0_1px_0_rgba(255,255,255,0.14)] text-white">
      <CosmicHoloCorner />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-6 h-[2.5px] rounded-full bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-300 shadow-[0_0_16px_rgba(192,132,252,0.65)]"
      />
      {model.conversionRule && (
        <div className="relative z-10 flex items-center justify-end mb-4 pb-3 border-b border-white/10">
          <span className="px-3.5 py-1.5 rounded-xl bg-purple-400/20 border border-purple-300/55 text-purple-100 text-xs font-black tabular-nums inline-flex items-center gap-1.5 shadow-[0_0_16px_rgba(192,132,252,0.2)]">
            <Ruler className="w-3.5 h-3.5 text-purple-300" aria-hidden="true" />
            <span>{model.conversionRule}</span>
          </span>
        </div>
      )}

      {(model.primaryReading || model.secondaryReading) && (
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          {model.primaryReading && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-cyan-500/18 to-blue-500/10 border border-cyan-300/45 shadow-inner">
              <div className="text-[11px] font-bold text-cyan-300 uppercase">Thông số 1</div>
              <div className="text-sm font-black text-white mt-0.5 tabular-nums">
                {model.primaryReading}
              </div>
            </div>
          )}
          {model.secondaryReading && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/18 to-orange-500/10 border border-amber-300/45 shadow-inner">
              <div className="text-[11px] font-bold text-amber-300 uppercase">Thông số 2</div>
              <div className="text-sm font-black text-white mt-0.5 tabular-nums">
                {model.secondaryReading}
              </div>
            </div>
          )}
        </div>
      )}

      {chartItems.length > 0 && (
        <div className="relative z-10 space-y-3 my-2">
          {chartItems.map((item, idx) => {
            const widthPct = Math.max(
              14,
              Math.min(100, Math.round((item.value / maxVal) * 100))
            );
            return (
              <div key={idx} className="p-3.5 rounded-2xl bg-[#080E2B]/85 border border-white/10">
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <span className="text-indigo-100">{item.label}</span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-white/10 border border-white/15 text-amber-300 font-black tabular-nums">
                    {item.value} {item.unit}
                  </span>
                </div>
                <div className="w-full h-5 bg-slate-900 rounded-xl overflow-hidden p-0.5 border border-white/10">
                  <div
                    style={{ width: `${widthPct}%`, backgroundColor: item.color }}
                    className="h-full rounded-lg transition-all duration-300 shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

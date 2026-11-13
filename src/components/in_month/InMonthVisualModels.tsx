import React, { useState } from 'react';
import { InMonthVisualModelConfig } from '../../data/inMonthNovemberData';
import {
  Eye,
  Sparkles,
  Scale,
  Ruler,
  Beaker,
  BarChart3,
  Scissors,
  Trees,
  Repeat,
  Zap,
  X,
} from 'lucide-react';

interface InMonthVisualModelsProps {
  model: InMonthVisualModelConfig;
  isAnswered?: boolean;
}

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
      <div className="bg-[#111942]/90 backdrop-blur-xl rounded-3xl border-2 border-cyan-400/35 p-5 sm:p-6 shadow-[0_18px_42px_rgba(6,10,32,0.55)] text-white">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3.5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-slate-950 flex items-center justify-center shrink-0 shadow-md">
              <BarChart3 className="w-5 h-5" aria-hidden="true" />
            </span>
            <div>
              <h4 className="text-sm sm:text-base font-extrabold font-display text-white uppercase tracking-wide">
                {model.title || 'Sơ Đồ Thanh Singapore (CPA)'}
              </h4>
              {model.subtitle && (
                <p className="text-xs text-cyan-200/90 font-semibold">{model.subtitle}</p>
              )}
            </div>
          </div>
          {model.totalBracketLabel && (
            <div className="px-3.5 py-1.5 rounded-xl bg-amber-400/20 border border-amber-300/60 text-amber-200 text-xs font-black tabular-nums">
              {model.totalBracketLabel}
            </div>
          )}
        </div>

        <div className="space-y-3 my-2">
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
                    ? 'bg-indigo-900/70 border-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.25)]'
                    : 'bg-slate-900/75 border-indigo-400/25 hover:border-cyan-300/60'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <span className="text-xs sm:text-sm font-extrabold text-white flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full inline-block shrink-0 ring-2 ring-white/40"
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
                        className="h-11 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-inner border border-white/30 tabular-nums px-1 truncate"
                      >
                        {sIdx === 0 ? bar.valueLabel : `1 phần`}
                      </div>
                    );
                  })}
                </div>
              </button>
            );
          })}
        </div>

        {model.differenceBracketLabel && (
          <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="px-3.5 py-1.5 rounded-xl bg-pink-500/20 text-pink-200 border border-pink-400/50 font-black tabular-nums inline-flex items-center gap-1.5">
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
      <div className="bg-[#111942]/90 backdrop-blur-xl rounded-3xl border-2 border-cyan-400/35 p-5 sm:p-6 shadow-[0_18px_42px_rgba(6,10,32,0.55)] text-white">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3.5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 text-slate-950 flex items-center justify-center shrink-0 shadow-md">
              <Repeat className="w-5 h-5" aria-hidden="true" />
            </span>
            <div>
              <h4 className="text-sm sm:text-base font-extrabold font-display text-white uppercase tracking-wide">
                {model.title || 'Mô Hình Nhóm & Số Dư'}
              </h4>
              <p className="text-xs text-cyan-200/90 font-semibold">
                {model.subtitle ||
                  `Tổng ${dividend} ${itemIcon} chia vào các ${groupLabel} (mỗi nhóm ${divisor})`}
              </p>
            </div>
          </div>
          <span className="px-3.5 py-1.5 rounded-xl bg-cyan-400/20 border border-cyan-300/50 text-cyan-200 text-xs font-black tabular-nums">
            {dividend} : {divisor}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 my-3">
          {Array.from({ length: displayGroups }).map((_, gIdx) => {
            const isHighlighted = highlightedGroupIdx === gIdx;
            return (
              <button
                key={gIdx}
                type="button"
                aria-pressed={isHighlighted}
                onClick={() => setHighlightedGroupIdx(isHighlighted ? null : gIdx)}
                className={`p-3 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer min-h-[72px] ${
                  isHighlighted
                    ? 'bg-cyan-500/25 border-amber-300 shadow-[0_0_16px_rgba(34,211,238,0.3)]'
                    : 'bg-slate-900/75 border-indigo-400/25 hover:border-cyan-300/60'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-indigo-200 mb-1.5">
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
            <div className="p-3 rounded-2xl border-2 border-dashed border-cyan-400/40 bg-cyan-500/10 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-black text-cyan-200 tabular-nums">
                + {quotient - displayGroups} {groupLabel}
              </span>
              <span className="text-[11px] text-cyan-300/80 font-medium tabular-nums">
                (Tổng {quotient} nhóm)
              </span>
            </div>
          )}

          {remainder > 0 && (
            <div className="p-3 rounded-2xl border-2 border-amber-400/60 bg-amber-400/15 flex flex-col justify-between">
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

    const modeLabels: Record<
      NonNullable<InMonthVisualModelConfig['intervalSubtype']>,
      { title: string; rule: string; icon: React.ReactNode }
    > = {
      both_ends: {
        title: 'Trồng Cây Cả 2 Đầu Đường',
        rule: 'Số cây = Số khoảng + 1',
        icon: <Trees className="w-5 h-5" aria-hidden="true" />,
      },
      one_end: {
        title: 'Trồng Cây 1 Đầu Đường',
        rule: 'Số cây = Số khoảng',
        icon: <Trees className="w-5 h-5" aria-hidden="true" />,
      },
      neither_end: {
        title: 'Không Trồng Ở 2 Đầu Đường',
        rule: 'Số cây = Số khoảng - 1',
        icon: <Trees className="w-5 h-5" aria-hidden="true" />,
      },
      closed_loop: {
        title: 'Đường Khép Kín (Quanh Hồ)',
        rule: 'Số cây = Số khoảng',
        icon: <Repeat className="w-5 h-5" aria-hidden="true" />,
      },
      wood_cuts: {
        title: 'Bài Toán Cưa Gỗ',
        rule: 'Số đoạn = Số lần cưa + 1',
        icon: <Scissors className="w-5 h-5" aria-hidden="true" />,
      },
      stairs: {
        title: 'Leo Cầu Thang Giữa Các Tầng',
        rule: 'Số khoảng tầng = Tầng đến - Tầng xuất phát',
        icon: <Sparkles className="w-5 h-5" aria-hidden="true" />,
      },
    };

    const meta = modeLabels[subtype];
    const previewIntervals = Math.min(intervals, 8);

    return (
      <div className="bg-[#111942]/90 backdrop-blur-xl rounded-3xl border-2 border-emerald-400/35 p-5 sm:p-6 shadow-[0_18px_42px_rgba(6,10,32,0.55)] text-white">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3.5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 flex items-center justify-center shrink-0 shadow-md">
              {meta.icon}
            </span>
            <div>
              <h4 className="text-sm sm:text-base font-extrabold font-display text-white uppercase tracking-wide">
                {model.title || meta.title}
              </h4>
              <p className="text-xs text-emerald-300 font-bold">
                {model.subtitle || meta.rule}
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-pressed={showIntervalMarkers}
            onClick={() => setShowIntervalMarkers(!showIntervalMarkers)}
            className="px-3.5 py-2 rounded-xl bg-emerald-400/15 hover:bg-emerald-400/25 text-emerald-200 border border-emerald-400/40 text-xs font-bold flex items-center gap-1.5 transition-colors duration-200 cursor-pointer min-h-[38px]"
          >
            <Eye className="w-4 h-4" aria-hidden="true" />
            <span>{showIntervalMarkers ? 'Đang hiện khoảng' : 'Hiện khoảng'}</span>
          </button>
        </div>

        <div className="my-4 p-4 rounded-2xl bg-slate-900/75 border border-emerald-400/25 overflow-x-auto">
          <div className="min-w-[360px] flex items-center justify-between relative py-4 px-3">
            <div className="absolute left-4 right-4 h-1.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 rounded-full top-1/2 -translate-y-1/2" />
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
                        ? 'bg-emerald-500 text-slate-950 border-white'
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
                    <span className="mt-2 px-2 py-0.5 rounded-lg bg-slate-800 border border-emerald-400/40 text-[11px] font-extrabold text-emerald-200 tabular-nums">
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

        <div className="grid grid-cols-3 gap-2.5 text-center">
          <div className="p-3 rounded-2xl bg-slate-900/75 border border-white/10">
            <div className="text-[11px] text-indigo-200 font-semibold">1 khoảng</div>
            <div className="text-sm font-black text-white tabular-nums mt-0.5">
              {stepLen} {unit}
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/75 border border-white/10">
            <div className="text-[11px] text-indigo-200 font-semibold">Số khoảng</div>
            <div className="text-sm font-black text-emerald-300 tabular-nums mt-0.5">
              {isAnswered ? intervals : '?'} khoảng
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/75 border border-white/10">
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
  const mSubtype = model.measurementSubtype || 'length_scale';
  const subIcons: Record<
    NonNullable<InMonthVisualModelConfig['measurementSubtype']>,
    React.ReactNode
  > = {
    length_scale: <Ruler className="w-5 h-5" aria-hidden="true" />,
    weight_balance: <Scale className="w-5 h-5" aria-hidden="true" />,
    volume_beaker: <Beaker className="w-5 h-5" aria-hidden="true" />,
    length_chart: <BarChart3 className="w-5 h-5" aria-hidden="true" />,
  };

  const chartItems = model.chartItems || [];
  const maxVal = Math.max(...chartItems.map((i) => i.value), 1);

  return (
    <div className="bg-[#111942]/90 backdrop-blur-xl rounded-3xl border-2 border-purple-400/35 p-5 sm:p-6 shadow-[0_18px_42px_rgba(6,10,32,0.55)] text-white">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3.5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-400 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
            {subIcons[mSubtype]}
          </span>
          <div>
            <h4 className="text-sm sm:text-base font-extrabold font-display text-white uppercase tracking-wide">
              {model.title || 'Phòng Thí Nghiệm Đo Lường'}
            </h4>
            {model.subtitle && (
              <p className="text-xs text-purple-200 font-semibold">{model.subtitle}</p>
            )}
          </div>
        </div>
        {model.conversionRule && (
          <span className="px-3.5 py-1.5 rounded-xl bg-purple-400/20 border border-purple-300/50 text-purple-200 text-xs font-black tabular-nums inline-flex items-center gap-1.5">
            <Ruler className="w-3.5 h-3.5 text-purple-300" aria-hidden="true" />
            <span>{model.conversionRule}</span>
          </span>
        )}
      </div>

      {(model.primaryReading || model.secondaryReading) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          {model.primaryReading && (
            <div className="p-3.5 rounded-2xl bg-cyan-500/15 border border-cyan-400/40">
              <div className="text-[11px] font-bold text-cyan-300 uppercase">Thông số 1</div>
              <div className="text-sm font-black text-white mt-0.5 tabular-nums">
                {model.primaryReading}
              </div>
            </div>
          )}
          {model.secondaryReading && (
            <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-400/40">
              <div className="text-[11px] font-bold text-amber-300 uppercase">Thông số 2</div>
              <div className="text-sm font-black text-white mt-0.5 tabular-nums">
                {model.secondaryReading}
              </div>
            </div>
          )}
        </div>
      )}

      {chartItems.length > 0 && (
        <div className="space-y-3 my-2">
          {chartItems.map((item, idx) => {
            const widthPct = Math.max(
              14,
              Math.min(100, Math.round((item.value / maxVal) * 100))
            );
            return (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-900/75 border border-white/10">
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <span className="text-indigo-100">{item.label}</span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-white/10 border border-white/15 text-amber-300 font-black tabular-nums">
                    {item.value} {item.unit}
                  </span>
                </div>
                <div className="w-full h-5 bg-slate-800 rounded-xl overflow-hidden p-0.5">
                  <div
                    style={{ width: `${widthPct}%`, backgroundColor: item.color }}
                    className="h-full rounded-lg transition-all duration-300"
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

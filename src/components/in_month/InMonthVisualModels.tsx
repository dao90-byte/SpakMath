import React, { useState } from 'react';
import { InMonthVisualModelConfig } from '../../data/inMonthNovemberData';
import { Eye, Sparkles, Scale, Ruler, Beaker, BarChart3, Scissors, Trees, Repeat } from 'lucide-react';

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
      <div className="bg-white/95 rounded-2xl border-2 border-indigo-100 p-5 shadow-sm text-slate-900">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              📊
            </span>
            <div>
              <h4 className="text-sm font-black text-slate-800 uppercase tracking-wide">
                {model.title || 'Sơ Đồ Thanh Singapore (CPA Bar Model)'}
              </h4>
              <p className="text-xs text-slate-500">
                {model.subtitle || 'Nhấn vào từng thanh để kiểm tra số phần bằng nhau'}
              </p>
            </div>
          </div>
          {model.totalBracketLabel && (
            <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-extrabold tabular-nums">
              {model.totalBracketLabel}
            </div>
          )}
        </div>

        <div className="space-y-4 my-2">
          {bars.map((bar, bIdx) => {
            const isSelected = selectedBarIdx === bIdx;
            return (
              <div
                key={bIdx}
                onClick={() => setSelectedBarIdx(isSelected ? null : bIdx)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-50/70 border-indigo-300 shadow-sm'
                    : 'bg-slate-50/70 border-slate-200/80 hover:border-indigo-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: bar.color }}
                    />
                    {bar.label}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {bar.highlightNote && (
                      <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                        {bar.highlightNote}
                      </span>
                    )}
                    <span className="text-xs font-bold text-indigo-700 bg-white px-2 py-0.5 rounded-md border border-indigo-100 tabular-nums">
                      {bar.units} phần • {bar.valueLabel}
                    </span>
                  </div>
                </div>

                <div className="flex gap-1">
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
                        className="h-10 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-inner border border-white/30 transition-transform hover:scale-[1.02] tabular-nums px-1 truncate"
                      >
                        {sIdx === 0 ? bar.valueLabel : `1 phần`}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {model.differenceBracketLabel && (
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 font-bold tabular-nums">
              ⚡ {model.differenceBracketLabel}
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
      <div className="bg-white/95 rounded-2xl border-2 border-sky-100 p-5 shadow-sm text-slate-900">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
              <Repeat className="w-4 h-4" />
            </span>
            <div>
              <h4 className="text-sm font-black text-slate-800 uppercase tracking-wide">
                {model.title || 'Mô Hình Nhóm & Số Dư (Singapore Grouping)'}
              </h4>
              <p className="text-xs text-slate-500">
                {model.subtitle ||
                  `Tổng ${dividend} ${itemIcon} chia vào các ${groupLabel} (mỗi nhóm ${divisor})`}
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-xs font-extrabold tabular-nums">
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
                onClick={() => setHighlightedGroupIdx(isHighlighted ? null : gIdx)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isHighlighted
                    ? 'bg-sky-100/80 border-sky-400 shadow-sm'
                    : 'bg-slate-50 border-slate-200 hover:border-sky-300'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-1.5">
                  <span className="capitalize">
                    {groupLabel} {gIdx + 1}
                  </span>
                  <span className="text-sky-700 font-black tabular-nums">{divisor}</span>
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
            <div className="p-2.5 rounded-xl border border-dashed border-sky-300 bg-sky-50/50 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-black text-sky-800 tabular-nums">
                + {quotient - displayGroups} {groupLabel} nữa
              </span>
              <span className="text-[11px] text-sky-600 font-medium tabular-nums">
                (Tổng {quotient} {groupLabel} đầy)
              </span>
            </div>
          )}

          {remainder > 0 && (
            <div className="p-2.5 rounded-xl border-2 border-amber-300 bg-amber-50/90 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[11px] font-black text-amber-900 mb-1.5">
                <span>Số dư lẻ</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-200 text-amber-950 tabular-nums">
                  +{remainder}
                </span>
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
        icon: <Trees className="w-4 h-4" />,
      },
      one_end: {
        title: 'Trồng Cây 1 Đầu Đường',
        rule: 'Số cây = Số khoảng',
        icon: <Trees className="w-4 h-4" />,
      },
      neither_end: {
        title: 'Không Trồng Ở 2 Đầu Đường',
        rule: 'Số cây = Số khoảng - 1',
        icon: <Trees className="w-4 h-4" />,
      },
      closed_loop: {
        title: 'Đường Khép Kín (Quanh Hồ / Vòng Tròn)',
        rule: 'Số cây = Số khoảng',
        icon: <Repeat className="w-4 h-4" />,
      },
      wood_cuts: {
        title: 'Bài Toán Cưa Gỗ Thành Các Đoạn',
        rule: 'Số đoạn = Số lần cưa + 1',
        icon: <Scissors className="w-4 h-4" />,
      },
      stairs: {
        title: 'Bài Toán Leo Cầu Thang Giữa Các Tầng',
        rule: 'Số khoảng tầng = Tầng đến - Tầng xuất phát',
        icon: <Sparkles className="w-4 h-4" />,
      },
    };

    const meta = modeLabels[subtype];
    const previewIntervals = Math.min(intervals, 8);

    return (
      <div className="bg-white/95 rounded-2xl border-2 border-emerald-100 p-5 shadow-sm text-slate-900">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              {meta.icon}
            </span>
            <div>
              <h4 className="text-sm font-black text-slate-800 uppercase tracking-wide">
                {model.title || meta.title}
              </h4>
              <p className="text-xs text-emerald-700 font-bold">
                {model.subtitle || meta.rule}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowIntervalMarkers(!showIntervalMarkers)}
            className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            {showIntervalMarkers ? 'Đang hiện khoảng' : 'Hiện khoảng'}
          </button>
        </div>

        <div className="my-4 p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 overflow-x-auto">
          <div className="min-w-[360px] flex items-center justify-between relative py-4 px-3">
            <div className="absolute left-4 right-4 h-1.5 bg-emerald-300 rounded-full top-1/2 -translate-y-1/2" />
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
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow-xs border-2 ${
                      hasPoint
                        ? 'bg-emerald-600 text-white border-white'
                        : 'bg-slate-200 text-slate-500 border-slate-300'
                    }`}
                  >
                    {subtype === 'wood_cuts'
                      ? hasPoint
                        ? '✂️'
                        : '|'
                      : subtype === 'stairs'
                      ? `T${idx + 1}`
                      : hasPoint
                      ? objIcon
                      : '×'}
                  </div>
                  {showIntervalMarkers && idx < previewIntervals && (
                    <span className="mt-2 px-1.5 py-0.5 rounded bg-white border border-emerald-200 text-[10px] font-extrabold text-emerald-800 tabular-nums">
                      {stepLen} {unit}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          {intervals > previewIntervals && (
            <p className="text-center text-xs text-slate-600 font-semibold mt-1 tabular-nums">
              (Mô hình minh họa • Bài toán có <strong>{intervals} khoảng</strong>, mỗi khoảng <strong>{stepLen} {unit}</strong>)
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-[11px] text-slate-500 font-semibold">Độ dài 1 khoảng</div>
            <div className="text-sm font-black text-slate-800 tabular-nums">
              {stepLen} {unit}
            </div>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-[11px] text-slate-500 font-semibold">Số khoảng</div>
            <div className="text-sm font-black text-emerald-700 tabular-nums">
              {isAnswered ? intervals : '?'} khoảng
            </div>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-[11px] text-slate-500 font-semibold">Tổng / Số mốc</div>
            <div className="text-sm font-black text-indigo-700 tabular-nums">
              {isAnswered ? `${totalLen} ${unit} (${objectsCount} mốc)` : 'Đang tính'}
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
    length_scale: <Ruler className="w-4 h-4" />,
    weight_balance: <Scale className="w-4 h-4" />,
    volume_beaker: <Beaker className="w-4 h-4" />,
    length_chart: <BarChart3 className="w-4 h-4" />,
  };

  const chartItems = model.chartItems || [];
  const maxVal = Math.max(...chartItems.map((i) => i.value), 1);

  return (
    <div className="bg-white/95 rounded-2xl border-2 border-purple-100 p-5 shadow-sm text-slate-900">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
            {subIcons[mSubtype]}
          </span>
          <div>
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-wide">
              {model.title || 'Phòng Thí Nghiệm Đo Lường & Biểu Đồ'}
            </h4>
            <p className="text-xs text-slate-500">
              {model.subtitle || 'Quan sát số đo trực quan và chú ý đổi cùng đơn vị trước khi tính'}
            </p>
          </div>
        </div>
        {model.conversionRule && (
          <span className="px-3 py-1 rounded-xl bg-purple-50 border border-purple-200 text-purple-800 text-xs font-extrabold tabular-nums">
            📏 {model.conversionRule}
          </span>
        )}
      </div>

      {(model.primaryReading || model.secondaryReading) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          {model.primaryReading && (
            <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200">
              <div className="text-[11px] font-bold text-indigo-600 uppercase">Thông số 1</div>
              <div className="text-sm font-black text-slate-900 mt-0.5 tabular-nums">
                {model.primaryReading}
              </div>
            </div>
          )}
          {model.secondaryReading && (
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200">
              <div className="text-[11px] font-bold text-amber-700 uppercase">Thông số 2</div>
              <div className="text-sm font-black text-slate-900 mt-0.5 tabular-nums">
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
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-700">{item.label}</span>
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-900 font-black tabular-nums">
                    {item.value} {item.unit}
                  </span>
                </div>
                <div className="w-full h-5 bg-slate-200/70 rounded-lg overflow-hidden p-0.5">
                  <div
                    style={{ width: `${widthPct}%`, backgroundColor: item.color }}
                    className="h-full rounded-md transition-all duration-500"
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

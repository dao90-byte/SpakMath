import React, { useEffect, useMemo, useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { InMonthVisualModelConfig } from '../../data/inMonthNovemberData';
import { buildCPASpecForQuestion } from '../../utils/singaporeCPABuilder';
import type {
  AreaGridPictorialSpec,
  BarModelBarSpec,
  BarModelPictorialSpec,
  CPAConcreteGroup,
  IntervalPictorialSpec,
  MeasurementPictorialSpec,
  PerimeterPictorialSpec,
  PlaceValuePictorialSpec,
  RemainderPictorialSpec,
  SequencePatternPictorialSpec,
  SingaporeCPASpec,
} from '../../types/singaporeCPA';
import {
  ArrowLeftRight,
  CheckCircle2,
  Compass,
  Layers,
  Scale,
  Sigma,
} from 'lucide-react';
import {
  MINDMATH_OKLCH_PALETTE,
  harmonizeCpaFillColor,
  getApcaReadableInk,
} from '../../utils/oklchApcaPalette';

interface InMonthVisualModelsProps {
  model: InMonthVisualModelConfig;
  isAnswered?: boolean;
}

const CosmicHoloCorner = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 180 120"
    className="pointer-events-none absolute -top-2 -right-2 w-44 h-28 opacity-40"
  >
    <circle
      cx="150"
      cy="18"
      r="64"
      fill="none"
      stroke="rgba(34,211,238,0.22)"
      strokeWidth="1"
      strokeDasharray="4 6"
    />
    <circle cx="150" cy="18" r="92" fill="none" stroke="rgba(251,191,36,0.14)" strokeWidth="1" />
    <circle cx="96" cy="26" r="1.5" fill="#67E8F9" />
    <circle cx="132" cy="54" r="1.8" fill="#FDE68A" />
    <circle cx="164" cy="40" r="1.2" fill="#FFFFFF" />
  </svg>
);

/**
 * Generates an SVG path for a horizontal curly brace between x1 and x2 at vertical position y.
 * Pointing direction: 'down' (tip at y + height) or 'up' (tip at y - height).
 */
function buildHorizontalCurlyBracePath(
  x1: number,
  x2: number,
  y: number,
  height = 12,
  direction: 'down' | 'up' = 'down'
): string {
  const left = Math.min(x1, x2);
  const right = Math.max(x1, x2);
  const width = Math.max(right - left, 16);
  const mid = left + width / 2;
  const s = direction === 'down' ? 1 : -1;
  const h = height * s;
  const r = Math.min(10, width / 4);

  return [
    `M ${left} ${y}`,
    `Q ${left} ${y + h / 2} ${left + r} ${y + h / 2}`,
    `L ${mid - r} ${y + h / 2}`,
    `Q ${mid} ${y + h / 2} ${mid} ${y + h}`,
    `Q ${mid} ${y + h / 2} ${mid + r} ${y + h / 2}`,
    `L ${right - r} ${y + h / 2}`,
    `Q ${right} ${y + h / 2} ${right} ${y}`,
  ].join(' ');
}

/**
 * Generates an SVG path for a vertical right-facing curly brace between y1 and y2 at horizontal position x.
 */
function buildVerticalCurlyBracePath(
  x: number,
  y1: number,
  y2: number,
  width = 14
): string {
  const top = Math.min(y1, y2);
  const bottom = Math.max(y1, y2);
  const span = Math.max(bottom - top, 20);
  const mid = top + span / 2;
  const r = Math.min(10, span / 4);

  return [
    `M ${x} ${top}`,
    `Q ${x + width / 2} ${top} ${x + width / 2} ${top + r}`,
    `L ${x + width / 2} ${mid - r}`,
    `Q ${x + width / 2} ${mid} ${x + width} ${mid}`,
    `Q ${x + width / 2} ${mid} ${x + width / 2} ${mid + r}`,
    `L ${x + width / 2} ${bottom - r}`,
    `Q ${x + width / 2} ${bottom} ${x} ${bottom}`,
  ].join(' ');
}

/**
 * Renders a LaTeX expression safely using KaTeX.
 */
const KatexFormula: React.FC<{ latex: string; className?: string }> = ({ latex, className }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        throwOnError: false,
        displayMode: false,
        strict: false,
      });
    } catch {
      return latex;
    }
  }, [latex]);

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

/**
 * Clean Editorial Stage Header for Singapore Math CPA progression (zero pills, zero decorative dots).
 */
const CPAStageHeader: React.FC<{
  stepNum: string;
  stageLabel: string;
  subtitle?: string;
  icon: React.ReactNode;
  accentClass: string;
}> = ({ stepNum, stageLabel, subtitle, icon, accentClass }) => (
  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-3 pb-2 border-b border-white/10">
    <div className="flex items-center gap-2">
      <span className={`${accentClass} shrink-0`}>{icon}</span>
      <span className={`text-xs font-extrabold tracking-wide ${accentClass}`}>
        {stepNum}
      </span>
      <span className="text-white/30" aria-hidden="true">·</span>
      <h4 className="text-sm font-black text-[color:var(--mm-ink-primary)]">
        {stageLabel}
      </h4>
    </div>
    {subtitle && (
      <p className="text-xs font-medium text-[color:var(--mm-ink-secondary)]">
        {subtitle}
      </p>
    )}
  </div>
);

/**
 * Step 1: Concrete Manipulative Layer (C — Trực quan cụ thể)
 */
const CPAConcretePanel: React.FC<{
  cpaSpec: SingaporeCPASpec;
  isAnswered: boolean;
  selectedGroupIdx: number | null;
  onSelectGroup: (idx: number | null) => void;
}> = ({ cpaSpec, isAnswered, selectedGroupIdx, onSelectGroup }) => {
  const { concrete, pictorial } = cpaSpec;

  return (
    <section
      aria-label="Bước 1: Trực quan cụ thể"
      className="rounded-2xl bg-[radial-gradient(ellipse_at_top_left,_color-mix(in_oklch,var(--mm-cyan-accent)_10%,transparent),_transparent_55%),linear-gradient(145deg,_var(--mm-surface-1),_var(--mm-surface-inset))] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_60%,transparent)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_28px_rgba(3,7,24,0.45)]"
    >
      <CPAStageHeader
        stepNum="Bước 1 (C)"
        stageLabel="Trực quan cụ thể"
        subtitle={concrete.interactiveRule}
        icon={<Layers className="w-4 h-4" />}
        accentClass="text-[color:var(--mm-cyan-text)]"
      />

      {concrete.actionPrompt && (
        <p className="text-xs font-semibold text-[color:var(--mm-ink-secondary)] mb-3 leading-relaxed">
          {concrete.actionPrompt}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {concrete.groups.map((g: CPAConcreteGroup, idx: number) => {
          const isSelected = selectedGroupIdx === idx;
          const hideNumbers = !isAnswered && !!g.isUnknown;
          const hasBeforeBadge = !isAnswered && !!g.beforeSolveBadge;
          const groupFill = harmonizeCpaFillColor(g.color);
          const groupInk = getApcaReadableInk(groupFill);
          const mode =
            g.displayMode ||
            (pictorial.kind === 'remainder_groups'
              ? 'groups'
              : pictorial.kind === 'interval_model'
              ? 'interval'
              : pictorial.kind === 'measurement_lab'
              ? 'measurement'
              : 'units');

          // Determine what is masked before solving
          const isRemainderFullGroupsUnknown =
            hideNumbers &&
            pictorial.kind === 'remainder_groups' &&
            g.id === 'cg_full_groups' &&
            pictorial.unknownTarget !== 'dividend';
          const isIntervalCountUnknown =
            hideNumbers &&
            pictorial.kind === 'interval_model' &&
            (g.id === 'cg_intervals' ||
              (g.id === 'cg_objects' && pictorial.unknownTarget !== 'total_length'));

          const maskCount =
            (!isAnswered && !!g.hideCountBeforeSolve) ||
            isRemainderFullGroupsUnknown ||
            isIntervalCountUnknown;
          const maskUnitValue =
            hideNumbers &&
            !g.showUnitValueBeforeSolve &&
            !isRemainderFullGroupsUnknown &&
            (pictorial.kind !== 'interval_model' ||
              pictorial.unknownTarget === 'step_length' ||
              !!pictorial.hideStepBeforeSolve);

          const visibleIcons =
            mode === 'measurement'
              ? 1
              : maskCount
              ? 2
              : Math.min(g.count, 8);

          // Format badge & bottom footer cleanly per domain displayMode
          let badgeText = hasBeforeBadge
            ? g.beforeSolveBadge!
            : hideNumbers
            ? `? ${concrete.unitLabel}`
            : `${g.totalValue} ${concrete.unitLabel}`;
          let footerText = `${maskCount ? '?' : g.count} phần × ${maskUnitValue ? '?' : g.unitValue}`;

          if (mode === 'groups' && pictorial.kind === 'remainder_groups') {
            if (g.id === 'cg_remainder') {
              const showKnownRem = isAnswered || pictorial.contextMode === 'complement_to_full';
              badgeText = showKnownRem ? `Dư ${g.totalValue}` : 'Dư ?';
              footerText = showKnownRem
                ? `Phần dư lẻ = ${g.totalValue} (< ${pictorial.divisor})`
                : `Phần dư < ${pictorial.divisor}`;
            } else {
              badgeText = isAnswered
                ? `${g.count} nhóm (${g.totalValue})`
                : pictorial.unknownTarget === 'dividend'
                ? `${g.count} nhóm × ${g.unitValue}`
                : `? nhóm`;
              footerText = `${maskCount ? '?' : g.count} nhóm × ${g.unitValue}/nhóm`;
            }
          } else if (mode === 'groups') {
            // Non-remainder grouping (e.g., equal bags/bottles/cups in measurement_lab or equal packs in bar_model)
            const unitSuffix = concrete.unitLabel ? ` ${concrete.unitLabel}` : '';
            if (maskCount) {
              badgeText = isAnswered
                ? `${g.count} nhóm`
                : '? nhóm';
              footerText = isAnswered
                ? `${g.count} × ${g.unitValue}${unitSuffix} = ${g.totalValue}${unitSuffix}`
                : `? × ${g.unitValue}${unitSuffix}`;
            } else if (hideNumbers && g.showUnitValueBeforeSolve) {
              badgeText = `?${unitSuffix}`;
              footerText = `${g.count} × ${g.unitValue}${unitSuffix} = ?`;
            } else if (hideNumbers) {
              badgeText = `?${unitSuffix}`;
              footerText = `${g.count} nhóm × ?${unitSuffix}`;
            } else {
              badgeText = hasBeforeBadge
                ? g.beforeSolveBadge!
                : `${g.totalValue}${unitSuffix}`;
              footerText = hasBeforeBadge
                ? `${g.count} × ${g.unitValue}${unitSuffix}`
                : `${g.count} × ${g.unitValue}${unitSuffix} = ${g.totalValue}${unitSuffix}`;
            }
          } else if (mode === 'interval' && pictorial.kind === 'interval_model') {
            if (g.id === 'cg_intervals') {
              const showKnownStep =
                isAnswered ||
                (pictorial.unknownTarget !== 'step_length' && !pictorial.hideStepBeforeSolve);
              badgeText = isAnswered
                ? `${g.count} khoảng`
                : '? khoảng';
              footerText = showKnownStep
                ? `${maskCount ? '?' : g.count} khoảng × ${g.unitValue} ${pictorial.unitLabel}`
                : `${maskCount ? '?' : g.count} khoảng × ? ${pictorial.unitLabel}`;
            } else {
              const isStairsGiven =
                pictorial.subtype === 'stairs' && pictorial.unknownTarget === 'total_length';
              const isObjectsGiven =
                pictorial.unknownTarget === 'total_length' ||
                pictorial.unknownTarget === 'step_length';
              badgeText =
                isAnswered || isStairsGiven || isObjectsGiven
                  ? `${g.count} ${pictorial.subtype === 'stairs' ? 'tầng' : 'mốc'}`
                  : '? mốc';
              footerText =
                pictorial.subtype === 'wood_cuts'
                  ? `Số lần cắt = ${isAnswered ? g.count : '?'} lần`
                  : pictorial.subtype === 'stairs'
                  ? `Từ Tầng 1 lên Tầng ${g.count}`
                  : `Điểm mốc: ${isAnswered || isObjectsGiven ? g.count : '?'}`;
            }
          } else if (mode === 'measurement') {
            const unitSuffix = concrete.unitLabel ? ` ${concrete.unitLabel}` : '';
            if (hasBeforeBadge) {
              badgeText = g.beforeSolveBadge!;
              footerText =
                pictorial.kind === 'perimeter_shape'
                  ? 'Dữ kiện hình học từ đề bài'
                  : 'Dữ kiện đo từ đề bài';
            } else if (hideNumbers) {
              badgeText = maskCount ? '?' : `?${unitSuffix}`;
              if (pictorial.kind === 'perimeter_shape') {
                footerText = g.showUnitValueBeforeSolve
                  ? `${g.count} × ${g.unitValue}${unitSuffix} = ?`
                  : maskCount
                  ? 'Đếm số đoạn cạnh bao quanh viền ngoài'
                  : 'Đại lượng hình học cần tìm';
              } else if (pictorial.kind === 'measurement_lab') {
                footerText =
                  pictorial.operation === 'unit_convert'
                    ? 'Đổi về cùng đơn vị chuẩn'
                    : 'Đại lượng cần tìm';
              } else {
                footerText = 'Đại lượng cần tìm';
              }
            } else {
              badgeText = `${g.totalValue}${unitSuffix}`;
              if (pictorial.kind === 'perimeter_shape') {
                footerText =
                  g.count > 1
                    ? `${g.count} cạnh × ${g.unitValue}${unitSuffix}`
                    : `Độ dài: ${g.totalValue}${unitSuffix}`;
              } else {
                footerText = `Giá trị đo: ${g.totalValue}${unitSuffix}`;
              }
            }
          } else if (hasBeforeBadge) {
            badgeText = g.beforeSolveBadge!;
            footerText = `${g.count} × ${g.unitValue}`;
          }

          return (
            <button
              key={g.id}
              type="button"
              onClick={() => onSelectGroup(isSelected ? null : idx)}
              className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[color:var(--mm-surface-2)] border-[color:var(--mm-amber-brightFill)] shadow-[0_0_20px_rgba(251,191,36,0.28)]'
                  : 'bg-[color:var(--mm-surface-inset)] border-[color:color-mix(in_oklch,var(--mm-cyan-border)_42%,transparent)] hover:border-[color:var(--mm-cyan-accent)] hover:shadow-[0_0_14px_rgba(34,211,238,0.18)]'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-black text-[color:var(--mm-ink-primary)] truncate">
                  {g.label}
                </span>
                <span
                  className="px-2 py-0.5 rounded-md text-[11px] font-black tabular-nums shrink-0"
                  style={{
                    backgroundColor: groupFill,
                    color: groupInk,
                  }}
                >
                  {badgeText}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 my-1.5 min-h-[26px]">
                {Array.from({ length: visibleIcons }).map((_, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/12 text-xs font-bold tabular-nums text-[color:var(--mm-ink-primary)]"
                  >
                    {g.icon}{' '}
                    {mode === 'measurement'
                      ? hasBeforeBadge
                        ? g.beforeSolveBadge
                        : hideNumbers
                        ? '?'
                        : g.totalValue
                      : mode === 'interval' && g.id === 'cg_objects'
                      ? ''
                      : maskUnitValue
                      ? '?'
                      : g.unitValue > 1
                      ? g.unitValue
                      : ''}
                  </span>
                ))}
                {mode !== 'measurement' && (
                  maskCount ? (
                    <span className="text-[11px] font-extrabold text-[color:var(--mm-amber-text)]">
                      ... ?
                    </span>
                  ) : (
                    g.count > visibleIcons && (
                      <span className="text-[11px] font-extrabold text-[color:var(--mm-cyan-text)]">
                        +{g.count - visibleIcons}
                      </span>
                    )
                  )
                )}
              </div>

              <div className="flex items-center justify-between gap-2 text-[11px] text-[color:var(--mm-ink-secondary)] font-semibold tabular-nums mt-1 pt-1.5 border-t border-white/10">
                <span className="truncate">{footerText}</span>
                {g.note && (
                  <span className="text-[color:var(--mm-amber-text)] font-extrabold shrink-0">
                    {g.note}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

/**
 * Step 2A: Automated SVG Singapore Bar Model Renderer (Part-Whole, Comparison, Before-After)
 */
const CPASvgBarModelDiagram: React.FC<{
  pictorial: BarModelPictorialSpec;
  isAnswered: boolean;
  selectedBarIdx: number | null;
  onSelectBar: (idx: number | null) => void;
}> = ({ pictorial, isAnswered, selectedBarIdx, onSelectBar }) => {
  const [timelinePhase, setTimelinePhase] = useState<'before' | 'after'>('before');

  const activeBars: BarModelBarSpec[] = useMemo(() => {
    if (pictorial.family === 'before_after') {
      if (timelinePhase === 'after' && pictorial.afterBars && pictorial.afterBars.length > 0) {
        return pictorial.afterBars;
      }
      if (pictorial.beforeBars && pictorial.beforeBars.length > 0) {
        return pictorial.beforeBars;
      }
    }
    return pictorial.bars;
  }, [pictorial, timelinePhase]);

  const maxNumericVal = useMemo(() => {
    const allCandidateBars = [
      ...pictorial.bars,
      ...(pictorial.beforeBars || []),
      ...(pictorial.afterBars || []),
    ];
    return Math.max(
      ...allCandidateBars.map((b) =>
        Math.max(b.numericValue, b.units * b.unitValue + Math.max(0, b.offsetValue || 0), 1)
      ),
      1
    );
  }, [pictorial]);

  // SVG Layout Geometry (strictly bounded inside svgWidth = 780)
  const svgWidth = 780;
  const labelColWidth = 152;
  const barStartX = 160;
  const hasRightTotalBrace = !!pictorial.totalBracket;
  const maxBarWidth = hasRightTotalBrace ? 340 : 436;
  const rowHeight = 56;
  const topPad = 24;
  const hasDiffBrace = !!pictorial.differenceBracket;
  const diffBraceSpace = hasDiffBrace ? 56 : 20;
  const svgHeight = topPad + activeBars.length * rowHeight + diffBraceSpace;

  // Locate shorter and longer bar for difference bracket
  const diffInfo = useMemo(() => {
    if (!pictorial.differenceBracket || activeBars.length < 2) return null;
    const longer =
      activeBars.find((b) => b.id === pictorial.differenceBracket?.longerBarId) ||
      activeBars.reduce((a, b) => (b.numericValue >= a.numericValue ? b : a), activeBars[0]);
    const shorter =
      activeBars.find((b) => b.id === pictorial.differenceBracket?.shorterBarId) ||
      activeBars.reduce((a, b) => (b.numericValue < a.numericValue ? b : a), activeBars[0]);
    const xShortEnd =
      barStartX + Math.max(36, (shorter.numericValue / maxNumericVal) * maxBarWidth);
    const xLongEnd =
      barStartX + Math.max(36, (longer.numericValue / maxNumericVal) * maxBarWidth);
    return {
      longer,
      shorter,
      xShortEnd,
      xLongEnd,
      label: pictorial.differenceBracket.displayLabel,
      numericValue: pictorial.differenceBracket.numericValue,
      isUnknown: !!pictorial.differenceBracket.isUnknown,
    };
  }, [pictorial.differenceBracket, activeBars, maxNumericVal, maxBarWidth]);

  // Rightmost edge across all bars for total brace
  const maxRenderedX = useMemo(() => {
    let m = barStartX + 90;
    activeBars.forEach((b) => {
      const spanVal = Math.max(b.numericValue, b.units * b.unitValue + Math.max(0, b.offsetValue || 0));
      const w = Math.max(42, (spanVal / maxNumericVal) * maxBarWidth);
      if (barStartX + w > m) m = barStartX + w;
    });
    return m;
  }, [activeBars, maxNumericVal, maxBarWidth]);

  const familyLabel =
    pictorial.family === 'before_after'
      ? 'Sơ đồ Trước – Sau (Before–After)'
      : pictorial.family === 'part_whole'
      ? 'Sơ đồ Bộ phận – Toàn thể (Part–Whole)'
      : 'Sơ đồ So sánh (Comparison Bar Model)';

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-bold text-[color:var(--mm-amber-text)]">
          {familyLabel}
        </span>

        {pictorial.family === 'before_after' && (
          <div className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-[color:var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-amber-border)_65%,transparent)]">
            <button
              type="button"
              onClick={() => setTimelinePhase('before')}
              className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                timelinePhase === 'before'
                  ? 'bg-[color:var(--mm-amber-brightFill)] text-[#05081D] shadow-[0_0_12px_rgba(251,191,36,0.4)]'
                  : 'text-[color:var(--mm-amber-text)] hover:bg-white/10'
              }`}
            >
              1. Lúc đầu (Before)
            </button>
            <ArrowLeftRight className="w-3.5 h-3.5 text-[color:var(--mm-amber-accent)] shrink-0" />
            <button
              type="button"
              onClick={() => setTimelinePhase('after')}
              className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                timelinePhase === 'after'
                  ? 'bg-[color:var(--mm-emerald-brightFill)] text-[#05081D] shadow-[0_0_12px_rgba(52,211,153,0.4)]'
                  : 'text-[color:var(--mm-emerald-text)] hover:bg-white/10'
              }`}
            >
              2. Lúc sau (After)
            </button>
          </div>
        )}
      </div>

      {/* Vector SVG Singapore Bar Model Canvas */}
      <div className="rounded-2xl bg-[radial-gradient(ellipse_at_center,_color-mix(in_oklch,var(--mm-cyan-accent)_10%,transparent),_transparent_70%),var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_65%,transparent)] p-3 overflow-x-auto shadow-[inset_0_2px_18px_rgba(0,0,0,0.58),0_0_22px_rgba(34,211,238,0.12)]">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto min-w-[540px] select-none"
          role="img"
          aria-label="Sơ đồ thanh Singapore Bar Model SVG"
        >
          <defs>
            <pattern
              id="cpa-delta-hatch"
              width="8"
              height="8"
              patternTransform="rotate(45 0 0)"
              patternUnits="userSpaceOnUse"
            >
              <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(5,8,29,0.22)" strokeWidth="2" />
            </pattern>
          </defs>

          {/* Subtle vertical unit alignment grid lines */}
          {Array.from({ length: 8 }).map((_, gIdx) => {
            const gx = barStartX + ((gIdx + 1) * maxBarWidth) / 8;
            return (
              <line
                key={gIdx}
                x1={gx}
                y1={12}
                x2={gx}
                y2={svgHeight - 12}
                stroke="rgba(148,163,184,0.1)"
                strokeDasharray="3 5"
              />
            );
          })}

          {/* Render Each Proportional Horizontal Bar */}
          {activeBars.map((bar, bIdx) => {
            const rowY = topPad + bIdx * rowHeight;
            const barHeight = 36;
            const totalBarW = Math.max(42, (bar.numericValue / maxNumericVal) * maxBarWidth);
            const isSelected = selectedBarIdx === bIdx;

            const barFill = harmonizeCpaFillColor(bar.color);
            const barInk = getApcaReadableInk(barFill);

            const baseUnitsTotal = Math.max(0, bar.units * bar.unitValue);
            const rawOffset = bar.offsetValue || 0;
            const posOffset = Math.max(0, rawOffset);
            const negOffset = Math.max(0, -rawOffset);
            const maskOffset = !isAnswered && !!bar.hideOffsetBeforeSolve;

            let unitsAreaW = totalBarW;
            let offsetAreaW = 0;
            let removedTailW = 0;

            if (posOffset > 0) {
              const totalPositive = Math.max(1, baseUnitsTotal + posOffset);
              unitsAreaW = totalBarW * (baseUnitsTotal / totalPositive);
              offsetAreaW = totalBarW - unitsAreaW;
            } else if (negOffset > 0) {
              unitsAreaW = Math.max(42, (baseUnitsTotal / maxNumericVal) * maxBarWidth);
              removedTailW = Math.max(24, (negOffset / maxNumericVal) * maxBarWidth);
            }

            const singleUnitW = bar.units > 0 ? unitsAreaW / bar.units : unitsAreaW;
            const labelRightX =
              barStartX + Math.max(totalBarW, unitsAreaW + (negOffset > 0 ? 4 : 0)) + 10;

            const shownLabel = bar.isSymbolicOnly
              ? isAnswered
                ? bar.displayValue.replace(/\?/g, String(Math.abs(bar.offsetValue || 0) || '?'))
                : bar.displayValue
              : bar.isUnknown && !isAnswered
              ? bar.displayValue
              : `${bar.numericValue} ${pictorial.unitName}`;

            return (
              <g
                key={bar.id}
                onClick={() => onSelectBar(isSelected ? null : bIdx)}
                className="cursor-pointer"
              >
                {/* Left Row Label */}
                <rect
                  x={8}
                  y={rowY + 2}
                  width={labelColWidth - 10}
                  height={barHeight - 4}
                  rx={8}
                  fill={isSelected ? 'rgba(251,191,36,0.22)' : '#0b1130'}
                  stroke={
                    isSelected
                      ? MINDMATH_OKLCH_PALETTE.scales.amber.brightFill.hex
                      : MINDMATH_OKLCH_PALETTE.scales.neutral.border.hex
                  }
                  strokeWidth={isSelected ? 1.8 : 1}
                />
                <text
                  x={16}
                  y={rowY + barHeight / 2 + 4}
                  fill={MINDMATH_OKLCH_PALETTE.inks.primary.hex}
                  fontSize={bar.label.length > 16 ? '10.5' : bar.label.length > 13 ? '11.5' : '12.5'}
                  fontWeight="800"
                >
                  {bar.label}
                </text>

                {/* Equal Unit Blocks */}
                {Array.from({ length: Math.max(1, bar.units) }).map((_, uIdx) => {
                  const ux = barStartX + uIdx * singleUnitW;
                  return (
                    <g key={uIdx}>
                      <rect
                        x={ux}
                        y={rowY}
                        width={Math.max(4, singleUnitW - 1.5)}
                        height={barHeight}
                        rx={uIdx === 0 ? 7 : 3}
                        fill={barFill}
                        fillOpacity={isSelected ? 1 : 0.94}
                        stroke={
                          isSelected
                            ? MINDMATH_OKLCH_PALETTE.scales.amber.bright.hex
                            : MINDMATH_OKLCH_PALETTE.scales.neutral.text.hex
                        }
                        strokeWidth={isSelected ? 2 : 1.15}
                      />
                      {singleUnitW >= 40 && (
                        <text
                          x={ux + singleUnitW / 2}
                          y={rowY + barHeight / 2 + 4}
                          textAnchor="middle"
                          fill={barInk}
                          fontSize="11.5"
                          fontWeight="800"
                        >
                          {bar.isSymbolicOnly
                            ? '1 phần'
                            : bar.isUnknown && !isAnswered && !bar.showKnownUnitValue
                            ? '?'
                            : bar.unitValue}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Negative Offset (Removed/Deducted Tail Overlay) */}
                {removedTailW > 0 && (
                  <g>
                    <rect
                      x={Math.max(barStartX + 12, barStartX + unitsAreaW - removedTailW)}
                      y={rowY + 2}
                      width={Math.min(removedTailW, unitsAreaW - 8)}
                      height={barHeight - 4}
                      rx={5}
                      fill={MINDMATH_OKLCH_PALETTE.scales.rose.fill.hex}
                      fillOpacity={0.9}
                      stroke={MINDMATH_OKLCH_PALETTE.scales.rose.bright.hex}
                      strokeWidth={1.6}
                      strokeDasharray="4 3"
                    />
                    <text
                      x={
                        Math.max(barStartX + 12, barStartX + unitsAreaW - removedTailW) +
                        Math.min(removedTailW, unitsAreaW - 8) / 2
                      }
                      y={rowY + barHeight / 2 + 4}
                      textAnchor="middle"
                      fill={getApcaReadableInk(MINDMATH_OKLCH_PALETTE.scales.rose.fill.hex)}
                      fontSize="10.5"
                      fontWeight="900"
                    >
                      {maskOffset ? '-?' : `-${negOffset}`}
                    </text>
                  </g>
                )}

                {/* Positive Offset / Transferred Segment */}
                {offsetAreaW > 2 && (
                  <g>
                    <rect
                      x={barStartX + unitsAreaW}
                      y={rowY}
                      width={Math.max(22, offsetAreaW)}
                      height={barHeight}
                      rx={6}
                      fill={MINDMATH_OKLCH_PALETTE.scales.amber.brightFill.hex}
                      fillOpacity={0.96}
                      stroke={MINDMATH_OKLCH_PALETTE.scales.amber.bright.hex}
                      strokeWidth={1.5}
                      strokeDasharray={bar.deltaType === 'transferred_out' ? '4 3' : undefined}
                    />
                    <rect
                      x={barStartX + unitsAreaW}
                      y={rowY}
                      width={Math.max(22, offsetAreaW)}
                      height={barHeight}
                      rx={6}
                      fill="url(#cpa-delta-hatch)"
                    />
                    <text
                      x={barStartX + unitsAreaW + Math.max(22, offsetAreaW) / 2}
                      y={rowY + barHeight / 2 + 4}
                      textAnchor="middle"
                      fill="#05081D"
                      fontSize="11"
                      fontWeight="900"
                    >
                      {maskOffset ? '+?' : `+${posOffset}`}
                    </text>
                  </g>
                )}

                {/* Value Callout on Right of Bar */}
                <text
                  x={labelRightX}
                  y={rowY + barHeight / 2 + 4}
                  fill={
                    bar.isUnknown && !isAnswered
                      ? MINDMATH_OKLCH_PALETTE.scales.amber.text.hex
                      : MINDMATH_OKLCH_PALETTE.scales.cyan.text.hex
                  }
                  fontSize="11.5"
                  fontWeight="800"
                >
                  {shownLabel}
                </text>
              </g>
            );
          })}

          {/* Comparison Difference Bracket & Dashed Alignment Guides */}
          {diffInfo && diffInfo.xLongEnd - diffInfo.xShortEnd > 8 && (
            <g>
              <line
                x1={diffInfo.xShortEnd}
                y1={topPad}
                x2={diffInfo.xShortEnd}
                y2={topPad + activeBars.length * rowHeight + 6}
                stroke={MINDMATH_OKLCH_PALETTE.scales.amber.brightFill.hex}
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <line
                x1={diffInfo.xLongEnd}
                y1={topPad}
                x2={diffInfo.xLongEnd}
                y2={topPad + activeBars.length * rowHeight + 6}
                stroke={MINDMATH_OKLCH_PALETTE.scales.amber.brightFill.hex}
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <path
                d={buildHorizontalCurlyBracePath(
                  diffInfo.xShortEnd,
                  diffInfo.xLongEnd,
                  topPad + activeBars.length * rowHeight - 10,
                  12,
                  'down'
                )}
                fill="none"
                stroke={MINDMATH_OKLCH_PALETTE.scales.amber.brightFill.hex}
                strokeWidth="2.2"
              />
              <text
                x={(diffInfo.xShortEnd + diffInfo.xLongEnd) / 2}
                y={topPad + activeBars.length * rowHeight + 24}
                textAnchor="middle"
                fill={MINDMATH_OKLCH_PALETTE.scales.amber.text.hex}
                fontSize="12"
                fontWeight="800"
              >
                {isAnswered
                  ? (() => {
                      const valStr = String(diffInfo.numericValue);
                      const resolved = diffInfo.label.replace(/\?/g, valStr);
                      return resolved.includes(valStr)
                        ? resolved
                        : `${resolved} (${valStr} ${pictorial.unitName})`;
                    })()
                  : diffInfo.label}
              </text>
            </g>
          )}

          {/* Right-side Total Curly Brace for Part-Whole / Constant Total */}
          {pictorial.totalBracket && (() => {
            const braceX = Math.min(maxRenderedX + 104, svgWidth - 156);
            const boxX = braceX + 18;
            const boxW = Math.max(122, svgWidth - boxX - 8);
            const braceText =
              pictorial.totalBracket.isUnknown && !isAnswered
                ? pictorial.totalBracket.displayLabel
                : /nửa chu vi/i.test(pictorial.totalBracket.displayLabel)
                ? `Nửa CV = ${pictorial.totalBracket.numericValue}`
                : `Tổng = ${pictorial.totalBracket.numericValue}`;
            return (
              <g>
                <path
                  d={buildVerticalCurlyBracePath(
                    braceX,
                    topPad,
                    topPad + activeBars.length * rowHeight - 18,
                    14
                  )}
                  fill="none"
                  stroke={MINDMATH_OKLCH_PALETTE.scales.cyan.accent.hex}
                  strokeWidth="2.2"
                />
                <rect
                  x={boxX}
                  y={topPad + (activeBars.length * rowHeight - 18) / 2 - 15}
                  width={boxW}
                  height={30}
                  rx={8}
                  fill={MINDMATH_OKLCH_PALETTE.scales.cyan.tint.hex}
                  stroke={MINDMATH_OKLCH_PALETTE.scales.cyan.accent.hex}
                  strokeWidth="1.4"
                />
                <text
                  x={boxX + 8}
                  y={topPad + (activeBars.length * rowHeight - 18) / 2 + 4}
                  fill={MINDMATH_OKLCH_PALETTE.scales.cyan.bright.hex}
                  fontSize={braceText.length > 16 ? '10.5' : '11.5'}
                  fontWeight="800"
                >
                  {braceText}
                </text>
              </g>
            );
          })()}
        </svg>
      </div>

      {/* Interactive Bar Selection Readout or Transfer Conservation Note */}
      {selectedBarIdx !== null && activeBars[selectedBarIdx] ? (() => {
        const sel = activeBars[selectedBarIdx];
        const maskSelOffset = !isAnswered && !!sel.hideOffsetBeforeSolve;
        return (
          <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-amber-400/12 border border-amber-300/45 text-xs font-bold text-amber-100">
            <span className="tabular-nums">
              Đang kiểm tra thanh:{' '}
              <strong className="text-white">{sel.label}</strong> —{' '}
              {sel.isSymbolicOnly
                ? `${sel.displayValue}`
                : (
                  <>
                    {sel.units} phần ×{' '}
                    {sel.isUnknown && !isAnswered && !sel.showKnownUnitValue ? '?' : sel.unitValue}
                    {sel.offsetValue
                      ? maskSelOffset
                        ? sel.offsetValue < 0
                          ? ' − ?'
                          : ' + ?'
                        : sel.offsetValue < 0
                        ? ` − ${Math.abs(sel.offsetValue)}`
                        : ` + ${sel.offsetValue}`
                      : ''}{' '}
                    ={' '}
                    {sel.isUnknown && !isAnswered
                      ? '?'
                      : `${sel.numericValue} ${pictorial.unitName}`}
                  </>
                )}
            </span>
            <button
              type="button"
              onClick={() => onSelectBar(null)}
              className="text-amber-200 underline text-[11px] font-black cursor-pointer"
            >
              Bỏ chọn
            </button>
          </div>
        );
      })() : (
        pictorial.transferSpec && (
          <div className="px-3.5 py-2.5 rounded-xl bg-sky-500/12 border border-sky-300/35 text-xs font-bold text-sky-100">
            Quy tắc Bảo toàn Trước – Sau: {pictorial.transferSpec.description}
          </div>
        )
      )}
    </div>
  );
};

/**
 * Step 2B: SVG Euclidean Division with Remainder Diagram + Contextual Singapore Math Action Rule
 */
const CPASvgRemainderDiagram: React.FC<{
  pictorial: RemainderPictorialSpec;
  isAnswered: boolean;
}> = ({ pictorial, isAnswered }) => {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const {
    dividend,
    divisor,
    quotient,
    remainder,
    itemIcon,
    groupLabel,
    unknownTarget,
    contextMode,
    contextActionHint,
  } = pictorial;

  const isDividendHidden = !isAnswered && (unknownTarget === 'dividend' || !!pictorial.hideDividendBeforeSolve);
  const isExampleMode = !!pictorial.isExampleIllustration;
  const isQuotientOrRemUnknown = !isAnswered && unknownTarget !== 'dividend';
  const showKnownRemainderBeforeSolve = !isAnswered && contextMode === 'complement_to_full';
  const visibleGroups = isQuotientOrRemUnknown ? 2 : Math.min(quotient, 10);

  const svgWidth = 720;
  const totalBarW = 540;
  const startX = 90;
  const mainW = isQuotientOrRemUnknown
    ? 440
    : dividend > 0
    ? Math.max(60, (quotient * divisor * totalBarW) / dividend)
    : totalBarW;
  const remW = isQuotientOrRemUnknown ? 98 : Math.max(0, totalBarW - mainW);

  const contextTag =
    contextMode === 'round_up_containers'
      ? 'Xử lý dư: Làm tròn lên (Thương + 1)'
      : contextMode === 'round_down_full'
      ? 'Xử lý dư: Lấy phần nguyên (Giữ Thương)'
      : contextMode === 'cyclic_pattern'
      ? 'Xử lý dư: Định vị theo chu kỳ lặp'
      : contextMode === 'max_remainder'
      ? 'Quy tắc vàng: Số dư lớn nhất = Số chia − 1'
      : contextMode === 'complement_to_full'
      ? 'Xử lý dư: Bù đủ 1 nhóm đầy'
      : contextMode === 'find_dividend'
      ? 'Khôi phục: Số bị chia = Thương × Số chia + Dư'
      : 'Phép chia Euclid: 0 ≤ Số dư < Số chia';

  const headerText = isAnswered
    ? `${isExampleMode ? 'Ví dụ minh họa' : 'Sơ đồ Phép chia'}: ${dividend} = ${divisor} × ${quotient} + ${remainder} (Số dư ${remainder} < Số chia ${divisor})`
    : isExampleMode
    ? showKnownRemainderBeforeSolve
      ? `Mô hình minh họa: Số chia = ${divisor}, đang dư ${remainder} (cần bù thêm ? để đủ 1 nhóm ${divisor})`
      : `Mô hình minh họa: Số chia = ${divisor} ➔ Số dư luôn nhỏ hơn ${divisor}`
    : isDividendHidden
    ? unknownTarget === 'dividend'
      ? `Sơ đồ Phép chia: ? = ${divisor} × ${quotient} + dư (< ${divisor})`
      : `Sơ đồ Phép chia: Tìm số ban đầu (?) rồi chia cho ${divisor} (Số dư < ${divisor})`
    : showKnownRemainderBeforeSolve
    ? `Sơ đồ Phép chia: ${dividend} chia đều mỗi nhóm ${divisor}, còn dư ${remainder} (cần thêm ? để đủ ${divisor})`
    : `Sơ đồ Phép chia: ${dividend} chia đều mỗi nhóm ${divisor} (Số dư < ${divisor})`;

  const totalBraceLabel = isAnswered
    ? `${isExampleMode ? 'Ví dụ: ' : ''}Tổng = ${dividend} (${quotient} ${groupLabel.toLowerCase()} × ${divisor}${remainder > 0 ? ` + dư ${remainder}` : ''})`
    : isExampleMode
    ? `Số bị chia A = (? ${groupLabel.toLowerCase()} × ${divisor} + ${showKnownRemainderBeforeSolve ? `dư ${remainder}` : 'dư ?'})`
    : isDividendHidden
    ? unknownTarget === 'dividend'
      ? `Tổng số bị chia = ? (${quotient} ${groupLabel.toLowerCase()} × ${divisor} + dư ?)`
      : `Tổng số cần tìm = ? (? ${groupLabel.toLowerCase()} × ${divisor} + dư ?)`
    : `Tổng = ${dividend} (? ${groupLabel.toLowerCase()} × ${divisor} + ${showKnownRemainderBeforeSolve ? `dư ${remainder}` : 'dư ?'})`;

  const qFill = MINDMATH_OKLCH_PALETTE.scales.azure.fill.hex;
  const qSelectedFill = MINDMATH_OKLCH_PALETTE.scales.amber.brightFill.hex;
  const qInk = getApcaReadableInk(qFill);

  return (
    <div className="space-y-3">
      {/* Contextual Singapore Math Interpretation Callout */}
      <div className="flex flex-wrap items-baseline justify-between gap-2 px-3.5 py-2 rounded-xl bg-amber-400/10 border border-amber-300/35 text-xs">
        <span className="font-black text-[color:var(--mm-amber-bright)]">{contextTag}</span>
        {contextActionHint && (
          <span className="font-medium text-[color:var(--mm-ink-secondary)]">
            {contextActionHint}
          </span>
        )}
      </div>

      <div className="rounded-2xl bg-[radial-gradient(ellipse_at_center,_color-mix(in_oklch,var(--mm-cyan-accent)_10%,transparent),_transparent_70%),var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_65%,transparent)] p-3 overflow-x-auto shadow-[inset_0_2px_18px_rgba(0,0,0,0.58),0_0_22px_rgba(34,211,238,0.12)]">
        <svg
          viewBox={`0 0 ${svgWidth} 118`}
          className="w-full h-auto min-w-[500px] select-none"
          role="img"
          aria-label="Sơ đồ phép chia có dư"
        >
          <text x={startX} y={20} fill={MINDMATH_OKLCH_PALETTE.scales.cyan.text.hex} fontSize="12" fontWeight="800">
            {headerText}
          </text>

          {/* Quotient equal blocks */}
          {isQuotientOrRemUnknown ? (
            <>
              {[0, 1].map((idx) => {
                const cellW = 105;
                const cx = startX + idx * cellW;
                return (
                  <g key={idx}>
                    <rect
                      x={cx}
                      y={30}
                      width={cellW - 2}
                      height={34}
                      rx={4}
                      fill={qFill}
                      stroke={MINDMATH_OKLCH_PALETTE.scales.cyan.bright.hex}
                      strokeWidth="1.2"
                    />
                    <text
                      x={cx + cellW / 2}
                      y={51}
                      textAnchor="middle"
                      fill={qInk}
                      fontSize="11"
                      fontWeight="800"
                    >
                      {divisor}
                    </text>
                  </g>
                );
              })}
              <rect
                x={startX + 210}
                y={30}
                width={228}
                height={34}
                rx={4}
                fill={MINDMATH_OKLCH_PALETTE.scales.azure.tint.hex}
                stroke={MINDMATH_OKLCH_PALETTE.scales.azure.text.hex}
                strokeWidth="1.2"
                strokeDasharray="5 4"
              />
              <text
                x={startX + 210 + 114}
                y={51}
                textAnchor="middle"
                fill={MINDMATH_OKLCH_PALETTE.scales.cyan.bright.hex}
                fontSize="11"
                fontWeight="800"
              >
                ... (? {groupLabel.toLowerCase()})
              </text>
            </>
          ) : (
            Array.from({ length: Math.min(quotient, 16) }).map((_, idx) => {
              const cellW = mainW / Math.min(quotient, 16);
              const cx = startX + idx * cellW;
              const isSel = selectedGroup === idx;
              const cellFill = isSel ? qSelectedFill : qFill;
              return (
                <g
                  key={idx}
                  onClick={() => setSelectedGroup(isSel ? null : idx)}
                  className="cursor-pointer"
                >
                  <rect
                    x={cx}
                    y={30}
                    width={Math.max(4, cellW - 2)}
                    height={34}
                    rx={4}
                    fill={cellFill}
                    stroke={MINDMATH_OKLCH_PALETTE.scales.cyan.bright.hex}
                    strokeWidth="1.2"
                  />
                  {cellW >= 28 && (
                    <text
                      x={cx + cellW / 2}
                      y={51}
                      textAnchor="middle"
                      fill={getApcaReadableInk(cellFill)}
                      fontSize="11"
                      fontWeight="800"
                    >
                      {divisor}
                    </text>
                  )}
                </g>
              );
            })
          )}

          {/* Remainder tail block */}
          {(remainder > 0 || !isAnswered) && (
            <g>
              <rect
                x={startX + mainW + 2}
                y={30}
                width={Math.max(54, remW)}
                height={34}
                rx={5}
                fill={MINDMATH_OKLCH_PALETTE.scales.amber.brightFill.hex}
                stroke={MINDMATH_OKLCH_PALETTE.scales.amber.bright.hex}
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />
              <text
                x={startX + mainW + 2 + Math.max(54, remW) / 2}
                y={51}
                textAnchor="middle"
                fill="#05081D"
                fontSize="11"
                fontWeight="900"
              >
                {isAnswered || showKnownRemainderBeforeSolve ? `Dư ${remainder}` : 'Dư ?'}
              </text>
            </g>
          )}

          {/* Total Dividend Curly Brace */}
          <path
            d={buildHorizontalCurlyBracePath(
              startX,
              startX + mainW + (remainder > 0 || !isAnswered ? Math.max(54, remW) : 0),
              70,
              12,
              'down'
            )}
            fill="none"
            stroke={MINDMATH_OKLCH_PALETTE.scales.cyan.accent.hex}
            strokeWidth="2"
          />
          <text
            x={startX + (mainW + (remainder > 0 || !isAnswered ? Math.max(54, remW) : 0)) / 2}
            y={100}
            textAnchor="middle"
            fill={MINDMATH_OKLCH_PALETTE.scales.cyan.bright.hex}
            fontSize="12"
            fontWeight="800"
          >
            {totalBraceLabel}
          </text>
        </svg>
      </div>

      {/* Interactive Group Trays */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
        {Array.from({ length: visibleGroups }).map((_, idx) => {
          const isSel = selectedGroup === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedGroup(isSel ? null : idx)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                isSel
                  ? 'bg-[color:var(--mm-surface-2)] border-[color:var(--mm-amber-brightFill)] shadow-[0_0_15px_rgba(251,191,36,0.28)]'
                  : 'bg-[color:var(--mm-surface-1)] border-[color:color-mix(in_oklch,var(--mm-cyan-border)_48%,transparent)] hover:border-[color:var(--mm-cyan-accent)]'
              }`}
            >
              <div className="text-[11px] font-black text-[color:var(--mm-cyan-text)] mb-1 tabular-nums">
                {groupLabel} {idx + 1} ({divisor})
              </div>
              <div className="flex flex-wrap gap-1">
                {Array.from({ length: Math.min(divisor, 8) }).map((__, i) => (
                  <span key={i} className="text-sm">
                    {itemIcon}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
        {isQuotientOrRemUnknown && (
          <div className="p-2.5 rounded-xl border border-dashed border-[color:var(--mm-cyan-border)] bg-[color:var(--mm-surface-inset)] flex items-center justify-center text-[11px] font-black text-[color:var(--mm-cyan-text)]">
            ... (? {groupLabel.toLowerCase()})
          </div>
        )}
        {(remainder > 0 || !isAnswered) && (
          <div className="p-2.5 rounded-xl border border-dashed border-[color:var(--mm-amber-border)] bg-[color:color-mix(in_oklch,var(--mm-amber-tint)_42%,transparent)]">
            <div className="text-[11px] font-black text-[color:var(--mm-amber-text)] mb-1 tabular-nums">
              {isAnswered || showKnownRemainderBeforeSolve
                ? `Phần dư: ${remainder} (< ${divisor})`
                : `Phần dư: ? (< ${divisor})`}
            </div>
            <div className="flex flex-wrap gap-1">
              {isAnswered || showKnownRemainderBeforeSolve ? (
                Array.from({ length: Math.min(remainder, 8) }).map((_, i) => (
                  <span key={i} className="text-sm">
                    {itemIcon}
                  </span>
                ))
              ) : (
                <span className="text-xs font-black text-[color:var(--mm-amber-bright)]">? {itemIcon}</span>
              )}
            </div>
          </div>
        )}
      </div>
      {isAnswered && (
        <div className="text-xs font-bold text-[color:var(--mm-emerald-text)] tabular-nums">
          Kiểm chứng Euclid: {quotient} × {divisor} + {remainder} = {dividend}
        </div>
      )}
    </div>
  );
};

/**
 * Step 2C: Authentic 4-Geometry SVG Interval & Fencepost Topology Diagram
 * 1) closed_loop: Circular pond / perimeter ring
 * 2) wood_cuts: Segmented wooden log with glowing vertical saw-cuts
 * 3) stairs: Stepped architectural staircase from Floor 1 upward
 * 4) Linear road (both_ends / one_end / neither_end) with 2-sided support & gap items
 */
const CPASvgIntervalDiagram: React.FC<{
  pictorial: IntervalPictorialSpec;
  isAnswered: boolean;
}> = ({ pictorial, isAnswered }) => {
  const {
    subtype,
    totalLength,
    stepLength,
    intervalsCount,
    objectsCount,
    objectIcon,
    unitLabel,
    unknownTarget,
    sidesMultiplier,
    timePerCut,
    timeUnit,
    itemInGapIcon,
    startFloor = 1,
  } = pictorial;

  const hideTotal = !isAnswered && unknownTarget === 'total_length';
  const hideStep = !isAnswered && (unknownTarget === 'step_length' || !!pictorial.hideStepBeforeSolve);

  // --- GEOMETRY 1: CLOSED LOOP (Circular Pond / Perimeter) ---
  if (subtype === 'closed_loop') {
    const cx = 360;
    const cy = 104;
    const rx = 148;
    const ry = 66;
    const shownNodes = isAnswered ? Math.min(objectsCount, 12) : 6;

    return (
      <div className="space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-black text-[color:var(--mm-emerald-text)]">
            Mô hình Đường khép kín (Vòng tròn / Chu vi)
          </span>
          <span className="font-semibold text-[color:var(--mm-ink-secondary)]">
            Điểm đầu và điểm cuối chập làm một ➔ Số mốc = Số khoảng
          </span>
        </div>
        <div className="rounded-2xl bg-[radial-gradient(ellipse_at_center,_color-mix(in_oklch,var(--mm-emerald-accent)_10%,transparent),_transparent_70%),var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_65%,transparent)] p-3 overflow-x-auto shadow-[inset_0_2px_18px_rgba(0,0,0,0.58)]">
          <svg
            viewBox="0 0 720 208"
            className="w-full h-auto min-w-[500px] select-none"
            role="img"
            aria-label="Sơ đồ trồng cây đường khép kín"
          >
            {/* Water / Inner Perimeter */}
            <ellipse
              cx={cx}
              cy={cy}
              rx={rx - 14}
              ry={ry - 10}
              fill="rgba(14,165,233,0.14)"
              stroke="rgba(56,189,248,0.35)"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />
            {/* Main Perimeter Track */}
            <ellipse
              cx={cx}
              cy={cy}
              rx={rx}
              ry={ry}
              fill="none"
              stroke={MINDMATH_OKLCH_PALETTE.scales.emerald.accent.hex}
              strokeWidth="3.5"
            />
            {/* Center Label */}
            <text
              x={cx}
              y={cy - 6}
              textAnchor="middle"
              fill={MINDMATH_OKLCH_PALETTE.scales.cyan.bright.hex}
              fontSize="13"
              fontWeight="900"
            >
              {hideTotal ? `Chu vi = ? ${unitLabel}` : `Chu vi = ${totalLength} ${unitLabel}`}
            </text>
            <text
              x={cx}
              y={cy + 14}
              textAnchor="middle"
              fill={MINDMATH_OKLCH_PALETTE.scales.amber.text.hex}
              fontSize="11.5"
              fontWeight="800"
            >
              {hideStep
                ? `Mỗi khoảng = ? ${unitLabel}`
                : `Mỗi khoảng = ${stepLength} ${unitLabel}`}
            </text>
            <text
              x={cx}
              y={cy + 32}
              textAnchor="middle"
              fill={MINDMATH_OKLCH_PALETTE.scales.emerald.text.hex}
              fontSize="11"
              fontWeight="800"
            >
              {isAnswered
                ? `${objectsCount} mốc · ${intervalsCount} khoảng`
                : 'Số mốc = Số khoảng = ?'}
            </text>

            {/* Evenly Spaced Nodes Around Loop */}
            {Array.from({ length: shownNodes }).map((_, idx) => {
              const angle = (idx / shownNodes) * Math.PI * 2 - Math.PI / 2;
              const nx = cx + Math.cos(angle) * rx;
              const ny = cy + Math.sin(angle) * ry;
              const isEllipsis = !isAnswered && idx === shownNodes - 1;
              return (
                <g key={idx}>
                  <circle
                    cx={nx}
                    cy={ny}
                    r={14}
                    fill={MINDMATH_OKLCH_PALETTE.scales.cyan.tint.hex}
                    stroke={MINDMATH_OKLCH_PALETTE.scales.cyan.accent.hex}
                    strokeWidth="1.6"
                  />
                  <text x={nx} y={ny + 5} textAnchor="middle" fontSize="13.5" fill="#FFFFFF" fontWeight="800">
                    {isEllipsis ? '...' : objectIcon}
                  </text>
                </g>
              );
            })}

            {/* Side Legend Annotation */}
            <text
              x={555}
              y={88}
              fill={MINDMATH_OKLCH_PALETTE.scales.cyan.text.hex}
              fontSize="11"
              fontWeight="800"
            >
              Mỗi mốc gắn với
            </text>
            <text
              x={555}
              y={106}
              fill={MINDMATH_OKLCH_PALETTE.scales.cyan.text.hex}
              fontSize="11"
              fontWeight="800"
            >
              đúng 1 khoảng liền sau
            </text>
            <text
              x={555}
              y={128}
              fill={MINDMATH_OKLCH_PALETTE.scales.amber.text.hex}
              fontSize="11"
              fontWeight="900"
            >
              (Không +1, không −1)
            </text>
          </svg>
        </div>
      </div>
    );
  }

  // --- GEOMETRY 2: WOOD / METAL CUTS (Segmented Bar with Cut Lines) ---
  if (subtype === 'wood_cuts') {
    const isMetalCut = objectIcon === '⚡';
    const cutVerb = isMetalCut ? 'cắt' : 'cưa';
    const itemNoun = isMetalCut ? 'thanh thép' : 'khúc gỗ';
    const pieceNoun = isMetalCut ? 'đoạn thép' : 'đoạn gỗ';
    const shownPlanks = isAnswered ? Math.min(intervalsCount, 8) : Math.min(intervalsCount, 5);
    const showEllipsis = !isAnswered && intervalsCount > shownPlanks;
    const logStartX = 68;
    const logW = 584;
    const plankW = logW / shownPlanks;
    const logY = 50;
    const logH = 38;

    return (
      <div className="space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-black text-[color:var(--mm-amber-text)]">
            {isMetalCut
              ? 'Mô hình Cắt thanh thép thành đoạn (Mạch cắt nằm bên trong thanh)'
              : 'Mô hình Cưa gỗ / Cắt đoạn (Mạch cắt nằm bên trong thanh gỗ)'}
          </span>
          <span className="font-semibold text-[color:var(--mm-ink-secondary)]">
            {timePerCut
              ? `Mỗi lần ${cutVerb} hết ${timePerCut} ${timeUnit || 'phút'} · Số lần ${cutVerb} = Số đoạn − 1`
              : `Lần ${cutVerb} cuối tách rời cả 2 đoạn cuối ➔ Số lần ${cutVerb} = Số đoạn − 1`}
          </span>
        </div>
        <div className="rounded-2xl bg-[radial-gradient(ellipse_at_center,_color-mix(in_oklch,var(--mm-amber-accent)_10%,transparent),_transparent_70%),var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-amber-border)_58%,transparent)] p-3 overflow-x-auto shadow-[inset_0_2px_18px_rgba(0,0,0,0.58)]">
          <svg
            viewBox="0 0 720 148"
            className="w-full h-auto min-w-[520px] select-none"
            role="img"
            aria-label={`Sơ đồ ${cutVerb} ${itemNoun} thành các đoạn`}
          >
            {/* Planks / Segments */}
            {Array.from({ length: shownPlanks }).map((_, idx) => {
              const px = logStartX + idx * plankW;
              const isMidEllipsis = showEllipsis && idx === shownPlanks - 2;
              return (
                <g key={idx}>
                  <rect
                    x={px + 2}
                    y={logY}
                    width={plankW - 4}
                    height={logH}
                    rx={6}
                    fill={
                      isMetalCut
                        ? isMidEllipsis
                          ? 'rgba(56,189,248,0.2)'
                          : 'rgba(14,165,233,0.48)'
                        : isMidEllipsis
                        ? 'rgba(217,119,6,0.22)'
                        : 'rgba(217,119,6,0.58)'
                    }
                    stroke={isMetalCut ? '#38BDF8' : '#FBBF24'}
                    strokeWidth="1.4"
                    strokeDasharray={isMidEllipsis ? '4 3' : undefined}
                  />
                  <text
                    x={px + plankW / 2}
                    y={logY + 24}
                    textAnchor="middle"
                    fill="#FEF3C7"
                    fontSize="11.5"
                    fontWeight="800"
                  >
                    {isMidEllipsis
                      ? '...'
                      : stepLength > 1
                      ? `${stepLength} ${unitLabel}`
                      : `Đoạn ${idx === shownPlanks - 1 && showEllipsis ? intervalsCount : idx + 1}`}
                  </text>
                </g>
              );
            })}

            {/* Vertical Glowing Cut Lines Between Segments */}
            {Array.from({ length: shownPlanks - 1 }).map((_, cIdx) => {
              const cx = logStartX + (cIdx + 1) * plankW;
              const isEllipsisNeighbor = showEllipsis && cIdx === shownPlanks - 2;
              return (
                <g key={cIdx}>
                  <line
                    x1={cx}
                    y1={logY - 12}
                    x2={cx}
                    y2={logY + logH + 10}
                    stroke="#FB7185"
                    strokeWidth="2.4"
                    strokeDasharray="4 3"
                  />
                  <text x={cx} y={logY - 18} textAnchor="middle" fontSize="14">
                    {isEllipsisNeighbor ? '…' : objectIcon}
                  </text>
                </g>
              );
            })}

            {/* Bottom Brace & Summary */}
            <path
              d={buildHorizontalCurlyBracePath(logStartX, logStartX + logW, logY + logH + 14, 10, 'down')}
              fill="none"
              stroke={MINDMATH_OKLCH_PALETTE.scales.cyan.accent.hex}
              strokeWidth="1.8"
            />
            <text
              x={360}
              y={136}
              textAnchor="middle"
              fill={MINDMATH_OKLCH_PALETTE.scales.cyan.bright.hex}
              fontSize="12"
              fontWeight="800"
            >
              {isAnswered
                ? `${intervalsCount} ${pieceNoun} ➔ ${objectsCount} lần ${cutVerb}${timePerCut ? ` × ${timePerCut} ${timeUnit || 'phút'} = ${objectsCount * timePerCut} ${timeUnit || 'phút'}` : ''}`
                : stepLength > 1
                ? `${isMetalCut ? 'Thanh thép' : 'Khúc gỗ'} dài ${totalLength} ${unitLabel} (mỗi đoạn ${stepLength} ${unitLabel}) ➔ ? đoạn ➔ ? lần ${cutVerb}`
                : `Chia thành ${intervalsCount} ${pieceNoun} ➔ Cần ? lần ${cutVerb}${timePerCut ? ` (${timePerCut} ${timeUnit || 'phút'}/lần)` : ''}`}
            </text>
          </svg>
        </div>
      </div>
    );
  }

  // --- GEOMETRY 3: STAIRS (Stepped Architectural Staircase) ---
  if (subtype === 'stairs') {
    const shownFlights = isAnswered ? Math.min(intervalsCount, 6) : Math.min(intervalsCount, 4);
    const showEllipsis = intervalsCount > shownFlights;
    const baseStartX = 86;
    const baseY = 162;
    const stepDx = 128;
    const stepDy = 28;

    return (
      <div className="space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-black text-[color:var(--mm-cyan-text)]">
            Mô hình Cầu thang (Số khoảng tầng = Tầng đến − Tầng đi)
          </span>
          <span className="font-semibold text-[color:var(--mm-ink-secondary)]">
            {hideStep
              ? `Xuất phát từ Tầng ${startFloor} · Số ${unitLabel} mỗi khoảng tầng đều bằng nhau`
              : `Xuất phát từ Tầng ${startFloor} · Mỗi khoảng tầng có ${stepLength} ${unitLabel}`}
          </span>
        </div>
        <div className="rounded-2xl bg-[radial-gradient(ellipse_at_bottom_left,_color-mix(in_oklch,var(--mm-cyan-accent)_10%,transparent),_transparent_70%),var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_65%,transparent)] p-3 overflow-x-auto shadow-[inset_0_2px_18px_rgba(0,0,0,0.58)]">
          <svg
            viewBox="0 0 720 198"
            className="w-full h-auto min-w-[520px] select-none"
            role="img"
            aria-label="Sơ đồ leo cầu thang theo khoảng tầng"
          >
            {/* Floor Landing Steps */}
            {Array.from({ length: shownFlights + 1 }).map((_, idx) => {
              const x = baseStartX + idx * stepDx;
              const y = baseY - idx * stepDy;
              const floorNum =
                idx === shownFlights && showEllipsis ? objectsCount : startFloor + idx;
              const isMidEllipsis = showEllipsis && idx === shownFlights - 1;

              return (
                <g key={idx}>
                  {/* Horizontal Landing Platform */}
                  <line
                    x1={x}
                    y1={y}
                    x2={x + 76}
                    y2={y}
                    stroke={MINDMATH_OKLCH_PALETTE.scales.cyan.bright.hex}
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* Floor Badge */}
                  <rect
                    x={x + 6}
                    y={y - 28}
                    width={64}
                    height={22}
                    rx={6}
                    fill={idx === 0 || idx === shownFlights ? 'rgba(56,189,248,0.24)' : '#0b1332'}
                    stroke={MINDMATH_OKLCH_PALETTE.scales.cyan.accent.hex}
                    strokeWidth="1.2"
                  />
                  <text
                    x={x + 38}
                    y={y - 13}
                    textAnchor="middle"
                    fill="#F8FAFC"
                    fontSize="11"
                    fontWeight="800"
                  >
                    {isMidEllipsis ? '...' : `Tầng ${floorNum}`}
                  </text>

                  {/* Diagonal Flight Connecting to Next Floor */}
                  {idx < shownFlights && (
                    <g>
                      <line
                        x1={x + 76}
                        y1={y}
                        x2={x + stepDx}
                        y2={y - stepDy}
                        stroke={MINDMATH_OKLCH_PALETTE.scales.emerald.accent.hex}
                        strokeWidth="3"
                        strokeDasharray={isMidEllipsis ? '4 4' : undefined}
                      />
                      <text
                        x={x + 106}
                        y={y - 4}
                        textAnchor="middle"
                        fill={MINDMATH_OKLCH_PALETTE.scales.amber.text.hex}
                        fontSize="10.5"
                        fontWeight="800"
                      >
                        {isMidEllipsis ? '…' : hideStep ? `? ${unitLabel}` : `${stepLength} ${unitLabel}`}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Summary Footer */}
            <text
              x={360}
              y={188}
              textAnchor="middle"
              fill={MINDMATH_OKLCH_PALETTE.scales.amber.text.hex}
              fontSize="12"
              fontWeight="800"
            >
              {isAnswered
                ? `Từ Tầng ${startFloor} lên Tầng ${objectsCount}: ${intervalsCount} khoảng tầng × ${stepLength} ${unitLabel} = ${totalLength} ${unitLabel}`
                : `Từ Tầng ${startFloor} lên Tầng ${objectsCount} có ? khoảng tầng · Tổng = ? ${unitLabel}`}
            </text>
          </svg>
        </div>
      </div>
    );
  }

  // --- GEOMETRY 4: LINEAR ROAD (both_ends / one_end / neither_end, optional 2-sided & gap items) ---
  const displayIntervals = isAnswered ? Math.min(intervalsCount, 8) : 4;
  const svgW = 720;
  const lineStartX = 76;
  const lineEndX = 644;
  const spanW = lineEndX - lineStartX;
  const segW = spanW / Math.max(1, displayIntervals);

  const hasStartObject = subtype !== 'neither_end';
  const hasEndObject = subtype === 'both_ends';
  const isTwoSided = sidesMultiplier === 2;
  const svgH = isTwoSided ? 188 : 144;

  const endpointTag =
    unknownTarget === 'intervals'
      ? 'Chia đều thành các khoảng bằng nhau ➔ Số khoảng = Tổng độ dài ÷ Độ dài 1 khoảng'
      : itemInGapIcon
      ? 'Đặt vật xen kẽ vào mỗi khoảng trống giữa 2 mốc liên tiếp'
      : subtype === 'both_ends'
      ? 'Trồng cả 2 đầu đường ➔ Số mốc = Số khoảng + 1'
      : subtype === 'one_end'
      ? 'Chỉ trồng 1 đầu đường ➔ Số mốc = Số khoảng'
      : 'Bỏ trống cả 2 đầu đường ➔ Số mốc = Số khoảng − 1';

  const summaryText = isAnswered
    ? `Tổng độ dài = ${intervalsCount} khoảng × ${stepLength} ${unitLabel} = ${totalLength} ${unitLabel}${isTwoSided ? ' (Áp dụng cho cả 2 bên đường × 2)' : ''}`
    : hideTotal
    ? hideStep
      ? `Tổng độ dài = ? ${unitLabel} (${objectsCount} điểm mốc · mỗi khoảng ? ${unitLabel})`
      : `Tổng độ dài = ? ${unitLabel} (${objectsCount} điểm mốc · mỗi khoảng ${stepLength} ${unitLabel})`
    : hideStep
    ? `Tổng độ dài = ${totalLength} ${unitLabel} (${objectsCount} điểm mốc · mỗi khoảng ? ${unitLabel})`
    : `Tổng độ dài = ${totalLength} ${unitLabel} (mỗi khoảng ${stepLength} ${unitLabel})${isTwoSided ? ' · Cả 2 bên đường' : ''}`;

  return (
    <div className="space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-black text-[color:var(--mm-cyan-text)]">
          {endpointTag}
        </span>
        {isTwoSided && (
          <span className="font-black text-[color:var(--mm-amber-bright)]">
            Lưu ý: Cả 2 bên đường (Nhân đôi kết quả 1 bên)
          </span>
        )}
      </div>

      <div className="rounded-2xl bg-[radial-gradient(ellipse_at_center,_color-mix(in_oklch,var(--mm-cyan-accent)_10%,transparent),_transparent_70%),var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_65%,transparent)] p-3 overflow-x-auto shadow-[inset_0_2px_18px_rgba(0,0,0,0.58)]">
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          className="w-full h-auto min-w-[520px] select-none"
          role="img"
          aria-label="Sơ đồ khoảng cách và điểm mốc trên đoạn đường"
        >
          {/* Main Baseline (Side 1) */}
          <line
            x1={lineStartX}
            y1={62}
            x2={lineEndX}
            y2={62}
            stroke={MINDMATH_OKLCH_PALETTE.scales.cyan.accent.hex}
            strokeWidth="4"
            strokeLinecap="round"
          />
          {isTwoSided && (
            <text x={22} y={66} fill={MINDMATH_OKLCH_PALETTE.scales.cyan.text.hex} fontSize="10.5" fontWeight="800">
              Bên 1
            </text>
          )}

          {/* Interval Curly Braces & Optional Gap Items (flowers / benches) */}
          {Array.from({ length: displayIntervals }).map((_, idx) => {
            const x1 = lineStartX + idx * segW;
            const x2 = x1 + segW;
            const midX = (x1 + x2) / 2;
            const isEllipsis = !isAnswered && idx === 2;
            return (
              <g key={idx}>
                {itemInGapIcon && !isEllipsis && (
                  <text x={midX} y={44} textAnchor="middle" fontSize="14">
                    {itemInGapIcon}
                  </text>
                )}
                <path
                  d={buildHorizontalCurlyBracePath(x1 + 3, x2 - 3, 70, 11, 'down')}
                  fill="none"
                  stroke={MINDMATH_OKLCH_PALETTE.scales.emerald.accent.hex}
                  strokeWidth="1.8"
                  strokeDasharray={isEllipsis ? '4 3' : undefined}
                />
                <text
                  x={midX}
                  y={96}
                  textAnchor="middle"
                  fill={MINDMATH_OKLCH_PALETTE.scales.emerald.text.hex}
                  fontSize="11"
                  fontWeight="800"
                >
                  {isEllipsis
                    ? '...'
                    : hideStep
                    ? `? ${unitLabel}`
                    : `${stepLength} ${unitLabel}`}
                </text>
              </g>
            );
          })}

          {/* Endpoint and Internal Nodes (Side 1) */}
          {Array.from({ length: displayIntervals + 1 }).map((_, nodeIdx) => {
            const nx = lineStartX + nodeIdx * segW;
            const isFirst = nodeIdx === 0;
            const isLast = nodeIdx === displayIntervals;
            const showObj =
              (isFirst && hasStartObject) ||
              (isLast && hasEndObject) ||
              (!isFirst && !isLast);

            return (
              <g key={nodeIdx}>
                <line
                  x1={nx}
                  y1={50}
                  x2={nx}
                  y2={74}
                  stroke={MINDMATH_OKLCH_PALETTE.inks.secondary.hex}
                  strokeWidth="2.5"
                />
                {showObj ? (
                  <g>
                    <circle
                      cx={nx}
                      cy={30}
                      r={14}
                      fill={MINDMATH_OKLCH_PALETTE.scales.cyan.tint.hex}
                      stroke={MINDMATH_OKLCH_PALETTE.scales.cyan.accent.hex}
                      strokeWidth="1.5"
                    />
                    <text x={nx} y={35} textAnchor="middle" fontSize="14">
                      {objectIcon}
                    </text>
                  </g>
                ) : (
                  <g>
                    <circle
                      cx={nx}
                      cy={30}
                      r={8}
                      fill="rgba(244,63,94,0.22)"
                      stroke={MINDMATH_OKLCH_PALETTE.scales.rose.accent.hex}
                      strokeWidth="1.6"
                      strokeDasharray="2 2"
                    />
                    <text
                      x={nx}
                      y={34}
                      textAnchor="middle"
                      fill={MINDMATH_OKLCH_PALETTE.scales.rose.bright.hex}
                      fontSize="10"
                      fontWeight="900"
                    >
                      ×
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Mirror Lane for 2-Sided Road Problems */}
          {isTwoSided && (
            <g>
              <line
                x1={lineStartX}
                y1={126}
                x2={lineEndX}
                y2={126}
                stroke={MINDMATH_OKLCH_PALETTE.scales.amber.accent.hex}
                strokeWidth="3.5"
                strokeDasharray="6 4"
                strokeLinecap="round"
              />
              <text x={22} y={130} fill={MINDMATH_OKLCH_PALETTE.scales.amber.text.hex} fontSize="10.5" fontWeight="800">
                Bên 2
              </text>
              {Array.from({ length: displayIntervals + 1 }).map((_, nodeIdx) => {
                const nx = lineStartX + nodeIdx * segW;
                const isFirst = nodeIdx === 0;
                const isLast = nodeIdx === displayIntervals;
                const showObj =
                  (isFirst && hasStartObject) ||
                  (isLast && hasEndObject) ||
                  (!isFirst && !isLast);
                if (!showObj) return null;
                return (
                  <g key={nodeIdx}>
                    <circle
                      cx={nx}
                      cy={142}
                      r={11}
                      fill="rgba(251,191,36,0.16)"
                      stroke={MINDMATH_OKLCH_PALETTE.scales.amber.accent.hex}
                      strokeWidth="1.2"
                    />
                    <text x={nx} y={146} textAnchor="middle" fontSize="11.5">
                      {objectIcon}
                    </text>
                  </g>
                );
              })}
              {itemInGapIcon &&
                Array.from({ length: displayIntervals }).map((_, idx) => {
                  const midX = lineStartX + (idx + 0.5) * segW;
                  const isEllipsis = !isAnswered && idx === 2;
                  if (isEllipsis) return null;
                  return (
                    <text key={`gap2-${idx}`} x={midX} y={145} textAnchor="middle" fontSize="12.5">
                      {itemInGapIcon}
                    </text>
                  );
                })}
            </g>
          )}

          {/* Total Length Summary */}
          <text
            x={svgW / 2}
            y={isTwoSided ? 176 : 128}
            textAnchor="middle"
            fill={MINDMATH_OKLCH_PALETTE.scales.amber.text.hex}
            fontSize="12"
            fontWeight="800"
          >
            {summaryText}
          </text>
        </svg>
      </div>
    </div>
  );
};

function getDisplaySecondaryReading(reading: string, isAnswered: boolean): string {
  if (isAnswered) return reading;
  if (reading.includes('?')) return reading;
  const safePrefixPattern =
    /^(Rót ra:|Rót đầy |Cắt đi:|Bình B:|Nửa hũ:|Phần chồng =|Lấy ra:|Nửa thùng:|BC =|Đĩa trái:|Đĩa phải:|Phải:|Nửa bình:|Rót \d+ cốc|Mối nối chồng:|Rót bớt:|Vỏ \+ Nửa|Mỗi chỗ dán|1 Bưởi =|Nửa can:|Lấy đi:|Cắt bớt:|Chia đều|Đã có:|Hiện có:|Giỏ 2:|Vỏ hộp:|Vỏ hũ:|Mỗi túi:|Mỗi chai:|Mỗi tách:|Mỗi cốc:|Giỏ nửa táo:|Thùng B:|Thùng nửa:|Chai nửa:|Còn nửa|Đã uống:|Múc |Tìm:)/;
  if (safePrefixPattern.test(reading)) return reading;

  const eqIdx = reading.indexOf('=');
  const colonIdx = reading.indexOf(':');
  if (eqIdx > 0 && !/[+\-:×]/.test(reading.slice(0, eqIdx))) {
    return `${reading.slice(0, eqIdx).trim()} = ?`;
  }
  if (colonIdx > 0) {
    return `${reading.slice(0, colonIdx).trim()} = ?`;
  }
  if (reading.trim().startsWith('=')) {
    return '= ?';
  }
  return 'Cần quy đổi & tính toán = ?';
}

/**
 * Step 2D: Authentic SVG Measurement Lab Instruments
 * Always displays the "Convert First, Model Second" Singapore Math rule + domain SVG instrument.
 */
const CPASvgMeasurementDiagram: React.FC<{
  pictorial: MeasurementPictorialSpec;
  isAnswered: boolean;
}> = ({ pictorial, isAnswered }) => {
  const {
    subtype,
    operation,
    chartItems,
    primaryReading,
    secondaryReading,
    conversionRule,
    visualParams,
    expectedNumericResult,
    resultUnit,
  } = pictorial;

  const mode = visualParams?.mode;

  const renderInstrumentSVG = () => {
    // 1. Overlapping Boards / Strips Join Diagram
    if (mode === 'overlap_join') {
      const count = visualParams?.givenCount || 2;
      const len = visualParams?.givenA || 60;
      const overlap = visualParams?.givenB || 8;
      const unit = visualParams?.unitA || 'cm';
      const shownCount = Math.min(count, 4);
      const startX = 64;
      const plankW = shownCount === 2 ? 270 : shownCount === 3 ? 205 : 165;
      const ovW = 36;

      return (
        <svg viewBox="0 0 720 142" className="w-full h-auto min-w-[500px] select-none" role="img" aria-label="Sơ đồ ghép nối chồng lấn">
          {Array.from({ length: shownCount }).map((_, idx) => {
            const x = startX + idx * (plankW - ovW);
            const y = idx % 2 === 0 ? 32 : 52;
            const fill = idx % 2 === 0 ? '#0284C7' : '#0D9488';
            return (
              <g key={idx}>
                <rect x={x} y={y} width={plankW} height={28} rx={6} fill={fill} fillOpacity={0.88} stroke="#E0F2FE" strokeWidth="1.2" />
                <text x={x + plankW / 2} y={y + 18} textAnchor="middle" fill="#FFFFFF" fontSize="11.5" fontWeight="800">
                  Thanh {idx + 1}: {len} {unit}
                </text>
              </g>
            );
          })}

          {/* Highlight Overlap Seams */}
          {Array.from({ length: shownCount - 1 }).map((_, idx) => {
            const ox = startX + (idx + 1) * (plankW - ovW);
            return (
              <g key={idx}>
                <rect x={ox} y={26} width={ovW} height={60} rx={4} fill="rgba(251,191,36,0.34)" stroke="#FBBF24" strokeWidth="1.6" strokeDasharray="3 3" />
                <text x={ox + ovW / 2} y={20} textAnchor="middle" fill="#FDE68A" fontSize="10.5" fontWeight="900">
                  −{overlap} {unit}
                </text>
              </g>
            );
          })}

          <path
            d={buildHorizontalCurlyBracePath(startX, startX + shownCount * plankW - (shownCount - 1) * ovW, 92, 10, 'down')}
            fill="none"
            stroke="#38BDF8"
            strokeWidth="2"
          />
          <text x={360} y={128} textAnchor="middle" fill="#FDE68A" fontSize="12" fontWeight="800">
            {isAnswered
              ? `Độ dài thanh ghép (${count} thanh, ${count - 1} mối chồng) = ${count * len - (count - 1) * overlap} ${unit}`
              : `Ghép ${count} thanh (${count - 1} mối chồng ${overlap} ${unit}) ➔ Tổng dài = ? ${unit}`}
          </text>
        </svg>
      );
    }

    // 2. Tare Weight (Full Container vs Half Container Split-Bar Diagram)
    if (mode === 'tare_half') {
      const fullVal = visualParams?.givenA || 1500;
      const halfVal = visualParams?.givenB || 900;
      const unit = visualParams?.unitA || 'g';
      const fullLabel = visualParams?.labelA
        ? /\d/.test(visualParams.labelA)
          ? visualParams.labelA
          : `${visualParams.labelA} (${fullVal} ${unit})`
        : `Đầy (${fullVal} ${unit})`;
      const halfLabel = visualParams?.labelB
        ? /\d/.test(visualParams.labelB)
          ? visualParams.labelB
          : `${visualParams.labelB} (${halfVal} ${unit})`
        : `Một nửa (${halfVal} ${unit})`;
      const barX = 186;
      const shellW = 84;
      const halfContentW = 176;

      return (
        <svg viewBox="0 0 720 154" className="w-full h-auto min-w-[500px] select-none" role="img" aria-label="Sơ đồ tách vỏ và phần ruột">
          {/* Row 1: Full = Shell + Half + Half */}
          <text x={12} y={48} fill="#E2E8F0" fontSize="11" fontWeight="800">{fullLabel}</text>
          <rect x={barX} y={28} width={shellW} height={32} rx={6} fill="#475569" stroke="#CBD5E1" strokeWidth="1.2" />
          <text x={barX + shellW / 2} y={48} textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">
            {isAnswered ? `Vỏ (${expectedNumericResult})` : 'Vỏ (?)'}
          </text>
          <rect x={barX + shellW + 2} y={28} width={halfContentW} height={32} rx={4} fill="#F59E0B" stroke="#FDE68A" strokeWidth="1.2" />
          <text x={barX + shellW + 2 + halfContentW / 2} y={48} textAnchor="middle" fill="#05081D" fontSize="11" fontWeight="900">Nửa ruột (1/2)</text>
          <rect x={barX + shellW + halfContentW + 4} y={28} width={halfContentW} height={32} rx={6} fill="#FBBF24" stroke="#FEF3C7" strokeWidth="1.4" strokeDasharray="4 3" />
          <text x={barX + shellW + halfContentW + 4 + halfContentW / 2} y={48} textAnchor="middle" fill="#05081D" fontSize="11" fontWeight="900">Nửa ruột lấy ra</text>

          {/* Row 2: Half = Shell + Half */}
          <text x={12} y={96} fill="#E2E8F0" fontSize="11" fontWeight="800">{halfLabel}</text>
          <rect x={barX} y={76} width={shellW} height={32} rx={6} fill="#475569" stroke="#CBD5E1" strokeWidth="1.2" />
          <text x={barX + shellW / 2} y={96} textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">
            {isAnswered ? `Vỏ (${expectedNumericResult})` : 'Vỏ (?)'}
          </text>
          <rect x={barX + shellW + 2} y={76} width={halfContentW} height={32} rx={6} fill="#F59E0B" stroke="#FDE68A" strokeWidth="1.2" />
          <text x={barX + shellW + 2 + halfContentW / 2} y={96} textAnchor="middle" fill="#05081D" fontSize="11" fontWeight="900">Nửa ruột còn lại</text>

          {/* Vertical Alignment & Difference Brace */}
          <line x1={barX + shellW + halfContentW + 3} y1={24} x2={barX + shellW + halfContentW + 3} y2={122} stroke="#38BDF8" strokeWidth="1.6" strokeDasharray="4 4" />
          <path
            d={buildHorizontalCurlyBracePath(barX + shellW + halfContentW + 4, barX + shellW + halfContentW * 2 + 4, 114, 10, 'down')}
            fill="none"
            stroke="#38BDF8"
            strokeWidth="2"
          />
          <text x={barX + shellW + halfContentW * 1.5 + 4} y={142} textAnchor="middle" fill="#67E8F9" fontSize="11.5" fontWeight="800">
            {isAnswered
              ? `Hiệu = ${fullVal} − ${halfVal} = ${fullVal - halfVal} ${unit} (Nửa ruột)`
              : `Hiệu (${fullVal} − ${halfVal}) = Nửa ruột`}
          </text>
        </svg>
      );
    }

    // 3. Bridge / Substitution Chain Scale (1 Melon = 3 Pomelos, 1 Pomelo = 4 Apples)
    if (mode === 'bridge_chain') {
      return (
        <svg viewBox="0 0 720 120" className="w-full h-auto min-w-[500px] select-none" role="img" aria-label="Sơ đồ cân thăng bằng bắc cầu">
          <rect x={28} y={24} width={186} height={54} rx={12} fill="rgba(16,185,129,0.2)" stroke="#34D399" strokeWidth="1.5" />
          <text x={121} y={48} textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="900">
            {visualParams?.labelA || '1 Dưa = 3 Bưởi'}
          </text>
          <text x={121} y={66} textAnchor="middle" fill="#6EE7B7" fontSize="11" fontWeight="700">
            Bước 1: Đổi sang trung gian
          </text>

          <text x={242} y={56} textAnchor="middle" fill="#FBBF24" fontSize="20" fontWeight="900">→</text>

          <rect x={268} y={24} width={212} height={54} rx={12} fill="rgba(56,189,248,0.2)" stroke="#38BDF8" strokeWidth="1.5" />
          <text x={374} y={48} textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="900">
            {visualParams?.labelB || '1 Bưởi = 4 Táo (200 g)'}
          </text>
          <text x={374} y={66} textAnchor="middle" fill="#7DD3FC" fontSize="11" fontWeight="700">
            Bước 2: Quy đổi về đơn vị nhỏ
          </text>

          <text x={508} y={56} textAnchor="middle" fill="#FBBF24" fontSize="20" fontWeight="900">→</text>

          <rect x={534} y={24} width={158} height={54} rx={12} fill="rgba(251,191,36,0.2)" stroke="#FBBF24" strokeWidth="1.6" />
          <text x={613} y={48} textAnchor="middle" fill="#FEF3C7" fontSize="12.5" fontWeight="900">
            {isAnswered ? `${expectedNumericResult} ${visualParams?.unitA || 'g'}` : `? ${visualParams?.unitA || 'g'}`}
          </text>
          <text x={613} y={66} textAnchor="middle" fill="#FDE68A" fontSize="10.5" fontWeight="700">
            Kết quả cân nặng
          </text>
        </svg>
      );
    }

    // 4. Equalize Transfer Diagram (Unit- & Subtype-Aware: Cargo Crates for Mass, Beakers for Volume)
    if (mode === 'equalize_pour') {
      const a = visualParams?.givenA || 750;
      const b = visualParams?.givenB || 350;
      const eqUnit = resultUnit || visualParams?.unitA || 'mL';
      const isMassTransfer = subtype === 'weight_balance' || eqUnit === 'g' || eqUnit === 'kg';
      const maxCap = Math.max(a, b, 1) * 1.12;
      const hA = Math.max(24, (a / maxCap) * 86);
      const hB = Math.max(24, (b / maxCap) * 86);
      const eqH = (hA + hB) / 2;
      const formatLabel = (raw: string | undefined, fallbackPrefix: string, val: number) => {
        if (!raw) return `${fallbackPrefix} (${val} ${eqUnit})`;
        return /\d/.test(raw) ? raw : `${raw} (${val} ${eqUnit})`;
      };
      const lblA = formatLabel(visualParams?.labelA, isMassTransfer ? 'Thùng A' : 'Bình A', a);
      const lblB = formatLabel(visualParams?.labelB, isMassTransfer ? 'Thùng B' : 'Bình B', b);
      const actionVerb = isMassTransfer ? 'Chuyển' : 'Rót';

      return (
        <svg
          viewBox="0 0 720 156"
          className="w-full h-auto min-w-[500px] select-none"
          role="img"
          aria-label={isMassTransfer ? 'Sơ đồ san đều khối lượng hai thùng' : 'Sơ đồ rót nước san bằng hai bình'}
        >
          {/* Container A */}
          <rect
            x={140}
            y={24}
            width={116}
            height={96}
            rx={isMassTransfer ? 6 : 10}
            fill="rgba(15,23,42,0.75)"
            stroke={isMassTransfer ? '#F59E0B' : '#38BDF8'}
            strokeWidth="2"
          />
          <rect
            x={144}
            y={118 - hA}
            width={108}
            height={hA}
            rx={isMassTransfer ? 4 : 6}
            fill={isMassTransfer ? 'rgba(245,158,11,0.72)' : 'rgba(14,165,233,0.72)'}
          />
          <line x1={134} y1={118 - eqH} x2={264} y2={118 - eqH} stroke="#FBBF24" strokeWidth="1.6" strokeDasharray="4 4" />
          <text x={198} y={142} textAnchor="middle" fill="#E0F2FE" fontSize="11.5" fontWeight="800">
            {lblA}
          </text>

          {/* Curved Transfer Arrow */}
          <path d="M 272 52 Q 360 12 448 52" fill="none" stroke="#FBBF24" strokeWidth="2.5" strokeDasharray="5 4" />
          <polygon points="448,52 436,44 439,56" fill="#FBBF24" />
          <text x={360} y={24} textAnchor="middle" fill="#FDE68A" fontSize="11.5" fontWeight="900">
            {isAnswered
              ? `${actionVerb} ${expectedNumericResult} ${eqUnit}`
              : `${actionVerb} 1/2 phần hơn = ? ${eqUnit}`}
          </text>

          {/* Container B */}
          <rect
            x={464}
            y={24}
            width={116}
            height={96}
            rx={isMassTransfer ? 6 : 10}
            fill="rgba(15,23,42,0.75)"
            stroke="#34D399"
            strokeWidth="2"
          />
          <rect
            x={468}
            y={118 - hB}
            width={108}
            height={hB}
            rx={isMassTransfer ? 4 : 6}
            fill="rgba(16,185,129,0.72)"
          />
          <line x1={458} y1={118 - eqH} x2={588} y2={118 - eqH} stroke="#FBBF24" strokeWidth="1.6" strokeDasharray="4 4" />
          <text x={522} y={142} textAnchor="middle" fill="#D1FAE5" fontSize="11.5" fontWeight="800">
            {lblB}
          </text>
        </svg>
      );
    }

    // 5. Weight Balance / Mass Operations Diagram
    if (subtype === 'weight_balance') {
      const resUnit = resultUnit || visualParams?.unitA || 'g';

      // 5A. Mass Addition (Part A + Part B = Total) -> Part-Whole Sum Bar, NOT an equal two-pan balance!
      if (mode === 'sum') {
        const partALabel = primaryReading || visualParams?.labelA || 'Phần thứ nhất';
        const partBLabel =
          (secondaryReading ? getDisplaySecondaryReading(secondaryReading, isAnswered) : undefined) ||
          visualParams?.labelB ||
          'Phần thứ hai';
        return (
          <svg viewBox="0 0 720 138" className="w-full h-auto min-w-[500px] select-none" role="img" aria-label="Sơ đồ cộng khối lượng sau quy đổi">
            <rect x={60} y={24} width={356} height={38} rx={6} fill="#0284C7" stroke="#7DD3FC" strokeWidth="1.4" />
            <text x={238} y={48} textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="900">
              {partALabel}
            </text>
            <rect x={418} y={24} width={242} height={38} rx={6} fill="#0D9488" stroke="#5EEAD4" strokeWidth="1.4" />
            <text x={539} y={48} textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="900">
              {partBLabel}
            </text>
            <path d={buildHorizontalCurlyBracePath(60, 660, 72, 12, 'down')} fill="none" stroke="#FBBF24" strokeWidth="2.2" />
            <text x={360} y={114} textAnchor="middle" fill="#FDE68A" fontSize="12.5" fontWeight="800">
              {isAnswered
                ? `Đổi cùng đơn vị (${resUnit}) rồi cộng ➔ Tổng = ${expectedNumericResult} ${resUnit}`
                : `Đổi cùng đơn vị (${resUnit}) rồi cộng ➔ Tổng = ? ${resUnit}`}
            </text>
          </svg>
        );
      }

      // 5B. Equal Packaging / Mass-to-Bag Count Division (Total kg ÷ pack size g = ? bags)
      // Preserve two-pan balance scale for per-item balance problems (e.g., "3 hộp sữa = 900 g")
      if (
        mode === 'divide_equal' &&
        visualParams?.givenB &&
        !visualParams?.givenCount &&
        resUnit !== 'g' &&
        resUnit !== 'kg'
      ) {
        const packSize = visualParams.givenB;
        const packUnit = visualParams?.unitA || 'g';
        return (
          <svg viewBox="0 0 720 144" className="w-full h-auto min-w-[500px] select-none" role="img" aria-label="Sơ đồ chia đều khối lượng vào các túi">
            {/* Total weight bar on top */}
            <text x={360} y={20} textAnchor="middle" fill="#67E8F9" fontSize="12" fontWeight="800">
              {primaryReading || 'Tổng khối lượng'}
            </text>
            <path d={buildHorizontalCurlyBracePath(60, 440, 38, 10, 'up')} fill="none" stroke="#38BDF8" strokeWidth="2" />
            {/* Sample equal packets */}
            {[0, 1, 2].map((idx) => (
              <g key={idx}>
                <rect x={60 + idx * 96} y={46} width={90} height={38} rx={7} fill="#0284C7" stroke="#7DD3FC" strokeWidth="1.4" />
                <text x={105 + idx * 96} y={69} textAnchor="middle" fill="#FFFFFF" fontSize="11.5" fontWeight="900">
                  {packSize} {packUnit}
                </text>
              </g>
            ))}
            <rect x={348} y={46} width={92} height={38} rx={7} fill="rgba(56,189,248,0.18)" stroke="#7DD3FC" strokeWidth="1.4" strokeDasharray="4 4" />
            <text x={394} y={69} textAnchor="middle" fill="#BAE6FD" fontSize="12" fontWeight="900">
              ... ({packSize} {packUnit})
            </text>

            {/* Arrow & Count Result Box */}
            <line x1={454} y1={65} x2={494} y2={65} stroke="#FBBF24" strokeWidth="2.4" strokeDasharray="4 3" />
            <polygon points="494,65 484,59 484,71" fill="#FBBF24" />
            <rect x={502} y={36} width={174} height={58} rx={12} fill="rgba(16,185,129,0.18)" stroke="#34D399" strokeWidth="1.6" />
            <text x={589} y={58} textAnchor="middle" fill="#A7F3D0" fontSize="11" fontWeight="800">
              Số {resUnit} chia được
            </text>
            <text x={589} y={80} textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="900">
              {isAnswered ? `${expectedNumericResult} ${resUnit}` : `? ${resUnit}`}
            </text>

            <text x={360} y={122} textAnchor="middle" fill="#FDE68A" fontSize="12" fontWeight="800">
              {isAnswered
                ? `Đổi sang ${packUnit} rồi chia cho ${packSize} ${packUnit} ➔ ${expectedNumericResult} ${resUnit}`
                : `Đổi sang ${packUnit} rồi chia đều mỗi phần ${packSize} ${packUnit} ➔ ? ${resUnit}`}
            </text>
          </svg>
        );
      }

      // 5C. Subtraction / Complement / Tare Weight -> Part-Whole Subtraction Bar, NOT an equal two-pan balance!
      if (mode === 'subtract') {
        const subUnit = visualParams?.unitA || resultUnit || 'g';
        const isComplement =
          /^Mục tiêu/i.test(primaryReading || '') || /Đã có/i.test(visualParams?.labelB || secondaryReading || '');
        const isTare =
          operation === 'tare_weight' || /Vỏ/i.test(visualParams?.labelB || secondaryReading || '');
        const topLabel = primaryReading || visualParams?.labelA || 'Khối lượng ban đầu';
        const knownSubVal = visualParams?.givenB;
        const formatRightPart = (raw: string | undefined, fallback: string) => {
          const base = raw || fallback;
          if (knownSubVal !== undefined && !/\d/.test(base)) {
            return `${base}: ${knownSubVal} ${subUnit}`;
          }
          return base;
        };

        if (isComplement) {
          return (
            <svg viewBox="0 0 720 142" className="w-full h-auto min-w-[500px] select-none" role="img" aria-label="Sơ đồ bù khối lượng cho đủ mục tiêu">
              <text x={360} y={22} textAnchor="middle" fill="#67E8F9" fontSize="12" fontWeight="800">
                {topLabel}
              </text>
              <path d={buildHorizontalCurlyBracePath(60, 660, 42, 10, 'up')} fill="none" stroke="#38BDF8" strokeWidth="2" />
              <rect x={60} y={48} width={260} height={38} rx={6} fill="#0284C7" stroke="#7DD3FC" strokeWidth="1.4" />
              <text x={190} y={72} textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="900">
                {formatRightPart(secondaryReading || visualParams?.labelB, 'Đã có')}
              </text>
              <rect x={322} y={48} width={338} height={38} rx={6} fill="rgba(245,158,11,0.28)" stroke="#FBBF24" strokeWidth="1.6" strokeDasharray="4 3" />
              <text x={491} y={72} textAnchor="middle" fill="#FEF3C7" fontSize="12" fontWeight="900">
                {isAnswered ? `Cần đặt thêm: ${expectedNumericResult} ${subUnit}` : `Cần đặt thêm: ? ${subUnit}`}
              </text>
              <text x={360} y={118} textAnchor="middle" fill="#FDE68A" fontSize="12" fontWeight="800">
                {isAnswered
                  ? `Đổi cùng đơn vị (${subUnit}) rồi tìm phần thiếu ➔ Cần thêm ${expectedNumericResult} ${subUnit}`
                  : `Đổi cùng đơn vị (${subUnit}) rồi tìm phần còn thiếu ➔ Cần thêm = ? ${subUnit}`}
              </text>
            </svg>
          );
        }

        const leftCaption = isTare ? 'Phần ruột' : 'Còn lại';
        const rightLabel = formatRightPart(
          visualParams?.labelB || (secondaryReading ? getDisplaySecondaryReading(secondaryReading, isAnswered) : undefined),
          isTare ? 'Vỏ hộp' : 'Lấy ra'
        );

        return (
          <svg viewBox="0 0 720 142" className="w-full h-auto min-w-[500px] select-none" role="img" aria-label="Sơ đồ trừ khối lượng sau quy đổi">
            <text x={360} y={22} textAnchor="middle" fill="#67E8F9" fontSize="12" fontWeight="800">
              {topLabel}
            </text>
            <path d={buildHorizontalCurlyBracePath(60, 660, 42, 10, 'up')} fill="none" stroke="#38BDF8" strokeWidth="2" />
            {/* Remaining / Net part */}
            <rect x={60} y={48} width={376} height={38} rx={6} fill="#0284C7" stroke="#7DD3FC" strokeWidth="1.4" />
            <text x={248} y={72} textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="900">
              {isAnswered ? `${leftCaption}: ${expectedNumericResult} ${subUnit}` : `${leftCaption}: ? ${subUnit}`}
            </text>
            {/* Removed / Tare part */}
            <rect x={438} y={48} width={222} height={38} rx={6} fill="rgba(244,63,94,0.68)" stroke="#FDA4AF" strokeWidth="1.4" strokeDasharray="4 3" />
            <text x={549} y={72} textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="900">
              {rightLabel}
            </text>
            <text x={360} y={118} textAnchor="middle" fill="#FDE68A" fontSize="12" fontWeight="800">
              {isAnswered
                ? isTare
                  ? `Đổi cùng đơn vị (${subUnit}) rồi trừ phần vỏ ➔ ${leftCaption} = ${expectedNumericResult} ${subUnit}`
                  : `Đổi cùng đơn vị (${subUnit}) rồi trừ phần lấy ra ➔ ${leftCaption} ${expectedNumericResult} ${subUnit}`
                : isTare
                ? `Đổi cùng đơn vị (${subUnit}) rồi trừ phần vỏ ➔ ${leftCaption} = ? ${subUnit}`
                : `Đổi cùng đơn vị (${subUnit}) rồi trừ phần lấy ra ➔ ${leftCaption} = ? ${subUnit}`}
            </text>
          </svg>
        );
      }

      const leftPanText =
        mode === 'convert'
          ? primaryReading || `${visualParams?.labelA || ''} ${visualParams?.labelB || ''}`.trim()
          : visualParams?.labelA || primaryReading || 'Đĩa trái';
      const rightPanText =
        mode === 'convert'
          ? isAnswered
            ? `${expectedNumericResult} ${resultUnit || 'g'}`
            : `? ${resultUnit || 'g'}`
          : visualParams?.labelB ||
            (secondaryReading ? getDisplaySecondaryReading(secondaryReading, isAnswered) : 'Đĩa phải');

      return (
        <svg viewBox="0 0 720 148" className="w-full h-auto min-w-[500px] select-none" role="img" aria-label="Sơ đồ cân thăng bằng hai đĩa">
          {/* Fulcrum & Beam */}
          <polygon points="360,126 336,142 384,142" fill="#475569" stroke="#94A3B8" strokeWidth="1.4" />
          <line x1={360} y1={44} x2={360} y2={126} stroke="#94A3B8" strokeWidth="4" />
          <line x1={164} y1={52} x2={556} y2={52} stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
          <circle cx={360} cy={52} r={7} fill="#FBBF24" />

          {/* Left Pan */}
          <line x1={194} y1={52} x2={164} y2={92} stroke="#94A3B8" strokeWidth="1.5" />
          <line x1={194} y1={52} x2={224} y2={92} stroke="#94A3B8" strokeWidth="1.5" />
          <rect x={92} y={88} width={204} height={34} rx={8} fill="rgba(14,165,233,0.22)" stroke="#38BDF8" strokeWidth="1.5" />
          <text x={194} y={109} textAnchor="middle" fill="#F8FAFC" fontSize={leftPanText.length > 22 ? '10.5' : '11.5'} fontWeight="800">
            {leftPanText}
          </text>

          {/* Right Pan */}
          <line x1={526} y1={52} x2={496} y2={92} stroke="#94A3B8" strokeWidth="1.5" />
          <line x1={526} y1={52} x2={556} y2={92} stroke="#94A3B8" strokeWidth="1.5" />
          <rect x={424} y={88} width={204} height={34} rx={8} fill="rgba(251,191,36,0.2)" stroke="#FBBF24" strokeWidth="1.5" />
          <text x={526} y={109} textAnchor="middle" fill="#FEF3C7" fontSize={rightPanText.length > 22 ? '10.5' : '11.5'} fontWeight="800">
            {rightPanText}
          </text>

          <text x={360} y={30} textAnchor="middle" fill="#67E8F9" fontSize="11.5" fontWeight="800">
            {isAnswered
              ? `Cân thăng bằng ➔ Kết quả = ${expectedNumericResult} ${resultUnit}`
              : mode === 'convert'
              ? 'Quy đổi khối lượng tương đương (Trái = Phải)'
              : 'Cân ở vị trí thăng bằng (Trái = Phải)'}
          </text>
        </svg>
      );
    }

    // 6. Graduated Cylinder Volume Beaker (Context- & Unit-Aware for convert / sum / subtract / complement / divide_equal)
    if (subtype === 'volume_beaker') {
      const a = visualParams?.givenA || 2000;
      const b = visualParams?.givenB || 600;
      const outUnit = resultUnit || visualParams?.unitB || visualParams?.unitA || 'mL';
      const isComplement =
        mode === 'subtract' &&
        (/Vạch đầy|Mục tiêu/i.test(primaryReading || '') || /Hiện có/i.test(secondaryReading || visualParams?.labelB || ''));
      const isWorkingBackwards =
        mode === 'sum' && /Làm ngược|ban đầu/i.test(conversionRule || '');
      const isCountDivision =
        mode === 'divide_equal' && outUnit !== 'mL' && outUnit !== 'L';

      const fillRatio = isComplement
        ? Math.min(0.85, Math.max(0.18, b / Math.max(a, 1)))
        : mode === 'subtract'
        ? Math.min(0.88, Math.max(0.18, (a - b) / Math.max(a, 1)))
        : 0.72;
      const fillH = Math.round(fillRatio * 84);

      const beakerLabel =
        mode === 'convert' || mode === 'divide_equal'
          ? primaryReading || visualParams?.labelA || 'Bình ban đầu'
          : isComplement
          ? secondaryReading || visualParams?.labelB || 'Hiện có'
          : visualParams?.labelA || primaryReading || 'Bình ban đầu';

      const arrowLabel =
        mode === 'convert'
          ? conversionRule || '1 L = 1 000 mL'
          : isComplement
          ? `Rót thêm tới ${primaryReading?.replace(/^[^:]+:\s*/, '') || '1 L'}`
          : isWorkingBackwards
          ? 'Đi ngược phép tính'
          : mode === 'divide_equal'
          ? secondaryReading
            ? getDisplaySecondaryReading(secondaryReading, isAnswered)
            : 'Chia đều'
          : visualParams?.labelB ||
            (secondaryReading ? getDisplaySecondaryReading(secondaryReading, isAnswered) : 'Chia / Rót');

      const resultBoxHeader =
        mode === 'convert'
          ? 'Kết quả sau quy đổi'
          : isComplement
          ? 'Lượng nước cần rót thêm'
          : isWorkingBackwards
          ? 'Lượng nước lúc đầu'
          : mode === 'sum'
          ? 'Tổng dung tích'
          : isCountDivision
          ? `Số ${outUnit} rót được`
          : mode === 'divide_equal'
          ? 'Mỗi chai / phần chứa'
          : 'Lượng nước còn lại';

      return (
        <svg viewBox="0 0 720 146" className="w-full h-auto min-w-[500px] select-none" role="img" aria-label="Bình chia độ đo thể tích">
          {/* Main Beaker */}
          <rect x={110} y={24} width={128} height={96} rx={10} fill="rgba(15,23,42,0.8)" stroke="#38BDF8" strokeWidth="2" />
          <rect x={114} y={118 - fillH} width={120} height={fillH} rx={6} fill="rgba(56,189,248,0.62)" />
          {isComplement && (
            <line x1={108} y1={32} x2={240} y2={32} stroke="#FBBF24" strokeWidth="2" strokeDasharray="4 4" />
          )}
          {[0, 1, 2, 3].map((t) => (
            <line key={t} x1={114} y1={38 + t * 22} x2={130} y2={38 + t * 22} stroke="#BAE6FD" strokeWidth="1.4" />
          ))}
          <text x={174} y={138} textAnchor="middle" fill="#E0F2FE" fontSize={beakerLabel.length > 22 ? '10.5' : '11.5'} fontWeight="800">
            {beakerLabel}
          </text>

          {/* Action Arrow */}
          <line x1={254} y1={72} x2={386} y2={72} stroke="#FBBF24" strokeWidth="2.5" strokeDasharray="5 4" />
          <polygon points="386,72 374,65 374,79" fill="#FBBF24" />
          <text x={320} y={56} textAnchor="middle" fill="#FDE68A" fontSize={arrowLabel.length > 24 ? '10' : '11'} fontWeight="900">
            {arrowLabel}
          </text>

          {/* Result Callout Box */}
          <rect x={402} y={40} width={224} height={64} rx={12} fill="rgba(16,185,129,0.16)" stroke="#34D399" strokeWidth="1.6" />
          <text x={514} y={66} textAnchor="middle" fill="#A7F3D0" fontSize="11" fontWeight="800">
            {resultBoxHeader}
          </text>
          <text x={514} y={88} textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="900">
            {isAnswered ? `${expectedNumericResult} ${outUnit}` : `? ${outUnit}`}
          </text>
        </svg>
      );
    }

    // 7. Graduated Metric Ruler / Tape Diagram for Length Scale
    if (mode === 'subtract') {
      const resUnit = visualParams?.unitA || resultUnit || 'cm';
      return (
        <svg viewBox="0 0 720 148" className="w-full h-auto min-w-[500px] select-none" role="img" aria-label="Thước đo cắt bớt độ dài">
          {/* Top Whole-Length Brace */}
          <text x={360} y={20} textAnchor="middle" fill="#67E8F9" fontSize="12" fontWeight="800">
            {visualParams?.labelA || primaryReading || 'Chiều dài ban đầu'}
          </text>
          <path d={buildHorizontalCurlyBracePath(60, 660, 40, 10, 'up')} fill="none" stroke="#38BDF8" strokeWidth="2" />

          {/* Remaining Segment (Left) */}
          <rect x={60} y={46} width={356} height={36} rx={6} fill="#0284C7" stroke="#7DD3FC" strokeWidth="1.3" />
          <text x={238} y={69} textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="900">
            {isAnswered ? `Còn lại: ${expectedNumericResult} ${resUnit}` : `Còn lại: ? ${resUnit}`}
          </text>
          {/* Cut-Off Segment (Right) */}
          <rect
            x={418}
            y={46}
            width={242}
            height={36}
            rx={6}
            fill="rgba(244,63,94,0.68)"
            stroke="#FDA4AF"
            strokeWidth="1.3"
            strokeDasharray="4 3"
          />
          <text x={539} y={69} textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="900">
            {visualParams?.labelB || (secondaryReading ? getDisplaySecondaryReading(secondaryReading, isAnswered) : 'Đoạn cắt đi')}
          </text>

          {/* Ruler Tick Marks */}
          {Array.from({ length: 21 }).map((_, idx) => {
            const tx = 60 + idx * 30;
            const tall = idx % 5 === 0;
            return (
              <line
                key={idx}
                x1={tx}
                y1={82}
                x2={tx}
                y2={tall ? 96 : 90}
                stroke="#94A3B8"
                strokeWidth={tall ? '1.6' : '1'}
              />
            );
          })}

          <text x={360} y={128} textAnchor="middle" fill="#FDE68A" fontSize="12" fontWeight="800">
            {isAnswered
              ? `Đổi sang ${resUnit} rồi trừ phần cắt đi ➔ Còn lại = ${expectedNumericResult} ${resUnit}`
              : `Đổi cùng đơn vị (${resUnit}) rồi trừ phần cắt đi ➔ Còn lại = ? ${resUnit}`}
          </text>
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 720 132" className="w-full h-auto min-w-[500px] select-none" role="img" aria-label="Thước đo độ dài và sơ đồ đoạn thẳng">
        {/* Metric Tape */}
        <rect x={60} y={32} width={356} height={36} rx={6} fill="#0284C7" stroke="#7DD3FC" strokeWidth="1.3" />
        <text x={238} y={55} textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="900">
          {visualParams?.labelA || primaryReading || 'Đoạn thứ nhất'}
        </text>
        <rect
          x={418}
          y={32}
          width={242}
          height={36}
          rx={6}
          fill="#0D9488"
          stroke="#5EEAD4"
          strokeWidth="1.3"
        />
        <text x={539} y={55} textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="900">
          {visualParams?.labelB || (secondaryReading ? getDisplaySecondaryReading(secondaryReading, isAnswered) : 'Đoạn thứ hai')}
        </text>

        {/* Ruler Tick Marks */}
        {Array.from({ length: 21 }).map((_, idx) => {
          const tx = 60 + idx * 30;
          const tall = idx % 5 === 0;
          return (
            <line
              key={idx}
              x1={tx}
              y1={68}
              x2={tx}
              y2={tall ? 82 : 76}
              stroke="#94A3B8"
              strokeWidth={tall ? '1.6' : '1'}
            />
          );
        })}

        <path d={buildHorizontalCurlyBracePath(60, 660, 86, 10, 'down')} fill="none" stroke="#FBBF24" strokeWidth="2" />
        <text x={360} y={118} textAnchor="middle" fill="#FDE68A" fontSize="12" fontWeight="800">
          {isAnswered
            ? `Kết quả sau quy đổi = ${expectedNumericResult} ${visualParams?.unitB || visualParams?.unitA || resultUnit}`
            : `Đổi cùng đơn vị chuẩn ➔ Kết quả = ? ${visualParams?.unitB || visualParams?.unitA || ''}`}
        </text>
      </svg>
    );
  };

  return (
    <div className="space-y-3">
      {/* Mandatory Singapore Math "Convert First, Model Second" Rule Strip */}
      {conversionRule && (
        <div className="flex flex-wrap items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-400/10 border border-amber-300/35 text-xs">
          <Scale className="w-3.5 h-3.5 text-[color:var(--mm-amber-bright)] shrink-0" />
          <span className="font-black text-[color:var(--mm-amber-bright)]">Quy tắc đổi đơn vị:</span>
          <span className="font-semibold text-[color:var(--mm-ink-primary)]">{conversionRule}</span>
        </div>
      )}

      {chartItems && chartItems.length > 0 ? (
        <div className="rounded-2xl bg-[radial-gradient(ellipse_at_center,_color-mix(in_oklch,var(--mm-cyan-accent)_10%,transparent),_transparent_70%),var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_65%,transparent)] p-4 space-y-2.5 shadow-[inset_0_2px_18px_rgba(0,0,0,0.58)]">
          {chartItems.map((item, idx) => {
            const maxVal = Math.max(...chartItems.map((c) => c.value), 1);
            const isMasked = !!item.masked && !isAnswered;
            const pct = isMasked ? 28 : Math.max(12, Math.round((item.value / maxVal) * 100));
            const barFill = harmonizeCpaFillColor(item.color);
            return (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-black">
                  <span className="text-[color:var(--mm-ink-primary)]">{item.label}</span>
                  <span
                    className={
                      isMasked
                        ? 'text-[color:var(--mm-amber-text)] tabular-nums'
                        : 'text-[color:var(--mm-cyan-text)] tabular-nums'
                    }
                  >
                    {isMasked ? `? ${item.unit}` : `${item.value} ${item.unit}`}
                  </span>
                </div>
                <div className="h-5 rounded-lg bg-[color:var(--mm-surface-1)] border border-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-lg transition-all duration-300 ${
                      isMasked ? 'opacity-55 border-r-2 border-dashed border-[color:var(--mm-amber-brightFill)]' : ''
                    }`}
                    style={{ width: `${pct}%`, backgroundColor: barFill }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <div className="rounded-2xl bg-[radial-gradient(ellipse_at_center,_color-mix(in_oklch,var(--mm-cyan-accent)_10%,transparent),_transparent_70%),var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_65%,transparent)] p-3 overflow-x-auto shadow-[inset_0_2px_18px_rgba(0,0,0,0.58)]">
            {renderInstrumentSVG()}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {primaryReading && (
              <div className="p-3 rounded-xl bg-[color:var(--mm-surface-1)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_55%,transparent)]">
                <div className="text-[11px] font-bold text-[color:var(--mm-cyan-text)] mb-0.5">
                  Dữ kiện đo thứ nhất
                </div>
                <div className="text-sm font-black text-[color:var(--mm-ink-primary)] tabular-nums">
                  {primaryReading}
                </div>
              </div>
            )}
            {secondaryReading && (
              <div className="p-3 rounded-xl bg-[color:var(--mm-surface-1)] border border-[color:color-mix(in_oklch,var(--mm-amber-border)_55%,transparent)]">
                <div className="text-[11px] font-bold text-[color:var(--mm-amber-text)] mb-0.5">
                  Dữ kiện quy đổi / so sánh
                </div>
                <div className="text-sm font-black text-[color:var(--mm-amber-bright)] tabular-nums">
                  {getDisplaySecondaryReading(secondaryReading, isAnswered)}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

/**
 * Step 2E: Interactive Singapore Math Perimeter & Composite Shape (Side-Shifting) Diagram
 */
const CPASvgPerimeterDiagram: React.FC<{
  pictorial: PerimeterPictorialSpec;
  isAnswered: boolean;
}> = ({ pictorial, isAnswered }) => {
  const [shiftedView, setShiftedView] = useState(false);

  useEffect(() => {
    setShiftedView(false);
  }, [pictorial]);

  const {
    shapeKind,
    outerWidth,
    outerHeight,
    cutWidth,
    cutHeight,
    recessDepth,
    recessWidth,
    squareSide,
    gridCols = 2,
    gridRows = 1,
    unitLabel,
    unknownTarget,
    gateWidth,
    expectedPerimeter,
    sideShiftHint,
    showInteractiveShift,
    widthLabel,
    heightLabel,
    hidePerimeterBeforeSolve,
    stepCount,
    gateLabel,
  } = pictorial;

  const showLengthVal =
    isAnswered || (unknownTarget !== 'side' && unknownTarget !== 'length');
  const showWidthVal =
    isAnswered || (unknownTarget !== 'side' && unknownTarget !== 'width');
  const showPerimVal =
    isAnswered ||
    (!hidePerimeterBeforeSolve &&
      unknownTarget !== 'perimeter' &&
      unknownTarget !== 'half_perimeter' &&
      unknownTarget !== 'fence_with_gate');
  const showRecessVal = isAnswered || unknownTarget !== 'recess_depth';

  const wText = widthLabel
    ? isAnswered && !widthLabel.includes(String(outerWidth))
      ? `${widthLabel} (= ${outerWidth} ${unitLabel})`
      : widthLabel
    : showLengthVal
    ? `${outerWidth} ${unitLabel}`
    : `? ${unitLabel}`;
  const hText = heightLabel
    ? isAnswered && !heightLabel.includes(String(outerHeight))
      ? `${heightLabel} (= ${outerHeight} ${unitLabel})`
      : heightLabel
    : showWidthVal
    ? `${outerHeight} ${unitLabel}`
    : `? ${unitLabel}`;
  const pText = showPerimVal
    ? unknownTarget === 'fence_with_gate' && gateWidth
      ? `Hàng rào = ${expectedPerimeter - gateWidth} ${unitLabel}`
      : unknownTarget === 'half_perimeter'
      ? `Nửa chu vi = ${expectedPerimeter / 2} ${unitLabel}`
      : `Chu vi = ${expectedPerimeter} ${unitLabel}`
    : hidePerimeterBeforeSolve
    ? `Chu vi (không đổi) = ? ${unitLabel}`
    : unknownTarget === 'half_perimeter'
    ? `Nửa chu vi = ? ${unitLabel}`
    : unknownTarget === 'fence_with_gate' && gateWidth
    ? `Hàng rào (trừ cổng ${gateWidth} ${unitLabel}) = ?`
    : `Chu vi = ? ${unitLabel}`;

  // Proportional bounding box inside SVG (viewBox 0 0 560 250)
  const ratio = Math.min(2.2, Math.max(0.55, outerWidth / Math.max(1, outerHeight)));
  const maxBoxH = 148;
  const maxBoxW = 290;
  let boxW = Math.min(maxBoxW, Math.round(maxBoxH * ratio));
  let boxH = Math.min(maxBoxH, Math.round(boxW / ratio));
  if (shapeKind === 'square') {
    const sq = 136;
    boxW = sq;
    boxH = sq;
  }
  const ox = Math.round((560 - boxW) / 2);
  const oy = Math.round((238 - boxH) / 2) + 4;

  const canToggleShift =
    showInteractiveShift !== false &&
    (shapeKind === 'rectangle' ||
      shapeKind === 'l_shape' ||
      shapeKind === 'staircase' ||
      shapeKind === 'u_shape' ||
      shapeKind === 't_shape');

  const toggleButtonLabel =
    shapeKind === 'rectangle'
      ? shiftedView
        ? 'Xem toàn bộ 4 cạnh'
        : 'Tách Nửa Chu Vi (1 Dài + 1 Rộng)'
      : shapeKind === 'u_shape' || shapeKind === 't_shape'
      ? shiftedView
        ? 'Trở về hình ghép ban đầu'
        : 'Dời cạnh & Soi 2 cạnh lõm (+2×d)'
      : shiftedView
      ? 'Trở về hình ghép ban đầu'
      : 'Dời cạnh tạo Hình chữ nhật (Side-Shift)';

  const renderShapeSVG = () => {
    // 1. SQUARE
    if (shapeKind === 'square') {
      return (
        <svg viewBox="0 0 560 250" className="w-full h-auto max-h-[245px]" role="img" aria-label="Sơ đồ chu vi hình vuông">
          <defs>
            <pattern id="perimGridSq" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(103,232,249,0.08)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect x="16" y="10" width="528" height="230" rx="14" fill="url(#perimGridSq)" />
          <rect
            x={ox}
            y={oy}
            width={boxW}
            height={boxH}
            fill="rgba(56,189,248,0.16)"
            stroke="#38BDF8"
            strokeWidth="3.5"
            rx="3"
          />
          {/* Equal-side congruence ticks on all 4 sides */}
          <line x1={ox + boxW / 2} y1={oy - 6} x2={ox + boxW / 2} y2={oy + 6} stroke="#FBBF24" strokeWidth="2.5" />
          <line x1={ox + boxW / 2} y1={oy + boxH - 6} x2={ox + boxW / 2} y2={oy + boxH + 6} stroke="#FBBF24" strokeWidth="2.5" />
          <line x1={ox - 6} y1={oy + boxH / 2} x2={ox + 6} y2={oy + boxH / 2} stroke="#FBBF24" strokeWidth="2.5" />
          <line x1={ox + boxW - 6} y1={oy + boxH / 2} x2={ox + boxW + 6} y2={oy + boxH / 2} stroke="#FBBF24" strokeWidth="2.5" />
          {/* Right angle corner marker */}
          <path d={`M ${ox} ${oy + 14} L ${ox + 14} ${oy + 14} L ${ox + 14} ${oy}`} fill="none" stroke="#67E8F9" strokeWidth="1.6" />
          {/* Side labels */}
          <text x={ox + boxW / 2} y={oy - 14} textAnchor="middle" fill="#E0F2FE" fontSize="14" fontWeight="800">
            Cạnh = {wText}
          </text>
          <text x={ox + boxW + 16} y={oy + boxH / 2 + 5} textAnchor="start" fill="#BAE6FD" fontSize="13" fontWeight="700">
            {wText}
          </text>
          {/* Center badge */}
          <text x={ox + boxW / 2} y={oy + boxH / 2 - 4} textAnchor="middle" fill="#FDE68A" fontSize="13" fontWeight="800">
            4 cạnh bằng nhau
          </text>
          <text x={ox + boxW / 2} y={oy + boxH / 2 + 16} textAnchor="middle" fill="#67E8F9" fontSize="13" fontWeight="900">
            {pText}
          </text>
        </svg>
      );
    }

    // 2. RECTANGLE (with optional Half-Perimeter highlight & gate opening)
    if (shapeKind === 'rectangle') {
      const gatePx =
        unknownTarget === 'fence_with_gate' && gateWidth
          ? Math.min(boxW * 0.36, Math.max(36, (gateWidth / Math.max(1, outerWidth)) * boxW))
          : 0;
      const gateStartX = ox + (boxW - gatePx) / 2;

      return (
        <svg viewBox="0 0 560 250" className="w-full h-auto max-h-[245px]" role="img" aria-label="Sơ đồ chu vi hình chữ nhật">
          <defs>
            <pattern id="perimGridRect" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(103,232,249,0.08)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect x="16" y="10" width="528" height="230" rx="14" fill="url(#perimGridRect)" />
          <rect
            x={ox}
            y={oy}
            width={boxW}
            height={boxH}
            fill="rgba(56,189,248,0.14)"
            stroke={shiftedView ? 'rgba(148,163,184,0.45)' : '#38BDF8'}
            strokeWidth={shiftedView ? '2.5' : '3.5'}
            strokeDasharray={shiftedView ? '6 5' : undefined}
            rx="3"
          />
          {/* Half-perimeter highlight: Top (Length) + Right (Width) */}
          {shiftedView && (
            <path
              d={`M ${ox} ${oy} L ${ox + boxW} ${oy} L ${ox + boxW} ${oy + boxH}`}
              fill="none"
              stroke="#FBBF24"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
          {/* Gate opening on bottom side if fence_with_gate */}
          {gatePx > 0 && (
            <>
              <line
                x1={gateStartX}
                y1={oy + boxH}
                x2={gateStartX + gatePx}
                y2={oy + boxH}
                stroke="#060D24"
                strokeWidth="6"
              />
              <line
                x1={gateStartX}
                y1={oy + boxH}
                x2={gateStartX + gatePx}
                y2={oy + boxH}
                stroke="#F59E0B"
                strokeWidth="2.5"
                strokeDasharray="4 4"
              />
              <text
                x={ox + boxW / 2}
                y={oy + boxH + 22}
                textAnchor="middle"
                fill="#FCD34D"
                fontSize="12"
                fontWeight="800"
              >
                {gateLabel || `Cổng ra vào: ${gateWidth} ${unitLabel} (không rào)`}
              </text>
            </>
          )}
          {/* Length & Width labels */}
          <text x={ox + boxW / 2} y={oy - 12} textAnchor="middle" fill={shiftedView ? '#FDE68A' : '#E0F2FE'} fontSize={wText.length > 22 ? '12.5' : '14'} fontWeight="800">
            Chiều dài = {wText}
          </text>
          <text x={ox + boxW + 14} y={oy + boxH / 2 + 5} textAnchor="start" fill={shiftedView ? '#FDE68A' : '#BAE6FD'} fontSize="13.5" fontWeight="800">
            Rộng = {hText}
          </text>
          {/* Center summary */}
          <text x={ox + boxW / 2} y={oy + boxH / 2 - 4} textAnchor="middle" fill="#67E8F9" fontSize="13.5" fontWeight="900">
            {shiftedView ? 'Nửa chu vi = Dài + Rộng' : pText}
          </text>
          <text x={ox + boxW / 2} y={oy + boxH / 2 + 16} textAnchor="middle" fill="#CBD5E1" fontSize="11.5" fontWeight="700">
            {shiftedView
              ? 'Chu vi = Nửa chu vi × 2'
              : isAnswered && unknownTarget === 'fence_with_gate' && gateWidth
              ? `Chu vi ${expectedPerimeter} ${unitLabel} − Cổng ${gateWidth} ${unitLabel}`
              : '2 cạnh dài bằng nhau · 2 cạnh rộng bằng nhau'}
          </text>
        </svg>
      );
    }

    // 3. L-SHAPE or STAIRCASE (Side-Shifting to Bounding Rectangle!)
    if (shapeKind === 'l_shape' || shapeKind === 'staircase') {
      const cw = Math.round(
        boxW *
          Math.min(0.62, Math.max(0.28, (cutWidth || outerWidth * 0.4) / Math.max(1, outerWidth)))
      );
      const ch = Math.round(
        boxH *
          Math.min(0.62, Math.max(0.28, (cutHeight || outerHeight * 0.45) / Math.max(1, outerHeight)))
      );
      const stepX = ox + boxW - cw;
      const stepY = oy + ch;

      const buildStaircasePoints = (steps: number) => {
        const n = Math.max(2, Math.min(6, steps));
        const pts: string[] = [`${ox},${oy}`];
        for (let i = 1; i <= n; i++) {
          const sx = ox + Math.round((boxW * i) / n);
          const syTop = oy + Math.round((boxH * (i - 1)) / n);
          const syBot = oy + Math.round((boxH * i) / n);
          pts.push(`${sx},${syTop}`);
          pts.push(`${sx},${syBot}`);
        }
        pts.push(`${ox},${oy + boxH}`);
        return pts.join(' ');
      };

      const polyPoints =
        shapeKind === 'l_shape'
          ? `${ox},${oy} ${stepX},${oy} ${stepX},${stepY} ${ox + boxW},${stepY} ${ox + boxW},${oy + boxH} ${ox},${oy + boxH}`
          : buildStaircasePoints(stepCount || 3);

      return (
        <svg viewBox="0 0 560 250" className="w-full h-auto max-h-[245px]" role="img" aria-label="Sơ đồ dời cạnh tính chu vi hình ghép">
          <defs>
            <pattern id="perimGridL" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(103,232,249,0.08)" strokeWidth="1" />
            </pattern>
            <marker id="shiftArrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#FBBF24" />
            </marker>
          </defs>
          <rect x="16" y="10" width="528" height="230" rx="14" fill="url(#perimGridL)" />

          {/* Outer bounding rectangle projection when shiftedView is active */}
          {shiftedView && (
            <rect
              x={ox}
              y={oy}
              width={boxW}
              height={boxH}
              fill="rgba(251,191,36,0.08)"
              stroke="#FBBF24"
              strokeWidth="3"
              strokeDasharray="7 5"
            />
          )}

          {/* Original Composite Polygon */}
          <polygon
            points={polyPoints}
            fill="rgba(56,189,248,0.18)"
            stroke="#38BDF8"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />

          {/* Side-shift arrows demonstrating pushing-out method */}
          {shiftedView && shapeKind === 'l_shape' && (
            <>
              {/* Push inner horizontal edge UP */}
              <line
                x1={stepX + cw / 2}
                y1={stepY - 4}
                x2={stepX + cw / 2}
                y2={oy + 6}
                stroke="#FBBF24"
                strokeWidth="2.4"
                markerEnd="url(#shiftArrow)"
              />
              {/* Push inner vertical edge RIGHT */}
              <line
                x1={stepX + 4}
                y1={oy + ch / 2}
                x2={ox + boxW - 6}
                y2={oy + ch / 2}
                stroke="#34D399"
                strokeWidth="2.4"
                markerEnd="url(#shiftArrow)"
              />
              <text x={stepX + cw / 2 + 4} y={oy + ch / 2 - 8} textAnchor="middle" fill="#FDE68A" fontSize="11" fontWeight="800">
                Dời ra khung ngoài!
              </text>
            </>
          )}

          {shiftedView && shapeKind === 'staircase' && (
            <>
              <line
                x1={ox + Math.round(boxW * 0.5)}
                y1={oy + Math.round(boxH * 0.33) - 3}
                x2={ox + Math.round(boxW * 0.5)}
                y2={oy + 6}
                stroke="#FBBF24"
                strokeWidth="2.2"
                markerEnd="url(#shiftArrow)"
              />
              <line
                x1={ox + Math.round(boxW * 0.67) + 3}
                y1={oy + Math.round(boxH * 0.5)}
                x2={ox + boxW - 6}
                y2={oy + Math.round(boxH * 0.5)}
                stroke="#34D399"
                strokeWidth="2.2"
                markerEnd="url(#shiftArrow)"
              />
              <text x={ox + Math.round(boxW * 0.8)} y={oy + 24} textAnchor="middle" fill="#FDE68A" fontSize="11" fontWeight="800">
                Dời bậc thang!
              </text>
            </>
          )}

          {/* Outer dimensions */}
          <text x={ox + boxW / 2} y={oy + boxH + 22} textAnchor="middle" fill="#E0F2FE" fontSize="13.5" fontWeight="800">
            Chiều ngang ngoài = {wText}
          </text>
          <text x={ox - 12} y={oy + boxH / 2 + 4} textAnchor="end" fill="#BAE6FD" fontSize="13" fontWeight="800">
            Cao = {hText}
          </text>
          <text x={ox + boxW / 2} y={oy - 12} textAnchor="middle" fill="#FDE68A" fontSize="12.5" fontWeight="800">
            {shiftedView
              ? 'Sau khi dời cạnh = Đúng hình chữ nhật bao ngoài!'
              : pText}
          </text>
        </svg>
      );
    }

    // 4. U-SHAPE or T-SHAPE (Bounding Rectangle + 2 EXTRA RECESSED WALLS!)
    if (shapeKind === 'u_shape' || shapeKind === 't_shape') {
      const rDepthPx = Math.round(
        boxH * Math.min(0.55, Math.max(0.28, (recessDepth || outerHeight * 0.4) / Math.max(1, outerHeight)))
      );
      const rWidthPx = Math.round(
        boxW * Math.min(0.45, Math.max(0.28, (recessWidth || outerWidth * 0.34) / Math.max(1, outerWidth)))
      );
      const notchLeft = ox + Math.round((boxW - rWidthPx) / 2);
      const notchRight = notchLeft + rWidthPx;
      const notchBottom = oy + rDepthPx;
      const recessTag = `+${showRecessVal ? `${recessDepth}` : '?'}`;

      const uPoints = `${ox},${oy} ${notchLeft},${oy} ${notchLeft},${notchBottom} ${notchRight},${notchBottom} ${notchRight},${oy} ${ox + boxW},${oy} ${ox + boxW},${oy + boxH} ${ox},${oy + boxH}`;

      return (
        <svg viewBox="0 0 560 255" className="w-full h-auto max-h-[250px]" role="img" aria-label="Sơ đồ hình chữ U có 2 cạnh lõm">
          <defs>
            <pattern id="perimGridU" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(103,232,249,0.08)" strokeWidth="1" />
            </pattern>
            <marker id="uShiftArrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#34D399" />
            </marker>
          </defs>
          <rect x="16" y="10" width="528" height="235" rx="14" fill="url(#perimGridU)" />

          {/* Polygon fill */}
          <polygon
            points={uPoints}
            fill="rgba(56,189,248,0.16)"
            stroke="#38BDF8"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />

          {/* Highlight the 2 EXTRA vertical recessed walls (Amber Gold #F59E0B) */}
          <line
            x1={notchLeft}
            y1={oy}
            x2={notchLeft}
            y2={notchBottom}
            stroke="#F59E0B"
            strokeWidth={shiftedView ? '4.8' : '3.8'}
          />
          <line
            x1={notchRight}
            y1={oy}
            x2={notchRight}
            y2={notchBottom}
            stroke="#F59E0B"
            strokeWidth={shiftedView ? '4.8' : '3.8'}
          />

          {/* Dashed shifted top segment when shiftedView is active */}
          {shiftedView && (
            <>
              <line
                x1={notchLeft}
                y1={oy}
                x2={notchRight}
                y2={oy}
                stroke="#34D399"
                strokeWidth="3"
                strokeDasharray="6 4"
              />
              <line
                x1={(notchLeft + notchRight) / 2}
                y1={notchBottom - 3}
                x2={(notchLeft + notchRight) / 2}
                y2={oy + 6}
                stroke="#34D399"
                strokeWidth="2.2"
                markerEnd="url(#uShiftArrow)"
              />
            </>
          )}

          {/* High-contrast pill badges for the 2 recessed walls (safely centered inside the left/right U-arms) */}
          <rect
            x={Math.round((ox + notchLeft) / 2) - 18}
            y={oy + Math.round(rDepthPx / 2) - 10}
            width={36}
            height={20}
            rx={6}
            fill="rgba(15,23,42,0.88)"
            stroke="#F59E0B"
            strokeWidth="1.2"
          />
          <text
            x={Math.round((ox + notchLeft) / 2)}
            y={oy + Math.round(rDepthPx / 2) + 4}
            textAnchor="middle"
            fill="#FCD34D"
            fontSize="11.5"
            fontWeight="900"
          >
            {recessTag}
          </text>
          <rect
            x={Math.round((notchRight + ox + boxW) / 2) - 18}
            y={oy + Math.round(rDepthPx / 2) - 10}
            width={36}
            height={20}
            rx={6}
            fill="rgba(15,23,42,0.88)"
            stroke="#F59E0B"
            strokeWidth="1.2"
          />
          <text
            x={Math.round((notchRight + ox + boxW) / 2)}
            y={oy + Math.round(rDepthPx / 2) + 4}
            textAnchor="middle"
            fill="#FCD34D"
            fontSize="11.5"
            fontWeight="900"
          >
            {recessTag}
          </text>

          {/* Outer labels */}
          <text x={ox + boxW / 2} y={oy + boxH + 22} textAnchor="middle" fill="#E0F2FE" fontSize="13.5" fontWeight="800">
            Chiều ngang ngoài = {wText}
          </text>
          <text x={ox - 12} y={oy + boxH / 2 + 4} textAnchor="end" fill="#BAE6FD" fontSize="13" fontWeight="800">
            Cao = {hText}
          </text>
          <text x={ox + boxW / 2} y={oy - 12} textAnchor="middle" fill="#FDE68A" fontSize="12.5" fontWeight="800">
            {shiftedView
              ? 'Khung ngoài + 2 cạnh lõm màu vàng cam!'
              : pText}
          </text>
        </svg>
      );
    }

    // 5. JOINED SQUARES (Grid of gridCols × gridRows identical squares)
    const cellSize = Math.min(72, Math.floor(260 / Math.max(1, gridCols)), Math.floor(140 / Math.max(1, gridRows)));
    const totalW = cellSize * gridCols;
    const totalH = cellSize * gridRows;
    const jx = Math.round((560 - totalW) / 2);
    const jy = Math.round((238 - totalH) / 2) + 4;
    const showJoinedSideVal = isAnswered || unknownTarget !== 'side';
    const joinedSideDisplay = squareSide
      ? showJoinedSideVal
        ? `${squareSide} ${unitLabel}/ô`
        : `? ${unitLabel}/ô`
      : wText;

    return (
      <svg viewBox="0 0 560 250" className="w-full h-auto max-h-[245px]" role="img" aria-label="Sơ đồ ghép các hình vuông bằng nhau">
        <defs>
          <pattern id="perimGridJoin" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(103,232,249,0.08)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect x="16" y="10" width="528" height="230" rx="14" fill="url(#perimGridJoin)" />

        {/* Individual square fills & dashed internal shared edges */}
        {Array.from({ length: gridRows }).map((_, r) =>
          Array.from({ length: gridCols }).map((__, c) => (
            <rect
              key={`${r}-${c}`}
              x={jx + c * cellSize}
              y={jy + r * cellSize}
              width={cellSize}
              height={cellSize}
              fill={(r + c) % 2 === 0 ? 'rgba(56,189,248,0.16)' : 'rgba(52,211,153,0.16)'}
              stroke="rgba(251,191,36,0.55)"
              strokeWidth="1.6"
              strokeDasharray="4 4"
            />
          ))
        )}

        {/* Solid bright outer perimeter frame */}
        <rect
          x={jx}
          y={jy}
          width={totalW}
          height={totalH}
          fill="none"
          stroke="#38BDF8"
          strokeWidth="4"
          rx="2"
        />

        {/* Labels */}
        <text x={jx + totalW / 2} y={jy - 12} textAnchor="middle" fill="#E0F2FE" fontSize="13.5" fontWeight="800">
          {gridCols} ô ngang ({joinedSideDisplay})
        </text>
        <text x={jx + totalW + 12} y={jy + totalH / 2 + 4} textAnchor="start" fill="#BAE6FD" fontSize="13" fontWeight="800">
          {gridRows === 1 ? '1 hàng cao' : `${gridRows} hàng cao`}
        </text>
        <text x={jx + totalW / 2} y={jy + totalH + 22} textAnchor="middle" fill="#FDE68A" fontSize="12.5" fontWeight="800">
          Đường nét đứt bên trong KHÔNG tính vào chu vi · {pText}
        </text>
      </svg>
    );
  };

  return (
    <div className="space-y-3">
      {canToggleShift && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-semibold text-[color:var(--mm-ink-secondary)]">
            {sideShiftHint || 'Quan sát đường viền bao ngoài để xác định chu vi chính xác'}
          </span>
          <button
            type="button"
            onClick={() => setShiftedView((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-all duration-200 cursor-pointer ${
              shiftedView
                ? 'bg-[color:color-mix(in_oklch,var(--mm-amber-tint)_70%,transparent)] border-[color:var(--mm-amber-accent)] text-[color:var(--mm-amber-bright)] shadow-[0_0_16px_rgba(251,191,36,0.28)]'
                : 'bg-[color:color-mix(in_oklch,var(--mm-cyan-tint)_60%,transparent)] border-[color:var(--mm-cyan-border)] text-[color:var(--mm-cyan-bright)] hover:border-[color:var(--mm-cyan-accent)]'
            }`}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{toggleButtonLabel}</span>
          </button>
        </div>
      )}

      <div className="rounded-2xl bg-[radial-gradient(ellipse_at_center,_color-mix(in_oklch,var(--mm-cyan-accent)_10%,transparent),_transparent_70%),var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_65%,transparent)] p-3 overflow-x-auto shadow-[inset_0_2px_18px_rgba(0,0,0,0.58)]">
        {renderShapeSVG()}
      </div>
    </div>
  );
};

/**
 * Step 2F: Singapore Place Value Chart & Number Line (Phạm vi 10 000 — Đĩa số & Tia số làm tròn)
 */
const CPASvgPlaceValueDiagram: React.FC<{
  pictorial: PlaceValuePictorialSpec;
  isAnswered: boolean;
}> = ({ pictorial, isAnswered }) => {
  const [showRegroupGuide, setShowRegroupGuide] = useState(false);

  useEffect(() => {
    setShowRegroupGuide(false);
  }, [pictorial]);

  const splitDigits = (n: number) => ({
    thousands: Math.floor(n / 1000) % 10,
    hundreds: Math.floor(n / 100) % 10,
    tens: Math.floor(n / 10) % 10,
    ones: n % 10,
  });

  const cols: Array<{
    key: 'thousands' | 'hundreds' | 'tens' | 'ones';
    label: string;
    discText: string;
    fill: string;
    stroke: string;
  }> = [
    { key: 'thousands', label: 'Hàng Nghìn', discText: '1000', fill: '#0284C7', stroke: '#7DD3FC' },
    { key: 'hundreds', label: 'Hàng Trăm', discText: '100', fill: '#0D9488', stroke: '#5EEAD4' },
    { key: 'tens', label: 'Hàng Chục', discText: '10', fill: '#7C3AED', stroke: '#C4B5FD' },
    { key: 'ones', label: 'Hàng Đơn vị', discText: '1', fill: '#D97706', stroke: '#FDE68A' },
  ];

  const renderPlaceValueSVG = () => {
    // Mode 1: NUMBER LINE ROUNDING
    if (
      pictorial.mode === 'number_line_round' &&
      pictorial.roundLow !== undefined &&
      pictorial.roundHigh !== undefined
    ) {
      const low = pictorial.roundLow;
      const high = pictorial.roundHigh;
      const mid = (low + high) / 2;
      const ratio = Math.min(1, Math.max(0, (pictorial.primaryNumber - low) / Math.max(1, high - low)));
      const lineX1 = 70;
      const lineX2 = 490;
      const lineY = 128;
      const midX = (lineX1 + lineX2) / 2;
      const numX = lineX1 + ratio * (lineX2 - lineX1);

      return (
        <svg viewBox="0 0 560 215" className="w-full h-auto max-h-[215px]" role="img" aria-label="Tia số làm tròn trong phạm vi 10 000">
          <rect x="14" y="10" width="532" height="195" rx="14" fill="rgba(15,23,42,0.55)" stroke="rgba(56,189,248,0.22)" />
          <text x="280" y="34" textAnchor="middle" fill="#BAE6FD" fontSize="13" fontWeight="800">
            {pictorial.chartHint || `Tia số làm tròn đến hàng ${pictorial.roundTo}`}
          </text>

          {/* Main number line */}
          <line x1={lineX1} y1={lineY} x2={lineX2} y2={lineY} stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />

          {/* 10 sub-ticks */}
          {Array.from({ length: 11 }).map((_, idx) => {
            const tx = lineX1 + (idx / 10) * (lineX2 - lineX1);
            const isMajor = idx === 0 || idx === 5 || idx === 10;
            return (
              <line
                key={idx}
                x1={tx}
                y1={lineY - (isMajor ? 14 : 7)}
                x2={tx}
                y2={lineY + (isMajor ? 14 : 7)}
                stroke={idx === 5 ? '#F59E0B' : '#7DD3FC'}
                strokeWidth={isMajor ? 2.8 : 1.4}
              />
            );
          })}

          {/* Low, Mid, High labels */}
          <text x={lineX1} y={lineY + 34} textAnchor="middle" fill="#E0F2FE" fontSize="14" fontWeight="900">
            {low}
          </text>
          <text x={midX} y={lineY + 32} textAnchor="middle" fill="#FCD34D" fontSize="12.5" fontWeight="800">
            Mốc giữa: {mid}
          </text>
          <text x={lineX2} y={lineY + 34} textAnchor="middle" fill="#E0F2FE" fontSize="14" fontWeight="900">
            {high}
          </text>

          {/* Target number marker */}
          <line x1={numX} y1={lineY - 46} x2={numX} y2={lineY - 8} stroke="#34D399" strokeWidth="2.4" strokeDasharray="4 3" />
          <circle cx={numX} cy={lineY} r="7.5" fill="#34D399" stroke="#ECFDF5" strokeWidth="2.5" />
          <rect x={numX - 38} y={lineY - 72} width="76" height="26" rx="8" fill="#065F46" stroke="#34D399" strokeWidth="1.6" />
          <text x={numX} y={lineY - 54} textAnchor="middle" fill="#ECFDF5" fontSize="13.5" fontWeight="900">
            {pictorial.primaryNumber}
          </text>

          {/* Footer rule */}
          <text x="280" y="190" textAnchor="middle" fill={isAnswered ? '#6EE7B7' : '#FDE68A'} fontSize="12.5" fontWeight="800">
            {isAnswered
              ? `Số ${pictorial.primaryNumber} làm tròn thành ${pictorial.expectedResult}`
              : 'Từ mốc giữa trở lên → làm tròn LÊN; nhỏ hơn mốc giữa → làm tròn XUỐNG'}
          </text>
        </svg>
      );
    }

    // Mode 2: BUILD NUMBER FROM DIGIT CARDS
    if (pictorial.mode === 'build_number' && pictorial.digitCards && pictorial.digitCards.length > 0) {
      const answerDigits = splitDigits(pictorial.expectedResult);
      const ansArr = [answerDigits.thousands, answerDigits.hundreds, answerDigits.tens, answerDigits.ones];

      return (
        <svg viewBox="0 0 560 225" className="w-full h-auto max-h-[225px]" role="img" aria-label="Ghép số 4 chữ số từ thẻ số">
          <rect x="14" y="10" width="532" height="205" rx="14" fill="rgba(15,23,42,0.55)" stroke="rgba(56,189,248,0.22)" />
          <text x="280" y="34" textAnchor="middle" fill="#BAE6FD" fontSize="13" fontWeight="800">
            {pictorial.chartHint || 'Thẻ chữ số cho trước — sắp xếp vào đúng vị trí hàng'}
          </text>

          {/* Available digit cards */}
          {pictorial.digitCards.map((d, i) => {
            const startX = 280 - (pictorial.digitCards!.length * 64) / 2 + i * 64 + 8;
            return (
              <g key={i}>
                <rect x={startX} y={48} width="48" height="44" rx="10" fill="#1E293B" stroke="#38BDF8" strokeWidth="2.2" />
                <text x={startX + 24} y={77} textAnchor="middle" fill="#F0F9FF" fontSize="20" fontWeight="900">
                  {d}
                </text>
              </g>
            );
          })}

          {/* 4 Place value target slots */}
          {cols.map((col, idx) => {
            const sx = 44 + idx * 122;
            const digitVal = isAnswered ? String(ansArr[idx]) : '?';
            return (
              <g key={col.key}>
                <rect x={sx} y={114} width="108" height="28" rx="7" fill={col.fill} fillOpacity="0.88" />
                <text x={sx + 54} y={132} textAnchor="middle" fill="#FFFFFF" fontSize="11.5" fontWeight="800">
                  {col.label}
                </text>
                <rect
                  x={sx}
                  y={146}
                  width="108"
                  height="52"
                  rx="10"
                  fill={isAnswered ? 'rgba(16,185,129,0.18)' : 'rgba(15,23,42,0.75)'}
                  stroke={isAnswered ? '#34D399' : col.stroke}
                  strokeWidth="2.2"
                  strokeDasharray={isAnswered ? undefined : '5 4'}
                />
                <text
                  x={sx + 54}
                  y={180}
                  textAnchor="middle"
                  fill={isAnswered ? '#6EE7B7' : '#FCD34D'}
                  fontSize="24"
                  fontWeight="900"
                >
                  {digitVal}
                </text>
              </g>
            );
          })}
        </svg>
      );
    }

    // Mode 3: COMPARE OR ADD/SUBTRACT TWO NUMBERS
    if ((pictorial.mode === 'compare' || pictorial.mode === 'add_sub') && pictorial.secondaryNumber !== undefined) {
      const d1 = splitDigits(pictorial.primaryNumber);
      const d2 = splitDigits(pictorial.secondaryNumber);
      const dRes = splitDigits(pictorial.expectedResult);
      const arr1 = [d1.thousands, d1.hundreds, d1.tens, d1.ones];
      const arr2 = [d2.thousands, d2.hundreds, d2.tens, d2.ones];
      const arrRes = [dRes.thousands, dRes.hundreds, dRes.tens, dRes.ones];
      const isAddSub = pictorial.mode === 'add_sub';
      const opSymbol = pictorial.operation === 'subtract' ? '−' : '+';

      return (
        <svg viewBox="0 0 560 235" className="w-full h-auto max-h-[235px]" role="img" aria-label="Bảng hàng so sánh hoặc đặt tính số 4 chữ số">
          <rect x="14" y="10" width="532" height="215" rx="14" fill="rgba(15,23,42,0.55)" stroke="rgba(56,189,248,0.22)" />
          <text x="280" y="32" textAnchor="middle" fill="#BAE6FD" fontSize="12.5" fontWeight="800">
            {pictorial.chartHint ||
              (isAddSub
                ? 'Đặt tính thẳng cột: Đơn vị → Chục → Trăm → Nghìn'
                : 'So sánh từng hàng từ trái sang phải: Nghìn → Trăm → Chục → Đơn vị')}
          </text>

          {/* Column headers */}
          {cols.map((col, idx) => {
            const cx = 86 + idx * 108;
            const isHL = pictorial.highlightPlace === col.key;
            return (
              <g key={col.key}>
                <rect
                  x={cx}
                  y={44}
                  width="98"
                  height="26"
                  rx="7"
                  fill={col.fill}
                  stroke={isHL ? '#FDE047' : 'none'}
                  strokeWidth={isHL ? 2.5 : 0}
                />
                <text x={cx + 49} y={61} textAnchor="middle" fill="#FFFFFF" fontSize="11.5" fontWeight="800">
                  {col.label}
                </text>

                {/* Row 1 */}
                <rect x={cx} y={76} width="98" height="38" rx="8" fill="rgba(56,189,248,0.12)" stroke="rgba(125,211,252,0.3)" />
                <text x={cx + 49} y={102} textAnchor="middle" fill="#F0F9FF" fontSize="20" fontWeight="900">
                  {arr1[idx]}
                </text>

                {/* Row 2 */}
                <rect x={cx} y={120} width="98" height="38" rx="8" fill="rgba(168,85,247,0.12)" stroke="rgba(196,181,253,0.3)" />
                <text x={cx + 49} y={146} textAnchor="middle" fill="#E9D5FF" fontSize="20" fontWeight="900">
                  {arr2[idx]}
                </text>

                {/* Result Row for add_sub */}
                {isAddSub && (
                  <>
                    <rect
                      x={cx}
                      y={168}
                      width="98"
                      height="42"
                      rx="8"
                      fill={isAnswered ? 'rgba(16,185,129,0.2)' : 'rgba(251,191,36,0.1)'}
                      stroke={isAnswered ? '#34D399' : '#F59E0B'}
                      strokeWidth="2"
                      strokeDasharray={isAnswered ? undefined : '4 4'}
                    />
                    <text
                      x={cx + 49}
                      y={196}
                      textAnchor="middle"
                      fill={isAnswered ? '#6EE7B7' : '#FCD34D'}
                      fontSize="21"
                      fontWeight="900"
                    >
                      {isAnswered ? arrRes[idx] : '?'}
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {/* Left side labels */}
          <text x="50" y="100" textAnchor="middle" fill="#7DD3FC" fontSize="12" fontWeight="800">
            Số 1
          </text>
          <text x="50" y="144" textAnchor="middle" fill="#C4B5FD" fontSize={isAddSub ? '22' : '12'} fontWeight="900">
            {isAddSub ? opSymbol : 'Số 2'}
          </text>
          {isAddSub ? (
            <line x1="78" y1="163" x2="516" y2="163" stroke="#94A3B8" strokeWidth="2.5" />
          ) : (
            <text x="280" y="196" textAnchor="middle" fill={isAnswered ? '#6EE7B7' : '#FDE68A'} fontSize="13.5" fontWeight="800">
              {isAnswered
                ? `Kết quả kiểm chứng: ${pictorial.expectedResult}`
                : 'Quan sát cột đầu tiên có chữ số khác nhau từ trái sang phải'}
            </text>
          )}
        </svg>
      );
    }

    // Mode 4: DECOMPOSE (4-column Place Value Discs chart)
    const d = splitDigits(pictorial.primaryNumber);
    const counts = {
      thousands: d.thousands,
      hundreds: d.hundreds,
      tens: d.tens,
      ones: d.ones,
    };

    return (
      <svg viewBox="0 0 560 245" className="w-full h-auto max-h-[245px]" role="img" aria-label="Bảng đĩa số Singapore 4 hàng đến 10 000">
        <rect x="14" y="10" width="532" height="225" rx="14" fill="rgba(15,23,42,0.55)" stroke="rgba(56,189,248,0.22)" />
        <text x="280" y="33" textAnchor="middle" fill="#BAE6FD" fontSize="13" fontWeight="800">
          {pictorial.chartHint || 'Bảng đĩa số Singapore: Nghìn · Trăm · Chục · Đơn vị'}
        </text>

        {cols.map((col, idx) => {
          const cx = 28 + idx * 128;
          const cnt = counts[col.key];
          const isHL = pictorial.highlightPlace === col.key;
          const hideDigit = !isAnswered && pictorial.hideResultBeforeSolve && isHL;

          return (
            <g key={col.key}>
              {/* Column frame */}
              <rect
                x={cx}
                y={46}
                width="120"
                height="176"
                rx="11"
                fill={isHL ? 'rgba(251,191,36,0.12)' : 'rgba(30,41,59,0.55)'}
                stroke={isHL ? '#FBBF24' : 'rgba(148,163,184,0.28)'}
                strokeWidth={isHL ? 2.4 : 1.2}
              />
              {/* Header */}
              <rect x={cx + 4} y={50} width="112" height="26" rx="7" fill={col.fill} />
              <text x={cx + 60} y={67} textAnchor="middle" fill="#FFFFFF" fontSize="11.5" fontWeight="800">
                {col.label}
              </text>

              {/* Number Discs (up to 9 discs neatly arranged in 3x3 grid) */}
              {!hideDigit ? (
                Array.from({ length: cnt }).map((_, i) => {
                  const row = Math.floor(i / 3);
                  const colPos = i % 3;
                  const dx = cx + 26 + colPos * 34;
                  const dy = 96 + row * 31;
                  return (
                    <g key={i}>
                      <circle cx={dx} cy={dy} r="14" fill={col.fill} stroke={col.stroke} strokeWidth="1.8" />
                      <text x={dx} y={dy + 4} textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="900">
                        {col.discText}
                      </text>
                    </g>
                  );
                })
              ) : (
                <text x={cx + 60} y={134} textAnchor="middle" fill="#FCD34D" fontSize="28" fontWeight="900">
                  ?
                </text>
              )}

              {/* Bottom count footer */}
              <rect x={cx + 10} y={190} width="100" height="24" rx="6" fill="rgba(15,23,42,0.85)" />
              <text x={cx + 60} y={206} textAnchor="middle" fill={isHL ? '#FDE047' : '#E0F2FE'} fontSize="12" fontWeight="900">
                {hideDigit ? '? đĩa' : `${cnt} đĩa`}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div className="space-y-3">
      {pictorial.mode === 'add_sub' && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-semibold text-[color:var(--mm-ink-secondary)]">
            {showRegroupGuide
              ? 'Quy tắc đổi hàng Singapore: 10 đơn vị = 1 chục · 10 chục = 1 trăm · 10 trăm = 1 nghìn'
              : 'Tính lần lượt từng cột từ phải sang trái (Đơn vị → Chục → Trăm → Nghìn)'}
          </span>
          <button
            type="button"
            onClick={() => setShowRegroupGuide((v) => !v)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold border bg-[color:color-mix(in_oklch,var(--mm-cyan-tint)_60%,transparent)] border-[color:var(--mm-cyan-border)] text-[color:var(--mm-cyan-bright)] hover:border-[color:var(--mm-cyan-accent)] cursor-pointer transition-all"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{showRegroupGuide ? 'Ẩn mẹo nhớ/mượn' : 'Xem quy đổi 10 đĩa'}</span>
          </button>
        </div>
      )}
      <div className="rounded-2xl bg-[radial-gradient(ellipse_at_center,_color-mix(in_oklch,var(--mm-cyan-accent)_10%,transparent),_transparent_70%),var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_65%,transparent)] p-3 overflow-x-auto shadow-[inset_0_2px_18px_rgba(0,0,0,0.58)]">
        {renderPlaceValueSVG()}
      </div>
    </div>
  );
};

/**
 * Step 2G: Singapore Number Sequence & Jump Arcs (Chuỗi số quy luật)
 */
const CPASvgSequencePatternDiagram: React.FC<{
  pictorial: SequencePatternPictorialSpec;
  isAnswered: boolean;
}> = ({ pictorial, isAnswered }) => {
  const [showPatternHint, setShowPatternHint] = useState(false);

  useEffect(() => {
    setShowPatternHint(false);
  }, [pictorial]);

  const terms = pictorial.terms;
  const n = terms.length;
  const nodeW = Math.min(72, Math.floor(460 / Math.max(4, n)));
  const gap = Math.max(14, Math.floor((512 - n * nodeW) / Math.max(1, n - 1)));
  const totalRowW = n * nodeW + (n - 1) * gap;
  const startX = Math.round((560 - totalRowW) / 2);
  const nodeY = 104;
  const nodeH = 48;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold text-[color:var(--mm-ink-secondary)]">
          {showPatternHint ? pictorial.ruleHint : 'Quan sát mối liên hệ giữa các số hạng liền kề trên dãy số'}
        </span>
        <button
          type="button"
          onClick={() => setShowPatternHint((v) => !v)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
            showPatternHint
              ? 'bg-[color:color-mix(in_oklch,var(--mm-amber-tint)_70%,transparent)] border-[color:var(--mm-amber-accent)] text-[color:var(--mm-amber-bright)]'
              : 'bg-[color:color-mix(in_oklch,var(--mm-cyan-tint)_60%,transparent)] border-[color:var(--mm-cyan-border)] text-[color:var(--mm-cyan-bright)] hover:border-[color:var(--mm-cyan-accent)]'
          }`}
        >
          <ArrowLeftRight className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{showPatternHint ? 'Ẩn gợi ý quy luật' : 'Hiện gợi ý bước nhảy'}</span>
        </button>
      </div>

      <div className="rounded-2xl bg-[radial-gradient(ellipse_at_center,_color-mix(in_oklch,var(--mm-cyan-accent)_10%,transparent),_transparent_70%),var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_65%,transparent)] p-3 overflow-x-auto shadow-[inset_0_2px_18px_rgba(0,0,0,0.58)]">
        <svg viewBox="0 0 560 198" className="w-full h-auto max-h-[198px]" role="img" aria-label="Sơ đồ chuỗi số quy luật với cung bước nhảy">
          <defs>
            <marker id="seqArrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#38BDF8" />
            </marker>
            <marker id="seqArrowAmber" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#FBBF24" />
            </marker>
          </defs>
          <rect x="14" y="10" width="532" height="178" rx="14" fill="rgba(15,23,42,0.55)" stroke="rgba(56,189,248,0.22)" />

          {/* Curved Jump Arcs */}
          {terms.slice(0, -1).map((_, idx) => {
            const x1 = startX + idx * (nodeW + gap) + nodeW / 2;
            const x2 = startX + (idx + 1) * (nodeW + gap) + nodeW / 2;
            const midX = (x1 + x2) / 2;
            const touchesMissing = idx === pictorial.missingIndex || idx + 1 === pictorial.missingIndex;
            const rawStep = pictorial.stepLabels?.[idx];
            const arcLabel = isAnswered
              ? rawStep || ''
              : touchesMissing
              ? '?'
              : showPatternHint && rawStep
              ? rawStep
              : '→';

            return (
              <g key={`arc-${idx}`}>
                <path
                  d={`M ${x1} ${nodeY - 4} Q ${midX} ${nodeY - 46} ${x2} ${nodeY - 4}`}
                  fill="none"
                  stroke={touchesMissing ? '#FBBF24' : '#38BDF8'}
                  strokeWidth={touchesMissing ? 2.4 : 1.9}
                  strokeDasharray={touchesMissing && !isAnswered ? '5 4' : undefined}
                  markerEnd={touchesMissing ? 'url(#seqArrowAmber)' : 'url(#seqArrow)'}
                />
                {arcLabel && (
                  <text
                    x={midX}
                    y={nodeY - 34}
                    textAnchor="middle"
                    fill={touchesMissing ? '#FDE68A' : '#7DD3FC'}
                    fontSize="11.5"
                    fontWeight="900"
                  >
                    {arcLabel}
                  </text>
                )}
              </g>
            );
          })}

          {/* Sequence Node Boxes */}
          {terms.map((val, idx) => {
            const x = startX + idx * (nodeW + gap);
            const isMissing = idx === pictorial.missingIndex;
            const displayVal = isMissing && !isAnswered ? '?' : String(val);

            return (
              <g key={`node-${idx}`}>
                <rect
                  x={x}
                  y={nodeY}
                  width={nodeW}
                  height={nodeH}
                  rx="10"
                  fill={
                    isMissing
                      ? isAnswered
                        ? 'rgba(16,185,129,0.24)'
                        : 'rgba(251,191,36,0.16)'
                      : 'rgba(56,189,248,0.14)'
                  }
                  stroke={isMissing ? (isAnswered ? '#34D399' : '#FBBF24') : '#38BDF8'}
                  strokeWidth={isMissing ? 2.6 : 1.8}
                  strokeDasharray={isMissing && !isAnswered ? '5 4' : undefined}
                />
                <text
                  x={x + nodeW / 2}
                  y={nodeY + 30}
                  textAnchor="middle"
                  fill={isMissing ? (isAnswered ? '#6EE7B7' : '#FDE047') : '#F0F9FF'}
                  fontSize={displayVal.length >= 4 ? '14.5' : '17'}
                  fontWeight="900"
                >
                  {displayVal}
                </text>
                <text
                  x={x + nodeW / 2}
                  y={nodeY + nodeH + 18}
                  textAnchor="middle"
                  fill="#94A3B8"
                  fontSize="10.5"
                  fontWeight="700"
                >
                  Số {idx + 1}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

/**
 * Step 2H: Singapore Area Grid, Composite L-Shape & Area–Perimeter Link Lab
 */
const CPASvgAreaGridDiagram: React.FC<{
  pictorial: AreaGridPictorialSpec;
  isAnswered: boolean;
}> = ({ pictorial, isAnswered }) => {
  const [altView, setAltView] = useState(false);

  useEffect(() => {
    setAltView(false);
  }, [pictorial]);

  const {
    shapeKind,
    outerWidth,
    outerHeight,
    cutWidth = 0,
    cutHeight = 0,
    innerWidth = 0,
    innerHeight = 0,
    fullUnitTiles,
    halfUnitTiles = 0,
    compareWidth,
    compareHeight,
    lengthUnit,
    areaUnit,
    unknownTarget,
    expectedArea,
    expectedPerimeter,
    visualHint,
    showInteractiveToggle,
  } = pictorial;

  const hideW = !isAnswered && (unknownTarget === 'length' || unknownTarget === 'side');
  const hideH = !isAnswered && (unknownTarget === 'width' || unknownTarget === 'side');
  const hideArea = !isAnswered && (unknownTarget === 'area' || unknownTarget === 'tile_count' || unknownTarget === 'area_diff');
  const hidePerim = !isAnswered && unknownTarget === 'perimeter';

  const wLabel = hideW ? `? ${lengthUnit}` : `${outerWidth} ${lengthUnit}`;
  const hLabel = hideH ? `? ${lengthUnit}` : `${outerHeight} ${lengthUnit}`;
  const areaLabel = hideArea ? `Diện tích = ? ${areaUnit}` : `Diện tích = ${expectedArea} ${areaUnit}`;

  const toggleBtnText =
    shapeKind === 'l_shape_area'
      ? altView
        ? 'Đang xem: Trừ bù (Khung − Khuyết)'
        : 'Chuyển sang: Trừ bù (Khung − Khuyết)'
      : shapeKind === 'area_perim_link'
      ? altView
        ? 'Đang tô: Mặt Diện tích (bên trong)'
        : 'Đổi nổi bật: Viền Chu vi ↔ Diện tích'
      : altView
      ? 'Ẩn lưới ô vuông đơn vị'
      : 'Hiện lưới ô vuông 1×1';

  const renderAreaSVG = () => {
    // 1. UNIT GRID (with optional half-unit triangles)
    if (shapeKind === 'unit_grid') {
      const cols = Math.min(10, Math.max(2, outerWidth));
      const rows = Math.min(6, Math.max(2, outerHeight));
      const cell = Math.min(34, Math.floor(320 / cols), Math.floor(144 / rows));
      const gw = cols * cell;
      const gh = rows * cell;
      const ox = Math.round((560 - gw) / 2);
      const oy = Math.round((224 - gh) / 2);
      const totalFull = fullUnitTiles ?? cols * rows;
      const totalHalf = halfUnitTiles;

      return (
        <svg viewBox="0 0 560 250" className="w-full h-auto max-h-[245px]" role="img" aria-label="Lưới đếm ô vuông đơn vị diện tích">
          <rect x="14" y="10" width="532" height="230" rx="14" fill="rgba(15,23,42,0.55)" stroke="rgba(56,189,248,0.22)" />
          {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((__, c) => {
              const tileIdx = r * cols + c;
              const isFull = tileIdx < totalFull;
              const isHalf = !isFull && tileIdx < totalFull + totalHalf;
              const x = ox + c * cell;
              const y = oy + r * cell;
              return (
                <g key={`${r}-${c}`}>
                  <rect
                    x={x}
                    y={y}
                    width={cell}
                    height={cell}
                    fill={isFull ? 'rgba(56,189,248,0.28)' : 'rgba(15,23,42,0.4)'}
                    stroke="#38BDF8"
                    strokeWidth="1.4"
                  />
                  {isHalf && (
                    <polygon
                      points={`${x},${y + cell} ${x + cell},${y + cell} ${x},${y}`}
                      fill="rgba(251,191,36,0.45)"
                      stroke="#FBBF24"
                      strokeWidth="1.5"
                    />
                  )}
                </g>
              );
            })
          )}
          <text x="280" y={oy - 12} textAnchor="middle" fill="#BAE6FD" fontSize="12.5" fontWeight="800">
            Mỗi ô vuông nhỏ = 1 {areaUnit} {totalHalf > 0 ? `· Có ${totalHalf} nửa ô tam giác (2 nửa = 1 ô)` : ''}
          </text>
          <text x="280" y={oy + gh + 24} textAnchor="middle" fill="#FDE68A" fontSize="13.5" fontWeight="900">
            {areaLabel}
          </text>
        </svg>
      );
    }

    // 2. L-SHAPE AREA (Split & Add vs Subtract Cutout)
    if (shapeKind === 'l_shape_area') {
      const boxW = 290;
      const boxH = 154;
      const ox = Math.round((560 - boxW) / 2);
      const oy = 46;
      const cwPx = Math.round(boxW * Math.min(0.65, Math.max(0.25, cutWidth / Math.max(1, outerWidth))));
      const chPx = Math.round(boxH * Math.min(0.65, Math.max(0.25, cutHeight / Math.max(1, outerHeight))));
      const stepX = ox + boxW - cwPx;
      const stepY = oy + chPx;
      const lPts = `${ox},${oy} ${stepX},${oy} ${stepX},${stepY} ${ox + boxW},${stepY} ${ox + boxW},${oy + boxH} ${ox},${oy + boxH}`;

      return (
        <svg viewBox="0 0 560 255" className="w-full h-auto max-h-[250px]" role="img" aria-label="Sơ đồ tính diện tích hình ghép chữ L">
          <rect x="14" y="10" width="532" height="235" rx="14" fill="rgba(15,23,42,0.55)" stroke="rgba(56,189,248,0.22)" />

          {!altView ? (
            <>
              {/* Split & Add mode: Region A (left vertical) + Region B (right bottom) */}
              <rect x={ox} y={oy} width={stepX - ox} height={boxH} fill="rgba(56,189,248,0.26)" />
              <rect x={stepX} y={stepY} width={cwPx} height={boxH - chPx} fill="rgba(52,211,153,0.28)" />
              <line x1={stepX} y1={stepY} x2={stepX} y2={oy + boxH} stroke="#FDE047" strokeWidth="2.4" strokeDasharray="6 4" />
              <text x={ox + (stepX - ox) / 2} y={oy + boxH / 2 + 4} textAnchor="middle" fill="#E0F2FE" fontSize="13" fontWeight="900">
                Phần A
              </text>
              <text x={stepX + cwPx / 2} y={stepY + (boxH - chPx) / 2 + 4} textAnchor="middle" fill="#A7F3D0" fontSize="13" fontWeight="900">
                Phần B
              </text>
            </>
          ) : (
            <>
              {/* Subtract Cutout mode: Full bounding box minus top-right cutout */}
              <polygon points={lPts} fill="rgba(56,189,248,0.22)" />
              <rect
                x={stepX}
                y={oy}
                width={cwPx}
                height={chPx}
                fill="rgba(244,63,94,0.22)"
                stroke="#FB7185"
                strokeWidth="2.2"
                strokeDasharray="5 4"
              />
              <text x={stepX + cwPx / 2} y={oy + chPx / 2 + 4} textAnchor="middle" fill="#FDA4AF" fontSize="11.5" fontWeight="900">
                Phần khuyết ({cutWidth}×{cutHeight})
              </text>
            </>
          )}

          <polygon points={lPts} fill="none" stroke="#38BDF8" strokeWidth="3.2" strokeLinejoin="round" />

          {/* Dimension labels */}
          <text x={ox + boxW / 2} y={oy + boxH + 22} textAnchor="middle" fill="#E0F2FE" fontSize="13" fontWeight="800">
            Đáy ngoài = {outerWidth} {lengthUnit}
          </text>
          <text x={ox - 10} y={oy + boxH / 2 + 4} textAnchor="end" fill="#BAE6FD" fontSize="13" fontWeight="800">
            Cao = {outerHeight} {lengthUnit}
          </text>
          <text x={ox + (stepX - ox) / 2} y={oy - 10} textAnchor="middle" fill="#7DD3FC" fontSize="12" fontWeight="800">
            {outerWidth - cutWidth} {lengthUnit}
          </text>
          <text x={ox + boxW + 10} y={stepY + (boxH - chPx) / 2 + 4} textAnchor="start" fill="#6EE7B7" fontSize="12" fontWeight="800">
            {outerHeight - cutHeight} {lengthUnit}
          </text>
          <text x="280" y="236" textAnchor="middle" fill="#FDE68A" fontSize="12.5" fontWeight="900">
            {altView ? 'Chiến lược Trừ bù: S_ngoài − S_khuyết · ' : 'Chiến lược Cắt cộng: S_A + S_B · '}
            {areaLabel}
          </text>
        </svg>
      );
    }

    // 3. FRAME BORDER / WALKWAY AROUND GARDEN
    if (shapeKind === 'frame_border') {
      const boxW = 300;
      const boxH = 152;
      const ox = Math.round((560 - boxW) / 2);
      const oy = 46;
      const iwPx = Math.round(boxW * Math.min(0.76, Math.max(0.35, innerWidth / Math.max(1, outerWidth))));
      const ihPx = Math.round(boxH * Math.min(0.76, Math.max(0.35, innerHeight / Math.max(1, outerHeight))));
      const ix = ox + Math.round((boxW - iwPx) / 2);
      const iy = oy + Math.round((boxH - ihPx) / 2);

      return (
        <svg viewBox="0 0 560 250" className="w-full h-auto max-h-[245px]" role="img" aria-label="Sơ đồ tính diện tích khung viền lối đi">
          <rect x="14" y="10" width="532" height="230" rx="14" fill="rgba(15,23,42,0.55)" stroke="rgba(56,189,248,0.22)" />
          <rect x={ox} y={oy} width={boxW} height={boxH} rx="4" fill="rgba(251,191,36,0.25)" stroke="#FBBF24" strokeWidth="3" />
          <rect x={ix} y={iy} width={iwPx} height={ihPx} rx="3" fill="rgba(15,23,42,0.88)" stroke="#38BDF8" strokeWidth="2.4" strokeDasharray="5 3" />

          <text x={ox + boxW / 2} y={oy - 10} textAnchor="middle" fill="#FDE68A" fontSize="13" fontWeight="800">
            Khung ngoài: {outerWidth} {lengthUnit} × {outerHeight} {lengthUnit}
          </text>
          <text x={ix + iwPx / 2} y={iy + ihPx / 2 + 5} textAnchor="middle" fill="#BAE6FD" fontSize="13" fontWeight="900">
            Lõi trong: {innerWidth} {lengthUnit} × {innerHeight} {lengthUnit}
          </text>
          <text x="280" y={oy + boxH + 26} textAnchor="middle" fill="#6EE7B7" fontSize="13" fontWeight="900">
            Diện tích phần viền tô vàng = S_ngoài − S_trong · {areaLabel}
          </text>
        </svg>
      );
    }

    // 4. DUAL COMPARISON (Same Perimeter, Different Area)
    if (shapeKind === 'area_perim_link' && compareWidth && compareHeight) {
      return (
        <svg viewBox="0 0 560 245" className="w-full h-auto max-h-[245px]" role="img" aria-label="So sánh hai hình cùng chu vi nhưng khác diện tích">
          <rect x="14" y="10" width="532" height="225" rx="14" fill="rgba(15,23,42,0.55)" stroke="rgba(56,189,248,0.22)" />
          <text x="280" y="34" textAnchor="middle" fill="#BAE6FD" fontSize="13" fontWeight="800">
            So sánh hai hình: Viền Chu vi (vàng) vs Mặt Diện tích (xanh)
          </text>

          {/* Shape 1 */}
          <rect x="64" y="64" width="160" height="104" rx="4" fill="rgba(56,189,248,0.22)" stroke="#FBBF24" strokeWidth="3.2" />
          <text x="144" y="114" textAnchor="middle" fill="#E0F2FE" fontSize="13" fontWeight="900">
            Hình 1 ({outerWidth}×{outerHeight})
          </text>
          <text x="144" y="134" textAnchor="middle" fill="#7DD3FC" fontSize="11.5" fontWeight="800">
            {hideArea ? `S₁ = ? ${areaUnit}` : `S₁ = ${outerWidth * outerHeight} ${areaUnit}`}
          </text>

          {/* Shape 2 */}
          <rect x="336" y="54" width="124" height="124" rx="4" fill="rgba(52,211,153,0.22)" stroke="#FBBF24" strokeWidth="3.2" />
          <text x="398" y="114" textAnchor="middle" fill="#ECFDF5" fontSize="13" fontWeight="900">
            Hình 2 ({compareWidth}×{compareHeight})
          </text>
          <text x="398" y="134" textAnchor="middle" fill="#6EE7B7" fontSize="11.5" fontWeight="800">
            {hideArea ? `S₂ = ? ${areaUnit}` : `S₂ = ${compareWidth * compareHeight} ${areaUnit}`}
          </text>

          <text x="280" y="212" textAnchor="middle" fill="#FDE68A" fontSize="12.5" fontWeight="900">
            Cùng chu vi, hình càng gần hình vuông thì diện tích càng LỚN!
          </text>
        </svg>
      );
    }

    // 5. SQUARE / RECTANGLE / AREA-PERIMETER LINK
    const isSq = shapeKind === 'square_area' || outerWidth === outerHeight;
    const aspect = isSq ? 1 : Math.min(2.1, Math.max(1.25, outerWidth / Math.max(1, outerHeight)));
    const boxH = isSq ? 136 : 126;
    const boxW = Math.round(boxH * aspect);
    const ox = Math.round((560 - boxW) / 2);
    const oy = 52;
    const showGrid = outerWidth <= 12 && outerHeight <= 12 && (!showInteractiveToggle || altView || shapeKind !== 'area_perim_link');
    const highlightPerim = shapeKind === 'area_perim_link' && !altView;

    return (
      <svg viewBox="0 0 560 250" className="w-full h-auto max-h-[245px]" role="img" aria-label="Sơ đồ diện tích hình vuông hoặc hình chữ nhật">
        <rect x="14" y="10" width="532" height="230" rx="14" fill="rgba(15,23,42,0.55)" stroke="rgba(56,189,248,0.22)" />

        <rect
          x={ox}
          y={oy}
          width={boxW}
          height={boxH}
          rx="4"
          fill={highlightPerim ? 'rgba(56,189,248,0.12)' : 'rgba(56,189,248,0.24)'}
          stroke={highlightPerim ? '#FBBF24' : '#38BDF8'}
          strokeWidth={highlightPerim ? 4.4 : 3.2}
        />

        {/* Optional internal unit grid */}
        {showGrid &&
          Array.from({ length: outerWidth - 1 }).map((_, i) => {
            const gx = ox + ((i + 1) / outerWidth) * boxW;
            return <line key={`vx-${i}`} x1={gx} y1={oy} x2={gx} y2={oy + boxH} stroke="rgba(125,211,252,0.28)" strokeWidth="1" />;
          })}
        {showGrid &&
          Array.from({ length: outerHeight - 1 }).map((_, j) => {
            const gy = oy + ((j + 1) / outerHeight) * boxH;
            return <line key={`hy-${j}`} x1={ox} y1={gy} x2={ox + boxW} y2={gy} stroke="rgba(125,211,252,0.28)" strokeWidth="1" />;
          })}

        {/* Center badge */}
        <rect x={ox + boxW / 2 - 76} y={oy + boxH / 2 - 15} width="152" height="30" rx="8" fill="rgba(15,23,42,0.82)" stroke="rgba(125,211,252,0.4)" />
        <text x={ox + boxW / 2} y={oy + boxH / 2 + 5} textAnchor="middle" fill="#FDE68A" fontSize="12.5" fontWeight="900">
          {hideArea ? `S = ? ${areaUnit}` : `S = ${expectedArea} ${areaUnit}`}
        </text>

        {/* Dimensions */}
        <text x={ox + boxW / 2} y={oy - 12} textAnchor="middle" fill="#E0F2FE" fontSize="13.5" fontWeight="800">
          {isSq ? `Cạnh = ${wLabel}` : `Chiều dài = ${wLabel}`}
        </text>
        {!isSq && (
          <text x={ox - 12} y={oy + boxH / 2 + 4} textAnchor="end" fill="#BAE6FD" fontSize="13" fontWeight="800">
            Rộng = {hLabel}
          </text>
        )}
        <text x="280" y={oy + boxH + 28} textAnchor="middle" fill="#6EE7B7" fontSize="12.5" fontWeight="800">
          {expectedPerimeter !== undefined
            ? `Chu vi = ${hidePerim ? `? ${lengthUnit}` : `${expectedPerimeter} ${lengthUnit}`} · ${areaLabel}`
            : areaLabel}
        </text>
      </svg>
    );
  };

  return (
    <div className="space-y-3">
      {(showInteractiveToggle || visualHint) && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-semibold text-[color:var(--mm-ink-secondary)]">
            {visualHint || 'Quan sát lưới ô vuông bên trong để tính diện tích chính xác'}
          </span>
          {showInteractiveToggle && (
            <button
              type="button"
              onClick={() => setAltView((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                altView
                  ? 'bg-[color:color-mix(in_oklch,var(--mm-amber-tint)_70%,transparent)] border-[color:var(--mm-amber-accent)] text-[color:var(--mm-amber-bright)]'
                  : 'bg-[color:color-mix(in_oklch,var(--mm-cyan-tint)_60%,transparent)] border-[color:var(--mm-cyan-border)] text-[color:var(--mm-cyan-bright)] hover:border-[color:var(--mm-cyan-accent)]'
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{toggleBtnText}</span>
            </button>
          )}
        </div>
      )}

      <div className="rounded-2xl bg-[radial-gradient(ellipse_at_center,_color-mix(in_oklch,var(--mm-cyan-accent)_10%,transparent),_transparent_70%),var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_65%,transparent)] p-3 overflow-x-auto shadow-[inset_0_2px_18px_rgba(0,0,0,0.58)]">
        {renderAreaSVG()}
      </div>
    </div>
  );
};

/**
 * Step 3: Abstract LaTeX Mathematical Panel (A — Biểu thức toán học)
 */
const CPAAbstractLatexPanel: React.FC<{
  cpaSpec: SingaporeCPASpec;
  isAnswered: boolean;
}> = ({ cpaSpec, isAnswered }) => {
  const steps = isAnswered
    ? cpaSpec.abstract.fullLatexSteps
    : cpaSpec.abstract.guidedLatexSteps;

  return (
    <section
      aria-label="Bước 3: Biểu thức toán học"
      className="rounded-2xl bg-[radial-gradient(ellipse_at_bottom_right,_color-mix(in_oklch,var(--mm-cyan-accent)_10%,transparent),_transparent_55%),linear-gradient(145deg,_var(--mm-surface-1),_var(--mm-surface-inset))] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_58%,transparent)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_28px_rgba(3,7,24,0.45)]"
    >
      <CPAStageHeader
        stepNum="Bước 3 (A)"
        stageLabel="Biểu thức toán học"
        subtitle={
          isAnswered
            ? 'Lời giải đại số đầy đủ đã kiểm chứng'
            : 'Khung tư duy gợi mở — tự chọn phép tính thay vào dấu ?'
        }
        icon={<Sigma className="w-4 h-4" />}
        accentClass="text-[color:var(--mm-emerald-text)]"
      />

      <div className="space-y-2">
        {steps.map((latexStep, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[color:var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_38%,transparent)] text-sm text-[color:var(--mm-ink-primary)] overflow-x-auto"
          >
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[color:color-mix(in_oklch,var(--mm-cyan-tint)_70%,transparent)] border border-[color:var(--mm-cyan-border)] text-[11px] font-black text-[color:var(--mm-cyan-bright)] shrink-0 tabular-nums">
              {idx + 1}
            </span>
            <KatexFormula latex={latexStep} className="font-semibold tracking-wide" />
          </div>
        ))}
      </div>

      {isAnswered && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-[color:color-mix(in_oklch,var(--mm-emerald-tint)_60%,transparent)] border border-[color:var(--mm-emerald-border)] text-[color:var(--mm-emerald-bright)]">
          <div className="flex items-center gap-2 text-xs font-black">
            <CheckCircle2 className="w-4 h-4 text-[color:var(--mm-emerald-accent)] shrink-0" />
            <span>Kết quả kiểm chứng toán học:</span>
          </div>
          <KatexFormula
            latex={cpaSpec.abstract.finalAnswerLatex}
            className="text-sm font-black text-[color:var(--mm-amber-bright)]"
          />
        </div>
      )}
    </section>
  );
};

export const InMonthVisualModels: React.FC<InMonthVisualModelsProps> = ({
  model,
  isAnswered = false,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    setSelectedIndex(null);
  }, [model]);

  // Use pre-attached cpaSpec from November data, or synthesize deterministically on the fly
  const cpaSpec: SingaporeCPASpec = useMemo(() => {
    if (model.cpaSpec) return model.cpaSpec;
    return buildCPASpecForQuestion({
      id: 'dynamic-cpa-model',
      prompt: model.title,
      correctAnswer: model.totalBracketLabel || model.differenceBracketLabel || '1',
      stepByStepExplanation: model.subtitle ? [model.subtitle] : [],
      visualModel: model,
    });
  }, [model]);

  const domainTitle =
    cpaSpec.pictorial.kind === 'bar_model'
      ? 'Sơ đồ thanh Singapore (Bar Model)'
      : cpaSpec.pictorial.kind === 'remainder_groups'
      ? 'Mô hình chia nhóm & phần dư'
      : cpaSpec.pictorial.kind === 'interval_model'
      ? 'Mô hình khoảng cách & điểm mốc'
      : cpaSpec.pictorial.kind === 'perimeter_shape'
      ? 'Sơ đồ hình học chu vi & kỹ thuật dời cạnh'
      : cpaSpec.pictorial.kind === 'place_value_chart'
      ? 'Bảng đĩa số hàng Nghìn–Trăm–Chục–Đơn vị & Tia số'
      : cpaSpec.pictorial.kind === 'sequence_pattern'
      ? 'Sơ đồ chuỗi số quy luật & cung bước nhảy'
      : cpaSpec.pictorial.kind === 'area_grid'
      ? 'Lưới ô vuông diện tích & Liên kết Diện tích – Chu vi'
      : 'Phòng thí nghiệm đo lường & biểu đồ';

  return (
    <div className="relative overflow-hidden mm-surface-card backdrop-blur-2xl rounded-3xl border p-5 sm:p-6 shadow-[0_28px_72px_rgba(3,7,24,0.86),0_0_40px_rgba(34,211,238,0.14),inset_0_1px_0_rgba(255,255,255,0.14)]">
      <CosmicHoloCorner />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-6 h-[2px] rounded-full bg-gradient-to-r from-[color:var(--mm-cyan-brightFill)] via-sky-300 to-[color:var(--mm-amber-brightFill)] shadow-[0_0_18px_rgba(34,211,238,0.7)]"
      />

      {/* Clean Editorial Title Bar for CPA Module */}
      {model.title && (
        <div className="relative z-10 mb-4 pb-3 border-b border-white/10">
          <div className="text-xs font-bold text-[color:var(--mm-cyan-text)] mb-1">
            Phương pháp Tư duy Singapore CPA · C → P → A
          </div>
          <h3 className="text-sm sm:text-base font-black text-[color:var(--mm-ink-primary)] leading-snug">
            {model.title}
          </h3>
        </div>
      )}

      {/* CPA Interactive Body */}
      <div className="relative z-10 space-y-4">
        {/* STEP 1: CONCRETE */}
        <CPAConcretePanel
          cpaSpec={cpaSpec}
          isAnswered={isAnswered}
          selectedGroupIdx={selectedIndex}
          onSelectGroup={setSelectedIndex}
        />

        {/* STEP 2: PICTORIAL (VECTOR SVG ENGINE) */}
        <section
          aria-label="Bước 2: Sơ đồ mô hình"
          className="rounded-2xl bg-[radial-gradient(ellipse_at_top_right,_color-mix(in_oklch,var(--mm-amber-accent)_9%,transparent),_transparent_55%),linear-gradient(145deg,_var(--mm-surface-1),_var(--mm-surface-inset))] border border-[color:color-mix(in_oklch,var(--mm-amber-border)_58%,transparent)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_28px_rgba(3,7,24,0.45)]"
        >
          <CPAStageHeader
            stepNum="Bước 2 (P)"
            stageLabel="Sơ đồ mô hình"
            subtitle={domainTitle}
            icon={<Compass className="w-4 h-4" />}
            accentClass="text-[color:var(--mm-amber-text)]"
          />

          {cpaSpec.pictorial.kind === 'bar_model' && (
            <CPASvgBarModelDiagram
              pictorial={cpaSpec.pictorial}
              isAnswered={isAnswered}
              selectedBarIdx={selectedIndex}
              onSelectBar={setSelectedIndex}
            />
          )}

          {cpaSpec.pictorial.kind === 'remainder_groups' && (
            <CPASvgRemainderDiagram
              pictorial={cpaSpec.pictorial}
              isAnswered={isAnswered}
            />
          )}

          {cpaSpec.pictorial.kind === 'interval_model' && (
            <CPASvgIntervalDiagram
              pictorial={cpaSpec.pictorial}
              isAnswered={isAnswered}
            />
          )}

          {cpaSpec.pictorial.kind === 'measurement_lab' && (
            <CPASvgMeasurementDiagram
              pictorial={cpaSpec.pictorial}
              isAnswered={isAnswered}
            />
          )}

          {cpaSpec.pictorial.kind === 'perimeter_shape' && (
            <CPASvgPerimeterDiagram
              pictorial={cpaSpec.pictorial}
              isAnswered={isAnswered}
            />
          )}

          {cpaSpec.pictorial.kind === 'place_value_chart' && (
            <CPASvgPlaceValueDiagram
              pictorial={cpaSpec.pictorial}
              isAnswered={isAnswered}
            />
          )}

          {cpaSpec.pictorial.kind === 'sequence_pattern' && (
            <CPASvgSequencePatternDiagram
              pictorial={cpaSpec.pictorial}
              isAnswered={isAnswered}
            />
          )}

          {cpaSpec.pictorial.kind === 'area_grid' && (
            <CPASvgAreaGridDiagram
              pictorial={cpaSpec.pictorial}
              isAnswered={isAnswered}
            />
          )}
        </section>

        {/* STEP 3: ABSTRACT (KATEX LATEX FORMULAS) */}
        <CPAAbstractLatexPanel cpaSpec={cpaSpec} isAnswered={isAnswered} />
      </div>
    </div>
  );
};

import React, { useEffect, useMemo, useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { InMonthVisualModelConfig } from '../../data/inMonthNovemberData';
import { buildCPASpecForQuestion } from '../../utils/singaporeCPABuilder';
import type {
  BarModelBarSpec,
  BarModelPictorialSpec,
  CPAConcreteGroup,
  IntervalPictorialSpec,
  MeasurementPictorialSpec,
  RemainderPictorialSpec,
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

          const maskCount = isRemainderFullGroupsUnknown || isIntervalCountUnknown;
          const maskUnitValue =
            hideNumbers &&
            !isRemainderFullGroupsUnknown &&
            (pictorial.kind !== 'interval_model' || pictorial.unknownTarget === 'step_length');

          const visibleIcons =
            mode === 'measurement'
              ? 1
              : maskCount
              ? 2
              : Math.min(g.count, 8);

          // Format badge & bottom footer cleanly per domain displayMode
          let badgeText = hideNumbers
            ? `? ${concrete.unitLabel}`
            : `${g.totalValue} ${concrete.unitLabel}`;
          let footerText = `${maskCount ? '?' : g.count} phần × ${maskUnitValue ? '?' : g.unitValue}`;

          if (mode === 'groups' && pictorial.kind === 'remainder_groups') {
            if (g.id === 'cg_remainder') {
              badgeText = hideNumbers ? 'Dư ?' : `Dư ${g.totalValue}`;
              footerText = hideNumbers
                ? `Phần dư < ${pictorial.divisor}`
                : `Phần dư lẻ = ${g.totalValue} (< ${pictorial.divisor})`;
            } else {
              badgeText = isAnswered
                ? `${g.count} nhóm (${g.totalValue})`
                : pictorial.unknownTarget === 'dividend'
                ? `${g.count} nhóm × ${g.unitValue}`
                : `? nhóm`;
              footerText = `${maskCount ? '?' : g.count} nhóm × ${g.unitValue}/nhóm`;
            }
          } else if (mode === 'interval' && pictorial.kind === 'interval_model') {
            if (g.id === 'cg_intervals') {
              const showKnownStep =
                isAnswered || pictorial.unknownTarget !== 'step_length';
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
            badgeText = hideNumbers ? '?' : `${g.totalValue}`;
            footerText = hideNumbers
              ? 'Đổi về cùng đơn vị chuẩn'
              : `Giá trị đo: ${g.totalValue}`;
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
                      ? hideNumbers
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

            const shownLabel =
              bar.isUnknown && !isAnswered
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
                          {bar.isUnknown && !isAnswered ? '?' : bar.unitValue}
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
                  ? `${diffInfo.label.replace(/\?/g, String(diffInfo.numericValue))} (${diffInfo.numericValue} ${pictorial.unitName})`
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
              {sel.units} phần ×{' '}
              {sel.isUnknown && !isAnswered ? '?' : sel.unitValue}
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

  const isDividendUnknown = !isAnswered && unknownTarget === 'dividend';
  const isQuotientOrRemUnknown = !isAnswered && unknownTarget !== 'dividend';
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
    ? `Sơ đồ Phép chia: ${dividend} = ${divisor} × ${quotient} + ${remainder} (Số dư ${remainder} < Số chia ${divisor})`
    : isDividendUnknown
    ? `Sơ đồ Phép chia: ? = ${divisor} × ${quotient} + dư (< ${divisor})`
    : `Sơ đồ Phép chia: ${dividend} chia đều mỗi nhóm ${divisor} (Số dư < ${divisor})`;

  const totalBraceLabel = isAnswered
    ? `Tổng = ${dividend} (${quotient} ${groupLabel.toLowerCase()} × ${divisor}${remainder > 0 ? ` + dư ${remainder}` : ''})`
    : isDividendUnknown
    ? `Tổng số bị chia = ? (${quotient} ${groupLabel.toLowerCase()} × ${divisor} + dư ?)`
    : `Tổng = ${dividend} (? ${groupLabel.toLowerCase()} × ${divisor} + dư ?)`;

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
                {isAnswered ? `Dư ${remainder}` : 'Dư ?'}
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
              {isAnswered
                ? `Phần dư: ${remainder} (< ${divisor})`
                : `Phần dư: ? (< ${divisor})`}
            </div>
            <div className="flex flex-wrap gap-1">
              {isAnswered ? (
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
  const hideStep = !isAnswered && unknownTarget === 'step_length';

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

  // --- GEOMETRY 2: WOOD CUTS (Segmented Wooden Log with Saw-Cut Lines) ---
  if (subtype === 'wood_cuts') {
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
            Mô hình Cưa gỗ / Cắt đoạn (Mạch cắt nằm bên trong thanh gỗ)
          </span>
          <span className="font-semibold text-[color:var(--mm-ink-secondary)]">
            {timePerCut
              ? `Mỗi lần cưa hết ${timePerCut} ${timeUnit || 'phút'} · Số lần cưa = Số đoạn − 1`
              : 'Nhát cưa cuối tách rời cả 2 đoạn cuối ➔ Số lần cưa = Số đoạn − 1'}
          </span>
        </div>
        <div className="rounded-2xl bg-[radial-gradient(ellipse_at_center,_color-mix(in_oklch,var(--mm-amber-accent)_10%,transparent),_transparent_70%),var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-amber-border)_58%,transparent)] p-3 overflow-x-auto shadow-[inset_0_2px_18px_rgba(0,0,0,0.58)]">
          <svg
            viewBox="0 0 720 148"
            className="w-full h-auto min-w-[520px] select-none"
            role="img"
            aria-label="Sơ đồ cưa khúc gỗ thành các đoạn"
          >
            {/* Wooden Planks */}
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
                    fill={isMidEllipsis ? 'rgba(217,119,6,0.22)' : 'rgba(217,119,6,0.58)'}
                    stroke="#FBBF24"
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

            {/* Vertical Glowing Saw-Cut Lines Between Planks */}
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
                ? `${intervalsCount} đoạn gỗ ➔ ${objectsCount} lần cưa${timePerCut ? ` × ${timePerCut} ${timeUnit || 'phút'} = ${objectsCount * timePerCut} ${timeUnit || 'phút'}` : ''}`
                : stepLength > 1
                ? `Khúc gỗ dài ${totalLength} ${unitLabel} (mỗi đoạn ${stepLength} ${unitLabel}) ➔ ? đoạn ➔ ? lần cưa`
                : `Chia thành ${intervalsCount} đoạn gỗ ➔ Cần ? lần cưa${timePerCut ? ` (${timePerCut} ${timeUnit || 'phút'}/lần)` : ''}`}
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
            Xuất phát từ Tầng {startFloor} · Mỗi khoảng tầng có {stepLength} {unitLabel}
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
                        {isMidEllipsis ? '…' : `${stepLength} ${unitLabel}`}
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
    subtype === 'both_ends'
      ? 'Trồng cả 2 đầu đường ➔ Số mốc = Số khoảng + 1'
      : subtype === 'one_end'
      ? 'Chỉ trồng 1 đầu đường ➔ Số mốc = Số khoảng'
      : 'Bỏ trống cả 2 đầu đường ➔ Số mốc = Số khoảng − 1';

  const summaryText = isAnswered
    ? `Tổng độ dài = ${intervalsCount} khoảng × ${stepLength} ${unitLabel} = ${totalLength} ${unitLabel}${isTwoSided ? ' (Áp dụng cho cả 2 bên đường × 2)' : ''}`
    : hideTotal
    ? `Tổng độ dài = ? ${unitLabel} (${objectsCount} điểm mốc · mỗi khoảng ${stepLength} ${unitLabel})`
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
    /^(Rót ra:|Cắt đi:|Bình B:|Nửa hũ:|Phần chồng =|Lấy ra:|Nửa thùng:|BC =|Đĩa trái:|Nửa bình:|Rót 4 cốc|Mối nối chồng:|Rót bớt:|Vỏ \+ Nửa|Mỗi chỗ dán|1 Bưởi =|Nửa can:|Lấy đi:|Cắt bớt:|Chia đều|Rót 3 cốc)/;
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
              ? `Độ dài thanh ghép (${count} thanh, ${count - 1} mối chồng) = ${expectedNumericResult} ${unit}`
              : `Ghép ${count} thanh (${count - 1} mối chồng ${overlap} ${unit}) ➔ Tổng dài = ? ${unit}`}
          </text>
        </svg>
      );
    }

    // 2. Tare Weight (Full Jar vs Half Jar Split-Bar Diagram)
    if (mode === 'tare_half') {
      const fullVal = visualParams?.givenA || 1500;
      const halfVal = visualParams?.givenB || 900;
      const unit = visualParams?.unitA || 'g';
      const barX = 165;
      const shellW = 86;
      const halfContentW = 185;

      return (
        <svg viewBox="0 0 720 154" className="w-full h-auto min-w-[500px] select-none" role="img" aria-label="Sơ đồ tách vỏ bình và phần ruột">
          {/* Row 1: Full = Shell + Half + Half */}
          <text x={18} y={48} fill="#E2E8F0" fontSize="12" fontWeight="800">Đầy bình ({fullVal} {unit})</text>
          <rect x={barX} y={28} width={shellW} height={32} rx={6} fill="#475569" stroke="#CBD5E1" strokeWidth="1.2" />
          <text x={barX + shellW / 2} y={48} textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">Vỏ (?)</text>
          <rect x={barX + shellW + 2} y={28} width={halfContentW} height={32} rx={4} fill="#F59E0B" stroke="#FDE68A" strokeWidth="1.2" />
          <text x={barX + shellW + 2 + halfContentW / 2} y={48} textAnchor="middle" fill="#05081D" fontSize="11" fontWeight="900">Nửa ruột (1/2)</text>
          <rect x={barX + shellW + halfContentW + 4} y={28} width={halfContentW} height={32} rx={6} fill="#FBBF24" stroke="#FEF3C7" strokeWidth="1.4" strokeDasharray="4 3" />
          <text x={barX + shellW + halfContentW + 4 + halfContentW / 2} y={48} textAnchor="middle" fill="#05081D" fontSize="11" fontWeight="900">Nửa ruột rót đi</text>

          {/* Row 2: Half = Shell + Half */}
          <text x={18} y={96} fill="#E2E8F0" fontSize="12" fontWeight="800">Nửa bình ({halfVal} {unit})</text>
          <rect x={barX} y={76} width={shellW} height={32} rx={6} fill="#475569" stroke="#CBD5E1" strokeWidth="1.2" />
          <text x={barX + shellW / 2} y={96} textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">Vỏ (?)</text>
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

    // 4. Equalize Transfer Beakers (Pour Half Difference from A to B)
    if (mode === 'equalize_pour') {
      const a = visualParams?.givenA || 750;
      const b = visualParams?.givenB || 350;
      const maxCap = Math.max(a, b, 1) * 1.12;
      const hA = Math.max(24, (a / maxCap) * 86);
      const hB = Math.max(24, (b / maxCap) * 86);
      const eqH = (hA + hB) / 2;

      return (
        <svg viewBox="0 0 720 156" className="w-full h-auto min-w-[500px] select-none" role="img" aria-label="Sơ đồ rót nước san bằng hai bình">
          {/* Beaker A */}
          <rect x={140} y={24} width={116} height={96} rx={10} fill="rgba(15,23,42,0.75)" stroke="#38BDF8" strokeWidth="2" />
          <rect x={144} y={118 - hA} width={108} height={hA} rx={6} fill="rgba(14,165,233,0.72)" />
          <line x1={134} y1={118 - eqH} x2={264} y2={118 - eqH} stroke="#FBBF24" strokeWidth="1.6" strokeDasharray="4 4" />
          <text x={198} y={142} textAnchor="middle" fill="#E0F2FE" fontSize="11.5" fontWeight="800">
            {visualParams?.labelA || `Bình A (${a} mL)`}
          </text>

          {/* Curved Pour Arrow */}
          <path d="M 272 52 Q 360 12 448 52" fill="none" stroke="#FBBF24" strokeWidth="2.5" strokeDasharray="5 4" />
          <polygon points="448,52 436,44 439,56" fill="#FBBF24" />
          <text x={360} y={24} textAnchor="middle" fill="#FDE68A" fontSize="11.5" fontWeight="900">
            {isAnswered ? `Rót ${expectedNumericResult} mL` : 'Rót 1/2 phần hơn = ? mL'}
          </text>

          {/* Beaker B */}
          <rect x={464} y={24} width={116} height={96} rx={10} fill="rgba(15,23,42,0.75)" stroke="#34D399" strokeWidth="2" />
          <rect x={468} y={118 - hB} width={108} height={hB} rx={6} fill="rgba(16,185,129,0.72)" />
          <line x1={458} y1={118 - eqH} x2={588} y2={118 - eqH} stroke="#FBBF24" strokeWidth="1.6" strokeDasharray="4 4" />
          <text x={522} y={142} textAnchor="middle" fill="#D1FAE5" fontSize="11.5" fontWeight="800">
            {visualParams?.labelB || `Bình B (${b} mL)`}
          </text>
        </svg>
      );
    }

    // 5. Two-Pan Balance Scale (balance_eq or divide_equal on weight_balance)
    if (subtype === 'weight_balance') {
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
          <rect x={110} y={88} width={168} height={34} rx={8} fill="rgba(14,165,233,0.22)" stroke="#38BDF8" strokeWidth="1.5" />
          <text x={194} y={109} textAnchor="middle" fill="#F8FAFC" fontSize="11.5" fontWeight="800">
            {visualParams?.labelA || primaryReading || 'Đĩa trái'}
          </text>

          {/* Right Pan */}
          <line x1={526} y1={52} x2={496} y2={92} stroke="#94A3B8" strokeWidth="1.5" />
          <line x1={526} y1={52} x2={556} y2={92} stroke="#94A3B8" strokeWidth="1.5" />
          <rect x={442} y={88} width={168} height={34} rx={8} fill="rgba(251,191,36,0.2)" stroke="#FBBF24" strokeWidth="1.5" />
          <text x={526} y={109} textAnchor="middle" fill="#FEF3C7" fontSize="11.5" fontWeight="800">
            {visualParams?.labelB || (secondaryReading ? getDisplaySecondaryReading(secondaryReading, isAnswered) : 'Đĩa phải')}
          </text>

          <text x={360} y={30} textAnchor="middle" fill="#67E8F9" fontSize="11.5" fontWeight="800">
            {isAnswered
              ? `Cân thăng bằng ➔ Kết quả = ${expectedNumericResult} ${resultUnit}`
              : 'Cân ở vị trí thăng bằng (Trái = Phải)'}
          </text>
        </svg>
      );
    }

    // 6. Graduated Cylinder Volume Beaker
    if (subtype === 'volume_beaker') {
      const a = visualParams?.givenA || 2000;
      const b = visualParams?.givenB || 600;
      const remainRatio = mode === 'subtract' ? Math.max(0.18, (a - b) / Math.max(a, 1)) : 0.72;
      const fillH = Math.round(remainRatio * 84);

      return (
        <svg viewBox="0 0 720 146" className="w-full h-auto min-w-[500px] select-none" role="img" aria-label="Bình chia độ đo thể tích">
          {/* Main Beaker */}
          <rect x={120} y={24} width={124} height={96} rx={10} fill="rgba(15,23,42,0.8)" stroke="#38BDF8" strokeWidth="2" />
          <rect x={124} y={118 - fillH} width={116} height={fillH} rx={6} fill="rgba(56,189,248,0.62)" />
          {[0, 1, 2, 3].map((t) => (
            <line key={t} x1={124} y1={38 + t * 22} x2={140} y2={38 + t * 22} stroke="#BAE6FD" strokeWidth="1.4" />
          ))}
          <text x={182} y={138} textAnchor="middle" fill="#E0F2FE" fontSize="11.5" fontWeight="800">
            {visualParams?.labelA || primaryReading || 'Bình ban đầu'}
          </text>

          {/* Action Arrow */}
          <line x1={264} y1={72} x2={376} y2={72} stroke="#FBBF24" strokeWidth="2.5" strokeDasharray="5 4" />
          <polygon points="376,72 364,65 364,79" fill="#FBBF24" />
          <text x={320} y={58} textAnchor="middle" fill="#FDE68A" fontSize="11.5" fontWeight="900">
            {visualParams?.labelB || (secondaryReading ? getDisplaySecondaryReading(secondaryReading, isAnswered) : 'Chia / Rót')}
          </text>

          {/* Result Callout Box */}
          <rect x={396} y={40} width={224} height={64} rx={12} fill="rgba(16,185,129,0.16)" stroke="#34D399" strokeWidth="1.6" />
          <text x={508} y={66} textAnchor="middle" fill="#A7F3D0" fontSize="11" fontWeight="800">
            {mode === 'divide_equal' ? 'Mỗi chai / phần chứa' : 'Lượng nước còn lại'}
          </text>
          <text x={508} y={88} textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="900">
            {isAnswered ? `${expectedNumericResult} ${visualParams?.unitA || 'mL'}` : `? ${visualParams?.unitA || 'mL'}`}
          </text>
        </svg>
      );
    }

    // 7. Graduated Metric Ruler / Tape Diagram for Length Scale
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
          fill={mode === 'subtract' ? 'rgba(244,63,94,0.68)' : '#0D9488'}
          stroke={mode === 'subtract' ? '#FDA4AF' : '#5EEAD4'}
          strokeWidth="1.3"
          strokeDasharray={mode === 'subtract' ? '4 3' : undefined}
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
        </section>

        {/* STEP 3: ABSTRACT (KATEX LATEX FORMULAS) */}
        <CPAAbstractLatexPanel cpaSpec={cpaSpec} isAnswered={isAnswered} />
      </div>
    </div>
  );
};

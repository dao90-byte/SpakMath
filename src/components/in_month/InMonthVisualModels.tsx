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
    className="pointer-events-none absolute -top-2 -right-2 w-44 h-28 opacity-45"
  >
    <circle
      cx="150"
      cy="18"
      r="64"
      fill="none"
      stroke="rgba(34,211,238,0.25)"
      strokeWidth="1"
      strokeDasharray="4 6"
    />
    <circle cx="150" cy="18" r="92" fill="none" stroke="rgba(251,191,36,0.16)" strokeWidth="1" />
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
 * Step 1: Concrete Manipulative Layer
 */
const CPAConcretePanel: React.FC<{
  cpaSpec: SingaporeCPASpec;
  isAnswered: boolean;
  selectedGroupIdx: number | null;
  onSelectGroup: (idx: number | null) => void;
}> = ({ cpaSpec, isAnswered, selectedGroupIdx, onSelectGroup }) => {
  const { concrete, pictorial } = cpaSpec;

  return (
    <div className="rounded-2xl bg-[radial-gradient(ellipse_at_top_left,_color-mix(in_oklch,var(--mm-cyan-accent)_12%,transparent),_transparent_55%),linear-gradient(145deg,_var(--mm-surface-1),_var(--mm-surface-inset))] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_65%,transparent)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_28px_rgba(3,7,24,0.48)]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {concrete.groups.map((g: CPAConcreteGroup, idx: number) => {
          const isSelected = selectedGroupIdx === idx;
          const hideNumbers = !isAnswered && !!g.isUnknown;
          const groupFill = harmonizeCpaFillColor(g.color);
          const groupInk = getApcaReadableInk(groupFill);

          // Determine if group count vs unitValue should be masked before solving
          const isRemainderFullGroupsUnknown =
            hideNumbers &&
            pictorial.kind === 'remainder_groups' &&
            g.id === 'cg_full_groups' &&
            pictorial.unknownTarget !== 'dividend';
          const isIntervalCountUnknown =
            hideNumbers &&
            pictorial.kind === 'interval_model' &&
            ((g.id === 'cg_intervals') ||
              (g.id === 'cg_objects' && pictorial.unknownTarget !== 'total_length'));

          const maskCount = isRemainderFullGroupsUnknown || isIntervalCountUnknown;
          const maskUnitValue =
            hideNumbers &&
            !isRemainderFullGroupsUnknown &&
            pictorial.kind !== 'interval_model';

          const visibleIcons = maskCount ? 2 : Math.min(g.count, 10);

          return (
            <button
              key={g.id}
              type="button"
              onClick={() => onSelectGroup(isSelected ? null : idx)}
              className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[color:var(--mm-surface-2)] border-[color:var(--mm-amber-brightFill)] shadow-[0_0_22px_rgba(251,191,36,0.32)]'
                  : 'bg-[color:var(--mm-surface-inset)] border-[color:color-mix(in_oklch,var(--mm-cyan-border)_45%,transparent)] hover:border-[color:var(--mm-cyan-accent)] hover:shadow-[0_0_16px_rgba(34,211,238,0.22)]'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-black text-[color:var(--mm-ink-primary)] truncate">{g.label}</span>
                <span
                  className="px-2 py-0.5 rounded-md text-[11px] font-black tabular-nums border shrink-0"
                  style={{
                    backgroundColor: groupFill,
                    borderColor: 'rgba(255,255,255,0.28)',
                    color: groupInk,
                  }}
                >
                  {hideNumbers ? `? ${concrete.unitLabel}` : `${g.totalValue} ${concrete.unitLabel}`}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 my-1.5 min-h-[28px]">
                {Array.from({ length: visibleIcons }).map((_, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-md bg-white/10 border border-white/15 text-xs font-bold tabular-nums text-[color:var(--mm-ink-primary)]"
                  >
                    {g.icon} {maskUnitValue ? '?' : g.unitValue > 1 ? g.unitValue : ''}
                  </span>
                ))}
                {maskCount ? (
                  <span className="text-[11px] font-black text-[color:var(--mm-amber-text)]">+ ? nhóm</span>
                ) : (
                  g.count > visibleIcons && (
                    <span className="text-[11px] font-black text-[color:var(--mm-cyan-text)]">
                      +{g.count - visibleIcons} nhóm
                    </span>
                  )
                )}
              </div>

              <div className="flex items-center justify-between text-[11px] text-[color:var(--mm-ink-secondary)] font-semibold tabular-nums mt-1 pt-1 border-t border-white/10">
                <span>
                  {maskCount ? '?' : g.count} phần × {maskUnitValue ? '?' : g.unitValue}
                </span>
                {g.note && <span className="text-[color:var(--mm-amber-text)] font-black">{g.note}</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Step 2A: Automated SVG Bar Model Renderer (Part-Whole, Comparison, Before-After)
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
  const maxBarWidth = hasRightTotalBrace ? 340 : 440;
  const rowHeight = 56;
  const topPad = 24;
  const hasDiffBrace = !!pictorial.differenceBracket;
  const diffBraceSpace = hasDiffBrace ? 54 : 18;
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

  return (
    <div className="space-y-3">
      {pictorial.family === 'before_after' && (
        <div className="flex justify-end">
          <div className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-[color:var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-amber-border)_65%,transparent)]">
            <button
              type="button"
              onClick={() => setTimelinePhase('before')}
              className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                timelinePhase === 'before'
                  ? 'bg-[color:var(--mm-amber-brightFill)] text-[#05081D] shadow-[0_0_12px_rgba(251,191,36,0.45)]'
                  : 'text-[color:var(--mm-amber-text)] hover:bg-white/10'
              }`}
            >
              1. Lúc đầu (Before)
            </button>
            <ArrowLeftRight className="w-3.5 h-3.5 text-[color:var(--mm-amber-accent)]" />
            <button
              type="button"
              onClick={() => setTimelinePhase('after')}
              className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                timelinePhase === 'after'
                  ? 'bg-[color:var(--mm-emerald-brightFill)] text-[#05081D] shadow-[0_0_12px_rgba(52,211,153,0.45)]'
                  : 'text-[color:var(--mm-emerald-text)] hover:bg-white/10'
              }`}
            >
              2. Lúc sau (After)
            </button>
          </div>
        </div>
      )}

      {/* Vector SVG Singapore Bar Model Canvas */}
      <div className="rounded-2xl bg-[radial-gradient(ellipse_at_center,_color-mix(in_oklch,var(--mm-cyan-accent)_10%,transparent),_transparent_70%),var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_68%,transparent)] p-3 overflow-x-auto shadow-[inset_0_2px_18px_rgba(0,0,0,0.6),0_0_24px_rgba(34,211,238,0.14)]">
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

          {/* Subtle vertical unit reference grid lines */}
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

            // Calculate proportional widths for equal unit blocks vs positive/negative offset segment
            const baseUnitsTotal = Math.max(0, bar.units * bar.unitValue);
            const rawOffset = bar.offsetValue || 0;
            const posOffset = Math.max(0, rawOffset);
            const negOffset = Math.max(0, -rawOffset);

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
            const labelRightX = barStartX + Math.max(totalBarW, unitsAreaW + (negOffset > 0 ? 4 : 0)) + 8;

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
                {/* Left Row Title Pill */}
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
                      {singleUnitW >= 42 && (
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

                {/* Negative Offset (Removed/Deducted Tail Overlay on right side of base units) */}
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
                      x={Math.max(barStartX + 12, barStartX + unitsAreaW - removedTailW) + Math.min(removedTailW, unitsAreaW - 8) / 2}
                      y={rowY + barHeight / 2 + 4}
                      textAnchor="middle"
                      fill={getApcaReadableInk(MINDMATH_OKLCH_PALETTE.scales.rose.fill.hex)}
                      fontSize="10.5"
                      fontWeight="900"
                    >
                      -{negOffset}
                    </text>
                  </g>
                )}

                {/* Positive Offset / Transferred Segment */}
                {offsetAreaW > 2 && (
                  <g>
                    <rect
                      x={barStartX + unitsAreaW}
                      y={rowY}
                      width={Math.max(18, offsetAreaW)}
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
                      width={Math.max(18, offsetAreaW)}
                      height={barHeight}
                      rx={6}
                      fill="url(#cpa-delta-hatch)"
                    />
                    <text
                      x={barStartX + unitsAreaW + Math.max(18, offsetAreaW) / 2}
                      y={rowY + barHeight / 2 + 4}
                      textAnchor="middle"
                      fill="#05081D"
                      fontSize="11"
                      fontWeight="900"
                    >
                      +{posOffset}
                    </text>
                  </g>
                )}

                {/* Value Callout Pill on Right of Bar */}
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
                y={topPad + activeBars.length * rowHeight + 22}
                textAnchor="middle"
                fill={MINDMATH_OKLCH_PALETTE.scales.amber.text.hex}
                fontSize="12"
                fontWeight="800"
              >
                {isAnswered
                  ? `${diffInfo.label} (${diffInfo.numericValue} ${pictorial.unitName})`
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
      {selectedBarIdx !== null && activeBars[selectedBarIdx] ? (
        <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-amber-400/15 border border-amber-300/50 text-xs font-bold text-amber-100">
          <span>
            Đang kiểm tra thanh:{' '}
            <strong className="text-white">{activeBars[selectedBarIdx].label}</strong> —{' '}
            {activeBars[selectedBarIdx].units} phần ×{' '}
            {activeBars[selectedBarIdx].isUnknown && !isAnswered
              ? '?'
              : activeBars[selectedBarIdx].unitValue}
            {activeBars[selectedBarIdx].offsetValue
              ? activeBars[selectedBarIdx].offsetValue < 0
                ? ` - ${Math.abs(activeBars[selectedBarIdx].offsetValue)}`
                : ` + ${activeBars[selectedBarIdx].offsetValue}`
              : ''}{' '}
            ={' '}
            {activeBars[selectedBarIdx].isUnknown && !isAnswered
              ? '?'
              : `${activeBars[selectedBarIdx].numericValue} ${pictorial.unitName}`}
          </span>
          <button
            type="button"
            onClick={() => onSelectBar(null)}
            className="text-amber-200 underline text-[11px] font-black cursor-pointer"
          >
            Bỏ chọn
          </button>
        </div>
      ) : (
        pictorial.transferSpec && (
          <div className="px-3.5 py-2 rounded-xl bg-purple-500/15 border border-purple-300/40 text-xs font-bold text-purple-100">
            🔄 Quy tắc Bảo toàn Trước – Sau: {pictorial.transferSpec.description}
          </div>
        )
      )}
    </div>
  );
};

/**
 * Step 2B: SVG Euclidean Division with Remainder Diagram
 */
const CPASvgRemainderDiagram: React.FC<{
  pictorial: RemainderPictorialSpec;
  isAnswered: boolean;
}> = ({ pictorial, isAnswered }) => {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const { dividend, divisor, quotient, remainder, itemIcon, groupLabel, unknownTarget } = pictorial;
  const isDividendUnknown = !isAnswered && unknownTarget === 'dividend';
  const isQuotientOrRemUnknown = !isAnswered && unknownTarget !== 'dividend';
  const visibleGroups = isQuotientOrRemUnknown ? 2 : Math.min(quotient, 10);

  // Proportional SVG bar showing Dividend = Quotient * Divisor + Remainder
  const svgWidth = 720;
  const totalBarW = 540;
  const startX = 90;
  const mainW = isQuotientOrRemUnknown
    ? 440
    : dividend > 0
    ? Math.max(60, (quotient * divisor * totalBarW) / dividend)
    : totalBarW;
  const remW = isQuotientOrRemUnknown ? 98 : Math.max(0, totalBarW - mainW);
  const unitW = quotient > 0 ? mainW / quotient : mainW;

  const headerText = isAnswered
    ? `Sơ đồ Phép chia Euclid: ${dividend} = ${divisor} × ${quotient} + ${remainder} (Số dư ${remainder} < Số chia ${divisor})`
    : isDividendUnknown
    ? `Sơ đồ Phép chia Euclid: ? = ${divisor} × ${quotient} + dư (< ${divisor})`
    : `Sơ đồ Phép chia Euclid: ${dividend} chia đều mỗi nhóm ${divisor} (Số dư < ${divisor})`;

  const totalBraceLabel = isAnswered
    ? `Tổng số bị chia = ${dividend} (${quotient} ${groupLabel.toLowerCase()} × ${divisor}${remainder > 0 ? ` + dư ${remainder}` : ''})`
    : isDividendUnknown
    ? `Tổng số bị chia = ? (${quotient} ${groupLabel.toLowerCase()} × ${divisor} + dư ?)`
    : `Tổng số bị chia = ${dividend} (? ${groupLabel.toLowerCase()} × ${divisor} + dư ?)`;

  const qFill = MINDMATH_OKLCH_PALETTE.scales.azure.fill.hex;
  const qSelectedFill = MINDMATH_OKLCH_PALETTE.scales.amber.brightFill.hex;
  const qInk = getApcaReadableInk(qFill);

  return (
    <div className="space-y-3">
      <div className="rounded-2xl bg-[radial-gradient(ellipse_at_center,_color-mix(in_oklch,var(--mm-cyan-accent)_10%,transparent),_transparent_70%),var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_68%,transparent)] p-3 overflow-x-auto shadow-[inset_0_2px_18px_rgba(0,0,0,0.6),0_0_24px_rgba(34,211,238,0.14)]">
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
                width={Math.max(52, remW)}
                height={34}
                rx={5}
                fill={MINDMATH_OKLCH_PALETTE.scales.amber.brightFill.hex}
                stroke={MINDMATH_OKLCH_PALETTE.scales.amber.bright.hex}
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />
              <text
                x={startX + mainW + 2 + Math.max(52, remW) / 2}
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
              startX + mainW + (remainder > 0 || !isAnswered ? Math.max(52, remW) : 0),
              70,
              12,
              'down'
            )}
            fill="none"
            stroke={MINDMATH_OKLCH_PALETTE.scales.cyan.accent.hex}
            strokeWidth="2"
          />
          <text
            x={startX + (mainW + (remainder > 0 || !isAnswered ? Math.max(52, remW) : 0)) / 2}
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
                  ? 'bg-[color:var(--mm-surface-2)] border-[color:var(--mm-amber-brightFill)] shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                  : 'bg-[color:var(--mm-surface-1)] border-[color:color-mix(in_oklch,var(--mm-cyan-border)_52%,transparent)] hover:border-[color:var(--mm-cyan-accent)]'
              }`}
            >
              <div className="text-[11px] font-black text-[color:var(--mm-cyan-text)] mb-1">
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
          <div className="p-2.5 rounded-xl border border-dashed border-[color:var(--mm-amber-border)] bg-[color:color-mix(in_oklch,var(--mm-amber-tint)_45%,transparent)]">
            <div className="text-[11px] font-black text-[color:var(--mm-amber-text)] mb-1">
              {isAnswered
                ? `Phần dư: ${remainder} (nhỏ hơn ${divisor})`
                : `Phần dư: ? (nhỏ hơn ${divisor})`}
            </div>
            <div className="flex flex-wrap gap-1">
              {isAnswered ? (
                Array.from({ length: remainder }).map((_, i) => (
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
      {unitW > 0 && isAnswered && (
        <div className="text-xs font-bold text-[color:var(--mm-emerald-text)]">
          ✓ Kiểm chứng: {quotient} × {divisor} + {remainder} = {dividend}
        </div>
      )}
    </div>
  );
};

/**
 * Step 2C: SVG Interval & Fencepost Topology Diagram
 */
const CPASvgIntervalDiagram: React.FC<{
  pictorial: IntervalPictorialSpec;
  isAnswered: boolean;
}> = ({ pictorial, isAnswered }) => {
  const { subtype, totalLength, stepLength, intervalsCount, objectIcon, unitLabel, unknownTarget } =
    pictorial;

  // Before answering, render 4 conceptual intervals with middle ellipsis so students focus on endpoint topology without counting exact answer
  const displayIntervals = isAnswered ? Math.min(intervalsCount, 8) : 4;
  const svgW = 720;
  const lineStartX = 70;
  const lineEndX = 650;
  const spanW = lineEndX - lineStartX;
  const segW = spanW / Math.max(1, displayIntervals);

  const hasStartObject = subtype !== 'neither_end' && subtype !== 'wood_cuts';
  const hasEndObject = subtype === 'both_ends' || subtype === 'stairs';

  const hideTotal = !isAnswered && unknownTarget === 'total_length';
  const hideStep = !isAnswered && unknownTarget === 'step_length';

  const summaryText = isAnswered
    ? `Tổng độ dài = ${intervalsCount} khoảng × ${stepLength} ${unitLabel} = ${totalLength} ${unitLabel}`
    : hideTotal
    ? `Tổng độ dài = ? ${unitLabel} (? khoảng)`
    : hideStep
    ? `Tổng độ dài = ${totalLength} ${unitLabel} (${intervalsCount} khoảng · mỗi khoảng ? ${unitLabel})`
    : `Tổng độ dài = ${totalLength} ${unitLabel} (mỗi khoảng ${stepLength} ${unitLabel})`;

  return (
    <div className="space-y-3">
      <div className="rounded-2xl bg-[radial-gradient(ellipse_at_center,_color-mix(in_oklch,var(--mm-cyan-accent)_10%,transparent),_transparent_70%),var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_68%,transparent)] p-3 overflow-x-auto shadow-[inset_0_2px_18px_rgba(0,0,0,0.6),0_0_24px_rgba(34,211,238,0.14)]">
        <svg
          viewBox={`0 0 ${svgW} 135`}
          className="w-full h-auto min-w-[520px] select-none"
          role="img"
          aria-label="Sơ đồ khoảng cách và điểm mốc SVG"
        >
          {/* Main Baseline */}
          <line
            x1={lineStartX}
            y1={58}
            x2={lineEndX}
            y2={58}
            stroke={MINDMATH_OKLCH_PALETTE.scales.cyan.accent.hex}
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Interval Curly Braces */}
          {Array.from({ length: displayIntervals }).map((_, idx) => {
            const x1 = lineStartX + idx * segW;
            const x2 = x1 + segW;
            const isEllipsis = !isAnswered && idx === 2;
            return (
              <g key={idx}>
                <path
                  d={buildHorizontalCurlyBracePath(x1 + 3, x2 - 3, 66, 11, 'down')}
                  fill="none"
                  stroke={MINDMATH_OKLCH_PALETTE.scales.emerald.accent.hex}
                  strokeWidth="1.8"
                  strokeDasharray={isEllipsis ? '4 3' : undefined}
                />
                <text
                  x={(x1 + x2) / 2}
                  y={92}
                  textAnchor="middle"
                  fill={MINDMATH_OKLCH_PALETTE.scales.emerald.text.hex}
                  fontSize="11"
                  fontWeight="800"
                >
                  {isEllipsis
                    ? '...'
                    : hideTotal
                    ? '1 khoảng'
                    : hideStep
                    ? `? ${unitLabel}`
                    : `${stepLength} ${unitLabel}`}
                </text>
              </g>
            );
          })}

          {/* Endpoint and Internal Nodes */}
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
                <line x1={nx} y1={46} x2={nx} y2={70} stroke={MINDMATH_OKLCH_PALETTE.inks.secondary.hex} strokeWidth="2.5" />
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
                  <circle cx={nx} cy={30} r={6} fill={MINDMATH_OKLCH_PALETTE.scales.rose.accent.hex} opacity={0.8} />
                )}
              </g>
            );
          })}

          {/* Total Length Summary */}
          <text
            x={svgW / 2}
            y={120}
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
  const safePrefixPattern = /^(Rót ra:|Cắt đi:|Bình B:|Nửa hũ:|Phần chồng =|Lấy ra:|Nửa thùng:)/;
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
 * Step 2D: SVG Measurement Lab Diagram
 */
const CPASvgMeasurementDiagram: React.FC<{
  pictorial: MeasurementPictorialSpec;
  isAnswered: boolean;
}> = ({ pictorial, isAnswered }) => {
  const { chartItems, primaryReading, secondaryReading } = pictorial;

  return (
    <div className="space-y-3">
      {chartItems && chartItems.length > 0 ? (
        <div className="rounded-2xl bg-[radial-gradient(ellipse_at_center,_color-mix(in_oklch,var(--mm-cyan-accent)_10%,transparent),_transparent_70%),var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_68%,transparent)] p-4 space-y-2.5 shadow-[inset_0_2px_18px_rgba(0,0,0,0.6),0_0_24px_rgba(34,211,238,0.14)]">
          {chartItems.map((item, idx) => {
            const maxVal = Math.max(...chartItems.map((c) => c.value), 1);
            const isMasked = !!item.masked && !isAnswered;
            const pct = isMasked ? 28 : Math.max(12, Math.round((item.value / maxVal) * 100));
            const barFill = harmonizeCpaFillColor(item.color);
            return (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-black">
                  <span className="text-[color:var(--mm-ink-primary)]">{item.label}</span>
                  <span className={isMasked ? 'text-[color:var(--mm-amber-text)] tabular-nums' : 'text-[color:var(--mm-cyan-text)] tabular-nums'}>
                    {isMasked ? `? ${item.unit}` : `${item.value} ${item.unit}`}
                  </span>
                </div>
                <div className="h-5 rounded-lg bg-[color:var(--mm-surface-1)] border border-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-lg transition-all duration-300 ${isMasked ? 'opacity-55 border-r-2 border-dashed border-[color:var(--mm-amber-brightFill)]' : ''}`}
                    style={{ width: `${pct}%`, backgroundColor: barFill }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {primaryReading && (
            <div className="p-3.5 rounded-2xl bg-[color:var(--mm-surface-1)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_68%,transparent)]">
              <div className="text-[10px] font-black uppercase tracking-wider text-[color:var(--mm-cyan-text)] mb-1">
                Số đo ban đầu
              </div>
              <div className="text-base font-black text-[color:var(--mm-ink-primary)] tabular-nums">{primaryReading}</div>
            </div>
          )}
          {secondaryReading && (
            <div className="p-3.5 rounded-2xl bg-[color:var(--mm-surface-1)] border border-[color:color-mix(in_oklch,var(--mm-amber-border)_68%,transparent)]">
              <div className="text-[10px] font-black uppercase tracking-wider text-[color:var(--mm-amber-text)] mb-1">
                Đại lượng quy đổi / So sánh
              </div>
              <div className="text-base font-black text-[color:var(--mm-amber-bright)] tabular-nums">
                {getDisplaySecondaryReading(secondaryReading, isAnswered)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Step 3: Abstract LaTeX Mathematical Panel (KaTeX)
 */
const CPAAbstractLatexPanel: React.FC<{
  cpaSpec: SingaporeCPASpec;
  isAnswered: boolean;
}> = ({ cpaSpec, isAnswered }) => {
  const steps = isAnswered
    ? cpaSpec.abstract.fullLatexSteps
    : cpaSpec.abstract.guidedLatexSteps;

  return (
    <div className="rounded-2xl bg-[radial-gradient(ellipse_at_bottom_right,_color-mix(in_oklch,var(--mm-violet-accent)_14%,transparent),_transparent_55%),linear-gradient(145deg,_var(--mm-surface-1),_var(--mm-surface-inset))] border border-[color:color-mix(in_oklch,var(--mm-violet-border)_68%,transparent)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_28px_rgba(3,7,24,0.48)]">
      <div className="space-y-2">
        {steps.map((latexStep, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[color:var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_42%,transparent)] text-sm text-[color:var(--mm-ink-primary)] overflow-x-auto"
          >
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[color:color-mix(in_oklch,var(--mm-cyan-tint)_70%,transparent)] border border-[color:var(--mm-cyan-border)] text-[11px] font-black text-[color:var(--mm-cyan-bright)] shrink-0">
              {idx + 1}
            </span>
            <KatexFormula latex={latexStep} className="font-semibold tracking-wide" />
          </div>
        ))}
      </div>

      {isAnswered && (
        <div className="mt-3 flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-[color:color-mix(in_oklch,var(--mm-emerald-tint)_60%,transparent)] border border-[color:var(--mm-emerald-border)] text-[color:var(--mm-emerald-bright)]">
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
    </div>
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

  return (
    <div className="relative overflow-hidden mm-surface-card backdrop-blur-2xl rounded-3xl border p-5 sm:p-6 shadow-[0_28px_72px_rgba(3,7,24,0.86),0_0_40px_rgba(34,211,238,0.14),inset_0_1px_0_rgba(255,255,255,0.14)]">
      <CosmicHoloCorner />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-6 h-[2.5px] rounded-full bg-gradient-to-r from-[color:var(--mm-cyan-brightFill)] via-[color:var(--mm-violet-accent)] to-[color:var(--mm-amber-brightFill)] shadow-[0_0_20px_rgba(34,211,238,0.75)]"
      />

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
        <div className="rounded-2xl bg-[radial-gradient(ellipse_at_top_right,_color-mix(in_oklch,var(--mm-amber-accent)_10%,transparent),_transparent_55%),linear-gradient(145deg,_var(--mm-surface-1),_var(--mm-surface-inset))] border border-[color:color-mix(in_oklch,var(--mm-amber-border)_65%,transparent)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_28px_rgba(3,7,24,0.48)]">
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
        </div>

        {/* STEP 3: ABSTRACT (KATEX LATEX FORMULAS) */}
        <CPAAbstractLatexPanel cpaSpec={cpaSpec} isAnswered={isAnswered} />
      </div>
    </div>
  );
};

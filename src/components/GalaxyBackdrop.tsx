import React from 'react';

interface StarSpec {
  id: number;
  cx: number;
  cy: number;
  r: number;
  opacity: number;
  tint: string;
  twinkle?: boolean;
  delay?: string;
}

const STARS: StarSpec[] = [
  { id: 1, cx: 42, cy: 68, r: 1.3, opacity: 0.78, tint: '#E0F7FF', twinkle: true, delay: '0s' },
  { id: 2, cx: 118, cy: 34, r: 0.9, opacity: 0.55, tint: '#C7D2FE' },
  { id: 3, cx: 185, cy: 142, r: 1.5, opacity: 0.85, tint: '#A5F3FC', twinkle: true, delay: '1.1s' },
  { id: 4, cx: 264, cy: 52, r: 0.8, opacity: 0.45, tint: '#FFFFFF' },
  { id: 5, cx: 342, cy: 110, r: 1.1, opacity: 0.65, tint: '#DDD6FE' },
  { id: 6, cx: 410, cy: 26, r: 1.4, opacity: 0.72, tint: '#BAE6FD', twinkle: true, delay: '2.2s' },
  { id: 7, cx: 492, cy: 175, r: 0.9, opacity: 0.5, tint: '#FFFFFF' },
  { id: 8, cx: 575, cy: 84, r: 1.6, opacity: 0.88, tint: '#A5F3FC', twinkle: true, delay: '0.6s' },
  { id: 9, cx: 650, cy: 40, r: 0.8, opacity: 0.48, tint: '#E9D5FF' },
  { id: 10, cx: 735, cy: 130, r: 1.2, opacity: 0.68, tint: '#FFFFFF' },
  { id: 11, cx: 815, cy: 58, r: 1.5, opacity: 0.82, tint: '#C4B5FD', twinkle: true, delay: '1.7s' },
  { id: 12, cx: 904, cy: 162, r: 0.9, opacity: 0.52, tint: '#BAE6FD' },
  { id: 13, cx: 985, cy: 48, r: 1.3, opacity: 0.75, tint: '#FFFFFF', twinkle: true, delay: '2.9s' },
  { id: 14, cx: 1070, cy: 118, r: 1.0, opacity: 0.62, tint: '#A5F3FC' },
  { id: 15, cx: 1152, cy: 36, r: 1.4, opacity: 0.8, tint: '#E0E7FF', twinkle: true, delay: '0.9s' },
  { id: 16, cx: 1245, cy: 150, r: 0.9, opacity: 0.5, tint: '#FFFFFF' },
  { id: 17, cx: 1330, cy: 76, r: 1.6, opacity: 0.86, tint: '#DDD6FE', twinkle: true, delay: '1.9s' },
  { id: 18, cx: 1396, cy: 192, r: 1.0, opacity: 0.6, tint: '#BAE6FD' },

  { id: 19, cx: 72, cy: 280, r: 1.0, opacity: 0.58, tint: '#FFFFFF' },
  { id: 20, cx: 160, cy: 365, r: 1.4, opacity: 0.74, tint: '#C4B5FD', twinkle: true, delay: '2.4s' },
  { id: 21, cx: 248, cy: 255, r: 0.8, opacity: 0.44, tint: '#BAE6FD' },
  { id: 22, cx: 335, cy: 412, r: 1.2, opacity: 0.66, tint: '#FFFFFF' },
  { id: 23, cx: 440, cy: 318, r: 1.6, opacity: 0.84, tint: '#A5F3FC', twinkle: true, delay: '0.4s' },
  { id: 24, cx: 530, cy: 455, r: 0.9, opacity: 0.48, tint: '#E9D5FF' },
  { id: 25, cx: 635, cy: 290, r: 1.1, opacity: 0.62, tint: '#FFFFFF' },
  { id: 26, cx: 718, cy: 398, r: 1.5, opacity: 0.8, tint: '#BAE6FD', twinkle: true, delay: '1.5s' },
  { id: 27, cx: 825, cy: 272, r: 0.8, opacity: 0.46, tint: '#FFFFFF' },
  { id: 28, cx: 912, cy: 430, r: 1.3, opacity: 0.72, tint: '#DDD6FE', twinkle: true, delay: '2.7s' },
  { id: 29, cx: 1020, cy: 335, r: 1.0, opacity: 0.6, tint: '#A5F3FC' },
  { id: 30, cx: 1110, cy: 472, r: 1.4, opacity: 0.76, tint: '#FFFFFF', twinkle: true, delay: '0.8s' },
  { id: 31, cx: 1215, cy: 285, r: 0.9, opacity: 0.5, tint: '#E0E7FF' },
  { id: 32, cx: 1308, cy: 405, r: 1.5, opacity: 0.82, tint: '#A5F3FC', twinkle: true, delay: '2.0s' },
  { id: 33, cx: 1388, cy: 318, r: 0.8, opacity: 0.45, tint: '#FFFFFF' },

  { id: 34, cx: 56, cy: 595, r: 1.4, opacity: 0.78, tint: '#A5F3FC', twinkle: true, delay: '1.3s' },
  { id: 35, cx: 148, cy: 710, r: 0.9, opacity: 0.5, tint: '#FFFFFF' },
  { id: 36, cx: 238, cy: 560, r: 1.1, opacity: 0.64, tint: '#DDD6FE' },
  { id: 37, cx: 360, cy: 678, r: 1.5, opacity: 0.82, tint: '#BAE6FD', twinkle: true, delay: '2.5s' },
  { id: 38, cx: 472, cy: 615, r: 0.8, opacity: 0.46, tint: '#FFFFFF' },
  { id: 39, cx: 590, cy: 745, r: 1.3, opacity: 0.74, tint: '#C4B5FD', twinkle: true, delay: '0.7s' },
  { id: 40, cx: 695, cy: 580, r: 1.0, opacity: 0.56, tint: '#A5F3FC' },
  { id: 41, cx: 790, cy: 698, r: 1.5, opacity: 0.84, tint: '#FFFFFF', twinkle: true, delay: '1.8s' },
  { id: 42, cx: 888, cy: 620, r: 0.9, opacity: 0.48, tint: '#E9D5FF' },
  { id: 43, cx: 992, cy: 760, r: 1.2, opacity: 0.68, tint: '#BAE6FD' },
  { id: 44, cx: 1095, cy: 645, r: 1.6, opacity: 0.86, tint: '#A5F3FC', twinkle: true, delay: '0.3s' },
  { id: 45, cx: 1190, cy: 735, r: 0.8, opacity: 0.44, tint: '#FFFFFF' },
  { id: 46, cx: 1292, cy: 590, r: 1.3, opacity: 0.75, tint: '#DDD6FE', twinkle: true, delay: '2.1s' },
  { id: 47, cx: 1378, cy: 692, r: 1.1, opacity: 0.62, tint: '#FFFFFF' },
];

const FLARE_STARS = [
  { x: 185, y: 142, size: 7, color: '#A5F3FC', delay: '0.2s' },
  { x: 575, y: 84, size: 8, color: '#E0F7FF', delay: '1.4s' },
  { x: 815, y: 58, size: 6.5, color: '#DDD6FE', delay: '2.1s' },
  { x: 1330, y: 76, size: 7.5, color: '#C4B5FD', delay: '0.8s' },
  { x: 440, y: 318, size: 7, color: '#A5F3FC', delay: '1.9s' },
  { x: 1095, y: 645, size: 8, color: '#BAE6FD', delay: '1.0s' },
];

export const GalaxyBackdrop: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
    >
      {/* Diagonal Milky Way Galactic Core Ribbon */}
      <div
        className="absolute -inset-x-1/4 top-[-15%] h-[130%] rotate-[-16deg] opacity-65 animate-galaxy-drift"
        style={{
          background:
            'radial-gradient(ellipse 68% 24% at 50% 42%, color-mix(in oklch, var(--mm-violet-fill) 22%, transparent) 0%, color-mix(in oklch, var(--mm-azure-fill) 14%, transparent) 44%, transparent 76%), radial-gradient(ellipse 52% 18% at 42% 45%, color-mix(in oklch, var(--mm-cyan-accent) 14%, transparent) 0%, transparent 70%)',
        }}
      />

      {/* Deep Nebula Corner Blooms */}
      <div
        className="absolute -top-32 -left-24 w-[44rem] h-[44rem] rounded-full blur-3xl opacity-55"
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklch, var(--mm-cyan-fill) 26%, transparent) 0%, transparent 68%)',
        }}
      />
      <div
        className="absolute top-[18%] -right-32 w-[48rem] h-[48rem] rounded-full blur-3xl opacity-55"
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklch, var(--mm-violet-fill) 28%, transparent) 0%, transparent 68%)',
        }}
      />

      {/* Deterministic Starfield & Celestial Orbit Arcs */}
      <svg
        viewBox="0 0 1440 820"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="galaxy-flare-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#67E8F9" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#67E8F9" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Subtle Galactic Orbit Rings */}
        <ellipse
          cx="720"
          cy="410"
          rx="680"
          ry="240"
          transform="rotate(-14 720 410)"
          fill="none"
          stroke="url(#galaxy-orbit-stroke)"
          strokeOpacity="0.14"
          strokeWidth="1"
          strokeDasharray="4 10"
        />
        <ellipse
          cx="720"
          cy="410"
          rx="520"
          ry="175"
          transform="rotate(-14 720 410)"
          fill="none"
          stroke="#A5F3FC"
          strokeOpacity="0.09"
          strokeWidth="1"
        />

        <defs>
          <linearGradient id="galaxy-orbit-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Pinpoint Stars */}
        {STARS.map((star) => (
          <circle
            key={star.id}
            cx={star.cx}
            cy={star.cy}
            r={star.r}
            fill={star.tint}
            opacity={star.opacity}
            className={star.twinkle ? 'animate-cosmic-twinkle' : undefined}
            style={star.delay ? { animationDelay: star.delay } : undefined}
          />
        ))}

        {/* 4-Point Sparkling Anchor Stars */}
        {FLARE_STARS.map((flare, idx) => (
          <g
            key={idx}
            transform={`translate(${flare.x}, ${flare.y})`}
            className="animate-cosmic-twinkle"
            style={{ animationDelay: flare.delay }}
          >
            <circle cx="0" cy="0" r={flare.size * 1.4} fill="url(#galaxy-flare-glow)" />
            <path
              d={`M 0 ${-flare.size} Q 0 0 ${flare.size} 0 Q 0 0 0 ${flare.size} Q 0 0 ${-flare.size} 0 Q 0 0 0 ${-flare.size} Z`}
              fill={flare.color}
              opacity="0.92"
            />
          </g>
        ))}
      </svg>

      {/* Subtle Passing Comet / Shooting Star */}
      <div className="galaxy-shooting-star" />
    </div>
  );
};

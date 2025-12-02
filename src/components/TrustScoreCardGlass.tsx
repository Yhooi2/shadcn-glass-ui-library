// ========================================
// TRUST SCORE CARD GLASS COMPONENT
// Overall trust score display with metrics
// ========================================

import { forwardRef } from "react";
import { Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassCard } from "./GlassCard";
import { RainbowProgressGlass } from "./RainbowProgressGlass";
import { MetricCardGlass, type MetricColor } from "./MetricCardGlass";
import "@/glass-theme.css";

export interface MetricData {
  readonly label: string;
  readonly value: number;
  readonly color: MetricColor;
}

export interface TrustScoreCardGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly score?: number;
  readonly metrics?: readonly MetricData[];
}

export const TrustScoreCardGlass = forwardRef<HTMLDivElement, TrustScoreCardGlassProps>(
  ({ score = 72, metrics = [], className, ...props }, ref) => {
    return (
      <GlassCard
        ref={ref}
        className={cn("p-5", className)}
        intensity="strong"
        glow="cyan"
        hover={false}
        {...props}
      >
        <div className="flex items-center justify-between mb-4">
          <h2
            className="font-semibold flex items-center gap-2 text-lg"
            style={{ color: "var(--text-primary)" }}
          >
            <Target className="w-5 h-5" style={{ color: "var(--text-accent)" }} />
            Overall Trust Score
          </h2>
          <div className="flex items-center gap-2 animate-[score-pulse_2s_ease-in-out_infinite]">
            <span className="text-4xl font-bold bg-linear-to-r from-amber-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              {score}
            </span>
            <span className="text-xl" style={{ color: "var(--text-muted)" }}>
              / 100
            </span>
          </div>
        </div>
        <RainbowProgressGlass value={score} size="lg" showGlow />
        {metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-5">
            {metrics.map((m) => (
              <MetricCardGlass
                key={m.label}
                label={m.label}
                value={m.value}
                color={m.color}
              />
            ))}
          </div>
        )}
      </GlassCard>
    );
  }
);

TrustScoreCardGlass.displayName = "TrustScoreCardGlass";

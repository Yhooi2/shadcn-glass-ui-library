// ========================================
// GLASS CARD COMPONENT
// Container with glassmorphism effects
// ========================================

import { forwardRef, useState, type ReactNode, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";
import { themeStyles } from "@/lib/themeStyles";
import "@/glass-theme.scss";

export type GlowType = "blue" | "violet" | "cyan" | null;
export type IntensityType = "subtle" | "medium" | "strong";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly intensity?: IntensityType;
  readonly glow?: GlowType;
  readonly hover?: boolean;
}

const blurMap: Record<IntensityType, string> = {
  subtle: "8px",
  medium: "12px",
  strong: "16px",
};

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      children,
      className,
      intensity = "medium",
      glow = null,
      hover = true,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const t = themeStyles[theme];
    const [isHovered, setIsHovered] = useState(false);

    const bgMap: Record<IntensityType, string> = {
      subtle: t.glassSubtleBg,
      medium: t.glassMediumBg,
      strong: t.glassStrongBg,
    };

    const borderMap: Record<IntensityType, string> = {
      subtle: t.glassSubtleBorder,
      medium: t.glassMediumBorder,
      strong: t.glassStrongBorder,
    };

    const glowMap: Record<string, string> = {
      blue: t.glowBlue,
      violet: t.glowViolet,
      purple: t.glowViolet,
      cyan: t.glowCyan,
    };

    const cardStyles: CSSProperties = {
      background: isHovered && hover ? t.cardHoverBg : bgMap[intensity],
      borderColor: isHovered && hover ? (t.cardHoverBorder || borderMap[intensity]) : borderMap[intensity],
      backdropFilter: `blur(${blurMap[intensity]})`,
      WebkitBackdropFilter: `blur(${blurMap[intensity]})`,
      boxShadow: glow ? glowMap[glow] : (isHovered && hover ? t.cardHoverGlow : t.glowNeutral),
    };

    return (
      <div
        ref={ref}
        className={cn(
          "border rounded-2xl transition-all duration-300",
          hover && "hover-glow cursor-pointer",
          className
        )}
        style={cardStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

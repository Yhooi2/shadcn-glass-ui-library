// ========================================
// AI CARD GLASS COMPONENT
// AI summary card with feature list
// ========================================

import { forwardRef, useState, type CSSProperties } from "react";
import { Sparkles, Check, Zap, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";
import { themeStyles } from "@/lib/themeStyles";
import { ButtonGlass } from "./ButtonGlass";
import "@/glass-theme.css";

export interface AICardGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly onGenerate?: () => void;
  readonly features?: readonly string[];
  readonly estimatedTime?: string;
}

const defaultFeatures: readonly string[] = [
  "Code quality assessment",
  "Architecture patterns",
  "Best practices",
];

export const AICardGlass = forwardRef<HTMLDivElement, AICardGlassProps>(
  (
    {
      onGenerate,
      features = defaultFeatures,
      estimatedTime = "~30 seconds",
      className,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const t = themeStyles[theme];
    const isGlass = theme === "glass";
    const [isHovered, setIsHovered] = useState(false);

    const cardStyles: CSSProperties = {
      background: t.aiCardBg,
      border: `1px solid ${t.aiCardBorder}`,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      transform: isHovered ? "translateY(-2px)" : "translateY(0)",
      boxShadow: isHovered && isGlass ? "0 12px 40px rgba(168,85,247,0.25)" : "none",
    };

    return (
      <div
        ref={ref}
        className={cn("w-64 p-4 rounded-xl transition-all duration-300", className)}
        style={cardStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <div
          className="flex items-center gap-2 font-semibold text-sm mb-2"
          style={{ color: t.textAccent }}
        >
          <Sparkles className="w-4 h-4" />
          AI Summary
        </div>
        <p className="text-xs mb-2" style={{ color: t.textSecondary }}>
          Get comprehensive analysis:
        </p>
        <ul className="text-xs space-y-1 mb-3">
          {features.map((feature, i) => (
            <li
              key={`feature-${i}`}
              className="flex items-center gap-1"
              style={{ color: t.textMuted }}
            >
              <Check className="w-3 h-3" style={{ color: t.statusGreen }} />
              {feature}
            </li>
          ))}
        </ul>
        <ButtonGlass
          variant="primary"
          size="sm"
          icon={Zap}
          onClick={onGenerate}
          className="w-full"
        >
          Generate Report
        </ButtonGlass>
        <p
          className="text-xs mt-2 text-center flex items-center justify-center gap-1"
          style={{ color: t.textMuted }}
        >
          <Clock className="w-3 h-3" />
          {estimatedTime}
        </p>
      </div>
    );
  }
);

AICardGlass.displayName = "AICardGlass";

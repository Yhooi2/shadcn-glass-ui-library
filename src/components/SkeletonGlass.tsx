// ========================================
// SKELETON GLASS COMPONENT
// Loading skeleton with shimmer effect
// ========================================

import { forwardRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";
import { themeStyles } from "@/lib/themeStyles";
import "@/glass-theme.scss";

export type SkeletonVariant = "text" | "title" | "avatar" | "thumbnail" | "card";

const variantClasses: Record<SkeletonVariant, string> = {
  text: "h-4 rounded",
  title: "h-6 rounded",
  avatar: "w-12 h-12 rounded-full",
  thumbnail: "w-full h-32 rounded-xl",
  card: "w-full h-48 rounded-2xl",
};

export interface SkeletonGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly variant?: SkeletonVariant;
  readonly width?: string | number;
  readonly height?: string | number;
}

export const SkeletonGlass = forwardRef<HTMLDivElement, SkeletonGlassProps>(
  (
    {
      className,
      variant = "text",
      width,
      height,
      style,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const t = themeStyles[theme];

    const skeletonStyles: CSSProperties = {
      width,
      height,
      background: `linear-gradient(90deg, ${t.skeletonBg} 25%, ${t.skeletonShine} 50%, ${t.skeletonBg} 75%)`,
      backgroundSize: "200% 100%",
      animation: "skeleton-loading 1.5s infinite",
      ...style,
    };

    return (
      <div
        ref={ref}
        className={cn(variantClasses[variant], "overflow-hidden", className)}
        style={skeletonStyles}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

SkeletonGlass.displayName = "SkeletonGlass";

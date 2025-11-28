// ========================================
// SKELETON GLASS COMPONENT
// Loading skeleton with shimmer effect
// ========================================

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import "@/glass-theme.scss";

const skeletonVariants = cva(["glass-skeleton", "overflow-hidden"], {
  variants: {
    variant: {
      text: "h-4 rounded",
      title: "h-6 rounded",
      avatar: "w-12 h-12 rounded-full",
      thumbnail: "w-full h-32 rounded-xl",
      card: "w-full h-48 rounded-2xl",
    },
  },
  defaultVariants: {
    variant: "text",
  },
});

export type SkeletonVariant = "text" | "title" | "avatar" | "thumbnail" | "card";

export interface SkeletonGlassProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  readonly width?: string | number;
  readonly height?: string | number;
}

export const SkeletonGlass = forwardRef<HTMLDivElement, SkeletonGlassProps>(
  (
    {
      className,
      variant,
      width,
      height,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant }), className)}
        style={{
          width,
          height,
          ...style,
        }}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

SkeletonGlass.displayName = "SkeletonGlass";

// ========================================
// SKELETONS SECTION COMPONENT
// Showcase section for skeleton loading states
// ========================================

import { GlassCard } from "@/components/GlassCard";
import { SkeletonGlass } from "@/components/SkeletonGlass";

export const SkeletonsSection = () => {
  return (
    <GlassCard
      className="p-6"
      intensity="strong"
      hover={false}
      data-testid="section-skeletons"
    >
      <h2
        className="text-lg font-semibold mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        Skeletons
      </h2>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <SkeletonGlass variant="avatar" />
          <div className="flex-1 space-y-2">
            <SkeletonGlass variant="title" width="60%" />
            <SkeletonGlass variant="text" width="80%" />
          </div>
        </div>
        <SkeletonGlass variant="thumbnail" />
      </div>
    </GlassCard>
  );
};

SkeletonsSection.displayName = "SkeletonsSection";

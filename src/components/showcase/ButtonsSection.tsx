// ========================================
// BUTTONS SECTION COMPONENT
// Showcase section for button variants
// ========================================

import { Sparkles, Settings, Eye, Trash2, Check } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { ButtonGlass } from "@/components/ButtonGlass";

export const ButtonsSection = () => {
  return (
    <GlassCard
      className="p-6"
      intensity="strong"
      hover={false}
      data-testid="section-buttons"
    >
      <h2
        className="text-lg font-semibold mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        Buttons with Glow & Pulse
      </h2>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <ButtonGlass variant="primary" icon={Sparkles}>
            Primary
          </ButtonGlass>
          <ButtonGlass variant="secondary" icon={Settings}>
            Secondary
          </ButtonGlass>
          <ButtonGlass variant="ghost" icon={Eye}>
            Ghost
          </ButtonGlass>
          <ButtonGlass variant="danger" icon={Trash2}>
            Danger
          </ButtonGlass>
          <ButtonGlass variant="success" icon={Check}>
            Success
          </ButtonGlass>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonGlass size="sm">Small</ButtonGlass>
          <ButtonGlass size="md">Medium</ButtonGlass>
          <ButtonGlass size="lg">Large</ButtonGlass>
          <ButtonGlass loading>Loading</ButtonGlass>
          <ButtonGlass disabled>Disabled</ButtonGlass>
        </div>
      </div>
    </GlassCard>
  );
};

ButtonsSection.displayName = "ButtonsSection";

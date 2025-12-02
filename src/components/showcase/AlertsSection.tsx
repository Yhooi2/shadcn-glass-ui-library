// ========================================
// ALERTS SECTION COMPONENT
// Showcase section for alert variants
// ========================================

import { GlassCard } from "@/components/GlassCard";
import { AlertGlass } from "@/components/AlertGlass";

export const AlertsSection = () => {
  return (
    <GlassCard
      className="p-6"
      intensity="strong"
      hover={false}
      data-testid="section-alerts"
    >
      <h2
        className="text-lg font-semibold mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        Alerts
      </h2>
      <div className="space-y-3">
        <AlertGlass type="info" title="Information">
          This is an informational message.
        </AlertGlass>
        <AlertGlass type="success" title="Success!" dismissible>
          Your changes have been saved.
        </AlertGlass>
        <AlertGlass type="warning" title="Warning">
          Please review your settings.
        </AlertGlass>
        <AlertGlass type="error" title="Error" dismissible>
          Something went wrong.
        </AlertGlass>
      </div>
    </GlassCard>
  );
};

AlertsSection.displayName = "AlertsSection";

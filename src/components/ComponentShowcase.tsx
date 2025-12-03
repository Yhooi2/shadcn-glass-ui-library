// ========================================
// COMPONENT SHOWCASE
// Demo page showcasing all glass components
// ========================================

import { useState } from "react";
import {
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { useTheme, THEMES, THEME_CONFIG } from "@/lib/theme-context";
import { AnimatedBackground } from "@/components/AnimatedBackground";

// Blocks
import {
  ButtonsBlock,
  FormElementsBlock,
  ProgressBlock,
  AvatarGalleryBlock,
  BadgesBlock,
  NotificationsBlock,
} from "@/components/blocks";

// Glass Components (only for modal, dropdown, tabs demo)
import { GlassCard } from "./glass/composite/glass-card";
import { ButtonGlass } from "./glass/ui/button-glass";
import { TabsGlass, type TabItem } from "./glass/ui/tabs-glass";
import { ModalGlass } from "./glass/ui/modal-glass";
import { DropdownGlass, type DropdownItem } from "./glass/ui/dropdown-glass";

import "@/glass-theme.css";
export const ComponentShowcase = () => {
  const { theme, cycleTheme } = useTheme();

  // State
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");

  // Get next theme info
  const nextTheme = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
  const NextIcon = THEME_CONFIG[nextTheme].icon;

  // Tab items
  const tabs: TabItem[] = [
    { id: "tab1", label: "Overview" },
    { id: "tab2", label: "Analytics" },
    { id: "tab3", label: "Settings" },
  ];

  // Dropdown items
  const dropdownItems: DropdownItem[] = [
    { label: "Profile", icon: User, onClick: () => console.log("Profile") },
    { label: "Settings", icon: Settings, onClick: () => console.log("Settings") },
    { divider: true },
    { label: "Sign out", icon: LogOut, danger: true, onClick: () => console.log("Sign out") },
  ];

  return (
    <div className="min-h-screen font-sans" data-testid="component-showcase">
      <AnimatedBackground />

      {/* Content */}
      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-5xl lg:max-w-6xl mx-auto space-y-4 md:space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1
                className="text-2xl md:text-3xl font-bold mb-1"
                style={{ color: "var(--text-primary)" }}
              >
                Component Library
              </h1>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Complete UI kit · {THEME_CONFIG[theme].label} theme
              </p>
            </div>
            <ButtonGlass
              variant="secondary"
              icon={NextIcon}
              onClick={cycleTheme}
            >
              {THEME_CONFIG[nextTheme].label}
            </ButtonGlass>
          </div>

          {/* Buttons Section */}
          <ButtonsBlock data-testid="section-buttons" />

          {/* Inputs & Forms Section */}
          <FormElementsBlock data-testid="section-inputs" />

          {/* Progress Section */}
          <ProgressBlock data-testid="section-progress" />

          {/* Tabs & Navigation Section */}
          <GlassCard className="p-4 md:p-6" intensity="strong" hover={false} data-testid="section-tabs">
            <h2
              className="text-base md:text-lg font-semibold mb-3 md:mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Tabs & Navigation
            </h2>
            <div className="space-y-3 md:space-y-4">
              <TabsGlass
                tabs={tabs}
                activeTab={activeTab}
                onChange={setActiveTab}
              />
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <DropdownGlass
                  trigger={
                    <ButtonGlass
                      variant="secondary"
                      icon={ChevronDown}
                      iconPosition="right"
                    >
                      Dropdown
                    </ButtonGlass>
                  }
                  items={dropdownItems}
                />
                <ButtonGlass
                  variant="ghost"
                  onClick={() => setModalOpen(true)}
                >
                  Open Modal
                </ButtonGlass>
              </div>
            </div>
          </GlassCard>

          {/* Badges & Tooltips Section */}
          <BadgesBlock data-testid="section-badges" />

          {/* Avatars Section */}
          <AvatarGalleryBlock data-testid="section-avatars" />

          {/* Notifications & Alerts Section */}
          <NotificationsBlock data-testid="section-notifications" />

          {/* Footer */}
          <div
            className="text-center py-6 md:py-8"
            style={{ color: "var(--footer-text)" }}
          >
            <p className="text-xs md:text-sm">
              Glass UI Components · Built with React + Tailwind CSS
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ModalGlass
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Modal Title"
        size="md"
      >
        <div className="space-y-4">
          <p className="leading-relaxed">
            This is a modal dialog with glassmorphism styling. It features
            beautiful blur effects, gradient backgrounds, and smooth animations.
          </p>
          <p
            className="leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            The modal automatically locks body scroll, closes on Escape key, and
            handles click outside behavior.
          </p>
          <div className="flex gap-3 justify-end pt-4">
            <ButtonGlass variant="text" onClick={() => setModalOpen(false)}>
              Cancel
            </ButtonGlass>
            <ButtonGlass variant="primary" onClick={() => setModalOpen(false)}>
              Confirm
            </ButtonGlass>
          </div>
        </div>
      </ModalGlass>
    </div>
  );
};

ComponentShowcase.displayName = "ComponentShowcase";

export default ComponentShowcase;

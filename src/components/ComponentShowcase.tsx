// ========================================
// COMPONENT SHOWCASE
// Demo page showcasing all glass components
// ========================================

import { useState, type CSSProperties } from "react";
import {
  Sparkles,
  Settings,
  Eye,
  Trash2,
  Check,
  Mail,
  Lock,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { useTheme, THEMES, THEME_CONFIG } from "@/lib/theme-context";

// Glass Components
import { GlassCard } from "./GlassCard";
import { ButtonGlass } from "./ButtonGlass";
import { InputGlass } from "./InputGlass";
import { ProgressGlass } from "./ProgressGlass";
import { BadgeGlass } from "./BadgeGlass";
import { AlertGlass } from "./AlertGlass";
import { ToggleGlass } from "./ToggleGlass";
import { CheckboxGlass } from "./CheckboxGlass";
import { TabsGlass, type TabItem } from "./TabsGlass";
import { TooltipGlass } from "./TooltipGlass";
import { ModalGlass } from "./ModalGlass";
import { DropdownGlass, type DropdownItem } from "./DropdownGlass";
import { AvatarGlass } from "./AvatarGlass";
import { SkeletonGlass } from "./SkeletonGlass";
import { NotificationGlass } from "./NotificationGlass";
import { SliderGlass } from "./SliderGlass";

import "@/glass-theme.css";

// ========================================
// ANIMATED BACKGROUND
// ========================================
const AnimatedBackground = () => {
  const { theme } = useTheme();
  const isGlass = theme === "glass";

  const bgStyles: CSSProperties = {
    background: "linear-gradient(135deg, var(--bg-from), var(--bg-via), var(--bg-to))",
  };

  return (
    <div
      className="fixed inset-0 transition-all duration-500 overflow-hidden"
      style={bgStyles}
    >
      {/* Orb 1 */}
      <div
        className="absolute top-20 -left-20 w-80 h-80 rounded-full blur-3xl animate-orb-float"
        style={{ background: "var(--orb-1)" }}
      />
      {/* Orb 2 */}
      <div
        className="absolute top-1/3 -right-20 w-96 h-96 rounded-full blur-3xl animate-orb-float"
        style={{ background: "var(--orb-2)", animationDelay: "2s" }}
      />
      {/* Orb 3 */}
      <div
        className="absolute bottom-20 left-1/4 w-72 h-72 rounded-full blur-3xl animate-orb-float"
        style={{ background: "var(--orb-3)", animationDelay: "4s" }}
      />
      {/* Orb 4 */}
      <div
        className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full blur-3xl animate-orb-float"
        style={{ background: "var(--orb-4)", animationDelay: "6s" }}
      />
      {/* Orb 5 (glass theme only) */}
      {isGlass && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: "var(--orb-5)" }}
        />
      )}
    </div>
  );
};

// ========================================
// MAIN SHOWCASE
// ========================================
export const ComponentShowcase = () => {
  const { theme, cycleTheme } = useTheme();

  // State
  const [modalOpen, setModalOpen] = useState(false);
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(false);
  const [checkbox1, setCheckbox1] = useState(true);
  const [checkbox2, setCheckbox2] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");
  const [inputValue, setInputValue] = useState("");
  const [sliderValue, setSliderValue] = useState(50);

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
        <div className="max-w-5xl mx-auto space-y-6">
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
          <GlassCard className="p-6" intensity="strong" hover={false} data-testid="section-buttons">
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

          {/* Inputs & Forms Section */}
          <GlassCard className="p-6" intensity="strong" hover={false} data-testid="section-inputs">
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Inputs & Forms
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <InputGlass
                label="Email"
                placeholder="Enter your email"
                icon={Mail}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <InputGlass
                label="Password"
                type="password"
                placeholder="Enter password"
                icon={Lock}
                iconPosition="right"
              />
              <InputGlass
                label="With Error"
                placeholder="Invalid input"
                error="This field is required"
              />
              <InputGlass
                label="With Success"
                placeholder="Valid input"
                success="Looks good!"
              />
              <div>
                <SliderGlass
                  label="Slider"
                  value={sliderValue}
                  onChange={setSliderValue}
                  showValue
                />
              </div>
            </div>
          </GlassCard>

          {/* Toggles & Selection Section */}
          <GlassCard className="p-6" intensity="strong" hover={false} data-testid="section-toggles">
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Toggles & Selection
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3
                  className="text-sm font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Toggles with Glow
                </h3>
                <div className="flex items-center gap-3">
                  <ToggleGlass
                    checked={toggle1}
                    onChange={setToggle1}
                    size="sm"
                  />
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Small
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <ToggleGlass
                    checked={toggle2}
                    onChange={setToggle2}
                    size="md"
                  />
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Medium
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <ToggleGlass checked={true} onChange={() => {}} size="lg" />
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Large
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <h3
                  className="text-sm font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Checkboxes
                </h3>
                <CheckboxGlass
                  checked={checkbox1}
                  onChange={setCheckbox1}
                  label="Accept terms"
                />
                <CheckboxGlass
                  checked={checkbox2}
                  onChange={setCheckbox2}
                  label="Subscribe to newsletter"
                />
              </div>
            </div>
          </GlassCard>

          {/* Progress Section */}
          <GlassCard className="p-6" intensity="strong" hover={false} data-testid="section-progress">
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Progress Bars
            </h2>
            <div className="space-y-4">
              <ProgressGlass value={75} gradient="violet" showLabel />
              <ProgressGlass value={60} gradient="blue" size="lg" />
              <ProgressGlass value={45} gradient="emerald" size="md" />
              <ProgressGlass value={30} gradient="amber" size="sm" />
            </div>
          </GlassCard>

          {/* Tabs & Navigation Section */}
          <GlassCard className="p-6" intensity="strong" hover={false} data-testid="section-tabs">
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Tabs & Navigation
            </h2>
            <div className="space-y-4">
              <TabsGlass
                tabs={tabs}
                activeTab={activeTab}
                onChange={setActiveTab}
              />
              <div className="flex items-center gap-4">
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

          {/* Badges & Status Section */}
          <GlassCard className="p-6" intensity="strong" hover={false} data-testid="section-badges">
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Badges & Status
            </h2>
            <div className="flex flex-wrap gap-3 mb-6">
              <BadgeGlass>Default</BadgeGlass>
              <BadgeGlass variant="success">Success</BadgeGlass>
              <BadgeGlass variant="warning">Warning</BadgeGlass>
              <BadgeGlass variant="danger">Danger</BadgeGlass>
              <BadgeGlass variant="info">Info</BadgeGlass>
              <BadgeGlass variant="violet">Violet</BadgeGlass>
              <BadgeGlass variant="success" dot>
                With Dot
              </BadgeGlass>
            </div>
            <div className="flex items-center gap-6">
              <TooltipGlass content="This is a tooltip" position="top">
                <ButtonGlass variant="ghost" size="sm">
                  Hover (top)
                </ButtonGlass>
              </TooltipGlass>
              <TooltipGlass content="Bottom tooltip" position="bottom">
                <ButtonGlass variant="ghost" size="sm">
                  Hover (bottom)
                </ButtonGlass>
              </TooltipGlass>
            </div>
          </GlassCard>

          {/* Avatars Section */}
          <GlassCard className="p-6" intensity="strong" hover={false} data-testid="section-avatars">
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Avatars
            </h2>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <AvatarGlass name="John Doe" size="sm" status="online" />
                <p
                  className="text-xs mt-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  Small
                </p>
              </div>
              <div className="text-center">
                <AvatarGlass name="Jane Smith" size="md" status="online" />
                <p
                  className="text-xs mt-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  Medium
                </p>
              </div>
              <div className="text-center">
                <AvatarGlass name="Bob Johnson" size="lg" status="busy" />
                <p
                  className="text-xs mt-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  Large
                </p>
              </div>
              <div className="text-center">
                <AvatarGlass name="Alice Brown" size="xl" status="away" />
                <p
                  className="text-xs mt-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  X-Large
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Alerts Section */}
          <GlassCard className="p-6" intensity="strong" hover={false} data-testid="section-alerts">
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

          {/* Notifications Section */}
          <GlassCard className="p-6" intensity="strong" hover={false} data-testid="section-notifications">
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Notifications
            </h2>
            <div className="space-y-3">
              <NotificationGlass
                type="info"
                title="New update available"
                message="Version 2.0 is ready to install"
                onClose={() => console.log("Closed")}
              />
              <NotificationGlass
                type="success"
                title="Payment successful"
                message="Your payment has been processed"
                onClose={() => console.log("Closed")}
              />
            </div>
          </GlassCard>

          {/* Skeletons Section */}
          <GlassCard className="p-6" intensity="strong" hover={false} data-testid="section-skeletons">
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

          {/* Footer */}
          <div
            className="text-center py-8"
            style={{ color: "var(--footer-text)" }}
          >
            <p className="text-sm">
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

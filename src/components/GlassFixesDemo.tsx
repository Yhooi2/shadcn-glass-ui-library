// ========================================
// GLASS FIXES DEMO COMPONENT
// ========================================

import { useState } from "react";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import { NotificationGlass } from "@/components/glass/ui/notification-glass";
import { AvatarGlass } from "@/components/glass/ui/avatar-glass";
import { DropdownGlass, type DropdownItem } from "@/components/glass/ui/dropdown-glass";
import { ModalGlass } from "@/components/glass/ui/modal-glass";
import { ButtonGlass } from "@/components/glass/ui/button-glass";
import "@/glass-theme.css";

export const GlassFixesDemo = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const dropdownItems: readonly DropdownItem[] = [
    { label: "Profile", icon: User, onClick: () => console.log("Profile") },
    {
      label: "Settings",
      icon: Settings,
      onClick: () => console.log("Settings"),
    },
    { divider: true },
    {
      label: "Sign out",
      icon: LogOut,
      danger: true,
      onClick: () => console.log("Sign out"),
    },
  ] as const;

  return (
    <div className="glass-page min-h-screen p-8">
      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="glass-orb glass-orb--purple absolute top-20 -left-20 w-80 h-80 rounded-full blur-3xl" />
        <div className="glass-orb glass-orb--blue absolute bottom-20 -right-20 w-96 h-96 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-white mb-8">
          Glass Theme Fixes
        </h1>

        {/* Notifications Section */}
        <section>
          <h2 className="text-lg font-semibold text-white/80 mb-4">
            Notifications
          </h2>
          <div className="space-y-3">
            <NotificationGlass
              type="info"
              title="New update available"
              message="Version 2.0 is ready to install"
              onClose={() => console.log("Notification closed")}
            />
            <NotificationGlass
              type="success"
              title="Payment successful"
              message="Your payment has been processed"
              onClose={() => console.log("Notification closed")}
            />
            <NotificationGlass
              type="warning"
              title="Storage almost full"
              message="You're using 90% of your available storage"
              onClose={() => console.log("Notification closed")}
            />
            <NotificationGlass
              type="error"
              title="Connection failed"
              message="Unable to connect to the server"
              onClose={() => console.log("Notification closed")}
            />
          </div>
        </section>

        {/* Avatars Section */}
        <section>
          <h2 className="text-lg font-semibold text-white/80 mb-4">
            Avatars with Status
          </h2>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <AvatarGlass name="John Doe" size="sm" status="online" />
              <p className="text-xs text-white/60 mt-2">Small</p>
            </div>
            <div className="text-center">
              <AvatarGlass name="Jane Smith" size="md" status="online" />
              <p className="text-xs text-white/60 mt-2">Medium</p>
            </div>
            <div className="text-center">
              <AvatarGlass name="Bob Johnson" size="lg" status="busy" />
              <p className="text-xs text-white/60 mt-2">Large</p>
            </div>
            <div className="text-center">
              <AvatarGlass name="Alice Brown" size="xl" status="away" />
              <p className="text-xs text-white/60 mt-2">X-Large</p>
            </div>
          </div>
        </section>

        {/* Status Examples */}
        <section>
          <h2 className="text-lg font-semibold text-white/80 mb-4">
            Status Variants
          </h2>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <AvatarGlass name="Online User" size="md" status="online" />
              <p className="text-xs text-white/60 mt-2">Online</p>
            </div>
            <div className="text-center">
              <AvatarGlass name="Busy User" size="md" status="busy" />
              <p className="text-xs text-white/60 mt-2">Busy</p>
            </div>
            <div className="text-center">
              <AvatarGlass name="Away User" size="md" status="away" />
              <p className="text-xs text-white/60 mt-2">Away</p>
            </div>
            <div className="text-center">
              <AvatarGlass name="Offline User" size="md" status="offline" />
              <p className="text-xs text-white/60 mt-2">Offline</p>
            </div>
          </div>
        </section>

        {/* Dropdown Section */}
        <section>
          <h2 className="text-lg font-semibold text-white/80 mb-4">Dropdown</h2>
          <div className="flex gap-4">
            <DropdownGlass
              trigger={
                <ButtonGlass
                  variant="ghost"
                  className="flex items-center gap-2"
                >
                  Left Align
                  <ChevronDown className="w-4 h-4" />
                </ButtonGlass>
              }
              items={dropdownItems}
              align="left"
            />
            <DropdownGlass
              trigger={
                <ButtonGlass
                  variant="ghost"
                  className="flex items-center gap-2"
                >
                  Right Align
                  <ChevronDown className="w-4 h-4" />
                </ButtonGlass>
              }
              items={dropdownItems}
              align="right"
            />
          </div>
        </section>

        {/* Modal Section */}
        <section>
          <h2 className="text-lg font-semibold text-white/80 mb-4">Modal</h2>
          <ButtonGlass variant="primary" onClick={() => setModalOpen(true)}>
            Open Modal
          </ButtonGlass>

          <ModalGlass
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Modal Title"
            size="md"
          >
            <div className="space-y-4">
              <p className="leading-relaxed">
                This is a modal dialog with glassmorphism styling. It features
                beautiful blur effects, gradient backgrounds, and smooth
                animations.
              </p>
              <p className="leading-relaxed text-white/60">
                The modal automatically locks body scroll, closes on Escape key,
                and handles click outside behavior.
              </p>
              <div className="flex gap-3 justify-end pt-4">
                <ButtonGlass variant="text" onClick={() => setModalOpen(false)}>
                  Cancel
                </ButtonGlass>
                <ButtonGlass
                  variant="primary"
                  onClick={() => setModalOpen(false)}
                >
                  Confirm
                </ButtonGlass>
              </div>
            </div>
          </ModalGlass>
        </section>

        {/* Button Variants Section */}
        <section>
          <h2 className="text-lg font-semibold text-white/80 mb-4">
            Button Variants
          </h2>
          <div className="flex gap-4 flex-wrap">
            <ButtonGlass variant="primary">Primary</ButtonGlass>
            <ButtonGlass variant="ghost">Ghost</ButtonGlass>
            <ButtonGlass variant="text">Text</ButtonGlass>
          </div>
          <div className="flex gap-4 flex-wrap mt-4">
            <ButtonGlass variant="primary" size="sm">
              Small
            </ButtonGlass>
            <ButtonGlass variant="primary" size="md">
              Medium
            </ButtonGlass>
            <ButtonGlass variant="primary" size="lg">
              Large
            </ButtonGlass>
          </div>
        </section>
      </div>
    </div>
  );
};

GlassFixesDemo.displayName = "GlassFixesDemo";

export default GlassFixesDemo;

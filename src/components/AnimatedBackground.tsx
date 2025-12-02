// ========================================
// ANIMATED BACKGROUND COMPONENT
// Animated gradient background with floating orbs
// ========================================

import { type CSSProperties } from "react";
import { useTheme } from "@/lib/theme-context";
import "@/glass-theme.css";

export const AnimatedBackground = () => {
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

AnimatedBackground.displayName = "AnimatedBackground";

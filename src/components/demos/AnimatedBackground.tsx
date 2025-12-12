// ========================================
// ANIMATED BACKGROUND COMPONENT
// Animated gradient background with floating orbs
// ========================================

import { type CSSProperties } from 'react';
import { useTheme } from '@/lib/theme-context';
import '@/glass-theme.css';

export const AnimatedBackground = () => {
  const { theme } = useTheme();
  const isGlass = theme === 'glass';

  const bgStyles: CSSProperties = {
    background: 'linear-gradient(135deg, var(--bg-from), var(--bg-via), var(--bg-to))',
  };

  return (
    <div className="fixed inset-0 transition-all duration-500 overflow-hidden" style={bgStyles}>
      {/* Orb 1 - top left purple (600px) */}
      <div
        className="absolute top-20 -left-20 w-[600px] h-[600px] rounded-full animate-orb-float"
        style={{ background: 'var(--orb-1)', filter: 'blur(80px)' }}
      />
      {/* Orb 2 - bottom right blue (700px) */}
      <div
        className="absolute -bottom-20 -right-20 w-[700px] h-[700px] rounded-full animate-orb-float"
        style={{ background: 'var(--orb-2)', filter: 'blur(100px)', animationDelay: '2s' }}
      />
      {/* Orb 3 - center right pink (500px) */}
      <div
        className="absolute top-1/3 -right-10 w-[500px] h-[500px] rounded-full animate-orb-float"
        style={{ background: 'var(--orb-3)', filter: 'blur(70px)', animationDelay: '4s' }}
      />
      {/* Orb 4 - bottom left cyan (450px) */}
      <div
        className="absolute -bottom-10 left-1/4 w-[450px] h-[450px] rounded-full animate-orb-float"
        style={{ background: 'var(--orb-4)', filter: 'blur(60px)', animationDelay: '6s' }}
      />
      {/* Orb 5 - center (glass theme only, 500px) */}
      {isGlass && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: 'var(--orb-5)', filter: 'blur(80px)' }}
        />
      )}
    </div>
  );
};

AnimatedBackground.displayName = 'AnimatedBackground';

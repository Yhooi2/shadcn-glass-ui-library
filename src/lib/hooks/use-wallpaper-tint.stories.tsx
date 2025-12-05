import type { Meta, StoryObj } from "@storybook/react-vite";
import { useWallpaperTint } from "./use-wallpaper-tint";
import { GlassCard } from "@/components/glass/ui/glass-card";
import { ButtonGlass } from "@/components/glass/ui/button-glass";
import { BadgeGlass } from "@/components/glass/ui/badge-glass";
import { ProgressGlass } from "@/components/glass/specialized/progress-glass";
import { ThemeProvider } from "@/lib/theme-context";
import "@/glass-theme.css";

// Demo component that uses the hook
function WallpaperTintDemo({ imageUrl }: { imageUrl: string }) {
  const { tintColor, isLoading, error, refresh } = useWallpaperTint({
    imageUrl,
    sampleSize: 15,
  });

  return (
    <div
      className="min-h-screen p-8 relative"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Apply tint to all components */}
      <div
        style={
          tintColor
            ? ({
                "--wallpaper-tint-color": tintColor,
                "--glass-bg": `rgba(${tintColor}, 0.1)`,
                "--glass-border": `rgba(${tintColor}, 0.2)`,
              } as React.CSSProperties)
            : undefined
        }
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Status Card */}
          <GlassCard className="p-6">
            <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
              Wallpaper Tint Demo
            </h2>
            <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
              This demo extracts the dominant color from the background image and applies it as a
              tint to all glass components.
            </p>

            <div className="space-y-2">
              {isLoading && (
                <BadgeGlass variant="info">Extracting color...</BadgeGlass>
              )}
              {error && <BadgeGlass variant="destructive">{error}</BadgeGlass>}
              {tintColor && !isLoading && (
                <div className="flex items-center gap-3">
                  <BadgeGlass variant="success">Tint extracted</BadgeGlass>
                  <div className="flex items-center gap-2">
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      RGB:
                    </span>
                    <code
                      className="px-2 py-1 rounded text-xs"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.1)",
                        color: "var(--text-primary)",
                      }}
                    >
                      {tintColor}
                    </code>
                    <div
                      className="w-8 h-8 rounded border-2"
                      style={{
                        backgroundColor: `rgb(${tintColor})`,
                        borderColor: "rgba(255,255,255,0.3)",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <ButtonGlass variant="ghost" className="mt-4" onClick={refresh}>
              Refresh Tint
            </ButtonGlass>
          </GlassCard>

          {/* Demo Components */}
          <div className="grid md:grid-cols-2 gap-6">
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                Buttons
              </h3>
              <div className="flex flex-wrap gap-3">
                <ButtonGlass variant="primary">Primary</ButtonGlass>
                <ButtonGlass variant="ghost">Ghost</ButtonGlass>
                <ButtonGlass variant="text">Text</ButtonGlass>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                Badges
              </h3>
              <div className="flex flex-wrap gap-3">
                <BadgeGlass variant="default">Default</BadgeGlass>
                <BadgeGlass variant="success">Success</BadgeGlass>
                <BadgeGlass variant="warning">Warning</BadgeGlass>
                <BadgeGlass variant="destructive">Danger</BadgeGlass>
              </div>
            </GlassCard>
          </div>

          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              Progress Bars
            </h3>
            <div className="space-y-4">
              <ProgressGlass value={75} gradient="violet" showLabel />
              <ProgressGlass value={60} gradient="blue" showLabel />
              <ProgressGlass value={45} gradient="emerald" showLabel />
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Hooks/useWallpaperTint",
  component: WallpaperTintDemo,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="glass">
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    a11y: { test: "todo" },
  },
  argTypes: {
    imageUrl: {
      control: "text",
      description: "Background image URL",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Forest: Story = {
  args: {
    imageUrl:
      "https://images.unsplash.com/photo-1511497584788-876760111969?w=1920&q=80",
  },
};

export const Ocean: Story = {
  args: {
    imageUrl:
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&q=80",
  },
};

export const Sunset: Story = {
  args: {
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
  },
};

export const Mountain: Story = {
  args: {
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
  },
};

export const NightCity: Story = {
  args: {
    imageUrl:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920&q=80",
  },
};

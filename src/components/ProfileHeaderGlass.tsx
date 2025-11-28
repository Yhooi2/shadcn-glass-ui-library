// ========================================
// PROFILE HEADER GLASS COMPONENT
// User profile header with avatar, stats, languages
// ========================================

import { forwardRef } from "react";
import { Calendar, ExternalLink, FolderGit2, Users, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";
import { themeStyles } from "@/lib/themeStyles";
import { GlassCard } from "./GlassCard";
import { ProfileAvatarGlass } from "./ProfileAvatarGlass";
import { LanguageBarGlass, type LanguageData } from "./LanguageBarGlass";
import { AICardGlass } from "./AICardGlass";
import "@/glass-theme.css";

export interface ProfileStats {
  readonly repos?: number;
  readonly followers?: number;
  readonly following?: number;
}

export interface ProfileHeaderGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly name?: string;
  readonly username?: string;
  readonly joinDate?: string;
  readonly stats?: ProfileStats;
  readonly languages?: readonly LanguageData[];
  readonly onAIGenerate?: () => void;
}

export const ProfileHeaderGlass = forwardRef<HTMLDivElement, ProfileHeaderGlassProps>(
  (
    {
      name = "Artem Safronov",
      username = "Yhooi2",
      joinDate = "Jan 2023",
      stats = {},
      languages = [],
      onAIGenerate,
      className,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const t = themeStyles[theme];

    const s = { repos: 11, followers: 1, following: 5, ...stats };

    const getInitials = (fullName: string): string => {
      return fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    };

    return (
      <GlassCard
        ref={ref}
        className={cn("p-5", className)}
        intensity="strong"
        glow="violet"
        hover={false}
        {...props}
      >
        <div className="flex gap-6">
          <div className="flex-1">
            <div className="flex gap-4">
              <ProfileAvatarGlass
                initials={getInitials(name)}
                size="lg"
                status="online"
              />
              <div>
                <h1 className="text-xl font-bold" style={{ color: t.textPrimary }}>
                  {name}
                </h1>
                <div
                  className="flex items-center gap-2 text-sm mt-0.5"
                  style={{ color: t.textSecondary }}
                >
                  <a
                    href="#"
                    className="flex items-center gap-1 hover:underline"
                    style={{ color: t.textAccent }}
                  >
                    @{username} <ExternalLink className="w-3 h-3" />
                  </a>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Joined {joinDate}
                  </span>
                </div>
                <div
                  className="flex items-center gap-4 mt-2 text-sm"
                  style={{ color: t.textSecondary }}
                >
                  <span className="flex items-center gap-1">
                    <FolderGit2
                      className="w-4 h-4"
                      style={{ color: t.textAccent }}
                    />
                    {s.repos} repos
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" style={{ color: t.textAccent }} />
                    {s.followers} followers
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" style={{ color: t.textAccent }} />
                    {s.following} following
                  </span>
                </div>
              </div>
            </div>
            {languages.length > 0 && (
              <div className="mt-4">
                <LanguageBarGlass languages={languages} />
              </div>
            )}
          </div>
          <AICardGlass onGenerate={onAIGenerate} />
        </div>
      </GlassCard>
    );
  }
);

ProfileHeaderGlass.displayName = "ProfileHeaderGlass";

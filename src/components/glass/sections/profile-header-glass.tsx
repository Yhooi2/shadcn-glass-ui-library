// ========================================
// PROFILE HEADER GLASS COMPONENT
// User profile header with avatar, stats, languages
// ========================================

import { forwardRef } from "react";
import { Calendar, ExternalLink, FolderGit2, Users, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassCard } from "../composite/glass-card";
import { ProfileAvatarGlass } from "../specialized/profile-avatar-glass";
import { LanguageBarGlass, type LanguageData } from "../specialized/language-bar-glass";
import { AICardGlass } from "../composite/ai-card-glass";
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
        <div className="flex flex-col md:flex-row gap-3 md:gap-6">
          <div className="flex-1">
            <div className="flex gap-4">
              <ProfileAvatarGlass
                initials={getInitials(name)}
                size="lg"
                status="online"
              />
              <div>
                <h1 className="text-lg md:text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {name}
                </h1>
                <div
                  className="flex items-center gap-2 text-sm mt-0.5"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <a
                    href="#"
                    className="flex items-center gap-1 hover:underline"
                    style={{ color: "var(--text-accent)" }}
                  >
                    @{username} <ExternalLink className="w-3 h-3" />
                  </a>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Joined {joinDate}
                  </span>
                </div>
                <div
                  className="flex items-center gap-3 md:gap-4 mt-2 text-sm flex-wrap"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span className="flex items-center gap-1">
                    <FolderGit2
                      className="w-4 h-4"
                      style={{ color: "var(--text-accent)" }}
                    />
                    {s.repos} repos
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" style={{ color: "var(--text-accent)" }} />
                    {s.followers} followers
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" style={{ color: "var(--text-accent)" }} />
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

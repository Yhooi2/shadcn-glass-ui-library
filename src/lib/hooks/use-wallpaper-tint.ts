// ========================================
// WALLPAPER TINT HOOK
// Extract dominant color from background image
// ========================================

import { useState, useEffect, useCallback } from "react";

export interface WallpaperTintOptions {
  /**
   * The image URL to sample for tint color
   */
  imageUrl?: string;

  /**
   * Debounce delay in milliseconds
   * @default 300
   */
  debounceMs?: number;

  /**
   * Number of sample points to take from the image
   * @default 10
   */
  sampleSize?: number;

  /**
   * Whether to enable the tint extraction
   * @default true
   */
  enabled?: boolean;
}

export interface WallpaperTintResult {
  /**
   * The extracted tint color in RGB format
   * Example: "120, 80, 200"
   */
  tintColor: string | null;

  /**
   * Whether the tint extraction is in progress
   */
  isLoading: boolean;

  /**
   * Error message if extraction failed
   */
  error: string | null;

  /**
   * Re-extract the tint color from the current image
   */
  refresh: () => void;
}

/**
 * Converts RGB values to a luminance value (0-255)
 */
const getLuminance = (r: number, g: number, b: number): number => {
  // Use standard luminance formula
  return 0.299 * r + 0.587 * g + 0.114 * b;
};

/**
 * Extracts the dominant color from an image using canvas sampling
 */
const extractDominantColor = async (
  imageUrl: string,
  sampleSize: number = 10
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Enable CORS

    img.onload = () => {
      try {
        // Create canvas for sampling
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }

        // Set canvas size to image size
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw image to canvas
        ctx.drawImage(img, 0, 0);

        // Sample colors from grid
        const colors: { r: number; g: number; b: number }[] = [];
        const stepX = Math.floor(img.width / sampleSize);
        const stepY = Math.floor(img.height / sampleSize);

        for (let y = stepY / 2; y < img.height; y += stepY) {
          for (let x = stepX / 2; x < img.width; x += stepX) {
            const pixel = ctx.getImageData(x, y, 1, 1).data;
            colors.push({
              r: pixel[0],
              g: pixel[1],
              b: pixel[2],
            });
          }
        }

        // Calculate average color (simple approach)
        const avgColor = colors.reduce(
          (acc, color) => ({
            r: acc.r + color.r,
            g: acc.g + color.g,
            b: acc.b + color.b,
          }),
          { r: 0, g: 0, b: 0 }
        );

        const count = colors.length;
        avgColor.r = Math.round(avgColor.r / count);
        avgColor.g = Math.round(avgColor.g / count);
        avgColor.b = Math.round(avgColor.b / count);

        // Adjust color based on luminance for better glass effect
        const luminance = getLuminance(avgColor.r, avgColor.g, avgColor.b);

        // If too dark, lighten it
        if (luminance < 80) {
          const factor = 1.5;
          avgColor.r = Math.min(255, Math.round(avgColor.r * factor));
          avgColor.g = Math.min(255, Math.round(avgColor.g * factor));
          avgColor.b = Math.min(255, Math.round(avgColor.b * factor));
        }

        // If too bright, darken it slightly
        if (luminance > 200) {
          const factor = 0.7;
          avgColor.r = Math.round(avgColor.r * factor);
          avgColor.g = Math.round(avgColor.g * factor);
          avgColor.b = Math.round(avgColor.b * factor);
        }

        resolve(`${avgColor.r}, ${avgColor.g}, ${avgColor.b}`);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    img.src = imageUrl;
  });
};

/**
 * Hook to extract and use wallpaper tint color
 *
 * @example
 * ```tsx
 * const { tintColor, isLoading } = useWallpaperTint({
 *   imageUrl: '/path/to/background.jpg',
 * });
 *
 * // Use tintColor in CSS variables
 * <div style={{ '--wallpaper-tint': tintColor }}>
 *   <GlassCard />
 * </div>
 * ```
 */
export const useWallpaperTint = (
  options: WallpaperTintOptions = {}
): WallpaperTintResult => {
  const {
    imageUrl,
    debounceMs = 300,
    sampleSize = 10,
    enabled = true,
  } = options;

  const [tintColor, setTintColor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractTint = useCallback(async () => {
    if (!imageUrl || !enabled) {
      setTintColor(null);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const color = await extractDominantColor(imageUrl, sampleSize);
      setTintColor(color);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to extract tint color";
      setError(errorMessage);
      setTintColor(null);
    } finally {
      setIsLoading(false);
    }
  }, [imageUrl, sampleSize, enabled]);

  useEffect(() => {
    if (!enabled) return;

    const timeoutId = setTimeout(() => {
      extractTint();
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [extractTint, debounceMs, enabled]);

  return {
    tintColor,
    isLoading,
    error,
    refresh: extractTint,
  };
};

export function getImageUrl(path?: string | null): string {
  // If no path provided or path is falsy, return fallback
  if (!path || path.trim() === "") {
    return "/images/fallback-default.png";
  }

  // Construct the full URL with the base API URL
  return `https://api.prestigejournalmedia.com/assets/${path}`;
}

/**
 * Alternative function name for better clarity
 */
export const getAssetUrl = getImageUrl;

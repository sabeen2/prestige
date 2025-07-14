import { useAdsContext } from "@/providers/ads-provider";
import React, { useEffect, useState } from "react";
import { getImageUrl } from "./image-compoent";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface PopupAdProps {
  onMainPage?: boolean; // Only show popup on main page
}

const PopupAd: React.FC<PopupAdProps> = ({ onMainPage = false }) => {
  const { ads } = useAdsContext();
  const [isOpen, setIsOpen] = useState(false);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  // Filter ads for popup ads
  const popupAds =
    ads?.filter((ad: any) => ad.size === "PopUpAd" && ad.popUp === true) || [];

  // LocalStorage key for tracking popup display
  const POPUP_STORAGE_KEY = "popup_ad_last_shown";
  const POPUP_COOLDOWN_HOURS = 24;

  // Check if popup should be shown based on last shown timestamp
  const shouldShowPopup = (): boolean => {
    try {
      if (typeof window === "undefined" || !window.localStorage) {
        return false;
      }

      const lastShownStr = localStorage.getItem(POPUP_STORAGE_KEY);
      if (!lastShownStr) {
        return true; // First time visitor
      }

      const lastShown = parseInt(lastShownStr, 10);
      if (isNaN(lastShown)) {
        // Invalid timestamp, treat as first time
        localStorage.removeItem(POPUP_STORAGE_KEY);
        return true;
      }

      const now = Date.now();
      const timeDiffHours = (now - lastShown) / (1000 * 60 * 60);

      return timeDiffHours >= POPUP_COOLDOWN_HOURS;
    } catch (error) {
      console.warn("Error checking popup cooldown:", error);
      return false; // Fail safe - don't show popup if localStorage fails
    }
  };

  // Record that popup was shown
  const recordPopupShown = (): void => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem(POPUP_STORAGE_KEY, Date.now().toString());
      }
    } catch (error) {
      console.warn("Error recording popup shown:", error);
    }
  };

  useEffect(() => {
    // Only show popup on main page and if there are popup ads
    if (onMainPage && popupAds.length > 0 && shouldShowPopup()) {
      // Show popup after a short delay (1 second) when user visits main page
      const timer = setTimeout(() => {
        setIsOpen(true);
        // Record that popup was shown when it actually opens
        recordPopupShown();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [onMainPage, popupAds.length]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDontShowAgain = () => {
    recordPopupShown(); // Record timestamp to prevent showing again for 24 hours
    setIsOpen(false);
  };

  // Debug function to clear popup cooldown (useful for testing)
  const clearPopupCooldown = () => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.removeItem(POPUP_STORAGE_KEY);
      }
    } catch (error) {
      console.warn("Error clearing popup cooldown:", error);
    }
  };

  // Add to window for debugging in development
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      (window as any).clearPopupCooldown = clearPopupCooldown;
    }
  }, []);

  const handleAdClick = (link: string) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  const nextAd = () => {
    setCurrentAdIndex((prev) => (prev + 1) % popupAds.length);
  };

  const prevAd = () => {
    setCurrentAdIndex((prev) => (prev - 1 + popupAds.length) % popupAds.length);
  };

  if (popupAds.length === 0 || !isOpen) {
    return null;
  }

  const currentAd = popupAds[currentAdIndex];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        {/* Modal Content */}
        <div
          className="relative bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white rounded-full p-2 transition-all duration-200 shadow-lg"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          {/* Ad Content */}
          <div className="relative">
            <div
              className="cursor-pointer"
              onClick={() => handleAdClick(currentAd.link || "")}
            >
              <img
                src={getImageUrl(currentAd.image)}
                alt={currentAd.altText || "Advertisement"}
                className="w-full h-auto object-contain "
              />
            </div>

            {/* Navigation arrows for multiple ads */}
            {popupAds.length > 1 && (
              <>
                <button
                  onClick={prevAd}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all duration-200 shadow-lg"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextAd}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all duration-200 shadow-lg"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Ad indicators for multiple ads */}
          {popupAds.length > 1 && (
            <div className="flex justify-center space-x-2 p-4 bg-gray-50">
              {popupAds.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentAdIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-200",
                    index === currentAdIndex ? "bg-primary" : "bg-gray-300"
                  )}
                />
              ))}
            </div>
          )}

          {/* Bottom actions */}
          {/* <div className="flex justify-center gap-2 p-3 bg-gray-50 border-t">
            <button
              onClick={handleDontShowAgain}
              className="text-xs text-gray-500 hover:text-gray-700 transition-colors px-3 py-1 rounded hover:bg-gray-200"
            >
              Don't show again today
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default PopupAd;

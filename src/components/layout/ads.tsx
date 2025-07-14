import { useAdsContext } from "@/providers/ads-provider";
import React from "react";
import { getImageUrl } from "./image-compoent";
import { cn } from "@/lib/utils";

interface AdsProps {
  size: string;
  width?: number;
  height?: number;
  className?: string; // For controlling actual rendered size
}

const Ads = ({
  size,
  width = 1000,
  height = 1000,
  className = "w-auto h-auto ",
}: AdsProps) => {
  const { ads } = useAdsContext();

  // Filter ads based on size and popUp === true, but exclude PopUpAd (handled separately)
  const filteredAds =
    ads?.filter(
      (ad: any) =>
        ad.size === size && ad.popUp === true && ad.size !== "PopUpAd"
    ) || [];

  if (filteredAds.length === 0) {
    return null;
  }

  return (
    <div className="ads-container flex flex-col items-center gap-y-4 ">
      {filteredAds.map((ad: any) => (
        <div key={ad.id} className="ad-item">
          <a
            href={ad.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block cursor-pointer"
          >
            <img
              src={getImageUrl(ad.image)}
              alt={ad.altText}
              className={cn(className, "object-fit")}
            />
          </a>
        </div>
      ))}
    </div>
  );
};

export default Ads;

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { initGetAds } from "@/services/ads/request";

interface AdsData {
  id: string;
  title?: string;
  image: string;
  url?: string;
  link?: string;
  size: string;
  altText?: string;
  popUp?: boolean;
  inserted?: string;
  updated?: string;
  // Add other ads properties as needed
}

interface AdsContextType {
  ads: AdsData[];
  loading: boolean;
  error: string | null;
  refetchAds: () => void;
}

const AdsContext = createContext<AdsContextType | undefined>(undefined);

export const useAdsContext = () => {
  const context = useContext(AdsContext);
  if (context === undefined) {
    throw new Error("useAds must be used within an AdsProvider");
  }
  return context;
};

interface AdsProviderProps {
  children: React.ReactNode;
}

export const AdsProvider: React.FC<AdsProviderProps> = ({ children }) => {
  const [ads, setAds] = useState<AdsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAds = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await initGetAds();

      // Assuming the response has a data property with the ads array
      if (response && response.data) {
        setAds(response.data);
      } else {
        setAds([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch ads");
      setAds([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const refetchAds = () => {
    fetchAds();
  };

  const value: AdsContextType = {
    ads,
    loading,
    error,
    refetchAds,
  };

  return <AdsContext.Provider value={value}>{children}</AdsContext.Provider>;
};

export default AdsProvider;

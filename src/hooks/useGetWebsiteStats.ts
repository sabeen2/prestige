import { useEffect, useState } from "react";
import { initGetWebsiteStats } from "@/services/web-info/request";

interface WebsiteStats {
  totalArticles?: number;
  totalCategories?: number;
  totalViews?: number;
  totalUsers?: number;
  // Add more properties based on your API response structure
  [key: string]: any;
}

export const useGetWebsiteStats = () => {
  const [websiteStats, setWebsiteStats] = useState<WebsiteStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWebsiteStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await initGetWebsiteStats();

      if (response && response.success && response.data) {
        setWebsiteStats(response.data);
      } else {
        setError("Failed to fetch website stats");
      }
    } catch (err) {
      console.error("Error fetching website stats:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchWebsiteStats();
  };

  useEffect(() => {
    fetchWebsiteStats();
  }, []);

  return {
    websiteStats,
    loading,
    error,
    refetch,
  };
};

import { useEffect, useState } from "react";
import { initGetCategories } from "@/services/categories/request";

interface Category {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  image: string | null;
  featured: boolean;
  disabled: boolean;
  order: number;
  inserted: string;
  updated: string;
}

export const useGetCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCategories, setTotalCategories] = useState(0);

  console.log("categories", categories);
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await initGetCategories();

      if (response && response.success && response.data) {
        setCategories(response.data.data);
        setTotalCategories(response.data.total || response.data.data.length);
      } else {
        setError("Failed to fetch categories");
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    totalCategories,
    refetch,
  };
};

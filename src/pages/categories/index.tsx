import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SectionWrapper from "@/components/layout/section-wrapper";
import React from "react";
import Ads from "@/components/layout/ads";
import StackedCard from "../index/components/stacked-card";
import MoreNewsSections from "../index/components/more-news-sections";

const Categories = () => {
  const params = useParams();
  const [categorySlug, setCategorySlug] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params?.categorySlug) {
      try {
        const slug = Array.isArray(params.categorySlug)
          ? params.categorySlug[0]
          : params.categorySlug;
        setCategorySlug(decodeURIComponent(slug));
      } catch (err) {
        setError("Invalid category slug");
        console.error("Error decoding category slug:", err);
      } finally {
        setLoading(false);
      }
    } else {
      setError("Category slug not found");
      setLoading(false);
    }
  }, [params]);

  if (loading) {
    return (
      <SectionWrapper className="space-y-8">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </SectionWrapper>
    );
  }

  if (error) {
    return (
      <SectionWrapper className="space-y-8">
        <div className="text-center py-8 text-red-500">{error}</div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper className="space-y-8">
      <h1 className="text-4xl font-bold text-center text-primary">
        श्रेणी: {categorySlug.toUpperCase()}
      </h1>
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <StackedCard categorySlug={categorySlug} />
        <Ads
          className="h-auto max-h-[50vh] md:w-[20vw] w-full"
          size="SidebarAd"
        />
      </div>
      <div className="mb-8">
        <Ads className="h-auto w-[900px] " size="FooterAd" />
      </div>

      <MoreNewsSections />
    </SectionWrapper>
  );
};

export default Categories;

"use client";

import React, { useState } from "react";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShareDialog } from "@/components/share-dialog";

interface Article {
  id: string;
  slug: string;
  title: string;
  categoryId: string;
  author: string;
  post_date: string;
  schedule_date: string;
  image1: string | null;
  image2: string | null;
  image3: string | null;
  subtext1: string;
  subtext2: string;
  subtext3: string;
  description: string;
  featured: boolean;
  views: number;
  inserted: string;
  updated: string;
  category: {
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
  };
  source: Array<{
    id: string;
    source: string;
    link: string;
    articleId: string;
    inserted: string;
    updated: string;
  }>;
}

interface ShareButtonProps {
  article: Article;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  iconOnly?: boolean;
}

export function ShareButton({
  article,
  variant = "ghost",
  size = "sm",
  className = "",
  iconOnly = false,
}: ShareButtonProps) {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsShareDialogOpen(true);
  };

  const shareUrl = `${
    typeof window !== "undefined" ? window.location.origin : ""
  }/${article.slug}`;

  if (iconOnly) {
    return (
      <>
        <button
          onClick={handleShare}
          className={`
            inline-flex items-center justify-center
            h-7 w-7 rounded-md
            text-gray-500 hover:text-gray-700 hover:bg-gray-50
            transition-colors duration-150
            focus:outline-none focus:ring-1 focus:ring-gray-300
            ${className}
          `}
          title="शेयर गर्नुहोस्"
        >
          <Share2 className="w-4 h-4" />
        </button>
        <div onClick={(e) => e.stopPropagation()}>
          <ShareDialog
            isOpen={isShareDialogOpen}
            onClose={() => setIsShareDialogOpen(false)}
            url={shareUrl}
            title={article.title}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleShare}
        className={`
          inline-flex items-center gap-1.5 
          text-gray-600 hover:text-gray-800
          font-normal text-sm
          h-7 px-2.5 py-1
          border-gray-200 hover:border-gray-300
          hover:bg-gray-50
          transition-colors duration-150
          ${className}
        `}
      >
        <Share2 className="w-4 h-4" />
        <span>शेयर</span>
      </Button>
      <div onClick={(e) => e.stopPropagation()}>
        <ShareDialog
          isOpen={isShareDialogOpen}
          onClose={() => setIsShareDialogOpen(false)}
          url={shareUrl}
          title={article.title}
        />
      </div>
    </>
  );
}

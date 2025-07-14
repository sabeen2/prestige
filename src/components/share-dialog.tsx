"use client";

import React, { useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from "react-share";
import { Copy, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
  description?: string;
}

export function ShareDialog({
  isOpen,
  onClose,
  url,
  title,
  description,
}: ShareDialogProps) {
  const [copied, setCopied] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent
          className="sm:max-w-md p-6"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <DialogHeader className="pb-4">
            <DialogTitle className="text-lg font-semibold">
              शेयर गर्नुहोस्
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Social Share Buttons */}
            <div className="flex gap-3">
              <FacebookShareButton
                url={url}
                className="flex-1"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#1877F2] text-white hover:bg-[#166FE5] transition-colors w-full">
                  <FacebookIcon size={20} round />
                  <span className="text-sm font-medium">Facebook</span>
                </div>
              </FacebookShareButton>

              <TwitterShareButton
                url={url}
                title={title}
                className="flex-1"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#1DA1F2] text-white hover:bg-[#1A91DA] transition-colors w-full">
                  <TwitterIcon size={20} round />
                  <span className="text-sm font-medium">Twitter</span>
                </div>
              </TwitterShareButton>
            </div>

            {/* URL Copy Section */}
            <div className="bg-gray-50 rounded-lg p-3 border">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={url}
                  readOnly
                  className="flex-1 bg-transparent text-sm text-gray-700 outline-none select-all"
                />
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                  className="shrink-0 h-8 px-3"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      <span className="text-xs">कपी भयो</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1" />
                      <span className="text-xs">कपी</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { cn } from "@/lib/utils";
import React from "react";

const SectionWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <main className={cn("max-w-7xl sm:mx-auto sm:px-4 py-8", className)}>
      {children}
    </main>
  );
};

export default SectionWrapper;

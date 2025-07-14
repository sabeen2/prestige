"use client";
import { useState, useEffect } from "react";

// Simple hook to get current Nepali date using nepali-date library
const useNepaliDate = () => {
  const [nepaliDate, setNepaliDate] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const updateNepaliDate = () => {
      try {
        // Use require to import the library and suppress TypeScript errors
        // @ts-ignore
        const NepaliDate = require("nepali-date");

        // Create a new NepaliDate instance from current date
        const currentDate = new Date();
        const nepaliDateInstance = new NepaliDate(currentDate);

        // Format the date in Nepali: "आइतबार, १ बैसाख २०७५"
        const formattedDate = nepaliDateInstance.format("dddd, d mmmm yyyy");

        setNepaliDate(formattedDate);
        setError(null);
      } catch (err) {
        console.error("Error formatting Nepali date:", err);
        setError("मिति फर्म्याट गर्न सकिएन");
        // Fallback to a default date
        setNepaliDate("बुधबार, २० भाद्र २०८१");
      } finally {
        setLoading(false);
      }
    };

    updateNepaliDate();

    // Update every minute to keep the date current
    const interval = setInterval(updateNepaliDate, 60000);

    return () => clearInterval(interval);
  }, []);

  return { nepaliDate, loading, error };
};

export default useNepaliDate;

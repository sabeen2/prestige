export const formatPermission = (permission: string): string => {
  return permission
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const formatDateTime = (
  isoDate: string,
  locale = "en-US",
  options = {}
): string => {
  const date = new Date(isoDate);

  const defaultOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  } as const;

  return date.toLocaleString(locale, { ...defaultOptions, ...options });
};

export const formatNepaliDateTime = (isoDate: string): string => {
  try {
    // @ts-ignore
    const NepaliDate = require("nepali-date");

    const date = new Date(isoDate);
    const nepaliDateInstance = new NepaliDate(date);

    // Format: "२०८१ भाद्र २०, बुधबार, २:३० PM"
    const formattedDate = nepaliDateInstance.format("yyyy mmmm d, dddd");

    // Get time in 12-hour format
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    } as const;
    const time = date.toLocaleTimeString("en-US", timeOptions);

    // Convert time to Nepali numerals and AM/PM to Nepali
    const convertToNepaliTime = (timeString: string): string => {
      const englishToNepali = {
        "0": "०",
        "1": "१",
        "2": "२",
        "3": "३",
        "4": "४",
        "5": "५",
        "6": "६",
        "7": "७",
        "8": "८",
        "9": "९",
      };

      let nepaliTime = timeString;

      // Convert numbers to Nepali
      Object.entries(englishToNepali).forEach(([eng, nep]) => {
        nepaliTime = nepaliTime.replace(new RegExp(eng, "g"), nep);
      });

      // Convert AM/PM to Nepali
      nepaliTime = nepaliTime.replace(/AM/g, "बिहान");
      nepaliTime = nepaliTime.replace(/PM/g, "साँझ");

      return nepaliTime;
    };

    const nepaliTime = convertToNepaliTime(time);

    return `${formattedDate}, ${nepaliTime}`;
  } catch (err) {
    console.error("Error formatting Nepali date:", err);
    // Fallback to English format
    return new Date(isoDate).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
};

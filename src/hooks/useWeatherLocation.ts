import { useEffect, useState } from "react";

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
}

interface Location {
  lat: number;
  lon: number;
}

export const useWeatherLocation = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [location, setLocation] = useState<Location | null>(null);

  // Get user's location using multiple methods
  const getUserLocation = async (): Promise<Location> => {
    // Method 1: Try browser geolocation first (most accurate)
    // if (navigator.geolocation) {
    //   try {
    //     const position = await new Promise<GeolocationPosition>(
    //       (resolve, reject) => {
    //         navigator.geolocation.getCurrentPosition(resolve, reject, {
    //           timeout: 5000,
    //           enableHighAccuracy: true,
    //         });
    //       }
    //     );
    //     return {
    //       lat: position.coords.latitude,
    //       lon: position.coords.longitude,
    //     };
    //   } catch (error) {
    //   }
    // }

    // Method 2: Fallback to IP-based geolocation (free)
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      if (data.latitude && data.longitude) {
        return {
          lat: data.latitude,
          lon: data.longitude,
        };
      }
    } catch (error) {}

    // Method 3: Final fallback - Kathmandu coordinates (currently using this only)
    return {
      lat: 27.7103,
      lon: 85.3222,
    };
  };

  const getWeather = async (coords?: Location) => {
    try {
      setWeatherLoading(true);

      // Use provided coordinates or get user location
      const weatherCoords = coords || (await getUserLocation());
      setLocation(weatherCoords);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${weatherCoords.lat}&lon=${weatherCoords.lon}&appid=bb715754a7bd70d9d2e851ce3be42985&units=metric`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Weather fetch error:", error);
    } finally {
      setWeatherLoading(false);
    }
  };

  // Helper function to get weather description in Nepali
  const getWeatherDescriptionNepali = (
    weatherMain: string,
    description: string
  ) => {
    const weatherMap: { [key: string]: string } = {
      Clear: "सफा",
      Clouds: "बादल",
      Rain: "वर्षा",
      Drizzle: "सानो वर्षा",
      Thunderstorm: "आँधी",
      Snow: "हिउँ",
      Mist: "कुहिरो",
      Fog: "कुहिरो",
      Haze: "धुवाँ",
    };
    return weatherMap[weatherMain] || "बादल";
  };

  useEffect(() => {
    getWeather();
  }, []);

  return {
    weather,
    weatherLoading,
    location,
    getWeather,
    getWeatherDescriptionNepali,
  };
};

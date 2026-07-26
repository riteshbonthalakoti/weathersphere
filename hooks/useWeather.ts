"use client";

import { useState, useEffect } from "react";
import { getWeatherByCity } from "@/services/weather";
import { WeatherData } from "@/types/weather";

export function useWeather(city: string | undefined) {
  const [data, setData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) {
      setData(null);
      setError(null);
      return;
    }

    let isMounted = true;

    async function fetchWeather() {
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await getWeatherByCity(city as string);
        if (isMounted) {
          setData(result);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "Failed to fetch weather data.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchWeather();

    return () => {
      isMounted = false;
    };
  }, [city]);

  return { data, isLoading, error };
}

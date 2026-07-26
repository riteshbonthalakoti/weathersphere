"use server";

import { OpenWeatherResponse, WeatherData } from "@/types/weather";

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export type WeatherResponse = {
  data?: WeatherData;
  error?: string;
};

export async function getWeatherByCity(city: string): Promise<WeatherResponse> {
  if (!API_KEY) {
    return { error: "API key is not configured." };
  }

  try {
    const response = await fetch(
      `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
      { next: { revalidate: 1800 } }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return { error: `City "${city}" not found.` };
      }
      if (response.status === 401) {
        return { error: "Invalid API key. Please check your OpenWeather API key." };
      }
      return { error: `Failed to fetch weather data. Status: ${response.status}` };
    }

    const data: OpenWeatherResponse = await response.json();

    return {
      data: {
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0]?.description || "Unknown",
        icon: data.weather[0]?.icon || "01d",
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        pressure: data.main.pressure,
        visibility: data.visibility,
        cloudPercentage: data.clouds.all,
        rainStatus: data.rain?.["1h"] || data.rain?.["3h"] || null,
        conditionCode: data.weather[0]?.id || 800,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
      }
    };
  } catch (error: any) {
    return { error: error.message || "Network failure. Please check your connection." };
  }
}

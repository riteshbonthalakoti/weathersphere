import { OpenWeatherResponse, WeatherData } from "@/types/weather";

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export class WeatherError extends Error {
  constructor(public message: string, public status?: number) {
    super(message);
    this.name = "WeatherError";
  }
}

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  if (!API_KEY) {
    throw new WeatherError("API key is not configured.", 500);
  }

  try {
    const response = await fetch(
      `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
      {
        // Cache for 10 minutes (600 seconds) to avoid spamming the API
        next: { revalidate: 600 },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new WeatherError(`City "${city}" not found.`, 404);
      }
      throw new WeatherError("Failed to fetch weather data.", response.status);
    }

    const data: OpenWeatherResponse = await response.json();

    return {
      city: data.name,
      temperature: data.main.temp,
      icon: data.weather[0]?.icon || "01d",
      conditionCode: data.weather[0]?.id || 800,
      description: data.weather[0]?.description || "clear sky",
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      pressure: data.main.pressure,
      visibility: data.visibility,
      cloudPercentage: data.clouds.all,
      rainStatus: data.rain?.["1h"] || data.rain?.["3h"] || null,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
    };
  } catch (error) {
    if (error instanceof WeatherError) {
      throw error;
    }
    // Handle network errors (e.g., fetch failed)
    throw new WeatherError("Network failure. Please check your connection.", 500);
  }
}

import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Sun,
  Moon,
  type LucideIcon,
} from "lucide-react";

export function getWeatherInterpretation(conditionCode: number, isDay: boolean = true): {
  type: string;
  isRaining: boolean;
  Icon: LucideIcon;
} {
  // Thunderstorm
  if (conditionCode >= 200 && conditionCode < 300) {
    return { type: "Thunderstorm", isRaining: true, Icon: CloudLightning };
  }
  // Drizzle
  if (conditionCode >= 300 && conditionCode < 400) {
    return { type: "Rain", isRaining: true, Icon: CloudDrizzle };
  }
  // Rain
  if (conditionCode >= 500 && conditionCode < 600) {
    return { type: "Rain", isRaining: true, Icon: CloudRain };
  }
  // Snow
  if (conditionCode >= 600 && conditionCode < 700) {
    return { type: "Snow", isRaining: false, Icon: CloudSnow };
  }
  // Atmosphere
  if (conditionCode >= 700 && conditionCode < 800) {
    if (conditionCode === 741) return { type: "Fog", isRaining: false, Icon: CloudFog };
    return { type: "Mist", isRaining: false, Icon: CloudFog };
  }
  // Clear
  if (conditionCode === 800) {
    return { type: "Clear", isRaining: false, Icon: isDay ? Sun : Moon };
  }
  // Clouds
  if (conditionCode > 800 && conditionCode < 900) {
    return { type: "Clouds", isRaining: false, Icon: Cloud };
  }

  // Default fallback
  return { type: "Unknown", isRaining: false, Icon: Sun };
}

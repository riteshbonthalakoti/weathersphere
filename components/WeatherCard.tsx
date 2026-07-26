import { WeatherData } from "@/types/weather";
import { getWeatherInterpretation } from "@/lib/weatherUtils";
import Image from "next/image";
import WeatherDetails from "./WeatherDetails";

interface WeatherCardProps {
  data: WeatherData;
  currentTime: number;
}

export default function WeatherCard({ data, currentTime }: WeatherCardProps) {
  const isDay = data.sunrise * 1000 < currentTime && data.sunset * 1000 > currentTime;
  const interp = getWeatherInterpretation(data.conditionCode, isDay);
  const WeatherIcon = interp.Icon;

  return (
    <article 
      className="w-full max-w-4xl mx-auto flex flex-col gap-6"
      aria-label={`Current weather in ${data.city}`}
    >
      
      {/* Main Card */}
      <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] flex flex-col md:flex-row items-center justify-between transition-all duration-500 hover:bg-white/15 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.5)] group">
        <div className="flex flex-col items-center md:items-start text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 text-white/95 group-hover:scale-[1.02] transition-transform duration-300 transform-gpu">{data.city}</h2>
          <p className="text-xl text-white/80 capitalize font-medium">{data.description}</p>
          <div className="flex items-center gap-3 mt-5 text-blue-100 bg-blue-500/30 px-5 py-2.5 rounded-full shadow-inner border border-blue-400/20">
            <WeatherIcon className="w-5 h-5" aria-hidden="true" />
            <span className="font-semibold">{interp.type}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span className="font-semibold">{interp.isRaining ? "Raining" : "No Rain"}</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative w-32 h-32 md:w-40 md:h-40 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 transform-gpu">
            <Image 
              src={`https://openweathermap.org/img/wn/${data.icon}@4x.png`} 
              alt={data.description}
              fill
              sizes="(max-width: 768px) 128px, 160px"
              className="drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] object-contain"
              priority
            />
          </div>
          <div className="text-7xl md:text-8xl font-light tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70 drop-shadow-sm">
            {Math.round(data.temperature)}°
          </div>
        </div>
      </div>

      <WeatherDetails data={data} />

    </article>
  );
}

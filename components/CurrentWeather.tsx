import { WeatherData } from "@/types/weather";
import { getWeatherInterpretation } from "@/lib/weatherUtils";
import Image from "next/image";
import { 
  Wind, 
  Droplets, 
  Thermometer, 
  Eye, 
  CloudRain, 
  Gauge, 
  Sunrise, 
  Sunset 
} from "lucide-react";

interface CurrentWeatherProps {
  data: WeatherData;
}

export default function CurrentWeather({ data }: CurrentWeatherProps) {
  const isDay = data.sunrise * 1000 < Date.now() && data.sunset * 1000 > Date.now();
  const interp = getWeatherInterpretation(data.conditionCode, isDay);
  const WeatherIcon = interp.Icon;

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

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

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5" aria-label="Weather statistics">
        <StatCard icon={<Thermometer />} label="Feels Like" value={`${Math.round(data.feelsLike)}°`} />
        <StatCard icon={<Droplets />} label="Humidity" value={`${data.humidity}%`} />
        <StatCard icon={<Wind />} label="Wind Speed" value={`${data.windSpeed} m/s`} />
        <StatCard icon={<Gauge />} label="Pressure" value={`${data.pressure} hPa`} />
        <StatCard icon={<Eye />} label="Visibility" value={`${data.visibility / 1000} km`} />
        <StatCard icon={<CloudRain />} label="Cloudiness" value={`${data.cloudPercentage}%`} />
        <StatCard icon={<Sunrise />} label="Sunrise" value={formatTime(data.sunrise)} />
        <StatCard icon={<Sunset />} label="Sunset" value={formatTime(data.sunset)} />
      </div>

    </article>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) {
  return (
    <div 
      className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:bg-white/15 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl hover:border-white/30 group"
      aria-label={`${label}: ${value}`}
    >
      <div className="text-blue-300 mb-1 group-hover:text-blue-200 group-hover:scale-110 transition-all duration-300">
        {icon}
      </div>
      <p className="text-xs md:text-sm text-white/70 uppercase tracking-wider font-semibold">{label}</p>
      <p className="text-xl md:text-2xl font-bold text-white/95">{value}</p>
    </div>
  );
}

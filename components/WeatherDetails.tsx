import { WeatherData } from "@/types/weather";
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

interface WeatherDetailsProps {
  data: WeatherData;
}

export default function WeatherDetails({ data }: WeatherDetailsProps) {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
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

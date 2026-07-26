import { Suspense } from "react";
import SearchBox from "@/components/SearchBox";
import CurrentWeather from "@/components/CurrentWeather";
import CurrentWeatherSkeleton from "@/components/CurrentWeatherSkeleton";
import { getWeatherByCity, WeatherError } from "@/services/weather";
import { CloudSun } from "lucide-react";

async function WeatherDisplay({ city }: { city: string }) {
  try {
    const weatherData = await getWeatherByCity(city);
    return <CurrentWeather data={weatherData} />;
  } catch (error) {
    const errorMsg = error instanceof WeatherError ? error.message : "An unexpected error occurred.";
    return (
      <div className="bg-red-500/20 text-red-100 border border-red-500/30 px-6 py-4 rounded-xl flex items-center gap-3 animate-in zoom-in duration-500 backdrop-blur-md shadow-xl" role="alert">
        <span className="font-semibold">Error:</span> {errorMsg}
      </div>
    );
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const city = typeof params.city === 'string' ? params.city : undefined;

  return (
    <main className="min-h-screen px-4 py-12 md:py-24 flex flex-col items-center max-w-7xl mx-auto">
      
      <header className="w-full max-w-2xl text-center mb-10 md:mb-14">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-200 drop-shadow-lg">
          WeatherSphere
        </h1>
        <p className="text-lg md:text-xl text-blue-100/80 font-medium tracking-wide">
          Discover the weather anywhere in the world, beautifully.
        </p>
      </header>

      <section className="w-full" aria-label="Search">
        <SearchBox />
      </section>

      <section className="w-full mt-8 flex flex-col items-center min-h-[400px]" aria-live="polite">
        {city ? (
          <Suspense key={city} fallback={<CurrentWeatherSkeleton />}>
            <WeatherDisplay city={city} />
          </Suspense>
        ) : (
          <div className="text-center mt-16 text-white/60 flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
              <CloudSun className="w-32 h-32 opacity-40 drop-shadow-xl relative" aria-hidden="true" />
            </div>
            <p className="text-2xl font-medium tracking-wide">Enter a city to see the weather</p>
          </div>
        )}
      </section>
      
    </main>
  );
}

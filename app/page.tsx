"use client";

import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { useWeather } from "@/hooks/useWeather";
import { CloudSun } from "lucide-react";
import { Suspense } from "react";

function WeatherContent() {
  const searchParams = useSearchParams();
  const city = searchParams.get("city");
  
  const { data, isLoading, error } = useWeather(city || undefined);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  if (data) {
    return <WeatherCard data={data} currentTime={Date.now()} />;
  }

  return (
    <div className="text-center mt-16 text-white/60 flex flex-col items-center gap-6">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
        <CloudSun className="w-32 h-32 opacity-40 drop-shadow-xl relative" aria-hidden="true" />
      </div>
      <p className="text-2xl font-medium tracking-wide">Enter a city to see the weather</p>
    </div>
  );
}

export default function Home() {
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
        <Suspense fallback={<div className="h-16 w-full max-w-2xl mx-auto bg-white/10 rounded-2xl animate-pulse"></div>}>
          <SearchBar />
        </Suspense>
      </section>

      <section className="w-full mt-8 flex flex-col items-center min-h-[400px]" aria-live="polite">
        <Suspense fallback={<Loading />}>
          <WeatherContent />
        </Suspense>
      </section>
    </main>
  );
}

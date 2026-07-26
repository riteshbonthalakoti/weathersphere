"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    setIsSearching(true);
    // Push the new city to URL search params
    const params = new URLSearchParams(searchParams.toString());
    params.set("city", city.trim());
    
    // We navigate, the server component will re-render and fetch data
    router.push(`/?${params.toString()}`);
    
    // Slight delay before stopping animation to allow navigation to kick in
    setTimeout(() => setIsSearching(false), 500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-2xl mx-auto flex items-center mb-8"
    >
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search for a city..."
        className="w-full pl-6 pr-14 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50 text-lg shadow-xl outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
      />
      <button
        type="submit"
        disabled={isSearching}
        className="absolute right-3 p-3 bg-blue-500/80 hover:bg-blue-400 text-white rounded-xl transition-colors disabled:opacity-50"
      >
        <Search className={`w-5 h-5 ${isSearching ? 'animate-spin' : ''}`} />
      </button>
    </form>
  );
}

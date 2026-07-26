export default function CurrentWeatherSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 animate-pulse" aria-hidden="true">
      {/* Main Card Skeleton */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0 w-full md:w-1/2">
          <div className="h-10 w-48 bg-white/10 rounded-xl mb-3"></div>
          <div className="h-6 w-32 bg-white/10 rounded-lg mb-6"></div>
          <div className="h-10 w-40 bg-blue-500/10 rounded-full"></div>
        </div>

        <div className="flex items-center gap-6">
          <div className="w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="h-20 w-32 bg-white/10 rounded-2xl"></div>
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-md border border-white/5 p-5 rounded-2xl flex flex-col items-center justify-center gap-3">
            <div className="h-6 w-6 bg-white/10 rounded-md"></div>
            <div className="h-4 w-20 bg-white/10 rounded-md"></div>
            <div className="h-6 w-16 bg-white/20 rounded-md"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

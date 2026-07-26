interface ErrorProps {
  message: string;
}

export default function Error({ message }: ErrorProps) {
  return (
    <div className="bg-red-500/20 text-red-100 border border-red-500/30 px-6 py-4 rounded-xl flex items-center gap-3 animate-in zoom-in duration-500 backdrop-blur-md shadow-xl" role="alert">
      <span className="font-semibold">Error:</span> {message}
    </div>
  );
}

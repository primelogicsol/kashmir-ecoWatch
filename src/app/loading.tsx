export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="text-center">
        <div className="mb-6">
          <img
            src="/kew_LOGO.png"
            alt="Kashmir EcoWatch"
            className="w-20 h-20 mx-auto animate-pulse"
          />
        </div>
        <h2 className="text-white font-semibold text-lg mb-2">
          Kashmir EcoWatch
        </h2>
        <p className="text-slate-400 text-sm mb-4">
          Loading environmental intelligence layers...
        </p>
        <div className="flex items-center justify-center gap-1">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <p className="text-slate-500 text-xs mt-6">
          If this takes too long, refresh or check the data service connection.
        </p>
      </div>
    </main>
  );
}

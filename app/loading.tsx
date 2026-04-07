export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-white px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="absolute h-20 w-20 rounded-full border-4 border-emerald-100" />
          <div className="absolute h-20 w-20 animate-spin rounded-full border-4 border-transparent border-t-emerald-500 border-r-emerald-300" />
          <div className="h-3 w-3 rounded-full bg-emerald-500" />
        </div>
        <div>
          <p className="text-base font-semibold text-slate-800">Loading page</p>
          <p className="mt-1 text-sm text-slate-500">
            Preparing your culinary experience...
          </p>
        </div>
      </div>
    </div>
  );
}

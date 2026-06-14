function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-6">
      <div className="flex items-center gap-3">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />
        <p className="text-sm font-medium text-slate-600">{message}</p>
      </div>
    </div>
  );
}

export default LoadingSpinner;
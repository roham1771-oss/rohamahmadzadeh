export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary-200 dark:border-primary-800 border-t-primary-900 dark:border-t-gold-500 rounded-full animate-spin" />
        <p className="text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  );
}

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-9xl font-bold text-primary-200 dark:text-primary-800">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="btn-primary inline-flex">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

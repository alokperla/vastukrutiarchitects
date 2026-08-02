import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-6 pt-20">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-plum-100 dark:text-gray-800 mb-4 select-none">404</div>
        <h1 className="text-3xl font-bold text-plum-900 dark:text-white mb-3">Page Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          The page you are looking for does not exist. It may have been moved or deleted.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/" className="bg-terracotta-600 hover:bg-terracotta-700 text-white font-semibold py-3 px-6 rounded-full transition-all hover:scale-105 shadow-md shadow-terracotta-600/20 active:scale-95">
            Back to Home
          </Link>
          <Link href="/projects" className="border border-plum-200 dark:border-gray-700 text-plum-900 dark:text-gray-300 hover:border-plum-900 dark:hover:border-white font-medium py-3 px-6 rounded-full transition-all active:scale-95">
            View Projects
          </Link>
        </div>
      </div>
    </main>
  );
}
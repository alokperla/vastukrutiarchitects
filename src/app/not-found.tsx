import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-6 pt-20">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-gray-100 dark:text-gray-800 mb-4 select-none">404</div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Page Not Found</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          The page you are looking for does not exist. It may have been moved or deleted.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-full transition-all hover:scale-105">
            Back to Home
          </Link>
          <Link href="/projects" className="border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 font-medium py-3 px-6 rounded-full transition-all">
            View Projects
          </Link>
        </div>
      </div>
    </main>
  );
}
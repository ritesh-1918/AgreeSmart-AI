import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto text-center py-12">
      <div className="mb-8">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-600 dark:bg-indigo-500 mb-4">
          <span className="text-4xl font-bold text-white">A</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to AgreeSmart AI
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          AI-powered contract understanding platform
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Get Started
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Analyze contracts, understand key terms, and identify risks with the power of AI.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors"
        >
          Go to Dashboard →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <div className="text-3xl mb-3">🔍</div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            AI Analysis
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Automatically extract key terms and obligations
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <div className="text-3xl mb-3">⚠️</div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Risk Detection
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Identify potential risks and concerns
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <div className="text-3xl mb-3">💬</div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Ask Questions
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Interactive Q&A about your contracts
          </p>
        </div>
      </div>
    </div>
  );
}

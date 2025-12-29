import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative py-20 px-6 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Understand contracts<br />before you sign.
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            AI-powered contract analysis that translates complex legal language into plain English.
            Know exactly what you're agreeing to.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Contracts shouldn't be confusing
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📄</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Too Long</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Most contracts are 20+ pages of dense text that no one has time to read.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Legal Jargon</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Complex terminology makes it hard to understand what you're actually agreeing to.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Hidden Risks</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Important clauses and risky terms often go unnoticed until it's too late.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">
            How AgreeSmart AI works
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12">
            Three simple steps to understand any contract
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mb-4">
                1
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Upload</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Upload your contract PDF securely. We support all common document formats.
              </p>
            </div>
            <div className="relative">
              <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mb-4">
                2
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Analyze</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Our AI reads and analyzes every clause, identifying key terms and potential risks.
              </p>
            </div>
            <div className="relative">
              <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mb-4">
                3
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Understand</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Get a clear, plain-English summary with highlighted risks and key obligations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">📤</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">PDF Upload</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Simply drag and drop your contract PDF for instant analysis.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">📝</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Plain-English Summaries</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Complex legal terms translated into language anyone can understand.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">🚩</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Risk Detection</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Automatically identifies red flags, unusual clauses, and potential concerns.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">🔒</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Secure Workspace</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Your documents are encrypted and kept private in your personal workspace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Trust & Privacy
          </h2>
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 mb-6">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Important:</strong> AgreeSmart AI is an analysis tool, not a legal service.
              Our summaries are for informational purposes only and do not constitute legal advice.
              Always consult a qualified attorney for legal decisions.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 justify-center text-center">
            <div>
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">🔐</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">End-to-end encryption</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">🗑️</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Delete anytime</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">🚫</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Never shared or sold</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="font-bold text-gray-900 dark:text-white">AgreeSmart AI</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                AI-powered contract understanding
              </p>
            </div>
            <div className="flex gap-6">
              <Link href="/auth/login" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                Login
              </Link>
              <Link href="/auth/signup" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                Sign Up
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-500">
              © {new Date().getFullYear()} AgreeSmart AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import Link from 'next/link';
import { Header } from '@/app/components/Header';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-indigo-100 selection:text-indigo-900 dark:selection:bg-indigo-900 dark:selection:text-indigo-100">

      {/* Decorative Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-50/50 dark:bg-indigo-900/20 blur-3xl animate-pulse"></div>
        <div className="absolute top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-50/50 dark:bg-blue-900/20 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-indigo-50/30 dark:bg-indigo-800/20 blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 backdrop-blur-md shadow-sm mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600 dark:bg-indigo-400"></span>
            </span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">AI-Powered Contract Analysis</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-8 leading-[1.1] max-w-4xl mx-auto">
            Make Contracts <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
              Simple & Safe
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Stop signing blindly. Our AI breaks down complex legal jargon into
            plain English, highlighting risks and obligations in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/auth/signup"
              className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-xl bg-indigo-600 px-8 font-medium text-white transition-all duration-300 hover:bg-indigo-700 hover:ring-4 hover:ring-indigo-200 hover:scale-105 shadow-lg shadow-indigo-600/20"
            >
              <span className="mr-2">Analyze Contract Free</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex h-14 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 px-8 font-medium text-gray-700 dark:text-gray-200 backdrop-blur-sm transition-all hover:bg-white dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md"
            >
              View Demo
            </Link>
          </div>

          {/* Hero Visual / Glass Card */}
          <div className="mt-20 relative mx-auto max-w-5xl">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 opacity-20 blur-lg"></div>
            <div className="relative rounded-2xl bg-white/40 dark:bg-gray-900/40 border border-white/50 dark:border-gray-700/50 backdrop-blur-xl shadow-2xl p-4 md:p-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1 w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 text-left">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">📄</div>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Original Contract</span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded w-4/6"></div>
                    <div className="p-3 bg-red-50 dark:bg-red-900/10 rounded border-l-4 border-red-400 text-xs text-red-800 dark:text-red-300 leading-relaxed font-mono">
                      "SECTION 4.2: INDEMNIFICATION. The Vendor shall indemnify, defend and hold harmless..."
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded w-full"></div>
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-center pt-12 text-indigo-400 dark:text-indigo-500">
                  <svg className="w-8 h-8 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>

                <div className="flex-1 w-full bg-white/80 dark:bg-gray-800/90 rounded-xl shadow-lg border border-indigo-100 dark:border-indigo-900/50 p-6 text-left ring-1 ring-indigo-500/10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">✨</div>
                    <span className="font-semibold text-gray-900 dark:text-white">AI Analysis</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">Meaning</span>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">If something goes wrong, <strong>you have to pay for it</strong>.</p>
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-red-500 dark:text-red-400">⚠️ Risk</span>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">High financial risk. Negotiate to cap this liability.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">10k+</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">Contracts Analyzed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">2.5s</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">Average Time</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">100%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">Secure & Private</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Free</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">To Get Started</div>
          </div>
        </div>
      </section>

      {/* Features Grid - Bento Style */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Everything you need to sign confidently</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Don't let legal jargon intimidate you. Our suite of tools puts you back in control.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 - Large */}
            <div className="md:col-span-2 row-span-2 bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative z-10">
                <div className="h-12 w-12 bg-white dark:bg-gray-700 rounded-xl shadow-sm flex items-center justify-center text-2xl mb-6">🚀</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Instant PDF Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md">Upload any PDF contract and get an instant breakdown. We support scanned documents, multi-page agreements, and complex layouts.</p>
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm max-w-sm">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-lg">
                      <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">Service_Agreement_v2.pdf</div>
                      <div className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Analysis Complete
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-2xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Red Flag Detection</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">We spot risky clauses that could cost you money or rights.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-purple-50 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 text-2xl mb-4">📅</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Key Dates & Deadlines</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Never miss a renewal date or payment deadline again.</p>
            </div>

            {/* Feature 4 */}
            <div className="md:col-span-3 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Secure & Private by Default</h3>
                  <p className="text-gray-300 dark:text-gray-400 max-w-lg">Your contracts are encrypted and processed securely. We never share your data.</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                    <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    <span className="font-medium">Bank-grade Encryption</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust/Footer */}
      <footer className="py-12 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
            <span className="font-bold text-gray-900 dark:text-white">AgreeSmart AI</span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} AgreeSmart AI. Built for safety.
          </div>
          <div className="flex gap-6">
            <Link href="/auth/login" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">Log In</Link>
            <Link href="/auth/signup" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">Sign Up</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

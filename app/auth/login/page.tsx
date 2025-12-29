'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const supabase = createClient();

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            setMessage({ type: 'error', text: error.message });
        } else {
            setMessage({
                type: 'success',
                text: 'Check your email! We sent you a magic link to sign in.',
            });
            setEmail('');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">A</span>
                        </div>
                        <span className="font-bold text-xl text-gray-900 dark:text-white">AgreeSmart AI</span>
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Welcome back
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Sign in to your account to continue
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 shadow-sm">
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Sending link...' : 'Send magic link'}
                        </button>
                    </form>

                    {message && (
                        <div
                            className={`mt-4 p-4 rounded-lg text-sm ${message.type === 'success'
                                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                                    : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                                }`}
                        >
                            {message.text}
                        </div>
                    )}

                    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                            We'll send you a magic link to sign in. No password needed.
                        </p>
                    </div>
                </div>

                <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <Link href="/auth/signup" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                        Sign up
                    </Link>
                </p>

                <p className="text-center mt-4">
                    <Link href="/" className="text-sm text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        ← Back to home
                    </Link>
                </p>
            </div>
        </div>
    );
}

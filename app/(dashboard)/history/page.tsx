'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface AnalysisRecord {
    id: string;
    created_at: string;
    contract_title: string;
    summary: string;
    full_analysis: {
        summary: string;
        keyObligations: string[];
        risksAndRedFlags: string[];
        importantDates: string[];
        whoShouldBeCareful: string;
    };
}

export default function HistoryPage() {
    const [analyses, setAnalyses] = useState<AnalysisRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisRecord | null>(null);

    useEffect(() => {
        const fetchHistory = async () => {
            const supabase = createClient();
            const { data, error } = await supabase
                .from('analyses')
                .select('*')
                .order('created_at', { ascending: false });

            if (data) {
                setAnalyses(data);
            }
            setLoading(false);
        };

        fetchHistory();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (selectedAnalysis) {
        return (
            <div className="max-w-4xl mx-auto space-y-6">
                <button
                    onClick={() => setSelectedAnalysis(null)}
                    className="flex items-center text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                    ← Back to History
                </button>

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {selectedAnalysis.contract_title || 'Contract Analysis'}
                        </h1>
                        <p className="text-sm text-gray-500">
                            {new Date(selectedAnalysis.created_at).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                {/* Reuse Results UI */}
                <div className="grid grid-cols-1 gap-6">
                    {/* Summary Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            📝 Executive Summary
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {selectedAnalysis.full_analysis.summary}
                        </p>
                    </div>

                    {/* Three Column Grid for details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Key Obligations */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-2">
                                ✅ Key Obligations
                            </h3>
                            <ul className="space-y-3">
                                {selectedAnalysis.full_analysis.keyObligations.map((item, i) => (
                                    <li key={i} className="flex gap-3 text-gray-600 dark:text-gray-300">
                                        <span className="text-blue-500 mt-1">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Risks */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
                                ⚠️ Risks & Red Flags
                            </h3>
                            <ul className="space-y-3">
                                {selectedAnalysis.full_analysis.risksAndRedFlags.map((item, i) => (
                                    <li key={i} className="flex gap-3 text-gray-600 dark:text-gray-300">
                                        <span className="text-red-500 mt-1">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Full Width Bottom Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Dates */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-amber-600 dark:text-amber-400 mb-4 flex items-center gap-2">
                                📅 Important Dates
                            </h3>
                            <ul className="space-y-3">
                                {selectedAnalysis.full_analysis.importantDates.length > 0 ? (
                                    selectedAnalysis.full_analysis.importantDates.map((item, i) => (
                                        <li key={i} className="flex gap-3 text-gray-600 dark:text-gray-300">
                                            <span className="text-amber-500 mt-1">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-gray-500 italic">No specific dates mentioned.</p>
                                )}
                            </ul>
                        </div>

                        {/* Who Should Be Careful */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-4 flex items-center gap-2">
                                🎯 Who Should Be Careful?
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {selectedAnalysis.full_analysis.whoShouldBeCareful}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Analysis History
                </h1>
                <Link
                    href="/new-analysis"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    + New Analysis
                </Link>
            </div>

            {analyses.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">No analyses found yet.</p>
                    <Link
                        href="/new-analysis"
                        className="text-indigo-600 hover:text-indigo-500 font-medium"
                    >
                        Start your first analysis
                    </Link>
                </div>
            ) : (
                <div className="grid gap-4">
                    {analyses.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedAnalysis(item)}
                            className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors cursor-pointer group"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                                        {item.contract_title || 'Untitled Analysis'}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                        Analyzed on {new Date(item.created_at).toLocaleDateString()} at {new Date(item.created_at).toLocaleTimeString()}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                                        {item.summary}
                                    </p>
                                </div>
                                <span className="text-gray-400 group-hover:text-indigo-500">
                                    →
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

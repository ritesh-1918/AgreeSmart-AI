'use client';

import { useState, useRef } from 'react';

interface ContractAnalysis {
    summary: string;
    keyObligations: string[];
    risksAndRedFlags: string[];
    importantDates: string[];
    whoShouldBeCareful: string;
}

export default function NewAnalysisPage() {
    const [mode, setMode] = useState<'text' | 'pdf'>('text');
    const [text, setText] = useState('');
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<ContractAnalysis | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAnalyze = async () => {
        setLoading(true);
        setError(null);
        setAnalysis(null);

        const formData = new FormData();
        if (mode === 'text') {
            formData.append('text', text);
        } else if (pdfFile) {
            formData.append('pdf', pdfFile);
        }

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'An error occurred');
            } else {
                setAnalysis(data.analysis);
            }
        } catch {
            setError('Failed to connect to the server. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCopyResults = () => {
        if (!analysis) return;
        const resultText = `
Summary: ${analysis.summary}

Key Obligations:
${analysis.keyObligations.map(o => `• ${o}`).join('\n')}

Risks & Red Flags:
${analysis.risksAndRedFlags.map(r => `• ${r}`).join('\n')}

Important Dates:
${analysis.importantDates.map(d => `• ${d}`).join('\n')}

Who Should Be Careful:
${analysis.whoShouldBeCareful}
    `.trim();
        navigator.clipboard.writeText(resultText);
    };

    const handleReanalyze = () => {
        setAnalysis(null);
        setError(null);
    };

    const canAnalyze = mode === 'text' ? text.trim().length >= 50 : pdfFile !== null;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    New Analysis
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Upload a contract PDF or paste text to get an AI-powered analysis
                </p>
            </div>

            {!analysis ? (
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                    {/* Mode Toggle */}
                    <div className="flex gap-2 mb-6">
                        <button
                            onClick={() => { setMode('text'); setPdfFile(null); }}
                            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${mode === 'text'
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                        >
                            📝 Paste Text
                        </button>
                        <button
                            onClick={() => { setMode('pdf'); setText(''); }}
                            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${mode === 'pdf'
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                        >
                            📄 Upload PDF
                        </button>
                    </div>

                    {/* Text Input */}
                    {mode === 'text' && (
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Contract Text
                            </label>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Paste your contract text here..."
                                rows={14}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none font-mono text-sm"
                            />
                            <div className="mt-2 flex justify-between text-sm text-gray-500 dark:text-gray-500">
                                <span>{text.length.toLocaleString()} characters</span>
                                {text.length < 50 && text.length > 0 && (
                                    <span className="text-amber-600 dark:text-amber-400">Minimum 50 characters required</span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* PDF Input */}
                    {mode === 'pdf' && (
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                PDF Document
                            </label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
                            >
                                {pdfFile ? (
                                    <div>
                                        <div className="text-4xl mb-3">📄</div>
                                        <p className="text-lg font-medium text-gray-900 dark:text-white">
                                            {pdfFile.name}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                                            {(pdfFile.size / 1024).toFixed(1)} KB
                                        </p>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setPdfFile(null); }}
                                            className="mt-3 text-red-600 dark:text-red-400 text-sm font-medium hover:underline"
                                        >
                                            Remove file
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="text-4xl mb-3">📤</div>
                                        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                                            Click to upload a PDF
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                                            Text-based PDFs only • Max 5MB
                                        </p>
                                    </div>
                                )}
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf"
                                onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                                className="hidden"
                            />
                            <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                                Note: Scanned or image-based PDFs are not supported. Please paste text instead.
                            </p>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
                            {error}
                        </div>
                    )}

                    {/* Analyze Button */}
                    <button
                        onClick={handleAnalyze}
                        disabled={!canAnalyze || loading}
                        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="animate-spin">⏳</span> Analyzing...
                            </span>
                        ) : (
                            '🔍 Analyze Contract'
                        )}
                    </button>
                </div>
            ) : (
                /* Results Display */
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            ✅ Analysis Results
                        </h2>
                        <div className="flex gap-2">
                            <button
                                onClick={handleCopyResults}
                                className="px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            >
                                📋 Copy
                            </button>
                            <button
                                onClick={handleReanalyze}
                                className="px-4 py-2 text-sm font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors"
                            >
                                🔄 New Analysis
                            </button>
                        </div>
                    </div>

                    {/* Summary Card */}
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            📝 Plain English Summary
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{analysis.summary}</p>
                    </div>

                    {/* Key Obligations */}
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            📋 Key Obligations
                        </h3>
                        {analysis.keyObligations.length > 0 ? (
                            <ul className="space-y-3">
                                {analysis.keyObligations.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                                        <span className="text-indigo-600 dark:text-indigo-400 font-bold">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-500 italic">No specific obligations identified</p>
                        )}
                    </div>

                    {/* Risks & Red Flags */}
                    <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-3">
                            🚩 Risks & Red Flags
                        </h3>
                        {analysis.risksAndRedFlags.length > 0 ? (
                            <ul className="space-y-3">
                                {analysis.risksAndRedFlags.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                                        <span className="text-red-600 dark:text-red-400">⚠️</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-green-600 dark:text-green-400">✓ No significant risks identified</p>
                        )}
                    </div>

                    {/* Important Dates */}
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            📅 Important Dates & Deadlines
                        </h3>
                        {analysis.importantDates.length > 0 ? (
                            <ul className="space-y-3">
                                {analysis.importantDates.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                                        <span className="text-amber-600 dark:text-amber-400">📌</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-500 italic">No specific dates or deadlines found</p>
                        )}
                    </div>

                    {/* Who Should Be Careful */}
                    <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-3">
                            ⚠️ Who Should Be Careful
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">{analysis.whoShouldBeCareful}</p>
                    </div>

                    {/* Disclaimer */}
                    <div className="text-center text-sm text-gray-500 dark:text-gray-500 py-4 border-t border-gray-200 dark:border-gray-800">
                        ⚖️ This analysis is for informational purposes only and does not constitute legal advice.
                    </div>
                </div>
            )}
        </div>
    );
}

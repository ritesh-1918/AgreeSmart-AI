'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
    const [stats, setStats] = useState([
        {
            title: 'Total Analyses',
            value: '-',
            description: 'Loading...',
            icon: '📊',
        },
        {
            title: 'Recent Activity',
            value: '-',
            description: 'Loading...',
            icon: '🕐',
        },
        {
            title: 'Status',
            value: 'Ready',
            description: 'System is operational',
            icon: '✅',
        },
    ]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            const supabase = createClient();

            // Get Total Count
            const { count, error } = await supabase
                .from('analyses')
                .select('*', { count: 'exact', head: true });

            // Get Last Activity
            const { data: recent } = await supabase
                .from('analyses')
                .select('created_at')
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            if (!error) {
                setStats([
                    {
                        title: 'Total Analyses',
                        value: count?.toString() || '0',
                        description: count === 0 ? 'No contracts analyzed yet' : 'Total contracts processed',
                        icon: '📊',
                    },
                    {
                        title: 'Recent Activity',
                        value: recent ? new Date(recent.created_at).toLocaleDateString() : 'None',
                        description: recent ? 'Last aalysis performed' : 'Start your first analysis',
                        icon: '🕐',
                    },
                    {
                        title: 'Status',
                        value: 'Ready',
                        description: 'System is operational',
                        icon: '✅',
                    },
                ]);
            }
            setLoading(false);
        };

        fetchStats();
    }, []);

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Welcome to AgreeSmart AI. Monitor your contract analyses and activity.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <div
                        key={stat.title}
                        className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow ${loading && i < 2 ? 'animate-pulse' : ''}`}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900/30">
                                <span className="text-2xl">{stat.icon}</span>
                            </div>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                            {stat.title}
                        </h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {stat.value}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                            {stat.description}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Quick Start
                </h2>
                <div className="space-y-3">
                    <div className="flex items-start gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold">
                            1
                        </span>
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                                Upload a Contract
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Navigate to &quot;New Analysis&quot; to upload your first contract
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold">
                            2
                        </span>
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                                AI Analysis
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Our AI will analyze key terms, obligations, and risks
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold">
                            3
                        </span>
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                                Review Results
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Access detailed insights and ask questions about your contract
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

'use client';

import { useContext } from 'react';
import { ThemeContext } from '@/app/components/ThemeProvider';

export function useTheme() {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        // Return default values during SSR instead of throwing
        return {
            theme: 'light' as const,
            toggleTheme: () => { },
        };
    }

    return context;
}

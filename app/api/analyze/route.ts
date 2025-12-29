import { NextRequest, NextResponse } from 'next/server';
import { analyzeContract } from '@/lib/gemini/analyze';

const MAX_TEXT_LENGTH = 100000; // 100k characters limit

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const textInput = formData.get('text') as string | null;

        let contractText = '';

        // For now, only support text input
        // PDF support can be added with a separate service
        if (textInput) {
            contractText = textInput;
        } else {
            return NextResponse.json(
                { error: 'Please provide contract text for analysis.' },
                { status: 400 }
            );
        }

        // Validate text length
        if (contractText.length > MAX_TEXT_LENGTH) {
            return NextResponse.json(
                { error: `Text exceeds maximum length of ${MAX_TEXT_LENGTH} characters.` },
                { status: 400 }
            );
        }

        if (contractText.trim().length < 50) {
            return NextResponse.json(
                { error: 'Please provide more contract text for analysis (minimum 50 characters).' },
                { status: 400 }
            );
        }

        // Analyze with Gemini
        const analysis = await analyzeContract(contractText);

        return NextResponse.json({ analysis });
    } catch (error) {
        console.error('Analysis error:', error);
        return NextResponse.json(
            { error: 'An error occurred during analysis. Please try again.' },
            { status: 500 }
        );
    }
}

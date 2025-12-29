import { NextRequest, NextResponse } from 'next/server';
import { analyzeContract } from '@/lib/gemini/analyze';

// Force Node.js runtime for PDF processing
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit
const MAX_TEXT_LENGTH = 100000; // 100k characters limit

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const textInput = formData.get('text') as string | null;
        const pdfFile = formData.get('pdf') as File | null;

        let contractText = '';

        // Handle PDF upload
        if (pdfFile) {
            // Validate file type
            if (!pdfFile.name.toLowerCase().endsWith('.pdf')) {
                return NextResponse.json(
                    { error: 'Please upload a valid PDF file.' },
                    { status: 400 }
                );
            }

            // Validate file size
            if (pdfFile.size > MAX_FILE_SIZE) {
                return NextResponse.json(
                    { error: 'PDF file size exceeds 5MB limit.' },
                    { status: 400 }
                );
            }

            try {
                const arrayBuffer = await pdfFile.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                // Use require for Node.js compatibility
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                const pdfParse = require('pdf-parse');
                const data = await pdfParse(buffer);
                contractText = data.text;

                // Clean up whitespace
                contractText = contractText.replace(/\s+/g, ' ').trim();

                if (!contractText || contractText.length < 50) {
                    return NextResponse.json(
                        {
                            error: 'This PDF appears to be scanned or image-based. Please paste text instead.',
                        },
                        { status: 400 }
                    );
                }
            } catch (err) {
                console.error('PDF extraction error:', err);
                return NextResponse.json(
                    {
                        error: 'Failed to extract text from PDF. Please ensure it is a text-based PDF or paste text instead.',
                    },
                    { status: 400 }
                );
            }
        } else if (textInput) {
            contractText = textInput;
        } else {
            return NextResponse.json(
                { error: 'Please provide contract text or upload a PDF.' },
                { status: 400 }
            );
        }

        // Validate text length
        if (contractText.length > MAX_TEXT_LENGTH) {
            return NextResponse.json(
                { error: `Text exceeds maximum length of ${MAX_TEXT_LENGTH.toLocaleString()} characters.` },
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

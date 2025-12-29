import { NextRequest, NextResponse } from 'next/server';
import { analyzeContract } from '@/lib/gemini/analyze';
import { createClient } from '@/lib/supabase/server';

// Force Node.js runtime for PDF processing
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit
const MAX_TEXT_LENGTH = 100000; // 100k characters limit

// Polyfill DOMMatrix for pdf-parse in Node.js
if (typeof global.DOMMatrix === 'undefined') {
    // @ts-expect-error - Polyfilling DOMMatrix for pdf-parse
    global.DOMMatrix = class DOMMatrix {
        a = 1; b = 0; c = 0; d = 1; e = 0; f = 0;
        constructor() { }
    };
}

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

                // Use require for pdf-parse (CommonJS module)
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                const pdfParseModule = require('pdf-parse');
                const pdfParse = pdfParseModule.default || pdfParseModule;

                const data = await pdfParse(buffer);
                contractText = data.text || '';

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
                const errorMsg = err instanceof Error ? err.message : 'Unknown error';
                return NextResponse.json(
                    {
                        error: `Failed to extract text from PDF: ${errorMsg}. Please paste text instead.`,
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

        // Save to Supabase if user is authenticated
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            try {
                const { error: dbError } = await supabase
                    .from('analyses')
                    .insert({
                        user_id: user.id,
                        contract_title: pdfFile ? pdfFile.name : 'Text Analysis',
                        summary: analysis.summary,
                        full_analysis: analysis,
                        original_text: contractText
                    });

                if (dbError) {
                    console.error('Database save error:', dbError);
                    // We don't fail the request if saving fails, just log it
                }
            } catch (err) {
                console.error('Error saving to history:', err);
            }
        }

        return NextResponse.json({ analysis });
    } catch (error) {
        console.error('Analysis error:', error);
        const errorMessage = error instanceof Error ? error.message : 'An error occurred during analysis. Please try again.';
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
